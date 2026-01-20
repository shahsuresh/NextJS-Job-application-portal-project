"use server";

import crypto from "crypto";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Session from "@/models/session.model";

export const logoutAction = async (): Promise<{ success: boolean }> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return { success: true }; // already logged out
  }

  await connectDB();

  const hashedToken = crypto
    .createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  // Invalidate session in DB
  await Session.updateOne({ token: hashedToken }, { isValid: false });

  // Remove cookie
  cookieStore.delete("session");

  return { success: true };
};
