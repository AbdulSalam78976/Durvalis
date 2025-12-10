import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, ShieldCheck, Award } from 'lucide-react';

function Hero({ amazonUrl }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">

      {/* --- Background Layers --- */}

      {/* 1. Base Image with Parallax-like feel (static for now) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/assets/hero.webp')] bg-cover bg-center opacity-70 transform scale-105" />
        {/* Darkening Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />
      </div>

      {/* 2. Abstract "Royal" Gradients */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 z-0 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 z-0" />

      {/* 3. Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10 z-0 pointer-events-none" />


      {/* --- Content Container --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* --- Left Column: Typography & CTA --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >


            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1] tracking-tight">
                <span className="block text-gray-800">Equine</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-red-900 italic relative z-10 pb-2">
                  Excellence.
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-light border-l-4 border-[var(--color-primary)] pl-6">
                The gold standard in parasite control. Designed for professionals, trusted by champions.
              </p>
            </div>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
            >
              {[
                "1.87% Ivermectin Formula",
                "Apple-Flavored Paste",
                "Easy-Grip Syringe",
                "Safe for All Breeds"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-4 flex flex-col sm:flex-row gap-5"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group bg-[var(--color-primary)] text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-red-900/20 flex items-center justify-center gap-3"
              >
                <span className="relative z-10">Shop on Amazon</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#product"
                className="px-8 py-4 rounded-full text-lg font-semibold text-gray-700 bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:text-[var(--color-primary)] transition-all flex items-center justify-center"
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>


          {/* --- Right Column: Immersive Product Display --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative z-20 flex justify-center lg:justify-end"
          >
            {/* Glow effect behind product */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-amber-200/20 to-red-500/5 rounded-full blur-[80px]" />

            {/* Animated Product Container */}
            <motion.div
              animate={{ y: [-15, 10, -15] }}

              className="relative"
            >
              {/* Main Product Image */}
              <img
                src="/assets/bg-removed.webp"
                alt="DURVALIS Premium Ivermectin Paste"
                className="relative z-10 w-full max-w-[600px] drop-shadow-2xl transform lg:scale-110 lg:translate-x-10"
              />




            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;