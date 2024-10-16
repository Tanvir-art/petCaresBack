import mongoose, { model, Schema } from "mongoose";
import { Payment } from "./payment.interface";

const paymentSchema = new mongoose.Schema<Payment>({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true }, // Change to ObjectId
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentStatus: {
    type: String,
    required: true,
  },
  transactionId: { type: String },
});

export const paymentModel = model<Payment>("Payment", paymentSchema);
