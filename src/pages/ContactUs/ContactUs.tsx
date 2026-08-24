import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PhoneCall, Mail, Map } from "lucide-react";
import styles from "./ContactUs.module.css";
import toast from "react-hot-toast";

const ContactUs = () => {
  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("الاسم الكامل مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    message: Yup.string().required("يرجى كتابة رسالتك"),
  });

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    // Mock API call
    setTimeout(() => {
      console.log("Form Values:", values);
      toast.success("تم إرسال رسالتك بنجاح. سنقوم بالرد عليك قريباً.");
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="ifix-container">
        {/* Header Banner */}
        <div className={styles.headerBanner}>
          <h1 className={styles.headerTitle}>
            <span>تواصل معنا</span>
            <svg
              className="ms-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "inline-block", verticalAlign: "middle", transform: "rotate(90deg)" }}
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="#ffb400"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h1>
          <p className={styles.headerSubtitle}>
            نحن هنا للإجابة عن استفساراتك ومساعدتك في أي وقت.
            <br />
            تواصل معنا بالطريقة التي تناسبك.
          </p>
        </div>

        {/* Main Content: Form & Map */}
        <div className={styles.mainContainer}>
          <div className="row g-4 align-items-stretch">
            {/* Form Section (Right side in RTL) */}
            <div className="col-12 col-lg-6">
              <div className="pe-lg-4">
                <h2 className={styles.formTitle}>كيف يمكننا مساعدتك؟</h2>
                <p className={styles.formSubtitle}>
                  شاركنا استفسارك أو مشكلتك، وسنعمل على الرد عليك في أسرع وقت.
                </p>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        <label
                          htmlFor="fullName"
                          className="form-label text-dark mb-1"
                          style={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          أدخل اسمك الكامل
                        </label>
                        <Field
                          type="text"
                          id="fullName"
                          name="fullName"
                          className="form-control"
                          placeholder="مثلا : احمد علي"
                          style={{ fontSize: "14px", padding: "10px 15px" }}
                        />
                        <ErrorMessage name="fullName">
                          {(msg) => (
                            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="form-label text-dark mb-1"
                          style={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          الايميل
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="form-control text-start"
                          dir="ltr"
                          placeholder="example@gmail.com"
                          style={{ fontSize: "14px", padding: "10px 15px" }}
                        />
                        <ErrorMessage name="email">
                          {(msg) => (
                            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="message"
                          className="form-label text-dark mb-1"
                          style={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          الرسالة
                        </label>
                        <Field
                          as="textarea"
                          id="message"
                          name="message"
                          className="form-control"
                          rows={4}
                          placeholder="اكتب رسالتك هنا .."
                          style={{ fontSize: "14px", padding: "10px 15px", resize: "none" }}
                        />
                        <ErrorMessage name="message">
                          {(msg) => (
                            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary-premium w-100 py-3 fw-bold rounded-3"
                        disabled={isSubmitting}
                        style={{ fontSize: "16px" }}
                      >
                        {isSubmitting ? "جاري الإرسال..." : "ارسال"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* Map Section (Left side in RTL) */}
            <div className="col-12 col-lg-6">
              <div className={styles.mapContainer}>
                {/* Embedded Google Map Example centered roughly around Riyadh or general view */}
                <iframe
                  title="Ifix Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231878.89240801826!2d46.541484088015494!3d24.755490795551916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1707000000000!5m2!1sen!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="row g-4">
          {/* Location */}
          <div className="col-12 col-md-4">
            <div className={styles.infoCard}>
              <div className={styles.infoContent}>
                <span className={styles.infoTitle}>الموقع</span>
                <span className={styles.infoValue}>شارع السلام ,الرياض</span>
              </div>
              <div className={styles.infoIcon}>
                <Map size={24} />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="col-12 col-md-4">
            <div className={styles.infoCard}>
              <div className={styles.infoContent}>
                <span className={styles.infoTitle}>الايميل</span>
                <span className={styles.infoValue} style={{ fontFamily: "sans-serif" }}>info@gmail.com</span>
              </div>
              <div className={styles.infoIcon}>
                <Mail size={24} />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="col-12 col-md-4">
            <div className={styles.infoCard}>
              <div className={styles.infoContent}>
                <span className={styles.infoTitle}>رقم الهاتف</span>
                <span className={styles.infoValue} style={{ fontFamily: "sans-serif" }}>243342342</span>
              </div>
              <div className={styles.infoIcon}>
                <PhoneCall size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
