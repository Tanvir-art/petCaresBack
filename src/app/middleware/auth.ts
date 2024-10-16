import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { userModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import { UserRole } from "../modules/user/user.constant";

const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    // checking if the user is exist
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized  hi!"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
