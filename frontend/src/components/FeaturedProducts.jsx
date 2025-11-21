import { useEffect, useState } from "react";
import { api } from "../api";
import { useCart } from "../context/CartContext.jsx";

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(0);

  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => (q > 1 ? q - 1 : 0));

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-body">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-meta">{product.description}</p>
        <div className="product-price-row">
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div className="quantity-control">
            <button className="quantity-button" onClick={dec}>
              <i className="ri-subtract-line" style={{ fontSize: "0.8rem" }} />
            </button>
            <span className="quantity-value">{qty}</span>
            <button className="quantity-button" onClick={inc}>
              <i className="ri-add-line" style={{ fontSize: "0.8rem" }} />
            </button>
          </div>
          <button
            className="btn-primary"
            style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}
            onClick={() => addToCart(product, qty)}
          >
            Add to Cart
          </button>
        </div>
        {/* NEW VIEW DETAILS BUTTON */}
        <button
          className="btn-secondary"
          style={{
            width: "100%",
            marginTop: "0.5rem",
            padding: "0.5rem 0.75rem",
            fontSize: "0.85rem"
          }}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products")
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section products-section">
      <div className="container">
        <div className="products-header">
          <h3 className="section-title" style={{ textAlign: "left", marginBottom: 0 }}>
            Featured Products
          </h3>
          <button
            className="btn-secondary"
            style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
          >
            View All
          </button>
        </div>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}