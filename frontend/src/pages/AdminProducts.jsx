import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "", category: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    api.get("/products").then(res => setProducts(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...form, price: parseFloat(form.price) };
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }
      setForm({ name: "", description: "", price: "", image: "", category: "" });
      setEditingId(null);
      load();
    } catch (err) {
      setError(err?.response?.data?.error || "Error saving product");
    }
  };

  const edit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category
    });
  };

  const del = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    load();
  };

  return (
    <main style={{ padding: "2rem 1rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>Admin - Products</h2>

      <form onSubmit={submit} style={{ marginBottom: "1.5rem", display: "grid", gap: "0.5rem" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
        <input
          placeholder="Price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          required
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
        />
        <button type="submit" className="btn-primary">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #e5e7eb", textAlign: "left", padding: "0.5rem" }}>Name</th>
            <th style={{ borderBottom: "1px solid #e5e7eb", textAlign: "left", padding: "0.5rem" }}>Price</th>
            <th style={{ borderBottom: "1px solid #e5e7eb", textAlign: "left", padding: "0.5rem" }}>Category</th>
            <th style={{ borderBottom: "1px solid #e5e7eb", padding: "0.5rem" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td style={{ borderBottom: "1px solid #f3f4f6", padding: "0.5rem" }}>{p.name}</td>
              <td style={{ borderBottom: "1px solid #f3f4f6", padding: "0.5rem" }}>${p.price.toFixed(2)}</td>
              <td style={{ borderBottom: "1px solid #f3f4f6", padding: "0.5rem" }}>{p.category}</td>
              <td style={{ borderBottom: "1px solid #f3f4f6", padding: "0.5rem" }}>
                <button onClick={() => edit(p)} style={{ marginRight: "0.5rem" }}>Edit</button>
                <button onClick={() => del(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}