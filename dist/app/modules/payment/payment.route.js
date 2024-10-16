"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.default)(user_constant_1.USER_ROLE.user), payment_controller_1.paymentController.createBooking);
router.post("/confirmation", payment_controller_1.paymentController.confirmation);
router.get("/getAllBooking", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), payment_controller_1.paymentController.getAllBooking);
exports.paymentRoute = router;
