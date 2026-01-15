import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Package, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

function ProductVariations({ product, onAddToCart, onBuyNow }) {
  const [selectedVariation, setSelectedVariation] = useState(product.variations[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, selectedVariation, quantity);
    if (onAddToCart) {
      onAddToCart();
    }
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariation, quantity);
    if (onBuyNow) {
      onBuyNow();
    }
  };

  return (
    <div className="space-y-4">
      {/* Pack Size Selection */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-3">Choose Pack Size</h3>
        <div className="grid grid-cols-2 gap-2">
          {product.variations.map((variation) => (
            <motion.button
              key={variation.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedVariation(variation)}
              className={`relative p-3 rounded-lg border-2 transition-all text-left ${
                selectedVariation.id === variation.id
                  ? 'border-red-600 bg-red-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {variation.popular && (
                <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                  <Star size={10} className="fill-white" />
                  Popular
                </div>
              )}

              {/* Selection Indicator */}
              {selectedVariation.id === variation.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center">
                  <Check size={12} />
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-gray-900">{variation.name}</h4>
                  <div className="text-right">
                    <div className="font-bold text-base text-gray-900">${variation.price.toFixed(2)}</div>
                    {variation.originalPrice && (
                      <div className="text-xs text-gray-500 line-through">
                        ${variation.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Package size={12} />
                  <span>{variation.quantity} tube{variation.quantity > 1 ? 's' : ''}</span>
                  {variation.savings && (
                    <span className="text-green-600 font-medium text-[10px]">
                      • Save ${variation.savings.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quantity & Price Summary Combined */}
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Quantity</span>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-gray-100 transition-colors text-sm"
            >
              -
            </button>
            <span className="px-3 py-1 font-medium text-sm min-w-[2.5rem] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors text-sm"
            >
              +
            </button>
          </div>
        </div>
        
        {selectedVariation.savings && quantity > 0 && (
          <div className="flex justify-between items-center text-green-600 text-sm">
            <span>You Save:</span>
            <span className="font-bold">${(selectedVariation.savings * quantity).toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">Total:</span>
          <span className="text-lg font-bold text-gray-900">
            ${(selectedVariation.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="flex-1 bg-white text-gray-900 py-3 rounded-lg font-semibold text-sm border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuyNow}
          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Buy Now</span>
        </motion.button>
      </div>

      {/* Value Proposition */}
      <div className="text-center text-xs text-gray-500">
        <p>✓ FREE Shipping • ✓ 30-day guarantee</p>
      </div>
    </div>
  );
}

export default ProductVariations;