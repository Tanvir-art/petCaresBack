import { z } from "zod";

const createPostSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }),
    content: z.string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    }),
    category: z.enum(["Tip", "Story"], {
      required_error: "Category is required",
      invalid_type_error: "Category must be either 'Tip' or 'Story'",
    }),
    image: z.string().optional(),
    isPremium: z.boolean().optional(),
  }),
});

export const postValidation = {
  createPostSchema,
};
