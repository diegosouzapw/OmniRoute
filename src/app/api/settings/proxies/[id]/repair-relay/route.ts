import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { getProxyById, updateProxy } from "@/lib/localDb";
import { decrypt } from "@/lib/db/encryption";
import { isRelayProxyType, relayRepairMode } from "@/lib/db/proxies/mappers";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const idParamSchema = z.object({ id: z.string().min(1) });

/**
 * POST /api/settings/proxies/[id]/repair-relay
 *
 * Recovers a relay's auth IN PLACE without a full redeploy. The deploy token is
 * never persisted, but when STORAGE_ENCRYPTION_KEY is set the deploy routes
 * wrote an encrypted `relayAuthEnc` blob into proxy `notes`. That blob is the
 * recoverable secret — we decrypt it and write the plaintext `relayAuth` back,
 * so the relay works again without re-entering any deploy credentials.
 *
 * Returns:
 *   200 { repaired: false, mode: "noop" }      — plaintext already present
 *   200 { repaired: true,  mode: "recovered" }  — re-derived from relayAuthEnc
 *   409 { repaired: false, mode: "redeploy" }  — token unrecoverable, redeploy
 *   400                                      — not a relay-type proxy
 *   404                                      — proxy not found
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const params = await context.params;
  const idValidation = validateBody(idParamSchema, params);
  if (isValidationFailure(idValidation)) {
    return createErrorResponse({
      status: 400,
      message: idValidation.error.message,
      type: "invalid_request",
    });
  }
  const { id } = idValidation.data;

  try {
    const proxy = await getProxyById(id, { includeSecrets: true });
    if (!proxy) {
      return createErrorResponse({ status: 404, message: "Proxy not found", type: "not_found" });
    }

    if (!isRelayProxyType(proxy.type)) {
      return createErrorResponse({
        status: 400,
        message: "Repair is only available for relay proxies (vercel/deno/cloudflare)",
        type: "invalid_request",
      });
    }

    const mode = relayRepairMode(proxy.notes, proxy.type);
    if (mode === "noop") {
      return Response.json({ repaired: false, mode });
    }

    if (mode === "redeploy") {
      return createErrorResponse({
        status: 409,
        message:
          "Relay auth is unrecoverable (no stored token, encrypted blob absent or undecryptable — " +
          "likely a STORAGE_ENCRYPTION_KEY rotation). Redeploy the relay to write a fresh relayAuth.",
        type: "conflict",
      });
    }

    // mode === "recovered": read the still-encrypted blob, decrypt, write plaintext.
    let enc: string | undefined;
    let existingNotes: Record<string, unknown> = {};
    try {
      const parsed = JSON.parse(proxy.notes ?? "{}") as Record<string, unknown>;
      existingNotes = parsed;
      if (typeof parsed.relayAuthEnc === "string") enc = parsed.relayAuthEnc;
    } catch {
      enc = undefined;
    }
    const decrypted = typeof enc === "string" ? decrypt(enc) : undefined;
    if (!decrypted) {
      return createErrorResponse({
        status: 409,
        message:
          "Relay auth is unrecoverable (encrypted blob could not be decrypted — likely a " +
          "STORAGE_ENCRYPTION_KEY rotation). Redeploy the relay to write a fresh relayAuth.",
        type: "conflict",
      });
    }

    // Merge relayAuth into existing notes; drop relayAuthEnc since plaintext is now present.
    const { relayAuthEnc: _dropped, ...rest } = existingNotes as { relayAuthEnc?: unknown };
    await updateProxy(id, { notes: JSON.stringify({ ...rest, relayAuth: decrypted }) });
    return Response.json({ repaired: true, mode: "recovered" });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to repair relay");
  }
}
