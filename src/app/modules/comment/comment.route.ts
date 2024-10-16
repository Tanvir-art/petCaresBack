// routes/comment.routes.ts
import express from "express";
import { CommentController } from "./comment.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
// Middleware to protect routes

const router = express.Router();

router.post(
  "/comments",
  auth(USER_ROLE.user),
  CommentController.createCommentController
);
router.get("/comments", auth(USER_ROLE.user), CommentController.getComments);

export const commentRoute = router;
