import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../contexts/CartContext.jsx';
import { useToastContext } from '../../contexts/ToastContext.jsx';
import CartItem from '../../components/customer/CartItem';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeItem, 
    updateQuantity, 
    updateSpecialRequest,
    getSubtotal,
    getTax,
    getTotal 
  } = useCartContext();
  const { success, info } = useToastContext();

  const handleRemove = (itemId) => {
    removeItem(itemId);
    info('Item removed from cart');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      info('Your cart is empty');
      return;
    }
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-500 text-white p-4">
        <h1 className="text-xl font-bold">Your Cart</h1>
      </header>

      <div className="p-4 space-y-4">
        {cart.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500">Your cart is empty</p>
            <button
              onClick={() => navigate('/menu')}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={handleRemove}
                onUpdateSpecialRequest={updateSpecialRequest}
              />
            ))}

            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-bold mb-3">Bill Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{getTax().toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-500">₹{getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold"
            >
              Proceed to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;