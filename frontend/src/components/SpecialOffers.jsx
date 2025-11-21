export default function SpecialOffers() {
  return (
    <section className="section">
      <div className="container">
        <h3 className="section-title">Special Offers</h3>
        <div className="offers-grid">
          <div
            className="offer-card"
            style={{
              background: "linear-gradient(to right, #4ade80, #16a34a)"
            }}
          >
            <h4 className="offer-title">Fresh Produce Sale</h4>
            <p className="offer-text">
              Get up to 30% off on all fresh fruits and vegetables
            </p>
            <button className="btn-secondary">Shop Now</button>
          </div>
          <div
            className="offer-card"
            style={{
              background: "linear-gradient(to right, #60a5fa, #2563eb)"
            }}
          >
            <h4 className="offer-title">Free Delivery</h4>
            <p className="offer-text">Free delivery on orders above $50</p>
            <button className="btn-secondary">Order Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}