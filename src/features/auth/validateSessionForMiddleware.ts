import crypto from "crypto";
import connectDB from "@/lib/db";
import Session from "@/models/session.model";

export async function validateSessionForMiddleware(sessionToken: string) {
  await connectDB();

  const hashedToken = crypto
    .createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const session = await Session.findOne({
    token: hashedToken,
    isValid: true,
    expiresAt: { $gt: new Date() },
  })
    .populate("userId", "role")
    .lean();

  if (!session) return null;

  return {
    userId: session.userId._id.toString(),
    role: session.userId.role,
  };
}
