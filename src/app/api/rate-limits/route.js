import { NextResponse } from "next/server";
import {
  getAllModelLockouts,
} from "@omniroute/open-sse/services/accountFallback.js";
import { getCacheStats } from "@omniroute/open-sse/services/signatureCache.js";

export async function GET() {
  try {
    const lockouts = getAllModelLockouts();
    const cacheStats = getCacheStats();
    return NextResponse.json({ lockouts, cacheStats });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
