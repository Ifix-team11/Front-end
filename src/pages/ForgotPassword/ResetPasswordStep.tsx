import { Field, ErrorMessage, Form } from "formik";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import styles from "../Login/Login.module.css";

function ResetPasswordStep() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    return (
        <Form>
            {/* Password */}

            <div
                className="mb-3"
                style={{ textAlign: "right" }}
            >
                <label
                    htmlFor="password"
                    className="form-label fw-semibold text-dark mb-2"
                    style={{ fontSize: "13px" }}
                >
                    كلمة المرور الجديدة
                    <span className="text-danger">*</span>
                </label>

                <div className="position-relative">
                    <Field
                        name="password"
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        id="password"
                        className="form-control border-secondary-subtle py-2 pe-3 shadow-sm"
                        style={{
                            fontSize: "14px",
                            paddingLeft: "45px",
                            borderRadius: "8px",
                        }}
                        placeholder="كلمة المرور"
                    />

                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <ErrorMessage name="password">
                    {(msg) => (
                        <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                            {msg}
                        </div>
                    )}
                </ErrorMessage>
            </div>

            {/* Confirm Password */}

            <div
                className="mb-4"
                style={{ textAlign: "right" }}
            >
                <label
                    htmlFor="confirmPassword"
                    className="form-label fw-semibold text-dark mb-2"
                    style={{ fontSize: "13px" }}
                >
                    تأكيد كلمة المرور
                    <span className="text-danger">*</span>
                </label>

                <div className="position-relative">
                    <Field
                        name="confirmPassword"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        id="confirmPassword"
                        className="form-control border-secondary-subtle py-2 pe-3 shadow-sm"
                        style={{
                            fontSize: "14px",
                            paddingLeft: "45px",
                            borderRadius: "8px",
                        }}
                        placeholder="تأكيد كلمة المرور"
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
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <ErrorMessage name="confirmPassword">
                    {(msg) => (
                        <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                            {msg}
                        </div>
                    )}
                </ErrorMessage>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm"
                style={{
                    backgroundColor: "#2b5adb",
                    borderColor: "#2b5adb",
                    fontSize: "15px",
                }}
            >
                حفظ كلمة المرور
            </button>
        </Form>
    );
}

export default ResetPasswordStep;