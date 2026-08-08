/**
 * /api/services/dario/admin/accounts
 *
 *   GET    → forwards to Dario's GET /admin/accounts (list: alias, scopes,
 *            expiry, live pool stats). Returns { accounts, count }.
 *   DELETE → forwards to Dario's DELETE /admin/accounts/<alias>. The alias is
 *            taken from a `?alias=` query param or a { alias } JSON body.
 *            Returns { alias, removed }.
 *
 * Server-side only: the real DARIO_ADMIN_TOKEN is attached in forwardToDarioAdmin
 * and never reaches the browser.
 */

import { z } from "zod";

import { forwardToDarioAdmin, requireAdminAuth } from "../_lib";
import { createErrorResponse } from "@/lib/api/errorResponse";

const DeleteAccountBodySchema = z.object({
  alias: z.string().trim().min(1).optional(),
});

export async function GET(request: Request): Promise<Response> {
  const authResponse = await requireAdminAuth(request);
  if (authResponse) return authResponse;
  return forwardToDarioAdmin({ method: "GET", path: "/admin/accounts" });
}

export async function DELETE(request: Request): Promise<Response> {
  const authResponse = await requireAdminAuth(request);
  if (authResponse) return authResponse;

  const url = new URL(request.url);
  let alias = url.searchParams.get("alias")?.trim() || "";

  if (!alias && request.body !== null) {
    try {
      const parsed = DeleteAccountBodySchema.safeParse(await request.json());
      if (parsed.success && parsed.data.alias) {
        alias = parsed.data.alias;
      }
    } catch {
      /* fall through to the missing-alias error below */
    }
  }

  if (!alias) {
    return createErrorResponse({ status: 400, message: "alias required (?alias= or JSON body)" });
  }

  return forwardToDarioAdmin({
    method: "DELETE",
    path: `/admin/accounts/${encodeURIComponent(alias)}`,
  });
}
