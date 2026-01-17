import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const amazonUrl = "https://a.co/d/b8HCozh";

  // Handle URL routing
  useEffect(() => {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    if (path === '/checkout') {
      setCurrentPage('checkout');
    } else if (path === '/success' || urlParams.get('session_id')) {
      setCurrentPage('success');
    } else if (path === '/product') {
      setCurrentPage('product');
    } else if (path === '/contact') {
      setCurrentPage('contact');
    } else {
      setCurrentPage('home');
    }
  }, []);

  // Update URL when page changes
  const navigateTo = (page) => {
    setCurrentPage(page);
    const url = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', url);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleAddToCart = () => {
    setIsCartOpen(true);
  };

  if (currentPage === 'checkout') {
    return (
      <CartProvider>
        <Checkout onBack={() => navigateTo('home')} />
      </CartProvider>
    );
  }

  if (currentPage === 'success') {
    return (
      <CartProvider>
        <CheckoutSuccess onBackToHome={() => navigateTo('home')} />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header 
          onCartOpen={() => setIsCartOpen(true)}
          onNavigate={navigateTo}
        />
        
        {currentPage === 'home' && (
          <HomePage 
            amazonUrl={amazonUrl} 
            onAddToCart={handleAddToCart}
            onBuyNow={handleCheckout}
          />
        )}
        
        {currentPage === 'product' && (
          <ProductPage 
            amazonUrl={amazonUrl} 
            onAddToCart={handleAddToCart}
            onBuyNow={handleCheckout}
          />
        )}
        
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        
        <Footer />
        
        {/* Cart Sidebar */}
        <CartSidebar 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
      </div>
    </CartProvider>
  );
}

export default App;
