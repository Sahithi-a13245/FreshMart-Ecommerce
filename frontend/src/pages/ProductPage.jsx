import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useCart } from "../context/CartContext.jsx";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <main style={{ padding: "2rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "2rem" }}>
        <img 
          src={product.image}
          alt={product.name}
          style={{ width: "380px", borderRadius: "12px" }}
        />

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "600" }}>{product.name}</h2>
          <p style={{ color: "#6b7280", margin: "0.5rem 0" }}>{product.description}</p>

          <h3 style={{ marginTop: "1rem", fontSize: "1.5rem", color: "var(--primary)" }}>
            ${product.price}
          </h3>

          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
            <span style={{ padding: "0 10px", fontSize: "1.2rem" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          <button
            className="btn-primary"
            style={{ marginTop: "1.5rem" }}
            onClick={() => addToCart(product, qty)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
