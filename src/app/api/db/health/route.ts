import { NextResponse } from "next/server";
import { runManagedDbHealthCheck } from "@/lib/db/core";
import { isAuthenticated } from "@/shared/utils/apiAuth";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  try {
    return NextResponse.json(runManagedDbHealthCheck({ autoRepair: false }));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[API] DB health diagnosis failed:", message);
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  try {
    return NextResponse.json(runManagedDbHealthCheck({ autoRepair: true }));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[API] DB health repair failed:", message);
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
