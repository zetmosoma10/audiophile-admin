import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useGetAllOrders = (status) => {
  const query = {};
  if (status !== "all") {
    query.status = status;
  } else {
    query.status = "";
  }

  return useQuery({
    queryKey: ["allOrders", status],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/orders?status=${query.status}`
      );
      return data;
    },
  });
};
