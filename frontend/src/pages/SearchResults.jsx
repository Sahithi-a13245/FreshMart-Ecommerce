import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";
import { ProductCard } from "../components/FeaturedProducts.jsx";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => setAllProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = query
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : allProducts;

  return (
    <main style={{ padding: "2rem 1rem" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "0.75rem",
          }}
        >
          Search Results{query ? ` for "${query}"` : ""}
        </h2>

        {loading && <p>Loading products...</p>}

        {!loading && filtered.length === 0 && (
          <p style={{ marginTop: "0.5rem", color: "#6b7280" }}>
            No products found.
          </p>
        )}

        {!loading && filtered.length > 0 && (
          <div className="product-grid" style={{ marginTop: "1rem" }}>
            {filtered.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
