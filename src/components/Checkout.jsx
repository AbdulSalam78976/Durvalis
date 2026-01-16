import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Package, Truck, AlertCircle, Plus, Minus, Mail, MapPin, User, Phone, FileText, CheckCircle, Lock, Shield } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { tax } from '../config/products';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_PUBLISHABLE_KEY_HERE');

function Checkout({ onBack }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Review & Pay
  const { items, subtotal, totalSavings, updateQuantity, removeItem, clearCart } = useCart();

  // Form state for user details
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    phone: '',
    
    // Shipping Address
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Billing Address
    billingDifferent: false,
    billingFirstName: '',
    billingLastName: '',
    billingAddress1: '',
    billingAddress2: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'US',
    
    // Additional Options
    deliveryInstructions: '',
    marketingOptIn: false
  });

  const [formErrors, setFormErrors] = useState({});

  const shippingCost = 0; // Free shipping for all orders
  const taxAmount = subtotal * tax.defaultRate; // Fallback tax calculation (Stripe Tax will calculate actual amount)
  const total = subtotal + shippingCost + taxAmount;

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
    
    // Required fields
    const requiredFields = [
      'email', 'phone', 'firstName', 'lastName', 
      'address1', 'city', 'state', 'zipCode'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        errors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    // ZIP code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }
    
    // Billing address validation if different
    if (formData.billingDifferent) {
      const billingFields = [
        'billingFirstName', 'billingLastName', 'billingAddress1', 
        'billingCity', 'billingState', 'billingZipCode'
      ];
      
      billingFields.forEach(field => {
        if (!formData[field].trim()) {
          errors[field] = 'This field is required';
        }
      });
      
      if (formData.billingZipCode && !/^\d{5}(-\d{4})?$/.test(formData.billingZipCode)) {
        errors.billingZipCode = 'Please enter a valid ZIP code';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setCurrentStep(2);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      setError('Your cart is empty. Please add items before checkout.');
      return;
    }

    if (!validateForm()) {
      setCurrentStep(1);
      setError('Please fill in all required fields correctly.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const stripe = await stripePromise;

      // Prepare items for Stripe
      const stripeItems = items.map(item => ({
        name: `${item.name} - ${item.variationName}`,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        description: `${item.packQuantity} tube${item.packQuantity > 1 ? 's' : ''} per pack`
      }));

      // Prepare customer and shipping data
      const customerData = {
        email: formData.email,
        phone: formData.phone,
        shipping: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: {
            line1: formData.address1,
            line2: formData.address2 || null,
            city: formData.city,
            state: formData.state,
            postal_code: formData.zipCode,
            country: formData.country
          }
        },
        billing: formData.billingDifferent ? {
          name: `${formData.billingFirstName} ${formData.billingLastName}`,
          address: {
            line1: formData.billingAddress1,
            line2: formData.billingAddress2 || null,
            city: formData.billingCity,
            state: formData.billingState,
            postal_code: formData.billingZipCode,
            country: formData.billingCountry
          }
        } : null,
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

      // Redirect to Stripe Checkout using the session URL (modern approach)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 group"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back to Shopping</span>
          </button>
          
          {/* Progress Steps */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8">
            <div className={`flex items-center gap-3 ${currentStep >= 1 ? 'text-red-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md ${currentStep >= 1 ? 'bg-gradient-to-br from-red-600 to-red-700 text-white' : 'bg-gray-200'}`}>
                {currentStep > 1 ? <CheckCircle size={20} /> : '1'}
              </div>
              <div>
                <div className="font-bold text-sm">Step 1</div>
                <div className="text-xs">Shipping Details</div>
              </div>
            </div>
            <div className={`hidden sm:block flex-1 h-1 rounded-full ${currentStep >= 2 ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-3 ${currentStep >= 2 ? 'text-red-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md ${currentStep >= 2 ? 'bg-gradient-to-br from-red-600 to-red-700 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <div>
                <div className="font-bold text-sm">Step 2</div>
                <div className="text-xs">Review & Payment</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart size={20} className="sm:hidden text-white" />
              <ShoppingCart size={24} className="hidden sm:block text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              {currentStep === 1 ? 'Shipping Information' : 'Review Your Order'}
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 ml-13 sm:ml-15">
            {currentStep === 1 ? 'Enter your delivery details to continue' : 'Verify your order and complete payment'}
          </p>
        </div>

        {currentStep === 1 ? (
          /* Step 1: Shipping Details Form */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <form className="space-y-8">
                  {/* Contact Information */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Mail size={20} className="text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Contact Information
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Mail size={14} />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                          placeholder="john@example.com"
                        />
                        {formErrors.email && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Phone size={14} />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                          placeholder="(555) 123-4567"
                        />
                        {formErrors.phone && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                        <Truck size={20} className="text-green-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Shipping Address
                      </h2>
                    </div>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <User size={14} />
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${formErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                            placeholder="John"
                          />
                          {formErrors.firstName && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle size={14} />
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <User size={14} />
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${formErrors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                            placeholder="Smith"
                          />
                          {formErrors.lastName && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle size={14} />
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="address1" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin size={14} />
                          Address Line 1 *
                        </label>
                        <input
                          type="text"
                          id="address1"
                          name="address1"
                          value={formData.address1}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${formErrors.address1 ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                          placeholder="123 Main Street"
                        />
                        {formErrors.address1 && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {formErrors.address1}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="address2" className="block text-sm font-semibold text-gray-700 mb-2">
                          Address Line 2 (Optional)
                        </label>
                        <input
                          type="text"
                          id="address2"
                          name="address2"
                          value={formData.address2}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                          placeholder="Apartment, suite, etc."
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${formErrors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                            placeholder="Austin"
                          />
                          {formErrors.city && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle size={14} />
                              {formErrors.city}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                            State *
                          </label>
                          <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${formErrors.state ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                          >
                            <option value="">Select State</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                          </select>
                          {formErrors.state && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle size={14} />
                              {formErrors.state}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all ${formErrors.zipCode ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                            placeholder="12345"
                          />
                          {formErrors.zipCode && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle size={14} />
                              {formErrors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                        <FileText size={20} className="text-purple-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Additional Options
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="deliveryInstructions" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Package size={14} />
                          Delivery Instructions (Optional)
                        </label>
                        <textarea
                          id="deliveryInstructions"
                          name="deliveryInstructions"
                          value={formData.deliveryInstructions}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                          placeholder="Leave at front door, ring doorbell, etc."
                        />
                      </div>
                      
                     
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                    <ShoppingCart size={18} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
                </div>
                
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-contain rounded-lg bg-white"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{item.variationName}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {totalSavings > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Savings</span>
                          <span>-${totalSavings.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span className="text-green-600 font-semibold">FREE</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span className="text-gray-500 text-xs">(Calculated at checkout)</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                        <span>Estimated Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Final total with tax calculated at checkout</p>
                    </div>
                  </>
                )}

                <button
                  onClick={handleContinueToPayment}
                  disabled={items.length === 0}
                  className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Step 2: Review & Payment */
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Order Review */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package size={24} />
                Order Review
              </h2>

              {/* Shipping Details Summary */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Shipping Details</h3>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Address:</strong> {formData.address1}{formData.address2 && `, ${formData.address2}`}</p>
                  <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  {formData.deliveryInstructions && (
                    <p><strong>Instructions:</strong> {formData.deliveryInstructions}</p>
                  )}
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg bg-white"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-red-600 font-medium">{item.variationName}</p>
                      <p className="text-sm text-gray-500">{item.packQuantity} tubes per pack</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          {item.originalPrice && (
                            <p className="text-xs text-gray-500 line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Total Savings</span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="text-gray-500 text-xs">(Calculated by Stripe)</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Estimated Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Final total with tax calculated by Stripe at checkout</p>
              </div>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              {/* Simple Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Lock size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Payment</h2>
                <p className="text-sm text-gray-500">Powered by Stripe</p>
              </div>

              {/* Simple Info Box */}
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  You'll be redirected to Stripe's secure checkout. We accept all major credit cards and digital wallets.
                </p>
              </div>

              {/* Ad Blocker Notice */}
              <div className="mb-6 p-3 bg-blue-50 rounded-2xl border border-blue-200 flex items-start gap-2">
                <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  <strong>Note:</strong> If you have an ad blocker enabled, you may see console warnings. This won't affect your payment - Stripe checkout will work normally.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-full flex items-center gap-2 justify-center">
                  <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Action Buttons - Pill Shaped */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} className="group-hover:scale-110 transition-transform" />
                      <span>Complete Purchase</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full bg-white text-gray-700 py-3.5 rounded-full font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Details</span>
                </button>
              </div>

              {/* Payment Methods */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-3">Accepted payment methods</p>
                <div className="flex flex-wrap justify-center items-center gap-3">
                  {/* Visa */}
                  <div className="h-10 w-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                    <img 
                      src="/assets/payment methods/visa.png" 
                      alt="Visa" 
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-xs font-bold text-blue-700">VISA</span>';
                      }}
                    />
                  </div>
                  
                  {/* Mastercard */}
                  <div className="h-10 w-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                    <img 
                      src="/assets/payment methods/mastercard.png" 
                      alt="Mastercard" 
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-[10px] font-bold text-orange-600">MC</span>';
                      }}
                    />
                  </div>
                  
                  {/* American Express */}
                  <div className="h-10 w-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                    <img 
                      src="/assets/payment methods/american.png" 
                      alt="American Express" 
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-[10px] font-bold text-blue-600">AMEX</span>';
                      }}
                    />
                  </div>
              
                  
                  {/* PayPal */}
                  <div className="h-10 w-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                    <img 
                      src="/assets/payment methods/paypal.png" 
                      alt="PayPal" 
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-[10px] font-bold text-blue-700">PayPal</span>';
                      }}
                    />
                  </div>
                  
                  {/* Apple Pay */}
                  <div className="h-10 w-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                    <img 
                      src="/assets/payment methods/apple-pay.png" 
                      alt="Apple Pay" 
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-[9px] font-bold text-gray-900">Apple Pay</span>';
                      }}
                    />
                  </div>
                  
                  {/* Google Pay */}
                  <div className="h-10 w-16 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                    <img 
                      src="/assets/payment methods/google-pay.png" 
                      alt="Google Pay" 
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-[9px] font-bold text-gray-700">G Pay</span>';
                      }}
                    />
                  </div>
                </div>

              </div>

             

            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;