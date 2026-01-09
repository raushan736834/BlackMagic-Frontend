import { SessionProvider } from './SessionContext.jsx';
import { CartProvider } from './CartContext.jsx';
import { ToastProvider } from './ToastContext.jsx';

export const AppProvider = ({ children }) => {
  return (
    <SessionProvider>
      <CartProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </CartProvider>
    </SessionProvider>
  );
};
