import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/image 3.png";
import styles from "./Navbar.module.css";

const links = [
  { label: "الرئيسية", to: "/" },
  { label: "الخدمات", to: "#" },
  { label: "كن شريكنا", to: "#" },
  { label: "المتجر", to: "#" },
  { label: "تواصل معنا", to: "#" },
  { label: "الفنيين والمراكز", to: "/technicians" },
];

// يظهر هذا الرابط كمفعّل في صفحتي الفنيين والمراكز معًا
// لأن التنقل بينهما أصبح متاحًا من خلال قائمة "النوع" المنسدلة
const activatablePrefixes = ["/technicians", "/centers"];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={`ifix-container ${styles.inner}`}>
        <div className={styles.actions}>
          <button className={styles.btnFilled}>تسجيل دخول</button>
          <button className={styles.btnOutline}>انشاء حساب</button>
        </div>

        <ul className={styles.nav}>
          {links.map((link) => {
            const isActive =
              link.to === "/technicians" &&
              activatablePrefixes.some((prefix) =>
                location.pathname.startsWith(prefix)
              );
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`${styles.navLink} ${
                    isActive ? styles.navLinkActive : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link to="/" className={styles.logo}>
          <img src={logo} alt="iFix" className={styles.logoImg} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
