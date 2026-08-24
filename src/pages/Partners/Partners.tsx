import React from "react";
import styles from "./Partners.module.css";
import PartnerForm from "./PartnerForm";

// Assets imports
import dev1 from "../../assets/New folder/dev1.png";
import dev2 from "../../assets/New folder/dev2.png";
import { TrendingUp, Coins, ClipboardList, Shield, MapPin, CreditCard } from "lucide-react";

const Partners: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Breadcrumb & Hero Section */}
      <section className={styles.heroSection}>
        <div className="ifix-container">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="breadcrumb">
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <a href="/">الرئيسية</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                كن شريكنا
              </li>
            </ol>
          </nav>

          <div className="row align-items-center g-5">
            {/* Right: Content */}
            <div className="col-12 col-lg-7 text-start">
              <h1 className={styles.heroTitle}>
                وسع أعمالك مع <span className={styles.brandHighlight}>IFIX</span> ووصل إلى المزيد من العملاء
              </h1>
              <p className={styles.heroSubtitle}>
                انضم إلى شبكة الفنيين ومراكز الصيانة المعتمدة في IFIX واستقبل طلبات جديدة، وأدر أعمالك بسهولة من خلال منصة واحدة.
              </p>
            </div>

            {/* Left: Shaking hands image */}
            <div className="col-12 col-lg-5 d-flex justify-content-center position-relative">
              <div className={styles.imageContainer}>
                <div className={styles.ringOuter}>
                  <div className={styles.ringInner}>
                    <img
                      src={dev1}
                      alt="مراكز صيانة معتمدة"
                      className={styles.heroImage}
                    />
                  </div>
                </div>
                {/* Floating Badge */}
                <div className={styles.floatingBadge}>
                  <span className={styles.badgeNumber}>+50</span>
                  <span className={styles.badgeText}>مراكز صيانة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curved Divider Shape */}
      <div className={styles.curveDivider}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
            className={styles.curvePath}
          ></path>
        </svg>
      </div>

      {/* Why Join Section */}
      <section className={styles.whyJoinSection}>
        <div className="ifix-container">
          {/* Section Header */}
          <div className="text-center mb-5">
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>🛠️</span> لماذا تنضم إلى <span className={styles.brandHighlight}>IFIX</span>؟
            </h2>
            <p className={styles.sectionSubtitle}>
              استفد من منصة متكاملة تساعدك على الوصول إلى عملاء جدد، وإدارة أعمالك بسهولة، وزيادة فرص نجاحك.
            </p>
          </div>

          {/* Core Layout: Cards and Center Image */}
          <div className={styles.featuresLayout}>
            {/* Right Features Column (Desktop) */}
            <div className={styles.featuresCol}>
              {/* Card 1 */}
              <div className={styles.featureCard} data-side="right">
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>زيادة الأرباح</h3>
                  <p className={styles.cardDescription}>
                    استقبل العديد من طلبات الصيانة لزيادة دخلك.
                  </p>
                </div>
                <div className={styles.cardIconWrapper}>
                  <TrendingUp className={styles.cardIcon} size={28} />
                </div>
                <div className={styles.wavyLineRight1}>
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M0,10 Q10,0 20,10 T40,10" stroke="#1450ff" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>

              {/* Card 2 */}
              <div className={styles.featureCard} data-side="right">
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>زيادة الدخل</h3>
                  <p className={styles.cardDescription}>
                    استقبل المزيد من الطلبات.
                  </p>
                </div>
                <div className={styles.cardIconWrapper}>
                  <Coins className={styles.cardIcon} size={28} />
                </div>
                <div className={styles.wavyLineRight2}>
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M0,10 Q10,20 20,10 T40,10" stroke="#1450ff" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>

              {/* Card 3 */}
              <div className={styles.featureCard} data-side="right">
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>إدارة الطلبات</h3>
                  <p className={styles.cardDescription}>
                    تابع الحجوزات وقم بتأكيدها أو إلغائها.
                  </p>
                </div>
                <div className={styles.cardIconWrapper}>
                  <ClipboardList className={styles.cardIcon} size={28} />
                </div>
                <div className={styles.wavyLineRight3}>
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M0,10 Q10,0 20,10 T40,10" stroke="#1450ff" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Central illustration */}
            <div className={styles.centerIllustrationContainer}>
              <div className={styles.illustrationWrapper}>
                <img
                  src={dev2}
                  alt="منصة صيانة متكاملة"
                  className={styles.centerIllustration}
                />
              </div>
            </div>

            {/* Left Features Column (Desktop) */}
            <div className={styles.featuresCol}>
              {/* Card 4 */}
              <div className={styles.featureCard} data-side="left">
                <div className={styles.wavyLineLeft1}>
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M40,10 Q30,0 20,10 T0,10" stroke="#1450ff" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  </svg>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>بناء سمعة قوية</h3>
                  <p className={styles.cardDescription}>
                    اجمع تقييمات العملاء لزيادة ثقة العملاء الجدد.
                  </p>
                </div>
                <div className={styles.cardIconWrapper}>
                  <Shield className={styles.cardIcon} size={28} />
                </div>
              </div>

              {/* Card 5 */}
              <div className={styles.featureCard} data-side="left">
                <div className={styles.wavyLineLeft2}>
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M40,10 Q30,20 20,10 T0,10" stroke="#1450ff" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  </svg>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>الظهور للعملاء القريبين</h3>
                  <p className={styles.cardDescription}>
                    اعرض خدماتك للعملاء حسب موقعهم الجغرافي.
                  </p>
                </div>
                <div className={styles.cardIconWrapper}>
                  <MapPin className={styles.cardIcon} size={28} />
                </div>
              </div>

              {/* Card 6 */}
              <div className={styles.featureCard} data-side="left">
                <div className={styles.wavyLineLeft3}>
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M40,10 Q30,0 20,10 T0,10" stroke="#1450ff" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  </svg>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>مدفوعات آمنة</h3>
                  <p className={styles.cardDescription}>
                    استلم مستحقاتك بسهولة.
                  </p>
                </div>
                <div className={styles.cardIconWrapper}>
                  <CreditCard className={styles.cardIcon} size={28} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className={styles.registrationSection}>
        <div className="ifix-container">
          <div className="row align-items-center g-5">
            {/* Right: Text Content */}
            <div className="col-12 col-lg-5 text-start">
              <h2 className={styles.regTitle}>جاهز لتنمية أعمالك؟</h2>
              <p className={styles.regSubtitle}>
                ابدأ رحلتك مع IFIX واستفد من الوصول إلى آلاف العملاء، وإدارة الحجوزات بسهولة، وبناء سمعة قوية من خلال التقييمات.
              </p>
            </div>

            {/* Left: Form Card */}
            <div className="col-12 col-lg-7">
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
