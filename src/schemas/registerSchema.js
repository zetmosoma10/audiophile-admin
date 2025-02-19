import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Required")
      .min(3, "Min 3 chars")
      .max(50, "Max 50 chars"),
    lastName: z
      .string()
      .min(1, "Required")
      .min(3, "Min 3 chars")
      .max(50, "Max 50 chars"),
    email: z.string().min(1, "Required").email("Invalid email"),
    password: z.string().min(1, "Required").min(4, "Min 4 chars"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
