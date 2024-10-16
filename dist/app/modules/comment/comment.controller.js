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
exports.CommentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendresponse_1 = __importDefault(require("../../utils/sendresponse"));
const user_model_1 = require("../user/user.model");
const comment_service_1 = require("./comment.service");
const createCommentController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    const { postId, content } = req.body;
    const authorEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const author = yield user_model_1.userModel.findOne({ email: authorEmail });
    if (!author) {
        throw new Error("User not found");
    }
    const userId = author === null || author === void 0 ? void 0 : author._id;
    const newComment = yield comment_service_1.CommentService.createComment(postId, userId, content);
    (0, sendresponse_1.default)(res, {
        statuseCode: 201,
        success: true,
        message: "Comment created successfully",
        data: newComment,
    });
}));
const getComments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.CommentService.getCommentALl();
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Comments fetched successfully",
        data: result,
    });
}));
exports.CommentController = {
    createCommentController,
    getComments,
};
