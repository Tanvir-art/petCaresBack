import { Types } from "mongoose";

export interface Comment {
  content: string;
  author: Types.ObjectId;
  postId: string;
}
