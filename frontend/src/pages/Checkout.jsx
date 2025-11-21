import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pricing logic
  const subtotal = totalPrice;
  const shipping = subtotal >= 50 ? 0 : 5; // ⭐ Free shipping above $50
  const grandTotal = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/orders", {
        items: cartItems.map(item => ({
          productId: item._id || item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal,
        shipping,
        totalAmount: grandTotal,
        paymentType: "Card (demo)",
        paymentStatus: "Success",
        shippingAddress: {
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          phone: form.phone
        }
      });

      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError("Failed to complete order. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* Left column - Billing + Payment */}
        <section className="checkout-left">
          <h1 className="checkout-title">Checkout</h1>

          {error && <div className="checkout-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Billing Information */}
            <h2 className="section-heading">Billing Information</h2>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label>City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Payment Information */}
            <h2 className="section-heading" style={{ marginTop: "1.5rem" }}>
              Payment Information
            </h2>

            <div className="form-group">
              <label>Card Number</label>
              <input
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={form.cardNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  name="expiry"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  name="cvv"
                  placeholder="123"
                  value={form.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Name on Card</label>
              <input
                name="nameOnCard"
                value={form.nameOnCard}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="checkout-submit"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Complete Order - $${grandTotal.toFixed(2)}`}
            </button>
          </form>
        </section>

        {/* Right column - Order Summary */}
        <section className="checkout-right">
          <div className="summary-card">
            <h2 className="section-heading">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="summary-empty">Your cart is empty.</p>
            ) : (
              <>
                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div className="summary-item" key={item._id}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="summary-item-image"
                        />
                      )}
                      <div className="summary-item-info">
                        <div className="summary-item-name">{item.name}</div>
                        <div className="summary-item-qty">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="summary-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-divider" />

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span style={{ color: "#16a34a", fontWeight: 600 }}>
                        Free
                      </span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
                {subtotal < 50 && (
                  <p className="summary-note">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping.
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
