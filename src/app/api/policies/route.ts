import { NextResponse } from "next/server";
import {
  getAllCircuitBreakerStatuses,
} from "@/shared/utils/circuitBreaker";
import {
  getLockedIdentifiers,
  forceUnlock,
} from "@/domain/lockoutPolicy";

export async function GET() {
  try {
    const circuitBreakers = getAllCircuitBreakerStatuses();
    const lockedIdentifiers = getLockedIdentifiers();
    return NextResponse.json({ circuitBreakers, lockedIdentifiers });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { action, identifier } = await request.json();

    if (action === "unlock" && identifier) {
      forceUnlock(identifier);
      return NextResponse.json({ success: true, action: "unlocked", identifier });
    }

    return NextResponse.json({ error: "Unknown action. Supported: unlock" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
