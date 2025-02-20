const usersData = [
  { id: 1, name: "John Doe", email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
  { id: 3, name: "Mike Johnson", email: "mikejohnson@example.com" },
  { id: 4, name: "Emily Davis", email: "emilydavis@example.com" },
];

const Users = () => {
  return (
    <section className="max-container">
      <div className="max-container md:mx-0 max-w-0">
        <h3 className="text-3xl font-semibold text-gray-900">Users</h3>
      </div>
      <div className="w-full mt-8 overflow-x-auto">
        <table className="w-full text-left bg-white border border-collapse border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id} className="border hover:bg-gray-50">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border opacity-50">{user.email}</td>
                <td className="p-2 border">Admin</td>
                <td className="p-2 border opacity-50">12 Jan, 2025</td>
                <td className="p-2 font-medium text-center border">
                  <button className="py-1 px-2 text-[13px] text-white rounded-md bg-red-600 hover:bg-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
