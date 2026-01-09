import React from 'react';
import { Clock, AlertCircle, ChefHat } from 'lucide-react';

const OrderCard = ({ order, onStatusChange }) => {
  const getTimeElapsed = (createdAt) => {
    const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff === 1) return '1 min ago';
    return `${diff} min ago`;
  };

  const getPriorityColor = () => {
    if (order.priority === 'high') return 'border-red-500 bg-red-50';
    return 'border-gray-300';
  };

  const getStatusButton = () => {
    switch (order.status) {
      case 'PLACED':
        return {
          text: 'Accept & Start Preparing',
          nextStatus: 'PREPARING',
          color: 'bg-blue-500 hover:bg-blue-600'
        };
      case 'PREPARING':
        return {
          text: 'Mark as Ready',
          nextStatus: 'READY',
          color: 'bg-green-500 hover:bg-green-600'
        };
      case 'READY':
        return {
          text: 'Ready for Service',
          nextStatus: null,
          color: 'bg-green-100 text-green-700 cursor-default'
        };
      default:
        return null;
    }
  };

  const statusButton = getStatusButton();

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all border-l-4 ${getPriorityColor()}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-gray-800">{order.orderCode}</h3>
            {order.priority === 'high' && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                Priority
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
            <span className="font-semibold">Table {order.tableNumber}</span>
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">
            {new Date(order.createdAt).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1 justify-end mt-1">
            <Clock className="w-3 h-3" />
            {getTimeElapsed(order.createdAt)}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-3 bg-gray-50 rounded-lg p-3">
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">
                <span className="text-orange-500 font-bold mr-2">×{item.quantity}</span>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Instructions */}
      {order.specialInstructions && (
        <div className="mb-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
          <p className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{order.specialInstructions}</span>
          </p>
        </div>
      )}

      {/* Estimated Prep Time */}
      <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
        <ChefHat className="w-4 h-4" />
        <span>Est. prep time: {order.estimatedPrepTime || 15} min</span>
      </div>

      {/* Action Button */}
      {statusButton && (
        <button
          onClick={() => statusButton.nextStatus && onStatusChange(order.orderId, statusButton.nextStatus)}
          disabled={!statusButton.nextStatus}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${statusButton.color}`}
        >
          {order.status === 'READY' && <span>✓</span>}
          {statusButton.text}
        </button>
      )}
    </div>
  );
};

export default OrderCard;