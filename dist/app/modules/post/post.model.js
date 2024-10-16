"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const comment_model_1 = require("../comment/comment.model");
const postSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ["Tip", "Story"], required: true },
    image: { type: String },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    authorName: { type: String },
    auhtorImage: { type: String },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    isPremium: { type: Boolean, default: false },
    comments: [comment_model_1.commentSubDocumentModel],
    published: { type: Boolean, default: true },
    upvoters: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    downvoters: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
});
exports.postModel = mongoose_1.default.model("Post", postSchema);
