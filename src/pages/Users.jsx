import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useGetAllCustomers } from "../hooks/useGetAllCustomers";
import LoadingTableSkeleton from "../skeletons/LoadingTableSkeleton";
import UnExpectedError from "../components/UnExpectedError";
import useAuthStore from "../stores/authStore";

const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  const { data, isLoading, isError, error, refetch } = useGetAllCustomers();

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
    <section className="max-container">
      <div className="max-container md:mx-0 max-w-0">
        <h3 className="text-3xl font-semibold text-gray-900">Users</h3>
      </div>
      {isLoading ? (
        <LoadingTableSkeleton />
      ) : (
        <div className="w-full mt-8 overflow-x-auto ">
          <table className="w-full text-left text-gray-900 bg-white border border-collapse border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {data?.customers.map((customer) => (
                <tr key={customer._id} className="border hover:bg-gray-50">
                  <td className="p-2 font-medium border">
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td className="p-2 border opacity-50">{customer.email}</td>
                  <td className="p-2 border">
                    {customer.isAdmin ? "Admin" : "Customer"}
                  </td>
                  <td className="p-2 border opacity-50">
                    {dayjs(customer.createdAt).format("DD MMM YYYY")}
                  </td>
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
      )}
    </section>
  );
};

export default Users;
