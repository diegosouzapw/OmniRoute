import { NextResponse } from "next/server";
import { listBatches } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const limit = Number.parseInt(url.searchParams.get("limit") || "100", 10);
    const batches = listBatches(undefined, limit);
    return NextResponse.json({ batches });
  } catch (error) {
    console.log("Error fetching batches:", error);
    return NextResponse.json({ error: "Failed to fetch batches" }, { status: 500 });
  }
}
