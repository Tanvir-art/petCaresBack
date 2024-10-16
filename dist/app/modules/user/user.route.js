"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const valdateRequest_1 = __importDefault(require("../../middleware/valdateRequest"));
const user_validation_1 = require("./user.validation");
// import { multerUpload } from "../../config/multer.config";
const router = express_1.default.Router();
router.post("/signup", 
// multerUpload.single("image"),
// validateRequest(userValidation.userValidationSchema),
user_controller_1.userController.signUpUser);
router.post("/login", user_controller_1.userController.loginUser);
router.put("/update", (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, valdateRequest_1.default)(user_validation_1.userValidation.updateUserSchema), user_controller_1.userController.updateUser);
router.get("/getAllUser", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.userController.getAllUser);
router.delete("/delete/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.userController.deleteUser);
router.get("/user/me", (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), user_controller_1.userController.getUserByToken);
exports.userRoute = router;
