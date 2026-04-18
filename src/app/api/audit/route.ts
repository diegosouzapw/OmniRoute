import { NextResponse } from "next/server";
import { getAuditLog, countAuditLog } from "@/lib/compliance/index";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const summary = url.searchParams.get("summary");

    if (summary === "true") {
      const totalEntries = countAuditLog({});
      return NextResponse.json({ totalEntries });
    }

    const limit = parseInt(url.searchParams.get("limit") || "50", 10);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);
    const target = url.searchParams.get("target") || undefined;
    const action = url.searchParams.get("action") || undefined;
    const actor = url.searchParams.get("actor") || undefined;
    const from = url.searchParams.get("since") || undefined;

    const options: any = { limit, offset };
    if (target) options.target = target;
    if (action) options.action = action;
    if (actor) options.actor = actor;
    if (from) options.from = from;

    const entries = getAuditLog(options);
    const total = countAuditLog(options);

    return NextResponse.json({ entries, total });
  } catch (error) {
    console.error("[API ERROR] /api/audit GET:", error);
    return NextResponse.json({ error: "Failed to fetch audit log." }, { status: 500 });
  }
}
