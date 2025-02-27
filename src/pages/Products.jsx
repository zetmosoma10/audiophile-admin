import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import UnExpectedError from "../components/UnExpectedError";
import LoadingTableSkeleton from "../skeletons/LoadingTableSkeleton";
import useAuthStore from "../stores/authStore";
import EditProductModal from "../components/modals/EditProductModal";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
    error,
    refetch,
  } = useGetAllProducts();

  const openProductModal = (product) => {
    setProduct(product);
    setIsEditModalOpen(true);
  };

  const closeProductModal = () => {
    setIsEditModalOpen(false);
  };

  // ! EXPECTED ERRORS
  if (isError && error?.response?.status === 401) {
    logout();

    return navigate("/login", {
      state: { from: location, message: "You should login first" },
    });
  }

  // ! UNEXPECTED ERRORS
  if (isError && (!error.response || error.response?.status >= 500)) {
    return <UnExpectedError refetch={refetch} error={error} />;
  }

  return (
    <div className="w-full overflow-x-auto max-container">
      {isEditModalOpen && (
        <EditProductModal
          product={product}
          closeProductModal={closeProductModal}
        />
      )}
      <h2 className="text-3xl font-semibold">Products</h2>
      {isProductsLoading ? (
        <LoadingTableSkeleton />
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse border border-gray-200 text-left bg-white text-gray-900">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Product Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Stock</th>
                <th className="p-3 border">Discount</th>
                <th className="p-3 border"></th>
              </tr>
            </thead>
            <tbody>
              {products?.products.map((product) => (
                <tr key={product._id} className="border hover:bg-gray-50">
                  <td className="p-3 font-medium border">{product.name}</td>
                  <td className="p-3 capitalize border">
                    {product.category.name}
                  </td>
                  <td className="p-3 font-medium text-green-600 border">
                    R{product.price}
                  </td>
                  <td className="p-3 border">{product.stock}</td>
                  <td className="p-3 border">{product.discount}</td>
                  <td className="p-2 font-medium text-center border">
                    <button
                      onClick={() => openProductModal(product)}
                      className="py-1 px-2 text-[13px] text-white rounded-md bg-gray-900 hover:bg-gray-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
