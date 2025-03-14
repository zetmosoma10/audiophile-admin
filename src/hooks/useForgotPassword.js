import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email) => {
      const { data } = await axiosInstance.post("/auth/forgotPassword", email);
      return data;
    },
  });
};

export default useForgotPassword;
