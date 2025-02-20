import { IoHomeOutline, IoReorderThreeOutline } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";

export const navLinks = [
  {
    path: "/",
    icon: IoHomeOutline,
    name: "dashboard",
  },
  {
    path: "users",
    icon: TbUsers,
    name: "users",
  },
  {
    path: "orders",
    icon: IoReorderThreeOutline,
    name: "orders",
  },
  {
    path: "products",
    icon: AiOutlineProduct,
    name: "products",
  },
];
