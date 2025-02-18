import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../constance";

const SideBar = () => {
  return (
    <div className="pt-5 px-5 ">
      <Link
        to="/"
        className="font-extrabold text-gray-900 text-2xl tracking-[-0.8px] pl-2"
      >
        audiophile
      </Link>
      <ul className="font-medium text-gray-900 text-base  mt-5 capitalize space-y-1">
        {navLinks.map((item) => (
          <li>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-2 hover:bg-slate-100 p-2 hover:rounded-lg bg-slate-100"
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
