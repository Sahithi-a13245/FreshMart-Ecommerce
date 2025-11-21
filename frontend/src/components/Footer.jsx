export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4 className="footer-logo">FreshMart</h4>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#d1d5db",
                marginBottom: "1rem"
              }}
            >
              Your trusted partner for fresh groceries and daily essentials
              delivered right to your doorstep.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <i
                className="ri-facebook-fill"
                style={{ color: "#9ca3af", cursor: "pointer" }}
              />
              <i
                className="ri-twitter-fill"
                style={{ color: "#9ca3af", cursor: "pointer" }}
              />
              <i
                className="ri-instagram-fill"
                style={{ color: "#9ca3af", cursor: "pointer" }}
              />
            </div>
          </div>
          <div>
            <h5 className="footer-title">Quick Links</h5>
            <a href="#" className="footer-link">
              About Us
            </a>
            <a href="#" className="footer-link">
              Contact
            </a>
            <a href="#" className="footer-link">
              FAQ
            </a>
            <a href="#" className="footer-link">
              Track Order
            </a>
          </div>
          <div>
            <h5 className="footer-title">Categories</h5>
            <a href="#" className="footer-link">
              Fresh Fruits
            </a>
            <a href="#" className="footer-link">
              Vegetables
            </a>
            <a href="#" className="footer-link">
              Dairy Products
            </a>
            <a href="#" className="footer-link">
              Beverages
            </a>
          </div>
          <div>
            <h5 className="footer-title">Contact Info</h5>
            <p className="footer-link" style={{ marginBottom: "0.4rem" }}>
              <i className="ri-phone-line" /> &nbsp; +1 (555) 123-4567
            </p>
            <p className="footer-link" style={{ marginBottom: "0.4rem" }}>
              <i className="ri-mail-line" /> &nbsp; support@freshmart.com
            </p>
            <p className="footer-link">
              <i className="ri-map-pin-line" /> &nbsp; 123 Fresh Street, City,
              State 12345
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 FreshMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}