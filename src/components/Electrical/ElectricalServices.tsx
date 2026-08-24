import "./ElectricalServices.css";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    specialty: "فني كهرباء",
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
    specialty: "فني كهرباء",
    image: technicianImage,
    rating: 4.8,
    reviews: 15,
    experience: 10,
    price: 250,
    repairs: 95,
    distance: 3,
  },
  {
    id: 3,
    name: "محمود علي",
    specialty: "فني كهرباء",
    image: technicianImage,
    rating: 4.7,
    reviews: 12,
    experience: 8,
    price: 180,
    repairs: 87,
    distance: 4,
  },
  {
    id: 4,
    name: "خالد حسن",
    specialty: "فني كهرباء",
    image: technicianImage,
    rating: 4.9,
    reviews: 20,
    experience: 14,
    price: 300,
    repairs: 150,
    distance: 5,
  },
  {
    id: 5,
    name: "عمر أحمد",
    specialty: "فني كهرباء",
    image: technicianImage,
    rating: 4.6,
    reviews: 9,
    experience: 7,
    price: 220,
    repairs: 76,
    distance: 6,
  },
  {
    id: 6,
    name: "محمد حسن",
    specialty: "فني كهرباء",
    image: technicianImage,
    rating: 4.8,
    reviews: 18,
    experience: 11,
    price: 280,
    repairs: 110,
    distance: 3,
  },
  {
    id: 7,
    name: "علي محمود",
    specialty: "فني كهرباء",
    image: technicianImage,
    rating: 4.5,
    reviews: 8,
    experience: 6,
    price: 170,
    repairs: 65,
    distance: 7,
  },
  {
    id: 8,
    name: "حسام أحمد",
    specialty: "فني كهرباء",
    image: technicianImage,
    rating: 4.9,
    reviews: 22,
    experience: 13,
    price: 320,
    repairs: 165,
    distance: 2,
  },
];

const filterOptions: Record<FilterType, string[]> = {
  type: ["فنيين", "مراكز صيانة"],
  sort: ["الأعلى تقييماً", "الأقل سعراً", "الأعلى سعراً"],
  rating: ["5 نجوم", "4 نجوم فأكثر", "3 نجوم فأكثر"],
  price: ["أقل من 200 جنيه", "200 - 500 جنيه", "أكثر من 500 جنيه"],
  city: ["الجيزة", "القاهرة", "6 أكتوبر"],
  district: ["الدقي", "المهندسين", "العجوزة"],
};

const filterLabels: Record<FilterType, string> = {
  type: "النوع",
  sort: "ترتيب حسب",
  rating: "التقييم",
  price: "السعر",
  city: "المدينة",
  district: "الحي",
};

const ElectricalServices = () => {
  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    type: null,
    sort: null,
    rating: null,
    price: null,
    city: null,
    district: null,
  });

  const [filteredTechnicians, setFilteredTechnicians] =
    useState<Technician[]>(technicians);

  const toggleFilter = (filter: FilterType) => {
    setOpenFilter((current) => (current === filter ? null : filter));
  };

  const selectFilter = (filter: FilterType, value: string) => {
    setActiveFilters((current) => ({
      ...current,
      [filter]: value,
    }));

    setOpenFilter(null);

    applyFilter(filter, value);
  };

  const applyFilter = (filter: FilterType, value: string) => {
    let result = [...technicians];

    if (filter === "rating") {
      if (value === "5 نجوم") {
        result = result.filter((technician) => technician.rating >= 5);
      }

      if (value === "4 نجوم فأكثر") {
        result = result.filter((technician) => technician.rating >= 4);
      }

      if (value === "3 نجوم فأكثر") {
        result = result.filter((technician) => technician.rating >= 3);
      }
    }

    if (filter === "price") {
      if (value === "أقل من 200 جنيه") {
        result = result.filter((technician) => technician.price < 200);
      }

      if (value === "200 - 500 جنيه") {
        result = result.filter(
          (technician) => technician.price >= 200 && technician.price <= 500,
        );
      }

      if (value === "أكثر من 500 جنيه") {
        result = result.filter((technician) => technician.price > 500);
      }
    }

    if (filter === "sort") {
      if (value === "الأعلى تقييماً") {
        result.sort((a, b) => b.rating - a.rating);
      }

      if (value === "الأقل سعراً") {
        result.sort((a, b) => a.price - b.price);
      }

      if (value === "الأعلى سعراً") {
        result.sort((a, b) => b.price - a.price);
      }
    }

    setFilteredTechnicians(result);
  };

  const removeFilter = (filter: FilterType) => {
    setActiveFilters((current) => ({
      ...current,
      [filter]: null,
    }));

    setFilteredTechnicians(technicians);
  };

  const clearAllFilters = () => {
    setActiveFilters({
      type: null,
      sort: null,
      rating: null,
      price: null,
      city: null,
      district: null,
    });

    setFilteredTechnicians(technicians);
    setOpenFilter(null);
  };

  return (
    <main className="electrical-page" dir="rtl">
      {/* Breadcrumb */}
      <div className="electrical-breadcrumb">
        <span className="electrical-breadcrumb-current">الرئيسية</span>

        <span className="electrical-breadcrumb-separator">/</span>

        <span className="electrical-breadcrumb-active">الكهرباء</span>
      </div>

      {/* Hero */}
      <section className="electrical-hero">
        <div className="electrical-hero-pattern">
          <div className="electrical-hero-content">
            <div className="electrical-title-wrapper">
              <h1>خدمات الكهرباء</h1>

              <span className="electrical-arrow">
                <img src={vectorY} alt="" />
              </span>
            </div>

            <p>
              حل جميع أعطال الكهرباء وتركيباتها بسهولة مع فنيين
              <br />
              ومراكز صيانة موثوقة
            </p>
          </div>
        </div>
      </section>

      {/* Technicians */}
      <section className="electrical-technicians">
        <div className="electrical-technicians-container">
          {/* Header */}
          <div className="electrical-technicians-header">
            <h2>اختر الفني أو المركز المناسب</h2>

            <p>اختر من بين الفنيين والمراكز المعتمدة بالقرب منك</p>
          </div>

          {/* Filters */}
          <div className="electrical-filters">
            {(Object.keys(filterOptions) as FilterType[]).map((filter) => (
              <div className="electrical-filter-wrapper" key={filter}>
                <div className="electrical-filter-box">
                  <button
                    type="button"
                    className={`electrical-filter ${
                      openFilter === filter ? "electrical-filter-open" : ""
                    }`}
                    onClick={() => toggleFilter(filter)}
                  >
                    <span>{filterLabels[filter]}</span>

                    <span className="electrical-filter-arrow">
                      <img src={arrowIcon} alt="" />
                    </span>
                  </button>

                  {openFilter === filter && (
                    <div className="electrical-filter-dropdown">
                      {filterOptions[filter].map((option) => (
                        <button
                          type="button"
                          key={option}
                          className={`electrical-filter-option ${
                            activeFilters[filter] === option
                              ? "electrical-filter-option-selected"
                              : ""
                          }`}
                          onClick={() => selectFilter(filter, option)}
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

          {/* Active Filters */}
          <div className="electrical-active-filters">
            {(Object.keys(activeFilters) as FilterType[]).map((filter) => {
              const value = activeFilters[filter];

              if (!value) {
                return null;
              }

              return (
                <span
                  className="electrical-filter-label"
                  key={`${filter}-${value}`}
                >
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
              );
            })}

            {Object.values(activeFilters).some(Boolean) && (
              <button
                type="button"
                className="electrical-clear-filters"
                onClick={clearAllFilters}
              >
                إزالة جميع الفلاتر
              </button>
            )}
          </div>

          {/* Results */}
          <div className="electrical-results-header">
            <span>
              عدد النتائج <strong>({filteredTechnicians.length})</strong>
            </span>
          </div>

          {/* Cards */}
          <div className="electrical-technicians-grid">
            {filteredTechnicians.length > 0 ? (
              filteredTechnicians.map((technician) => (
                <article
                  className="electrical-technician-card"
                  key={technician.id}
                >
                  {/* Card Top */}
                  <div className="electrical-card-top">
                    <div className="electrical-technician-info">
                      <div className="electrical-image-wrapper">
                        <img src={technician.image} alt={technician.name} />

                        <span className="electrical-online-dot" />
                      </div>

                      <div className="electrical-technician-text">
                        <h3>{technician.name}</h3>

                        <p>{technician.specialty}</p>

                        <div className="electrical-technician-meta">
                          <span>⚒ +{technician.repairs} عملية إصلاح</span>

                          <span>◉ {technician.distance} كم</span>
                        </div>
                      </div>
                    </div>

                    <div className="electrical-rating">
                      <span>{technician.rating}</span>

                      <span className="electrical-star">★</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="electrical-card-divider" />

                  {/* Card Bottom */}
                  <div className="electrical-card-bottom">
                    <div className="electrical-price">
                      <span className="electrical-price-label">يبدأ من</span>

                      <span className="electrical-price-value">
                        {technician.price}
                      </span>

                      <span className="electrical-price-currency">جنيه</span>
                    </div>

                    <div className="electrical-technician-buttons">
                      <Link
                        to={`/technician/${technician.id}`}
                        className="electrical-profile-btn"
                      >
                        الملف الشخصي
                      </Link>

                      <Link
                        to={`/booking/${technician.id}`}
                        className="electrical-book-btn"
                      >
                        احجز الآن
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="electrical-empty-state">
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
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ElectricalServices;
