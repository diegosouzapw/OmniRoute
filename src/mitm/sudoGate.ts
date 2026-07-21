import { isSudoPasswordRequired } from "./dns/dnsConfig.ts";
import { isRoot } from "./systemCommands.ts";

/** Trim and treat whitespace-only sudo passwords as missing (#7865 review). */
export function normalizeMitmSudoPasswordInput(value?: string | null): string {
  return value?.trim() ?? "";
}

/** Resolve the sudo password from the request body and in-process cache. */
export function resolveMitmSudoPassword(
  bodyPassword?: string,
  cachedPassword?: string | null
): string {
  const body = normalizeMitmSudoPasswordInput(bodyPassword);
  if (body) return body;
  return normalizeMitmSudoPasswordInput(cachedPassword);
}

/**
 * Whether a privileged MITM operation must reject because no sudo password is
 * available. Mirrors the gate in `/api/cli-tools/antigravity-mitm` (#822) and
 * `/api/settings/mitm` — skip on Windows, root, NOPASSWD sudoers, and hosts
 * without sudo on PATH.
 */
export function isMitmSudoPasswordRequired(sudoPassword: string): boolean {
  if (process.platform === "win32") return false;
  if (isRoot()) return false;
  if (normalizeMitmSudoPasswordInput(sudoPassword)) return false;
  return isSudoPasswordRequired();
}

/** Whether cert trust / DNS provisioning may run (inverse of the hard gate). */
export function canRunPrivilegedMitmSteps(sudoPassword: string): boolean {
  return !isMitmSudoPasswordRequired(sudoPassword);
}
