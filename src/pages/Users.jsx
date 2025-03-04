import { useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useGetAllCustomers } from "../hooks/useGetAllCustomers";
import LoadingTableSkeleton from "../skeletons/LoadingTableSkeleton";
import UnExpectedError from "../components/UnExpectedError";
import useAuthStore from "../stores/authStore";
import Table from "../components/table/Table";
import TableRow from "../components/table/TableRow";
import TableCell from "../components/table/TableCell";
import Button from "../components/Button";
import DeleteModal from "../components/modals/DeleteModal";

const Users = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const { logout, token } = useAuthStore();

  const { data, isLoading, isError, error, refetch } = useGetAllCustomers();

  const openUserModal = (user) => {
    setUserDetails(user);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  let logginUser;
  if (token) {
    const decodedToken = jwtDecode(token);
    logginUser = decodedToken;
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
    <section className="max-container">
      {isUserModalOpen && (
        <DeleteModal closeDeleteModal={closeUserModal} user={userDetails} />
      )}
      <div className="max-container md:mx-0 max-w-0">
        <h3 className="text-3xl font-semibold text-gray-900">Users</h3>
      </div>
      {isLoading ? (
        <LoadingTableSkeleton />
      ) : (
        <Table
          columns={["Name", "Email", "Role", "Created", ""]}
          data={data?.customers}
          renderRow={(user, index) => (
            <TableRow key={index}>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell className="opacity-50">{user.email}</TableCell>
              <TableCell>{user.isAdmin ? "Admin" : "Customer"}</TableCell>
              <TableCell className="opacity-50">
                {dayjs(user.createdAt).format("DD MMM YYYY")}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => openUserModal(user)}
                  disabled={user._id === logginUser._id}
                  className="btn-small btn-danger"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )}
        />
      )}
    </section>
  );
};

export default Users;
