import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Protect /dashboard
  if (!token && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent access to /login and /register if user is already authenticated
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next(); // Allow access for all other cases
}

export const config = {
  matcher: ["/dashboard", "/login", "/register"], // Apply middleware to these routes
};
