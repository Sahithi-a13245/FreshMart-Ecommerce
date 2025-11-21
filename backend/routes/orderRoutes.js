import express from "express";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// PLACE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      shippingAddress,
      paymentType,
      paymentStatus
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items in order" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
      paymentType,
      paymentStatus,
      status: "Pending"
    });

    res.json({ success: true, order });

  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// ⭐ GET MY ORDERS
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch orders" });
  }
});

// ⭐ ADMIN — UPDATE ORDER STATUS (this MUST come before /:id)
router.patch("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["Pending", "Confirmed", "Shipped", "Delivered"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Unable to update status" });
  }
});

// ⭐ TRACK ORDER
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ error: "Order not found" });

    // user cannot track someone else’s order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch order" });
  }
});

// ⭐ ADMIN — GET ALL ORDERS
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch orders" });
  }
});

export default router;
