import { create } from "zustand";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token-audio-admin") || null;
};

const useAuthStore = create((set) => ({
  token: getTokenFromLocalStorage(),
  login: (newToken) => {
    localStorage.setItem("token-audio-admin", newToken);
    set({ token: newToken });
  },
  logout: () => {
    localStorage.removeItem("token-audio-admin");
    set({ token: null });
  },
}));

export default useAuthStore;
