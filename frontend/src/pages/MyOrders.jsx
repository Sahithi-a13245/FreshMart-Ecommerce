import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/orders/my-orders")
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: "2rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem", fontWeight: 700 }}>
        My Orders
      </h2>

      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 && <p>No orders yet.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {orders.map(order => (
          <div
            key={order._id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "1rem",
              background: "white",
            }}
          >
            {/* Order header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "1rem" }}>
                Order #{order._id.slice(-6)}
              </span>

              <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Status */}
            <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              Status:{" "}
              <strong style={{ color: "#2563eb" }}>{order.status}</strong>
            </p>

            {/* Items */}
            <ul style={{ marginLeft: "1rem", fontSize: "0.9rem" }}>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>

            {/* Total */}
            <p
              style={{
                marginTop: "0.5rem",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              Total: ${order.totalAmount.toFixed(2)}
            </p>

            {/* ⭐ Track Order Button */}
            <button
              onClick={() => navigate(`/track/${order._id}`)}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
