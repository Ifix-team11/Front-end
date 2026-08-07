import { useNavigate } from "react-router-dom";
import type { ServiceCenter } from "../../data/mockData";
import RatingStars from "../RatingStars/RatingStars";
import styles from "./CenterCard.module.css";

interface CenterCardProps {
  center: ServiceCenter;
}

const CenterCard = ({ center }: CenterCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.banner}>{center.logo}</div>

      <div className={styles.body}>
        <div className={styles.info}>
          <RatingStars rating={center.rating} />
          <span className={styles.name}>{center.name}</span>
          <span className={styles.specialty}>{center.specialty}</span>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>📍 {center.distanceKm} كم</span>
          <span className={styles.metaItem}>👥 {center.clientsCount} عميل</span>
          {center.verified && (
            <span className={`${styles.metaItem} ${styles.verifiedBadge}`}>
              ✔ موثق
            </span>
          )}
        </div>

        <div className={styles.priceRow}>
          يبدأ من <span className={styles.price}>{center.priceFrom} جنيه</span>
        </div>

        <div className={styles.btnRow}>
          <button className={styles.btnBook}>احجز الان</button>
          <button
            className={styles.btnProfile}
            onClick={() => navigate(`/centers/${center.id}`)}
          >
            الملف الشخصي
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenterCard;
