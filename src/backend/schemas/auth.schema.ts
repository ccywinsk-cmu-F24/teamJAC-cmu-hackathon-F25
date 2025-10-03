import { z } from "zod";

export const LoginRequestSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const LogoutRequestSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LogoutRequest = z.infer<typeof LogoutRequestSchema>;
