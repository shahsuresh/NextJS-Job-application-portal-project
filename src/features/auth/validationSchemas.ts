import { z } from "zod";

export const registerUserValidationSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .nonempty("Full name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(100, "Full name cannot be more than 100 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),

    userId: z
      .string()
      .trim()
      .nonempty("Username is required")
      .min(4, "Username must be at least 4 characters long")
      .max(25, "Username cannot be more than 25 characters")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, underscores, and hyphens"
      ),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Must be a valid email address")
      .max(80, "Email cannot be more than 80 characters"),

    password: z
      .string()
      .trim()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long"),

    confirmPassword: z.string().trim().nonempty("Confirm password is required"),

    role: z.enum(["applicant", "employer", "admin"]).default("applicant"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterValidation = z.infer<typeof registerUserValidationSchema>;
