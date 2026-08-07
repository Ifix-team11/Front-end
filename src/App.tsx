import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

import TechniciansListPage from "./pages/TechniciansListPage/TechniciansListPage";
import TechnicianDetailPage from "./pages/TechnicianDetailPage/TechnicianDetailPage";
import CentersListPage from "./pages/CentersListPage/CentersListPage";
import CenterDetailPage from "./pages/CenterDetailPage/CenterDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TechniciansListPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/technicians",
    element: <TechniciansListPage />,
  },
  {
    path: "/technicians/:id",
    element: <TechnicianDetailPage />,
  },
  {
    path: "/centers",
    element: <CentersListPage />,
  },
  {
    path: "/centers/:id",
    element: <CenterDetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
