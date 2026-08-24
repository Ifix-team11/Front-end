import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, MapPin, UploadCloud, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import styles from "./Partners.module.css";

const PartnerForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Custom file states for visual feedback
  const [commercialRegisterFile, setCommercialRegisterFile] = useState<File | null>(null);
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      phoneCountryCode: "+966",
      email: "",
      password: "",
      confirmPassword: "",
      specialty: "",
      city: "",
      detailedLocation: "",
      howDidYouHear: "",
      agreeToTerms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("اسم المنشأة أو الاسم مطلوب"),
      phone: Yup.string()
        .matches(/^\d+$/, "يجب إدخال أرقام فقط")
        .required("رقم الهاتف مطلوب"),
      email: Yup.string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      password: Yup.string()
        .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
        .required("كلمة المرور مطلوبة"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "كلمة المرور وتأكيد كلمة المرور غير متطابقين")
        .required("تأكيد كلمة المرور مطلوب"),
      specialty: Yup.string().required("يرجى اختيار التخصص"),
      city: Yup.string().required("يرجى اختيار المدينة"),
      detailedLocation: Yup.string().required("يرجى كتابة الموقع بالتفصيل"),
      howDidYouHear: Yup.string().required("يرجى إخبارنا كيف سمعت عنا"),
      agreeToTerms: Yup.boolean().oneOf([true], "يجب الموافقة على شروط الانضمام"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Mock API request
      setTimeout(() => {
        console.log("Form values:", values, {
          commercialRegisterFile,
          identityFile,
          logoFile,
        });
        toast.success("تم إرسال طلب الانضمام بنجاح! سنتواصل معك قريباً.");
        resetForm();
        setCommercialRegisterFile(null);
        setIdentityFile(null);
        setLogoFile(null);
        setSubmitting(false);
      }, 1500);
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
      toast.success(`تم اختيار ملف: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className={styles.formCard}>
      <h3 className={styles.formCardTitle}>قدّم طلب الانضمام</h3>
      <p className={styles.formCardSubtitle}>
        املأ النموذج التالي وسنتواصل معك خلال 24 ساعة لاستكمال إجراءات الانضمام
      </p>

      <form onSubmit={formik.handleSubmit} className="mt-4">
        {/* Name Field */}
        <div className="mb-3 text-start">
          <label htmlFor="name" className={styles.formLabel}>
            اسم المنشأة / الاسم <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="مثال: مركز صيانة السيارات أو أحمد علي"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
              {formik.errors.name}
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-3 text-start">
          <label htmlFor="phone" className={styles.formLabel}>
            رقم الهاتف <span className="text-danger">*</span>
          </label>
          <div className="input-group" dir="ltr">
            <select
              name="phoneCountryCode"
              className="form-select"
              style={{ maxWidth: "110px", fontSize: "14px" }}
              value={formik.values.phoneCountryCode}
              onChange={formik.handleChange}
            >
              <option value="+966">🇸🇦 +966</option>
              <option value="+20">🇪🇬 +20</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+965">🇰🇼 +965</option>
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control text-start"
              placeholder="5xxxxxxxx"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
              {formik.errors.phone}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-3 text-start">
          <label htmlFor="email" className={styles.formLabel}>
            البريد الإلكتروني <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control text-start"
            placeholder="example@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-3 text-start">
          <label htmlFor="password" className={styles.formLabel}>
            كلمة المرور <span className="text-danger">*</span>
          </label>
          <div className="position-relative d-flex align-items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="form-control text-start pe-5"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
              {formik.errors.password}
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-3 text-start">
          <label htmlFor="confirmPassword" className={styles.formLabel}>
            تأكيد كلمة المرور <span className="text-danger">*</span>
          </label>
          <div className="position-relative d-flex align-items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="form-control text-start pe-5"
              placeholder="••••••••"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        {/* Specialty Field */}
        <div className="mb-3 text-start">
          <label htmlFor="specialty" className={styles.formLabel}>
            التخصصات <span className="text-danger">*</span>
          </label>
          <select
            id="specialty"
            name="specialty"
            className="form-select"
            value={formik.values.specialty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">اختر التخصص...</option>
            <option value="electricity">كهرباء</option>
            <option value="plumbing">سباكة</option>
            <option value="carpentry">نجارة</option>
            <option value="painting">دهانات</option>
            <option value="appliances">أجهزة منزلية</option>
            <option value="pestcontrol">مكافحة حشرات</option>
          </select>
          {formik.touched.specialty && formik.errors.specialty && (
            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
              {formik.errors.specialty}
            </div>
          )}
        </div>

        {/* City Field */}
        <div className="mb-3 text-start">
          <label htmlFor="city" className={styles.formLabel}>
            المدينة <span className="text-danger">*</span>
          </label>
          <select
            id="city"
            name="city"
            className="form-select"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">اختر المدينة...</option>
            <option value="riyadh">الرياض</option>
            <option value="jeddah">جدة</option>
            <option value="dammam">الدمام</option>
            <option value="makkah">مكة المكرمة</option>
            <option value="madinah">المدينة المنورة</option>
          </select>
          {formik.touched.city && formik.errors.city && (
            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
              {formik.errors.city}
            </div>
          )}
        </div>

        {/* Detailed Location Field */}
        <div className="mb-3 text-start">
          <label htmlFor="detailedLocation" className={styles.formLabel}>
            الموقع بالتفصيل <span className="text-danger">*</span>
          </label>
          <div className="position-relative d-flex align-items-center">
            <input
              type="text"
              id="detailedLocation"
              name="detailedLocation"
              className="form-control pe-5"
              placeholder="الحي، اسم الشارع، رقم المبنى"
              value={formik.values.detailedLocation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className={styles.inputIcon}>
              <MapPin size={18} className="text-muted" />
            </span>
          </div>
          {formik.touched.detailedLocation && formik.errors.detailedLocation && (
            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
              {formik.errors.detailedLocation}
            </div>
          )}
        </div>

        {/* Documents Upload Section */}
        <div className="mb-4 text-start">
          <label className={styles.formLabel}>الوثائق</label>
          <div className="row g-2 mt-1">
            {/* Commercial Register Upload */}
            <div className="col-4">
              <label className={styles.uploadBox}>
                <input
                  type="file"
                  className="d-none"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(e, setCommercialRegisterFile)}
                />
                {commercialRegisterFile ? (
                  <div className={styles.uploadSuccess}>
                    <CheckCircle size={22} className="text-success mb-1" />
                    <span className={styles.uploadText} title={commercialRegisterFile.name}>
                      تم الرفع
                    </span>
                  </div>
                ) : (
                  <>
                    <UploadCloud size={22} className="text-muted mb-1" />
                    <span className={styles.uploadText}>السجل التجاري</span>
                  </>
                )}
              </label>
            </div>

            {/* ID Upload */}
            <div className="col-4">
              <label className={styles.uploadBox}>
                <input
                  type="file"
                  className="d-none"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(e, setIdentityFile)}
                />
                {identityFile ? (
                  <div className={styles.uploadSuccess}>
                    <CheckCircle size={22} className="text-success mb-1" />
                    <span className={styles.uploadText} title={identityFile.name}>
                      تم الرفع
                    </span>
                  </div>
                ) : (
                  <>
                    <UploadCloud size={22} className="text-muted mb-1" />
                    <span className={styles.uploadText}>الهوية / الإقامة</span>
                  </>
                )}
              </label>
            </div>

            {/* Logo Upload */}
            <div className="col-4">
              <label className={styles.uploadBox}>
                <input
                  type="file"
                  className="d-none"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(e, setLogoFile)}
                />
                {logoFile ? (
                  <div className={styles.uploadSuccess}>
                    <CheckCircle size={22} className="text-success mb-1" />
                    <span className={styles.uploadText} title={logoFile.name}>
                      تم الرفع
                    </span>
                  </div>
                ) : (
                  <>
                    <UploadCloud size={22} className="text-muted mb-1" />
                    <span className={styles.uploadText}>الشعار (اختياري)</span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* How did you hear field */}
        <div className="mb-4 text-start">
          <label htmlFor="howDidYouHear" className={styles.formLabel}>
            كيف سمعت عنا؟ <span className="text-danger">*</span>
          </label>
          <select
            id="howDidYouHear"
            name="howDidYouHear"
            className="form-select"
            value={formik.values.howDidYouHear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">اختر إجابة...</option>
            <option value="social">مواقع التواصل الاجتماعي</option>
            <option value="google">بحث جوجل</option>
            <option value="friend">عن طريق صديق</option>
            <option value="ads">إعلانات الطرق</option>
            <option value="other">أخرى</option>
          </select>
          {formik.touched.howDidYouHear && formik.errors.howDidYouHear && (
            <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
              {formik.errors.howDidYouHear}
            </div>
          )}
        </div>

        {/* Agree to terms checkbox */}
        <div className="mb-4 text-start">
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              className="form-check-input"
              style={{ cursor: "pointer" }}
              checked={formik.values.agreeToTerms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="agreeToTerms" className="form-check-label text-muted" style={{ cursor: "pointer", fontSize: "14px" }}>
              أوافق على شروط الانضمام والخدمة
            </label>
          </div>
          {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
            <div className="text-danger mt-2" style={{ fontSize: "13px" }}>
              {formik.errors.agreeToTerms}
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary-premium w-100 py-3 fw-bold rounded-3"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "جاري إرسال الطلب..." : "إرسال طلب الانضمام"}
        </button>
      </form>
    </div>
  );
};

export default PartnerForm;
