import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../constance";
import { IoAddSharp } from "react-icons/io5";

const SideBar = ({ closeSidebar }) => {
  return (
    <div className="min-h-screen px-5 pt-5 bg-white ">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="font-extrabold text-gray-900 text-2xl tracking-[-0.8px] pl-2"
        >
          audiophile
        </Link>
        <div
          onClick={closeSidebar}
          className="p-1 border rounded-full cursor-pointer md:hidden"
        >
          <IoAddSharp size={24} className="rotate-45" />
        </div>
      </div>
      <ul className="mt-5 space-y-1 text-base font-medium text-gray-900 capitalize">
        {navLinks.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-2 hover:bg-slate-100 p-2 bg-slate-100 rounded-lg"
                  : "flex items-center space-x-2 hover:bg-slate-100 p-2 hover:rounded-lg"
              }
            >
              <item.icon />
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
