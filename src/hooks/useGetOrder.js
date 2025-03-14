import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const useGetOrder = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/orders/${orderId}`);
      return data;
    },
  });
};

export default useGetOrder;
