import express from "express";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/", protect, adminOnly, async (req, res) => {
  const { name, description, price, image, category } = req.body;
  const product = await Product.create({ name, description, price, image, category });
  res.json(product);
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  const { name, description, price, image, category } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, description, price, image, category },
    { new: true }
  );
  res.json(product);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

router.get("/seed", async (req, res) => {
  await Product.deleteMany({});
  await Product.insertMany([
    {
      name: "Fresh Red Apples",
      description: "1 kg pack",
      price: 4.99,
      image:
        "https://readdy.ai/api/search-image?query=Fresh%20red%20organic%20apples%20in%20a%20clean%20white%20background%2C%20studio%20photography%20style%2C%20natural%20lighting%2C%20high%20quality%20product%20shot%20for%20e-commerce%2C%20minimalist%20composition&width=300&height=300&seq=apple001&orientation=squarish",
      category: "Fruits"
    },
    {
      name: "Organic Bananas",
      description: "1 dozen",
      price: 3.49,
      image:
        "https://readdy.ai/api/search-image?query=Fresh%20organic%20bananas%20bunch%20on%20clean%20white%20background%2C%20studio%20photography%20style%2C%20natural%20lighting%2C%20high%20quality%20product%20shot%20for%20e-commerce%2C%20minimalist%20composition&width=300&height=300&seq=banana001&orientation=squarish",
      category: "Fruits"
    },
    {
      name: "Whole Milk",
      description: "1 liter",
      price: 2.99,
      image:
        "https://readdy.ai/api/search-image?query=Fresh%20organic%20milk%20bottle%20on%20clean%20white%20background%2C%20studio%20photography%20style%2C%20natural%20lighting%2C%20high%20quality%20product%20shot%20for%20e-commerce%2C%20minimalist%20composition&width=300&height=300&seq=milk001&orientation=squarish",
      category: "Dairy"
    },
    {
      name: "Fresh Carrots",
      description: "500g pack",
      price: 1.99,
      image:
        "https://readdy.ai/api/search-image?query=Fresh%20organic%20carrots%20bunch%20on%20clean%20white%20background%2C%20studio%20photography%20style%2C%20natural%20lighting%2C%20high%20quality%20product%20shot%20for%20e-commerce%2C%20minimalist%20composition&width=300&height=300&seq=carrot001&orientation=squarish",
      category: "Vegetables"
    },
    {
      name: "Greek Yogurt",
      description: "500ml",
      price: 5.49,
      image:
        "https://readdy.ai/api/search-image?query=Greek%20yogurt%20container%20on%20clean%20white%20background%2C%20studio%20photography%20style%2C%20natural%20lighting%2C%20high%20quality%20product%20shot%20for%20e-commerce%2C%20minimalist%20composition&width=300&height=300&seq=yogurt001&orientation=squarish",
      category: "Dairy"
    }
  ]);
  res.json({ message: "Seeded" });
});

export default router;