import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const RequireAuth = () => {
  //   const location = useLocation();
  const { token } = useAuthStore();

  if (!token) {
    return (
      <Navigate
        to="login"
        // state={{ from: location, message: "You should login first" }}
      />
    );
  }

  return <Outlet />;
};

export default RequireAuth;
