import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilterBar from "../../components/FilterBar/FilterBar";
import CenterCard from "../../components/CenterCard/CenterCard";
import { serviceCenters } from "../../data/mockData";
import styles from "./CentersListPage.module.css";

const CentersListPage = () => {
  return (
    <div className={styles.page}>
      <Navbar />

      <div className={`ifix-container ${styles.content}`}>
        <div className={styles.breadcrumb}>
          <Link to="/">الرئيسية</Link> / <span>المراكز</span>
        </div>

        <FilterBar mode="centers" resultsCount={serviceCenters.length} />

        <div className={styles.grid}>
          {serviceCenters.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CentersListPage;
