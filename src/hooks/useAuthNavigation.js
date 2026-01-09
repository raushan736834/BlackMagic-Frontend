import { useNavigate } from 'react-router-dom';
import { useSession } from '../../App';

export const useAuthNavigation = () => {
  const navigate = useNavigate();
  const { endSession, logoutAdmin } = useSession();

  const navigateToMenu = () => navigate('/menu');
  const navigateToCart = () => navigate('/cart');
  const navigateToProfile = () => navigate('/profile');
  const navigateToTracking = () => navigate('/tracking');
  
  const handleCustomerLogout = () => {
    endSession();
    navigate('/', { replace: true });
  };

  const navigateToAdminDashboard = () => navigate('/admin/dashboard');
  const navigateToAdminOrders = () => navigate('/admin/orders');
  
  const handleAdminLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  return {
    // Customer Navigation
    navigateToMenu,
    navigateToCart,
    navigateToProfile,
    navigateToTracking,
    handleCustomerLogout,
    
    // Admin Navigation
    navigateToAdminDashboard,
    navigateToAdminOrders,
    handleAdminLogout,
    
    // Generic
    navigate
  };
};
