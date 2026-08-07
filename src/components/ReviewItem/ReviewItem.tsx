import type { Review } from "../../data/mockData";
import styles from "./ReviewItem.module.css";

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <div className={styles.item}>
      <img src={review.authorAvatar} alt={review.authorName} className={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.headRow}>
          <span className={styles.author}>{review.authorName}</span>
          <span className={styles.date}>{review.date}</span>
        </div>
        <p className={styles.comment}>{review.comment}</p>
        <div className={styles.stars}>
          {"★".repeat(Math.round(review.rating))}
          {"☆".repeat(5 - Math.round(review.rating))}
          <span style={{ color: "var(--ifix-text-muted)", fontSize: 11 }}>
            {" "}
            {review.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
