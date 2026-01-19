// Product configuration
export const products = {
  ivermectinPaste: {
    id: 'ivermectin-paste-187',
    name: 'Durvalis Ivermectin Paste 1.87%',
    basePrice: 14.99,
    currency: 'USD',
    image: '/assets/1.webp',
    images: [
      '/assets/1.webp',
      '/assets/2.webp',
      '/assets/3.webp',
      '/assets/4.webp',
    ],
    description: 'Professional-grade apple-flavored dewormer for complete equine parasite control',
    longDescription: 'Our premium Ivermectin Paste 1.87% provides comprehensive parasite control for horses up to 1,250 lbs. The apple-flavored formula ensures easy administration while delivering maximum effectiveness against major equine parasites.',
    features: [
      'Single-dose oral syringe up to 1,250 lbs',
      'Apple flavor for easy administration', 
      'FDA approved formula (NADA #200-326)',
      'Safe for all breeds, foals, mares, and stallions',
      'Effective against major equine parasites',
      'Vet-recommended formula with precise dosing'
    ],
    specifications: {
      activeIngredient: 'Ivermectin 1.87%',
      treatmentWeight: 'Up to 1,250 lbs',
      netWeight: '0.21 oz (6.08 g)',
      flavor: 'Apple',
      form: 'Oral Paste',
      administration: 'Single Dose'
    },
    variations: [
  {
    id: 'pack-1',
    name: 'Single Tube',
    quantity: 1,
    price: 0.1,
    originalPrice: 19.99,
    savings: 5.00,
    popular: false,
    description: 'Perfect for single horse treatment'
  },
  {
    id: 'pack-2',
    name: '2-Pack',
    quantity: 2,
    price: 21.99,
    originalPrice: 25.99,
    savings: 4.00,
    popular: false,
    description: 'Ideal for short-term or dual horse use'
  },
  {
    id: 'pack-3',
    name: '3-Pack',
    quantity: 3,
    price: 34.99,
    originalPrice: 41.99,
    savings: 7.00,
    popular: false,
    description: 'Great for multiple horses or seasonal treatment'
  },
  {
    id: 'pack-4',
    name: '4-Pack',
    quantity: 4,
    price: 44.99,
    originalPrice: 51.99,
    savings: 7.00,
    popular: false,
    description: 'Balanced value for small stables'
  },
  {
    id: 'pack-6',
    name: '6-Pack',
    quantity: 6,
    price: 54.99,
    originalPrice: 62.99,
    savings: 8.00,
    popular: true,
    description: 'Most popular – Best value for horse owners'
  },
  {
    id: 'pack-12',
    name: '12-Pack',
    quantity: 12,
    price: 99.99,
    originalPrice: 119.99,
    savings: 20.00,
    popular: false,
    description: 'Professional pack for farms and breeders'
  },
  {
    id: 'pack-24',
    name: '24-Pack',
    quantity: 24,
    price: 179.99,
    originalPrice: 209.99,
    savings: 30.00,
    popular: false,
    description: 'Bulk pack – Maximum savings for large operations'
  }
],
    category: 'Equine Health',
    tags: ['dewormer', 'parasite control', 'equine', 'veterinary', 'apple flavored'],
    inStock: true,
    shippingWeight: 0.5, // lbs per unit
    dimensions: {
      length: 6, // inches
      width: 1,
      height: 1
    }
  }
};

// Shipping configuration
export const shipping = {
  freeShippingThreshold: 0, // Free shipping for all orders
  standardRate: 0, // Always free
  expeditedRate: 12.99,
  allowedCountries: ['US', 'CA'],
  estimatedDays: {
    standard: '3-5 business days',
    expedited: '1-2 business days'
  }
};

// Tax configuration - Using Stripe Tax for automatic calculation
export const tax = {
  useStripeTax: true, // Enable Stripe Tax for automatic calculation
  defaultRate: 0.08, // 8% fallback rate (only used if Stripe Tax fails)
  // State-specific rates (fallback only)
  stateRates: {
    'CA': 0.0875,
    'NY': 0.08,
    'TX': 0.0625,
    'FL': 0.06,
    // Add more states as needed
  }
};

// Business information
export const business = {
  name: 'Durvalis',
  email: 'contact@durvalis.com',
  phone: '737-999-0318',
  address: {
    street: '5900 Balcones Dr #22995',
    city: 'Austin',
    state: 'Texas',
    zip: '78731',
    country: 'US'
  },
  website: 'https://durvalis.com'
};