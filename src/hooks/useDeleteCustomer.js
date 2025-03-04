import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customer) => {
      const { data } = await axiosInstance.delete(`/customers/${customer._id}`);
      return data;
    },
    onSettle: () => queryClient.invalidateQueries(["allCustomers"]),
  });
};
