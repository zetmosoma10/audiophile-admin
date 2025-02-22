import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-y-auto">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 md:relative md:translate-x-0 border-r ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar closeSidebar={closeSidebar} />
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavBar openSidebar={openSidebar} />

        {/* Content Area */}
        <main className="bg-slate-50 overflow-y-auto min-h-screen py-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
