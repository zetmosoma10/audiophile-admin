import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./SideBar";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

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
        <FaUserCircle size={30} />
      </nav>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-10 flex md:hidden">
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black opacity-50"
          ></div>
          <div className="min-h-screen  w-[70%] sm:w-[50%] relative z-10 top-0 ">
            <SideBar closeSidebar={closeSidebar} />
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
