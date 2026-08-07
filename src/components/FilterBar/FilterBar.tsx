import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
  mode: "technicians" | "centers";
  resultsCount: number;
}

const typeOptions = ["فنيين", "مراكز صيانة"];
const genderOptions = ["الكل", "ذكر", "انثى"];
const cityOptions = ["القاهرة", "الجيزة", "الاسكندرية", "الدقهلية", "اسوان"];
const categoryOptions = [
  "أجهزة منزلية",
  "تكييفات",
  "سباكة",
  "كهرباء",
  "نجارة",
];
const sortOptions = [
  "الأعلى تقييمًا",
  "الأقرب اليك",
  "الأقل سعرًا",
  "الأحدث",
];
const nearOptions = [
  "موقعي الحالي",
  "القاهرة الجديدة",
  "المعادي",
  "مدينة نصر",
  "الشيخ زايد",
];

const FilterBar = ({ mode, resultsCount }: FilterBarProps) => {
  const navigate = useNavigate();

  const [gender, setGender] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const [near, setNear] = useState<string | null>(null);

  const typeValue = mode === "technicians" ? "فنيين" : "مراكز صيانة";

  const handleTypeChange = (value: string) => {
    navigate(value === "فنيين" ? "/technicians" : "/centers");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>اختر الفني او المركز المناسب</h1>
      <p className={styles.subtitle}>
        اختر من بين الفنيين و المراكز المعتمدة بالقرب منك
      </p>

      <div className={styles.pillsRow}>
        <Dropdown
          label="النوع"
          options={typeOptions}
          value={typeValue}
          onChange={handleTypeChange}
        />
        <Dropdown
          label="الجنسية"
          options={genderOptions}
          value={gender}
          onChange={setGender}
        />
        <Dropdown
          label="المدينة"
          options={cityOptions}
          value={city}
          onChange={setCity}
        />
        <Dropdown
          label="القسم"
          options={categoryOptions}
          value={category}
          onChange={setCategory}
        />
        <Dropdown
          label="ترتيب حسب"
          options={sortOptions}
          value={sort}
          onChange={setSort}
        />
        <Dropdown
          label="اقرب الي"
          options={nearOptions}
          value={near}
          onChange={setNear}
        />
      </div>

      <div className={styles.resultsRow}>
        <span className={styles.resultsCount}>عدد النتائج ({resultsCount})</span>

        <div className={styles.rightControls}>
          <div className={styles.statGroup}>
            <span>الخبرة</span>
            <span className={styles.statValue}>٤.٩</span>
          </div>
          <div className={styles.statGroup}>
            <span>المسافة الافتراضية</span>
            <span className={styles.statValue}>٤.٩</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
