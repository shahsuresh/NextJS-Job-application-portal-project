"use server";
import argon2 from "argon2";
import connectDB from "@/lib/db";
import { RegisterState } from "../register/registerForm.action";
import User from "@/models/user.model";
import { RegistrationFormData } from "../register/page";

const loginFormAction = async (
  prevState: RegisterState | null,
  formData: FormData
): Promise<RegisterState> => {
  const { userId, password } = Object.fromEntries(formData);
  // console.log(userId, password);
  try {
    await connectDB();
    const isUserExist: RegistrationFormData | null = await User.findOne({
      $or: [{ email: userId }, { userId }],
    });

    if (!isUserExist) {
      return {
        success: false,
        message: `Invalid Credentials`,
      };
    }
    console.log(isUserExist);
    const hashedPassword = isUserExist?.password;
    const isPasswordMatch = await argon2.verify(
      hashedPassword,
      String(password)
    );
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return {
        success: false,
        message: `Invalid Credentials`,
      };
    }

    return {
      success: true,
      message: `Welcome ${isUserExist?.fullName},You are logged in`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong.${error}`,
    };
  }
};

export default loginFormAction;
