import { NextResponse } from "next/server";
import {
  getActiveSessions,
  getActiveSessionCount,
} from "@omniroute/open-sse/services/sessionManager.ts";

export async function GET() {
  try {
    const sessions = getActiveSessions();
    const count = getActiveSessionCount();
    return NextResponse.json({ count, sessions });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
