import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET
  ? new TextEncoder().encode(process.env.JWT_SECRET)
  : null;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token || !SECRET) {
      return NextResponse.json({ authenticated: false });
    }

    await jwtVerify(token, SECRET);
    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
