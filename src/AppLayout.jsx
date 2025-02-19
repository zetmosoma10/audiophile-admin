import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

function AppLayout() {
  return (
    <main className="grid md:grid-cols-4 large_tablet:grid-cols-5">
      <aside className="hidden h-screen col-span-1 bg-white border-r md:block">
        <SideBar />
      </aside>
      <div className="col-span-3 large_tablet:col-span-4">
        <NavBar />
        <div className="min-h-screen pt-10 bg-slate-50">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AppLayout;
