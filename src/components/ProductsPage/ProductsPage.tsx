import { useMemo, useState } from "react";
import "./ProductsPage.css";

import productImage from "../../assets/images/image 19.png";

type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  category: string;
  brand: string;
  inStock: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "مضخة صرف الغسالات للمركبات",
    image: productImage,
    rating: 4.9,
    reviews: 15,
    price: 120,
    category: "غسالات",
    brand: "سامسونج",
    inStock: true,
  },
  {
    id: 2,
    name: "مضخة صرف الغسالات للمركبات",
    image: productImage,
    rating: 4.9,
    reviews: 15,
    price: 120,
    category: "غسالات",
    brand: "سامسونج",
    inStock: true,
  },
  {
    id: 3,
    name: "مضخة صرف الغسالات للمركبات",
    image: productImage,
    rating: 4.9,
    reviews: 15,
    price: 120,
    category: "غسالات",
    brand: "سامسونج",
    inStock: true,
  },
  {
    id: 4,
    name: "مضخة صرف الغسالات للمركبات",
    image: productImage,
    rating: 4.9,
    reviews: 15,
    price: 120,
    category: "غسالات",
    brand: "سامسونج",
    inStock: true,
  },
  {
    id: 5,
    name: "مضخة صرف الغسالات للمركبات",
    image: productImage,
    rating: 4.9,
    reviews: 15,
    price: 120,
    category: "غسالات",
    brand: "سامسونج",
    inStock: true,
  },
  {
    id: 6,
    name: "مضخة صرف الغسالات للمركبات",
    image: productImage,
    rating: 4.9,
    reviews: 15,
    price: 120,
    category: "غسالات",
    brand: "سامسونج",
    inStock: true,
  },
  {
    id: 7,
    name: "مضخة صرف الغسالات للمركبات",
    image: productImage,
    rating: 4.9,
    reviews: 15,
    price: 120,
    category: "غسالات",
    brand: "سامسونج",
    inStock: true,
  },
  {
    id: 8,
    name: "مضخة صرف الغسالات للمركبات",
    image: productImage,
    rating: 4.9,
    reviews: 15,
    price: 120,
    category: "غسالات",
    brand: "سامسونج",
    inStock: true,
  },
  {
    id: 9,
    name: "مضخة صرف الغسالات للمركبات",
    image: productImage,
    rating: 4.9,
    reviews: 15,
    price: 120,
    category: "غسالات",
    brand: "سامسونج",
    inStock: true,
  },
];

const ProductsPage = () => {
  const [sort, setSort] = useState("ترتيب");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("300");
  const [maxPrice, setMaxPrice] = useState("500");
  const [selectedRating, setSelectedRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (selectedBrand) {
      result = result.filter((product) => product.brand === selectedBrand);
    }

    if (selectedRating) {
      result = result.filter(
        (product) => product.rating >= Number(selectedRating),
      );
    }

    if (sort === "الأعلى تقييماً") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "الأقل سعراً") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "الأعلى سعراً") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, selectedBrand, selectedRating, sort]);

  const toggleCart = (id: number) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedRating("");
    setMinPrice("300");
    setMaxPrice("500");
    setCurrentPage(1);
  };

  return (
    <section className="products-page" dir="rtl">
      <div className="container products-container">
        <div className="row products-layout g-3">
          {/* =========================
              Filters
          ========================= */}

          <aside className="col-lg-3 col-md-4">
            <div className="filters-panel">
              <div className="filter-title">
                <span>
                  <img src="/src/assets/SVG/filter-horizontal.svg" alt="" />
                </span>
                <span>فلترة</span>
              </div>

              {/* نوع الجهاز */}

              <div className="filter-group">
                <h4>نوع الجهاز</h4>

                {["ثلاجات", "غسالات", "غسالات"].map((item, index) => (
                  <div
                    className="form-check d-flex align-items-center"
                    key={`${item}-${index}`}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`device-${index}`}
                      checked={selectedCategory === item}
                      onChange={() => {
                        setSelectedCategory(
                          selectedCategory === item ? "" : item,
                        );
                        setCurrentPage(1);
                      }}
                    />

                    <label
                      className="form-check-label"
                      htmlFor={`device-${index}`}
                    >
                      {item}
                    </label>
                  </div>
                ))}

                <button type="button" className="btn show-more">
                  عرض المزيد
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                    >
                      <path
                        d="M0.75005 0.750061C0.75005 0.750061 5.16895 6.75005 6.75005 6.75006C8.33115 6.75007 12.75 0.750061 12.75 0.750061"
                        stroke="#3060E4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              {/* نوع القطعة */}

              <div className="filter-group">
                <h4>نوع القطعة</h4>

                {["موتور", "كارتة إلكترونية", "طلمبة صرف", "سير"].map(
                  (item, index) => (
                    <div
                      className="form-check d-flex align-items-center"
                      key={item}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`part-${index}`}
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`part-${index}`}
                      >
                        {item}
                      </label>
                    </div>
                  ),
                )}
              </div>

              {/* السعر */}

              <div className="filter-group">
                <h4>سعر القطعة</h4>

                <div className="range-line">
                  <span className="range-dot range-dot-right" />
                  <span className="range-dot range-dot-left" />
                </div>

                <div className="row price-inputs g-2">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      value={`${maxPrice} جنيه`}
                      onChange={(e) =>
                        setMaxPrice(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </div>

                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      value={`${minPrice} جنيه`}
                      onChange={(e) =>
                        setMinPrice(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* التقييم */}

              <div className="filter-group rating-filter">
                <h4>التقييم</h4>

                {[5, 4, 3, 2].map((rating) => (
                  <div
                    className="form-check d-flex align-items-center justify-content-start"
                    key={rating}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`rating-${rating}`}
                      checked={selectedRating === String(rating)}
                      onChange={() => {
                        setSelectedRating(
                          selectedRating === String(rating)
                            ? ""
                            : String(rating),
                        );

                        setCurrentPage(1);
                      }}
                    />

                    <label
                      className="form-check-label"
                      htmlFor={`rating-${rating}`}
                    >
                      <span className="rating-number">({rating})</span>

                      <span className="stars">★★★★★</span>
                    </label>
                  </div>
                ))}
              </div>

              {/* Footer */}

              <div className="filter-footer d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-primary apply-btn flex-grow-1"
                >
                  تطبيق
                </button>

                <button
                  type="button"
                  className="btn clear-btn"
                  onClick={clearFilters}
                >
                  مسح الفلاتر
                </button>
              </div>
            </div>
          </aside>

          {/* =========================
              Catalog
          ========================= */}

          <main className="col-lg-9 col-md-8 catalog-content">
            {/* Header */}

            <header className="catalog-header d-flex align-items-center justify-content-between mb-3">
              <p className="mb-0">
                عدد المنتجات <strong>({filteredProducts.length})</strong>
              </p>

              <div className="sort-wrapper position-relative">
                <span className="sort-icon">⇅</span>
                <select
                  className="form-select form-select-sm"
                  aria-label="ترتيب المنتجات"
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="ترتيب">ترتيب</option>
                  <option value="الأعلى تقييماً">الأعلى تقييماً</option>
                  <option value="الأقل سعراً">الأقل سعراً</option>
                  <option value="الأعلى سعراً">الأعلى سعراً</option>
                </select>
              </div>
            </header>

            {/* Products */}

            {filteredProducts.length > 0 ? (
              <div className="row products-grid g-3">
                {filteredProducts.map((product) => (
                  <div className="col-12 col-sm-6 col-xl-4" key={product.id}>
                    <article className="product-card h-100">
                      {/* Image */}

                      <div className="product-image-wrap">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image"
                        />

                        <div className="product-actions">
                          <button
                            type="button"
                            className={
                              favorites.includes(product.id) ? "active" : ""
                            }
                            onClick={() => toggleFavorite(product.id)}
                            aria-label="إضافة للمفضلة"
                          >
                            ♡
                          </button>

                          <button type="button" aria-label="مقارنة">
                            ♧
                          </button>
                        </div>
                      </div>

                      {/* Details */}

                      <div className="product-details">
                        <h3>{product.name}</h3>

                        <div className="product-rating">
                          <strong>{product.rating}</strong>

                          <span className="stars">★★★★★</span>

                          <span className="reviews">({product.reviews})</span>
                        </div>

                        <small>متبقي 8 قطع فقط</small>

                        <div className="price mb-2">
                          <strong>{product.price}</strong> جنيه
                        </div>

                        {/* Buttons */}

                        <div className="product-buttons d-flex gap-1">
                          <button
                            type="button"
                            className="btn details-btn flex-grow-1"
                          >
                            تفاصيل منتج
                          </button>

                          <button
                            type="button"
                            className="btn btn-primary add-cart-btn flex-grow-1"
                            onClick={() => toggleCart(product.id)}
                          >
                            {cart.includes(product.id)
                              ? "تمت الإضافة"
                              : "إضافة للسلة"}{" "}
                            🛒
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-products text-center p-4">لا توجد منتجات</div>
            )}

            {/* Pagination */}

            <div className="products-pagination d-flex justify-content-center align-items-center gap-1 mt-3">
              <button
                type="button"
                className="pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                ‹
              </button>

              {[10, 9, 8].map((page) => (
                <button key={page} type="button" className="pagination-number">
                  {page}
                </button>
              ))}

              <span className="pagination-dots">...</span>

              {[3, 2, 1].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`pagination-number ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="pagination-arrow"
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                ›
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
