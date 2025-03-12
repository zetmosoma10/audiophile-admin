import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, "Required").min(4, "Min 4 chars"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
