import "./HowItWorks.css";

import number1 from "../../assets/images/Frame -1.png";
import number2 from "../../assets/images/Frame -2.png";
import number3 from "../../assets/images/Frame -3.png";
import number4 from "../../assets/images/Frame -4.png";

import handIcon from "../../assets/SVG/hand-pointing-down-02.svg";

type Step = {
  id: number;
  title: string;
  description: string;
  numberImage: string;
};

const steps: Step[] = [
  {
    id: 1,
    numberImage: number1,
    title: "اختر الفني",
    description:
      "استعرض قائمة الفنيين المتاحين حسب التقييمات، اختر الفني المناسب.",
  },
  {
    id: 2,
    numberImage: number2,
    title: "أرسل طلب الصيانة",
    description: "حدد نوع الجهاز والمشكلة، واختر الموعد المناسب لزيارة الفني.",
  },
  {
    id: 3,
    numberImage: number3,
    title: "استقبل الفني",
    description:
      "سيصل الفني في الموعد المحدد، ويقوم بفحص الجهاز ومعالجة المشكلة باحترافية.",
  },
  {
    id: 4,
    numberImage: number4,
    title: "استمتع بالضمان",
    description:
      "احصل على ضمان لمدة 3 شهور على الخدمة لضمان تجربة مريحة وآمنة.",
  },
];

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.5v-1.1a5.2 5.2 0 0 1 5.2-5.2h2.6a5.2 5.2 0 0 1 5.2 5.2v1.1" />
      <path d="M5.8 10.7a2.6 2.6 0 0 0-2.3 2.6M18.2 10.7a2.6 2.6 0 0 1 2.3 2.6" />
    </svg>
  );
}

function FlowArrow() {
  return (
    <svg className="flow-arrow" viewBox="0 0 125 48">
      <path d="M119 11C94 2 91 37 57 26C43 21 38 13 22 16" />
      <path d="M28 11L21 16L29 21" />
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section className="how-it-works py-5" dir="rtl">
      <div className="container">
        {/* Header */}
        <header className="text-center mb-5">
          <h2 className="fw-bold d-flex justify-content-center align-items-center gap-2">
            <img src={handIcon} alt="" className="title-icon" />
            كيف يعمل IFIX
          </h2>

          <p className=" mt-3">
            نقدم مجموعة واسعة من خدمات الصيانة والإصلاح
          </p>
        </header>

        {/* Steps */}
        <div className="row g-4 justify-content-center">
          {steps.map((step, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={step.id}>
              <article className="how-step text-center position-relative">
                <div className="step-icon mx-auto mb-4 position-relative">
                  <UsersIcon />

                  <img
                    className="step-number"
                    src={step.numberImage}
                    alt={`step ${step.id}`}
                  />
                </div>

                {index !== steps.length - 1 && <FlowArrow />}

                <h3 className="fs-5 fw-bold">{step.title}</h3>

                <p className="small text-white-50">{step.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>

      <svg
        className="bottom-wave"
        viewBox="0 0 1086 35"
        preserveAspectRatio="none"
      >
        <path
          d="M0 25 L0 35 H1086 V27 C893 31 664 31 544 28 C493 27 473 15 467 8 C457 0 317 14 0 25Z"
          fill="#fff"
        />
      </svg>
    </section>
  );
}
