import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

function App() {
  return (
    <main className="grid md:grid-cols-4">
      <aside className="grid sticky col-span-1 h-screen bg-white border">
        <SideBar />
      </aside>
      <div className="col-span-3">
        <NavBar />
        <div className="bg-gray-100 min-h-screen w-full"></div>
      </div>
    </main>
  );
}

export default App;
