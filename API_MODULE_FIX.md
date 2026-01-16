# API Module System Fix

## Issue
Vercel was throwing error:
```
ReferenceError: require is not defined in ES module scope
```

## Root Cause
- `package.json` has `"type": "module"` (required by Vite)
- This makes ALL `.js` files ES modules by default
- API files were using CommonJS syntax (`require`, `module.exports`)
- Vercel's Node.js runtime couldn't load them

## Solution
Converted API files to use ES module syntax:

### Before (CommonJS)
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
module.exports = async function handler(req, res) { ... }
```

### After (ES Modules)
```javascript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) { ... }
```

## Files Changed
- ✅ `api/create-checkout-session.js` - Now uses `import`/`export`
- ✅ `api/webhooks.js` - Now uses `import`/`export`

## Why This Works
- ES modules are the modern standard
- Compatible with Vite's `"type": "module"` setting
- Vercel's Node.js runtime supports ES modules natively
- No need to rename files to `.cjs`

## Status
✅ **FIXED** - API files now use correct module syntax for Vercel deployment
