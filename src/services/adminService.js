import apiClient from './api';

class AdminService {
  // Authentication
  async login(credentials) {
    const response = await apiClient.post('/api/admin/login', credentials);
    return response?.data;
  }

  async logout() {
    const response = await apiClient.post('/api/admin/logout');
    return response.data;
  }

  // Dashboard Analytics
  async getDailyAnalytics(date) {
    const response = await apiClient.get(`/api/admin/analytics/daily/${date}`);
    return response.data;
  }

  async getRevenueAnalytics(startDate, endDate) {
    const response = await apiClient.get('/api/admin/analytics/revenue', {
      params: { startDate, endDate }
    });
    return response.data;
  }

  async getPopularItems(startDate, endDate) {
    const response = await apiClient.get('/api/admin/analytics/popular-items', {
      params: { startDate, endDate }
    });
    return response.data;
  }

  // Orders Management
  async getOrders(filters) {
    const response = await apiClient.get('/api/admin/orders', { params: filters });
    return response.data;
  }

  async getOrderDetails(orderId) {
    const response = await apiClient.get(`/api/admin/orders/${orderId}`);
    return response.data;
  }

  async updateOrderStatus(orderId, status) {
    const response = await apiClient.patch(`/api/admin/orders/${orderId}/status`, { status });
    return response.data;
  }

  async processRefund(orderId, data) {
    const response = await apiClient.post(`/api/admin/orders/${orderId}/refund`, data);
    return response.data;
  }

  // Menu Management
  async getMenuItems() {
    const response = await apiClient.get('/api/admin/menu');
    return response.data;
  }

  async createMenuItem(data) {
    const response = await apiClient.post('/api/admin/menu', data);
    return response.data;
  }

  async updateMenuItem(itemId, data) {
    const response = await apiClient.put(`/api/admin/menu/${itemId}`, data);
    return response.data;
  }

  async deleteMenuItem(itemId) {
    const response = await apiClient.delete(`/api/admin/menu/${itemId}`);
    return response.data;
  }

  async toggleItemAvailability(itemId) {
    const response = await apiClient.patch(`/api/admin/menu/${itemId}/availability`);
    return response.data;
  }

  // Table Management
  async getTables() {
    const response = await apiClient.get('/api/admin/tables');
    return response.data;
  }

  async createTable(data) {
    const response = await apiClient.post('/api/admin/tables', data);
    return response.data;
  }

  async updateTable(tableId, data) {
    const response = await apiClient.put(`/api/admin/tables/${tableId}`, data);
    return response.data;
  }

  async deleteTable(tableId) {
    const response = await apiClient.delete(`/api/admin/tables/${tableId}`);
    return response.data;
  }

  async generateQRCode(tableNumber) {
    const response = await apiClient.get(`/api/admin/tables/${tableNumber}/qr-code`);
    return response.data;
  }

  // Staff Management
  async getStaff() {
    const response = await apiClient.get('/api/admin/users');
    return response.data;
  }

  async createStaff(data) {
    const response = await apiClient.post('/api/admin/users', data);
    return response.data;
  }

  async updateStaff(userId, data) {
    const response = await apiClient.put(`/api/admin/users/${userId}`, data);
    return response.data;
  }

  async deleteStaff(userId) {
    const response = await apiClient.delete(`/api/admin/users/${userId}`);
    return response.data;
  }

  // Bookings Management
  async getBookings(date) {
    const response = await apiClient.get(`/api/bookings/date/${date}`);
    return response.data;
  }

  async createBooking(data) {
    const response = await apiClient.post('/api/bookings', data);
    return response.data;
  }

  async updateBooking(bookingId, data) {
    const response = await apiClient.put(`/api/bookings/${bookingId}`, data);
    return response.data;
  }

  async cancelBooking(bookingId) {
    const response = await apiClient.delete(`/api/bookings/${bookingId}`);
    return response.data;
  }
}

export default new AdminService();