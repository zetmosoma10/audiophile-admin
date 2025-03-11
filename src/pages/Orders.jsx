import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import dayjs from "dayjs";
import { useGetAllOrders } from "./../hooks/useGetAllOrders";
import LoadingTableSkeleton from "../skeletons/LoadingTableSkeleton";
import UnExpectedError from "../components/UnExpectedError";
import UpdateOrderModal from "../components/modals/UpdateOrderModal";
import useAuthStore from "../stores/authStore";
import Button from "../components/Button";
import Table from "../components/table/Table";
import TableRow from "../components/table/TableRow";
import TableCell from "../components/table/TableCell";
import DeleteModal from "../components/modals/DeleteModal";
import Pagination from "../components/Pagination";

export default function OrderTable() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialStatus = searchParams.get("status") || "all";
  const [page, setPage] = useState(initialPage);
  const [status, setStatus] = useState(initialStatus);
  const { logout } = useAuthStore();

  const { data, isLoading, isError, error, refetch } = useGetAllOrders(
    status,
    page
  );

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

  // * UPDATE SEARCH PARAMS
  useEffect(() => {
    const query = {
      ...Object.fromEntries(searchParams),
      page,
      status,
    };

    if (page === 1) delete query.page;
    if (status === "all") delete query.status;

    setSearchParams(query, { replace: true });
  }, [page, status, setSearchParams, searchParams]);

  // * UPDATE SEARCH PARAMS
  const handleStatusChange = (status) => {
    setStatus(status);
    setPage(1);
  };

  // * HANDLE PAGINATION
  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
    window.scrollTo(0, 0);
  };

  const decrementPage = () => {
    setPage((prevPage) => prevPage - 1);
    window.scrollTo(0, 0);
  };

  const setCurrentPage = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  // ! EXPECTED ERRORS
  if (isError && error?.response?.status === 401) {
    logout();

    return <Navigate to="/login" />;
  }

  // ! UNEXPECTED ERRORS
  if (isError && (!error?.response || error.response.status >= 500)) {
    return (
      <UnExpectedError refetch={refetch} error={error} isLoading={isLoading} />
    );
  }

  return (
    <div className="w-full overflow-x-auto max-container">
      {/* MODALS */}
      <AnimatePresence>
        {isUpdateModalOpen && (
          <UpdateOrderModal
            order={orderDetails}
            closeUpdateModal={closeUpdateModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <DeleteModal
            order={orderDetails}
            closeDeleteModal={closeDeleteModal}
          />
        )}
      </AnimatePresence>

      {/* END OF MODALS */}
      <div className="flex items-start justify-between">
        <h2 className="mb-4 text-3xl font-semibold text-gray-900">Orders</h2>
        <select
          onChange={(e) => handleStatusChange(e.target.value)}
          value={status}
          className="px-3 py-2 m-1 text-base font-semibold bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">choose status</option>
          {["pending", "shipped", "delivered", "cancelled"].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <LoadingTableSkeleton />
      ) : (
        <>
          <Table
            columns={["Order ID", "Customer", "Total", "Status", "Created", ""]}
            data={data?.orders}
            renderRow={(order) => {
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
                <TableRow key={order._id}>
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
                        className="btn-sm btn-outline "
                      >
                        View
                      </Button>

                      <Button
                        disabled={order.status === "delivered"}
                        onClick={() => openUpdateModal(order)}
                        className="btn-sm btn-dark"
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() => openDeleteModal(order)}
                        className="btn-sm btn-danger"
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
      {data?.totalPages > 1 && (
        <Pagination
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          currentPage={page}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages}
        />
      )}
    </div>
  );
}
