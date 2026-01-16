# Email Notifications Setup

## Overview

The system sends order confirmation emails to both the customer and your business email (contact@durvalis.com) when a payment is completed.

## Email Content

The order confirmation email includes:
- ✅ Order number and date
- ✅ Customer information
- ✅ Complete list of items ordered
- ✅ Quantities and prices
- ✅ Shipping address
- ✅ Delivery instructions (if provided)
- ✅ Total amount paid (including tax)
- ✅ What's next information
- ✅ Support contact details

## Setup Instructions

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service

1. In EmailJS Dashboard, go to **Email Services**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook**
   - **Yahoo**
   - Or use SMTP for custom email
4. Connect your email account
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Order Confirmation Template

1. Go to **Email Templates**
2. Click **"Create New Template"**
3. Configure template:

**Template Name**: Order Confirmation

**Template ID**: Copy this (e.g., `template_xyz789`)

**Subject**:
```
{{subject}}
```

**Content** (HTML):
```html
{{{html_content}}}
```

**Important**: Use triple braces `{{{` for html_content to render HTML properly!

4. Click **"Save"**

### Step 4: Get API Keys

1. Go to **Account** → **General**
2. Find **API Keys** section
3. Copy:
   - **Public Key** (e.g., `abc123xyz`)
   - **Private Key** (click "Create" if you don't have one)

### Step 5: Add Environment Variables

Add these to your `.env` file and Vercel:

```env
# EmailJS - Order Confirmation
EMAILJS_SERVICE_ID=service_abc123
EMAILJS_ORDER_TEMPLATE_ID=template_xyz789
EMAILJS_PUBLIC_KEY=abc123xyz
EMAILJS_PRIVATE_KEY=your_private_key_here
```

### Step 6: Test Email Sending

1. Deploy to Vercel with environment variables
2. Make a test purchase
3. Check both email inboxes:
   - Customer email (the one you entered at checkout)
   - Business email (contact@durvalis.com)

## Email Flow

```
Customer completes payment
         ↓
Stripe processes payment
         ↓
Stripe sends webhook to /api/webhooks
         ↓
Webhook handler formats order details
         ↓
Sends email via EmailJS API
         ↓
Customer receives confirmation email
         ↓
Business receives order notification
```

## Troubleshooting

### Emails Not Sending

**Check EmailJS Dashboard**:
1. Go to **Email Log**
2. Look for recent attempts
3. Check for error messages

**Common Issues**:

1. **Template ID incorrect**
   - Verify `EMAILJS_ORDER_TEMPLATE_ID` matches template
   - Check for typos

2. **Private key missing**
   - Ensure `EMAILJS_PRIVATE_KEY` is set
   - Create one in Account settings if needed

3. **Service not connected**
   - Reconnect your email service
   - Check service status in dashboard

4. **HTML not rendering**
   - Use `{{{html_content}}}` (triple braces)
   - Not `{{html_content}}` (double braces)

5. **Rate limit exceeded**
   - Free plan: 200 emails/month
   - Upgrade plan if needed

### Webhook Not Triggering

**Check Stripe Dashboard**:
1. Go to **Developers** → **Webhooks**
2. Click on your webhook
3. Check **Recent deliveries**
4. Look for errors

**Common Issues**:
- Webhook URL incorrect
- Webhook secret not set
- Events not selected

### Email Goes to Spam

**Solutions**:
1. Use a verified email service
2. Add SPF/DKIM records (for custom domains)
3. Ask recipients to whitelist your email
4. Use a professional email service (not Gmail for production)

## Email Customization

### Change Email Design

Edit the `formatOrderEmail()` function in `api/webhooks.cjs`:

```javascript
function formatOrderEmail(session, lineItems) {
  // Modify HTML template here
  return `
    <!DOCTYPE html>
    <html>
      <!-- Your custom HTML -->
    </html>
  `;
}
```

### Change Business Email

Update the email address in `api/webhooks.cjs`:

```javascript
const businessEmail = 'your-email@yourdomain.com';
```

### Add More Email Types

You can add more email notifications:
- Shipping confirmation
- Delivery notification
- Review request
- Abandoned cart reminder

## Production Recommendations

### For High Volume

1. **Use a dedicated email service**:
   - SendGrid
   - Mailgun
   - Amazon SES
   - Postmark

2. **Implement email queue**:
   - Use a job queue (Bull, BullMQ)
   - Retry failed emails
   - Handle rate limits

3. **Monitor email delivery**:
   - Track open rates
   - Monitor bounce rates
   - Check spam complaints

### For Better Deliverability

1. **Use custom domain**:
   - emails@durvalis.com
   - orders@durvalis.com

2. **Set up email authentication**:
   - SPF records
   - DKIM signing
   - DMARC policy

3. **Professional email service**:
   - Google Workspace
   - Microsoft 365
   - Custom SMTP server

## Testing

### Test Email Locally

You can test the email format without deploying:

1. Copy the HTML from `formatOrderEmail()`
2. Save as `test-email.html`
3. Open in browser to preview
4. Check on mobile devices

### Test with Stripe Test Mode

1. Use test Stripe keys
2. Make test purchase
3. Check webhook logs
4. Verify emails sent

## Support

- **EmailJS Docs**: https://www.emailjs.com/docs
- **EmailJS Support**: support@emailjs.com
- **Stripe Webhooks**: https://stripe.com/docs/webhooks

---

**Email System Status**: ✅ Configured
**Emails Sent To**: Customer + Business
**Email Service**: EmailJS
