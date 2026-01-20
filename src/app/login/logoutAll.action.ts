"use server";

import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Session from "@/models/session.model";
import { getCurrentUser } from "@/features/use-cases/auth.queries";

export const logoutAllAction = async () => {
  const auth = await getCurrentUser();

  if (!auth) return { success: true };

  await connectDB();

  await Session.updateMany({ userId: auth.user.userId }, { isValid: false });
  const cookieStore = await cookies();

  cookieStore.delete("session");

  return { success: true };
};
