import "./WhyIFix.css";
import whyImage from "../../assets/images/Rectangle 3.png";
import handIcon from "../../assets/SVG/hand-pointing-down-01.svg";

const features: string[] = [
  "خدمة سريعة",
  "ضمان لمدة 3 أشهر",
  "أسعار شفافة",
  "دعم متواصل",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.2 2.3 2.3 4.8-5" />
    </svg>
  );
}

export default function WhyIFix() {
  return (
    <section className="why-ifix" dir="rtl">
      <div className="container why-ifix-container">
        <div className="why-ifix-grid">
          <div className="why-content">
            <header>
              <h2>
                <span aria-hidden="true">
                  <img src={handIcon} alt="" />
                </span>{" "}
                لماذا تختار IFIX
              </h2>
              <p>
                نوفر لك تجربة صيانة موثوقة تجمع بين الجودة، السرعة، والاحترافية
                لضمان راحتك.
              </p>
            </header>

            <div className="features-list">
              {features.map((feature) => (
                <div className="feature-item" key={feature}>
                  <CheckIcon />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <img
            className="why-image"
            src={whyImage}
            alt="فني صيانة يستخدم أدواته"
          />
        </div>
      </div>
    </section>
  );
}
