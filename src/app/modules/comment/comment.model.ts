import mongoose, { model, Schema } from "mongoose";
import { Comment } from "./comment.interface";
const commentSchema = new mongoose.Schema<Comment>({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  postId: { type: String },
});

const commentSubDocumentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  postId: { type: String },
});

export const commentModel = model<Comment>("comment", commentSchema);

export const commentSubDocumentModel = commentSubDocumentSchema;
