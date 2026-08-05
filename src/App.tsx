import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TechniciansListPage from "./pages/TechniciansListPage/TechniciansListPage";
import CentersListPage from "./pages/CentersListPage/CentersListPage";
import TechnicianDetailPage from "./pages/TechnicianDetailPage/TechnicianDetailPage";
import CenterDetailPage from "./pages/CenterDetailPage/CenterDetailPage";

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
}

export default App;
