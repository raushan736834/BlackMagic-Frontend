import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('adminSession');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('adminSession', JSON.stringify(user));
    } else {
      localStorage.removeItem('adminSession');
    }
  }, [user]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo credentials check
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const userData = {
          userId: '1',
          username: credentials.username,
          name: 'Admin User',
          email: 'admin@blackmagic.com',
          role: 'ADMIN',
          token: 'demo-jwt-token-' + Date.now(),
          loginAt: new Date().toISOString()
        };
        
        setUser(userData);
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('adminSession');
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  const isAuthenticated = useCallback(() => {
    return user?.token != null;
  }, [user]);

  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  const getToken = useCallback(() => {
    return user?.token;
  }, [user]);

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    hasRole,
    getToken
  };
};