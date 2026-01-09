import React from 'react';
import { CheckCircle, Clock, ChefHat, Utensils, Package } from 'lucide-react';

const OrderStatusTracker = ({ currentStatus, orderTime, estimatedTime }) => {
  const statusSteps = [
    { 
      key: 'PLACED', 
      label: 'Order Placed', 
      icon: CheckCircle, 
      color: 'green',
      description: 'Order confirmed'
    },
    { 
      key: 'IN_KITCHEN', 
      label: 'In Kitchen', 
      icon: ChefHat, 
      color: 'blue',
      description: 'Sent to kitchen'
    },
    { 
      key: 'PREPARING', 
      label: 'Preparing', 
      icon: Clock, 
      color: 'orange',
      description: 'Being prepared'
    },
    { 
      key: 'READY', 
      label: 'Ready', 
      icon: Package, 
      color: 'green',
      description: 'Ready to serve'
    },
    { 
      key: 'SERVED', 
      label: 'Served', 
      icon: Utensils, 
      color: 'purple',
      description: 'Enjoy your meal!'
    }
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.key === currentStatus);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-bold text-lg mb-6 text-gray-800">Order Status</h3>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200"></div>

        {/* Status Steps */}
        <div className="space-y-6">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.key} className="relative flex items-start gap-4">
                {/* Icon Circle */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${isCompleted 
                    ? 'bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg scale-110' 
                    : 'bg-gray-200 text-gray-400'
                  }
                  ${isCurrent ? 'ring-4 ring-green-200 animate-pulse' : ''}
                `}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Status Info */}
                <div className="flex-1 pt-2">
                  <div className={`
                    font-bold text-base mb-1
                    ${isCompleted ? 'text-gray-800' : 'text-gray-400'}
                  `}>
                    {step.label}
                  </div>
                  <div className={`
                    text-sm
                    ${isCompleted ? 'text-gray-600' : 'text-gray-400'}
                  `}>
                    {step.description}
                  </div>
                  
                  {/* Current Status Indicator */}
                  {isCurrent && (
                    <div className="mt-2 inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      In Progress
                    </div>
                  )}

                  {/* Completed Checkmark */}
                  {isCompleted && !isCurrent && (
                    <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated Time */}
      {currentStatus !== 'SERVED' && estimatedTime && (
        <div className="mt-6 bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-3 text-orange-700">
            <Clock className="w-6 h-6 animate-spin-slow" />
            <div>
              <p className="font-bold">Estimated Time</p>
              <p className="text-sm">{estimatedTime} minutes remaining</p>
            </div>
          </div>
        </div>
      )}

      {/* Order Time */}
      {orderTime && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Order placed at {new Date(orderTime).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      )}
    </div>
  );
};

export default OrderStatusTracker;