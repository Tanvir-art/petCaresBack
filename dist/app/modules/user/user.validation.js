"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        image: zod_1.z.string({
            required_error: "Image is required",
            invalid_type_error: "Image must be a string",
        }),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
const updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.userValidation = {
    userValidationSchema,
    loginValidationSchema,
    updateUserSchema,
};
