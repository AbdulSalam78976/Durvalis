# Vercel Environment Variables Setup

## Required Environment Variables for Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables for **Production**, **Preview**, and **Development** environments:

---

## 1. Stripe Variables (REQUIRED)

### Backend (Server-side)
```


```
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_your_webhook_secret_here
Used in: api/webhooks.js
Note: Get this from Stripe Dashboard → Developers → Webhooks → Add endpoint
```

### Frontend (Client-side)
```
Name: VITE_STRIPE_PUBLISHABLE_KEY
Value: pk_test_51SBhfCCjCibczXLv1OZMv6j0OIjnGROaEymC16FVs1mB8cPVoLCbDVM9qdF90Z3Le4qPLyQaVpU8fyrW6Ud18kop00GUX3yi5g
Used in: src/components/Checkout.jsx
Note: MUST start with VITE_ for Vite to expose it to frontend
```

---

## 2. EmailJS Variables (REQUIRED for order emails)

```
Name: EMAILJS_SERVICE_ID
Value: your_service_id
Used in: api/webhooks.js
```

```
Name: EMAILJS_ORDER_TEMPLATE_ID
Value: your_order_template_id
Used in: api/webhooks.js
```

```
Name: EMAILJS_PUBLIC_KEY
Value: your_public_key
Used in: api/webhooks.js
```

```
Name: EMAILJS_PRIVATE_KEY
Value: your_private_key
Used in: api/webhooks.js
```

### Frontend EmailJS (for contact form)
```
Name: VITE_EMAILJS_SERVICE_ID
Value: your_service_id
Used in: src/components/ContactForm.jsx
```

```
Name: VITE_EMAILJS_TEMPLATE_ID
Value: your_template_id
Used in: src/components/ContactForm.jsx
```

```
Name: VITE_EMAILJS_PUBLIC_KEY
Value: your_public_key
Used in: src/components/ContactForm.jsx
```

---

## 3. Domain Variable (OPTIONAL)

```
Name: NEXT_PUBLIC_DOMAIN
Value: https://durvalis.com
Used in: api/create-checkout-session.js (for product images)
```

---

## Important Notes

### Variable Naming Convention
- **`VITE_*`** prefix = Frontend variables (exposed to browser)
- **No prefix** = Backend variables (server-side only, secure)

### Where Each Variable is Used

| Variable | Location | Purpose |
|----------|----------|---------|
| `STRIPE_SECRET_KEY` | Backend API | Create checkout sessions, process payments |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Frontend | Initialize Stripe.js in browser |
| `STRIPE_WEBHOOK_SECRET` | Backend API | Verify webhook signatures |
| `EMAILJS_*` | Backend API | Send order confirmation emails |
| `VITE_EMAILJS_*` | Frontend | Contact form submissions |

### After Adding Variables
1. **MUST REDEPLOY** - Environment variables only take effect after redeployment
2. Click "Redeploy" in Vercel dashboard or push a new commit
3. Variables are encrypted and secure in Vercel

### Security
- Never commit `.env` file to git (already in `.gitignore`)
- Backend variables (without `VITE_` prefix) are never exposed to browser
- Frontend variables (with `VITE_` prefix) are public - don't put secrets there

---

## Quick Setup Checklist

- [ ] Add `STRIPE_SECRET_KEY` to Vercel
- [ ] Add `VITE_STRIPE_PUBLISHABLE_KEY` to Vercel (note the VITE_ prefix!)
- [ ] Add `STRIPE_WEBHOOK_SECRET` to Vercel
- [ ] Add all 4 `EMAILJS_*` variables to Vercel (backend)
- [ ] Add all 3 `VITE_EMAILJS_*` variables to Vercel (frontend)
- [ ] Select all environments (Production, Preview, Development)
- [ ] Click "Save" for each variable
- [ ] **Redeploy the project**
- [ ] Test checkout on live site

---

## Testing

After deployment, test:
1. Visit your live site
2. Add product to cart
3. Go to checkout
4. Fill in details
5. Click "Proceed to Payment"
6. Should redirect to Stripe checkout (not 500 error)

If you still get 500 error:
- Check Vercel function logs (Dashboard → Deployments → Functions → View Logs)
- Verify all variables are set correctly
- Make sure you redeployed after adding variables
