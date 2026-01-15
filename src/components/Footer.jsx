import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Shield, Truck, Award, Sparkles } from 'lucide-react';

function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-gray-900 to-[#0f172a] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <a href="/" className="inline-block group">
                <div className="border-2 border-red-600 rounded-full px-6 py-2 transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-600/50">
                  <span className="text-3xl font-sans font-black italic tracking-tighter text-white leading-none">
                    DURVALIS
                  </span>
                </div>
              </a>
              <p className="mt-6 text-base text-gray-400 max-w-md font-light leading-relaxed">
                Premium equine health solutions for healthier, happier horses.
                Trusted by veterinarians and horse owners nationwide.
              </p>
            </div>

            {/* Trust badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300 font-medium group hover:text-green-400 transition-colors">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Shield size={16} className="text-green-400" />
                </div>
                <span>Veterinarian Approved</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300 font-medium group hover:text-blue-400 transition-colors">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Truck size={16} className="text-blue-400" />
                </div>
                <span>Free Shipping*</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300 font-medium group hover:text-red-400 transition-colors">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                  <Award size={16} className="text-red-400" />
                </div>
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-red-600 rounded-full" />
              Quick Links
            </h3>
            <nav className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Product', href: '/product' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-400 hover:text-red-400 transition-colors hover:translate-x-2 duration-300 font-medium group flex items-center gap-2"
                >
                  <span className="w-0 h-px bg-red-600 group-hover:w-4 transition-all duration-300" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-red-600 rounded-full" />
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:contact@durvalis.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-all border border-gray-700 group-hover:border-red-600 group-hover:scale-110">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Email</div>
                  <span className="font-medium text-sm">contact@durvalis.com</span>
                </div>
              </a>
              <a
                href="tel:+737-999-0318"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-all border border-gray-700 group-hover:border-red-600 group-hover:scale-110">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Phone</div>
                  <span className="font-medium text-sm">737-999-0318</span>
                </div>
              </a>
              <div className="flex items-start gap-3 text-gray-400 group">
                <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center border border-gray-700 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Address</div>
                  <span className="font-medium text-sm leading-relaxed">5900 Balcones Dr #22995<br />Austin, Texas 78731</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-[var(--color-primary)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 font-medium">
              © {new Date().getFullYear()} Durvalis. All rights reserved.
            </p>

            {/* Powered by AppCrafters */}
            <div className="mt-3 flex items-center gap-2 justify-center md:justify-start">
              <span className="text-xs text-gray-600">Powered by</span>
              <a
                href="https://abdulsalam78976.github.io/AppCrafters/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors group bg-gray-900 px-2 py-1 rounded border border-gray-800 hover:border-gray-600"
              >
                <Sparkles size={10} className="text-purple-500" />
                <span className="font-bold tracking-wide">AppCrafters</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Shipping Policy</a>
            <a href="#" className="hover:text-white transition-colors">Returns</a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-800/50">
          <p className="text-xs text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> For veterinary use only. Consult a licensed veterinarian before use.
            Always follow label instructions. Keep out of reach of children. Not for human consumption.
            This product is not intended to diagnose, treat, cure, or prevent any disease in humans.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;