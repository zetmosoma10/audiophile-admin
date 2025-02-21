import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useGetCustomer = () => {
  return useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/customers/me");
      return data;
    },
  });
};
