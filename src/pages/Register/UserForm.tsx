import { useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./Register.module.css";

function UserForm() {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneCountryCode, setPhoneCountryCode] = useState("+20");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [howDidYouHear, setHowDidYouHear] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!username || !phone || !email || !password || !confirmPassword || !howDidYouHear) {
            alert("يرجى ملء جميع الحقول المطلوبة");
            return;
        }
        if (password !== confirmPassword) {
            alert("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
            return;
        }
        if (!agreedToTerms) {
            alert("يجب الموافقة على الشروط والأحكام للبدء");
            return;
        }

        console.log("User Registration Data:", {
            userType: "customer",
            username,
            phone: `${phoneCountryCode}${phone}`,
            email,
            password,
            howDidYouHear,
            agreedToTerms
        });
        alert("تم إنشاء الحساب بنجاح (تجريبي)!");
    };

    return (
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

            {/* Phone Number */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label htmlFor="phone" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                    رقم الهاتف <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                    <select
                        className="form-select border-secondary-subtle bg-white"
                        style={{ maxWidth: "110px", fontSize: "14px" }}
                        value={phoneCountryCode}
                        onChange={(e) => setPhoneCountryCode(e.target.value)}
                    >
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+965">🇰🇼 +965</option>
                    </select>
                    <input
                        type="tel"
                        id="phone"
                        className="form-control border-secondary-subtle py-2 px-3"
                        style={{ fontSize: "15px" }}
                        placeholder="رقم الهاتف"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Email */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label htmlFor="email" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                    البريد الالكتروني <span className="text-danger">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    className="form-control border-secondary-subtle py-2 px-3"
                    style={{ fontSize: "15px" }}
                    placeholder="البريد الالكتروني -اسم المستخدم"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            {/* Password */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label htmlFor="password" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                    كلمة المرور <span className="text-danger">*</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control border-secondary-subtle py-2 pe-3"
                        style={{ fontSize: "15px", paddingLeft: "45px" }}
                        placeholder="يجب أن تتكون كلمة المرور من 8 أحرف على الأقل، وتحتوي على حرف كبير"
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

            {/* Confirm Password */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label htmlFor="confirmPassword" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                    تأكيد كلمة المرور <span className="text-danger">*</span>
                </label>
                <div className="position-relative d-flex align-items-center">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className="form-control border-secondary-subtle py-2 pe-3"
                        style={{ fontSize: "15px", paddingLeft: "45px" }}
                        placeholder="كرر كلمة المرور"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            {/* How Did You Hear About Us */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label htmlFor="howDidYouHear" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                    كيف سمعت عنا <span className="text-danger">*</span>
                </label>
                <select
                    id="howDidYouHear"
                    className="form-select border-secondary-subtle py-2 px-3 text-secondary"
                    style={{ fontSize: "15px" }}
                    value={howDidYouHear}
                    onChange={(e) => setHowDidYouHear(e.target.value)}
                    required
                >
                    <option value="" disabled>يرجى الاختيار</option>
                    <option value="facebook">فيسبوك</option>
                    <option value="google">بحث جوجل</option>
                    <option value="friend">صديق</option>
                    <option value="ads">إعلان</option>
                    <option value="other">أخرى</option>
                </select>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="form-check d-flex align-items-center gap-2 mb-4" style={{ textAlign: "right" }}>
                <input
                    type="checkbox"
                    id="terms"
                    className="form-check-input"
                    style={{ cursor: "pointer", width: "18px", height: "18px" }}
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    required
                />
                <label htmlFor="terms" className="form-check-label text-muted" style={{ cursor: "pointer", fontSize: "14px" }}>
                    أوافق على
                    <a href="#terms" className="text-primary text-decoration-none fw-semibold ms-1">الشروط والأحكام</a>
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm"
                style={{ backgroundColor: "#2b5adb", borderColor: "#2b5adb", fontSize: "16px" }}
            >
                إنشاء الحساب
            </button>
        </form>
    );
}

export default UserForm;