import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import useAuthStore from "./../stores/authStore";
import { jwtDecode } from "jwt-decode";

const NavBar = ({ openSidebar }) => {
  const { token } = useAuthStore();

  let user = null;
  if (token) {
    user = jwtDecode(token);
  }

  return (
    <header className="bg-white border-b ">
      <nav className="flex items-center justify-between py-5 md:justify-end max-container">
        <div className="flex items-center space-x-3 md:space-x-0 md:hidden">
          <GiHamburgerMenu className="cursor-pointer" onClick={openSidebar} />
          <Link
            to="/"
            className="font-extrabold text-2xl tracking-[-0.8px]  text-gray-900"
          >
            audiophile
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <FaUserCircle size={30} />
          {user && (
            <Link
              to="profile"
              className="pr-2 font-medium text-gray-900 border-r-2 opacity-70 border-r-gray-900 focus:outline-none focus:underline"
            >
              {user.firstName}
            </Link>
          )}
          {user ? (
            <Link
              to="logout"
              className="font-semibold focus:outline-none focus:underline"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="login"
              className="font-semibold focus:outline-none focus:underline"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
