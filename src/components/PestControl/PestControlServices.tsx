import "./PestControlServices.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import vectorY from "../../assets/SVG/Vector-Y.svg";
import arrowIcon from "../../assets/SVG/Frame-Arrow.svg";
import technicianImage from "../../assets/images/Ellipse 82.png";

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

type FilterType = "type" | "sort" | "rating" | "price" | "city" | "district";

type ActiveFilters = {
  type: string;
  sort: string;
  rating: string;
  price: string;
  city: string;
  district: string;
};

/* =====================================================
   TECHNICIANS
===================================================== */

const technicians: Technician[] = [
  {
    id: 1,
    name: "محمد أحمد",
    specialty: "فني مكافحة حشرات",
    image: technicianImage,
    rating: 4.9,
    reviews: 18,
    experience: 12,
    price: 200,
    repairs: 120,
    distance: 2,
  },
  {
    id: 2,
    name: "أحمد محمد",
    specialty: "متخصص مكافحة حشرات",
    image: technicianImage,
    rating: 4.8,
    reviews: 22,
    experience: 10,
    price: 250,
    repairs: 105,
    distance: 3,
  },
  {
    id: 3,
    name: "محمود علي",
    specialty: "فني مكافحة حشرات وقوارض",
    image: technicianImage,
    rating: 4.7,
    reviews: 15,
    experience: 9,
    price: 300,
    repairs: 95,
    distance: 4,
  },
  {
    id: 4,
    name: "عمر حسن",
    specialty: "متخصص رش ومكافحة حشرات",
    image: technicianImage,
    rating: 4.9,
    reviews: 25,
    experience: 14,
    price: 220,
    repairs: 140,
    distance: 2,
  },
  {
    id: 5,
    name: "كريم محمد",
    specialty: "فني مكافحة حشرات",
    image: technicianImage,
    rating: 4.6,
    reviews: 12,
    experience: 8,
    price: 180,
    repairs: 87,
    distance: 5,
  },
  {
    id: 6,
    name: "يوسف أحمد",
    specialty: "فني مكافحة حشرات وقوارض",
    image: technicianImage,
    rating: 4.8,
    reviews: 20,
    experience: 11,
    price: 270,
    repairs: 115,
    distance: 3,
  },
  {
    id: 7,
    name: "محمد حسن",
    specialty: "متخصص مكافحة حشرات",
    image: technicianImage,
    rating: 4.5,
    reviews: 9,
    experience: 7,
    price: 170,
    repairs: 80,
    distance: 6,
  },
  {
    id: 8,
    name: "علي محمود",
    specialty: "فني مكافحة ورش حشرات",
    image: technicianImage,
    rating: 4.9,
    reviews: 28,
    experience: 15,
    price: 350,
    repairs: 160,
    distance: 2,
  },
];

/* =====================================================
   INITIAL FILTERS
===================================================== */

const initialFilters: ActiveFilters = {
  type: "",
  sort: "",
  rating: "",
  price: "",
  city: "",
  district: "",
};

/* =====================================================
   FILTER OPTIONS
===================================================== */

const filterOptions: Record<FilterType, string[]> = {
  type: ["فنيين", "شركات مكافحة حشرات"],

  sort: ["الأعلى تقييماً", "الأقل سعراً", "الأعلى سعراً"],

  rating: ["5 نجوم", "4 نجوم فأكثر", "3 نجوم فأكثر"],

  price: ["أقل من 200 جنيه", "200 - 500 جنيه", "أكثر من 500 جنيه"],

  city: ["الجيزة", "القاهرة", "6 أكتوبر"],

  district: ["الدقي", "المهندسين", "العجوزة"],
};

/* =====================================================
   FILTER LABELS
===================================================== */

const filterLabels: Record<FilterType, string> = {
  type: "النوع",
  sort: "ترتيب حسب",
  rating: "التقييم",
  price: "السعر",
  city: "المدينة",
  district: "الحي",
};

/* =====================================================
   COMPONENT
===================================================== */

const PestControlServices = () => {
  const navigate = useNavigate();

  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(initialFilters);

  const [filteredTechnicians, setFilteredTechnicians] =
    useState<Technician[]>(technicians);

  /* =====================================================
     APPLY FILTERS
  ===================================================== */

  const applyFilters = (filters: ActiveFilters) => {
    let result = [...technicians];

    /* =================================================
       TYPE
    ================================================= */

    if (filters.type === "شركات مكافحة حشرات") {
      result = [];
    }

    /* =================================================
       RATING
    ================================================= */

    if (filters.rating === "5 نجوم") {
      result = result.filter((technician) => technician.rating >= 5);
    }

    if (filters.rating === "4 نجوم فأكثر") {
      result = result.filter((technician) => technician.rating >= 4);
    }

    if (filters.rating === "3 نجوم فأكثر") {
      result = result.filter((technician) => technician.rating >= 3);
    }

    /* =================================================
       PRICE
    ================================================= */

    if (filters.price === "أقل من 200 جنيه") {
      result = result.filter((technician) => technician.price < 200);
    }

    if (filters.price === "200 - 500 جنيه") {
      result = result.filter(
        (technician) => technician.price >= 200 && technician.price <= 500,
      );
    }

    if (filters.price === "أكثر من 500 جنيه") {
      result = result.filter((technician) => technician.price > 500);
    }

    /* =================================================
       SORT
    ================================================= */

    if (filters.sort === "الأعلى تقييماً") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (filters.sort === "الأقل سعراً") {
      result.sort((a, b) => a.price - b.price);
    }

    if (filters.sort === "الأعلى سعراً") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredTechnicians(result);
  };

  /* =====================================================
     TOGGLE FILTER
  ===================================================== */

  const toggleFilter = (filter: FilterType) => {
    setOpenFilter((current) => (current === filter ? null : filter));
  };

  /* =====================================================
     SELECT FILTER
  ===================================================== */

  const handleFilterOption = (filter: FilterType, value: string) => {
    const updatedFilters: ActiveFilters = {
      ...activeFilters,
      [filter]: value,
    };

    setActiveFilters(updatedFilters);
    setOpenFilter(null);

    applyFilters(updatedFilters);
  };

  /* =====================================================
     REMOVE FILTER
  ===================================================== */

  const removeFilter = (filter: FilterType) => {
    const updatedFilters: ActiveFilters = {
      ...activeFilters,
      [filter]: "",
    };

    setActiveFilters(updatedFilters);

    applyFilters(updatedFilters);
  };

  /* =====================================================
     CLEAR ALL FILTERS
  ===================================================== */

  const clearFilters = () => {
    setActiveFilters(initialFilters);
    setFilteredTechnicians([...technicians]);
    setOpenFilter(null);
  };

  /* =====================================================
     PROFILE
  ===================================================== */

  const handleProfile = (technicianId: number) => {
    navigate(`/technician/${technicianId}`);
  };

  /* =====================================================
     BOOKING
  ===================================================== */

  const handleBooking = (technicianId: number) => {
    navigate(`/booking/${technicianId}`);
  };

  /* =====================================================
     ACTIVE FILTER ENTRIES
  ===================================================== */

  const activeFilterEntries = (
    Object.entries(activeFilters) as [FilterType, string][]
  ).filter(([, value]) => value !== "");

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="pest-control-page" dir="rtl">
      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div className="pest-control-breadcrumb">
        <span className="pest-control-breadcrumb-current">الرئيسية</span>

        <span className="pest-control-breadcrumb-separator">/</span>

        <span className="pest-control-breadcrumb-active">مكافحة الحشرات</span>
      </div>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="pest-control-hero">
        <div className="pest-control-hero-pattern">
          <div className="pest-control-hero-content">
            <div className="pest-control-title-wrapper">
              <h1>خدمات مكافحة الحشرات</h1>

              <span className="pest-control-arrow">
                <img src={vectorY} alt="" />
              </span>
            </div>

            <p>
              تخلص من الحشرات والآفات بسهولة
              <br />
              مع فنيين وشركات مكافحة حشرات موثوقة
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          TECHNICIANS
      ================================================= */}

      <section className="pest-control-technicians">
        <div className="pest-control-technicians-container">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="pest-control-technicians-header">
            <h2>اختر الفني او المركز المناسب</h2>

            <p>اختر من بين الفنيين والشركات المعتمدة بالقرب منك</p>
          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="pest-control-filters">
            {(Object.keys(filterLabels) as FilterType[]).map((filter) => {
              const isOpen = openFilter === filter;

              const selectedValue = activeFilters[filter];

              return (
                <div className="pest-control-filter-wrapper" key={filter}>
                  <div className="pest-control-filter-box">
                    <button
                      type="button"
                      className="pest-control-filter"
                      onClick={() => toggleFilter(filter)}
                      aria-expanded={isOpen}
                    >
                      <span>{selectedValue || filterLabels[filter]}</span>

                      <span className={isOpen ? "pest-control-arrow-open" : ""}>
                        <img src={arrowIcon} alt="" />
                      </span>
                    </button>

                    {/* DROPDOWN */}

                    {isOpen && (
                      <div className="pest-control-filter-dropdown">
                        {filterOptions[filter].map((option) => (
                          <button
                            type="button"
                            key={option}
                            className={
                              selectedValue === option
                                ? "pest-control-filter-option pest-control-filter-option-selected"
                                : "pest-control-filter-option"
                            }
                            onClick={() => handleFilterOption(filter, option)}
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

          {activeFilterEntries.length > 0 && (
            <div className="pest-control-active-filters">
              {activeFilterEntries.map(([filter, value]) => (
                <span className="pest-control-filter-label" key={filter}>
                  <span>{filterLabels[filter]}:</span>

                  <strong>{value}</strong>

                  <button
                    type="button"
                    aria-label={`إزالة ${filterLabels[filter]}`}
                    onClick={() => removeFilter(filter)}
                  >
                    ×
                  </button>
                </span>
              ))}

              <button
                type="button"
                className="pest-control-clear-filters"
                onClick={clearFilters}
              >
                إزالة جميع الفلاتر
              </button>
            </div>
          )}

          {/* =================================================
              RESULTS HEADER
          ================================================= */}

          <div className="pest-control-results-header">
            <span>
              عدد النتائج <strong>({filteredTechnicians.length})</strong>
            </span>
          </div>

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {filteredTechnicians.length === 0 ? (
            <div className="pest-control-empty-state">
              <h3>لا يوجد فنيون مطابقون</h3>

              <p>
                لم نجد فنيين مطابقين للفلاتر التي اخترتها. جرّب تغيير الفلاتر أو
                مسحها.
              </p>

              <button
                type="button"
                className="pest-control-empty-button"
                onClick={clearFilters}
              >
                مسح الفلاتر
              </button>
            </div>
          ) : (
            /* =================================================
               TECHNICIANS GRID
            ================================================= */

            <div className="pest-control-technicians-grid">
              {filteredTechnicians.map((technician) => (
                <article
                  className="pest-control-technician-card"
                  key={technician.id}
                >
                  {/* =================================================
                        CARD TOP
                    ================================================= */}

                  <div className="pest-control-card-top">
                    {/* TECHNICIAN INFO */}

                    <div className="pest-control-technician-info">
                      <div className="pest-control-image-wrapper">
                        <img src={technician.image} alt={technician.name} />

                        <span className="pest-control-online-dot" />
                      </div>

                      <div className="pest-control-technician-text">
                        <h3>{technician.name}</h3>

                        <p>{technician.specialty}</p>

                        <div className="pest-control-technician-meta">
                          <span>⚒ +{technician.repairs} عملية مكافحة</span>

                          <span>◉ {technician.distance} كم</span>
                        </div>
                      </div>
                    </div>

                    {/* RATING */}

                    <div className="pest-control-rating">
                      <span>{technician.rating}</span>

                      <span className="pest-control-star">★</span>
                    </div>
                  </div>

                  {/* =================================================
                        DIVIDER
                    ================================================= */}

                  <div className="pest-control-card-divider" />

                  {/* =================================================
                        CARD BOTTOM
                    ================================================= */}

                  <div className="pest-control-card-bottom">
                    {/* PRICE */}

                    <div className="pest-control-price">
                      <span className="pest-control-price-label">يبدأ من</span>

                      <span className="pest-control-price-value">
                        {technician.price}
                      </span>

                      <span className="pest-control-price-currency">جنيه</span>
                    </div>

                    {/* BUTTONS */}

                    <div className="pest-control-technician-buttons">
                      <button
                        type="button"
                        className="pest-control-profile-btn"
                        onClick={() => handleProfile(technician.id)}
                      >
                        الملف الشخصي
                      </button>

                      <button
                        type="button"
                        className="pest-control-book-btn"
                        onClick={() => handleBooking(technician.id)}
                      >
                        احجز الآن
                      </button>
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

export default PestControlServices;
