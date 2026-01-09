import React, { useState } from 'react';
import { Plus, Minus, X, Edit2 } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove, onUpdateSpecialRequest }) => {
  const [showSpecialRequest, setShowSpecialRequest] = useState(false);
  const [specialRequest, setSpecialRequest] = useState(item.specialRequest || '');

  const handleQuantityChange = (delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleSaveSpecialRequest = () => {
    onUpdateSpecialRequest(item.id, specialRequest);
    setShowSpecialRequest(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {/* Item Image */}
        <div className="relative">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-24 h-24 rounded-xl object-cover"
          />
          {/* Veg/Non-Veg Badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
            {item.isVeg ? '🟢' : '🔴'}
          </div>
        </div>

        {/* Item Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
            <button 
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700 hover:scale-110 transition-all p-2 hover:bg-red-50 rounded-lg"
              aria-label="Remove item"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Price Calculation */}
          <div className="mb-3">
            <p className="text-orange-500 font-bold text-lg">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              ₹{item.price} × {item.quantity}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-2 py-1">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 text-gray-700" />
              </button>
              <span className="font-bold text-lg min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center hover:shadow-lg transition-all"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Special Request Button */}
            <button
              onClick={() => setShowSpecialRequest(!showSpecialRequest)}
              className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              <Edit2 className="w-4 h-4" />
              {item.specialRequest ? 'Edit Note' : 'Add Note'}
            </button>
          </div>

          {/* Special Request Input */}
          {showSpecialRequest && (
            <div className="mt-3 space-y-2 animate-slide-in">
              <textarea
                className="w-full px-3 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                placeholder="E.g., Less spicy, no onions..."
                rows={2}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveSpecialRequest}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowSpecialRequest(false);
                    setSpecialRequest(item.specialRequest || '');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Display Special Request */}
          {item.specialRequest && !showSpecialRequest && (
            <div className="mt-2 bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded text-xs">
              <p className="text-yellow-800 font-medium">
                Note: {item.specialRequest}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
