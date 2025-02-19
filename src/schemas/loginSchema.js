import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(1, "Required").min(4, "Min 4 chars"),
});
