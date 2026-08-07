import styles from "./Footer.module.css";

const exploreLinks = ["الرئيسية", "العروض", "الخدمات", "كن شريكنا"];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`ifix-container ${styles.top}`}>
        <div className={styles.brandCol}>
          <span className={styles.logo}>
            i<span className={styles.logoAccent}>FIX</span>
          </span>
          <p className={styles.desc}>
            نقدم منصة موحدة تهدف الي تسهيل الوصول الي افضل الفنيين والمراكز
            المعتمدة، لتحصل علي خدمة صيانة سريعة وموثوقة اينما كنت.
          </p>
        </div>

        <div>
          <div className={styles.colTitle}>استكشف</div>
          <ul className={styles.linkList}>
            {exploreLinks.map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>تواصل معنا</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div className={styles.contactRow}>
              <span className={styles.iconCircle}>@</span>
              info@ifix.com
            </div>
            <div className={styles.contactRow}>
              <span className={styles.iconCircle}>☎</span>
              +٩٦٦ ١٢٣ ٤٥٦٧
            </div>
          </div>
        </div>

        <div>
          <div className={styles.colTitle}>تابعنا</div>
          <div className={styles.socialRow}>
            <span className={styles.socialIcon} style={{ background: "#25D366" }}>
              W
            </span>
            <span
              className={styles.socialIcon}
              style={{
                background:
                  "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
              }}
            >
              IG
            </span>
            <span className={styles.socialIcon} style={{ background: "#000" }}>
              X
            </span>
            <span className={styles.socialIcon} style={{ background: "#111" }}>
              TT
            </span>
          </div>
        </div>
      </div>

      <div className={`ifix-container ${styles.divider}`}>
        جميع الحقوق محفوظة © iFix {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
