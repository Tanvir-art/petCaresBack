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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendresponse_1 = __importDefault(require("../../utils/sendresponse"));
const post_service_1 = require("./post.service");
const user_model_1 = require("../user/user.model");
const post_model_1 = require("./post.model");
const createPostController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content, category, image, isPremium } = req.body;
    // Assuming req.user contains authenticated user's info
    const authorEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const author = yield user_model_1.userModel.findOne({ email: authorEmail });
    if (!author) {
        throw new Error("User not found");
    }
    const result = yield post_service_1.PostService.createPost(title, image, author, // Pass the full user object
    content, category, isPremium);
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Post created successfully",
        data: result,
    });
}));
const getPosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostService.getAllPost();
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Posts fetched",
        data: result,
    });
}));
const deletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const result = yield post_service_1.PostService.deletePost(id);
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Post deleted",
        data: result,
    });
}));
const publishPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield post_model_1.postModel.findByIdAndUpdate(id, { published: true }, { new: true });
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Post published successfully",
        data: post,
    });
}));
const unpublishPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield post_model_1.postModel.findByIdAndUpdate(id, { published: false }, { new: true });
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Post unpublished successfully",
        data: post,
    });
}));
const upvotePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const authorEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const author = yield user_model_1.userModel.findOne({ email: authorEmail });
    if (!author) {
        throw new Error("User not found");
    }
    const userId = author === null || author === void 0 ? void 0 : author._id;
    const post = yield post_model_1.postModel.findById(id);
    if (!post) {
        throw new Error("Post not found");
    }
    // Check if the user has already upvoted
    if (post.upvoters.includes(userId)) {
        // User has upvoted already, remove the upvote
        post.upvotes--;
        post.upvoters = post.upvoters.filter((user) => !user.equals(userId));
    }
    else {
        // User is upvoting
        post.upvotes++;
        post.upvoters.push(userId);
    }
    yield post.save();
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Post upvote toggled successfully",
        data: post,
    });
}));
// Downvote a post
const downvotePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const authorEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const author = yield user_model_1.userModel.findOne({ email: authorEmail });
    if (!author) {
        throw new Error("User not found");
    }
    const userId = author === null || author === void 0 ? void 0 : author._id;
    const post = yield post_model_1.postModel.findById(id);
    if (!post) {
        throw new Error("Post not found");
    }
    // Check if the user has already downvoted
    if (post.downvoters.includes(userId)) {
        // User has downvoted already, remove the downvote
        post.downvotes--;
        post.downvoters = post.downvoters.filter((user) => !user.equals(userId));
    }
    else {
        // User is downvoting
        post.downvotes++;
        post.downvoters.push(userId);
    }
    yield post.save();
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Post downvote toggled successfully",
        data: post,
    });
}));
exports.PostController = {
    createPostController,
    getPosts,
    deletePost,
    publishPost,
    unpublishPost,
    upvotePost,
    downvotePost,
};
