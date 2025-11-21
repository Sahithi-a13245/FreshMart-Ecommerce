export default function FeaturedCategories() {
  return (
    <section className="section">
      <div className="container">
        <h3 className="section-title">Shop by Category</h3>
        <div className="category-grid">
          <div className="category-card">
            <div
              className="category-icon-circle"
              style={{ backgroundColor: "#fef2f2" }}
            >
              <i className="ri-apple-line" style={{ fontSize: "1.6rem", color: "#ef4444" }} />
            </div>
            <h4 className="product-name">Fresh Fruits</h4>
            <p className="product-meta">120+ items</p>
          </div>
          <div className="category-card">
            <div
              className="category-icon-circle"
              style={{ backgroundColor: "#ecfdf3" }}
            >
              <i className="ri-plant-line" style={{ fontSize: "1.6rem", color: "#22c55e" }} />
            </div>
            <h4 className="product-name">Vegetables</h4>
            <p className="product-meta">85+ items</p>
          </div>
          <div className="category-card">
            <div
              className="category-icon-circle"
              style={{ backgroundColor: "#eff6ff" }}
            >
              <i className="ri-cup-line" style={{ fontSize: "1.6rem", color: "#3b82f6" }} />
            </div>
            <h4 className="product-name">Beverages</h4>
            <p className="product-meta">65+ items</p>
          </div>
          <div className="category-card">
            <div
              className="category-icon-circle"
              style={{ backgroundColor: "#fffbeb" }}
            >
              <i className="ri-cake-line" style={{ fontSize: "1.6rem", color: "#facc15" }} />
            </div>
            <h4 className="product-name">Dairy</h4>
            <p className="product-meta">45+ items</p>
          </div>
          <div className="category-card">
            <div
              className="category-icon-circle"
              style={{ backgroundColor: "#fff7ed" }}
            >
              <i className="ri-restaurant-line" style={{ fontSize: "1.6rem", color: "#fb923c" }} />
            </div>
            <h4 className="product-name">Snacks</h4>
            <p className="product-meta">95+ items</p>
          </div>
          <div className="category-card">
            <div
              className="category-icon-circle"
              style={{ backgroundColor: "#faf5ff" }}
            >
              <i className="ri-heart-pulse-line" style={{ fontSize: "1.6rem", color: "#a855f7" }} />
            </div>
            <h4 className="product-name">Personal Care</h4>
            <p className="product-meta">75+ items</p>
          </div>
        </div>
      </div>
    </section>
  );
}