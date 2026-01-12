"use server";

import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/models/user.model";

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
      throw new Error("Passwords do not match");
    }
    await connectDB();
    const user = await User.create({
      fullName,
      userId,
      email,
      password,
      confirmPassword,
      role,
    });
    return {
      success: true,
      message: "User created successfully",
    };

    // redirect("/login");
  } catch (error) {
    console.log(
      error,
      "Error submitting contact form. Please try again later."
    );
    // redirect("/register");
    return {
      success: false,
      message: "Error submitting contact form. Please try again later.",
    };
  }
};

export default registerFormAction;
