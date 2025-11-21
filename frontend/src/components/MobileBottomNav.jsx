import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function MobileBottomNav() {
  const { totalItems, setIsCartOpen } = useCart();
  const nav = useNavigate();

  return (
    <div className="mobile-nav">
      <div className="mobile-nav-inner">
        <button className="mobile-nav-item mobile-nav-item-active" onClick={() => nav("/")}>
          <i className="ri-home-line"></i>
          <span>Home</span>
        </button>
        <button className="mobile-nav-item">
          <i className="ri-search-line"></i>
          <span>Search</span>
        </button>
        <button className="mobile-nav-item">
          <i className="ri-grid-line"></i>
          <span>Categories</span>
        </button>
        <button
          className="mobile-nav-item"
          style={{ position: "relative" }}
          onClick={() => setIsCartOpen(true)}
        >
          <i className="ri-shopping-cart-line"></i>
          <span>Cart</span>
          {totalItems > 0 && (
            <span
              className="cart-count-badge"
              style={{ top: "-2px", right: "-6px" }}
            >
              {totalItems}
            </span>
          )}
        </button>
        <button className="mobile-nav-item" onClick={() => nav("/login")}>
          <i className="ri-user-line"></i>
          <span>Account</span>
        </button>
      </div>
    </div>
  );
}