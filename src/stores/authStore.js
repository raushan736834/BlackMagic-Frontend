import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem('authToken'),
  user: null,

  login: (token, user) => {
    localStorage.setItem('authToken', token);
    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ token: null, user: null });
  },

  isAuthenticated: () => !!get().token,
}));
