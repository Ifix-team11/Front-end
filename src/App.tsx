import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

import TechniciansListPage from "./Pages/TechniciansListPage/TechniciansListPage";
import TechnicianDetailPage from "./Pages/TechnicianDetailPage/TechnicianDetailPage";
import CentersListPage from "./Pages/CentersListPage/CentersListPage";
// import CenterDetailPage from ".Pages/CenterDetailPage/CenterDetailPage";
import CenterDetailPage from "./Pages/CenterDetailPage/CenterDetailPage";

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
