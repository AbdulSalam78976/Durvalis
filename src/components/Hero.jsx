// eslint-disable-next-line no-unused-vars
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
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1] tracking-tight">
                <span className="block text-gray-800">Equine</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-red-900 italic relative z-10 pb-2">
                  Excellence.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg font-light border-l-4 border-[var(--color-primary)] pl-4 sm:pl-6">
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
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Buy Now Button */}
              <a
                href="/product"
                className="group relative px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-red-800 text-white font-bold rounded-xl shadow-xl shadow-red-900/30 hover:shadow-2xl hover:shadow-red-900/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <ShieldCheck size={20} className="relative z-10" />
                <span className="relative z-10">Buy Now</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Shop on Amazon Button */}
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
              >
               <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" className="bi bi-amazon" viewBox="0 0 16 16" id="Amazon--Streamline-Bootstrap" height="16" width="16">
  <desc>
    Amazon Streamline Icon: https://streamlinehq.com
  </desc>
  <path d="M10.813 11.968c0.157 0.083 0.36 0.074 0.5 -0.05l0.005 0.005a90 90 0 0 1 1.623 -1.405c0.173 -0.143 0.143 -0.372 0.006 -0.563l-0.125 -0.17c-0.345 -0.465 -0.673 -0.906 -0.673 -1.791v-3.3l0.001 -0.335c0.008 -1.265 0.014 -2.421 -0.933 -3.305C10.404 0.274 9.06 0 8.03 0 6.017 0 3.77 0.75 3.296 3.24c-0.047 0.264 0.143 0.404 0.316 0.443l2.054 0.22c0.19 -0.009 0.33 -0.196 0.366 -0.387 0.176 -0.857 0.896 -1.271 1.703 -1.271 0.435 0 0.929 0.16 1.188 0.55 0.264 0.39 0.26 0.91 0.257 1.376v0.432q-0.3 0.033 -0.621 0.065c-1.113 0.114 -2.397 0.246 -3.36 0.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328 -0.354 3.489 -1.54l0.167 0.246c0.274 0.405 0.456 0.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v0.57c0.001 0.776 0.002 1.434 -0.396 2.133 -0.336 0.595 -0.87 0.961 -1.465 0.961 -0.812 0 -1.286 -0.619 -1.286 -1.533M0.435 12.174c2.629 1.603 6.698 4.084 13.183 0.997 0.28 -0.116 0.475 0.078 0.199 0.431C13.538 13.96 11.312 16 7.57 16 3.832 16 0.968 13.446 0.094 12.386c-0.24 -0.275 0.036 -0.4 0.199 -0.299z" strokeWidth="1"></path>
  <path d="M13.828 11.943c0.567 -0.07 1.468 -0.027 1.645 0.204 0.135 0.176 -0.004 0.966 -0.233 1.533 -0.23 0.563 -0.572 0.961 -0.762 1.115s-0.333 0.094 -0.23 -0.137c0.105 -0.23 0.684 -1.663 0.455 -1.963 -0.213 -0.278 -1.177 -0.177 -1.625 -0.13l-0.09 0.009q-0.142 0.013 -0.233 0.024c-0.193 0.021 -0.245 0.027 -0.274 -0.032 -0.074 -0.209 0.779 -0.556 1.347 -0.623" strokeWidth="1"></path>
</svg>
                <span>Shop on Amazon</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
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