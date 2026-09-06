import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById, type Order } from "../../api/ordersApi";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // Fetch Order Details
  // ===============================

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        setError("رقم الطلب غير موجود");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log("Fetching Order:", id);

        const result = await getOrderById(id);

        console.log("Order Details:", result);

        setOrder(result.order);
      } catch (err) {
        console.error("Get Order Details Error:", err);

        const message =
          err instanceof Error ? err.message : "حدث خطأ أثناء جلب تفاصيل الطلب";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // ===============================
  // Format Date
  // ===============================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // ===============================
  // Status Text
  // ===============================

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "قيد الانتظار";

      case "ACCEPTED":
        return "تم القبول";

      case "REJECTED":
        return "مرفوض";

      case "IN_PROGRESS":
        return "جاري التنفيذ";

      case "COMPLETED":
        return "تم التنفيذ";

      case "CANCELLED":
        return "ملغي";

      default:
        return status;
    }
  };

  // ===============================
  // Status Class
  // ===============================

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "status-pending";

      case "ACCEPTED":
        return "status-accepted";

      case "REJECTED":
        return "status-rejected";

      case "IN_PROGRESS":
        return "status-progress";

      case "COMPLETED":
        return "status-completed";

      case "CANCELLED":
        return "status-cancelled";

      default:
        return "";
    }
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="order-details-page" dir="rtl">
        <div className="order-details-loading">
          <div className="loading-spinner"></div>

          <p>جاري تحميل تفاصيل الطلب...</p>
        </div>
      </div>
    );
  }

  // ===============================
  // Error
  // ===============================

  if (error) {
    return (
      <div className="order-details-page" dir="rtl">
        <div className="order-details-error">
          <h2>حدث خطأ</h2>

          <p>{error}</p>

          <button className="back-button" onClick={() => navigate(-1)}>
            العودة
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // No Order
  // ===============================

  if (!order) {
    return (
      <div className="order-details-page" dir="rtl">
        <div className="order-details-error">
          <h2>الطلب غير موجود</h2>

          <p>لم يتم العثور على تفاصيل هذا الطلب.</p>

          <button className="back-button" onClick={() => navigate(-1)}>
            العودة
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // Order Details
  // ===============================

  return (
    <div className="order-details-page" dir="rtl">
      <div className="order-details-container">
        {/* Header */}

        <div className="order-details-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← العودة
          </button>

          <div>
            <h1>تفاصيل الطلب</h1>

            <p className="order-id">رقم الطلب: {order.id}</p>
          </div>
        </div>

        {/* Main Card */}

        <div className="order-details-card">
          {/* Service + Status */}

          <div className="details-card-header">
            <div>
              <span className="details-label">نوع الخدمة</span>

              <h2>{order.serviceType}</h2>
            </div>

            <span className={`order-status ${getStatusClass(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          {/* Problem Description */}

          <div className="details-section">
            <span className="details-label">وصف المشكلة</span>

            <p className="problem-description">
              {order.problemDescription || "لا يوجد وصف للمشكلة"}
            </p>
          </div>

          {/* Dates */}

          <div className="details-grid">
            <div className="details-item">
              <span className="details-label">موعد الخدمة</span>

              <p>{formatDate(order.scheduledAt)}</p>
            </div>

            <div className="details-item">
              <span className="details-label">تاريخ إنشاء الطلب</span>

              <p>{formatDate(order.createdAt)}</p>
            </div>

            <div className="details-item">
              <span className="details-label">آخر تحديث</span>

              <p>{formatDate(order.updatedAt)}</p>
            </div>

            <div className="details-item">
              <span className="details-label">حالة الطلب</span>

              <p>{getStatusText(order.status)}</p>
            </div>
          </div>

          {/* Rejection Reason */}

          {order.rejectionReason && (
            <div className="rejection-section">
              <span className="details-label">سبب الرفض</span>

              <p>{order.rejectionReason}</p>
            </div>
          )}

          {/* Customer */}

          {order.customer && (
            <div className="customer-section">
              <h3>بيانات العميل</h3>

              <div className="details-grid">
                <div className="details-item">
                  <span className="details-label">الاسم</span>

                  <p>{order.customer.fullName}</p>
                </div>

                <div className="details-item">
                  <span className="details-label">رقم الهاتف</span>

                  <p>{order.customer.phone}</p>
                </div>
              </div>
            </div>
          )}

          {/* Images */}

          {order.images && order.images.length > 0 && (
            <div className="images-section">
              <h3>صور المشكلة</h3>

              <div className="order-images">
                {order.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`صورة المشكلة ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Voice Note */}

          {order.voiceNoteUrl && (
            <div className="voice-section">
              <h3>التسجيل الصوتي</h3>

              <audio controls src={order.voiceNoteUrl}>
                المتصفح لا يدعم تشغيل التسجيل الصوتي.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
