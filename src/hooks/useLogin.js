import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import useAuthStore from "../stores/authStore";

const useLogin = () => {
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post("/auth/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      login(data.token);
    },
  });
};

export default useLogin;
