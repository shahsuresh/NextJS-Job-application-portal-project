"use server";

import connectDB from "@/lib/db";
import User from "@/models/user.model";
import argon2 from "argon2";

export type RegisterState = {
  success: boolean;
  message: string;
};

const registerFormAction = async (
  prevState: RegisterState | null,
  formData: FormData
): Promise<RegisterState> => {
  const { fullName, userId, email, password, confirmPassword, role } =
    Object.fromEntries(formData) as Record<string, string>;

  try {
    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Password and Confirm Password do not match",
      };
    }

    await connectDB();
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return {
          success: false,
          message: "User with this email already exists",
        };
      } else {
        return {
          success: false,
          message: "User with this username already exists",
        };
      }
    }
    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      fullName,
      userId,
      email,
      password: hashedPassword,
      role,
    });
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error regestering user. Please try again later.",
    };
  }
};

export default registerFormAction;
