"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = void 0;
const zod_1 = require("zod");
const createPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        }),
        content: zod_1.z.string({
            required_error: "Content is required",
            invalid_type_error: "Content must be a string",
        }),
        category: zod_1.z.enum(["Tip", "Story"], {
            required_error: "Category is required",
            invalid_type_error: "Category must be either 'Tip' or 'Story'",
        }),
        image: zod_1.z.string().optional(),
        isPremium: zod_1.z.boolean().optional(),
    }),
});
exports.postValidation = {
    createPostSchema,
};
