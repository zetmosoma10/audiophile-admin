import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import useAuthStore from "../stores/authStore";

export const useResetPassword = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credential) => {
      const { data } = await axiosInstance.patch(
        "/auth/resetPassword",
        credential
      );
      return data;
    },
    onSuccess: (data) => login(data.token),
  });
};
