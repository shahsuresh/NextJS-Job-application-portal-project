"use server";
import { getCurrentUser } from "@/features/use-cases/auth.queries";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Employeer from "@/models/employer.model";
import { _discriminatedUnion } from "zod/v4/core";
import {
  employerProfileValidationSchema,
  IFormInputData,
} from "@/features/auth/validationSchemas";

export const UpdateEmployerProfileData = async (
  empProfileData: IFormInputData,
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser?.user.role !== "employer")
    redirect("/unauthorized");

  const { _id } = currentUser.user;
  const validatedData =
    employerProfileValidationSchema.safeParse(empProfileData);
  if (!validatedData.success) {
    return { success: false, message: validatedData.error.issues[0].message };
  }

  const validatedProfileData = validatedData.data;

  try {
    await connectDB();
    await Employeer.updateOne(
      { userId: _id },
      { $set: { ...validatedProfileData } },
    );
    return {
      success: true,
      message: "Profile Updated Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Somethip Went Wrong! ${error}`,
    };
  }
};
