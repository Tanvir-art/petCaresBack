import axios from "axios";
import { paymentModel } from "./payment.model";
import { postModel } from "../post/post.model";
import { Types } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createRentalIntoDb = async (postId: Types.ObjectId, user: any) => {
  // Verify if the post exists
  const post = await postModel.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the user has already paid for this post
  const existingPayment = await paymentModel.findOne({
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
  const paymentResponse = await axios.post(
    process.env.PAYMENT_URL!,
    paymentData
  );

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

    const paymentResult = await paymentModel.create(newPayment);
    return {
      payment: paymentResult,
      paymentUrl: paymentResponse.data.payment_url,
    };
  } else {
    throw new Error("Payment initiation failed");
  }
};

const getAllBookings = async () => {
  const bookings = await paymentModel.find();
  return bookings;
};

export const PaymentService = {
  createRentalIntoDb,
  getAllBookings,
};
