import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

/**
 * #6148 — Stale STORAGE_ENCRYPTION_KEY guard for model-discovery.
 *
 * `decryptConnectionFields` (src/lib/db/encryption.ts) flags a connection with
 * `credentialDecryptFailed: true` when a stored credential is still encrypted
 * (`enc:v1:…`) but no longer decrypts — the signature of a changed or unset
 * STORAGE_ENCRYPTION_KEY. Without this guard the null credential is coerced to
 * an empty string, an empty-Bearer request is sent upstream, and the operator
 * sees a misleading "Auth failed: 401" that hides the real cause.
 *
 * Returns a 424 (Failed Dependency) response with a clear, sanitized message
 * when the connection carries that flag; otherwise null (proceed normally).
 */
const STALE_ENCRYPTION_MESSAGE =
  "Stored API key cannot be decrypted (STORAGE_ENCRYPTION_KEY changed or unset). Re-enter the API key.";

export function buildStaleEncryptionKeyResponse(
  connection: { credentialDecryptFailed?: unknown } | null | undefined
): NextResponse | null {
  if (!connection || connection.credentialDecryptFailed !== true) return null;

  // buildErrorBody sanitizes the message (Rule #12); override the type so the
  // client can key off the specific stale-encryption cause.
  const body = buildErrorBody(424, STALE_ENCRYPTION_MESSAGE);
  body.error.type = "storage_encryption_stale";
  return NextResponse.json(body, { status: 424 });
}
