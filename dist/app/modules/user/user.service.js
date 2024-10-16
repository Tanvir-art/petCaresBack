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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, image } = user;
    const existingUser = yield user_model_1.userModel.findOne({ email });
    if (!existingUser) {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const isFirstUser = (yield user_model_1.userModel.countDocuments()) === 0;
        const Newrole = isFirstUser ? "admin" : "user";
        const newUser = new user_model_1.userModel({
            name,
            email,
            password: hashedPassword,
            follower: 0,
            following: 0,
            role: Newrole,
            image,
        });
        const user = yield user_model_1.userModel.create(newUser);
        return user;
    }
    else {
        throw new Error("User already exists");
    }
});
const loginUser = (Login) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = Login;
    const existingUser = yield user_model_1.userModel.findOne({ email });
    if (!existingUser) {
        throw new Error("User not found");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const user = existingUser;
    const accessToken = jsonwebtoken_1.default.sign({
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        role: existingUser.role,
    }, config_1.default.jwt_secret, { expiresIn: "2d" });
    return { user, accessToken };
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.userModel.find();
    return users;
});
const getUserFromToken = (tokenUseremail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: tokenUseremail });
    return user;
});
const updateUserService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    // // Prepare the fields to be updated dynamically
    // const updateData: Partial<user> = {};
    // if (name) updateData.name = name;
    // if (email) updateData.email = email;
    // if (image) updateData.image = image;
    // Use findOneAndUpdate to find the user by id and update with the provided data
    const user = yield user_model_1.userModel.findByIdAndUpdate(id, data, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validators are run during the update
    });
    return user; // Return the updated user document
});
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findByIdAndDelete(id);
    return user;
});
exports.userService = {
    signupUser,
    loginUser,
    getAllUser,
    getUserFromToken,
    updateUserService,
    deleteUserService,
};
