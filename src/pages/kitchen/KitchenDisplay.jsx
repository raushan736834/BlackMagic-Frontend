import { useState, useEffect } from 'react';
import { useToastContext } from '../../contexts/ToastContext';
import OrderCard from '../../components/kitchen/OrderCard';
import kitchenService from '../../services/kitchenService';

const KitchenDisplay = () => {
  const [orders, setOrders] = useState([]);
  const { connected, subscribe } = useWebSocket();
  const { info } = useToastContext();

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (connected) {
      subscribe('/topic/kitchen/orders', (newOrder) => {
        setOrders(prev => [newOrder, ...prev]);
        info('New order received! 🔔');
      });
    }
  }, [connected, subscribe, info]);

  const loadOrders = async () => {
    try {
      const data = await kitchenService.getActiveOrders();
      setOrders(data.orders);
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await kitchenService.updateOrderStatus(orderId, newStatus, 'chef_001');
      setOrders(orders.map(o => 
        o.orderId === orderId ? { ...o, status: newStatus } : o
      ));
      info(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const newOrders = orders.filter(o => o.status === 'PLACED');
  const preparingOrders = orders.filter(o => o.status === 'PREPARING');
  const readyOrders = orders.filter(o => o.status === 'READY');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-orange-500 text-white p-6 rounded-xl mb-6">
        <h1 className="text-2xl font-bold">Kitchen Display System</h1>
        <div className="flex gap-4 mt-4">
          <div>New: {newOrders.length}</div>
          <div>Preparing: {preparingOrders.length}</div>
          <div>Ready: {readyOrders.length}</div>
        </div>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-4">NEW ORDERS</h2>
          <div className="grid grid-cols-3 gap-4">
            {newOrders.map(order => (
              <OrderCard
                key={order.orderId}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">PREPARING</h2>
          <div className="grid grid-cols-3 gap-4">
            {preparingOrders.map(order => (
              <OrderCard
                key={order.orderId}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KitchenDisplay;