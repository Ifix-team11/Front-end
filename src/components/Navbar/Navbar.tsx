import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";
import Button from "../Button/Button";

import logo from "../../assets/SVG/image 3.svg";
import arrowIcon from "../../assets/SVG/Frame-Arrow.svg";
import cableIcon from "../../assets/SVG/Frame-Cable.svg";
import sinkIcon from "../../assets/SVG/Frame-Sink.svg";
import hammerIcon from "../../assets/SVG/Frame-Hammer.svg";
import paintBrushIcon from "../../assets/SVG/Frame-PrintBrush.svg";
import washingMachineIcon from "../../assets/SVG/Frame-WashingMachein.svg";
import bugIcon from "../../assets/SVG/Frame-Bug.svg";

function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  let navigator = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="IFIX" />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto me-auto nav-links">
            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                الرئيسية
              </Link>
            </li>

            {/* Services */}
            <li className="nav-item services-dropdown">
              <button
                type="button"
                className="nav-link services-dropdown-toggle"
                onClick={() => setServicesOpen((prev) => !prev)}
              >
                <span>الخدمات</span>

                <span
                  className={`dropdown-arrow ${
                    servicesOpen ? "open" : ""
                  }`}
                >
                  <img src={arrowIcon} alt="" />
                </span>
              </button>

              {servicesOpen && (
                <div className="services-dropdown-menu">
                  {/* Electricity */}
                  <Link
                    to="/services/electricity"
                    className="service-dropdown-item"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="service-icon">
                      <img src={cableIcon} alt="" />
                    </span>
                    <span>الكهرباء</span>
                  </Link>

                  {/* Plumbing */}
                  <Link
                    to="/services/plumbing"
                    className="service-dropdown-item"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="service-icon">
                      <img src={sinkIcon} alt="" />
                    </span>
                    <span>السباكة</span>
                  </Link>

                  {/* Carpentry */}
                  <Link
                    to="/services/carpentry"
                    className="service-dropdown-item"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="service-icon">
                      <img src={hammerIcon} alt="" />
                    </span>
                    <span>النجار</span>
                  </Link>

                  {/* Painting */}
                  <Link
                    to="/services/painting"
                    className="service-dropdown-item"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="service-icon">
                      <img src={paintBrushIcon} alt="" />
                    </span>
                    <span>أعمال الدهان</span>
                  </Link>

                  {/* Appliances */}
                  <Link
                    to="/services/appliances"
                    className="service-dropdown-item"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="service-icon">
                      <img src={washingMachineIcon} alt="" />
                    </span>
                    <span>الأجهزة المنزلية</span>
                  </Link>

                  {/* Pest Control */}
                  <Link
                    to="/services/pest-control"
                    className="service-dropdown-item"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="service-icon">
                      <img src={bugIcon} alt="" />
                    </span>
                    <span>مكافحة الحشرات</span>
                  </Link>
                </div>
              )}
            </li>

            {/* Technicians */}
            <li className="nav-item">
              <Link className="nav-link" to="/technicians">
                الفنيين والمراكز
              </Link>
            </li>

            {/* Partners */}
            <li className="nav-item">
              <Link className="nav-link" to="/partners">
                كن شريكنا
              </Link>
            </li>

            {/* Store */}
            <li className="nav-item">
              <Link className="nav-link" to="/store">
                المتجر
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                تواصل معنا
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            <Button text="تسجيل دخول" variant="primary" onClick={()=> navigator('/login')}/>
            <Button text="إنشاء حساب" variant="secondary" onClick={()=> navigator('/register')} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
// import { Link, useLocation } from "react-router-dom";
// import logo from "../../assets/image 3.png";
// import styles from "./Navbar.module.css";

// const links = [
//   { label: "الرئيسية", to: "/" },
//   { label: "الخدمات", to: "#" },
//   { label: "كن شريكنا", to: "#" },
//   { label: "المتجر", to: "#" },
//   { label: "تواصل معنا", to: "#" },
//   { label: "الفنيين والمراكز", to: "/technicians" },
// ];

// // يظهر هذا الرابط كمفعّل في صفحتي الفنيين والمراكز معًا
// // لأن التنقل بينهما أصبح متاحًا من خلال قائمة "النوع" المنسدلة
// const activatablePrefixes = ["/technicians", "/centers"];

// const Navbar = () => {
//   const location = useLocation();

//   return (
//     <header className={styles.header}>
//       <div className={`ifix-container ${styles.inner}`}>
//         <div className={styles.actions}>
//           <button className={styles.btnFilled}>تسجيل دخول</button>
//           <button className={styles.btnOutline}>انشاء حساب</button>
//         </div>

//         <ul className={styles.nav}>
//           {links.map((link) => {
//             const isActive =
//               link.to === "/technicians" &&
//               activatablePrefixes.some((prefix) =>
//                 location.pathname.startsWith(prefix)
//               );
//             return (
//               <li key={link.label}>
//                 <Link
//                   to={link.to}
//                   className={`${styles.navLink} ${
//                     isActive ? styles.navLinkActive : ""
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         <Link to="/" className={styles.logo}>
//           <img src={logo} alt="iFix" className={styles.logoImg} />
//         </Link>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
