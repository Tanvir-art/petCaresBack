import express from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post("/create", auth(USER_ROLE.user), paymentController.createBooking);

router.post("/confirmation", paymentController.confirmation);

router.get(
  "/getAllBooking",
  auth(USER_ROLE.admin),
  paymentController.getAllBooking
);

export const paymentRoute = router;
