import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import AppLayout from "./AppLayout";
import Products from "./pages/Products";
import Carts from "./pages/Carts";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Register from "./pages/Register";

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
            path: "carts",
            element: <Carts />,
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
