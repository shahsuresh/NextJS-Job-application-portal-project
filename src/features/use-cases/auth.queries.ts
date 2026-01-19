import { cookies } from "next/headers";
import { cache } from "react";
import { validateSessionAndGetUserDetails } from "../auth/sessions";

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;
  const loggedInUserDetails = await validateSessionAndGetUserDetails(session);
  return loggedInUserDetails;
});
