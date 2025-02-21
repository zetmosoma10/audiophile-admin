import dayjs from "dayjs";
import { useGetAllOrders } from "./../hooks/useGetAllOrders";
import LoadingTableSkeleton from "../skeletons/LoadingTableSkeleton";

export default function OrderTable() {
  const { data: orders, isLoading: isOrdersLoading } = useGetAllOrders();

  return (
    <div className="w-full overflow-x-auto max-container">
      <h2 className="mb-4 text-3xl font-semibold text-gray-900">Orders</h2>
      {isOrdersLoading ? (
        <LoadingTableSkeleton />
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-gray-900 bg-white border border-collapse border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Order Status</th>
                <th className="p-3 border">Created</th>
                <th className="p-3 border"></th>
              </tr>
            </thead>
            <tbody>
              {orders?.orders.map((order) => {
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
                    <td className="p-3 font-medium text-green-600 border">
                      R{order.grandTotal}
                    </td>
                    <td className="p-3 text-[13px]  font-medium  border">
                      <span className={`px-2 py-1 rounded-2xl ${statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 border opacity-50">
                      {dayjs(order.createdAt).format("DD MMM YYYY")}
                    </td>
                    <td className="p-3 ">
                      <div className="flex gap-2">
                        <button className="py-1 px-2 text-[13px] text-gray-900 border rounded-md hover:bg-slate-200">
                          View
                        </button>

                        <button className="py-1 px-2 text-[13px] text-white rounded-md bg-gray-900 hover:bg-gray-800">
                          Edit
                        </button>
                        <button className="py-1 px-2 text-[13px] text-white rounded-md bg-red-600 hover:bg-red-500">
                          Delete
                        </button>
                      </div>
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
}
