import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('orderHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save order history to localStorage
  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  // Add item to cart
  const addItem = useCallback((item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      
      if (existingItem) {
        return prevCart.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      
      return [...prevCart, { ...item, quantity: item.quantity || 1, specialRequest: '' }];
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  // Update special request
  const updateSpecialRequest = useCallback((itemId, specialRequest) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, specialRequest } : item
      )
    );
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Get cart statistics
  const getItemCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getSubtotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const getTax = useCallback((taxRate = 0.05) => {
    return getSubtotal() * taxRate;
  }, [getSubtotal]);

  const getTotal = useCallback((taxRate = 0.05, discount = 0) => {
    return getSubtotal() + getTax(taxRate) - discount;
  }, [getSubtotal, getTax]);

  // Check if item is in cart
  const isItemInCart = useCallback((itemId) => {
    return cart.some(item => item.id === itemId);
  }, [cart]);

  // Get item quantity
  const getItemQuantity = useCallback((itemId) => {
    const item = cart.find(i => i.id === itemId);
    return item?.quantity || 0;
  }, [cart]);

  // Add order to history
  const addOrderToHistory = useCallback((order) => {
    setOrderHistory(prev => [order, ...prev]);
  }, []);

  // Clear order history
  const clearOrderHistory = useCallback(() => {
    setOrderHistory([]);
    localStorage.removeItem('orderHistory');
  }, []);

  const value = {
    // Cart state
    cart,
    
    // Cart actions
    addItem,
    removeItem,
    updateQuantity,
    updateSpecialRequest,
    clearCart,
    
    // Cart calculations
    getItemCount,
    getSubtotal,
    getTax,
    getTotal,
    isItemInCart,
    getItemQuantity,
    
    // Order history
    orderHistory,
    addOrderToHistory,
    clearOrderHistory
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;