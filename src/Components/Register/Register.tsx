import { useState } from "react";
import photo from "../../assets/Group 15 (1).png";
import logo from "../../assets/image 3.png";
import {
    User,
    Building2,
    Wrench,
    Image as ImageIcon
} from "lucide-react";
import styles from "./Register.module.css";
import UserForm from "./UserForm";
import TechnicianandCompanyForm from "./TechnicianandCompanyForm";

type UserType = "company" | "technician" | "customer";

function Register() {
    const [userType, setUserType] = useState<UserType | null>("customer");

    return (
        <div className={`container-fluid p-0 ${styles.pageWrapper}`}  style={{direction: "rtl",fontFamily: "sans-serif", }}
>
            <div className="row g-0 w-100">
                {/* Right Side: Form (Rendered on the right in RTL) */}
                <div className={`col-12 col-md-8 bg-white ${styles.formSection}`}>

                    <div className="w-100 px-4 px-sm-5 py-5 mx-auto" style={{ maxWidth: "800px" }}>


                        {/* Logo (Permanently visible at the top on all screens) */}
                        <div className="text-center mb-4">
                            <img src={logo} alt="Logo" style={{ height: "80px", objectFit: "contain" }} />
                        </div>

                        {/* Heading */}
                        <div className="text-center mb-4">
                            <h1 className="h2 fw-bold text-dark mb-2" style={{ fontSize: "32px" }}>إنشاء حساب</h1>
                            <p className="text-secondary" style={{ fontSize: "15px" }}>اختر نوع الحساب وأكمل بياناتك للبدء</p>
                        </div>

                        {/* User Type Selection Cards */}
                        <div className="d-flex gap-3 mb-4 justify-content-center align-items-stretch">
                            <button
                                type="button"
                                className={`btn flex-fill d-flex flex-column align-items-center justify-content-center p-3 border rounded-3 transition-all ${userType === "customer"
                                    ? "border-primary bg-primary-subtle text-primary fw-bold shadow-sm"
                                    : "border-secondary-subtle bg-white text-muted"
                                    }`}
                                style={{ transition: "all 0.2s ease-in-out" }}
                                onClick={() => setUserType("customer")}
                            >
                                <User size={28} className={userType === "customer" ? "text-primary" : "text-secondary"} />
                                <span className="mt-2" style={{ fontSize: "15px" }}>عميل</span>
                            </button>

                            <button
                                type="button"
                                className={`btn flex-fill d-flex flex-column align-items-center justify-content-center p-3 border rounded-3 transition-all ${userType === "technician"
                                    ? "border-primary bg-primary-subtle text-primary fw-bold shadow-sm"
                                    : "border-secondary-subtle bg-white text-muted"
                                    }`}
                                style={{ transition: "all 0.2s ease-in-out" }}
                                onClick={() => setUserType("technician")}
                            >
                                <Wrench size={28} className={userType === "technician" ? "text-primary" : "text-secondary"} />
                                <span className="mt-2" style={{ fontSize: "15px" }}>فني</span>
                            </button>

                            <button
                                type="button"
                                className={`btn flex-fill d-flex flex-column align-items-center justify-content-center p-3 border rounded-3 transition-all ${userType === "company"
                                    ? "border-primary bg-primary-subtle text-primary fw-bold shadow-sm"
                                    : "border-secondary-subtle bg-white text-muted"
                                    }`}
                                style={{ transition: "all 0.2s ease-in-out" }}
                                onClick={() => setUserType("company")}
                            >
                                <Building2 size={28} className={userType === "company" ? "text-primary" : "text-secondary"} />
                                <span className="mt-2" style={{ fontSize: "15px" }}>شركة / مركز</span>
                            </button>
                        </div>

                        {/* Conditionally Render Form based on user type */}
                        {userType === "customer" && <UserForm />}
                        {userType && userType !== "customer" && (
                            <TechnicianandCompanyForm userType={userType} />
                        )}

                        {/* Divider */}
                        <div className="d-flex align-items-center my-4 text-secondary">
                            <hr className="flex-grow-1" />
                            <span className="px-3" style={{ fontSize: "14.5px" }}>لديك حساب بالفعل ؟</span>
                            <hr className="flex-grow-1" />
                        </div>

                        {/* Login Button */}
                        <a
                            href="/login"
                            className="btn btn-outline-secondary w-100 py-2.5 fw-semibold border-secondary-subtle text-secondary rounded-3 mb-5"
                            style={{ fontSize: "15px" }}
                        >
                            تسجيل دخول
                        </a>
                    </div>
                </div>

                {/* Left Side: Illustration Image (Desktop & Tablet only, rendered on the left in RTL) */}
                <div className={`col-md-4 d-none d-md-flex align-items-center justify-content-center position-relative ${styles.imageSection}`}>
                    <img
                        src={photo}
                        alt="Register Illustration"
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
                        alt="Register Illustration"
                        className={styles.illustrationImage}
                    // style={{ maxWidth: "100%", maxHeight: "90%" }}
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

export default Register;