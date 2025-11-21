import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const SUGGESTIONS = [
  "Fresh Apples",
  "Organic Bananas",
  "Whole Milk",
  "Greek Yogurt"
];

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (isDark) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [isDark]);

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>FreshMart</Link>
        </div>

        <div className="header-search-wrapper">
          <i className="ri-search-line header-search-icon"></i>
          <input
            type="text"
            className="header-search-input"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => {
              if (search.length > 0) setShowSuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const q = search.trim();
                if (q) {
                  setShowSuggestions(false);
                  // nav is  useNavigate hook
                  // (already defined: const nav = useNavigate();)
                  nav(`/search?q=${encodeURIComponent(q)}`);
                }
              }
            }}
          />

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="search-suggestions">
              {filteredSuggestions.map((s) => (
                <div
                  key={s}
                  className="search-suggestion-item"
                  onClick={() => {
                    setSearch(s);
                    setShowSuggestions(false);
                    nav(`/search?q=${encodeURIComponent(s)}`);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="header-icons">
          <button
            className="icon-button"
            onClick={() => setIsDark((prev) => !prev)}
          >
            <i className={isDark ? "ri-moon-line" : "ri-sun-line"}></i>
          </button>

          {user && user.role === "user" && (
            <button
              className="icon-button"
              onClick={() => nav("/my-orders")}
              title="My Orders"
            >
              <i className="ri-file-list-line"></i>
            </button>
          )}

          {user && user.role === "admin" && (
            <button
              className="icon-button"
              onClick={() => nav("/admin/products")}
              title="Admin Panel"
            >
              <i className="ri-dashboard-line"></i>
            </button>
          )}
          {user && user.role === "admin" && (
            <button
              className="icon-button"
              onClick={() => nav("/admin/orders")}
              title="Admin Orders"
            >
              <i className="ri-file-list-line"></i>
            </button>
          )}
          {!user ? (
            <button className="icon-button" onClick={() => nav("/login")}>
              <i className="ri-user-line"></i>
            </button>
          ) : (
            <button className="icon-button" onClick={logout} title="Logout">
              <i className="ri-logout-box-r-line"></i>
            </button>
          )}

          <button
            className="icon-button"
            style={{ position: "relative" }}
            onClick={() => setIsCartOpen(true)}
          >
            <i className="ri-shopping-cart-line"></i>
            {totalItems > 0 && (
              <span className="cart-count-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>

      <div className="category-nav">
        <div className="category-list">
          <button className="category-pill">
            <i className="ri-apple-line" style={{ color: "var(--primary)" }} />
            <span>Fruits</span>
          </button>
          <button className="category-pill">
            <i className="ri-plant-line" style={{ color: "var(--primary)" }} />
            <span>Vegetables</span>
          </button>
          <button className="category-pill">
            <i className="ri-cup-line" style={{ color: "var(--primary)" }} />
            <span>Beverages</span>
          </button>
          <button className="category-pill">
            <i className="ri-cake-line" style={{ color: "var(--primary)" }} />
            <span>Dairy</span>
          </button>
          <button className="category-pill">
            <i className="ri-restaurant-line" style={{ color: "var(--primary)" }} />
            <span>Snacks</span>
          </button>
          <button className="category-pill">
            <i className="ri-heart-pulse-line" style={{ color: "var(--primary)" }} />
            <span>Personal Care</span>
          </button>
        </div>
      </div>
    </header>
  );
}