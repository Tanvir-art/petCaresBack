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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendresponse_1 = __importDefault(require("../../utils/sendresponse"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const signUpUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.signupUser(req.body);
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "User created successfully",
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.loginUser(req.body);
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Logedin successfully",
        token: result.accessToken,
        data: result.user,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUser();
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "User fetched successfully",
        data: result,
    });
}));
const getUserByToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await UserService.getUserByToken(req.body);
    if (!req.user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You have no access to this route");
    }
    const { email } = req.user;
    const result = yield user_service_1.userService.getUserFromToken(email);
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "User fetched successfully",
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Retrieve the email of the authenticated user from the request
    const userEmail = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
    // Find the user by email
    const user = yield user_model_1.userModel.findOne({ email: userEmail }); // Use findOne to get a single user object
    console.log(user); // Log the user object
    // Check if user exists
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Retrieve the user ID from the user object
    const { _id: userId } = user; // Destructure to get the user ID
    // Call the service to update the user with the provided data
    const result = yield user_service_1.userService.updateUserService(userId, req.body);
    // Return the response
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "User updated successfully",
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.deleteUserService(req.params.id);
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
}));
exports.userController = {
    signUpUser,
    loginUser,
    getAllUser,
    getUserByToken,
    updateUser,
    deleteUser,
};
