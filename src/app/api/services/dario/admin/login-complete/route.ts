/**
 * POST /api/services/dario/admin/login-complete
 *
 * Forwards to the running Dario instance's POST /admin/login/complete.
 * Body: { alias: string, code: string }. On Dario's 200 the account is
 * routable immediately (Dario hot-reloads its pool). Returns Dario's
 * { alias, status: "added", expires_at }.
 */

import { z } from "zod";
import { forwardToDarioAdmin, requireAdminAuth } from "../_lib";
import { createErrorResponse } from "@/lib/api/errorResponse";

const BodySchema = z.object({
  alias: z.string().min(1).max(200),
  code: z.string().min(1).max(4000),
});

export async function POST(request: Request): Promise<Response> {
  const authResponse = await requireAdminAuth(request);
  if (authResponse) return authResponse;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({ status: 400, message: parsed.error.message });
  }

  return forwardToDarioAdmin({
    method: "POST",
    path: "/admin/login/complete",
    body: { alias: parsed.data.alias, code: parsed.data.code },
  });
}
