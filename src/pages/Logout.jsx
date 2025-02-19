import { useEffect } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, []);

  return null;
};

export default Logout;
