import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionContext } from '../../contexts/SessionContext.jsx';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import { useOnline } from '../../hooks/useOnline';
import { SkeletonMenuCard } from '../../components/common/SkeltonLoader.jsx';
import customerService from '../../services/customerService';

const MenuPage = () => {
  const navigate = useNavigate();
  const { sessionData } = useSessionContext();
  const { addItem, getItemCount, getTotal, isItemInCart, getItemQuantity } = useCartContext();
  const { success, error, warning } = useToastContext();
  const { isOnline } = useOnline();

  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      setLoading(true);
      const data = await customerService.getMenu();
      setMenu(data);
      success('Menu loaded successfully');
    } catch (err) {
      error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    if (!isOnline) {
      warning('You are offline. Please connect to add items.');
      return;
    }

    addItem(item);
    success(`${item.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="p-4 grid grid-cols-2 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <SkeletonMenuCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-xl font-bold">Table {sessionData?.tableNumber}</h1>
      </header>

      <div className="p-4 grid grid-cols-2 gap-4">
        {menu?.categories
          .flatMap(cat => cat.items)
          .map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-4">
              <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-2" />
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-orange-500 font-bold">₹{item.price}</p>
              
              {isItemInCart(item.id) ? (
                <div className="bg-orange-100 rounded-lg p-2 text-center">
                  <span className="font-bold text-orange-600">
                    In Cart: {getItemQuantity(item.id)}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg mt-2"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
      </div>

      {getItemCount() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold flex items-center justify-between px-6"
          >
            <span>{getItemCount()} items</span>
            <span>₹{getTotal()}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuPage;