# Durvalis - E-Commerce Website

A modern, responsive e-commerce website for Durvalis Ivermectin Paste, built with React, Vite, and Stripe integration.

## 🎯 Project Overview

This is a single-page application (SPA) for selling equine parasite control products with integrated Stripe payment processing, shopping cart functionality, and contact form.

## 🏗️ Project Structure

```
durvalis/
├── api/                          # Backend API endpoints
│   ├── create-checkout-session.cjs  # Stripe checkout session creation
│   └── webhooks.cjs                 # Stripe webhook handler
├── public/                       # Static assets
│   ├── assets/                   # Product images
│   │   ├── payment methods/      # Payment method icons
│   │   └── *.webp               # Product images
│   ├── favicon/                  # Favicon files
│   ├── robots.txt               # SEO robots file
│   └── sitemap.xml              # SEO sitemap
├── src/
│   ├── components/              # React components
│   │   ├── CartSidebar.jsx      # Shopping cart sidebar
│   │   ├── Checkout.jsx         # Checkout page
│   │   ├── CheckoutSuccess.jsx  # Success page after payment
│   │   ├── ContactForm.jsx      # Contact form with EmailJS
│   │   ├── FAQ.jsx              # FAQ section
│   │   ├── FDAApproval.jsx      # FDA approval section
│   │   ├── Footer.jsx           # Site footer
│   │   ├── Header.jsx           # Site header with navigation
│   │   ├── Hero.jsx             # Homepage hero section
│   │   ├── HowToUse.jsx         # Product usage instructions
│   │   ├── ProductDetails.jsx   # Product details page
│   │   ├── ProductVariations.jsx # Product pack size selection
│   │   ├── SafetyBrand.jsx      # Safety and brand info
│   │   └── SEO.jsx              # SEO meta tags component
│   ├── context/
│   │   └── CartContext.jsx      # Shopping cart state management
│   ├── pages/
│   │   ├── HomePage.jsx         # Home page layout
│   │   ├── ProductPage.jsx      # Product page layout
│   │   └── ContactPage.jsx      # Contact page layout
│   ├── config/
│   │   └── products.js          # Product data and configuration
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── .env.example                 # Environment variables template
├── EMAILJS_SETUP.md            # EmailJS configuration guide
├── STRIPE_SETUP.md             # Stripe setup instructions
├── STRIPE_TAX_SETUP.md         # Stripe Tax configuration
└── package.json                # Dependencies and scripts
```

## 🔄 Application Flow

### 1. Homepage (`/`)
- **Hero Section**: Main CTA with two buttons
  - "Buy Now" → Redirects to Product page
  - "Shop on Amazon" → Opens Amazon in new tab
- **How to Use**: Product usage instructions
- **Safety & Brand**: Trust indicators and brand information
- **FDA Approval**: Certification and compliance info
- **FAQ**: Frequently asked questions

### 2. Product Page (`/product`)
- **Image Gallery**: Product photos with thumbnail navigation
- **Product Specifications**: Detailed product information
- **Pack Size Selection**: Choose from 7 variations (1, 2, 3, 4, 6, 12, 24 packs)
- **Quantity Selector**: Adjust order quantity
- **Two Action Buttons**:
  - **Add to Cart** → Opens cart sidebar
  - **Buy Now** → Adds to cart and goes directly to checkout

### 3. Shopping Cart (Sidebar)
- View all added items
- Adjust quantities
- Remove items
- See subtotal and savings
- "Checkout" button → Proceeds to checkout page

### 4. Checkout Page (`/checkout`)

**Step 1: Shipping Details**
- Contact Information (email, phone)
- Shipping Address (name, address, city, state, ZIP)
- Delivery Instructions (optional)

**Step 2: Review & Payment**
- Order Summary with item details
- Price Breakdown:
  - Subtotal
  - Shipping: FREE
  - Tax: Calculated by Stripe
- Stripe Payment Button
- Redirects to Stripe Checkout

### 5. Stripe Checkout (External)
- Secure payment processing
- Card information entry
- Address confirmation
- Automatic tax calculation via Stripe Tax
- Payment completion

### 6. Success Page (`/success`)
- Order confirmation message
- Thank you note
- "Continue Shopping" button

### 7. Contact Page (`/contact`)
- Contact form with EmailJS integration
- Business information display
- Contact details (email, phone, address)

## 🛒 Shopping Cart System

### Cart Context (`CartContext.jsx`)
Global state management for shopping cart with localStorage persistence.

**Functions:**
- `addItem(product, variation, quantity)` - Add item to cart
- `updateQuantity(itemId, quantity)` - Update item quantity
- `removeItem(itemId)` - Remove item from cart
- `clearCart()` - Empty entire cart
- `subtotal` - Calculate total price
- `totalSavings` - Calculate total savings

**Cart Item Structure:**
```javascript
{
  id: 'unique-id',
  name: 'Durvalis Ivermectin Paste 1.87%',
  variationName: '6-Pack',
  price: 54.99,
  originalPrice: 62.99,
  quantity: 2,
  packQuantity: 6,
  image: '/assets/1.webp'
}
```

## 💳 Payment Flow

### 1. Client-Side (Checkout.jsx)
```javascript
// User fills form → Validates data → Sends to API
fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: cartItems,
    customerData: formData
  })
})
```

### 2. Server-Side (create-checkout-session.cjs)
```javascript
// Validates input → Creates Stripe session → Returns session ID
const session = await stripe.checkout.sessions.create({
  line_items: items,
  automatic_tax: { enabled: true },
  shipping_options: [{ amount: 0 }], // Free shipping
  success_url: '/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: '/checkout'
})
```

### 3. Stripe Checkout
- User enters payment details on Stripe's secure page
- Stripe processes payment
- Redirects to success page on completion

### 4. Webhooks (webhooks.cjs)
- Receives payment confirmation from Stripe
- Logs order details
- Can trigger order fulfillment process

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Stripe Keys (Get from https://dashboard.stripe.com)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# EmailJS Configuration (Get from https://www.emailjs.com)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Domain (for production)
NEXT_PUBLIC_DOMAIN=https://durvalis.com
```

### Product Configuration (`src/config/products.js`)

```javascript
export const products = {
  ivermectinPaste: {
    id: 'ivermectin-paste-187',
    name: 'Durvalis Ivermectin Paste 1.87%',
    basePrice: 14.99,
    variations: [
      { id: 'pack-1', quantity: 1, price: 14.99, originalPrice: 19.99 },
      { id: 'pack-6', quantity: 6, price: 54.99, originalPrice: 62.99, popular: true },
      // ... more variations
    ]
  }
};

export const shipping = {
  freeShippingThreshold: 0, // Free for all orders
  standardRate: 0
};

export const tax = {
  useStripeTax: true, // Automatic tax calculation
  defaultRate: 0.08   // Fallback rate (8%)
};
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Add your API keys to .env file
```

### Development

```bash
# Start development server
npm run dev

# Access at http://localhost:5173
```

**⚠️ Note**: The `/api/create-checkout-session` endpoint requires a backend server. In development, you'll need to deploy to a platform that supports serverless functions (Vercel, Netlify, AWS Lambda) or set up a local backend server.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Dependencies

### Core
- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework

### Features
- **@stripe/stripe-js** - Stripe payment integration
- **@emailjs/browser** - Contact form email service
- **framer-motion** - Animation library
- **lucide-react** - Icon library

## 🔒 Security Features

✅ **Input Validation** - All forms validated client and server-side
✅ **Data Sanitization** - User inputs cleaned and validated
✅ **PCI Compliance** - Stripe Checkout handles all card data
✅ **HTTPS Enforced** - SSL certificate required in production
✅ **Environment Variables** - Secrets never in code
✅ **Error Handling** - Safe error messages, no internal details exposed
✅ **Rate Limiting** - Protected against abuse
✅ **XSS Protection** - React automatically escapes content

## 📱 Responsive Design

- **Mobile-First** approach
- **Breakpoints**: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **Touch-Friendly** buttons and navigation
- **Optimized Images** - WebP format for fast loading

## 🎨 Design Features

- Modern, clean UI with gradient backgrounds
- Smooth animations with Framer Motion
- Consistent color scheme (red primary: #dc2626)
- Professional typography
- Trust indicators and badges
- Payment method icons
- Responsive navigation with mobile menu

## 📊 SEO Optimization

✅ Meta tags for all pages
✅ Open Graph tags for social sharing
✅ Structured data (Schema.org)
✅ Sitemap.xml for search engines
✅ Robots.txt for crawler instructions
✅ Favicon (multiple sizes)
✅ Semantic HTML structure
✅ Alt text on all images

## 🔗 External Integrations

### Stripe
- Payment processing
- Automatic tax calculation (Stripe Tax)
- Checkout session management
- Webhook handling for order confirmation
- **Order confirmation emails** (sent to customer and business)

### EmailJS
- Contact form submissions
- **Order confirmation emails** with full order details
- Email notifications
- No backend email server required

### Amazon
- Alternative purchase option
- Direct product link integration

## 📝 Documentation

- **STRIPE_SETUP.md** - Complete Stripe integration guide
- **STRIPE_TAX_SETUP.md** - Stripe Tax configuration instructions
- **EMAILJS_SETUP.md** - EmailJS setup and configuration

## 🚀 Deployment

This project requires a platform that supports serverless functions:

### Recommended Platforms:

1. **Vercel**
   - Automatic serverless function support
   - Easy environment variable management
   - Free SSL certificate
   - GitHub integration

2. **Netlify**
   - Netlify Functions support
   - Similar setup to Vercel
   - Free tier available

3. **AWS Lambda + S3**
   - More configuration required
   - Full control over infrastructure
   - Scalable solution

### Deployment Steps:

1. Push code to Git repository (GitHub, GitLab, Bitbucket)
2. Connect repository to deployment platform
3. Add environment variables in platform dashboard
4. Deploy (automatic on push)
5. Configure custom domain (optional)

## 🧪 Testing

### Stripe Test Cards

Use these cards in **test mode**:

```
✅ Success: 4242 4242 4242 4242
❌ Decline: 4000 0000 0000 0002
🔐 3D Secure: 4000 0025 0000 3155
```

- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

### Test Flow:

1. Add items to cart
2. Go to checkout
3. Fill in shipping details
4. Click "Complete Purchase"
5. Enter test card on Stripe page
6. Verify redirect to success page
7. Check Stripe Dashboard for payment

## 📞 Support & Contact

- **Email**: contact@durvalis.com
- **Phone**: 737-999-0318
- **Address**: 5900 Balcones Dr #22995, Austin, TX 78731

## 📄 License

Private - All rights reserved © 2025 Durvalis

---

**Built with ❤️ for Durvalis**
