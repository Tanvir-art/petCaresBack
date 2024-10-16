// import { Types } from "mongoose";
// import { Post } from "./post.interface";
import { user } from "../user/user.interface";
import { postModel } from "./post.model";

const createPost = async (
  title: string,
  image: string,
  author: user, // Full user object
  content: string,
  category: "Tip" | "Story",
  isPremium: boolean
) => {
  console.log(author);
  const result = await postModel.create({
    title,
    image,
    author,
    authorName: author?.name,
    auhtorImage: author?.image,
    content,
    category,
    isPremium,
  });
  return result;
};

const getAllPost = async () => {
  const posts = await postModel.find();
  return posts;
};

const deletePost = async (postId: string) => {
  console.log(postId);
  const post = await postModel.findByIdAndDelete(postId);
  return post;
};

export const PostService = {
  createPost,
  getAllPost,
  deletePost,
};
