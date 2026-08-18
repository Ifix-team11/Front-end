import "./HomeAppliancesServices.css";

import vectorY from "../../assets/SVG/Vector-Y.svg";
import arrowIcon from "../../assets/SVG/Frame-Arrow.svg";
import applianceImage from "../../assets/images/Ellipse 82.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    specialty: "فني أجهزة منزلية",
    image: applianceImage,
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
    specialty: "فني أجهزة منزلية",
    image: applianceImage,
    rating: 4.8,
    reviews: 18,
    experience: 10,
    price: 250,
    repairs: 105,
    distance: 3,
  },
  {
    id: 3,
    name: "محمود علي",
    specialty: "فني تكييف وثلاجات",
    image: applianceImage,
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
    specialty: "فني غسالات وأجهزة",
    image: applianceImage,
    rating: 4.9,
    reviews: 22,
    experience: 14,
    price: 220,
    repairs: 140,
    distance: 2,
  },
  {
    id: 5,
    name: "كريم محمد",
    specialty: "فني أجهزة منزلية",
    image: applianceImage,
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
    specialty: "فني بوتاجازات وأفران",
    image: applianceImage,
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
    specialty: "فني أجهزة منزلية",
    image: applianceImage,
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
    specialty: "فني تكييف وأجهزة منزلية",
    image: applianceImage,
    rating: 4.9,
    reviews: 25,
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
   COMPONENT
===================================================== */

const HomeAppliancesServices = () => {
  const navigate = useNavigate();

  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(initialFilters);

  const [filteredTechnicians, setFilteredTechnicians] =
    useState<Technician[]>(technicians);

  /* =====================================================
     TOGGLE FILTER
  ===================================================== */

  const toggleFilter = (filter: FilterType) => {
    setOpenFilter((current) => (current === filter ? null : filter));
  };

  /* =====================================================
     APPLY FILTERS
  ===================================================== */

  const applyFilters = (filters: ActiveFilters) => {
    let result = [...technicians];

    /* ================= Rating ================= */

    if (filters.rating === "5 نجوم") {
      result = result.filter((technician) => technician.rating >= 5);
    }

    if (filters.rating === "4 نجوم فأكثر") {
      result = result.filter((technician) => technician.rating >= 4);
    }

    if (filters.rating === "3 نجوم فأكثر") {
      result = result.filter((technician) => technician.rating >= 3);
    }

    /* ================= Price ================= */

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

    /* ================= Sort ================= */

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
     REMOVE SINGLE FILTER
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
    setFilteredTechnicians(technicians);
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
     FILTER OPTIONS
  ===================================================== */

  const filterOptions: Record<FilterType, string[]> = {
    type: ["فنيين", "مراكز صيانة"],

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
     ACTIVE FILTERS
  ===================================================== */

  const activeFilterEntries = (
    Object.entries(activeFilters) as [FilterType, string][]
  ).filter(([, value]) => value);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="home-appliances-page" dir="rtl">
      {/* =================================================
          BREADCRUMB
      ================================================= */}

      <div className="home-appliances-breadcrumb container">
        <span className="home-appliances-breadcrumb-current">الرئيسية</span>

        <span className="home-appliances-breadcrumb-separator">/</span>

        <span className="home-appliances-breadcrumb-active">
          الأجهزة المنزلية
        </span>
      </div>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="home-appliances-hero">
        <div className="home-appliances-hero-pattern">
          <div className="home-appliances-hero-content container">
            <div className="home-appliances-title-wrapper">
              <h1>خدمات الأجهزة المنزلية</h1>

              <span className="home-appliances-arrow">
                <img src={vectorY} alt="" />
              </span>
            </div>

            <p>
              صيانة وإصلاح جميع الأجهزة المنزلية بسهولة
              <br />
              مع فنيين ومراكز صيانة موثوقة
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          TECHNICIANS
      ================================================= */}

      <section className="home-appliances-technicians">
        <div className="home-appliances-technicians-container container">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="home-appliances-technicians-header">
            <h2>اختر الفني او المركز المناسب</h2>

            <p>اختر من بين الفنيين والمراكز المعتمدة بالقرب منك</p>
          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="home-appliances-filters">
            {(Object.keys(filterLabels) as FilterType[]).map((filter) => (
              <div className="home-appliances-filter-wrapper" key={filter}>
                <div className="home-appliances-filter-box">
                  <button
                    type="button"
                    className="home-appliances-filter"
                    onClick={() => toggleFilter(filter)}
                    aria-expanded={openFilter === filter}
                  >
                    <span>{activeFilters[filter] || filterLabels[filter]}</span>

                    <span
                      className={
                        openFilter === filter
                          ? "home-appliances-arrow-open"
                          : ""
                      }
                    >
                      <img src={arrowIcon} alt="" />
                    </span>
                  </button>

                  {/* Dropdown */}

                  {openFilter === filter && (
                    <div className="home-appliances-filter-dropdown">
                      {filterOptions[filter].map((option) => (
                        <button
                          type="button"
                          key={option}
                          className={`home-appliances-filter-option ${
                            activeFilters[filter] === option ? "selected" : ""
                          }`}
                          onClick={() => handleFilterOption(filter, option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* =================================================
              ACTIVE FILTERS
          ================================================= */}

          {activeFilterEntries.length > 0 && (
            <div className="home-appliances-active-filters">
              {activeFilterEntries.map(([filter, value]) => (
                <span className="home-appliances-filter-label" key={filter}>
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
                className="home-appliances-clear-filters"
                onClick={clearFilters}
              >
                إزالة جميع الفلاتر
              </button>
            </div>
          )}

          {/* =================================================
              RESULTS
          ================================================= */}

          <div className="home-appliances-results-header">
            <span>
              عدد النتائج <strong>({filteredTechnicians.length})</strong>
            </span>
          </div>

          {/* =================================================
              TECHNICIANS GRID
          ================================================= */}

          {filteredTechnicians.length === 0 ? (
            /* =================================================
               EMPTY STATE
            ================================================= */

            <div className="home-appliances-empty-state">
              <h3>لا يوجد فنيون مطابقون</h3>

              <p>
                لم نجد فنيين مطابقين للفلاتر التي اخترتها.
                <br />
                جرّب تغيير الفلاتر أو مسحها.
              </p>

              <button
                type="button"
                className="home-appliances-empty-button"
                onClick={clearFilters}
              >
                مسح الفلاتر
              </button>
            </div>
          ) : (
            /* =================================================
               TECHNICIANS
            ================================================= */

            <div className="home-appliances-technicians-grid row g-3">
              {filteredTechnicians.map((technician) => (
                <div className="col-12 col-md-6 col-lg-4" key={technician.id}>
                  <article className="home-appliances-technician-card">
                    {/* =================================================
                          CARD TOP
                      ================================================= */}

                    <div className="home-appliances-card-top">
                      {/* Technician Info */}

                      <div className="home-appliances-technician-info">
                        <div className="home-appliances-image-wrapper">
                          <img src={technician.image} alt={technician.name} />

                          <span className="home-appliances-online-dot" />
                        </div>

                        <div className="home-appliances-technician-text">
                          <h3>{technician.name}</h3>

                          <p>{technician.specialty}</p>

                          <div className="home-appliances-technician-meta">
                            <span>
                              ⚒ +{technician.repairs}
                              عملية إصلاح
                            </span>

                            <span>
                              ◉ {technician.distance}
                              كم
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Rating */}

                      <div className="home-appliances-rating">
                        <span>{technician.rating}</span>

                        <span className="home-appliances-star">★</span>
                      </div>
                    </div>

                    {/* =================================================
                          DIVIDER
                      ================================================= */}

                    <div className="home-appliances-card-divider" />

                    {/* =================================================
                          CARD BOTTOM
                      ================================================= */}

                    <div className="home-appliances-card-bottom">
                      {/* Price */}

                      <div className="home-appliances-price">
                        <span className="home-appliances-price-label">
                          يبدأ من
                        </span>

                        <span className="home-appliances-price-value">
                          {technician.price}
                        </span>

                        <span className="home-appliances-price-currency">
                          جنيه
                        </span>
                      </div>

                      {/* Buttons */}

                      <div className="home-appliances-technician-buttons">
                        <button
                          type="button"
                          className="home-appliances-profile-btn"
                          onClick={() => handleProfile(technician.id)}
                        >
                          الملف الشخصي
                        </button>

                        <button
                          type="button"
                          className="home-appliances-book-btn"
                          onClick={() => handleBooking(technician.id)}
                        >
                          احجز الآن
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomeAppliancesServices;
