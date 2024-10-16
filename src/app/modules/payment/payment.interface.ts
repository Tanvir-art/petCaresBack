import { Types } from "mongoose";

export interface Payment {
  postId: Types.ObjectId;
  amount: number;
  currency: string;
  paymentStatus: string;
  transactionId: string;
}
