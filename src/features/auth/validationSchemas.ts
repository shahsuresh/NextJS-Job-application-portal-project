import { required } from "zod/v4-mini";
import { z } from "zod";
import { COMPANY_TYPES, TEAM_SIZES } from "@/config/constants";

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
        "Username can only contain letters, numbers, underscores, and hyphens",
      ),

    email: z
      .email("Must be a valid email address")
      .trim()
      .toLowerCase()
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

//# user login Data Validation

export const loginUserValidationSchema = z.object({
  userId: z.string().trim().nonempty("Username or Email is required"),
  password: z.string().trim().nonempty("Password is required to login"),
});

//# Employer Profile Data Validation
export const employerProfileValidationSchema = z.object({
  companyName: z
    .string()
    .nonempty("Company Name is Required")
    .trim()
    .max(100, "Company name cannot be of more than 100 Characters long"),
  description: z.string().nonempty("Description is required").trim(),
  avatar_url: z.string().optional(),
  banner_image_url: z.string().optional(),
  team_size: z.enum(TEAM_SIZES, "Select a valid team size"),

  year_of_establishment: z
    .string()
    .nonempty("Year of establishment is required")
    .regex(/^\d{4}$/, "Enter a valid year")
    .refine((year) => {
      const currentYear = new Date().getFullYear();
      return parseInt(year) <= currentYear && parseInt(year) >= 1800;
    }, `Enter a valid year between 1800 and ${new Date().getFullYear()}`),
  website: z
    .url("Enter a valid website URL")
    .trim()
    .toLowerCase()
    .max(100, "Website link cannot be more than 100 characters")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .trim()
    .nonempty("Location is required")
    .max(300, "Location can be of mote than 300 characters long"),
  organization_type: z.enum(COMPANY_TYPES, "Select a valid organization type"),
});

export type IFormInputData = z.infer<typeof employerProfileValidationSchema>;
