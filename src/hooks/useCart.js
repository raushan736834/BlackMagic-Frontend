import { useState, useEffect, useCallback } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
      
      return [...prevCart, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }, []);

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

  const updateSpecialRequest = useCallback((itemId, specialRequest) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, specialRequest } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart');
  }, []);

  const getItemCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const getTax = useCallback((taxRate = 0.05) => {
    return getTotal() * taxRate;
  }, [getTotal]);

  const getGrandTotal = useCallback((taxRate = 0.05, discount = 0) => {
    return getTotal() + getTax(taxRate) - discount;
  }, [getTotal, getTax]);

  const isItemInCart = useCallback((itemId) => {
    return cart.some(item => item.id === itemId);
  }, [cart]);

  const getItemQuantity = useCallback((itemId) => {
    const item = cart.find(i => i.id === itemId);
    return item?.quantity || 0;
  }, [cart]);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    updateSpecialRequest,
    clearCart,
    getItemCount,
    getTotal,
    getTax,
    getGrandTotal,
    isItemInCart,
    getItemQuantity
  };
};