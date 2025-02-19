import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import useAuthStore from "../stores/authStore";

export const useRegister = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post("/auth/register", credentials);
      return data;
    },
    onSuccess: (data) => {
      login(data.token);
    },
  });
};
