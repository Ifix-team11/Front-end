import { useState } from "react";
import type { FormEvent } from "react";
import photo from "../../assets/Group 15 (1).png";
import logo from "../../assets/image 3.png";
import styles from "./Login.module.css";
import { Image as ImageIcon, Eye, EyeOff } from "lucide-react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            alert("يرجى ملء جميع الحقول المطلوبة");
            return;
        }

        console.log("User Login Data:", {
            username,
            password,
            rememberMe,
        });
        alert("تم تسجيل الدخول بنجاح (تجريبي)!");
    };

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
                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <div className="mb-3" style={{ textAlign: "right" }}>
                                <label htmlFor="username" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                                    اسم المستخدم <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control border-secondary-subtle py-2 px-3"
                                    style={{ fontSize: "15px" }}
                                    placeholder="اسم المستخدم"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
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
                                        className="form-control border-secondary-subtle py-2 pe-3"
                                        style={{ fontSize: "15px", paddingLeft: "45px" }}
                                        placeholder="كلمة المرور"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={styles.eyeButton}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="d-flex justify-content-between align-items-center mb-4" style={{ fontSize: "14px", textAlign: "right" }}>
                                <div className="form-check d-flex align-items-center gap-2 m-0 p-0">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        className="form-check-input m-0"
                                        style={{ cursor: "pointer", width: "16px", height: "16px", float: "none" }}
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label htmlFor="rememberMe" className="form-check-label text-secondary" style={{ cursor: "pointer" }}>
                                        تذكرني
                                    </label>
                                </div>
                                <a href="/forgot-password" className="text-primary text-decoration-none fw-semibold">
                                    نسيت كلمة المرور؟
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm"
                                style={{ backgroundColor: "#2b5adb", borderColor: "#2b5adb", fontSize: "16px" }}
                            >
                                تسجيل الدخول
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="d-flex align-items-center my-4 text-secondary">
                            <hr className="flex-grow-1" />
                            <span className="px-3" style={{ fontSize: "14.5px" }}>ليس لديك حساب؟</span>
                            <hr className="flex-grow-1" />
                        </div>

                        {/* Register Button */}
                        <a
                            href="/register"
                            className="btn btn-outline-secondary w-100 py-2.5 fw-semibold border-secondary-subtle text-secondary rounded-3 mb-5"
                            style={{ fontSize: "15px" }}
                        >
                            إنشاء حساب
                        </a>
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