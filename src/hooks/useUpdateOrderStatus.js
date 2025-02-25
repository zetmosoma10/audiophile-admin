import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order) => {
      const { data } = await axiosInstance.patch(`/orders/${order._id}`, {
        status: order.status,
      });

      return data;
    },

    onMutate: async (newOrder) => {
      await queryClient.cancelQueries(["allOrders"]);

      // * Deep copy of cached orders
      const prevOrders = structuredClone(
        queryClient.getQueryData(["allOrders"])
      );

      queryClient.setQueryData(["allOrders"], (oldOrders) => {
        if (!oldOrders) return prevOrders;

        return {
          ...oldOrders,
          orders: oldOrders.orders.map((order) =>
            order._id === newOrder._id ? newOrder : order
          ),
        };
      });

      return { prevOrders };
    },

    onError: (error, newOrder, context) => {
      queryClient.setQueryData(["allOrders"], context.prevOrders);
    },

    onSettled: () => queryClient.invalidateQueries(["allOrders"]),
  });
};
