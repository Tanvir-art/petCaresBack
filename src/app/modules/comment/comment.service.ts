// services/comment.service.ts
import { commentModel } from "./comment.model";
import { postModel } from "../post/post.model";
import { Types } from "mongoose";

const createComment = async (
  postId: string,
  authorId: Types.ObjectId,
  content: string
) => {
  // Create a new comment
  console.log("postId, authorId, content", postId, authorId, content);

  const newComment = await commentModel.create({
    content,
    author: authorId,
    post: postId,
  });

  // Add the comment's ObjectId to the post's comments array
  await postModel.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: { content: newComment.content, postId, author: authorId },
      },
    },
    { new: true }
  );

  return newComment;
};

const getCommentALl = async () => {
  const comments = await commentModel.find();
  return comments;
};

export const CommentService = {
  createComment,
  getCommentALl,
};
