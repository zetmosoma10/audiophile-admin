import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order) => {
      const { data } = await axiosInstance.delete(`/orders/${order._id}`);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries(["allOrders"]),
  });
};
