import apiClient from './api';

class CustomerService {
  // Start a new session
  async startSession(data) {
    const response = await apiClient.post('/api/customer/session/start', data);
    return response.data;
  }

  // Get menu
  async getMenu() {
    const response = await apiClient.get('/api/customer/menu');
    return response.data;
  }

  // Create order
  async createOrder(data) {
    const response = await apiClient.post('/api/customer/orders', data);
    return response.data;
  }

  // Get session orders
  async getSessionOrders(sessionCode) {
    const response = await apiClient.get(`/api/customer/session/${sessionCode}/orders`);
    return response.data;
  }

  // Get order details
  async getOrderDetails(orderId) {
    const response = await apiClient.get(`/api/customer/orders/${orderId}`);
    return response.data;
  }

  // Cancel order
  async cancelOrder(orderId, reason) {
    const response = await apiClient.delete(`/api/customer/orders/${orderId}`, {
      data: { reason }
    });
    return response.data;
  }

  // Initiate payment
  async initiatePayment(data) {
    const response = await apiClient.post('/api/customer/payments/initiate', data);
    return response.data;
  }

  // Verify payment
  async verifyPayment(data) {
    const response = await apiClient.post('/api/customer/payments/verify', data);
    return response.data;
  }

  // Call waiter
  async callWaiter(sessionCode) {
    const response = await apiClient.post('/api/customer/call-waiter', { sessionCode });
    return response.data;
  }

  // Request bill
  async requestBill(sessionCode) {
    const response = await apiClient.post('/api/customer/request-bill', { sessionCode });
    return response.data;
  }
}

export default new CustomerService();
