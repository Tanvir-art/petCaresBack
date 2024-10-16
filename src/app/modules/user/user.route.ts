import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middleware/valdateRequest";
import { userValidation } from "./user.validation";
// import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/signup",
  // multerUpload.single("image"),
  // validateRequest(userValidation.userValidationSchema),
  userController.signUpUser
);

router.post("/login", userController.loginUser);
router.put(
  "/update",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(userValidation.updateUserSchema),
  userController.updateUser
);
router.get("/getAllUser", auth(USER_ROLE.admin), userController.getAllUser);

router.delete("/delete/:id", auth(USER_ROLE.admin), userController.deleteUser);

router.get(
  "/user/me",
  auth(USER_ROLE.user, USER_ROLE.admin),
  userController.getUserByToken
);

export const userRoute = router;
