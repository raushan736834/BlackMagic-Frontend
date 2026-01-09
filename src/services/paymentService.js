import apiClient from './api';

class PaymentService {
  constructor() {
    this.razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  }

  // Load Razorpay script
  loadRazorpayScript() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // Initiate payment
  async initiatePayment(orderId, method) {
    const response = await apiClient.post('/api/customer/payments/initiate', {
      orderId,
      method
    });
    return response.data;
  }

  // Open Razorpay checkout
  async openRazorpayCheckout(orderData, onSuccess, onFailure) {
    const loaded = await this.loadRazorpayScript();

    if (!loaded) {
      alert('Failed to load payment gateway. Please try again.');
      return;
    }

    const options = {
      key: this.razorpayKey,
      amount: orderData.amount * 100, // Convert to paise
      currency: orderData.currency || 'INR',
      name: 'BlackMagic Restaurant',
      description: `Order #${orderData.orderCode}`,
      order_id: orderData.razorpayOrderId,
      handler: async (response) => {
        // Payment successful
        try {
          const verifyResponse = await this.verifyPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          });
          onSuccess(verifyResponse);
        } catch (error) {
          onFailure(error);
        }
      },
      prefill: {
        name: orderData.customerName || '',
        email: orderData.customerEmail || '',
        contact: orderData.customerPhone || ''
      },
      theme: {
        color: '#ff6b35'
      },
      modal: {
        ondismiss: () => {
          onFailure({ message: 'Payment cancelled by user' });
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  // Verify payment
  async verifyPayment(data) {
    const response = await apiClient.post('/api/customer/payments/verify', data);
    return response.data;
  }

  // Get payment status
  async getPaymentStatus(paymentId) {
    const response = await apiClient.get(`/api/customer/payments/${paymentId}/status`);
    return response.data;
  }
}

export default new PaymentService();