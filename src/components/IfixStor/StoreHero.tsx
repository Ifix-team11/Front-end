import "./StoreHero.css";

import storeHeroImage from "../../assets/images/image 19.png";
import frameV from "../../assets/SVG/Frame-V.svg";
import vectorY from "../../assets/SVG/Vector-Y.svg";

import ProductsPage from "../ProductsPage/ProductsPage";

const Store = () => {
  return (
    <main className="store-page" dir="rtl">
      {/* Breadcrumb */}
      <div className="store-breadcrumb">
        <span>الرئيسية</span>

        <span className="store-breadcrumb-separator">/</span>

        <span className="store-breadcrumb-active">المتجر</span>
      </div>

      {/* Hero */}
      <section className="store-hero">
        <div className="store-hero-container">
          {/* Image */}
          <div className="store-hero-image">
            <img src={storeHeroImage} alt="قطع غيار الأجهزة المنزلية" />
          </div>

          {/* Content */}
          <div className="store-hero-content">
            {" "}
            <div className="store-hero-victor">
              <div className="store-hero-badge">
                <span className="store-hero-badge-icon">
                  <img src={frameV} alt="" />
                </span>

                <span>محركك الموثوق لقطع غيار الأجهزة المنزلية</span>
              </div>
              <div>
                <img className="store-hero-arrow" src={vectorY} alt="" />
              </div>
            </div>
            {/* Title */}
            <div className="store-hero-title">
              <h1>كل قطع الغيار في مكان واحد</h1>
            </div>
            {/* Description */}
            <p className="store-hero-description">
              إبحث عن قطع الغيار المناسبة لك
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <ProductsPage />
    </main>
  );
};

export default Store;
