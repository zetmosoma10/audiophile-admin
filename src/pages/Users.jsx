const usersData = [
  { id: 1, name: "John Doe", email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
  { id: 3, name: "Mike Johnson", email: "mikejohnson@example.com" },
  { id: 4, name: "Emily Davis", email: "emilydavis@example.com" },
];

const Users = () => {
  return (
    <section className="md:ml-6">
      <div className="max-container md:mx-0 max-w-0">
        <h3 className="text-2xl font-bold text-gray-900">Users</h3>
        <p className="opacity-50">There are 5 user accounts in database</p>
      </div>
      <div className="w-full mt-8 overflow-x-auto">
        <table className="w-full bg-white border border-collapse border-gray-300 ">
          <thead className="overflow-hidden">
            <tr className="text-left text-gray-900 uppercase bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id} className="text-gray-900 ">
                <td className="p-2 border">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gray-200 rounded-full">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-base font-semibold">{user.name}</p>
                      <p className="text-sm font-medium opacity-50">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-2 font-medium border">Admin</td>
                <td className="p-2 font-medium border opacity-50">
                  12 Jan, 2025
                </td>
                <td className="p-2 font-medium text-center border">
                  <button className="text-red-500 bg-transparent border-none hover:text-red-600">
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
