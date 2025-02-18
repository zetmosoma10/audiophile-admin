import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  return (
    <header className="border-b  bg-white">
      <nav className="flex items-center justify-end mx-3 py-5">
        <FaUserCircle size={30} />
      </nav>
    </header>
  );
};

export default NavBar;
