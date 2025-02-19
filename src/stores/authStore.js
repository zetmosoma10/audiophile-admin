import { create } from "zustand";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token-audio-admin") || null;
};

const useAuthStore = create((set) => ({
  token: getTokenFromLocalStorage(),
  login: (resToken) => {
    localStorage.setItem("token-audio-admin", resToken);
    set({ token: resToken });
  },
  logout: () => {
    localStorage.removeItem("token-audio-admin");
    set({ token: null });
  },
}));

export default useAuthStore;
