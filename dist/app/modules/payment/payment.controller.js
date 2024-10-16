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
exports.paymentController = void 0;
// payment.controller.ts
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const payment_service_1 = require("./payment.service");
const sendresponse_1 = __importDefault(require("../../utils/sendresponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    const { postId } = req.body;
    const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const user = yield user_model_1.userModel.findOne({ email: userEmail });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You have no access to this route");
    }
    const result = yield payment_service_1.PaymentService.createRentalIntoDb(postId, user);
    (0, sendresponse_1.default)(res, {
        statuseCode: http_status_1.default.OK,
        success: true,
        message: "Rental created successfully. Proceed to payment.",
        data: result,
    });
}));
const confirmation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`<h1>Payment Successful</h1>`);
});
const getAllBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.getAllBookings();
    (0, sendresponse_1.default)(res, {
        statuseCode: 200,
        success: true,
        message: "Bookings fetched successfully",
        data: result,
    });
}));
exports.paymentController = {
    createBooking,
    confirmation,
    getAllBooking,
};
