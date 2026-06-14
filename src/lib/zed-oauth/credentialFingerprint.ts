import crypto from "crypto";

/**
 * Per-credential fingerprint used by the Zed import 2-step confirmation flow.
 *
 * SECURITY-AUDITOR-NOTE: This fingerprint lets the dashboard prove to the
 * server "yes, the credential I just saw in the discover step is the same one
 * I am now authorizing to import" without ever exposing the raw token outside
 * the OS keychain. The server re-reads the keychain on the import step and
 * filters by fingerprint, so a discover response cannot be replayed to import
 * a token that no longer exists. See docs/security/SOCKET_DEV_FINDINGS.md §2.
 */
export function fingerprintZedCredential(
  service: string,
  account: string,
  token: string
): string {
  return crypto
    .createHash("sha256")
    .update(`${service}|${account}|${token}`)
    .digest("hex")
    .slice(0, 16);
}
