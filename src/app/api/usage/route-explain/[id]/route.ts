import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { explainRouteByRequestId } from "@/lib/usage/routeExplain";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authError = await requireManagementAuth(request);
    if (authError) return authError;

    const { id } = await params;
    const explanation = await explainRouteByRequestId(id);

    if (!explanation) {
      return NextResponse.json({ error: "Routing decision not found" }, { status: 404 });
    }

    return NextResponse.json(explanation);
  } catch (error) {
    console.error("[API ERROR] /api/usage/route-explain/[id] failed:", error);
    return NextResponse.json({ error: "Failed to explain route" }, { status: 500 });
  }
}
