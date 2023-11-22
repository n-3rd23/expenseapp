import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email format",
    })
    .email("Invalid email"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export type TLogin = z.infer<typeof loginSchema>;
