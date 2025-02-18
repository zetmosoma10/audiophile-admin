import { IoHomeOutline, IoReorderThreeOutline } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";

const SideBar = () => {
  return (
    <div className="pt-5 px-5">
      <a className="font-extrabold text-2xl tracking-[-0.8px] pl-2">
        audiophile
      </a>
      <ul className="font-medium text-gray-900 text-base  mt-5 capitalize">
        <li className="hover:bg-slate-100 p-2 hover:rounded-lg">
          <a href="" className="flex items-center space-x-2">
            <IoHomeOutline />
            <span>Dashboard</span>
          </a>
        </li>
        <li className="hover:bg-slate-100 p-2 hover:rounded-lg">
          <a href="" className="flex items-center space-x-2">
            <TbUsers />
            <span>Users</span>
          </a>
        </li>
        <li className="hover:bg-slate-100 p-2 hover:rounded-lg">
          <a href="" className="flex items-center space-x-2">
            <IoReorderThreeOutline />
            <span>Orders</span>
          </a>
        </li>
        <li className="hover:bg-slate-100 p-2 hover:rounded-lg">
          <a href="" className="flex items-center space-x-2">
            <AiOutlineProduct />
            <span>Products</span>
          </a>
        </li>
        <li className="hover:bg-slate-100 p-2 hover:rounded-lg">
          <a href="" className="flex items-center space-x-2">
            <AiOutlineShoppingCart />
            <span>Carts</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
