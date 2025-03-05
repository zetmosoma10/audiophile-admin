import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import UnExpectedError from "../components/UnExpectedError";
import LoadingTableSkeleton from "../skeletons/LoadingTableSkeleton";
import useAuthStore from "../stores/authStore";
import EditProductModal from "../components/modals/EditProductModal";
import Button from "../components/Button";
import TableRow from "../components/table/TableRow";
import TableCell from "../components/table/TableCell";
import Table from "../components/table/Table";

const Products = () => {
  const { logout } = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const { data, isLoading, isError, error, refetch } = useGetAllProducts();

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

    return <Navigate to="/login" />;
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
      {isLoading ? (
        <LoadingTableSkeleton />
      ) : (
        <Table
          columns={[
            "Product Name",
            "Category",
            "Price (Original)",
            "Discount (%)",
            "Price (Discount)",
            "Stock",
            "",
          ]}
          data={data?.products}
          renderRow={(row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell className="font-medium capitalize">
                {row.category.name}
              </TableCell>
              <TableCell className="font-medium text-green-500">
                {row.price}
              </TableCell>
              <TableCell className="font-medium">{row.discount}</TableCell>
              <TableCell className="font-medium text-green-500">
                {row.finalPrice}
              </TableCell>
              <TableCell
                className={`${
                  row.stock >= 10 ? "text-indigo-500" : "text-red-500"
                }`}
              >
                {row.stock}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => openProductModal(row)}
                  className="btn-sm btn-dark"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          )}
        />
      )}
    </div>
  );
};

export default Products;
