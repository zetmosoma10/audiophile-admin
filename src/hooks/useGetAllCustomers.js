import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useGetAllCustomers = (page) => {
  const query = new URLSearchParams({ page });

  return useQuery({
    queryKey: ["allCustomers", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/customers", { params: query });
      return data;
    },
  });
};
