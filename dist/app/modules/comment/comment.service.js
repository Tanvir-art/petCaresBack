"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
// services/comment.service.ts
const comment_model_1 = require("./comment.model");
const post_model_1 = require("../post/post.model");
const createComment = (postId, authorId, content) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new comment
    console.log("postId, authorId, content", postId, authorId, content);
    const newComment = yield comment_model_1.commentModel.create({
        content,
        author: authorId,
        post: postId,
    });
    // Add the comment's ObjectId to the post's comments array
    yield post_model_1.postModel.findByIdAndUpdate(postId, {
        $push: {
            comments: { content: newComment.content, postId, author: authorId },
        },
    }, { new: true });
    return newComment;
});
const getCommentALl = () => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comment_model_1.commentModel.find();
    return comments;
});
exports.CommentService = {
    createComment,
    getCommentALl,
};
