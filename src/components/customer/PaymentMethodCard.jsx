import React from 'react';
import { CheckCircle } from 'lucide-react';

const PaymentMethodCard = ({ 
  method, 
  icon: Icon, 
  name, 
  description, 
  isSelected, 
  onSelect 
}) => {
  return (
    <button
      onClick={() => onSelect(method)}
      className={`
        w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-left
        ${isSelected
          ? 'border-orange-500 bg-orange-50 shadow-lg scale-105'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
      `}
    >
      {/* Icon */}
      <div className={`
        p-3 rounded-xl flex-shrink-0
        ${isSelected 
          ? 'bg-gradient-to-r from-orange-500 to-red-500' 
          : 'bg-gray-100'
        }
      `}>
        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
      </div>

      {/* Method Info */}
      <div className="flex-1">
        <p className={`font-bold ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
          {name}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {description}
        </p>
      </div>

      {/* Selected Checkmark */}
      {isSelected && (
        <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 animate-scale-in" />
      )}
    </button>
  );
};

export default PaymentMethodCard;