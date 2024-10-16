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
exports.PaymentService = void 0;
const axios_1 = __importDefault(require("axios"));
const payment_model_1 = require("./payment.model");
const post_model_1 = require("../post/post.model");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createRentalIntoDb = (postId, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify if the post exists
    const post = yield post_model_1.postModel.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }
    // Check if the user has already paid for this post
    const existingPayment = yield payment_model_1.paymentModel.findOne({
        postId,
    });
    if (existingPayment) {
        // If the user has already paid, return payment details
        return {
            payment: existingPayment,
            message: "Already made payment",
        };
    }
    // Prepare payment data
    const paymentData = {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        amount: 100,
        currency: "BDT",
        tran_id: `TXN-${Date.now()}`,
        success_url: `${process.env.BASE_URL}/api/payment/confirmation`,
        fail_url: "http://www.merchantdomain.com/failedpage.html",
        cancel_url: "http://www.merchantdomain.com/cancellpage.html",
        desc: "Merchant Registration Payment",
        cus_name: user.name,
        cus_email: user.email,
        cus_phone: "+8801234567890",
        type: "json",
    };
    const paymentResponse = yield axios_1.default.post(process.env.PAYMENT_URL, paymentData);
    // If payment initiation is successful, create payment entry
    if (paymentResponse.data && paymentResponse.data.result === "true") {
        const newPayment = {
            postId,
            userId: user._id, // Add userId to associate the payment with the user
            amount: 100,
            currency: "BDT",
            paymentStatus: "paid", // Initially set as paid after successful payment
            transactionId: paymentResponse.data.tran_id,
        };
        const paymentResult = yield payment_model_1.paymentModel.create(newPayment);
        return {
            payment: paymentResult,
            paymentUrl: paymentResponse.data.payment_url,
        };
    }
    else {
        throw new Error("Payment initiation failed");
    }
});
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield payment_model_1.paymentModel.find();
    return bookings;
});
exports.PaymentService = {
    createRentalIntoDb,
    getAllBookings,
};
