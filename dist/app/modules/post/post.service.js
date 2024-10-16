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
exports.PostService = void 0;
const post_model_1 = require("./post.model");
const createPost = (title, image, author, // Full user object
content, category, isPremium) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(author);
    const result = yield post_model_1.postModel.create({
        title,
        image,
        author,
        authorName: author === null || author === void 0 ? void 0 : author.name,
        auhtorImage: author === null || author === void 0 ? void 0 : author.image,
        content,
        category,
        isPremium,
    });
    return result;
});
const getAllPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.postModel.find();
    return posts;
});
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(postId);
    const post = yield post_model_1.postModel.findByIdAndDelete(postId);
    return post;
});
exports.PostService = {
    createPost,
    getAllPost,
    deletePost,
};
