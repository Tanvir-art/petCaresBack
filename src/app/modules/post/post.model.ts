import mongoose, { Schema } from "mongoose";
import { Post } from "./post.interface";
import { commentSubDocumentModel } from "../comment/comment.model";

const postSchema = new mongoose.Schema<Post>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ["Tip", "Story"], required: true },
  image: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  authorName: { type: String },
  auhtorImage: { type: String },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },
  comments: [commentSubDocumentModel],
  published: { type: Boolean, default: true },
  upvoters: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvoters: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const postModel = mongoose.model<Post>("Post", postSchema);
