import { useNavigate } from "react-router-dom";
import type { Technician } from "../../data/mockData";
import RatingStars from "../RatingStars/RatingStars";
import styles from "./TechnicianCard.module.css";

interface TechnicianCardProps {
  technician: Technician;
}

const TechnicianCard = ({ technician }: TechnicianCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.info}>
          <RatingStars rating={technician.rating} />
          <span className={styles.name}>{technician.name}</span>
          <span className={styles.specialty}>{technician.specialty}</span>
        </div>
        <img
          src={technician.avatar}
          alt={technician.name}
          className={styles.avatar}
        />
      </div>

      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          📍 {technician.distanceKm} كم
        </span>
        {technician.verified && (
          <span className={`${styles.metaItem} ${styles.verifiedBadge}`}>
            ✔ موثق
          </span>
        )}
      </div>

      <div className={styles.priceRow}>
        يبدأ من <span className={styles.price}>{technician.priceFrom} جنيه</span>
      </div>

      <div className={styles.btnRow}>
        <button className={styles.btnBook}>احجز الان</button>
        <button
          className={styles.btnProfile}
          onClick={() => navigate(`/technicians/${technician.id}`)}
        >
          الملف الشخصي
        </button>
      </div>
    </div>
  );
};

export default TechnicianCard;
