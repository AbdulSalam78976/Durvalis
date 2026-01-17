# Stripe Integration Guide

## Overview

This project uses **Stripe Checkout** for secure payment processing with dynamic product creation, automatic tax calculation, and order confirmation emails. The integration follows modern best practices with serverless functions and webhook handling.

---

## 🏗️ Architecture Overview

```
Frontend (React) → API (Vercel Functions) → Stripe → Webhooks → Email Notifications
```

### **Flow Diagram:**
1. **Customer** adds products to cart
2. **Frontend** sends checkout request to API
3. **API** creates Stripe checkout session
4. **Stripe** handles payment collection
5. **Webhook** receives payment confirmation
6. **Email** notifications sent to customer & business

---

## 🔧 Technical Implementation

### **1. Frontend Integration**

#### **Stripe.js Initialization**
```javascript
// src/components/Checkout.jsx
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...'
);
```

#### **Checkout Process**
```javascript
// Create checkout session
const response = await fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: stripeItems,
    customerData: customerData
  }),
});

const session = await response.json();

// Redirect to Stripe Checkout
if (session.url) {
  window.location.href = session.url;
}
```

### **2. Backend API (Serverless Functions)**

#### **Session Creation** (`api/create-checkout-session.js`)
```javascript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Create dynamic products using price_data
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.image],
        description: item.description,
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: item.quantity,
  }));

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/checkout`,
    
    // Free shipping
    shipping_options: [{
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: 0, currency: 'usd' },
        display_name: 'Free Standard Shipping',
      },
    }],
    
    // Automatic tax calculation (if enabled)
    automatic_tax: { enabled: true },
    
    // Collect customer information
    billing_address_collection: 'required',
    shipping_address_collection: { allowed_countries: ['US', 'CA'] },
    phone_number_collection: { enabled: true },
    
    // Custom metadata
    metadata: {
      source: 'durvalis_website',
      deliveryInstructions: customerData.deliveryInstructions || '',
      marketingOptIn: customerData.marketingOptIn || false,
    },
  });

  res.status(200).json({ 
    id: session.id,
    url: session.url 
  });
}
```

#### **Webhook Handler** (`api/webhooks.js`)
```javascript
export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Verify webhook signature
  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Get order details
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      
      // Send confirmation emails
      await sendOrderConfirmationEmails(session, lineItems);
      
      break;
  }

  res.json({ received: true });
}
```

---

## 💳 Payment Features

### **Supported Payment Methods**
- ✅ **Credit Cards** (Visa, Mastercard, American Express)
- ✅ **Debit Cards**
- ✅ **Digital Wallets** (Apple Pay, Google Pay)
- ✅ **Bank Transfers** (ACH, if enabled)

### **Security Features**
- 🔒 **PCI DSS Compliant** - Stripe handles all sensitive data
- 🛡️ **3D Secure** - Additional authentication for cards
- 🔐 **Encryption** - All data encrypted in transit and at rest
- 🚫 **No Card Storage** - Your server never sees card details

### **Fraud Protection**
- 🤖 **Machine Learning** - Stripe's AI detects suspicious activity
- 📊 **Risk Scoring** - Each transaction gets a risk score
- 🚨 **Real-time Blocking** - High-risk transactions blocked automatically

---

## 🏷️ Product Management

### **Dynamic Product Creation**
Products are created on-the-fly during checkout, not stored in Stripe:

```javascript
// Products defined in src/config/products.js
export const products = {
  ivermectinPaste: {
    name: "Durvalis Ivermectin Paste 1.87%",
    description: "Professional-grade apple-flavored dewormer",
    image: "/assets/Main-Image.webp",
    variations: [
      { id: '1-pack', name: '1 Pack', price: 29.99, quantity: 1 },
      { id: '3-pack', name: '3 Pack', price: 79.99, quantity: 3 },
      { id: '6-pack', name: '6 Pack', price: 149.99, quantity: 6 },
      { id: '12-pack', name: '12 Pack', price: 279.99, quantity: 12 },
    ]
  }
};
```

### **Benefits of Dynamic Products**
- ✅ **Single Source of Truth** - Products defined in your code
- ✅ **Easy Updates** - Change prices without touching Stripe
- ✅ **Clean Dashboard** - No clutter in Stripe product catalog
- ✅ **Flexible Pricing** - Dynamic pricing and promotions

---

## 💰 Pricing & Tax

### **Pricing Structure**
```javascript
// All prices in USD
const pricing = {
  '1-pack': 29.99,   // $29.99 per tube
  '3-pack': 79.99,   // $26.66 per tube (11% savings)
  '6-pack': 149.99,  // $25.00 per tube (17% savings)
  '12-pack': 279.99, // $23.33 per tube (22% savings)
};
```

### **Tax Calculation**
- **Stripe Tax** - Automatic tax calculation based on customer location
- **Real-time Rates** - Always up-to-date tax rates
- **Multi-jurisdiction** - Handles US states, Canadian provinces
- **Fallback** - Manual calculation if Stripe Tax unavailable

### **Shipping**
- 🚚 **Free Shipping** - No minimum order required
- 📦 **Standard Delivery** - 3-5 business days
- 🇺🇸 **US & Canada** - Supported shipping regions

---

## 📧 Email Notifications

### **Order Confirmation Emails**
Sent to both customer and business using EmailJS:

#### **Customer Email Includes:**
- ✅ Order number and date
- ✅ Complete item list with quantities
- ✅ Shipping address
- ✅ Delivery instructions
- ✅ Order total with tax breakdown
- ✅ Tracking information (when available)
- ✅ Support contact details

#### **Business Email Includes:**
- ✅ New order notification
- ✅ Customer contact information
- ✅ Complete order details
- ✅ Shipping requirements
- ✅ Special instructions

### **Email Template Features**
- 🎨 **Professional Design** - Branded HTML templates
- 📱 **Mobile Responsive** - Looks great on all devices
- 🔗 **Clickable Links** - Support email and phone links
- 📊 **Order Summary** - Clear breakdown of charges

---

## 🔄 Order Flow

### **Complete Customer Journey**

1. **Browse Products**
   - Customer views product page
   - Selects quantity/variation
   - Adds to cart

2. **Checkout Process**
   - Reviews cart contents
   - Enters email (optional)
   - Adds delivery instructions
   - Clicks "Proceed to Payment"

3. **Stripe Checkout**
   - Redirected to Stripe-hosted page
   - Enters payment information
   - Provides shipping address
   - Confirms order

4. **Payment Processing**
   - Stripe processes payment
   - Real-time fraud detection
   - 3D Secure if required

5. **Order Confirmation**
   - Success page displayed
   - Cart automatically cleared
   - Confirmation emails sent
   - Webhook processes order

6. **Fulfillment**
   - Business receives order notification
   - Order processed and shipped
   - Customer receives tracking info

---

## 🛠️ Environment Configuration

### **Required Environment Variables**

#### **Stripe Keys**
```env
# Test Mode (Development)
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Live Mode (Production)
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### **EmailJS Configuration**
```env
# Order Confirmation Emails
EMAILJS_SERVICE_ID=service_...
EMAILJS_ORDER_TEMPLATE_ID=template_...
EMAILJS_PUBLIC_KEY=...
EMAILJS_PRIVATE_KEY=...

# Contact Form Emails
VITE_EMAILJS_SERVICE_ID=service_...
VITE_EMAILJS_TEMPLATE_ID=template_...
VITE_EMAILJS_PUBLIC_KEY=...
```

#### **Domain Configuration**
```env
NEXT_PUBLIC_DOMAIN=https://durvalis.com
```

### **Variable Naming Convention**
- **`VITE_*`** - Frontend variables (exposed to browser)
- **No prefix** - Backend variables (server-side only, secure)

---

## 🔧 Development Setup

### **1. Stripe Dashboard Setup**

#### **Test Mode Setup**
1. Go to https://dashboard.stripe.com
2. Enable **Test Mode** (toggle in top-right)
3. Go to **Developers → API Keys**
4. Copy test keys to environment variables

#### **Webhook Setup**
1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. URL: `https://your-domain.vercel.app/api/webhooks.js`
4. Events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy webhook secret to environment variables

### **2. Local Development**

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Start development server
npm run dev

# Test with Stripe test cards
# Success: 4242 4242 4242 4242
# Decline: 4000 0000 0000 0002
```

### **3. Testing Checklist**

- [ ] **Add to Cart** - Products add correctly
- [ ] **Cart Persistence** - Cart survives page refresh
- [ ] **Checkout Form** - Email and instructions work
- [ ] **Stripe Redirect** - Redirects to Stripe Checkout
- [ ] **Test Payment** - Use test card numbers
- [ ] **Success Page** - Shows after successful payment
- [ ] **Cart Clearing** - Cart empties only on success
- [ ] **Email Notifications** - Both customer and business emails
- [ ] **Webhook Processing** - Check Vercel function logs

---

## 🚀 Production Deployment

### **1. Live Mode Activation**

#### **Stripe Account Requirements**
- ✅ **Business Verification** - Complete identity verification
- ✅ **Bank Account** - Add bank account for payouts
- ✅ **Tax Information** - Provide tax details
- ✅ **Compliance** - Meet regulatory requirements

#### **Switch to Live Keys**
1. Turn **OFF** test mode in Stripe Dashboard
2. Copy live API keys
3. Update Vercel environment variables
4. Create live webhook endpoint
5. Update webhook secret
6. Redeploy application

### **2. Stripe Tax Setup (Optional)**
1. Go to **Settings → Tax** in Stripe Dashboard
2. Enable Stripe Tax
3. Add business information
4. Configure tax registrations
5. Set product tax codes

### **3. Go-Live Checklist**

- [ ] **Live API Keys** - Updated in Vercel
- [ ] **Webhook Endpoint** - Created for live mode
- [ ] **Environment Variables** - All updated and redeployed
- [ ] **Test Transaction** - Small real payment test
- [ ] **Email Notifications** - Verify emails work in live mode
- [ ] **Tax Calculation** - Verify tax rates are correct
- [ ] **Bank Account** - Confirm payouts are set up
- [ ] **Monitoring** - Set up alerts for failed payments

---

## 📊 Monitoring & Analytics

### **Stripe Dashboard Metrics**
- 💰 **Revenue Tracking** - Real-time sales data
- 📈 **Conversion Rates** - Checkout completion rates
- 🚫 **Failed Payments** - Decline reasons and trends
- 🔄 **Refunds** - Refund requests and processing
- 🌍 **Geographic Data** - Sales by location

### **Vercel Function Logs**
- ✅ **Successful Checkouts** - Session creation logs
- ❌ **API Errors** - Failed requests and reasons
- 📧 **Email Status** - Email delivery confirmations
- 🔍 **Debug Information** - Detailed error messages

### **Key Metrics to Monitor**
- **Checkout Abandonment Rate** - Users who start but don't complete
- **Payment Success Rate** - Successful vs failed payments
- **Average Order Value** - Revenue per transaction
- **Email Delivery Rate** - Confirmation email success

---

## 🛡️ Security Best Practices

### **API Security**
- 🔐 **Environment Variables** - Never expose secrets in code
- 🔍 **Input Validation** - Validate all user inputs
- 🚫 **Rate Limiting** - Prevent API abuse
- 📝 **Logging** - Log security events

### **Webhook Security**
- ✅ **Signature Verification** - Verify webhook authenticity
- 🔒 **HTTPS Only** - Secure webhook endpoints
- 🎯 **Event Filtering** - Only process expected events
- 🔄 **Idempotency** - Handle duplicate events

### **Frontend Security**
- 🚫 **No Secrets** - Only publishable keys in frontend
- 🔐 **HTTPS Enforcement** - Force secure connections
- 🛡️ **CSP Headers** - Content Security Policy
- 🚨 **Error Handling** - Don't expose sensitive errors

---

## 🔧 Troubleshooting

### **Common Issues**

#### **"Invalid API Key" Error**
```
Error: Invalid API Key provided: sk_live_...
```
**Solutions:**
- Verify key is correct and not expired
- Check if using test key in live mode (or vice versa)
- Ensure account is activated for live payments
- Regenerate keys if necessary

#### **"Webhook Signature Verification Failed"**
```
Error: No signatures found matching the expected signature
```
**Solutions:**
- Verify webhook secret is correct
- Check webhook endpoint URL
- Ensure raw request body is used
- Verify webhook is active in Stripe

#### **"Checkout Session Creation Failed"**
```
Error: This customer does not exist in test mode
```
**Solutions:**
- Remove customer_creation: 'always' for test mode
- Use customer_email instead of customer
- Check Stripe account mode (test vs live)

#### **"Tax Calculation Failed"**
```
Error: Stripe Tax is not available
```
**Solutions:**
- Enable Stripe Tax in dashboard
- Complete business verification
- Add tax registrations
- Use fallback tax calculation

### **Debug Steps**
1. **Check Vercel Logs** - Function execution details
2. **Verify Environment Variables** - All keys present and correct
3. **Test API Endpoints** - Use curl or Postman
4. **Check Stripe Dashboard** - Events and logs
5. **Validate Webhook** - Test webhook delivery

---

## 📚 Additional Resources

### **Stripe Documentation**
- [Stripe Checkout Guide](https://stripe.com/docs/checkout)
- [Webhook Handling](https://stripe.com/docs/webhooks)
- [Stripe Tax Setup](https://stripe.com/docs/tax)
- [API Reference](https://stripe.com/docs/api)

### **Testing Resources**
- [Test Card Numbers](https://stripe.com/docs/testing#cards)
- [Webhook Testing](https://stripe.com/docs/webhooks/test)
- [3D Secure Testing](https://stripe.com/docs/testing#regulatory-cards)

### **Integration Examples**
- [React Integration](https://github.com/stripe-samples/checkout-one-time-payments)
- [Webhook Examples](https://github.com/stripe-samples/webhook-signing)
- [Tax Integration](https://github.com/stripe-samples/tax-calculation)

---

## 🎯 Summary

This Stripe integration provides:

- ✅ **Secure Payment Processing** - PCI compliant, fraud protection
- ✅ **Dynamic Product Creation** - No need to manage Stripe catalog
- ✅ **Automatic Tax Calculation** - Real-time tax rates
- ✅ **Order Confirmation Emails** - Professional notifications
- ✅ **Mobile-Optimized Checkout** - Works on all devices
- ✅ **Comprehensive Error Handling** - Graceful failure recovery
- ✅ **Production-Ready** - Scalable serverless architecture

The system is designed to be maintainable, secure, and user-friendly while providing a seamless checkout experience for customers.