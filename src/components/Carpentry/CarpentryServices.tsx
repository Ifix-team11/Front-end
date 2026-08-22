import "./CarpentryServices.css";
import vectorY from "../../assets/SVG/Vector-Y.svg";
import arrowIcon from "../../assets/SVG/Frame-Arrow.svg";

import carpenterImage from "../../assets/images/Ellipse 82.png";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type FilterType = "type" | "sort" | "rating" | "price" | "city" | "district";

type Technician = {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  experience: number;
  operations: number;
  distance: number;
  price: number;
};

type ActiveFilters = {
  type: string;
  sort: string;
  rating: string;
  price: string;
  city: string;
  district: string;
};

const technicians: Technician[] = [
  {
    id: 1,
    name: "محمد أحمد",
    specialty: "فني نجارة وأثاث",
    image: carpenterImage,
    rating: 4.9,
    reviews: 10,
    experience: 12,
    operations: 120,
    distance: 2,
    price: 200,
  },
  {
    id: 2,
    name: "أحمد محمود",
    specialty: "نجار موبيليا",
    image: carpenterImage,
    rating: 4.8,
    reviews: 15,
    experience: 10,
    operations: 105,
    distance: 3,
    price: 250,
  },
  {
    id: 3,
    name: "محمود علي",
    specialty: "نجار أبواب وأثاث",
    image: carpenterImage,
    rating: 4.7,
    reviews: 12,
    experience: 9,
    operations: 95,
    distance: 4,
    price: 180,
  },
  {
    id: 4,
    name: "مصطفى حسن",
    specialty: "فني نجارة",
    image: carpenterImage,
    rating: 4.9,
    reviews: 20,
    experience: 14,
    operations: 150,
    distance: 5,
    price: 300,
  },
  {
    id: 5,
    name: "عمر محمد",
    specialty: "نجار مطابخ",
    image: carpenterImage,
    rating: 4.6,
    reviews: 8,
    experience: 8,
    operations: 85,
    distance: 6,
    price: 220,
  },
  {
    id: 6,
    name: "إبراهيم خالد",
    specialty: "نجار موبيليا",
    image: carpenterImage,
    rating: 4.8,
    reviews: 18,
    experience: 11,
    operations: 130,
    distance: 3,
    price: 270,
  },
  {
    id: 7,
    name: "كريم أحمد",
    specialty: "نجار أبواب",
    image: carpenterImage,
    rating: 4.5,
    reviews: 7,
    experience: 7,
    operations: 70,
    distance: 8,
    price: 170,
  },
  {
    id: 8,
    name: "ياسر محمود",
    specialty: "فني أثاث ونجارة",
    image: carpenterImage,
    rating: 4.9,
    reviews: 22,
    experience: 15,
    operations: 160,
    distance: 4,
    price: 350,
  },
];

const initialFilters: ActiveFilters = {
  type: "",
  sort: "",
  rating: "",
  price: "",
  city: "",
  district: "",
};

const filterOptions: Record<FilterType, { label: string; value: string }[]> = {
  type: [
    { label: "فنيين", value: "فنيين" },
    { label: "مراكز صيانة", value: "مراكز صيانة" },
  ],

  sort: [
    { label: "الأعلى تقييماً", value: "الأعلى تقييماً" },
    { label: "الأقل سعراً", value: "الأقل سعراً" },
    { label: "الأعلى سعراً", value: "الأعلى سعراً" },
  ],

  rating: [
    { label: "5 نجوم", value: "5 نجوم" },
    { label: "4 نجوم فأكثر", value: "4 نجوم فأكثر" },
    { label: "3 نجوم فأكثر", value: "3 نجوم فأكثر" },
  ],

  price: [
    { label: "أقل من 200 جنيه", value: "أقل من 200 جنيه" },
    { label: "200 - 500 جنيه", value: "200 - 500 جنيه" },
    { label: "أكثر من 500 جنيه", value: "أكثر من 500 جنيه" },
  ],

  city: [
    { label: "الجيزة", value: "الجيزة" },
    { label: "القاهرة", value: "القاهرة" },
    { label: "6 أكتوبر", value: "6 أكتوبر" },
  ],

  district: [
    { label: "الدقي", value: "الدقي" },
    { label: "المهندسين", value: "المهندسين" },
    { label: "العجوزة", value: "العجوزة" },
  ],
};

const filterLabels: Record<FilterType, string> = {
  type: "النوع",
  sort: "ترتيب حسب",
  rating: "التقييم",
  price: "السعر",
  city: "المدينة",
  district: "الحي",
};

const CarpentryServices = () => {
  const navigate = useNavigate();

  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const [filters, setFilters] = useState<ActiveFilters>(initialFilters);

  const toggleFilter = (filter: FilterType) => {
    setOpenFilter((current) => (current === filter ? null : filter));
  };

  const selectFilter = (filter: FilterType, value: string) => {
    setFilters((current) => ({
      ...current,
      [filter]: value,
    }));

    setOpenFilter(null);
  };

  const removeFilter = (filter: FilterType) => {
    setFilters((current) => ({
      ...current,
      [filter]: "",
    }));
  };

  const clearAllFilters = () => {
    setFilters(initialFilters);
    setOpenFilter(null);
  };

  const handleProfile = (technicianId: number) => {
    navigate(`/technician/${technicianId}`);
  };

  const handleBooking = (technicianId: number) => {
    navigate(`/booking/${technicianId}`);
  };

  const filteredTechnicians = useMemo(() => {
    let result = [...technicians];

    // Rating
    if (filters.rating === "5 نجوم") {
      result = result.filter((technician) => technician.rating >= 5);
    }

    if (filters.rating === "4 نجوم فأكثر") {
      result = result.filter((technician) => technician.rating >= 4);
    }

    if (filters.rating === "3 نجوم فأكثر") {
      result = result.filter((technician) => technician.rating >= 3);
    }

    // Price
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

    // Sort
    if (filters.sort === "الأعلى تقييماً") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (filters.sort === "الأقل سعراً") {
      result.sort((a, b) => a.price - b.price);
    }

    if (filters.sort === "الأعلى سعراً") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filters]);

  const activeFilters = (Object.keys(filters) as FilterType[]).filter(
    (filter) => filters[filter],
  );

  return (
    <main className="carpentry-page" dir="rtl">
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="carpentry-breadcrumb">
        <span className="carpentry-breadcrumb-current">الرئيسية</span>

        <span className="carpentry-breadcrumb-separator">/</span>

        <span className="carpentry-breadcrumb-active">النجارة</span>
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="carpentry-hero">
        <div className="carpentry-hero-pattern">
          <div className="carpentry-hero-content">
            <div className="carpentry-title-wrapper">
              <h1>خدمات النجارة</h1>

              <span className="carpentry-arrow">
                <img src={vectorY} alt="" />
              </span>
            </div>

            <p>
              جميع خدمات النجارة والأثاث بسهولة مع فنيين
              <br />
              ونجارين موثوقين بالقرب منك
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNICIANS
      ===================================================== */}

      <section className="carpentry-technicians">
        <div className="carpentry-technicians-container">
          {/* Header */}

          <div className="carpentry-technicians-header">
            <h2>اختر الفني او المركز المناسب</h2>

            <p>اختر من بين الفنيين و المراكز المعتمدة بالقرب منك</p>
          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="carpentry-filters">
            {(Object.keys(filterOptions) as FilterType[]).map((filter) => (
              <div className="carpentry-filter-wrapper" key={filter}>
                <div className="carpentry-filter-box">
                  <button
                    type="button"
                    className="carpentry-filter-button"
                    onClick={() => toggleFilter(filter)}
                    aria-expanded={openFilter === filter}
                  >
                    <span>{filters[filter] || filterLabels[filter]}</span>

                    <span
                      className={
                        openFilter === filter ? "carpentry-arrow-open" : ""
                      }
                    >
                      <img src={arrowIcon} alt="" />
                    </span>
                  </button>

                  {openFilter === filter && (
                    <div className="carpentry-filter-dropdown">
                      {filterOptions[filter].map((option) => (
                        <button
                          type="button"
                          key={option.value}
                          className={`carpentry-filter-option ${
                            filters[filter] === option.value
                              ? "carpentry-filter-option-selected"
                              : ""
                          }`}
                          onClick={() => selectFilter(filter, option.value)}
                        >
                          {option.label}
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

          <div className="carpentry-active-filters">
            {activeFilters.length === 0 ? (
              <span className="carpentry-no-active-filters">
                لا توجد فلاتر محددة
              </span>
            ) : (
              activeFilters.map((filter) => (
                <span className="carpentry-filter-label" key={filter}>
                  <span>{filterLabels[filter]}:</span>

                  <strong>{filters[filter]}</strong>

                  <button
                    type="button"
                    onClick={() => removeFilter(filter)}
                    aria-label={`إزالة فلتر ${filterLabels[filter]}`}
                  >
                    ×
                  </button>
                </span>
              ))
            )}

            {activeFilters.length > 0 && (
              <button
                type="button"
                className="carpentry-clear-filters"
                onClick={clearAllFilters}
              >
                إزالة جميع الفلاتر
              </button>
            )}
          </div>

          {/* =================================================
              RESULTS
          ================================================= */}

          <div className="carpentry-results-header">
            <span>
              عدد النتائج <strong>({filteredTechnicians.length})</strong>
            </span>
          </div>

          {/* =================================================
              CARDS
          ================================================= */}

          <div className="carpentry-technicians-grid">
            {filteredTechnicians.length === 0 ? (
              <div className="carpentry-empty-state">
                <h3>لا يوجد فنيون مطابقون</h3>

                <p>
                  لم نجد فنيين مطابقين للفلاتر التي اخترتها.
                  <br />
                  جرّب تغيير الفلاتر أو مسحها.
                </p>

                <button
                  type="button"
                  className="plumbing-empty-button"
                  onClick={clearAllFilters}
                >
                  مسح الفلاتر
                </button>
              </div>
            ) : (
              filteredTechnicians.map((technician) => (
                <article
                  className="carpentry-technician-card"
                  key={technician.id}
                >
                  {/* Card Top */}

                  <div className="carpentry-card-top">
                    <div className="carpentry-technician-info">
                      <div className="carpentry-image-wrapper">
                        <img src={technician.image} alt={technician.name} />

                        <span className="carpentry-online-dot" />
                      </div>

                      <div className="carpentry-technician-text">
                        <h3>{technician.name}</h3>

                        <p>{technician.specialty}</p>

                        <div className="carpentry-technician-meta">
                          <span>⚒ +{technician.operations} عملية إصلاح</span>

                          <span>◉ {technician.distance} كم</span>
                        </div>
                      </div>
                    </div>

                    <div className="carpentry-rating">
                      <span>{technician.rating}</span>

                      <span className="carpentry-star">★</span>
                    </div>
                  </div>

                  {/* Divider */}

                  <div className="carpentry-card-divider" />

                  {/* Bottom */}

                  <div className="carpentry-card-bottom">
                    <div className="carpentry-price">
                      <span className="carpentry-price-label">يبدأ من</span>

                      <span className="carpentry-price-value">
                        {technician.price}
                      </span>

                      <span className="carpentry-price-currency">جنيه</span>
                    </div>

                    <div className="carpentry-technician-buttons">
                      <button
                        type="button"
                        className="carpentry-profile-btn"
                        onClick={() => handleProfile(technician.id)}
                      >
                        ملف الشخصي
                      </button>

                      <button
                        type="button"
                        className="carpentry-book-btn"
                        onClick={() => handleBooking(technician.id)}
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

export default CarpentryServices;
