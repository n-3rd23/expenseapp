import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email format",
      })
      .min(1, "name is required"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email format",
      })
      .email("Invalid email"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password should minimum 6 characters"),
    confirmPassword: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password should minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type TRegister = z.infer<typeof registerSchema>;
