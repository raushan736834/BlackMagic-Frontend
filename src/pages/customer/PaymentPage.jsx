import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import PaymentMethodCard from '../../components/customer/PaymentMethodCard';
import { Smartphone, CreditCard, Wallet, DollarSign } from 'lucide-react';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { getTotal, clearCart, addOrderToHistory } = useCartContext();
  const { success, error } = useToastContext();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { method: 'upi', icon: Smartphone, name: 'UPI', description: 'Google Pay, PhonePe, Paytm' },
    { method: 'card', icon: CreditCard, name: 'Card', description: 'Visa, Mastercard, RuPay' },
    { method: 'wallet', icon: Wallet, name: 'Wallet', description: 'Paytm, Amazon Pay' },
    { method: 'cash', icon: DollarSign, name: 'Cash', description: 'Pay at table' }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      error('Please select a payment method');
      return;
    }

    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const order = {
        orderId: Date.now().toString(),
        orderCode: `ORD-${Math.floor(Math.random() * 1000)}`,
        status: 'PLACED',
        total: getTotal(),
        paymentMethod: selectedMethod,
        createdAt: new Date().toISOString()
      };

      addOrderToHistory(order);
      clearCart();
      success('Payment successful! 🎉');
      navigate('/tracking');
    } catch (err) {
      error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-orange-500 text-white rounded-xl p-6 text-center mb-4">
        <p className="text-sm mb-1">Total Amount</p>
        <p className="text-4xl font-bold">₹{getTotal().toFixed(2)}</p>
      </div>

      <div className="space-y-3 mb-4">
        {paymentMethods.map(({ method, icon, name, description }) => (
          <PaymentMethodCard
            key={method}
            method={method}
            icon={icon}
            name={name}
            description={description}
            isSelected={selectedMethod === method}
            onSelect={setSelectedMethod}
          />
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={!selectedMethod || processing}
        className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay ₹${getTotal().toFixed(2)}`}
      </button>
    </div>
  );
};

export default PaymentPage;
