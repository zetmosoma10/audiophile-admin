import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useGetAllOrders } from "./../hooks/useGetAllOrders";
import LoadingTableSkeleton from "../skeletons/LoadingTableSkeleton";
import UnExpectedError from "../components/UnExpectedError";
import UpdateOrderModal from "../components/modals/UpdateOrderModal";
import DeleteOrderModal from "../components/modals/DeleteOrderModal";
import useAuthStore from "../stores/authStore";
import Button from "../components/Button";
import Table from "../components/table/Table";
import TableRow from "../components/table/TableRow";
import TableCell from "../components/table/TableCell";

export default function OrderTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { data, isLoading, isError, error, refetch } = useGetAllOrders();

  // * -- HANDLING MODAL DISPLAY LOGIN
  const openUpdateModal = (order) => {
    setOrderDetails(order);
    setIsUpdateModalOpen(true);
    setIsDeleteModalOpen(false);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openDeleteModal = (order) => {
    setOrderDetails(order);
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  // * -- END OF MODAL DISPLAY LOGIN

  // ! EXPECTED ERRORS
  if (isError && error?.response?.status === 401) {
    logout();

    return navigate("/login", {
      state: { from: location, message: "You should login first" },
    });
  }

  // ! UNEXPECTED ERRORS
  if (isError && (!error.response || error.response?.status >= 500)) {
    return (
      <UnExpectedError refetch={refetch} error={error} isLoading={isLoading} />
    );
  }

  return (
    <div className="w-full overflow-x-auto max-container">
      {/* MODALS */}
      {isUpdateModalOpen && (
        <UpdateOrderModal
          order={orderDetails}
          closeUpdateModal={closeUpdateModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteOrderModal
          order={orderDetails}
          closeDeleteModal={closeDeleteModal}
        />
      )}
      {/* END OF MODALS */}
      <h2 className="mb-4 text-3xl font-semibold text-gray-900">Orders</h2>
      {isLoading ? (
        <LoadingTableSkeleton />
      ) : (
        <>
          <Table
            columns={["Order ID", "Total", "Customer", "Status", "Created", ""]}
            data={data?.orders}
            renderRow={(order, index) => {
              let statusColor = "";
              if (order.status === "pending") {
                statusColor = "bg-green-300 text-green-700";
              } else if (order.status === "shipped") {
                statusColor = "bg-orange-300 text-orange-700";
              } else if (order.status === "delivered") {
                statusColor = "bg-blue-300 text-blue-700";
              } else if (order.status === "cancelled") {
                statusColor = "bg-red-300 text-red-700";
              }

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    #{order.orderNumber}
                  </TableCell>
                  <TableCell className="capitalize">{order.name}</TableCell>
                  <TableCell className="font-medium text-green-500">
                    R{parseFloat(order.grandTotal.toFixed(2))}
                  </TableCell>
                  <TableCell className="p-3 text-[13px]  font-medium  border">
                    <span className={`px-2 py-1 rounded-2xl ${statusColor}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="opacity-50">
                    {dayjs(order.createdAt).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell className="p-3">
                    <div className="flex gap-2">
                      <Button
                        type="link"
                        to={`/orders/${order._id}`}
                        className="btn-small btn-outline"
                      >
                        View
                      </Button>

                      <Button
                        disabled={order.status === "delivered"}
                        onClick={() => openUpdateModal(order)}
                        className="btn-small btn-dark"
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() => openDeleteModal(order)}
                        className="btn-small btn-danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }}
          />
        </>
      )}
    </div>
  );
}
