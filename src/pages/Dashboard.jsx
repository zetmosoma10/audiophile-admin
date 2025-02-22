import dayjs from "dayjs";
import { useGetAnalytics } from "../hooks/useGetAnalytics";
import LoadingDashboardSkeleton from "../skeletons/LoadingDashboardSkeleton";
import { Link } from "react-router-dom";
import UnExpectedError from "../components/UnExpectedError";

const Dashboard = () => {
  const { data, isLoading, isError, error, refetch } = useGetAnalytics();

  if (isLoading) {
    return <LoadingDashboardSkeleton />;
  }

  if (isError && (!error.response || error.response?.status >= 500)) {
    return <UnExpectedError refetch={refetch} error={error} />;
  }

  return (
    <div className="min-h-screen text-gray-900 max-container">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 large_tablet:grid-cols-4">
        <div className="p-4 bg-white border border-r rounded-lg shadow">
          <p className="text-gray-600">Total Orders</p>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            {data?.totalOrders}
          </h2>
        </div>
        <div className="p-4 bg-white border border-r rounded-lg shadow">
          <p className="text-gray-600">Total Users</p>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            {data?.totalCustomers}
          </h2>
        </div>
        <div className="p-4 bg-white border border-r rounded-lg shadow">
          <p className="text-gray-600">Total Products</p>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            {data?.totalProducts}
          </h2>
        </div>
        <div className="p-4 bg-white border border-r rounded-lg shadow">
          <p className="text-gray-600">Revenue</p>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
            R{Math.round(data?.totalRevenue)}
          </h2>
        </div>
      </div>

      {/* Recent Orders Table */}
      {data?.latestOrders.length === 0 ? (
        <p>No Orders in Database</p>
      ) : (
        <div className="p-4 overflow-x-auto bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
          <table className="w-full text-left border border-collapse border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Created</th>
                <th className="p-3 border"></th>
              </tr>
            </thead>
            <tbody>
              {data?.latestOrders.map((order) => {
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
                  <tr key={order._id} className="border hover:bg-gray-50">
                    <td className="p-3 font-medium border">
                      #{order.orderNumber}
                    </td>
                    <td className="p-3 border">{order.name}</td>
                    <td className="p-3 border">R{order.grandTotal}</td>
                    <td className="p-3 text-[13px]  font-medium  border">
                      <span className={`px-2 py-1 rounded-2xl ${statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 border opacity-50">
                      {dayjs(order.createdAt).format("DD MMM YYYY")}
                    </td>
                    <td className="p-3 border">
                      <Link
                        to={`orders/${order._id}`}
                        className="py-1 px-2 text-[13px] text-gray-900 border rounded-md hover:bg-slate-200"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
