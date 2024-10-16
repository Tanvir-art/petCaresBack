"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoute = void 0;
// routes/comment.routes.ts
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
// Middleware to protect routes
const router = express_1.default.Router();
router.post("/comments", (0, auth_1.default)(user_constant_1.USER_ROLE.user), comment_controller_1.CommentController.createCommentController);
router.get("/comments", (0, auth_1.default)(user_constant_1.USER_ROLE.user), comment_controller_1.CommentController.getComments);
exports.commentRoute = router;
