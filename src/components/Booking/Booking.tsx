import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../../api/ordersApi";
import "./Booking.css";

const Booking = () => {
  const navigate = useNavigate();

  const { service, technicianId } = useParams<{
    service: string;
    technicianId: string;
  }>();

  /* =====================================================
     SERVICE
  ===================================================== */

  const serviceNames: Record<string, string> = {
    electricity: "كهرباء",
    plumbing: "سباكة",
    carpentry: "نجارة",
    painting: "أعمال الدهان",
    appliances: "أجهزة منزلية",
    pestcontrol: "مكافحة الحشرات",
  };

  const serviceType = serviceNames[service || ""] || "خدمة صيانة";

  /* =====================================================
     STATES
  ===================================================== */

  const [scheduledDate, setScheduledDate] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  const [problemDescription, setProblemDescription] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const [voiceNote, setVoiceNote] = useState<File | undefined>();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  /* =====================================================
     TIME OPTIONS
  ===================================================== */

  const timeOptions = [
    {
      id: "morning",
      label: "صباحاً",
      time: "(8 ص - 12 م)",
    },
    {
      id: "afternoon",
      label: "ظهراً",
      time: "(12 م - 5 م)",
    },
    {
      id: "evening",
      label: "مساءً",
      time: "(5 م - 9 م)",
    },
  ];

  /* =====================================================
     IMAGES
  ===================================================== */

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length > 5) {
      setError("يمكنك رفع 5 صور كحد أقصى");
      setImages([]);
      return;
    }

    setImages(selectedImages);
    setError("");
  };

  /* =====================================================
     VOICE
  ===================================================== */

  const handleVoiceNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setVoiceNote(undefined);
      return;
    }

    setVoiceNote(file);
    setError("");
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    /* DATE */

    if (!scheduledDate) {
      setError("من فضلك اختر موعد الخدمة");
      return;
    }

    /* TIME */

    if (!selectedTime) {
      setError("من فضلك اختر الوقت المناسب");
      return;
    }

    /* DESCRIPTION */

    if (!problemDescription.trim()) {
      setError("من فضلك اكتب وصف المشكلة");
      return;
    }

    try {
      setLoading(true);

      /*
        تحويل الوقت المختار إلى وقت فعلي
        علشان الـ API يستقبل scheduledAt بصيغة ISO
      */

      let hours = 8;

      if (selectedTime === "afternoon") {
        hours = 12;
      }

      if (selectedTime === "evening") {
        hours = 17;
      }

      const [year, month, day] = scheduledDate.split("-").map(Number);

      const serviceDate = new Date(year, month - 1, day, hours, 0, 0);

      const result = await createOrder({
        serviceType,

        scheduledAt: serviceDate.toISOString(),

        problemDescription: problemDescription.trim(),

        images: images.length > 0 ? images : undefined,

        voiceNote,
      });

      console.log("Order created:", result);
      console.log("Technician ID:", technicianId);

      setShowSuccess(true);
    } catch (error) {
      console.error("Create order error:", error);

      setError(
        error instanceof Error ? error.message : "حدث خطأ أثناء إرسال الطلب",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     CANCEL
  ===================================================== */

  const handleCancel = () => {
    navigate(-1);
  };

  /* =====================================================
     CLOSE SUCCESS
  ===================================================== */

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="booking-page" dir="rtl">
      {/* =================================================
          OVERLAY
      ================================================= */}

      <div className="booking-overlay">
        {/* =================================================
            BOOKING MODAL
        ================================================= */}

        <div className="booking-modal">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="booking-header">
            <button
              type="button"
              className="booking-close"
              onClick={handleCancel}
              aria-label="إغلاق"
            >
              ×
            </button>

            <div className="booking-header-title">
              <h1>طلب خدمة</h1>

              <span className="booking-plus">+</span>
            </div>
          </div>

          {/* =================================================
              SUBTITLE
          ================================================= */}

          <p className="booking-subtitle">اختر الخدمة المناسبة وحدد الموعد</p>

          <form onSubmit={handleSubmit}>
            {/* =================================================
                SERVICE
            ================================================= */}

            <div className="booking-field">
              <label>
                اختر الخدمة
                <span className="required">*</span>
              </label>

              <div className="booking-select-wrapper">
                <select value={service || ""} onChange={() => {}} disabled>
                  <option value={service || ""}>{serviceType}</option>
                </select>

                <span className="booking-select-arrow">⌄</span>
              </div>
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="booking-field">
              <label htmlFor="problemDescription">اوصف لنا المشكلة</label>

              <textarea
                id="problemDescription"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="اوصف لنا المشكلة بالتفصيل، يساعدك الفني بشكل أفضل."
                rows={4}
              />
            </div>

            {/* =================================================
                DATE
            ================================================= */}

            <div className="booking-field">
              <label htmlFor="scheduledDate">
                اختر الموعد
                <span className="required">*</span>
              </label>

              <div className="booking-date-wrapper">
                <input
                  id="scheduledDate"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />

                {!scheduledDate && (
                  <span className="booking-date-placeholder">اختر التاريخ</span>
                )}
              </div>
            </div>

            {/* =================================================
                TIME
            ================================================= */}

            <div className="booking-field">
              <label>
                الوقت المفضل
                <span className="required">*</span>
              </label>

              <div className="booking-time-options">
                {timeOptions.map((option) => (
                  <button
                    type="button"
                    key={option.id}
                    className={`booking-time-option ${
                      selectedTime === option.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedTime(option.id)}
                  >
                    <span>{option.label}</span>

                    <small>{option.time}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                IMAGES
            ================================================= */}

            <div className="booking-field">
              <label htmlFor="images">
                ارفع صور العطل
                <span className="required">*</span>
              </label>

              <label htmlFor="images" className="booking-upload-box">
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                />

                <span className="booking-upload-icon">♧</span>

                {images.length === 0 ? (
                  <span>
                    ارفع الصورة أو
                    <strong> اسحبها</strong>
                  </span>
                ) : (
                  <span className="booking-files-selected">
                    تم اختيار {images.length} صور
                  </span>
                )}

                <small>يمكنك رفع 5 صور كحد أقصى</small>
              </label>
            </div>

            {/* =================================================
                VOICE NOTE
            ================================================= */}

            <div className="booking-voice-box">
              <div className="booking-voice-header">
                <div>
                  <strong>إضافة رسالة صوتية ووصف المشكلة (اختياري)</strong>

                  <small>سجل رسالة صوتية قصيرة توضح المشكلة</small>
                </div>

                <span className="booking-mic-icon">🎙</span>
              </div>

              <label htmlFor="voiceNote" className="booking-voice-upload">
                <input
                  id="voiceNote"
                  type="file"
                  accept="audio/*"
                  onChange={handleVoiceNoteChange}
                />

                <span className="booking-record-button">🎙</span>

                <span>
                  {voiceNote ? voiceNote.name : "اضغط هنا لرفع تسجيل"}
                </span>
              </label>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && <div className="booking-error">{error}</div>}

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="booking-actions">
              <button
                type="submit"
                className="booking-submit"
                disabled={loading}
              >
                {loading ? "جاري الإرسال..." : "إرسال"}
              </button>

              <button
                type="button"
                className="booking-cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =====================================================
          SUCCESS MODAL
      ===================================================== */}

      {showSuccess && (
        <div className="booking-success-overlay">
          <div
            className="booking-success-modal"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="booking-success-close"
              onClick={handleCloseSuccess}
            >
              ×
            </button>

            <div className="booking-success-icon">✓</div>

            <h2>تم إرسال طلبك بنجاح</h2>

            <p>تم إرسال طلب صيانة {serviceType} بنجاح</p>

            <div className="booking-success-info">
              <span>الخدمة</span>

              <strong>{serviceType}</strong>
            </div>

            <div className="booking-success-buttons">
              <button type="button" onClick={() => navigate("/orders")}>
                الذهاب إلى حجوزاتي
              </button>

              <button type="button" onClick={() => navigate("/")}>
                العودة للرئيسية
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Booking;
