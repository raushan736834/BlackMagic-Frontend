import React, { useState, useEffect } from 'react';
import { useSessionContext } from '../../contexts/SessionContext.jsx';
import { useToastContext } from '../../contexts/ToastContext';
import { useWebSocket } from '../../hooks/useWebSocket';
import OrderStatusTracker from '../../components/customer/OrderStatusTracker';

const OrderTrackingPage = ({ order }) => {
  const { sessionData } = useSessionContext();
  const { info } = useToastContext();
  const { connected, subscribe, unsubscribe } = useWebSocket();
  const [orderStatus, setOrderStatus] = useState(order?.status || 'PLACED');

  useEffect(() => {
    if (connected && sessionData) {
      const topic = `/topic/table/${sessionData.sessionCode}/updates`;
      
      subscribe(topic, (update) => {
        setOrderStatus(update.status);
        
        // Show notification based on status
        switch (update.status) {
          case 'IN_KITCHEN':
            info('Your order is in the kitchen');
            break;
          case 'PREPARING':
            info('Your order is being prepared');
            break;
          case 'READY':
            info('Your order is ready! 🎉');
            break;
          default:
            break;
        }
      });

      return () => unsubscribe(topic);
    }
  }, [connected, sessionData, subscribe, unsubscribe, info]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <OrderStatusTracker
        currentStatus={orderStatus}
        orderTime={order?.createdAt}
        estimatedTime={15}
      />
    </div>
  );
};

export default OrderTrackingPage;