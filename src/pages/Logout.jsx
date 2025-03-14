import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

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
