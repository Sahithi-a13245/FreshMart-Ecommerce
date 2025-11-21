import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    items: [
      {
        productId: { type: String, required: true },
        name: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],

    shippingAddress: {
      fullName: String,
      email: String,
      phone: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String
    },

    paymentType: {
      type: String,
      default: "Card (Demo)"
    },

    paymentStatus: {
      type: String,
      default: "Success"
    },

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
