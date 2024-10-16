// payment.controller.ts
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";
import { userModel } from "../user/user.model";
import AppError from "../../error/AppError";

const createBooking = catchAsync(async (req, res) => {
  console.log(req.body);
  const { postId } = req.body;
  const userEmail = req.user?.email;
  const user = await userModel.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You have no access to this route"
    );
  }
  const result = await PaymentService.createRentalIntoDb(postId, user);

  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Rental created successfully. Proceed to payment.",
    data: result,
  });
});

const confirmation = async (req: Request, res: Response) => {
  res.send(`<h1>Payment Successful</h1>`);
};

const getAllBooking = catchAsync(async (req, res) => {
  const result = await PaymentService.getAllBookings();
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Bookings fetched successfully",
    data: result,
  });
});

export const paymentController = {
  createBooking,
  confirmation,
  getAllBooking,
};
