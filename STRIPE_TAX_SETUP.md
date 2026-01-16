# Stripe Tax Setup Guide

## Overview

This application uses **Stripe Tax** for automatic tax calculation based on customer location. Stripe Tax automatically calculates, collects, and reports sales tax, VAT, and GST across multiple jurisdictions.

## Current Configuration

### Shipping
- **Free shipping on ALL orders** (no minimum threshold)
- Standard delivery: 3-5 business days
- No shipping charges applied

### Tax Calculation
- **Automatic tax calculation** using Stripe Tax
- Tax is calculated in real-time based on:
  - Customer's shipping address
  - Product type
  - Local tax rates and regulations
- Fallback rate: 8% (only used if Stripe Tax fails)

## How It Works

1. **Checkout Flow**:
   - Customer adds items to cart
   - Proceeds to checkout
   - Enters shipping address
   - Stripe Tax automatically calculates applicable taxes
   - Final total shown at Stripe checkout page

2. **Tax Display**:
   - In cart/checkout: Shows "Tax (Calculated at checkout)"
   - Estimated total shown without tax
   - Final total with accurate tax shown on Stripe payment page

## Stripe Dashboard Setup

To enable Stripe Tax in your Stripe account:

### Step 1: Enable Stripe Tax
1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Settings** → **Tax**
3. Click **Enable Stripe Tax**
4. Follow the setup wizard

### Step 2: Configure Tax Settings
1. **Business Information**:
   - Enter your business name
   - Add your business address
   - Provide tax registration numbers (if applicable)

2. **Tax Registrations**:
   - Add locations where you're registered to collect tax
   - For US businesses: Add states where you have nexus
   - Stripe will automatically calculate tax for these jurisdictions

3. **Product Tax Codes**:
   - Assign appropriate tax codes to your products
   - For equine products, use relevant category codes
   - Default: General merchandise

### Step 3: Test Mode
1. Enable test mode in Stripe Dashboard
2. Use test cards to verify tax calculation
3. Check different shipping addresses to see tax variations

### Step 4: Go Live
1. Switch to live mode in Stripe Dashboard
2. Update environment variables with live keys
3. Verify tax collection is working correctly

## Environment Variables

Make sure these are set in your `.env` file:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_SECRET_KEY=sk_live_your_key_here
```

For testing:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

## Code Implementation

### API Configuration (`api/create-checkout-session.cjs`)
```javascript
automatic_tax: {
  enabled: true,
}
```

This enables Stripe Tax for the checkout session.

### Shipping Configuration (`src/config/products.js`)
```javascript
export const shipping = {
  freeShippingThreshold: 0, // Free for all orders
  standardRate: 0,
  // ...
};

export const tax = {
  useStripeTax: true,
  defaultRate: 0.08, // Fallback only
  // ...
};
```

## Benefits of Stripe Tax

1. **Automatic Calculation**: No need to maintain tax rate tables
2. **Always Up-to-Date**: Stripe updates rates automatically
3. **Multi-Jurisdiction**: Handles US states, Canadian provinces, etc.
4. **Compliance**: Helps with tax reporting and filing
5. **Accuracy**: Reduces errors in tax calculation

## Pricing

Stripe Tax pricing:
- 0.5% of transaction volume
- $0.50 minimum per transaction
- Included in Stripe's standard processing fees

## Testing

### Test Addresses
Use these addresses to test different tax rates:

**California (High Tax)**:
```
123 Main St
Los Angeles, CA 90001
```

**Texas (Moderate Tax)**:
```
456 Oak Ave
Austin, TX 78701
```

**Oregon (No Sales Tax)**:
```
789 Pine Rd
Portland, OR 97201
```

### Test Cards
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Troubleshooting

### Tax Not Calculating
1. Verify Stripe Tax is enabled in dashboard
2. Check that `automatic_tax: { enabled: true }` is in API
3. Ensure shipping address is collected
4. Verify business address is set in Stripe

### Wrong Tax Amount
1. Check tax registrations in Stripe Dashboard
2. Verify product tax codes are correct
3. Ensure customer address is accurate

### Fallback Tax Rate
If Stripe Tax fails, the system uses the 8% fallback rate defined in `products.js`. This should rarely happen but provides a safety net.

## Support

For issues with Stripe Tax:
- [Stripe Tax Documentation](https://stripe.com/docs/tax)
- [Stripe Support](https://support.stripe.com)
- Check Stripe Dashboard logs for errors

## Migration Notes

**Previous Setup**: Manual tax calculation at 8% fixed rate
**Current Setup**: Automatic Stripe Tax calculation
**Impact**: More accurate tax collection, better compliance

The fallback rate remains at 8% for backwards compatibility, but Stripe Tax will handle actual calculations in production.
