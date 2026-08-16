import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import styles from "./Register.module.css";
import { register } from "../../Services/auth.service";

function UserForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            phone: "",
            phoneCountryCode: "+20",
            email: "",
            password: "",
            confirmPassword: "",
            howDidYouHear: "",
            agreedToTerms: false,
        },

        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("اسم المستخدم مطلوب"),

            phone: Yup.string()
                .required("رقم الهاتف مطلوب"),

            email: Yup.string()
                .email("البريد الإلكتروني غير صحيح")
                .required("البريد الإلكتروني مطلوب"),

            password: Yup.string()
                .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
                .required("كلمة المرور مطلوبة"),

            confirmPassword: Yup.string()
                .oneOf(
                    [Yup.ref("password")],
                    "كلمة المرور وتأكيد كلمة المرور غير متطابقين"
                )
                .required("تأكيد كلمة المرور مطلوب"),

            howDidYouHear: Yup.string()
                .required("يرجى اختيار كيف سمعت عنا"),

            agreedToTerms: Yup.boolean()
                .oneOf(
                    [true],
                    "يجب الموافقة على الشروط والأحكام"
                ),
        }),

        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await register({
                    fullName: values.fullName,
                    email: values.email,
                    phone: `${values.phoneCountryCode}${values.phone}`,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    role: "CUSTOMER",
                    howDidYouHear: values.howDidYouHear,
                });

                console.log("Register response:", response);

                toast.success("تم إنشاء الحساب بنجاح!");
                setTimeout(() => navigate("/login"), 1000);
            } catch (error: any) {
                console.error("Register error:", error);

                const message =
                    error?.response?.data?.message ||
                    "حدث خطأ أثناء إنشاء الحساب";

                toast.error(message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
       <>
        <form onSubmit={formik.handleSubmit}>

            {/* Username */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label
                    htmlFor="fullName"
                    className="form-label fw-semibold text-dark mb-1"
                    style={{ fontSize: "14px" }}
                >
                    اسم المستخدم{" "}
                    <span className="text-danger">*</span>
                </label>

                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-control border-secondary-subtle py-2 px-3"
                    style={{ fontSize: "15px" }}
                    placeholder="اسم المستخدم"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.fullName &&
                    formik.errors.fullName && (
                        <div className="text-danger mt-1">
                            {formik.errors.fullName}
                        </div>
                    )}
            </div>

            {/* Phone */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label
                    htmlFor="phone"
                    className="form-label fw-semibold text-dark mb-1"
                    style={{ fontSize: "14px" }}
                >
                    رقم الهاتف{" "}
                    <span className="text-danger">*</span>
                </label>

                <div className="input-group">
                    <select
                        name="phoneCountryCode"
                        className="form-select border-secondary-subtle bg-white"
                        style={{
                            maxWidth: "110px",
                            fontSize: "14px",
                        }}
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
                        className="form-control border-secondary-subtle py-2 px-3"
                        style={{ fontSize: "15px" }}
                        placeholder="رقم الهاتف"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>

                {formik.touched.phone &&
                    formik.errors.phone && (
                        <div className="text-danger mt-1">
                            {formik.errors.phone}
                        </div>
                    )}
            </div>

            {/* Email */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label
                    htmlFor="email"
                    className="form-label fw-semibold text-dark mb-1"
                    style={{ fontSize: "14px" }}
                >
                    البريد الإلكتروني{" "}
                    <span className="text-danger">*</span>
                </label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control border-secondary-subtle py-2 px-3"
                    style={{ fontSize: "15px" }}
                    placeholder="البريد الإلكتروني"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.email &&
                    formik.errors.email && (
                        <div className="text-danger mt-1">
                            {formik.errors.email}
                        </div>
                    )}
            </div>

            {/* Password */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label
                    htmlFor="password"
                    className="form-label fw-semibold text-dark mb-1"
                    style={{ fontSize: "14px" }}
                >
                    كلمة المرور{" "}
                    <span className="text-danger">*</span>
                </label>

                <div className="position-relative d-flex align-items-center">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-control border-secondary-subtle py-2 pe-3"
                        style={{
                            fontSize: "15px",
                            paddingLeft: "45px",
                        }}
                        placeholder="كلمة المرور"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>

                {formik.touched.password &&
                    formik.errors.password && (
                        <div className="text-danger mt-1">
                            {formik.errors.password}
                        </div>
                    )}
            </div>

            {/* Confirm Password */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label
                    htmlFor="confirmPassword"
                    className="form-label fw-semibold text-dark mb-1"
                    style={{ fontSize: "14px" }}
                >
                    تأكيد كلمة المرور{" "}
                    <span className="text-danger">*</span>
                </label>

                <div className="position-relative d-flex align-items-center">
                    <input
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control border-secondary-subtle py-2 pe-3"
                        style={{
                            fontSize: "15px",
                            paddingLeft: "45px",
                        }}
                        placeholder="كرر كلمة المرور"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>

                {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                        <div className="text-danger mt-1">
                            {formik.errors.confirmPassword}
                        </div>
                    )}
            </div>

            {/* How Did You Hear */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label
                    htmlFor="howDidYouHear"
                    className="form-label fw-semibold text-dark mb-1"
                    style={{ fontSize: "14px" }}
                >
                    كيف سمعت عنا{" "}
                    <span className="text-danger">*</span>
                </label>

                <select
                    id="howDidYouHear"
                    name="howDidYouHear"
                    className="form-select border-secondary-subtle py-2 px-3 text-secondary"
                    style={{ fontSize: "15px" }}
                    value={formik.values.howDidYouHear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="" disabled>
                        يرجى الاختيار
                    </option>

                    <option value="facebook">فيسبوك</option>
                    <option value="google">بحث جوجل</option>
                    <option value="friend">صديق</option>
                    <option value="ads">إعلان</option>
                    <option value="other">أخرى</option>
                </select>

                {formik.touched.howDidYouHear &&
                    formik.errors.howDidYouHear && (
                        <div className="text-danger mt-1">
                            {formik.errors.howDidYouHear}
                        </div>
                    )}
            </div>

            
            {/* <div
                className="form-check d-flex align-items-center gap-2 mb-4"
                style={{ textAlign: "right" }}
            >
                <input
                    type="checkbox"
                    id="agreedToTerms"
                    name="agreedToTerms"
                    className="form-check-input"
                    style={{
                        cursor: "pointer",
                        width: "18px",
                        height: "18px",
                    }}
                    checked={formik.values.agreedToTerms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <label
                    htmlFor="agreedToTerms"
                    className="form-check-label text-muted"
                    style={{
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    أوافق على
                    <a
                        href="#terms"
                        className="text-primary text-decoration-none fw-semibold ms-1"
                    >
                        الشروط والأحكام
                    </a>
                </label>
            </div>

            {formik.touched.agreedToTerms &&
                formik.errors.agreedToTerms && (
                    <div className="text-danger mb-3">
                        {formik.errors.agreedToTerms}
                    </div>
                )} */}
                <div className="mb-4" style={{ textAlign: "right" }}>

    <div className="d-flex align-items-center gap-2">

        <input
            type="checkbox"
            id="agreedToTerms"
            name="agreedToTerms"
            className="form-check-input m-0"
            style={{
                cursor: "pointer",
                width: "18px",
                height: "18px",
                flexShrink: 0,
            }}
            checked={formik.values.agreedToTerms}
            onChange={(e) =>
                formik.setFieldValue(
                    "agreedToTerms",
                    e.target.checked
                )
            }
            onBlur={formik.handleBlur}
        />

        <span
            style={{
                fontSize: "14px",
                color: "#6c757d",
            }}
        >
            أوافق على{" "}
            <a
                href="#terms"
                className="text-primary text-decoration-none fw-semibold"
            >
                الشروط والأحكام
            </a>
        </span>

    </div>

    {formik.touched.agreedToTerms &&
        formik.errors.agreedToTerms && (
            <div className="text-danger mt-2">
                {formik.errors.agreedToTerms}
            </div>
        )}

</div>

            {/* Submit */}
            <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn btn-primary-premium w-100 py-3 fw-bold rounded-3"
                style={{
                    fontSize: "16px",
                }}
            >
                {formik.isSubmitting
                    ? "جاري إنشاء الحساب..."
                    : "إنشاء الحساب"}
                    
            </button>
        </form>
        
       </>

        
    );
}

export default UserForm;