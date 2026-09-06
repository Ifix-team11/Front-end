import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAvailableOrders,
  updateOrderStatus,
  type Order,
} from "../../api/ordersApi";
import "./AvailableOrders.css";

const AvailableOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getAvailableOrders();

        setOrders(result.orders || []);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "حدث خطأ أثناء جلب الطلبات";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

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

      default:
        return status;
    }
  };

  // ===============================
  // Accept Order
  // ===============================

  const handleAcceptOrder = async (order: Order) => {
    const confirmed = window.confirm("هل أنت متأكد من قبول هذا الطلب؟");

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingOrderId(order.id);
      setError("");

      await updateOrderStatus(order.id, {
        status: "ACCEPTED",
      });

      // Remove accepted order
      // from available orders
      setOrders((currentOrders) =>
        currentOrders.filter((item) => item.id !== order.id),
      );

      alert("تم قبول الطلب بنجاح");
    } catch (err) {
      const message = err instanceof Error ? err.message : "فشل قبول الطلب";

      alert(message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // ===============================
  // Reject Order
  // ===============================

  const handleRejectOrder = async (order: Order) => {
    const rejectionReason = window.prompt("اكتب سبب رفض الطلب:");

    // User pressed Cancel
    if (rejectionReason === null) {
      return;
    }

    // Empty reason
    if (!rejectionReason.trim()) {
      alert("يجب كتابة سبب رفض الطلب");
      return;
    }

    try {
      setUpdatingOrderId(order.id);
      setError("");

      await updateOrderStatus(order.id, {
        status: "REJECTED",
        rejectionReason: rejectionReason.trim(),
      });

      // Remove rejected order
      // from available orders
      setOrders((currentOrders) =>
        currentOrders.filter((item) => item.id !== order.id),
      );

      alert("تم رفض الطلب");
    } catch (err) {
      const message = err instanceof Error ? err.message : "فشل رفض الطلب";

      alert(message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // ===============================
  // View Order Details
  // ===============================

  const handleViewOrder = (order: Order) => {
    navigate(`/orders/${order.id}`);
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="available-orders-page" dir="rtl">
        <div className="available-orders-loading">
          <div className="loading-spinner"></div>

          <p>جاري تحميل الطلبات المتاحة...</p>
        </div>
      </div>
    );
  }

  // ===============================
  // Error
  // ===============================

  if (error) {
    return (
      <div className="available-orders-page" dir="rtl">
        <div className="available-orders-error">
          <h2>حدث خطأ</h2>

          <p>{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // Page
  // ===============================

  return (
    <div className="available-orders-page" dir="rtl">
      <div className="available-orders-container">
        {/* Header */}

        <div className="available-orders-header">
          <div>
            <h1>الطلبات المتاحة</h1>

            <p>الطلبات التي يمكنك التقدم لتنفيذها</p>
          </div>

          <div className="orders-count">{orders.length} طلب</div>
        </div>

        {/* Empty */}

        {orders.length === 0 ? (
          <div className="available-orders-empty">
            <h2>لا توجد طلبات متاحة</h2>

            <p>لا توجد طلبات صيانة متاحة حاليًا.</p>
          </div>
        ) : (
          <div className="available-orders-grid">
            {orders.map((order) => {
              const isUpdating = updatingOrderId === order.id;

              return (
                <div className="available-order-card" key={order.id}>
                  {/* Card Header */}

                  <div className="order-card-header">
                    <h2>{order.serviceType}</h2>

                    <span className="order-status">
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  {/* Problem */}

                  <div className="order-info">
                    <span className="order-label">وصف المشكلة</span>

                    <p className="order-description">
                      {order.problemDescription}
                    </p>
                  </div>

                  {/* Scheduled At */}

                  <div className="order-info">
                    <span className="order-label">موعد الخدمة</span>

                    <p>{formatDate(order.scheduledAt)}</p>
                  </div>

                  {/* Created At */}

                  <div className="order-info">
                    <span className="order-label">تاريخ الطلب</span>

                    <p>{formatDate(order.createdAt)}</p>
                  </div>

                  {/* Images */}

                  {order.images && order.images.length > 0 && (
                    <div className="order-images">
                      <span className="order-label">صور المشكلة</span>

                      <div className="images-list">
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

                  {/* View Details */}

                  <button
                    className="view-order-button"
                    onClick={() => handleViewOrder(order)}
                    disabled={isUpdating}
                  >
                    عرض تفاصيل الطلب
                  </button>

                  {/* Accept / Reject */}

                  {order.status === "PENDING" && (
                    <div className="order-actions">
                      <button
                        className="accept-order-button"
                        onClick={() => handleAcceptOrder(order)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? "جاري التنفيذ..." : "قبول الطلب"}
                      </button>

                      <button
                        className="reject-order-button"
                        onClick={() => handleRejectOrder(order)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? "جاري التنفيذ..." : "رفض الطلب"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableOrders;
