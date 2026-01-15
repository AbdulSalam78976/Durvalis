import ProductDetails from '../components/ProductDetails';
import SEO from '../components/SEO';

function ProductPage({ amazonUrl, onAddToCart, onBuyNow }) {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Durvalis Ivermectin Paste 1.87% - Premium Equine Parasite Control"
        description="Professional-grade apple-flavored dewormer for complete equine parasite control. FDA approved formula with precise dosing for horses up to 1,250 lbs."
        canonical="https://durvalis.com/product"
      />
      
      <ProductDetails 
        amazonUrl={amazonUrl} 
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />
    </div>
  );
}

export default ProductPage;