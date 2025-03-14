import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/products");
      return data;
    },
  });
};

export default useGetAllProducts;
