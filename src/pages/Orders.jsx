import { useState } from "react";

const orders = [
  {
    id: "#1001",
    customer: "John Doe",
    total: "$250.00",
    status: "Pending",
    payment: "Paid",
    date: "2025-02-19",
  },
  {
    id: "#1002",
    customer: "Jane Smith",
    total: "$120.00",
    status: "Shipped",
    payment: "Paid",
    date: "2025-02-18",
  },
  {
    id: "#1003",
    customer: "Michael Brown",
    total: "$480.00",
    status: "Delivered",
    payment: "Unpaid",
    date: "2025-02-17",
  },
  {
    id: "#1004",
    customer: "Emily Davis",
    total: "$300.00",
    status: "Cancelled",
    payment: "Refunded",
    date: "2025-02-16",
  },
];

export default function OrderTable() {
  const [orderData, setOrderData] = useState(orders);

  return (
    <div className="w-full overflow-x-auto max-container">
      <h2 className="mb-4 text-3xl font-semibold text-gray-900">Orders</h2>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-left bg-white border border-collapse border-gray-200">
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
            {orderData.map((order) => {
              let statusColor = "";
              if (order.status === "Pending") {
                statusColor = "bg-green-300 text-green-700";
              } else if (order.status === "Shipped") {
                statusColor = "bg-orange-300 text-orange-700";
              } else if (order.status === "Delivered") {
                statusColor = "bg-blue-300 text-blue-700";
              } else if (order.status === "Cancelled") {
                statusColor = "bg-red-300 text-red-700";
              }

              return (
                <tr key={order.id} className="border hover:bg-gray-50">
                  <td className="p-3 font-medium border">{order.id}</td>
                  <td className="p-3 border">{order.customer}</td>
                  <td className="p-3 border">{order.total}</td>
                  <td className={`p-3 text-[13px]  font-medium  border`}>
                    <span className={`px-2 py-1 rounded-2xl ${statusColor}`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="p-3 border opacity-50">{order.date}</td>
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
    </div>
  );
}
