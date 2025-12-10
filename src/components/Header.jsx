import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';

function Header({ amazonUrl }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Product', href: '#product' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact-form' },
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
              <span className="text-2xl font-sans font-black italic tracking-tighter text-gray-900 leading-none">
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

            {/* Shop Now Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-[var(--color-primary)]/40 transition-all flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              <span className="tracking-wide">Shop Now</span>
            </motion.a>
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
              className="md:hidden overflow-hidden glass rounded-xl mt-4 mx-2"
            >
              <div className="py-6 px-4 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 font-medium hover:text-[var(--color-primary)] py-2 px-4 hover:bg-red-50/50 rounded-lg transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                <motion.a
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full text-center bg-[var(--color-primary)] text-white px-6 py-3.5 rounded-full font-medium shadow-md hover:bg-[var(--color-primary-dark)] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Shop on Amazon
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;