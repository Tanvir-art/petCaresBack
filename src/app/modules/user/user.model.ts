import mongoose, { model } from "mongoose";
import { user } from "./user.interface";

const userSchema = new mongoose.Schema<user>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  follower: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  image: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"] },
});

export const userModel = model("user", userSchema);
