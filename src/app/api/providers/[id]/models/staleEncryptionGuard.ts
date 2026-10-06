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
export function buildStaleEncryptionKeyResponse(
  connection:
    | {
        credentialDecryptFailed?: unknown;
        id?: unknown;
        provider?: unknown;
      }
    | null
    | undefined
): NextResponse | null {
  if (!connection || connection.credentialDecryptFailed !== true) return null;

  // #9927 — surface WHICH credential failed plus the recovery path so the
  // dashboard points the operator at the account to re-authenticate instead of
  // a generic "API key cannot be decrypted".
  const provider = typeof connection.provider === "string" ? connection.provider : "";
  const id = typeof connection.id === "string" ? connection.id : "";
  const identity = [provider && `provider "${provider}"`, id && `connection ${id}`]
    .filter(Boolean)
    .join(", ");

  const message =
    `Stored credential${identity ? ` for ${identity}` : ""} cannot be decrypted ` +
    `(STORAGE_ENCRYPTION_KEY changed or unset). Re-authenticate this account, or verify ` +
    `STORAGE_ENCRYPTION_KEY matches the key used to store it.`;

  // buildErrorBody sanitizes the message and projects the client-visible classification.
  const body = buildErrorBody(424, message, undefined, { type: "storage_encryption_stale" });
  return NextResponse.json(body, { status: 424 });
}
