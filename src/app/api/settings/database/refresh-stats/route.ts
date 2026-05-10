import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getDatabaseStats } from "@/lib/db/stats";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = await getDatabaseStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Failed to refresh database stats:", error);
    return NextResponse.json({ error: "Failed to refresh database stats" }, { status: 500 });
  }
}
