import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/orders");
      return data;
    },
  });
};
