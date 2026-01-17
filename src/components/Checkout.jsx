import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Plus, Minus, Mail, FileText, Lock, Truck, Package } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_PUBLISHABLE_KEY_HERE');

function Checkout({ onBack }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const { items, subtotal, totalSavings, updateQuantity, removeItem, clearCart } = useCart();

  // Simplified form - only email and delivery instructions
  const [formData, setFormData] = useState({
    email: '',
    deliveryInstructions: '',
    marketingOptIn: false
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Email validation (optional)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      setError('Please fix the errors above.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Prepare items for Stripe
      const stripeItems = items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        description: item.description
      }));

      // Prepare customer data
      const customerData = {
        email: formData.email?.trim().toLowerCase(),
        deliveryInstructions: formData.deliveryInstructions,
        marketingOptIn: formData.marketingOptIn
      };

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: stripeItems,
          customerData: customerData
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      if (session.url) {
        // Clear cart before redirect
        clearCart();
        // Redirect to Stripe Checkout
        window.location.href = session.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <button
            onClick={onBack}
            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShoppingCart size={24} className="text-red-600" />
                Order Summary
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t pt-4 mt-6 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>You Save</span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}*</span>
                </div>
                <p className="text-sm text-gray-500">*Tax will be calculated at checkout</p>
              </div>
            </motion.div>

            {/* Shipping Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Truck size={20} className="text-green-600" />
                Free Shipping
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <Package size={16} />
                  Standard delivery: 3-5 business days
                </p>
                <p className="text-sm">No minimum order required</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Customer Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h2>

              <div className="space-y-6">
                {/* Email (Optional) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={14} />
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${
                      formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    For order confirmation (you'll enter this again at checkout)
                  </p>
                </div>

                {/* Delivery Instructions */}
                <div>
                  <label htmlFor="deliveryInstructions" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText size={14} />
                    Delivery Instructions (Optional)
                  </label>
                  <textarea
                    id="deliveryInstructions"
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Special delivery instructions, gate codes, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                  />
                </div>

                {/* Marketing Opt-in */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="marketingOptIn"
                    name="marketingOptIn"
                    checked={formData.marketingOptIn}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="marketingOptIn" className="text-sm text-gray-700">
                    I'd like to receive updates about new products and special offers
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-full font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Proceed to Secure Checkout
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  You'll enter your shipping address and payment details on the next page
                </p>
              </div>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 rounded-2xl p-6 border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <Lock size={20} className="text-blue-600" />
                <h3 className="font-bold text-blue-900">Secure Checkout</h3>
              </div>
              <p className="text-blue-800 text-sm">
                Your payment information is processed securely by Stripe. We never store your credit card details.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;