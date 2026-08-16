import { useState } from "react";
import photo from "../../assets/Group 15 (1).png";
import logo from "../../assets/image 3.png";
import styles from "./Login.module.css";
import { Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { login as loginService } from "../../Services/auth.service";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            phone: "",
            phoneCountryCode: "+20",
            password: "",
            rememberMe: false,
        },
        validationSchema: Yup.object({
            phone: Yup.string().required("رقم الهاتف مطلوب"),
            password: Yup.string().required("كلمة المرور مطلوبة"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await loginService({
                    phone: `${values.phoneCountryCode}${values.phone}`,
                    password: values.password,
                });
                console.log("User Login Data:", response);

                const token = response?.token;
                if (token) {
                    login(token);
                }

                toast.success("تم تسجيل الدخول بنجاح!");
                setTimeout(() => navigate("/"), 1000); // Redirect after login
            } catch (error: any) {
                console.error("Login error:", error);
                const message =
                    error?.response?.data?.message ||
                    "حدث خطأ أثناء تسجيل الدخول";
                toast.error(message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className={`container-fluid p-0 ${styles.pageWrapper}`} style={{ direction: "rtl", fontFamily: "sans-serif" }}>
            <div className="row g-0 w-100">
                {/* Right Side: Form (Rendered on the right in RTL) */}
                <div className={`col-12 col-md-8 bg-white ${styles.formSection}`}>
                    <div className="w-100 px-4 px-sm-5 py-5 mx-auto" style={{ maxWidth: "800px" }}>
                        {/* Logo */}
                        <div className="text-center mb-4">
                            <img src={logo} alt="Logo" style={{ height: "80px", objectFit: "contain" }} />
                        </div>

                        {/* Heading */}
                        <div className="text-center mb-4">
                            <h1 className="h2 fw-bold text-dark mb-2" style={{ fontSize: "32px" }}>مرحبًا بعودتك!</h1>
                            <p className="text-secondary" style={{ fontSize: "15px" }}>سجل الدخول للوصول إلى حسابك، متابعة طلبات الصيانة، وحجز خدمات جديدة بكل سهولة.</p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={formik.handleSubmit}>
                            {/* Phone */}
                            <div className="mb-3" style={{ textAlign: "right" }}>
                                <label htmlFor="phone" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                                    رقم الهاتف <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <select
                                        name="phoneCountryCode"
                                        className="form-select border-secondary-subtle bg-white"
                                        style={{ maxWidth: "110px", fontSize: "14px" }}
                                        value={formik.values.phoneCountryCode}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="+20">🇪🇬 +20</option>
                                        <option value="+966">🇸🇦 +966</option>
                                        <option value="+971">🇦🇪 +971</option>
                                        <option value="+965">🇰🇼 +965</option>
                                    </select>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className={`form-control border-secondary-subtle py-2 px-3 ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`}
                                        style={{ fontSize: "15px" }}
                                        placeholder="رقم الهاتف"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.phone && formik.errors.phone && (
                                    <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.phone}</div>
                                )}
                            </div>

                            {/* Password */}
                            <div className="mb-4" style={{ textAlign: "right" }}>
                                <label htmlFor="password" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                                    كلمة المرور <span className="text-danger">*</span>
                                </label>
                                <div className="position-relative d-flex align-items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className={`form-control border-secondary-subtle py-2 pe-3 ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                        style={{ fontSize: "15px", paddingLeft: "45px" }}
                                        placeholder="كلمة المرور"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <button
                                        type="button"
                                        className={styles.eyeButton}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{formik.errors.password}</div>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="d-flex justify-content-between align-items-center mb-4" style={{ fontSize: "14px", textAlign: "right" }}>
                                <div className="form-check d-flex align-items-center gap-2 m-0 p-0">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        name="rememberMe"
                                        className="form-check-input m-0"
                                        style={{ cursor: "pointer", width: "16px", height: "16px", float: "none" }}
                                        checked={formik.values.rememberMe}
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor="rememberMe" className="form-check-label text-secondary" style={{ cursor: "pointer" }}>
                                        تذكرني
                                    </label>
                                </div>
                                <Link to="/forgot-password" className="text-primary text-decoration-none fw-semibold">
                                    نسيت كلمة المرور؟
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary-premium w-100 py-3 fw-bold rounded-3"
                                style={{ fontSize: "16px" }}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="d-flex align-items-center my-4 text-secondary">
                            <hr className="flex-grow-1" />
                            <span className="px-3" style={{ fontSize: "14.5px" }}>ليس لديك حساب؟</span>
                            <hr className="flex-grow-1" />
                        </div>

                        {/* Register Button */}
                        <Link
                            to="/register"
                            className="btn btn-outline-premium w-100 py-2.5 fw-semibold rounded-3 mb-5 text-decoration-none d-block text-center"
                            style={{ fontSize: "15px" }}
                        >
                            إنشاء حساب
                        </Link>
                    </div>
                </div>

                {/* Left Side: Illustration Image */}
                <div className={`col-md-4 d-none d-md-flex align-items-center justify-content-center position-relative ${styles.imageSection}`}>
                    <img
                        src={photo}
                        alt="Login Illustration"
                        className={styles.illustrationImage}
                    />
                </div>
            </div>

            {/* Offcanvas Sidebar for Mobile Illustration */}
            <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="mobileIllustrationOffcanvas"
                aria-labelledby="mobileIllustrationOffcanvasLabel"
                style={{ width: "80%" }}
            >
                <div className="offcanvas-header border-bottom">
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className={styles.offcanvasBody}>
                    <img
                        src={photo}
                        alt="Login Illustration"
                        className={styles.illustrationImage}
                    />
                </div>
            </div>

            {/* Floating button for mobile offcanvas trigger */}
            <button
                type="button"
                className={`d-flex d-md-none ${styles.mobileIllustrationBtn}`}
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileIllustrationOffcanvas"
                title="عرض الصورة الإرشادية"
            >
                <ImageIcon size={24} />
            </button>
        </div>
    );
}

export default Login;