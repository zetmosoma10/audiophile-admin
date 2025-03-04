import dayjs from "dayjs";
import { useGetCustomer } from "../hooks/useGetCustomer";
import { Link, Navigate } from "react-router-dom";
import BackLink from "../components/BackLink";
import LoadingProfileSkeleton from "../skeletons/LoadingProfileSkeleton";
import UnExpectedError from "../components/UnExpectedError";
import useAuthStore from "../stores/authStore";

const Profile = () => {
  const { logout } = useAuthStore();
  const { data, isLoading, isError, error, refetch } = useGetCustomer();

  if (isLoading) {
    return <LoadingProfileSkeleton />;
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
    <div className="max-container">
      <BackLink />
      <div className="flex flex-col items-center p-4 mt-10 space-y-5 bg-white border rounded-lg shadow-xl sm:space-x-5 sm:flex-row ">
        <div className="flex items-center justify-center w-40 h-40 bg-gray-700 rounded-full">
          <p className="text-5xl font-medium text-gray-100">{`${data?.customer?.firstName[0]}${data?.customer?.lastName[0]}`}</p>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-3xl font-bold large_tablet:text-4xl">
            {`${data?.customer?.firstName} ${data?.customer?.lastName}`}
          </h3>
          <p className="text-gray-600">
            Email:{" "}
            <Link className="text-indigo-600 hover:underline" to="#">
              {data?.customer?.email}
            </Link>
          </p>
          <p className="text-gray-600">
            CreatedAt:{" "}
            <span className="text-indigo-600">
              {dayjs(data?.customer?.createdAt).format("DD MMM YYYY")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
