import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { getAuthSecret } from "./auth-secret";

const COOKIE_NAME = "admin_session";

export async function login(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return false;

  const valid = await bcrypt.compare(password, hash);
  if (!valid) return false;

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(getAuthSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return true;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function verifySession(
  request?: NextRequest,
): Promise<boolean> {
  try {
    let token: string | undefined;

    if (request) {
      token = request.cookies.get(COOKIE_NAME)?.value;
    } else {
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAME)?.value;
    }

    if (!token) return false;

    await jwtVerify(token, getAuthSecret());
    return true;
  } catch {
    return false;
  }
}

/** Throws unless the caller has a valid admin session. Use in every server action. */
export async function requireAdmin(): Promise<void> {
  if (!(await verifySession())) {
    throw new Error("Unauthorized");
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
