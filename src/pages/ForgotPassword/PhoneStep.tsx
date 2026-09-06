import { Field, ErrorMessage, Form} from "formik";
import * as Yup from "yup";

export interface ForgotPasswordValues {
    phone: string;
    phoneCountryCode: string;
    otp: string;
    password: string;
    confirmPassword: string;
}

export const phoneSchema = Yup.object({
    phone: Yup.string()
        .required("رقم الهاتف مطلوب")
        .matches(
            /^[0-9]+$/,
            "رقم الهاتف يجب أن يحتوي على أرقام فقط"
        ),
});

function PhoneStep() {
    return (
        <Form>
            <div
                className="mb-4"
                style={{ textAlign: "right" }}
            >
                <label
                    htmlFor="phone"
                    className="form-label fw-semibold text-dark mb-2"
                    style={{ fontSize: "14px" }}
                >
                    رقم الهاتف
                    <span className="text-danger"> *</span>
                </label>

                <div className="input-group">
                    <Field
                        as="select"
                        name="phoneCountryCode"
                        className="form-select border-secondary-subtle bg-white"
                        style={{
                            maxWidth: "110px",
                            fontSize: "14px",
                        }}
                    >
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+965">🇰🇼 +965</option>
                    </Field>

                    <Field
                        name="phone"
                        type="tel"
                        id="phone"
                        className="form-control border-secondary-subtle py-2 px-3 shadow-sm"
                        style={{ fontSize: "15px" }}
                        placeholder="رقم الهاتف"
                    />
                </div>

                <ErrorMessage name="phone">
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
                إرسال
            </button>
        </Form>
    );
}

export default PhoneStep;