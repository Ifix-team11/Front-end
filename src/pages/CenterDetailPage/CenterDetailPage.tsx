import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import CenterCard from "../../components/CenterCard/CenterCard";
import { serviceCenters, reviews, brandLogos } from "../../data/mockData";
import styles from "../../components/ProfileDetail/ProfileDetail.module.css";

const servicesList = [
  "صيانة غسالة اوتوماتيك",
  "صيانة ثلاجة",
  "صيانة تكييف",
  "صيانة سخان",
  "صيانة بوتاجاز",
];

const features = [
  "يصل الي المنزل خلال 3 ساعات",
  "محفظ دفع الكتروني",
  "مرخص من الجهات الرسمية",
  "احترام المواعيد وسرعة الانجاز",
];

const schedule = [
  ["السبت", "8:00 - 16:00"],
  ["الاحد", "8:00 - 16:00"],
  ["الاتنين", "8:00 - 16:00"],
  ["الثلاثاء", "8:00 - 16:00"],
  ["الاربعاء", "8:00 - 16:00"],
  ["الخميس", "8:00 - 16:00"],
  ["الجمعة", "اجازة"],
];

const trustChecks = [
  "خدمات متخصصة توفير قطع الغيار الاصلية",
  "التحقق من الهوية والسجل التجاري",
  "الترخيص من الجهات الرسمية",
  "تدريب مستمر لفريق الصيانة",
];

const CenterDetailPage = () => {
  const { id } = useParams();
  const center = serviceCenters.find((c) => c.id === id) ?? serviceCenters[0];
  const related = serviceCenters.filter((c) => c.id !== center.id).slice(0, 2);

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={`ifix-container ${styles.content}`}>
        <div className={styles.breadcrumb}>
          <Link to="/">الرئيسية</Link> / <Link to="/centers">المراكز</Link> /{" "}
          <span>تفاصيل مركز الصيانة</span>
        </div>

        <div className={styles.layout}>
          {/* main content (right side) */}
          <div className={styles.main}>
            <div className={styles.headerCard}>
              <div className={styles.headerTop}>
                <div className={styles.identity}>
                  <div>
                    <h1 className={styles.name}>{center.name}</h1>
                    <span className={styles.specialty}>{center.specialty}</span>
                  </div>
                  <div className={styles.logoLg}>{center.logo}</div>
                </div>
                <div className={styles.iconBtns}>
                  <span className={styles.iconBtn}>♡</span>
                  <span className={styles.iconBtn}>⇪</span>
                </div>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>تقييم العملاء</span>
                  <span className={styles.statValue}>★ {center.rating}</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>عدد الطلبات</span>
                  <span className={styles.statValue}>+١٥٠٠ طلب</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>سنوات الخبرة</span>
                  <span className={styles.statValue}>4 سنوات</span>
                </div>
              </div>

              <div className={styles.btnRow}>
                <button className={styles.btnBook}>احجز الان</button>
                <button className={styles.btnContact}>
                  تواصل مع المركز ✆
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>نبذة عن المركز</h2>
              <p className={styles.aboutText}>
                من اقدم مراكز صيانة جميع انواع الاجهزة الكهربائية والمنزلية،
                نمتلك فريق عمل مدرب علي اعلي مستوي مع ضمان علي كل قطعة
                غيار يتم تركيبها، نسعي دائما لتقديم خدمة سريعة وموثوقة
                باسعار مناسبة وجودة في العمل تناسب جميع عملائنا.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>التقييمات والمعايير</h2>
              <div className={styles.checksGrid}>
                {trustChecks.map((c) => (
                  <div className={styles.checkItem} key={c}>
                    <span className={styles.checkIcon}>✔</span>
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                العلامات التجارية التي يتعامل معها
              </h2>
              <div className={styles.brandsRow}>
                {brandLogos.map((logo, i) => (
                  <span className={styles.brandLogo} key={i}>
                    {logo}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>اراء العملاء</h2>
              <div>
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            </div>

            <div>
              <h2 className={styles.sectionTitle}>قد يعجبك ايضا</h2>
              <div className={styles.similarRow}>
                {related.map((c) => (
                  <CenterCard key={c.id} center={c} />
                ))}
              </div>
            </div>
          </div>

          {/* sidebar (left side) */}
          <div className={styles.sidebar}>
            <div className={styles.sideCard}>
              <div className={styles.sideCardHead}>
                <span className={styles.sideCardTitle}>خدمات بأسعارها</span>
                <div className={styles.iconBtns}>
                  <span className={styles.iconBtn}>♡</span>
                  <span className={styles.iconBtn}>⇪</span>
                </div>
              </div>
              {servicesList.map((s) => (
                <div className={styles.serviceItem} key={s}>
                  <span className={styles.serviceName}>🔧 {s}</span>
                  <span className={styles.servicePrice}>من 200 جنيه</span>
                </div>
              ))}
              <span className={styles.showAllLink}>عرض جميع الخدمات</span>
            </div>

            <div className={styles.sideCard}>
              <div className={styles.sideCardHead}>
                <span className={styles.sideCardTitle}>مميزات التعامل</span>
              </div>
              {features.map((f) => (
                <div className={styles.featureItem} key={f}>
                  <span className={styles.featureCheck}>✔</span>
                  {f}
                </div>
              ))}
            </div>

            <div className={styles.sideCard}>
              <div className={styles.sideCardHead}>
                <span className={styles.sideCardTitle}>ساعات العمل</span>
              </div>
              {schedule.map(([day, hours]) => (
                <div className={styles.scheduleRow} key={day}>
                  <span className={styles.scheduleDay}>{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>

            <div className={styles.guaranteeCard}>
              <span className={styles.guaranteeIcon}>🛡</span>
              <div className={styles.guaranteeText}>
                ضمان الخدمة
                <small>جميع الخدمات مشمولة بضمان 3 اشهر</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CenterDetailPage;
