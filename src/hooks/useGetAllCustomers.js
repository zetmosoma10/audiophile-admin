import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ["allCustomers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/customers");
      return data;
    },
  });
};
