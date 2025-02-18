import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

function AppLayout() {
  return (
    <main className="grid md:grid-cols-4">
      <aside className="col-span-1 h-screen bg-white border  hidden  md:block">
        <SideBar />
      </aside>
      <div className="col-span-3">
        <NavBar />
        <div className="bg-gray-100 min-h-screen">
          <div className="max-container">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AppLayout;
