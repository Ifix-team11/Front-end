import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
//import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./components/Home/Home";
import Services from "./components/Services/Services";
import TechniciansSection from "./components/TechniciansSection/TechniciansSection";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import WhyIFix from "./components/WhyIFix/WhyIFix";
import AppDownload from "./components/AppDownload/AppDownload";

import StoreHero from "./components/IfixStor/StoreHero";
import ElectricalServices from "./components/Electrical/ElectricalServices";
import PlumbingServices from "./components/Plumbing/PlumbingServices";
import CarpentryServices from "./components/Carpentry/CarpentryServices";
import PaintingServices from "./components/painting/PaintingServices";
import HomeAppliancesServices from "./components/Appliances/HomeAppliancesServices";
import PestControlServices from "./components/PestControl/PestControlServices";

function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

function AuthLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

const router = createBrowserRouter([
{
    element: <AuthLayout />,
    children: [
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
    ],
  },


  {
    element: <Layout />,
    children: [
      // Home
      {
        path: "/",
        element: (
          <>
            <Home />
            <Services />
            <TechniciansSection />
            <HowItWorks />
            <WhyIFix />
            <AppDownload />
          </>
        ),
      },

      // Store
      {
        path: "/store",
        element: <StoreHero />,
      },

      // Technicians
      {
        path: "/technicians",
        element: <TechniciansSection />,
      },

      // Services
      {
        path: "/electricity",
        element: <ElectricalServices />,
      },
      {
        path: "/plumbing",
        element: <PlumbingServices />,
      },
      {
        path: "/carpentry",
        element: <CarpentryServices />,
      },
      {
        path: "/painting",
        element: <PaintingServices />,
      },
      {
        path: "/appliances",
        element: <HomeAppliancesServices />,
      },
      {
        path: "/pestcontrol",
        element: <PestControlServices />,
      },

      // Partners
      {
        path: "/partners",
        element: <div>كن شريكنا</div>,
      },

      // Contact
      {
        path: "/contact",
        element: <div>تواصل معنا</div>,
      },

      // Not Found
      {
        path: "*",
        element: <div>الصفحة غير موجودة</div>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
