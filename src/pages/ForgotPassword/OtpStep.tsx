import React, { useRef } from "react";
import { ErrorMessage, Form, useFormikContext } from "formik";
import type { ForgotPasswordValues } from "./PhoneStep";

function OtpStep() {
    const { values, setFieldValue } = useFormikContext<ForgotPasswordValues>();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return;

        const newOtp = (values.otp || "").split("");
        newOtp[index] = value.slice(-1);
        const joinedOtp = newOtp.join("");
        setFieldValue("otp", joinedOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            const newOtp = (values.otp || "").split("");
            if (!newOtp[index] && index > 0) {
                newOtp[index - 1] = "";
                setFieldValue("otp", newOtp.join(""));
                inputRefs.current[index - 1]?.focus();
            } else {
                newOtp[index] = "";
                setFieldValue("otp", newOtp.join(""));
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pastedData) {
            setFieldValue("otp", pastedData);
            const focusIndex = Math.min(pastedData.length, 5);
            inputRefs.current[focusIndex]?.focus();
        }
    };

    return (
        <Form>
            <div
                className="mb-4"
                style={{ textAlign: "right" }}
            >
                <label
                    className="form-label fw-semibold text-dark mb-3"
                    style={{ fontSize: "13px" }}
                >
                    رمز التحقق
                    <span className="text-danger"> *</span>
                </label>

                <div className="d-flex justify-content-center gap-2 mb-2" dir="ltr">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className="form-control border-secondary-subtle shadow-sm text-center fw-bold"
                            style={{
                                width: "45px",
                                height: "50px",
                                fontSize: "20px",
                                borderRadius: "8px",
                            }}
                            value={values.otp[index] || ""}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                        />
                    ))}
                </div>

                <ErrorMessage name="otp">
                    {(msg) => (
                        <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                            {msg}
                        </div>
                    )}
                </ErrorMessage>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100 py-2.5 fw-bold rounded-3 shadow-sm"
                style={{
                    backgroundColor: "#2b5adb",
                    borderColor: "#2b5adb",
                    fontSize: "15px",
                }}
            >
                تحقق
            </button>
        </Form>
    );
}

export default OtpStep;