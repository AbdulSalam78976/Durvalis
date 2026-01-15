import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Header({ onCartOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Product', href: '/product' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 glass shadow-sm' : 'py-6 bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          {/* Logo - Badge Style */}
          <a href="#home" className="group">
            <div className="border-3 border-[var(--color-primary)] rounded-full px-5 py-1 transition-transform group-hover:scale-105">
              <span className="text-3xl font-sans font-black italic tracking-tighter text-gray-900 leading-none">
                DURVALIS
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors text-gray-700 relative group uppercase tracking-widest"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartOpen}
              className="relative bg-gray-100 text-gray-700 px-4 py-2.5 rounded-full font-medium shadow-sm hover:shadow-md hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-900" />
            ) : (
              <Menu size={24} className="text-gray-900" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 mt-2 mx-4 rounded-2xl">
                <div className="py-6 px-4 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block text-gray-700 font-semibold hover:text-[var(--color-primary)] py-3 px-4 hover:bg-red-50 rounded-xl transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span>{link.name}</span>
                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[var(--color-primary)]" />
                      </div>
                    </motion.a>
                  ))}
                  
                  {/* Divider */}
                  <div className="border-t border-gray-100 my-4" />
                  
                  {/* Cart Button */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onCartOpen();
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 relative group"
                  >
                    <ShoppingCart size={20} />
                    <span>View Cart</span>
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                        {itemCount}
                      </span>
                    )}
                  </motion.button>
                  
                  {/* Trust Badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (navLinks.length + 1) * 0.1 }}
                    className="pt-4 flex items-center justify-center gap-2 text-xs text-gray-500"
                  >
                    <ShieldCheck size={14} className="text-green-600" />
                    <span>Secure Shopping</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;