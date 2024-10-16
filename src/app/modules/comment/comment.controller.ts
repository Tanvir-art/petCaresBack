// controllers/comment.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { userModel } from "../user/user.model";
import { CommentService } from "./comment.service";

const createCommentController = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const { postId, content } = req.body;

    const authorEmail = req.user?.email;

    const author = await userModel.findOne({ email: authorEmail });
    if (!author) {
      throw new Error("User not found");
    }
    const userId = author?._id;

    const newComment = await CommentService.createComment(
      postId,
      userId,
      content
    );

    sendResponse(res, {
      statuseCode: 201,
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  }
);

const getComments = catchAsync(async (req, res) => {
  const result = await CommentService.getCommentALl();
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Comments fetched successfully",
    data: result,
  });
});

export const CommentController = {
  createCommentController,
  getComments,
};
