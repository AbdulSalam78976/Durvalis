import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, variation, quantity = 1 } = action.payload;
      const itemId = `${product.id}-${variation.id}`;
      
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      
      const newItem = {
        id: itemId,
        productId: product.id,
        variationId: variation.id,
        name: product.name,
        variationName: variation.name,
        price: variation.price,
        originalPrice: variation.originalPrice,
        savings: variation.savings,
        image: product.image,
        quantity: quantity,
        packQuantity: variation.quantity
      };
      
      return {
        ...state,
        items: [...state.items, newItem]
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.itemId)
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== itemId)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === itemId
            ? { ...item, quantity }
            : item
        )
      };
    }
    
    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: []
      };
    }
    
    case CART_ACTIONS.LOAD_CART: {
      return {
        ...state,
        items: action.payload.items || []
      };
    }
    
    default:
      return state;
  }
}

// Initial state
const initialState = {
  items: [],
  isOpen: false
};

// Cart provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('durvalis-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('durvalis-cart', JSON.stringify({ items: state.items }));
  }, [state.items]);

  // Cart actions
  const addItem = (product, variation, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, variation, quantity }
    });
  };

  const removeItem = (itemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { itemId }
    });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Cart calculations
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalUnits = state.items.reduce((total, item) => total + (item.quantity * item.packQuantity), 0);
  const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalSavings = state.items.reduce((total, item) => {
    if (item.savings) {
      return total + (item.savings * item.quantity);
    }
    return total;
  }, 0);

  const value = {
    items: state.items,
    itemCount,
    totalUnits,
    subtotal,
    totalSavings,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export { CART_ACTIONS };