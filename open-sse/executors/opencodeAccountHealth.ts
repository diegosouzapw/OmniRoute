/**
 * opencodeAccountHealth.ts — rotation-health writes for the opencode executor loop.
 *
 * Extracted from the executor so the rules that decide when an account's failure
 * history moves live in one place, next to their rationale, instead of being
 * inlined at every call site in the rotation loop.
 */
import {
  type RotatableAccount,
  markCooldown as markAccountCooldown,
  markSuccess as markAccountSuccess,
} from "./accountRotation.ts";
import { hasProxyRefusals, noteProxyServed, proxyEgressKey } from "../utils/proxyRefusalMemory.ts";

type ProxiedAccount = RotatableAccount & { proxy: { host: string; port: number } | null };

export function markCooldown(
  account: ProxiedAccount,
  kind: "transient" | "terminal" = "transient"
): void {
  markAccountCooldown(account, kind);
}

/**
 * A response came back through this proxy: it is usable again for every refusal kind.
 * True of any received response, including a refusal — which is why it is split from
 * markSuccess, whose account-health reset must stay reserved for real successes.
 * Nothing is held unless PROXY_SKIP_RECENTLY_FAILED was on, so this costs no flag read.
 */
export function noteResponseServed(account: ProxiedAccount): void {
  if (hasProxyRefusals()) noteProxyServed(proxyEgressKey(account.proxy));
}

export function markSuccess(account: ProxiedAccount): void {
  markAccountSuccess(account);
  noteResponseServed(account);
}

/**
 * markSuccess clears the account's failure history, so calling it on a refusal erases
 * the cooldown backoff a healthy rotation had earned. Only an HTTP success says the
 * account served; anything else keeps its history and only records that the proxy
 * carried a response.
 */
export function markOutcome(account: ProxiedAccount, response: Response): void {
  if (response.ok) markSuccess(account);
  else noteResponseServed(account);
}
