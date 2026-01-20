// import { NextRequest, NextResponse } from "next/server";
// import { validateSessionForMiddleware } from "./features/auth/validateSessionForMiddleware";

// export async function middleware(req: NextRequest) {
//   const sessionToken = req.cookies.get("session")?.value;
//   const pathname = req.nextUrl.pathname;

//   // Protect all dashboard routes
//   if (!pathname.startsWith("/dashboard")) {
//     return NextResponse.next();
//   }

//   if (!sessionToken) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const user = await validateSessionForMiddleware(sessionToken);

//   if (!user) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // ---- ROLE RULES ----
//   const roleRouteMap: Record<string, string> = {
//     applicant: "/dashboard/applicant",
//     employer: "/dashboard/employer",
//     admin: "/dashboard/admin",
//   };

//   const allowedPath = roleRouteMap[user.role];

//   if (!pathname.startsWith(allowedPath)) {
//     // Logged in but wrong role
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("session")?.value;
  const pathname = req.nextUrl.pathname;

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const res = await fetch(`${req.nextUrl.origin}/api/auth/validate-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionToken }),
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { user } = await res.json();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based access
  const roleRoutes: Record<string, string> = {
    applicant: "/dashboard/applicant",
    employer: "/dashboard/employer",
    admin: "/dashboard/admin",
  };

  if (!pathname.startsWith(roleRoutes[user.role])) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
