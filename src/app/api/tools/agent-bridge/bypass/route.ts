/**
 * GET    /api/tools/agent-bridge/bypass           — list all patterns (default + user)
 * POST   /api/tools/agent-bridge/bypass           — replace user patterns
 * DELETE /api/tools/agent-bridge/bypass?pattern=X — remove a single user pattern
 * LOCAL_ONLY: registered in routeGuard.ts
 */
import { AgentBridgeBypassUpsertSchema } from "@/shared/schemas/agentBridge";
import {
  getAllBypassPatterns,
  replaceUserBypassPatterns,
  getUserBypassPatterns,
} from "@/lib/db/agentBridgeBypass";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

export async function GET(): Promise<Response> {
  try {
    const patterns = getAllBypassPatterns();
    return Response.json({ patterns });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = AgentBridgeBypassUpsertSchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  try {
    replaceUserBypassPatterns(parsed.data.patterns);
    const patterns = getAllBypassPatterns();
    return Response.json({ ok: true, patterns });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}

export async function DELETE(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pattern = url.searchParams.get("pattern");

  if (!pattern) {
    return createErrorResponse({ status: 400, message: "Missing query param: pattern" });
  }

  try {
    const existing = getUserBypassPatterns();
    const updated = existing.filter((p) => p !== pattern);
    replaceUserBypassPatterns(updated);
    const patterns = getAllBypassPatterns();
    return Response.json({ ok: true, patterns });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
