import { SESSION_LIFETIME } from "@/config/constants";
import Session from "@/models/session.model";
import crypto from "crypto";
import { headers } from "next/headers";

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
  return result;
};
