import { NextResponse } from "next/server";
import { getBatch } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const batch = getBatch(params.id);
    if (!batch) {
      return NextResponse.json({ error: "Batch not found" }, { status: 404 });
    }
    return NextResponse.json({ batch });
  } catch (error) {
    console.log("Error fetching batch:", error);
    return NextResponse.json({ error: "Failed to fetch batch" }, { status: 500 });
  }
}
