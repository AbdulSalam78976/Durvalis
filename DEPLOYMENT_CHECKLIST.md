# 🚀 Deployment Checklist

## ✅ Pre-Deployment

### Code Preparation
- [x] All code committed to Git
- [x] `vercel.json` configuration file created
- [x] API endpoints in `/api` folder
- [x] Email notification system implemented
- [x] Environment variables documented in `.env.example`
- [x] Build script configured in `package.json`

### Accounts Setup
- [ ] Vercel account created
- [ ] Stripe account created (live mode)
- [ ] EmailJS account created
- [ ] Git repository (GitHub/GitLab/Bitbucket)

## 📝 Environment Variables Needed

### Stripe (Required)
```
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### EmailJS - Contact Form (Required)
```
VITE_EMAILJS_SERVICE_ID=service_...
VITE_EMAILJS_TEMPLATE_ID=template_...
VITE_EMAILJS_PUBLIC_KEY=...
```

### EmailJS - Order Emails (Required)
```
EMAILJS_SERVICE_ID=service_...
EMAILJS_ORDER_TEMPLATE_ID=template_...
EMAILJS_PUBLIC_KEY=...
EMAILJS_PRIVATE_KEY=...
```

### Domain (Required)
```
NEXT_PUBLIC_DOMAIN=https://your-domain.com
```

## 🔧 Deployment Steps

### 1. Deploy to Vercel
- [ ] Push code to Git repository
- [ ] Import project in Vercel Dashboard
- [ ] Configure build settings (auto-detected)
- [ ] Deploy

### 2. Configure Environment Variables
- [ ] Add all Stripe variables
- [ ] Add all EmailJS variables
- [ ] Add domain variable
- [ ] Redeploy after adding variables

### 3. Set Up Stripe Webhook
- [ ] Go to Stripe Dashboard → Webhooks
- [ ] Add endpoint: `https://your-domain.vercel.app/api/webhooks`
- [ ] Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
- [ ] Copy webhook signing secret
- [ ] Add `STRIPE_WEBHOOK_SECRET` to Vercel
- [ ] Redeploy

### 4. Enable Stripe Tax
- [ ] Go to Stripe Dashboard → Settings → Tax
- [ ] Enable Stripe Tax
- [ ] Add business information
- [ ] Add tax registrations

### 5. Configure EmailJS
- [ ] Create order confirmation template
- [ ] Set template content to use `{{{html_content}}}`
- [ ] Get template ID
- [ ] Get private key from Account settings
- [ ] Add to Vercel environment variables

## 🧪 Testing

### Test Checkout Flow
- [ ] Visit deployed site
- [ ] Add items to cart
- [ ] Proceed to checkout
- [ ] Fill in shipping details
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Complete payment
- [ ] Verify redirect to success page

### Test Email Notifications
- [ ] Check customer email inbox
- [ ] Check business email (contact@durvalis.com)
- [ ] Verify order details are correct
- [ ] Verify email formatting looks good

### Test Stripe Integration
- [ ] Check Stripe Dashboard for payment
- [ ] Verify webhook was triggered
- [ ] Check webhook logs for errors
- [ ] Verify tax was calculated

### Test on Devices
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile (iOS Safari, Android Chrome)
- [ ] Tablet
- [ ] Different screen sizes

## 🔒 Security Verification

- [ ] Using **live** Stripe keys (not test)
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables not in code
- [ ] `.env` file in `.gitignore`
- [ ] Webhook signature verification enabled
- [ ] Input validation on all forms

## 📊 Post-Deployment

### Monitoring Setup
- [ ] Enable Vercel deployment notifications
- [ ] Enable Stripe email notifications
- [ ] Monitor EmailJS usage quota
- [ ] Set up Google Analytics (optional)

### SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify site ownership
- [ ] Request indexing for main pages
- [ ] Check meta tags are correct

### Custom Domain (Optional)
- [ ] Add domain in Vercel Dashboard
- [ ] Configure DNS records
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate

## ✅ Go-Live Checklist

Before announcing your site:

- [ ] All tests passed
- [ ] Emails sending correctly
- [ ] Payments processing successfully
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Stripe Tax enabled
- [ ] Webhook working
- [ ] Contact form working

## 🎉 You're Live!

Once all items are checked:
- ✅ Site is secure
- ✅ Payments working
- ✅ Emails sending
- ✅ Ready for customers

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **EmailJS Docs**: https://www.emailjs.com/docs
- **Deployment Guide**: See `VERCEL_DEPLOYMENT.md`

---

**Last Updated**: January 15, 2025
**Status**: Ready for Deployment ✅
