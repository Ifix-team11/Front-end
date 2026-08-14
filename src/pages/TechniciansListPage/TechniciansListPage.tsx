import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilterBar from "../../components/FilterBar/FilterBar";
import TechnicianCard from "../../components/TechnicianCard/TechnicianCard";
import { technicians } from "../../data/mockData";
import styles from "./TechniciansListPage.module.css";

const TechniciansListPage = () => {
  return (
    <div className={styles.page}>
      {/* <Navbar /> */}

      <div className={`ifix-container ${styles.content}`}>
        <div className={styles.breadcrumb}>
          <Link to="/">الرئيسية</Link> / <span>الفنيين</span>
        </div>

        <FilterBar mode="technicians" resultsCount={technicians.length} />

        <div className={styles.grid}>
          {technicians.map((technician) => (
            <TechnicianCard key={technician.id} technician={technician} />
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default TechniciansListPage;
