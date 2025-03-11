import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useGetAllOrders = (status, page) => {
  const query = new URLSearchParams({ page });
  if (status !== "all") query.append("status", status);

  return useQuery({
    queryKey: ["allOrders", status, page],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/orders", {
        params: query,
      });
      return data;
    },
  });
};
