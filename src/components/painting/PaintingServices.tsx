import "./PaintingServices.css";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import vectorY from "../../assets/SVG/Vector-Y.svg";
import technicianImage from "../../assets/images/Ellipse 82.png";
import arrowIcon from "../../assets/SVG/Frame-Arrow.svg";

type Technician = {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  experience: number;
  price: number;
};

type FilterType = "type" | "sort" | "rating" | "price" | "city" | "district";

type ActiveFilters = {
  type: string | null;
  sort: string | null;
  rating: string | null;
  price: string | null;
  city: string | null;
  district: string | null;
};

const technicians: Technician[] = [
  {
    id: 1,
    name: "محمد أحمد",
    specialty: "فني دهانات وتشطيبات",
    image: technicianImage,
    rating: 4.9,
    reviews: 10,
    experience: 12,
    price: 200,
  },
  {
    id: 2,
    name: "أحمد محمد",
    specialty: "فني دهانات وتشطيبات",
    image: technicianImage,
    rating: 4.8,
    reviews: 14,
    experience: 10,
    price: 250,
  },
  {
    id: 3,
    name: "محمود علي",
    specialty: "فني دهانات وتشطيبات",
    image: technicianImage,
    rating: 4.7,
    reviews: 18,
    experience: 9,
    price: 220,
  },
  {
    id: 4,
    name: "عمر حسن",
    specialty: "فني دهانات وتشطيبات",
    image: technicianImage,
    rating: 4.9,
    reviews: 22,
    experience: 14,
    price: 300,
  },
  {
    id: 5,
    name: "إبراهيم سامي",
    specialty: "فني دهانات وتشطيبات",
    image: technicianImage,
    rating: 4.6,
    reviews: 9,
    experience: 8,
    price: 180,
  },
  {
    id: 6,
    name: "محمد حسن",
    specialty: "فني دهانات وتشطيبات",
    image: technicianImage,
    rating: 4.8,
    reviews: 16,
    experience: 11,
    price: 270,
  },
  {
    id: 7,
    name: "يوسف أحمد",
    specialty: "فني دهانات وتشطيبات",
    image: technicianImage,
    rating: 4.9,
    reviews: 25,
    experience: 15,
    price: 350,
  },
  {
    id: 8,
    name: "علي محمود",
    specialty: "فني دهانات وتشطيبات",
    image: technicianImage,
    rating: 4.7,
    reviews: 12,
    experience: 7,
    price: 210,
  },
];

const initialFilters: ActiveFilters = {
  type: null,
  sort: null,
  rating: null,
  price: null,
  city: null,
  district: null,
};

const PaintingServices = () => {
  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(initialFilters);

  /* =====================================================
     FILTER TOGGLE
  ===================================================== */

  const toggleFilter = (filter: FilterType) => {
    setOpenFilter((current) => (current === filter ? null : filter));
  };

  /* =====================================================
     SELECT FILTER
  ===================================================== */

  const selectFilter = (filter: FilterType, value: string) => {
    setActiveFilters((current) => ({
      ...current,
      [filter]: value,
    }));

    setOpenFilter(null);
  };

  /* =====================================================
     REMOVE FILTER
  ===================================================== */

  const removeFilter = (filter: FilterType) => {
    setActiveFilters((current) => ({
      ...current,
      [filter]: null,
    }));
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setActiveFilters({ ...initialFilters });
    setOpenFilter(null);
  };

  /* =====================================================
     FILTER VALUE
  ===================================================== */

  const getFilterValue = (filter: FilterType) => {
    return activeFilters[filter];
  };

  /* =====================================================
     FILTERED TECHNICIANS
  ===================================================== */

  const filteredTechnicians = useMemo(() => {
    let result = [...technicians];

    /* TYPE */

    if (activeFilters.type === "مراكز صيانة") {
      result = [];
    }

    /* RATING */

    if (activeFilters.rating === "5 نجوم") {
      result = result.filter((technician) => technician.rating >= 5);
    }

    if (activeFilters.rating === "4 نجوم فأكثر") {
      result = result.filter((technician) => technician.rating >= 4);
    }

    if (activeFilters.rating === "3 نجوم فأكثر") {
      result = result.filter((technician) => technician.rating >= 3);
    }

    /* PRICE */

    if (activeFilters.price === "أقل من 200 جنيه") {
      result = result.filter((technician) => technician.price < 200);
    }

    if (activeFilters.price === "200 - 500 جنيه") {
      result = result.filter(
        (technician) => technician.price >= 200 && technician.price <= 500,
      );
    }

    if (activeFilters.price === "أكثر من 500 جنيه") {
      result = result.filter((technician) => technician.price > 500);
    }

    /* SORT */

    if (activeFilters.sort === "الأعلى تقييماً") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (activeFilters.sort === "الأقل سعراً") {
      result.sort((a, b) => a.price - b.price);
    }

    if (activeFilters.sort === "الأعلى سعراً") {
      result.sort((a, b) => b.price - a.price);
    }

    /*
      المدينة والحي مش مربوطين ببيانات الفنيين حالياً،
      لذلك لا نعمل فلترة عليهم لحد ما نضيف
      city / district داخل Technician.
    */

    return result;
  }, [activeFilters]);

  /* =====================================================
     LABELS
  ===================================================== */

  const labels: Record<FilterType, string> = {
    type: "النوع",
    sort: "الترتيب",
    rating: "التقييم",
    price: "السعر",
    city: "المدينة",
    district: "الحي",
  };

  return (
    <main className="painting-page" dir="rtl">
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="painting-breadcrumb">
        <Link to="/" className="painting-breadcrumb-current">
          الرئيسية
        </Link>

        <span className="painting-breadcrumb-separator">/</span>

        <span className="painting-breadcrumb-active">أعمال الدهان</span>
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="painting-hero">
        <div className="painting-hero-pattern">
          <div className="painting-hero-content">
            <div className="painting-title-wrapper">
              <h1>أعمال الدهان</h1>

              <span className="painting-arrow">
                <img src={vectorY} alt="" />
              </span>
            </div>

            <p>
              احصل على خدمات دهان وتشطيبات احترافية بسهولة مع فنيين
              <br />
              متخصصين وموثوقين
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNICIANS
      ===================================================== */}

      <section className="painting-technicians">
        <div className="painting-technicians-container">
          {/* HEADER */}

          <div className="painting-technicians-header">
            <h2>اختر الفني او المركز المناسب</h2>

            <p>اختر من بين الفنيين و المراكز المعتمدة بالقرب منك</p>
          </div>

          {/* =====================================================
              FILTERS
          ===================================================== */}

          <div className="painting-filters">
            {/* TYPE */}

            <div className="painting-filter-wrapper">
              <div className="painting-filter-box">
                <button
                  type="button"
                  className="painting-filter"
                  onClick={() => toggleFilter("type")}
                  aria-expanded={openFilter === "type"}
                >
                  <span>{getFilterValue("type") || "النوع"}</span>

                  <span
                    className={
                      openFilter === "type" ? "painting-arrow-open" : ""
                    }
                  >
                    <img src={arrowIcon} alt="" />
                  </span>
                </button>

                {openFilter === "type" && (
                  <div className="painting-filter-dropdown">
                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("type", "فنيين")}
                    >
                      فنيين
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("type", "مراكز صيانة")}
                    >
                      مراكز صيانة
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SORT */}

            <div className="painting-filter-wrapper">
              <div className="painting-filter-box">
                <button
                  type="button"
                  className="painting-filter"
                  onClick={() => toggleFilter("sort")}
                  aria-expanded={openFilter === "sort"}
                >
                  <span>{getFilterValue("sort") || "ترتيب حسب"}</span>

                  <span
                    className={
                      openFilter === "sort" ? "painting-arrow-open" : ""
                    }
                  >
                    <img src={arrowIcon} alt="" />
                  </span>
                </button>

                {openFilter === "sort" && (
                  <div className="painting-filter-dropdown">
                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("sort", "الأعلى تقييماً")}
                    >
                      الأعلى تقييماً
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("sort", "الأقل سعراً")}
                    >
                      الأقل سعراً
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("sort", "الأعلى سعراً")}
                    >
                      الأعلى سعراً
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RATING */}

            <div className="painting-filter-wrapper">
              <div className="painting-filter-box">
                <button
                  type="button"
                  className="painting-filter"
                  onClick={() => toggleFilter("rating")}
                  aria-expanded={openFilter === "rating"}
                >
                  <span>{getFilterValue("rating") || "التقييم"}</span>

                  <span
                    className={
                      openFilter === "rating" ? "painting-arrow-open" : ""
                    }
                  >
                    <img src={arrowIcon} alt="" />
                  </span>
                </button>

                {openFilter === "rating" && (
                  <div className="painting-filter-dropdown">
                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("rating", "5 نجوم")}
                    >
                      5 نجوم
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("rating", "4 نجوم فأكثر")}
                    >
                      4 نجوم فأكثر
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("rating", "3 نجوم فأكثر")}
                    >
                      3 نجوم فأكثر
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* PRICE */}

            <div className="painting-filter-wrapper">
              <div className="painting-filter-box">
                <button
                  type="button"
                  className="painting-filter"
                  onClick={() => toggleFilter("price")}
                  aria-expanded={openFilter === "price"}
                >
                  <span>{getFilterValue("price") || "السعر"}</span>

                  <span
                    className={
                      openFilter === "price" ? "painting-arrow-open" : ""
                    }
                  >
                    <img src={arrowIcon} alt="" />
                  </span>
                </button>

                {openFilter === "price" && (
                  <div className="painting-filter-dropdown">
                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("price", "أقل من 200 جنيه")}
                    >
                      أقل من 200 جنيه
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("price", "200 - 500 جنيه")}
                    >
                      200 - 500 جنيه
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("price", "أكثر من 500 جنيه")}
                    >
                      أكثر من 500 جنيه
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* CITY */}

            <div className="painting-filter-wrapper">
              <div className="painting-filter-box">
                <button
                  type="button"
                  className="painting-filter"
                  onClick={() => toggleFilter("city")}
                  aria-expanded={openFilter === "city"}
                >
                  <span>{getFilterValue("city") || "المدينة"}</span>

                  <span
                    className={
                      openFilter === "city" ? "painting-arrow-open" : ""
                    }
                  >
                    <img src={arrowIcon} alt="" />
                  </span>
                </button>

                {openFilter === "city" && (
                  <div className="painting-filter-dropdown">
                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("city", "الجيزة")}
                    >
                      الجيزة
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("city", "القاهرة")}
                    >
                      القاهرة
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("city", "6 أكتوبر")}
                    >
                      6 أكتوبر
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* DISTRICT */}

            <div className="painting-filter-wrapper">
              <div className="painting-filter-box">
                <button
                  type="button"
                  className="painting-filter"
                  onClick={() => toggleFilter("district")}
                  aria-expanded={openFilter === "district"}
                >
                  <span>{getFilterValue("district") || "الحي"}</span>

                  <span
                    className={
                      openFilter === "district" ? "painting-arrow-open" : ""
                    }
                  >
                    <img src={arrowIcon} alt="" />
                  </span>
                </button>

                {openFilter === "district" && (
                  <div className="painting-filter-dropdown">
                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("district", "الدقي")}
                    >
                      الدقي
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("district", "المهندسين")}
                    >
                      المهندسين
                    </button>

                    <button
                      type="button"
                      className="painting-filter-option"
                      onClick={() => selectFilter("district", "العجوزة")}
                    >
                      العجوزة
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =====================================================
              ACTIVE FILTERS
          ===================================================== */}

          <div className="painting-active-filters">
            {(
              Object.entries(activeFilters) as [FilterType, string | null][]
            ).map(([filter, value]) => {
              if (!value) return null;

              return (
                <span className="painting-filter-label" key={filter}>
                  <span>{labels[filter]}:</span>

                  <strong>{value}</strong>

                  <button
                    type="button"
                    aria-label={`إزالة فلتر ${labels[filter]}`}
                    onClick={() => removeFilter(filter)}
                  >
                    ×
                  </button>
                </span>
              );
            })}

            {Object.values(activeFilters).some(Boolean) && (
              <button
                type="button"
                className="painting-clear-filters"
                onClick={clearFilters}
              >
                إزالة جميع الفلاتر
              </button>
            )}
          </div>

          {/* =====================================================
              RESULTS HEADER
          ===================================================== */}

          <div className="painting-results-header">
            عدد النتائج <strong>{filteredTechnicians.length}</strong>
          </div>

          {/* =====================================================
              EMPTY STATE / TECHNICIANS GRID
          ===================================================== */}

          {filteredTechnicians.length === 0 ? (
            <div className="painting-empty-state">
                <h3>لا يوجد فنيون مطابقون</h3>

                <p>
                  لم نجد فنيين مطابقين للفلاتر التي اخترتها.
                  <br />
                  جرّب تغيير الفلاتر أو مسحها.
                </p>

                <button
                  type="button"
                  className="plumbing-empty-button"
                  onClick={clearFilters}
                >
                  مسح الفلاتر
              </button>
            </div>
          ) : (
            <div className="painting-technicians-grid">
              {filteredTechnicians.map((technician) => (
                <article
                  className="painting-technician-card"
                  key={technician.id}
                >
                  {/* TOP */}

                  <div className="painting-card-top">
                    <div className="painting-technician-info">
                      <div className="painting-image-wrapper">
                        <img src={technician.image} alt={technician.name} />

                        <span className="painting-online-dot" />
                      </div>

                      <div className="painting-technician-text">
                        <h3>{technician.name}</h3>

                        <p>{technician.specialty}</p>

                        <div className="painting-technician-meta">
                          <span>⚒ +120 عملية إصلاح</span>

                          <span>◉ {technician.experience} سنة خبرة</span>
                        </div>
                      </div>
                    </div>

                    {/* RATING */}

                    <div className="painting-rating">
                      <span>{technician.rating}</span>

                      <span className="painting-star">★</span>
                    </div>
                  </div>

                  {/* DIVIDER */}

                  <div className="painting-card-divider" />

                  {/* BOTTOM */}

                  <div className="painting-card-bottom">
                    <div className="painting-price">
                      <span className="painting-price-label">يبدأ من</span>

                      <span className="painting-price-value">
                        {technician.price}
                      </span>

                      <span className="painting-price-currency">جنيه</span>
                    </div>

                    <div className="painting-technician-buttons">
                      <Link
                        to={`/technicians/${technician.id}`}
                        className="painting-profile-btn"
                      >
                        الملف الشخصي
                      </Link>

                      <Link
                        to={`/booking/${technician.id}`}
                        className="painting-book-btn"
                      >
                        احجز الآن
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PaintingServices;
