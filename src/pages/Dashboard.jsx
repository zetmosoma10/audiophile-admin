import dayjs from "dayjs";
import { useGetAnalytics } from "../hooks/useGetAnalytics";
import LoadingDashboardSkeleton from "../skeletons/LoadingDashboardSkeleton";
import { Navigate } from "react-router-dom";
import UnExpectedError from "../components/UnExpectedError";
import useAuthStore from "../stores/authStore";
import Table from "../components/table/Table";
import TableRow from "../components/table/TableRow";
import TableCell from "../components/table/TableCell";
import Button from "../components/Button";
import Analytics from "../components/Analytics";
import OrderStatusChart from "../components/OrderStatusChart";

const Dashboard = () => {
  const { logout } = useAuthStore();
  const { data, isLoading, isError, error, refetch } = useGetAnalytics();

  if (isLoading) {
    return <LoadingDashboardSkeleton />;
  }

  // ! EXPECTED ERRORS
  if (isError && error?.response?.status === 401) {
    logout();

    return <Navigate to="/login" />;
  }

  // ! UNEXPECTED ERRORS
  if (isError && (!error.response || error.response?.status >= 500)) {
    return (
      <UnExpectedError refetch={refetch} error={error} isLoading={isLoading} />
    );
  }

  return (
    <div className="min-h-screen text-gray-900 max-container">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
        <Analytics name="Total Orders" total={data?.totalOrders} />
        <Analytics name="Total Users" total={data?.totalCustomers} />
        <Analytics name="Total Products" total={data?.totalProducts} />
        <Analytics name="Revenue" total={data?.totalRevenue} />
      </div>

      {/* Charts summary */}
      <OrderStatusChart orderStats={data?.orderStats} />

      {/* Recent Orders Table */}
      <div className="p-4 overflow-x-auto bg-white rounded-lg shadow mt-10">
        <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
        <Table
          columns={["Order ID", "Customer", "Total", "Status", "Created", ""]}
          data={data?.latestOrders}
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
                      className="btn-sm btn-outline"
                    >
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
