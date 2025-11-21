import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";
import "../styles/global.css";

export default function OrderTrack() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStatusStep = (status) => {
    switch (status) {
      case "Pending": return 0;
      case "Confirmed": return 1;
      case "Shipped": return 2;
      case "Delivered": return 3;
      default: return 0;
    }
  };

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="track-loading">Loading order...</p>;
  if (!order) return <p className="track-error">Order not found</p>;

  const steps = [
    { label: "Pending", icon: "🛒" },
    { label: "Confirmed", icon: "📦" },
    { label: "Shipped", icon: "🚚" },
    { label: "Delivered", icon: "✔" }
  ];

  const statusStep = getStatusStep(order.status);

  return (
    <main className="track-page">
      <div className="track-container">
        <h2 className="track-title">Order Tracking</h2>

        <div className="track-order-info">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>

        {/* ⭐ Blinkit/Zepto Style Timeline */}
        <div className="track-wrapper">
          {steps.map((item, index) => {
            const isCompleted = index <= statusStep;

            return (
              <div className="track-step" key={item.label}>
                
                {index !== 0 && (
                  <div className={`track-line ${isCompleted ? "active" : ""}`}></div>
                )}

                <div className={`track-icon-circle ${isCompleted ? "active" : ""}`}>
                  <span className="track-icon">{item.icon}</span>
                </div>

                <div className={`track-label ${isCompleted ? "active" : ""}`}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
