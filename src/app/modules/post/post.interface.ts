import { Types } from "mongoose";
import { user } from "../user/user.interface";
import { Comment } from "../comment/comment.interface";

export interface Post {
  title: string;
  content: string;
  category: "Tip" | "Story";
  image?: string;
  author: user;
  authorName: string;
  auhtorImage: string;
  upvotes: number;
  downvotes: number;
  isPremium: boolean;
  comments: Comment[];
  published: boolean;
  upvoters: Types.ObjectId[];
  downvoters: Types.ObjectId[];
}
