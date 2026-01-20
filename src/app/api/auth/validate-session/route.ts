import crypto from "crypto";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Session from "@/models/session.model";
import User from "@/models/user.model";

export async function POST(req: Request) {
  const { sessionToken } = await req.json();

  if (!sessionToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  await connectDB();

  const hashedToken = crypto
    .createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  //  Find valid session
  const session = await Session.findOne({
    token: hashedToken,
    isValid: true,
    expiresAt: { $gt: new Date() },
  }).lean();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  //  Manually fetch user
  const user = await User.findById(session.userId).select("role").lean();

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  //  Return response
  return NextResponse.json({
    user: {
      userId: session.userId.toString(),
      role: user.role,
    },
  });
}
