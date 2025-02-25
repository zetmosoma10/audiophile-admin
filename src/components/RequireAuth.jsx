import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const RequireAuth = () => {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;
