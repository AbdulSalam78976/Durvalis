// Vercel serverless function for Stripe checkout
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Security: Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { items, customerData } = req.body;

    // Security: Validate required data
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid items data' });
    }

    // Security: Validate each item
    for (const item of items) {
      if (!item.name || !item.price || !item.quantity) {
        return res.status(400).json({ error: 'Invalid item data' });
      }
      
      // Security: Validate price is a positive number
      if (typeof item.price !== 'number' || item.price <= 0) {
        return res.status(400).json({ error: 'Invalid price' });
      }
      
      // Security: Validate quantity is a positive integer
      if (!Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 100) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }
    }

    // Security: Sanitize customer data
    const sanitizedCustomerData = customerData ? {
      email: customerData.email?.trim().toLowerCase(),
      deliveryInstructions: customerData.deliveryInstructions?.substring(0, 500), // Limit length
      marketingOptIn: Boolean(customerData.marketingOptIn)
    } : {};

    // Create line items for Stripe (without tax or shipping - Stripe Tax will handle it)
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name.substring(0, 100), // Limit name length
          images: item.image ? [`${process.env.NEXT_PUBLIC_DOMAIN || 'https://durvalis.com'}${item.image}`] : [],
          description: (item.description || 'Professional-grade apple-flavored dewormer for complete equine parasite control').substring(0, 200),
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Prepare session configuration with Stripe Tax
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
      
      // Enable automatic tax calculation with Stripe Tax
      automatic_tax: {
        enabled: true,
      },
      
      // Shipping options - Free shipping
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0, // Free shipping
              currency: 'usd',
            },
            display_name: 'Free Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
      ],
      
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      
      phone_number_collection: {
        enabled: true,
      },
      
      customer_creation: 'always',
      
      metadata: {
        source: 'durvalis_website',
        deliveryInstructions: sanitizedCustomerData.deliveryInstructions || '',
        marketingOptIn: sanitizedCustomerData.marketingOptIn || false,
      },
    };

    // Add customer data if provided
    if (sanitizedCustomerData.email) {
      sessionConfig.customer_email = sanitizedCustomerData.email;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Security: Only return necessary data
    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    // Security: Don't expose internal error details to client
    res.status(500).json({ error: 'Payment processing error. Please try again.' });
  }
}