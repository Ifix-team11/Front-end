import { useState } from "react";
import "./PlumbingServices.css";

import vectorY from "../../assets/SVG/Vector-Y.svg";
import arrowIcon from "../../assets/SVG/Frame-Arrow.svg";
import technicianImage from "../../assets/images/Ellipse 82.png";

type FilterType = "type" | "sort" | "rating" | "price" | "city" | "district";

type Technician = {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  experience: number;
  price: number;
  repairs: number;
  distance: number;
};

type ActiveFilter = {
  type: FilterType;
  label: string;
  value: string;
};

/* =====================================================
   TECHNICIANS DATA
===================================================== */

const technicians: Technician[] = [
  {
    id: 1,
    name: "محمد أحمد",
    specialty: "فني سباكة",
    image: technicianImage,
    rating: 4.9,
    reviews: 10,
    experience: 12,
    price: 200,
    repairs: 120,
    distance: 2,
  },
  {
    id: 2,
    name: "أحمد محمد",
    specialty: "فني سباكة",
    image: technicianImage,
    rating: 4.8,
    reviews: 15,
    experience: 10,
    price: 250,
    repairs: 110,
    distance: 3,
  },
  {
    id: 3,
    name: "محمود علي",
    specialty: "فني سباكة",
    image: technicianImage,
    rating: 4.7,
    reviews: 18,
    experience: 9,
    price: 180,
    repairs: 95,
    distance: 4,
  },
  {
    id: 4,
    name: "عمر حسن",
    specialty: "فني سباكة",
    image: technicianImage,
    rating: 4.9,
    reviews: 22,
    experience: 14,
    price: 300,
    repairs: 150,
    distance: 5,
  },
  {
    id: 5,
    name: "كريم خالد",
    specialty: "فني سباكة",
    image: technicianImage,
    rating: 4.6,
    reviews: 12,
    experience: 8,
    price: 220,
    repairs: 85,
    distance: 6,
  },
  {
    id: 6,
    name: "يوسف أحمد",
    specialty: "فني سباكة",
    image: technicianImage,
    rating: 4.8,
    reviews: 20,
    experience: 11,
    price: 270,
    repairs: 130,
    distance: 3,
  },
  {
    id: 7,
    name: "إبراهيم محمود",
    specialty: "فني سباكة",
    image: technicianImage,
    rating: 4.5,
    reviews: 9,
    experience: 7,
    price: 190,
    repairs: 75,
    distance: 7,
  },
  {
    id: 8,
    name: "مصطفى حسن",
    specialty: "فني سباكة",
    image: technicianImage,
    rating: 4.9,
    reviews: 25,
    experience: 15,
    price: 350,
    repairs: 170,
    distance: 4,
  },
];

/* =====================================================
   FILTER OPTIONS
===================================================== */

const filterOptions: Record<FilterType, { label: string; options: string[] }> =
  {
    type: {
      label: "النوع",
      options: ["فنيين", "مراكز صيانة"],
    },

    sort: {
      label: "ترتيب حسب",
      options: ["الأعلى تقييماً", "الأقل سعراً", "الأعلى سعراً"],
    },

    rating: {
      label: "التقييم",
      options: ["5 نجوم", "4 نجوم فأكثر", "3 نجوم فأكثر"],
    },

    price: {
      label: "السعر",
      options: ["أقل من 200 جنيه", "200 - 500 جنيه", "أكثر من 500 جنيه"],
    },

    city: {
      label: "المدينة",
      options: ["الجيزة", "القاهرة", "6 أكتوبر"],
    },

    district: {
      label: "الحي",
      options: ["الدقي", "المهندسين", "العجوزة"],
    },
  };

/* =====================================================
   COMPONENT
===================================================== */

const PlumbingServices = () => {
  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([
    {
      type: "type",
      label: "النوع",
      value: "فنيين",
    },
    {
      type: "rating",
      label: "التقييم",
      value: "4.9 ⭐",
    },
    {
      type: "city",
      label: "المدينة",
      value: "الجيزة",
    },
  ]);

  /* =====================================================
     FILTER TOGGLE
  ===================================================== */

  const toggleFilter = (filter: FilterType) => {
    setOpenFilter((current) => (current === filter ? null : filter));
  };

  /* =====================================================
     SELECT FILTER
  ===================================================== */

  const handleFilterSelect = (filterType: FilterType, value: string) => {
    const filter = filterOptions[filterType];

    setActiveFilters((current) => {
      const withoutCurrent = current.filter((item) => item.type !== filterType);

      return [
        ...withoutCurrent,
        {
          type: filterType,
          label: filter.label,
          value,
        },
      ];
    });

    setOpenFilter(null);
  };

  /* =====================================================
     REMOVE FILTER
  ===================================================== */

  const removeFilter = (filterType: FilterType) => {
    setActiveFilters((current) =>
      current.filter((item) => item.type !== filterType),
    );
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setActiveFilters([]);
    setOpenFilter(null);
  };

  /* =====================================================
     FILTERED TECHNICIANS
  ===================================================== */

  const filteredTechnicians = technicians
    .filter((technician) => {
      const ratingFilter = activeFilters.find(
        (filter) => filter.type === "rating",
      );

      const priceFilter = activeFilters.find(
        (filter) => filter.type === "price",
      );

      /* ================= Rating ================= */

      if (ratingFilter) {
        /*
          5 نجوم
          مفيش فني عنده 5 بالضبط
          وبالتالي سيظهر Empty State
        */

        if (ratingFilter.value === "5 نجوم" && technician.rating < 5) {
          return false;
        }

        if (ratingFilter.value === "4 نجوم فأكثر" && technician.rating < 4) {
          return false;
        }

        if (ratingFilter.value === "3 نجوم فأكثر" && technician.rating < 3) {
          return false;
        }
      }

      /* ================= Price ================= */

      if (priceFilter) {
        if (
          priceFilter.value === "أقل من 200 جنيه" &&
          technician.price >= 200
        ) {
          return false;
        }

        if (
          priceFilter.value === "200 - 500 جنيه" &&
          (technician.price < 200 || technician.price > 500)
        ) {
          return false;
        }

        if (
          priceFilter.value === "أكثر من 500 جنيه" &&
          technician.price <= 500
        ) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      const sortFilter = activeFilters.find((filter) => filter.type === "sort");

      if (!sortFilter) {
        return 0;
      }

      /* الأعلى تقييماً */

      if (sortFilter.value === "الأعلى تقييماً") {
        return b.rating - a.rating;
      }

      /* الأقل سعراً */

      if (sortFilter.value === "الأقل سعراً") {
        return a.price - b.price;
      }

      /* الأعلى سعراً */

      if (sortFilter.value === "الأعلى سعراً") {
        return b.price - a.price;
      }

      return 0;
    });

  /* =====================================================
     PROFILE
  ===================================================== */

  const handleProfile = (technician: Technician) => {
    console.log("فتح الملف الشخصي للفني:", technician);
  };

  /* =====================================================
     BOOKING
  ===================================================== */

  const handleBooking = (technician: Technician) => {
    console.log("حجز الفني:", technician);

    // جاهز لاحقاً للـ API
    // navigate(`/booking/${technician.id}`);
  };

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <main className="plumbing-page" dir="rtl">
      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div className="plumbing-breadcrumb">
        <span className="plumbing-breadcrumb-current">الرئيسية</span>

        <span className="plumbing-breadcrumb-separator">/</span>

        <span className="plumbing-breadcrumb-active">السباكة</span>
      </div>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="plumbing-hero">
        <div className="plumbing-hero-pattern">
          <div className="plumbing-hero-content">
            <div className="plumbing-title-wrapper">
              <h1>خدمات السباكة</h1>

              <span className="plumbing-arrow">
                <img src={vectorY} alt="" />
              </span>
            </div>

            <p>
              حل جميع أعطال السباكة وتركيباتها بسهولة مع فنيين
              <br />
              ومراكز صيانة موثوقة
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          TECHNICIANS SECTION
      ================================================= */}

      <section className="plumbing-technicians">
        <div className="plumbing-technicians-container">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="plumbing-technicians-header">
            <h2>اختر الفني او المركز المناسب</h2>

            <p>اختر من بين الفنيين و المراكز المعتمدة بالقرب منك</p>
          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="plumbing-filters">
            {(Object.keys(filterOptions) as FilterType[]).map((filterType) => {
              const filter = filterOptions[filterType];

              const selectedFilter = activeFilters.find(
                (item) => item.type === filterType,
              );

              const isOpen = openFilter === filterType;

              return (
                <div className="plumbing-filter-wrapper" key={filterType}>
                  <div className="plumbing-filter-box">
                    <button
                      type="button"
                      className="plumbing-filter"
                      onClick={() => toggleFilter(filterType)}
                      aria-expanded={isOpen}
                    >
                      <span>{selectedFilter?.value ?? filter.label}</span>

                      <span className={isOpen ? "plumbing-arrow-open" : ""}>
                        <img src={arrowIcon} alt="" />
                      </span>
                    </button>

                    {/* DROPDOWN */}

                    {isOpen && (
                      <div className="plumbing-filter-dropdown">
                        {filter.options.map((option) => (
                          <button
                            type="button"
                            key={option}
                            className={
                              selectedFilter?.value === option
                                ? "plumbing-filter-option plumbing-filter-option-selected"
                                : "plumbing-filter-option"
                            }
                            onClick={() =>
                              handleFilterSelect(filterType, option)
                            }
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* =================================================
              ACTIVE FILTERS
          ================================================= */}

          <div className="plumbing-active-filters">
            {activeFilters.map((filter) => (
              <span className="plumbing-filter-label" key={filter.type}>
                <span>{filter.label}:</span>

                <strong>{filter.value}</strong>

                <button
                  type="button"
                  onClick={() => removeFilter(filter.type)}
                  aria-label={`إزالة فلتر ${filter.label}`}
                >
                  ×
                </button>
              </span>
            ))}

            {activeFilters.length > 0 && (
              <button
                type="button"
                className="plumbing-clear-filters"
                onClick={clearFilters}
              >
                إزالة جميع الفلاتر
              </button>
            )}
          </div>

          {/* =================================================
              RESULTS HEADER
          ================================================= */}

          <div className="plumbing-results-header">
            <span>
              عدد النتائج <strong>({filteredTechnicians.length})</strong>
            </span>
          </div>

          {/* =================================================
              TECHNICIANS GRID
          ================================================= */}

          <div className="plumbing-technicians-grid">
            {filteredTechnicians.length === 0 ? (
              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div className="plumbing-empty-state">
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
              /* =================================================
                 TECHNICIAN CARDS
              ================================================= */

              filteredTechnicians.map((technician) => (
                <article
                  className="plumbing-technician-card"
                  key={technician.id}
                >
                  {/* =================================================
                        CARD TOP
                    ================================================= */}

                  <div className="plumbing-card-top">
                    {/* Technician Info */}

                    <div className="plumbing-technician-info">
                      {/* Image */}

                      <div className="plumbing-image-wrapper">
                        <img src={technician.image} alt={technician.name} />

                        <span className="plumbing-online-dot" />
                      </div>

                      {/* Text */}

                      <div className="plumbing-technician-text">
                        <h3>{technician.name}</h3>

                        <p>{technician.specialty}</p>

                        <div className="plumbing-technician-meta">
                          <span>⚒ +{technician.repairs} عملية إصلاح</span>

                          <span>◉ {technician.distance} كم</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}

                    <div className="plumbing-rating">
                      <span>{technician.rating}</span>

                      <span className="plumbing-star">★</span>
                    </div>
                  </div>

                  {/* =================================================
                        DIVIDER
                    ================================================= */}

                  <div className="plumbing-card-divider" />

                  {/* =================================================
                        CARD BOTTOM
                    ================================================= */}

                  <div className="plumbing-card-bottom">
                    {/* Price */}

                    <div className="plumbing-price">
                      <span className="plumbing-price-label">يبدأ من</span>

                      <span className="plumbing-price-value">
                        {technician.price}
                      </span>

                      <span className="plumbing-price-currency">جنيه</span>
                    </div>

                    {/* Buttons */}

                    <div className="plumbing-technician-buttons">
                      <button
                        type="button"
                        className="plumbing-profile-btn"
                        onClick={() => handleProfile(technician)}
                      >
                        الملف الشخصي
                      </button>

                      <button
                        type="button"
                        className="plumbing-book-btn"
                        onClick={() => handleBooking(technician)}
                      >
                        احجز الآن
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlumbingServices;
