import { SESSION_LIFETIME } from "@/config/constants";
import connectDB from "@/lib/db";
import Session from "@/models/session.model";
import User from "@/models/user.model";
import crypto from "crypto";
import { cookies, headers } from "next/headers";

//! function to create random Token for user
const generateSessionToken = async () => {
  return crypto.randomBytes(32).toString("hex").normalize();
};

//! function to extract ip address from NextRequest headers

const IP_HEADER_PRIORITY = [
  "cf-connecting-ip",
  "x-real-ip",
  "x-forwarded-for",
  "forwarded",
  "forwarded-for",
  "x-cluster-client-ip",
  "x-client-ip",
];

const getIPAddress = async (): Promise<string> => {
  const headerList = await headers();
  for (const header of IP_HEADER_PRIORITY) {
    const value = headerList.get(header);
    if (typeof value === "string") {
      const ip = value.split(",")[0].trim();
      if (ip) return ip;
    }
  }
  return "0.0.0.0";
};

//! function to extract user Agent/Browser data from Next Header

const getUserAgent = async () => {
  const headerList = await headers();
  return headerList.get("user-agent") || "";
};

//# main function to get all session internal data i.e. ip/agent/token/token expiry date

export const createSessionsAndSetCookies = async (userId: any) => {
  const token = await generateSessionToken();
  const ipAddress = await getIPAddress();
  const userAgent = await getUserAgent();
  const tokenExpiry = new Date(Date.now() + SESSION_LIFETIME * 1000);

  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

  //insert this data in session table

  const result = await Session.create({
    token: hashedToken,
    userId,
    userAgent,
    ipAddress,
    isValid: true,
    expiresAt: tokenExpiry,
  });

  // create and store cookies in browswer

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    // sameSite: "lax",
    // path: "/",
    maxAge: SESSION_LIFETIME, // 7 days
  });

  return result;
};

//# function to get loggedIn user info using cookie and session

export type AuthSession = {
  ipAddress: string;
  userAgent: string;
  expiresAt: Date;
  isValid: boolean;
  createdAt: Date;
};

export type CurrentUserWithSession = {
  user: {
    userId: string;
    fullName: string;
    email: string;
    role: "applicant" | "employer" | "admin";
    createdAt: Date;
  };
  session: AuthSession;
};

export const validateSessionAndGetUserDetails = async (
  sessionToken: string,
): Promise<CurrentUserWithSession | null> => {
  const hashedToken = crypto
    .createHash("sha-256")
    .update(sessionToken)
    .digest("hex");

  await connectDB();

  const matchWithTokenFromDB = await Session.findOne({
    token: hashedToken,
    expiresAt: { $gt: new Date() },
  });
  if (!matchWithTokenFromDB) return null;

  const userDetails = await User.findById(matchWithTokenFromDB.userId).select(
    "fullName userId email role createdAt",
  );
  if (!userDetails) return null;

  return {
    user: {
      userId: userDetails.userId,
      fullName: userDetails.fullName,
      email: userDetails.email,
      role: userDetails.role,
      createdAt: userDetails.createdAt,
    },
    session: {
      ipAddress: matchWithTokenFromDB.ipAddress,
      userAgent: matchWithTokenFromDB.userAgent,
      expiresAt: matchWithTokenFromDB.expiresAt,
      isValid: matchWithTokenFromDB.isValid,
      createdAt: matchWithTokenFromDB.createdAt,
    },
  };
};
