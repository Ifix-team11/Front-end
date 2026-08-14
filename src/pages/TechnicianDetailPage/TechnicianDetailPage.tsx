import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import TechnicianCard from "../../components/TechnicianCard/TechnicianCard";
import { technicians, reviews, brandLogos } from "../../data/mockData";
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
  ["السبت", "10:00 - 6 م"],
  ["الاحد", "10:00 - 6 م"],
  ["الاتنين", "10:00 - 6 م"],
  ["الثلاثاء", "10:00 - 6 م"],
  ["الاربعاء", "10:00 - 6 م"],
  ["الخميس", "10:00 - 6 م"],
  ["الجمعة", "اجازة"],
];

const trustChecks = [
  "تقديم مستندات وتوثيق جميع المؤهلات والخبرات",
  "الالتزام مع جميع الشروط والاحكام",
  "التحقق من الهوية الشخصية والمهنية",
  "سنوات خبرة موثقة داخل المجال المهني",
];

const TechnicianDetailPage = () => {
  const { id } = useParams();
  const technician =
    technicians.find((t) => t.id === id) ?? technicians[0];
  const related = technicians
    .filter((t) => t.id !== technician.id)
    .slice(0, 2);

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={`ifix-container ${styles.content}`}>
        <div className={styles.breadcrumb}>
          <Link to="/">الرئيسية</Link> /{" "}
          <Link to="/technicians">الفنيين</Link> /{" "}
          <span>تفاصيل الفني</span>
        </div>

        <div className={styles.layout}>
          {/* main content (right side) */}
          <div className={styles.main}>
            <div className={styles.headerCard}>
              <div className={styles.headerTop}>
                <div className={styles.identity}>
                  <div>
                    <h1 className={styles.name}>{technician.name}</h1>
                    <span className={styles.specialty}>
                      {technician.specialty}
                    </span>
                  </div>
                  <img
                    src={technician.avatar}
                    alt={technician.name}
                    className={styles.avatarLg}
                  />
                </div>
                <div className={styles.iconBtns}>
                  <span className={styles.iconBtn}>♡</span>
                  <span className={styles.iconBtn}>⇪</span>
                </div>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>تقييم العملاء</span>
                  <span className={styles.statValue}>★ {technician.rating}</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>سنوات الخبرة</span>
                  <span className={styles.statValue}>4 سنوات</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>مواعيد العمل</span>
                  <span className={styles.statValue}>10 ص - 6 م</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statLabel}>المنطقة</span>
                  <span className={styles.statValue}>الزراليق، شبرا</span>
                </div>
              </div>

              <div className={styles.btnRow}>
                <button className={styles.btnBook}>احجز الان</button>
                <button className={styles.btnContact}>
                  تواصل مع الفني ✆
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>نبذة عن الفني</h2>
              <p className={styles.aboutText}>
                فني متخصص باصلاح جميع انواع الاجهزة الكهربائية والمنزلية،
                يمتلك خبرة واسعة في التشخيص والاصلاح السريع، ويحرص علي
                الالتزام بالمواعيد وتقديم خدمة احترافية وضمان علي كل قطعة
                غيار يتم تركيبها لعملائه الكرام.
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
                {related.map((t) => (
                  <TechnicianCard key={t.id} technician={t} />
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

export default TechnicianDetailPage;
