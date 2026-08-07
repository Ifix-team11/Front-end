import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TechniciansListPage from "./pages/TechniciansListPage/TechniciansListPage";
import CentersListPage from "./pages/CentersListPage/CentersListPage";
import TechnicianDetailPage from "./pages/TechnicianDetailPage/TechnicianDetailPage";
import CenterDetailPage from "./pages/CenterDetailPage/CenterDetailPage";
import Register from '../src/Components/Register/Register'
import Login from '../src/Components/Login/Login'
import ForgotPassword from '../src/Components/ForgotPassword/ForgotPassword'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
 let router = createBrowserRouter([
    {path:'register' ,element : <Register/>},
    {path :'login' ,element :<Login/>},
    {path :'forgot-password' ,element :<ForgotPassword/>},
  ])
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/technicians" replace />} />
        <Route path="/technicians" element={<TechniciansListPage />} />
        <Route path="/technicians/:id" element={<TechnicianDetailPage />} />
        <Route path="/centers" element={<CentersListPage />} />
        <Route path="/centers/:id" element={<CenterDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
 

  return (
    <>  
<RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App;
