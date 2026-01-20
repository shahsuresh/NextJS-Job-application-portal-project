// "use server";

// import { registerUserValidationSchema } from "@/features/auth/validationSchemas";
// import connectDB from "@/lib/db";
// import User from "@/models/user.model";
// import argon2 from "argon2";

// export type RegisterState = {
//   success: boolean;
//   message: string;
// };

// const registerFormAction = async (
//   prevState: RegisterState | null,
//   formData: FormData
// ): Promise<RegisterState> => {
//   const { fullName, userId, email, password, confirmPassword, role } =
//     Object.fromEntries(formData) as Record<string, string>;

//   const { data: validatedData, error } = registerUserValidationSchema.safeParse(
//     {
//       fullName,
//       userId,
//       email,
//       password,
//       confirmPassword,
//       role,
//     }
//   );
//   // delete validatedData.confirmPassword;

//   console.log("VALIDATED DATA", validatedData);

//   if (error) return { success: false, message: error.issues[0].message };

//   try {
//     if (password !== confirmPassword) {
//       return {
//         success: false,
//         message: "Password and Confirm Password do not match",
//       };
//     }

//     await connectDB();
//     const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
//     if (existingUser) {
//       if (existingUser.email === email) {
//         return {
//           success: false,
//           message: "User with this email already exists",
//         };
//       } else {
//         return {
//           success: false,
//           message: "User with this username already exists",
//         };
//       }
//     }
//     const hashedPassword = await argon2.hash(password);

//     const user = await User.create({
//       fullName,
//       userId,
//       email,
//       password: hashedPassword,
//       role,
//     });
//     return {
//       success: true,
//       message: "User created successfully",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: "Error regestering user. Please try again later.",
//     };
//   }
// };

// export default registerFormAction;

//NOTE: while using React hook forms=>Object.fromEntries(formData) is not compatible

//# code comptaible with react-hook-form

"use server";

import { createSessionsAndSetCookies } from "@/features/auth/sessions";
import { registerUserValidationSchema } from "@/features/auth/validationSchemas";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import argon2 from "argon2";

export type RegisterState = {
  success: boolean;
  message: string;
  redirectUrl?: string;
};

type RegisterPayload = {
  fullName: string;
  userId: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "applicant" | "employer" | "admin";
};

const registerFormAction = async (
  registerFormData: RegisterPayload,
): Promise<RegisterState> => {
  const validatedFormData =
    registerUserValidationSchema.safeParse(registerFormData);

  if (!validatedFormData.success) {
    return {
      success: false,
      message: validatedFormData.error.issues[0].message,
    };
  }

  const { fullName, userId, email, password, role } = validatedFormData.data;

  try {
    await connectDB();

    const existingUser = await User.findOne({
      $or: [{ email }, { userId }],
    });

    if (existingUser) {
      return {
        success: false,
        message:
          existingUser.email === email
            ? "User with this email already exists"
            : "User with this username already exists",
      };
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({
      fullName,
      userId,
      email,
      password: hashedPassword,
      role,
    });

    // create session data and set cookies in browser after successfull registration

    await createSessionsAndSetCookies(newUser._id);

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    console.error("Register error:", error);

    return {
      success: false,
      message: "Error registering user. Please try again later.",
    };
  }
};

export default registerFormAction;
