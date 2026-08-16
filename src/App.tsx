// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";

// import Home from "./components/Home/Home";
// import Services from "./components/Services/Services";
// import TechniciansSection from "./components/TechniciansSection/TechniciansSection";
// import HowItWorks from "./components/HowItWorks/HowItWorks";
// import WhyIFix from "./components/WhyIFix/WhyIFix";
// import AppDownload from "./components/AppDownload/AppDownload";

// import StoreHero from "./components/IfixStor/StoreHero";

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         {/* Home */}
//         <Route
//           path="/"
//           element={
//             <>
//               <Home />
//               <Services />
//               <TechniciansSection />
//               <HowItWorks />
//               <WhyIFix />
//               <AppDownload />
//             </>
//           }
//         />

//         {/* Store */}
//         <Route path="/store" element={<StoreHero />} />

//         {/* Technicians */}
//         <Route path="/technicians" element={<TechniciansSection />} />

//         {/* Services */}
//         <Route path="/services/electricity" element={<div>الكهرباء</div>} />

//         <Route path="/services/plumbing" element={<div>السباكة</div>} />

//         <Route path="/services/carpentry" element={<div>النجار</div>} />

//         <Route path="/services/painting" element={<div>أعمال الدهان</div>} />

//         <Route
//           path="/services/appliances"
//           element={<div>الأجهزة المنزلية</div>}
//         />

//         <Route
//           path="/services/pest-control"
//           element={<div>مكافحة الحشرات</div>}
//         />

//         {/* Partners */}
//         <Route path="/partners" element={<div>كن شريكنا</div>} />

//         {/* Contact */}
//         <Route path="/contact" element={<div>تواصل معنا</div>} />

//         {/* Not Found */}
//         <Route path="*" element={<div>الصفحة غير موجودة</div>} />
//       </Routes>

//       <Footer />
//     </>
//   );
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";

// import Register from "./pages/Register/Register";
// import Login from "./pages/Login/Login";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

// import TechniciansListPage from "./pages/TechniciansListPage/TechniciansListPage";
// import TechnicianDetailPage from "./pages/TechnicianDetailPage/TechnicianDetailPage";
// import CentersListPage from "./pages/CentersListPage/CentersListPage";
// // import CenterDetailPage from ".Pages/CenterDetailPage/CenterDetailPage";
// import CenterDetailPage from "./pages/CenterDetailPage/CenterDetailPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <TechniciansListPage />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />,
//   },
//   {
//     path: "/technicians",
//     element: <TechniciansListPage />,
//   },
//   {
//     path: "/technicians/:id",
//     element: <TechnicianDetailPage />,
//   },
//   {
//     path: "/centers",
//     element: <CentersListPage />,
//   },
//   {
//     path: "/centers/:id",
//     element: <CenterDetailPage />,
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

// Pages
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import TechniciansListPage from "./pages/TechniciansListPage/TechniciansListPage";
import TechnicianDetailPage from "./pages/TechnicianDetailPage/TechnicianDetailPage";

import CentersListPage from "./pages/CentersListPage/CentersListPage";
import CenterDetailPage from "./pages/CenterDetailPage/CenterDetailPage";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./components/Home/Home";
import Services from "./components/Services/Services";
import TechniciansSection from "./components/TechniciansSection/TechniciansSection";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import WhyIFix from "./components/WhyIFix/WhyIFix";
import AppDownload from "./components/AppDownload/AppDownload";

import StoreHero from "./components/IfixStor/StoreHero";

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
        element: <TechniciansListPage />,
      },
      {
        path: "/technicians/:id",
        element: <TechnicianDetailPage />,
      },

      // Centers
      {
        path: "/centers",
        element: <CentersListPage />,
      },
      {
        path: "/centers/:id",
        element: <CenterDetailPage />,
      },

      // Services
      {
        path: "/services/electricity",
        element: <div>الكهرباء</div>,
      },
      {
        path: "/services/plumbing",
        element: <div>السباكة</div>,
      },
      {
        path: "/services/carpentry",
        element: <div>النجار</div>,
      },
      {
        path: "/services/painting",
        element: <div>أعمال الدهان</div>,
      },
      {
        path: "/services/appliances",
        element: <div>الأجهزة المنزلية</div>,
      },
      {
        path: "/services/pest-control",
        element: <div>مكافحة الحشرات</div>,
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
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
