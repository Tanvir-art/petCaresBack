import { Types } from "mongoose";
import config from "../../config";
import { user } from "./user.interface";
import { userModel } from "./user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const signupUser = async (user: user) => {
  const { name, email, password, image } = user;

  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const isFirstUser = (await userModel.countDocuments()) === 0;

    const Newrole = isFirstUser ? "admin" : "user";

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      follower: 0,
      following: 0,
      role: Newrole,
      image,
    });
    const user = await userModel.create(newUser);
    return user;
  } else {
    throw new Error("User already exists");
  }
};

const loginUser = async (Login: user) => {
  const { email, password } = Login;

  const existingUser = await userModel.findOne({ email });
  if (!existingUser) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const user = existingUser;
  const accessToken = jwt.sign(
    {
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
      role: existingUser.role,
    },
    config.jwt_secret as string,
    { expiresIn: "2d" }
  );

  return { user, accessToken };
};

const getAllUser = async () => {
  const users = await userModel.find();

  return users;
};

const getUserFromToken = async (tokenUseremail: string) => {
  const user = await userModel.findOne({ email: tokenUseremail });
  return user;
};

const updateUserService = async (id: Types.ObjectId, data: Partial<user>) => {
  console.log(id);
  // // Prepare the fields to be updated dynamically
  // const updateData: Partial<user> = {};
  // if (name) updateData.name = name;
  // if (email) updateData.email = email;
  // if (image) updateData.image = image;

  // Use findOneAndUpdate to find the user by id and update with the provided data
  const user = await userModel.findByIdAndUpdate(id, data, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validators are run during the update
  });

  return user; // Return the updated user document
};

const deleteUserService = async (id: string) => {
  const user = await userModel.findByIdAndDelete(id);
  return user;
};
export const userService = {
  signupUser,
  loginUser,
  getAllUser,
  getUserFromToken,
  updateUserService,
  deleteUserService,
};
