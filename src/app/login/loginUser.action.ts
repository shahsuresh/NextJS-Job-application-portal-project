"use server";
import argon2 from "argon2";
import connectDB from "@/lib/db";
import { RegisterState } from "../register/registerForm.action";
import User from "@/models/user.model";
import { RegistrationFormData } from "../register/page";
import { LoginFormData } from "./page";
import { loginUserValidationSchema } from "@/features/auth/validationSchemas";
import { createSessionsAndSetCookies } from "@/features/auth/sessions";
import { cookies } from "next/headers";

const loginFormAction = async (
  loginFormData: LoginFormData,
): Promise<RegisterState> => {
  // const { userId, password } = Object.fromEntries(formData);
  // console.log(userId, password);

  const validatedData = loginUserValidationSchema.safeParse(loginFormData);
  if (!validatedData.success) {
    return { success: false, message: validatedData.error.issues[0].message };
  }

  const { userId, password } = validatedData.data;
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
    // console.log(isUserExist);
    const hashedPassword = isUserExist?.password;
    const isPasswordMatch = await argon2.verify(
      hashedPassword,
      String(password),
    );
    // console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return {
        success: false,
        message: `Invalid Credentials`,
      };
    }
    //store user session data in Session table in database and set cookies data

    const sessionData = await createSessionsAndSetCookies(isUserExist._id);
    console.log("SESSION DATA", sessionData);
    console.log(isUserExist._id);

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
