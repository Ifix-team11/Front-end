import { useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./Register.module.css";

interface TechnicianandCompanyFormProps {
    userType: "technician" | "company";
}

function TechnicianandCompanyForm({ userType }: TechnicianandCompanyFormProps) {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneCountryCode, setPhoneCountryCode] = useState("+20");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [specialization, setSpecialization] = useState("");
    const [city, setCity] = useState("");
    const [locationDetails, setLocationDetails] = useState("");
    const [nationalIdFile, setNationalIdFile] = useState<File | null>(null);
    const [certificateFile, setCertificateFile] = useState<File | null>(null);
    const [commercialRegisterFile, setCommercialRegisterFile] = useState<File | null>(null);
    const [licenseFile, setLicenseFile] = useState<File | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [howDidYouHear, setHowDidYouHear] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (
            !username ||
            !phone ||
            !email ||
            !password ||
            !confirmPassword ||
            !specialization ||
            !city ||
            !locationDetails ||
            !howDidYouHear
        ) {
            alert("يرجى ملء جميع الحقول المطلوبة الأساسية");
            return;
        }

        if (userType === "technician" && (!nationalIdFile || !certificateFile)) {
            alert("يرجى رفع الوثائق المطلوبة للفني (البطاقة وشهادة التخصص)");
            return;
        }

        if (userType === "company" && (!commercialRegisterFile || !licenseFile || !logoFile)) {
            alert("يرجى رفع الوثائق المطلوبة للشركة (سجل تجاري، رخصة، وشعار)");
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

        console.log("Technician/Company Registration Data:", {
            userType,
            username,
            phone: `${phoneCountryCode}${phone}`,
            email,
            password,
            specialization,
            city,
            locationDetails,
            ...(userType === "technician"
                ? { nationalIdFile: nationalIdFile?.name, certificateFile: certificateFile?.name }
                : { commercialRegisterFile: commercialRegisterFile?.name, licenseFile: licenseFile?.name, logoFile: logoFile?.name }
            ),
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

            {/* Specialization (التخصص) */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label htmlFor="specialization" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                    التخصص <span className="text-danger">*</span>
                </label>
                <select
                    id="specialization"
                    className="form-select border-secondary-subtle py-2 px-3 text-secondary"
                    style={{ fontSize: "15px" }}
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                >
                    <option value="" disabled>اختر التخصص</option>
                    <option value="electricity">كهرباء</option>
                    <option value="plumbing">سباكة</option>
                    <option value="air-conditioning">تكييف وتبريد</option>
                    <option value="carpentry">نجارة</option>
                    <option value="appliances">صيانة أجهزة منزلية</option>
                    <option value="painting">نقاشة ودهانات</option>
                    <option value="blacksmithing">حدادة</option>
                    <option value="other">أخرى</option>
                </select>
            </div>

            {/* City (المدينة) */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label htmlFor="city" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                    المدينة <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    id="city"
                    className="form-control border-secondary-subtle py-2 px-3"
                    style={{ fontSize: "15px" }}
                    placeholder="المدينة"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </div>

            {/* Detailed Location (الموقع بالتفصيل) */}
            <div className="mb-3" style={{ textAlign: "right" }}>
                <label htmlFor="locationDetails" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                    الموقع بالتفصيل <span className="text-danger">*</span>
                </label>
                <textarea
                    id="locationDetails"
                    className="form-control border-secondary-subtle py-2 px-3"
                    style={{ fontSize: "15px", minHeight: "80px" }}
                    placeholder="المنطقة، الشارع، رقم المبنى، المعالم المميزة..."
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                    required
                />
            </div>

            {userType === "technician" ? (
                <>
                    {/* National ID Upload (صورة البطاقة) */}
                    <div className="mb-3" style={{ textAlign: "right" }}>
                        <label htmlFor="nationalIdFile" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                            صورة البطاقة الشخصية <span className="text-danger">*</span>
                        </label>
                        <input
                            type="file"
                            id="nationalIdFile"
                            className="form-control border-secondary-subtle py-2 px-3"
                            style={{ fontSize: "15px" }}
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setNationalIdFile(e.target.files[0]);
                                }
                            }}
                            required
                        />
                    </div>

                    {/* Specialization Certificate Upload (شهادة التخصص) */}
                    <div className="mb-3" style={{ textAlign: "right" }}>
                        <label htmlFor="certificateFile" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                            شهادة التخصص <span className="text-danger">*</span>
                        </label>
                        <input
                            type="file"
                            id="certificateFile"
                            className="form-control border-secondary-subtle py-2 px-3"
                            style={{ fontSize: "15px" }}
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setCertificateFile(e.target.files[0]);
                                }
                            }}
                            required
                        />
                    </div>
                </>
            ) : (
                <>
                    {/* Commercial Register Upload (سجل تجاري) */}
                    <div className="mb-3" style={{ textAlign: "right" }}>
                        <label htmlFor="commercialRegisterFile" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                            صورة السجل التجاري <span className="text-danger">*</span>
                        </label>
                        <input
                            type="file"
                            id="commercialRegisterFile"
                            className="form-control border-secondary-subtle py-2 px-3"
                            style={{ fontSize: "15px" }}
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setCommercialRegisterFile(e.target.files[0]);
                                }
                            }}
                            required
                        />
                    </div>

                    {/* License Upload (رخصة) */}
                    <div className="mb-3" style={{ textAlign: "right" }}>
                        <label htmlFor="licenseFile" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                            صورة الرخصة <span className="text-danger">*</span>
                        </label>
                        <input
                            type="file"
                            id="licenseFile"
                            className="form-control border-secondary-subtle py-2 px-3"
                            style={{ fontSize: "15px" }}
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setLicenseFile(e.target.files[0]);
                                }
                            }}
                            required
                        />
                    </div>

                    {/* Logo Upload (شعار) */}
                    <div className="mb-3" style={{ textAlign: "right" }}>
                        <label htmlFor="logoFile" className="form-label fw-semibold text-dark mb-1" style={{ fontSize: "14px" }}>
                            شعار الشركة <span className="text-danger">*</span>
                        </label>
                        <input
                            type="file"
                            id="logoFile"
                            className="form-control border-secondary-subtle py-2 px-3"
                            style={{ fontSize: "15px" }}
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setLogoFile(e.target.files[0]);
                                }
                            }}
                            required
                        />
                    </div>
                </>
            )}

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

export default TechnicianandCompanyForm;