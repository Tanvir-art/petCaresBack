import express from "express";
import { PostController } from "./post.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/valdateRequest";
import { postValidation } from "./post.validation";

const router = express.Router();

router.post(
  "/create",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(postValidation.createPostSchema),
  PostController.createPostController
);
router.get(
  "/getAllPost",
  auth(USER_ROLE.user, USER_ROLE.admin),
  PostController.getPosts
);

router.put("/publish/:id", auth(USER_ROLE.admin), PostController.publishPost);

router.put(
  "/unpublish/:id",
  auth(USER_ROLE.admin),
  PostController.unpublishPost
);

router.put("/upvote/:id", auth(USER_ROLE.user), PostController.upvotePost);

router.put("/downvote/:id", auth(USER_ROLE.user), PostController.downvotePost);

router.delete("/delete/:id", auth(USER_ROLE.admin), PostController.deletePost);

export const postRoute = router;
