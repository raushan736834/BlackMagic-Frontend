import apiClient from './api';

class KitchenService {
  // Get active orders
  async getActiveOrders() {
    const response = await apiClient.get('/api/kitchen/orders');
    return response.data;
  }

  // Update order status
  async updateOrderStatus(orderId, status, staffId) {
    const response = await apiClient.patch(`/api/kitchen/orders/${orderId}/status`, {
      status,
      staffId
    });
    return response.data;
  }

  // Mark item as complete
  async markItemComplete(orderId, itemId) {
    const response = await apiClient.patch(
      `/api/kitchen/orders/${orderId}/items/${itemId}/complete`
    );
    return response.data;
  }

  // Get order details
  async getOrderDetails(orderId) {
    const response = await apiClient.get(`/api/kitchen/orders/${orderId}`);
    return response.data;
  }
}

export default new KitchenService();