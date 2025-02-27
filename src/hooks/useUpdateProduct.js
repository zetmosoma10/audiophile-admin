import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product) => {
      const { data } = await axiosInstance.patch(
        `/products/${product._id}`,
        product
      );
      return data;
    },

    onMutate: async (newProduct) => {
      await queryClient.cancelQueries(["allProducts"]);

      // * Deep copy of cached products
      const prevProducts = structuredClone(
        queryClient.getQueryData(["allProduct"])
      );

      queryClient.setQueryData(["allProduct"], (oldProducts) => {
        if (!oldProducts) return prevProducts;

        return {
          ...oldProducts,
          products: oldProducts.map((product) =>
            product._id === newProduct._id ? newProduct : product
          ),
        };
      });

      return { prevProducts };
    },

    onError: (error, newProduct, context) =>
      queryClient.setQueryData(["allProducts"], context.prevProducts),

    onSettled: () => queryClient.invalidateQueries(["allProducts"]),
  });
};
