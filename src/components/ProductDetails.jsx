import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Package, Scale, Award, Shield, Truck, ChevronRight, Star, Zap, ShoppingCart } from 'lucide-react';
import ProductVariations from './ProductVariations';
import { products } from '../config/products';

function ProductDetails({ amazonUrl, onAddToCart, onBuyNow }) {
  const [selectedImage, setSelectedImage] = useState('/assets/1.webp');
  const product = products.ivermectinPaste;

  const productImages = [
    { src: '/assets/1.webp', alt: 'Ivermectin Paste Syringe' },
    { src: '/assets/2.webp', alt: 'Dosing Instructions' },
    { src: '/assets/3.webp', alt: 'Broad Spectrum Protection' },
    { src: '/assets/4.webp', alt: 'Trusted Formula' },
  ];

  const specifications = [
    { icon: <Zap size={20} />, label: 'Active Ingredient', value: product.specifications.activeIngredient },
    { icon: <Scale size={20} />, label: 'Treatment Weight', value: product.specifications.treatmentWeight },
    { icon: <Package size={20} />, label: 'Net Weight', value: product.specifications.netWeight },
    { icon: <Award size={20} />, label: 'Flavor', value: product.specifications.flavor },
  ];

  return (
    <section id="product" className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-200/[0.02] bg-grid-16" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Images & Key Benefits */}
          <div className="space-y-8">
            {/* Product Images Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Main Image Container */}
              <div className="relative">
                {/* Main Image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      src={selectedImage}
                      alt="Selected product view"
                      className="w-full h-full object-contain p-12"
                    />
                  </AnimatePresence>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-red-600/30 flex items-center gap-2">
                      <Star size={14} className="fill-white" />
                      Best Seller
                    </div>
                  </div>
                  
                  {/* Background glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-red-600/10 blur-3xl rounded-full -z-10" />
                </div>

                {/* Image Navigation */}
                <div className="flex justify-center gap-2 mt-6">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(productImages[index].src)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        selectedImage === productImages[index].src 
                          ? 'w-6 bg-red-600' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image.src)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === image.src
                        ? 'border-red-600 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === image.src && (
                      <div className="absolute inset-0 bg-red-600/10" />
                    )}
                  </button>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield size={22} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">FDA Approved</div>
                    <div className="text-xs text-gray-500">ANADA #200-326</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Free Shipping</div>
                    <div className="text-xs text-gray-500">On orders $35+</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Benefits Section (Moved here) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                  <Check size={16} className="text-red-600" />
                </div>
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Product Info & Pack Size */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                PREMIUM EQUINE CARE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Ratings */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="font-bold text-gray-900">4.9</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">1,247 reviews</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">5,000+ sold</span>
            </div>

            {/* Specifications - Moved up before variations */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={18} className="text-red-600" />
                Product Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-red-600">
                        {spec.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-0.5">{spec.label}</div>
                      <div className="font-bold text-gray-900 text-sm">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pack Size Section - Compact version */}
            <ProductVariations product={product} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />

            {/* Alternative CTA */}
            <div className="pt-4 border-t border-gray-200">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-900 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all group flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                <span>Shop on Amazon</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <p className="text-center text-xs text-gray-500 mt-2">
                Also available on Amazon with Prime shipping
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;