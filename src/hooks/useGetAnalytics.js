import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/analytics");
      return data;
    },
  });
};

export default useGetAnalytics;
