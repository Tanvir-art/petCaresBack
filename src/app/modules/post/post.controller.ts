// controllers/post.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { PostService } from "./post.service";
import { userModel } from "../user/user.model";
import { postModel } from "./post.model";

const createPostController = catchAsync(async (req: Request, res: Response) => {
  const { title, content, category, image, isPremium } = req.body;

  // Assuming req.user contains authenticated user's info
  const authorEmail = req.user?.email;

  const author = await userModel.findOne({ email: authorEmail });
  if (!author) {
    throw new Error("User not found");
  }

  const result = await PostService.createPost(
    title,
    image,
    author, // Pass the full user object
    content,
    category,
    isPremium
  );

  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});
const getPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostService.getAllPost();
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Posts fetched",
    data: result,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const result = await PostService.deletePost(id);
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Post deleted",
    data: result,
  });
});

const publishPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await postModel.findByIdAndUpdate(
    id,
    { published: true },
    { new: true }
  );
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Post published successfully",
    data: post,
  });
});

const unpublishPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await postModel.findByIdAndUpdate(
    id,
    { published: false },
    { new: true }
  );
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Post unpublished successfully",
    data: post,
  });
});

const upvotePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const authorEmail = req.user?.email;

  const author = await userModel.findOne({ email: authorEmail });
  if (!author) {
    throw new Error("User not found");
  }
  const userId = author?._id;

  const post = await postModel.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the user has already upvoted
  if (post.upvoters.includes(userId)) {
    // User has upvoted already, remove the upvote
    post.upvotes--;
    post.upvoters = post.upvoters.filter((user) => !user.equals(userId));
  } else {
    // User is upvoting
    post.upvotes++;
    post.upvoters.push(userId);
  }

  await post.save();

  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Post upvote toggled successfully",
    data: post,
  });
});

// Downvote a post
const downvotePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const authorEmail = req.user?.email;

  const author = await userModel.findOne({ email: authorEmail });
  if (!author) {
    throw new Error("User not found");
  }
  const userId = author?._id;

  const post = await postModel.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the user has already downvoted
  if (post.downvoters.includes(userId)) {
    // User has downvoted already, remove the downvote
    post.downvotes--;
    post.downvoters = post.downvoters.filter((user) => !user.equals(userId));
  } else {
    // User is downvoting
    post.downvotes++;
    post.downvoters.push(userId);
  }

  await post.save();

  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Post downvote toggled successfully",
    data: post,
  });
});

export const PostController = {
  createPostController,
  getPosts,
  deletePost,
  publishPost,
  unpublishPost,
  upvotePost,
  downvotePost,
};
