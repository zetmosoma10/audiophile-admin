import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email) => {
      const { data } = await axiosInstance.post("/auth/forgotPassword", email);
      return data;
    },
  });
};
