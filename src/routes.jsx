import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import AppLayout from "./AppLayout";
import Products from "./pages/Products";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

const router = createBrowserRouter([
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
