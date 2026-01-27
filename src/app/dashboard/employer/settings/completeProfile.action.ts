"use server";
import { getCurrentUser } from "@/features/use-cases/auth.queries";
import { IFormInput } from "./page";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Employeer from "@/models/employer.model";
import { _discriminatedUnion } from "zod/v4/core";

export const UpdateEmployerProfileData = async (data: IFormInput) => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser?.user.role !== "employer")
    redirect("/unauthorized");

  const { _id } = currentUser.user;

  try {
    await connectDB();
    await Employeer.updateOne({ userId: _id }, { $set: { ...data } });
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
