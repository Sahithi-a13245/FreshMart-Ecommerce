import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-icon-wrap">
          <div className="success-icon-circle">
            <span className="success-check">✔</span>
          </div>
        </div>

        <h1 className="success-title">Order Complete!</h1>
        <p className="success-text">
          Thank you for your purchase. Your order has been successfully placed.
          You&apos;ll receive a confirmation email with your order details shortly.
        </p>

        <div className="success-actions">
          <Link to="/" className="success-btn primary">
            Continue Shopping
          </Link>
          <Link to="/my-orders" className="success-btn ghost">
            View My Orders
          </Link>
        </div>
      </div>
    </main>
  );
}
