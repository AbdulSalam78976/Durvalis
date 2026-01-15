# Stripe Integration Setup Guide

## Step 1: Get Your Stripe Keys

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to **Developers** → **API Keys**
3. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
4. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)

## Step 2: Configure Environment Variables

1. Create a `.env` file in your project root:
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here

# Domain (for production)
NEXT_PUBLIC_DOMAIN=https://durvalis.com
```

2. Add `.env` to your `.gitignore` file (already done)

## Step 3: Update Stripe Keys in Code

The code is already configured to use environment variables. Just make sure your `.env` file has the correct keys.

## Step 4: Configure Your Product in Stripe (Optional)

While the current setup creates products dynamically, you can also pre-configure your product in Stripe:

1. Go to **Products** in your Stripe Dashboard
2. Click **Add Product**
3. Set up your Durvalis Ivermectin Paste product
4. Note the Price ID if you want to use it instead of dynamic pricing

## Step 5: Test the Integration

### Test Mode (Recommended First)
1. Use test keys (starting with `pk_test_` and `sk_test_`)
2. Use test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Requires Authentication**: `4000 0025 0000 3155`
3. Use any future expiry date and any 3-digit CVC

### Live Mode
1. Switch to live keys (starting with `pk_live_` and `sk_live_`)
2. Test with real payment methods
3. Ensure your business is activated in Stripe

## Step 6: Deploy to Vercel

1. Add environment variables to Vercel:
   ```bash
   vercel env add STRIPE_SECRET_KEY
   vercel env add VITE_STRIPE_PUBLISHABLE_KEY
   vercel env add NEXT_PUBLIC_DOMAIN
   ```

2. Or add them in the Vercel dashboard under Project Settings → Environment Variables

## Step 7: Configure Webhooks (Optional)

For order fulfillment and inventory management, you might want to set up webhooks:

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Add endpoint: `https://yourdomain.com/api/webhooks`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy the webhook signing secret
5. Add to your environment variables as `STRIPE_WEBHOOK_SECRET`

## Features Included

### ✅ What's Working
- **Secure Checkout**: Stripe-hosted checkout page
- **Multiple Payment Methods**: Cards, Apple Pay, Google Pay
- **Address Collection**: Shipping and billing addresses
- **Tax Calculation**: Automatic tax calculation
- **Mobile Responsive**: Works on all devices
- **No User Accounts**: Guest checkout only
- **Order Confirmation**: Success page after payment

### 🚀 Additional Features You Can Add
- **Inventory Management**: Track stock levels
- **Order Fulfillment**: Automatic shipping label generation
- **Email Receipts**: Custom branded receipts
- **Discount Codes**: Promotional pricing
- **Subscription Options**: Recurring deliveries
- **International Shipping**: Multi-currency support

## Pricing Structure

Current setup:
- **Product**: $14.99
- **Shipping**: $5.99 (free over $35)
- **Tax**: 8% (configurable)

## Security Notes

- ✅ **PCI Compliant**: Stripe handles all payment data
- ✅ **No Sensitive Data**: No payment info stored locally
- ✅ **HTTPS Required**: Stripe requires SSL in production
- ✅ **Environment Variables**: Keys stored securely

## Testing Checklist

- [ ] Test successful payment with `4242 4242 4242 4242`
- [ ] Test declined payment with `4000 0000 0000 0002`
- [ ] Test different quantities (1-5 items)
- [ ] Test shipping calculation (under/over $35)
- [ ] Test mobile checkout flow
- [ ] Test address validation
- [ ] Verify success page displays correctly
- [ ] Check email receipts (if configured)

## Troubleshooting

### Common Issues

**"Invalid API Key"**
- Check your environment variables are set correctly
- Ensure you're using the right key for test/live mode
- Restart your development server after adding .env

**"No such customer"**
- This is normal - customers are created automatically
- Check your Stripe dashboard for new customers

**"Invalid request"**
- Check the API endpoint is working: `/api/create-checkout-session`
- Verify the request body format matches expected structure

**Checkout not loading**
- Check browser console for JavaScript errors
- Verify Stripe publishable key is loaded correctly
- Test with different browsers

### Getting Help

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com
- **Test Cards**: https://stripe.com/docs/testing#cards

## Production Deployment

1. **Switch to Live Keys**: Replace test keys with live keys
2. **Activate Stripe Account**: Complete business verification
3. **Update Domain**: Set correct domain in environment variables
4. **Test Live Payments**: Use real payment methods
5. **Monitor Dashboard**: Watch for successful transactions

## Next Steps

After basic integration is working:

1. **Add Order Management**: Track orders in your system
2. **Implement Webhooks**: Handle post-payment actions
3. **Add Analytics**: Track conversion rates
4. **Optimize Checkout**: A/B test different flows
5. **Add More Products**: Expand your catalog

## Support

For technical issues with this integration:
- Check the Stripe Dashboard for error logs
- Review browser console for JavaScript errors
- Test with Stripe's test card numbers
- Contact support@durvalis.com for help