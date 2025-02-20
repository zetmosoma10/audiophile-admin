const Dashboard = () => {
  return (
    <div className="min-h-screen text-gray-900 max-container">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 large_tablet:grid-cols-4">
        <div className="p-4 bg-white border border-r rounded-lg shadow">
          <p className="text-gray-600">Total Orders</p>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            120
          </h2>
        </div>
        <div className="p-4 bg-white border border-r rounded-lg shadow">
          <p className="text-gray-600">Total Users</p>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            45
          </h2>
        </div>
        <div className="p-4 bg-white border border-r rounded-lg shadow">
          <p className="text-gray-600">Total Products</p>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
            30
          </h2>
        </div>
        <div className="p-4 bg-white border border-r rounded-lg shadow">
          <p className="text-gray-600">Revenue</p>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
            $15,000
          </h2>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="p-4 overflow-x-auto bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
        <table className="w-full text-left border border-collapse border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border hover:bg-gray-50">
              <td className="p-3 font-medium border">#1001</td>
              <td className="p-3 border">John Doe</td>
              <td className="p-3 border">$250.00</td>
              <td className="p-3 text-blue-600 border">Pending</td>
              <td className="p-3 border opacity-50">2025-02-19</td>
              <td className="p-3 border">
                <button className="py-1 px-2 text-[13px] text-gray-900 border rounded-md hover:bg-slate-200">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
