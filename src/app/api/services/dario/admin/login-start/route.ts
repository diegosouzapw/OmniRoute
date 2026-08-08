/**
 * POST /api/services/dario/admin/login-start
 *
 * Forwards to the running Dario instance's POST /admin/login/start using the
 * stored admin token. Body: { alias?: string }. Returns Dario's
 * { alias, authorize_url, expires_at, instructions } to the browser — the
 * operator opens authorize_url, approves in their own Claude account, then
 * posts the displayed code to /login-complete.
 */

import { z } from "zod";
import { forwardToDarioAdmin, requireAdminAuth } from "../_lib";
import { createErrorResponse } from "@/lib/api/errorResponse";

const LoginStartBodySchema = z.object({
  alias: z.string().trim().min(1).optional(),
});
type LoginStartBody = z.infer<typeof LoginStartBodySchema>;

export async function POST(request: Request): Promise<Response> {
  const authResponse = await requireAdminAuth(request);
  if (authResponse) return authResponse;

  let body: LoginStartBody = {};
  try {
    if (request.body !== null) {
      const parsed = LoginStartBodySchema.safeParse(await request.json());
      if (parsed.success) body = parsed.data;
    }
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const forwardBody = body.alias ? { alias: body.alias } : {};
  return forwardToDarioAdmin({ method: "POST", path: "/admin/login/start", body: forwardBody });
}
