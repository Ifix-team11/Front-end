import { useState } from "react";
import type { FormEvent } from "react";
import photo from "../../assets/Group 15 (1).png";
import logo from "../../assets/image 3.png";
import styles from "../Login/Login.module.css";
import { Image as ImageIcon, Eye, EyeOff, ArrowLeft } from "lucide-react";

function ForgotPassword() {
    const [step, setStep] = useState(1);
    
    // Step 1: Email
    const [email, setEmail] = useState("");
    
    // Step 2: OTP
    const [otp, setOtp] = useState("");
    
    // Step 3: New Password
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleEmailSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!email) {
            alert("يرجى إدخال البريد الإلكتروني");
            return;
        }
        setStep(2);
    };

    const handleOtpSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!otp) {
            alert("يرجى إدخال رمز التحقق");
            return;
        }
        setStep(3);
    };

    const handlePasswordSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            alert("يرجى إدخال كلمة المرور وتأكيدها");
            return;
        }
        if (password !== confirmPassword) {
            alert("كلمة المرور غير متطابقة");
            return;
        }
        alert("تم تغيير كلمة المرور بنجاح!");
        window.location.href = "/login";
    };

    return (
        <div className={`container-fluid p-0 ${styles.pageWrapper}`} style={{ direction: "rtl", fontFamily: "sans-serif" }}>
            <div className="row g-0 w-100">
                {/* Right Side: Form */}
                <div className={`col-12 col-md-8 bg-white ${styles.formSection} position-relative`}>
                    
                    {/* Back to login (Top Right/Left based on RTL) */}
                    <div className="position-absolute top-0 end-0 p-4 d-none d-sm-block">
                        <a href="/login" className="text-secondary text-decoration-none d-flex align-items-center gap-2" style={{ fontSize: "14px", fontWeight: "500" }}>
                            العودة لتسجيل الدخول
                            <ArrowLeft size={16} className="bg-light rounded text-dark p-1" style={{ width: "24px", height: "24px" }} />
                        </a>
                    </div>
                    {/* Mobile Back Button */}
                    <div className="p-3 d-sm-none w-100 d-flex justify-content-end">
                        <a href="/login" className="text-secondary text-decoration-none d-flex align-items-center gap-2" style={{ fontSize: "14px", fontWeight: "500" }}>
                            العودة لتسجيل الدخول
                            <ArrowLeft size={16} className="bg-light rounded text-dark p-1" style={{ width: "24px", height: "24px" }} />
                        </a>
                    </div>

                    <div className="w-100 px-4 px-sm-5 py-4 mx-auto" style={{ maxWidth: "500px", marginTop: "40px" }}>
                        {/* Logo */}
                        <div className="text-center mb-4">
                            <img src={logo} alt="Logo" style={{ height: "60px", objectFit: "contain" }} />
                        </div>

                        {/* Headings */}
                        <div className="text-center mb-4">
                            <h1 className="h3 fw-bold text-dark mb-2">
                                {step === 1 && "هل نسيت كلمة المرور"}
                                {step === 2 && "أدخل رمز التحقق"}
                                {step === 3 && "تعيين كلمة مرور جديدة"}
                            </h1>
                            <p className="text-secondary mt-3" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                                {step === 1 && "أدخل بريدك الإلكتروني المرتبط بحسابك، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور."}
                                {step === 2 && "أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني"}
                                {step === 3 && "أدخل كلمة المرور الجديدة وقم بتأكيدها"}
                            </p>
                        </div>

                        {/* Stepper Visual */}
                        <div className="d-flex justify-content-center gap-2 mb-5">
                            <div className="rounded-pill" style={{ height: "6px", width: "60px", backgroundColor: step >= 1 ? "#2b5adb" : "#e5e4e7", transition: "background-color 0.3s" }}></div>
                            <div className="rounded-pill" style={{ height: "6px", width: "60px", backgroundColor: step >= 2 ? "#2b5adb" : "#e5e4e7", transition: "background-color 0.3s" }}></div>
                            <div className="rounded-pill" style={{ height: "6px", width: "60px", backgroundColor: step >= 3 ? "#2b5adb" : "#e5e4e7", transition: "background-color 0.3s" }}></div>
                        </div>

                        {/* Forms */}
                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit}>
                                <div className="mb-4" style={{ textAlign: "right" }}>
                                    <label htmlFor="email" className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "13px" }}>
                                        البريد الالكتروني <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control border-secondary-subtle py-2 px-3 shadow-sm"
                                        style={{ fontSize: "14px", borderRadius: "8px" }}
                                        placeholder="البريد الالكتروني - اسم المستخدم"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 shadow-sm"
                                    style={{ backgroundColor: "#2b5adb", borderColor: "#2b5adb", fontSize: "15px" }}
                                >
                                    إرسال
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleOtpSubmit}>
                                <div className="mb-4" style={{ textAlign: "right" }}>
                                    <label htmlFor="otp" className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "13px" }}>
                                        رمز التحقق <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="otp"
                                        className="form-control border-secondary-subtle py-2 px-3 shadow-sm text-center"
                                        style={{ fontSize: "16px", borderRadius: "8px", letterSpacing: "4px" }}
                                        placeholder="XXXXXX"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 shadow-sm"
                                    style={{ backgroundColor: "#2b5adb", borderColor: "#2b5adb", fontSize: "15px" }}
                                >
                                    تحقق
                                </button>
                            </form>
                        )}

                        {step === 3 && (
                            <form onSubmit={handlePasswordSubmit}>
                                {/* Password */}
                                <div className="mb-3" style={{ textAlign: "right" }}>
                                    <label htmlFor="password" className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "13px" }}>
                                        كلمة المرور الجديدة <span className="text-danger">*</span>
                                    </label>
                                    <div className="position-relative d-flex align-items-center">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            className="form-control border-secondary-subtle py-2 pe-3 shadow-sm"
                                            style={{ fontSize: "14px", paddingLeft: "45px", borderRadius: "8px" }}
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
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4" style={{ textAlign: "right" }}>
                                    <label htmlFor="confirmPassword" className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "13px" }}>
                                        تأكيد كلمة المرور <span className="text-danger">*</span>
                                    </label>
                                    <div className="position-relative d-flex align-items-center">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            className="form-control border-secondary-subtle py-2 pe-3 shadow-sm"
                                            style={{ fontSize: "14px", paddingLeft: "45px", borderRadius: "8px" }}
                                            placeholder="تأكيد كلمة المرور"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.eyeButton}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 shadow-sm"
                                    style={{ backgroundColor: "#2b5adb", borderColor: "#2b5adb", fontSize: "15px" }}
                                >
                                    حفظ كلمة المرور
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Left Side: Illustration Image */}
                <div className={`col-md-4 d-none d-md-flex align-items-center justify-content-center position-relative ${styles.imageSection}`}>
                    <img
                        src={photo}
                        alt="Forgot Password Illustration"
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
                        alt="Forgot Password Illustration"
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

export default ForgotPassword;
