/**
 * Validation + filtering helpers for the Zed import 2-step confirmation flow.
 * Extracted so the route handler stays slim and so the rejection paths can be
 * unit-tested without spinning up Next's Request/Response stack.
 *
 * See docs/security/SOCKET_DEV_FINDINGS.md §2.
 */
import type { ZedCredential } from "./keychain-reader";
import { fingerprintZedCredential } from "./credentialFingerprint";

export interface ConfirmedAccount {
  service: string;
  account: string;
  fingerprint: string;
}

export function isConfirmedAccount(value: unknown): value is ConfirmedAccount {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.service === "string" &&
    typeof record.account === "string" &&
    typeof record.fingerprint === "string" &&
    record.fingerprint.length > 0
  );
}

export function parseConfirmedAccounts(body: unknown): ConfirmedAccount[] | null {
  if (!body || typeof body !== "object") return null;
  const list = (body as Record<string, unknown>).confirmedAccounts;
  if (!Array.isArray(list)) return null;
  if (!list.every(isConfirmedAccount)) return null;
  return list as ConfirmedAccount[];
}

export function filterCredentialsByConfirmation(
  credentials: ZedCredential[],
  confirmed: ConfirmedAccount[]
): ZedCredential[] {
  const confirmedKeys = new Set(
    confirmed.map((c) => c.service + "|" + c.account + "|" + c.fingerprint)
  );
  return credentials.filter((cred) => {
    const fp = fingerprintZedCredential(cred.service, cred.account, cred.token);
    const key = cred.service + "|" + cred.account + "|" + fp;
    return confirmedKeys.has(key);
  });
}
