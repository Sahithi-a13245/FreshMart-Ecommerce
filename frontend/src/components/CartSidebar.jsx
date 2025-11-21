import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {

  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    totalPrice
  } = useCart();
  const { user } = useAuth();

  const close = () => setIsCartOpen(false);

  // 🔥 NEW CHECKOUT FUNCTION
  const checkout = () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }
    setIsCartOpen(false);
    navigate("/checkout");  // 🔥 Redirect here
  };

  return (
    <>
      {isCartOpen && <div className="cart-overlay" onClick={close}></div>}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>Shopping Cart</h3>
          <button className="icon-button" onClick={close}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="cart-body">
          {cartItems.length === 0 && (
            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              Your cart is empty.
            </p>
          )}
          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div style={{ flex: 1 }}>
                <h4 className="cart-item-title">{item.name}</h4>
                <p className="cart-item-meta">{item.description}</p>
                <div
                  style={{
                    display: "flex",
                    marginTop: "0.35rem",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div className="quantity-control">
                    <button
                      className="quantity-button"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      <i className="ri-subtract-line" style={{ fontSize: "0.7rem" }} />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <i className="ri-add-line" style={{ fontSize: "0.7rem" }} />
                    </button>
                  </div>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "var(--primary)",
                      fontSize: "0.95rem"
                    }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                className="icon-button"
                onClick={() => removeFromCart(item._id)}
              >
                <i className="ri-delete-bin-line" style={{ color: "#9ca3af" }} />
              </button>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-total-row">
            <span className="cart-total-label">Total:</span>
            <span className="cart-total-value">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="btn-full" onClick={checkout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
