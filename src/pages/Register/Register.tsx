import photo from "../../assets/Group 15 (1).png";
import logo from "../../assets/image 3.png";
import { Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import UserForm from "./UserForm";

function Register() {
    return (
        <div
            className={`container-fluid p-0 ${styles.pageWrapper}`}
            style={{
                direction: "rtl",
                fontFamily: "sans-serif",
            }}
        >
            <div className="row g-0 w-100">

                {/* Right Side: Form */}
                <div
                    className={`col-12 col-md-8 bg-white ${styles.formSection}`}
                >
                    <div
                        className="w-100 px-4 px-sm-5 py-5 mx-auto"
                        style={{ maxWidth: "800px" }}
                    >

                        {/* Logo */}
                        <div className="text-center mb-4">
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    height: "80px",
                                    objectFit: "contain",
                                }}
                            />
                        </div>

                        {/* Heading */}
                        <div className="text-center mb-4">
                            <h1
                                className="h2 fw-bold text-dark mb-2"
                                style={{ fontSize: "32px" }}
                            >
                                إنشاء حساب
                            </h1>

                            <p
                                className="text-secondary"
                                style={{ fontSize: "15px" }}
                            >
                                أكمل بياناتك لإنشاء حساب جديد
                            </p>
                        </div>

                        {/* User Form */}
                        <UserForm />

                        {/* Divider */}
                        <div className="d-flex align-items-center my-4 text-secondary">
                            <hr className="flex-grow-1" />

                            <span
                                className="px-3"
                                style={{ fontSize: "14.5px" }}
                            >
                                لديك حساب بالفعل ؟
                            </span>

                            <hr className="flex-grow-1" />
                        </div>

                        {/* Login Button */}
                        <Link
                            to="/login"
                            className="btn btn-outline-premium w-100 py-2.5 fw-semibold rounded-3 mb-5 d-block text-center text-decoration-none"
                            style={{ fontSize: "15px" }}
                        >
                            تسجيل دخول
                        </Link>

                    </div>
                </div>

                {/* Left Side: Illustration */}
                <div
                    className={`col-md-4 d-none d-md-flex align-items-center justify-content-center position-relative ${styles.imageSection}`}
                >
                    <img
                        src={photo}
                        alt="Register Illustration"
                        className={styles.illustrationImage}
                    />
                </div>
            </div>

            {/* Mobile Illustration Offcanvas */}
            <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="mobileIllustrationOffcanvas"
                aria-labelledby="mobileIllustrationOffcanvasLabel"
                style={{ width: "80%" }}
            >
                <div className="offcanvas-header border-bottom">
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>

                <div className={styles.offcanvasBody}>
                    <img
                        src={photo}
                        alt="Register Illustration"
                        className={styles.illustrationImage}
                    />
                </div>
            </div>

            {/* Mobile Illustration Button */}
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