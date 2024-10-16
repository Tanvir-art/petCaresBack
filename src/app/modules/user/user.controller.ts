import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { userModel } from "./user.model";

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.signupUser(req.body);

  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userService.loginUser(req.body);

  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "Logedin successfully",
    token: result.accessToken,
    data: result.user,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUser();
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

const getUserByToken = catchAsync(async (req, res) => {
  // const result = await UserService.getUserByToken(req.body);

  if (!req.user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You have no access to this route"
    );
  }
  const { email } = req.user;
  const result = await userService.getUserFromToken(email);
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  // Retrieve the email of the authenticated user from the request
  const userEmail = req?.user?.email;

  // Find the user by email
  const user = await userModel.findOne({ email: userEmail }); // Use findOne to get a single user object
  console.log(user); // Log the user object

  // Check if user exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Retrieve the user ID from the user object
  const { _id: userId } = user; // Destructure to get the user ID

  // Call the service to update the user with the provided data
  const result = await userService.updateUserService(userId, req.body);

  // Return the response
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await userService.deleteUserService(req.params.id);
  sendResponse(res, {
    statuseCode: 200,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const userController = {
  signUpUser,
  loginUser,
  getAllUser,
  getUserByToken,
  updateUser,
  deleteUser,
};
