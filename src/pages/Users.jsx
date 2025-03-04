import { Navigate } from "react-router-dom";
import dayjs from "dayjs";
import { useGetAllCustomers } from "../hooks/useGetAllCustomers";
import LoadingTableSkeleton from "../skeletons/LoadingTableSkeleton";
import UnExpectedError from "../components/UnExpectedError";
import useAuthStore from "../stores/authStore";
import Table from "../components/table/Table";
import TableRow from "../components/table/TableRow";
import TableCell from "../components/table/TableCell";
import Button from "../components/Button";

const Users = () => {
  const { logout } = useAuthStore();

  const { data, isLoading, isError, error, refetch } = useGetAllCustomers();

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
    <section className="max-container">
      <div className="max-container md:mx-0 max-w-0">
        <h3 className="text-3xl font-semibold text-gray-900">Users</h3>
      </div>
      {isLoading ? (
        <LoadingTableSkeleton />
      ) : (
        <Table
          columns={["Name", "Email", "Role", "Created", ""]}
          data={data?.customers}
          renderRow={(row, index) => (
            <TableRow key={index}>
              <TableCell>
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell className="opacity-50">{row.email}</TableCell>
              <TableCell>{row.isAdmin ? "Admin" : "Customer"}</TableCell>
              <TableCell className="opacity-50">
                {dayjs(row.createdAt).format("DD MMM YYYY")}
              </TableCell>
              <TableCell>
                <Button className="btn-small btn-danger">Delete</Button>
              </TableCell>
            </TableRow>
          )}
        />
      )}
    </section>
  );
};

export default Users;
