# Vercel Deployment Debugging Guide

## Current Error
```
POST https://durvalis-a.vercel.app/api/create-checkout-session 500 (Internal Server Error)
```

## Step 1: Check Vercel Function Logs

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (durvalis)
3. Click on "Deployments" tab
4. Click on the latest deployment
5. Click on "Functions" tab
6. Find `api/create-checkout-session.js` and click "View Logs"
7. Look for the actual error message

## Step 2: Verify Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required Variables:**

### Stripe Variables (CRITICAL)
```
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_test_... or pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### EmailJS Variables (for order emails)
```
EMAILJS_SERVICE_ID=service_...
EMAILJS_ORDER_TEMPLATE_ID=template_...
EMAILJS_PUBLIC_KEY=...
EMAILJS_PRIVATE_KEY=...
```

### Domain Variable (optional but recommended)
```
NEXT_PUBLIC_DOMAIN=https://durvalis.com
```

**IMPORTANT:** 
- Make sure variables are set for "Production", "Preview", and "Development"
- After adding variables, you MUST redeploy for them to take effect

## Step 3: Common Issues & Solutions

### Issue 1: Missing STRIPE_SECRET_KEY
**Error in logs:** `stripe is not a constructor` or `Invalid API Key`
**Solution:** Add your Stripe secret key to Vercel environment variables

### Issue 2: Wrong Stripe Key Format
**Error in logs:** `Invalid API Key provided`
**Solution:** 
- Test keys start with `sk_test_`
- Live keys start with `sk_live_`
- Make sure there are no extra spaces or quotes

### Issue 3: Stripe Tax Not Enabled
**Error in logs:** `automatic_tax is not available`
**Solution:** Enable Stripe Tax in your Stripe Dashboard:
1. Go to https://dashboard.stripe.com/settings/tax
2. Click "Enable Stripe Tax"
3. Complete the setup wizard

### Issue 4: CORS Issues
**Error in logs:** `origin not allowed`
**Solution:** The API should automatically use `req.headers.origin`, but verify your domain is correct

### Issue 5: Request Body Parsing
**Error in logs:** `Cannot read property 'items' of undefined`
**Solution:** Vercel should auto-parse JSON, but check if `req.body` is undefined

## Step 4: Test API Directly

Use this curl command to test your API (replace with your actual domain):

```bash
curl -X POST https://durvalis-a.vercel.app/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "name": "Durvalis - 1 Pack",
        "price": 29.99,
        "quantity": 1,
        "image": "/assets/Main-Image.webp",
        "description": "Professional-grade apple-flavored dewormer"
      }
    ],
    "customerData": {
      "email": "test@example.com"
    }
  }'
```

Expected response:
```json
{"id": "cs_test_..."}
```

## Step 5: Check Vercel Function Configuration

Your `vercel.json` should be:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Step 6: Verify API File Structure

Your API files should be:
```
api/
├── create-checkout-session.js  (uses module.exports)
└── webhooks.js                 (uses module.exports)
```

Both files MUST use `module.exports = async function handler(req, res) { ... }`

## Step 7: Quick Fix Checklist

- [ ] Environment variables added to Vercel
- [ ] Redeployed after adding environment variables
- [ ] Stripe Tax enabled in Stripe Dashboard
- [ ] Using correct Stripe API keys (test or live)
- [ ] API files use `module.exports` syntax
- [ ] No syntax errors in API files
- [ ] Checked Vercel function logs for actual error

## Step 8: Get Detailed Error

If you still have issues, check the Vercel function logs to see the exact error message. The `console.error('Stripe error:', err)` in the code will show the real problem.

Common log errors:
- `No such customer` - Customer creation issue
- `Invalid tax calculation` - Stripe Tax not enabled
- `Invalid API Key` - Wrong or missing Stripe key
- `Rate limit exceeded` - Too many requests (wait a moment)

## Need Help?

1. Check Vercel function logs first (most important!)
2. Verify all environment variables are set
3. Test with curl command above
4. Check Stripe Dashboard for any issues
