// Vercel serverless function for Stripe webhooks
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Email sending function using EmailJS REST API
async function sendEmail(to, subject, htmlContent) {
  const emailData = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_ORDER_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAILJS_PRIVATE_KEY,
    template_params: {
      to_email: to,
      subject: subject,
      html_content: htmlContent
    }
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`EmailJS error: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

// Format order details for email
function formatOrderEmail(session, lineItems) {
  const customerName = session.customer_details?.name || 'Customer';
  const customerEmail = session.customer_details?.email;
  const orderTotal = (session.amount_total / 100).toFixed(2);
  const orderDate = new Date(session.created * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Build items list
  let itemsHtml = '';
  lineItems.data.forEach(item => {
    const itemTotal = ((item.amount_total / 100).toFixed(2));
    itemsHtml += `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          <strong>${item.description}</strong><br>
          <span style="color: #6b7280; font-size: 14px;">Quantity: ${item.quantity}</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          $${itemTotal}
        </td>
      </tr>
    `;
  });

  // Shipping address
  const shipping = session.shipping_details?.address;
  const shippingAddress = shipping ? `
    ${shipping.line1}${shipping.line2 ? ', ' + shipping.line2 : ''}<br>
    ${shipping.city}, ${shipping.state} ${shipping.postal_code}<br>
    ${shipping.country}
  ` : 'N/A';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    Order Confirmation
                  </h1>
                  <p style="margin: 10px 0 0 0; color: #fecaca; font-size: 16px;">
                    Thank you for your purchase!
                  </p>
                </td>
              </tr>

              <!-- Order Info -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151;">
                    Hi <strong>${customerName}</strong>,
                  </p>
                  <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151; line-height: 1.6;">
                    Your order has been confirmed and will be shipped soon. Here are your order details:
                  </p>

                  <!-- Order Details Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding: 8px 0;">
                              <strong style="color: #6b7280;">Order Number:</strong>
                            </td>
                            <td style="padding: 8px 0; text-align: right;">
                              <span style="color: #111827;">${session.id}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0;">
                              <strong style="color: #6b7280;">Order Date:</strong>
                            </td>
                            <td style="padding: 8px 0; text-align: right;">
                              <span style="color: #111827;">${orderDate}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0;">
                              <strong style="color: #6b7280;">Email:</strong>
                            </td>
                            <td style="padding: 8px 0; text-align: right;">
                              <span style="color: #111827;">${customerEmail}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Order Items -->
                  <h2 style="margin: 30px 0 15px 0; font-size: 20px; color: #111827;">Order Items</h2>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                    ${itemsHtml}
                    <tr>
                      <td style="padding: 12px; background-color: #f9fafb;">
                        <strong>Shipping</strong>
                      </td>
                      <td style="padding: 12px; background-color: #f9fafb; text-align: right;">
                        <span style="color: #059669; font-weight: bold;">FREE</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; background-color: #f9fafb;">
                        <strong>Tax</strong>
                      </td>
                      <td style="padding: 12px; background-color: #f9fafb; text-align: right;">
                        $${((session.total_details?.amount_tax || 0) / 100).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 15px; background-color: #dc2626;">
                        <strong style="color: #ffffff; font-size: 18px;">Total</strong>
                      </td>
                      <td style="padding: 15px; background-color: #dc2626; text-align: right;">
                        <strong style="color: #ffffff; font-size: 18px;">$${orderTotal}</strong>
                      </td>
                    </tr>
                  </table>

                  <!-- Shipping Address -->
                  <h2 style="margin: 30px 0 15px 0; font-size: 20px; color: #111827;">Shipping Address</h2>
                  <div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #374151; line-height: 1.6;">
                      <strong>${session.shipping_details?.name || customerName}</strong><br>
                      ${shippingAddress}
                    </p>
                  </div>

                  <!-- Delivery Instructions -->
                  ${session.metadata?.deliveryInstructions ? `
                  <h2 style="margin: 30px 0 15px 0; font-size: 20px; color: #111827;">Delivery Instructions</h2>
                  <div style="padding: 15px; background-color: #fef3c7; border-radius: 8px; border: 1px solid #fbbf24;">
                    <p style="margin: 0; color: #92400e;">
                      ${session.metadata.deliveryInstructions}
                    </p>
                  </div>
                  ` : ''}

                  <!-- What's Next -->
                  <h2 style="margin: 30px 0 15px 0; font-size: 20px; color: #111827;">What's Next?</h2>
                  <ul style="color: #374151; line-height: 1.8; padding-left: 20px;">
                    <li>Your order will be processed within 1-2 business days</li>
                    <li>You'll receive a shipping confirmation email with tracking information</li>
                    <li>Estimated delivery: 3-5 business days</li>
                  </ul>

                  <!-- Support -->
                  <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 8px; border: 1px solid #3b82f6;">
                    <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: bold;">Need Help?</p>
                    <p style="margin: 0; color: #1e3a8a; font-size: 14px;">
                      Contact us at <a href="mailto:contact@durvalis.com" style="color: #2563eb;">contact@durvalis.com</a><br>
                      or call <a href="tel:737-999-0318" style="color: #2563eb;">737-999-0318</a>
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                    Thank you for choosing Durvalis!
                  </p>
                  <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                    Durvalis | 5900 Balcones Dr #22995, Austin, TX 78731<br>
                    © 2025 Durvalis. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful for session:', session.id);
      
      try {
        // Get line items from the session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product']
        });

        // Format email content
        const emailHtml = formatOrderEmail(session, lineItems);
        const customerEmail = session.customer_details?.email;
        const businessEmail = 'info@durvalis.com';

        // Send email to customer
        if (customerEmail) {
          await sendEmail(
            customerEmail,
            `Order Confirmation - ${session.id}`,
            emailHtml
          );
          console.log('Customer email sent to:', customerEmail);
        }

        // Send email to business
        await sendEmail(
          businessEmail,
          `New Order Received - ${session.id}`,
          emailHtml
        );
        console.log('Business notification sent to:', businessEmail);

        // Log order details
        console.log('Order details:', {
          sessionId: session.id,
          customerEmail: customerEmail,
          customerName: session.customer_details?.name,
          amountTotal: session.amount_total / 100,
          currency: session.currency,
          paymentStatus: session.payment_status,
          shippingAddress: session.shipping_details?.address,
          items: lineItems.data.map(item => ({
            description: item.description,
            quantity: item.quantity,
            amount: item.amount_total / 100
          }))
        });
      } catch (error) {
        console.error('Error processing order confirmation:', error);
      }
      
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment intent succeeded:', paymentIntent.id);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}