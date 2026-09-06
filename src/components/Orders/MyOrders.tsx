import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders, type Order } from "../../api/ordersApi";
import "./MyOrders.css";

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"current" | "previous">("current");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyOrders();

        setOrders(data.orders);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل الحجوزات");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "قيد الانتظار";

      case "ACCEPTED":
        return "تم القبول";

      case "REJECTED":
        return "مرفوض";

      case "COMPLETED":
        return "مكتمل";

      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "pending";

      case "ACCEPTED":
        return "accepted";

      case "REJECTED":
        return "rejected";

      case "COMPLETED":
        return "completed";

      default:
        return "";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("ar-EG", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isPreviousOrder = (order: Order) => {
    return ["COMPLETED", "REJECTED"].includes(order.status);
  };

  const currentOrders = orders.filter((order) => !isPreviousOrder(order));

  const previousOrders = orders.filter((order) => isPreviousOrder(order));

  const filteredOrders =
    activeTab === "current" ? currentOrders : previousOrders;

  if (loading) {
    return (
      <div className="orders-page" dir="rtl">
        <div className="orders-loading">جاري تحميل الحجوزات...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page" dir="rtl">
        <div className="orders-error">{error}</div>
      </div>
    );
  }

  return (
    <main className="orders-page" dir="rtl">
      <div className="orders-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>الرئيسية</span>
          <span>/</span>
          <span className="breadcrumb-active">حجوزاتي</span>
        </div>

        {/* Header */}
        <div className="orders-header">
          <h1>حجوزاتي</h1>

          <p>تابع حالة طلبك الحالية وتاريخ خدماتك السابقة بكل سهولة</p>
        </div>

        {/* Tabs */}
        <div className="orders-tabs">
          <button
            className={activeTab === "current" ? "active" : ""}
            onClick={() => setActiveTab("current")}
          >
            الطلبات الحالية ({currentOrders.length})
          </button>

          <button
            className={activeTab === "previous" ? "active" : ""}
            onClick={() => setActiveTab("previous")}
          >
            الطلبات السابقة ({previousOrders.length})
          </button>
        </div>

        {/* Orders */}
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="empty-orders">لا توجد حجوزات في هذا القسم</div>
          ) : (
            filteredOrders.map((order) => (
              <div className="order-card" key={order.id}>
                {/* Top */}
                <div className="order-main">
                  {/* Service Icon */}
                  <div className="service-icon">🔧</div>

                  {/* Order Info */}
                  <div className="order-info">
                    <h2>
                      {order.serviceType === "كهرباء"
                        ? "خدمة كهرباء"
                        : order.serviceType}
                    </h2>

                    <div className="order-meta">
                      <span>📍 موقع الخدمة</span>

                      <span className="separator">•</span>

                      <span>📅 {formatDate(order.scheduledAt)}</span>
                    </div>

                    <p className="problem-description">
                      {order.problemDescription}
                    </p>
                  </div>

                  {/* Status */}
                  <div
                    className={`order-status ${getStatusClass(order.status)}`}
                  >
                    <span className="status-dot"></span>

                    {getStatusText(order.status)}
                  </div>
                </div>

                {/* Bottom */}
                <div className="order-footer">
                  {/* Order ID */}
                  <div className="order-details">
                    <span>رقم الطلب:</span>

                    <span>{order.id.slice(0, 8)}</span>
                  </div>

                  {/* Actions */}
                  <div className="order-actions">
                    <button className="technician-button" type="button">
                      💬 مراسلة الفني
                    </button>

                    <button
                      className="details-button"
                      type="button"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      تتبع الطلب
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default MyOrders;
