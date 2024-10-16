import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    image: z.string({
      required_error: "Image is required",
      invalid_type_error: "Image must be a string",
    }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
  }),
});
export const userValidation = {
  userValidationSchema,
  loginValidationSchema,
  updateUserSchema,
};
