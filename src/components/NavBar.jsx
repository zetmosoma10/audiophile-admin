import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="border-b  bg-white ">
      <nav className="flex items-center justify-between md:justify-end py-5 max-container">
        <div className="flex items-center space-x-3 md:space-x-0 md:hidden">
          <div>
            <GiHamburgerMenu />
          </div>
          <Link
            to="/"
            className="font-extrabold text-2xl tracking-[-0.8px]  text-gray-900"
          >
            audiophile
          </Link>
        </div>
        <FaUserCircle size={30} />
      </nav>
    </header>
  );
};

export default NavBar;
