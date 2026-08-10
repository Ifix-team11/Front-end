import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./components/Home/Home";
import Services from "./components/Services/Services";
import TechniciansSection from "./components/TechniciansSection/TechniciansSection";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import WhyIFix from "./components/WhyIFix/WhyIFix";
import AppDownload from "./components/AppDownload/AppDownload";

import StoreHero from "./components/IfixStor/StoreHero";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Services />
              <TechniciansSection />
              <HowItWorks />
              <WhyIFix />
              <AppDownload />
            </>
          }
        />

        {/* Store */}
        <Route path="/store" element={<StoreHero />} />

        {/* Technicians */}
        <Route path="/technicians" element={<TechniciansSection />} />

        {/* Services */}
        <Route path="/services/electricity" element={<div>الكهرباء</div>} />

        <Route path="/services/plumbing" element={<div>السباكة</div>} />

        <Route path="/services/carpentry" element={<div>النجار</div>} />

        <Route path="/services/painting" element={<div>أعمال الدهان</div>} />

        <Route
          path="/services/appliances"
          element={<div>الأجهزة المنزلية</div>}
        />

        <Route
          path="/services/pest-control"
          element={<div>مكافحة الحشرات</div>}
        />

        {/* Partners */}
        <Route path="/partners" element={<div>كن شريكنا</div>} />

        {/* Contact */}
        <Route path="/contact" element={<div>تواصل معنا</div>} />

        {/* Not Found */}
        <Route path="*" element={<div>الصفحة غير موجودة</div>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
