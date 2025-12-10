import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingCart, Package, Scale, Award, Shield, Truck, ChevronRight, Star, Zap } from 'lucide-react';

function ProductDetails({ amazonUrl }) {
  const [selectedImage, setSelectedImage] = useState('/assets/1.webp');

  const productImages = [
    { src: '/assets/1.webp', alt: 'Ivermectin Paste Syringe' },
    { src: '/assets/2.webp', alt: 'Dosing Instructions' },
    { src: '/assets/3.webp', alt: 'Broad Spectrum Protection' },
    { src: '/assets/4.webp', alt: 'Trusted Formula' },
  ];

  const features = [
    'Effective against major equine parasites',
    'Single-dose oral syringe up to 1,250 lbs',
    'Apple flavor for easy administration',
    'Vet-recommended formula with precise dosing',
    'Safe for foals, mares, and stallions'
  ];

  const specifications = [
    { icon: <Zap size={18} />, label: 'Active Ingredient', value: 'Ivermectin 1.87%' },
    { icon: <Scale size={18} />, label: 'Treatment Weight', value: 'Up to 1,250 lbs' },
    { icon: <Package size={18} />, label: 'Net Weight', value: '0.21 oz (6.08 g)' },
    { icon: <Award size={18} />, label: 'Flavor', value: 'Apple' },
  ];

  return (
    <section id="product" className="py-24 bg-gray-50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Product Images Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 sticky top-24"
          >
            {/* Main Image Card */}
            <div className="relative aspect-square rounded-3xl overflow-hidden glass shadow-xl border-white/40">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={selectedImage}
                  alt="Selected product view"
                  className="w-full h-full object-contain p-10"
                />
              </AnimatePresence>

              {/* Tag */}
              <div className="absolute top-6 left-6 bg-[var(--color-primary)] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-red-900/20 flex items-center gap-2">
                <Star size={14} className="fill-white" />
                Best Seller
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image.src)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === image.src
                    ? 'border-[var(--color-primary)] shadow-md scale-105'
                    : 'border-transparent bg-white hover:border-red-200'
                    }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover p-2"
                  />
                  {selectedImage === image.src && (
                    <div className="absolute inset-0 bg-red-500/5" />
                  )}
                </button>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield size={22} className="text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">FDA Approved</div>
                  <div className="text-sm text-gray-500">ANADA #200-326</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck size={22} className="text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-500">On orders $35+</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm tracking-uppercase">
                <span className="w-8 h-0.5 bg-[var(--color-primary)]"></span>
                PREMIUM EQUINE CARE
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Ivermectin Paste <span className="text-[var(--color-primary)]">1.87%</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                The professional's choice for complete parasite control. Apple-flavored for easy administration and formulated for maximum effectiveness.
              </p>
            </div>

            {/* Specifications Card */}
            <div className="glass-card p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 font-serif">Product Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
                      {spec.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{spec.label}</div>
                      <div className="font-medium text-gray-900 text-lg">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-900 font-serif">Key Benefits</h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Area */}
            <div className="pt-6 border-t border-gray-200 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[var(--color-primary)] text-white px-8 py-5 rounded-full font-bold text-lg shadow-xl shadow-red-900/20 hover:shadow-red-900/30 transition-all group flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={20} />
                  <span>Shop on Amazon</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 justify-center sm:justify-start">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://randomuser.me/api/portraits/thumb/men/${i * 10}.jpg`} alt="Reviewer" className="w-full h-full object-cover grayscale opacity-80" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium"><span className="text-gray-900 font-bold">4.9/5</span> from happy horse owners</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;