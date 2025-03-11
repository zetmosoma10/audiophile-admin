import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence } from "motion/react";
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
import Pagination from "./../components/Pagination";

const Users = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const { logout, token } = useAuthStore();

  const { data, isLoading, isError, error, refetch } = useGetAllCustomers(page);

  // * HANDLE MODAL
  const openUserModal = (user) => {
    setUserDetails(user);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  // * END MODAL
  let logginUser;
  if (token) {
    const decodedToken = jwtDecode(token);
    logginUser = decodedToken;
  }

  // * HANDLE SEARCH PARAMS
  useEffect(() => {
    const query = {
      ...Object.fromEntries(searchParams),
      page,
    };

    if (page === 1) delete query.page;

    setSearchParams(query, { replace: true });
  }, [page, searchParams, setSearchParams]);

  // * HANDLE PAGINATION
  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
    window.scrollTo(0, 0);
  };

  const decrementPage = () => {
    setPage((prevPage) => prevPage - 1);
    window.scrollTo(0, 0);
  };

  const setCurrentPage = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

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
      <AnimatePresence>
        {isUserModalOpen && (
          <DeleteModal closeDeleteModal={closeUserModal} user={userDetails} />
        )}
      </AnimatePresence>
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
                  className="btn-sm btn-danger"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )}
        />
      )}
      {data?.totalPages > 1 && (
        <Pagination
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          currentPage={page}
          setCurrentPage={setCurrentPage}
          totalPages={data?.totalPages}
        />
      )}
    </section>
  );
};

export default Users;
