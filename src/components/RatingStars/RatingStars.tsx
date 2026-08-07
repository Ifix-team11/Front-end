import styles from "./RatingStars.module.css";

interface RatingStarsProps {
  rating: number;
}

const RatingStars = ({ rating }: RatingStarsProps) => {
  return (
    <span className={styles.wrapper}>
      <span className={styles.value}>{rating.toFixed(1)}</span>
      <span className={styles.star}>★</span>
    </span>
  );
};

export default RatingStars;
