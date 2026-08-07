/**
 * POST /api/services/dario/admin/login-start
 *
 * Forwards to the running Dario instance's POST /admin/login/start using the
 * stored admin token. Body: { alias?: string }. Returns Dario's
 * { alias, authorize_url, expires_at, instructions } to the browser — the
 * operator opens authorize_url, approves in their own Claude account, then
 * posts the displayed code to /login-complete.
 */

import { forwardToDarioAdmin, requireAdminAuth } from "../_lib";
import { createErrorResponse } from "@/lib/api/errorResponse";

export async function POST(request: Request): Promise<Response> {
  const authResponse = await requireAdminAuth(request);
  if (authResponse) return authResponse;

  let body: { alias?: string } = {};
  try {
    if (request.body !== null) {
      const parsed = await request.json();
      if (parsed && typeof parsed === "object") body = parsed as { alias?: string };
    }
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const forwardBody = typeof body.alias === "string" && body.alias.trim() ? { alias: body.alias.trim() } : {};
  return forwardToDarioAdmin({ method: "POST", path: "/admin/login/start", body: forwardBody });
}
