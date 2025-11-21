import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => {
    api.get("/orders").then(res => setOrders(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, { status });
    load();
  };

  const statusColor = {
    Pending: "#f59e0b",
    Confirmed: "#3b82f6",
    Shipped: "#10b981",
    Delivered: "#16a34a"
  };

  const statusBG = {
    Pending: "rgba(245,158,11,0.15)",
    Confirmed: "rgba(59,130,246,0.15)",
    Shipped: "rgba(16,185,129,0.15)",
    Delivered: "rgba(22,163,74,0.15)"
  };

  const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];

  return (
    <main style={{ padding: "2rem 1rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "1.7rem", fontWeight: 700 }}>
        Admin – Orders
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        {orders.map(order => (
          <div
            key={order._id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "1.2rem",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}
          >
            {/* Header */}
            <div
              style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}
            >
              <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Order #{order._id.slice(-6)}
              </span>
              <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>

            <p style={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>
              <strong>User:</strong> {order.user?.email || order.user}
            </p>

            {/* Status Badge */}
            <p
              style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 600,
                margin: "6px 0",
                color: statusColor[order.status],
                background: statusBG[order.status],
              }}
            >
              {order.status}
            </p>

            {/* Items */}
            <ul
              style={{ marginLeft: "1rem", fontSize: "0.9rem", marginTop: "0.6rem" }}
            >
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} x {item.quantity} — $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>

            <p style={{ marginTop: "0.7rem", fontWeight: 700, fontSize: "1rem" }}>
              Total: ${order.totalAmount.toFixed(2)}
            </p>

            {/* Status Buttons */}
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {steps.map(step => (
                <button
                  key={step}
                  onClick={() => updateStatus(order._id, step)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: order.status === step ? statusColor[step] : "#f3f4f6",
                    color: order.status === step ? "#fff" : "#374151",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    transition: "0.2s",
                    zIndex: 20, 
                  }}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
