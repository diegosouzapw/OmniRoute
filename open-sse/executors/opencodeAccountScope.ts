/**
 * Per-request member lists for the opencode executor.
 *
 * The executor instance is shared per alias, so the member list must not live
 * on the instance: a second request with different credentials would rebuild
 * it while the first is still walking it. Each request keeps its own list
 * here, keyed by request body identity, while the pick cursor stays on the
 * instance and shared member health lives in an instance-owned store the
 * caller passes in.
 */
import type { AccountProxyConfig } from "./accountRotation.ts";
import type { ProviderCredentials } from "./base.ts";

export interface ScopedAccountHealth {
  cooldownUntil: number;
  consecutiveFails: number;
}

/** Failure history for one member, walking its own request list. */
export interface ScopedAccount {
  fingerprint: string;
  cooldownUntil: number;
  consecutiveFails: number;
  proxy: AccountProxyConfig["proxy"];
}

const scoped = new WeakMap<object, ScopedAccount[]>();

const isObject = (value: unknown): value is object => typeof value === "object" && value !== null;

/**
 * Rebuild a request list from credentials, carrying over the shared health
 * known for each member. Empty fingerprints keep the single direct member,
 * exactly like the executor always did.
 */
export function syncFromHealth(
  health: Map<string, ScopedAccountHealth>,
  credentials: ProviderCredentials
): ScopedAccount[] {
  const psd = credentials?.providerSpecificData;
  const fingerprints = Array.isArray(psd?.fingerprints)
    ? (psd!.fingerprints as unknown[]).filter((f): f is string => typeof f === "string")
    : [];

  const accountProxies = psd?.accountProxies as AccountProxyConfig[] | undefined;
  const proxyMap = Array.isArray(accountProxies)
    ? new Map(accountProxies.map((ap) => [ap.fingerprint, ap.proxy ?? null] as const))
    : null;

  if (fingerprints.length === 0) {
    return [{ fingerprint: "", cooldownUntil: 0, consecutiveFails: 0, proxy: null }];
  }

  return fingerprints.map((fp) => {
    const prior = health.get(fp);
    return {
      fingerprint: fp,
      cooldownUntil: prior?.cooldownUntil ?? 0,
      consecutiveFails: prior?.consecutiveFails ?? 0,
      proxy: proxyMap ? (proxyMap.get(fp) ?? null) : null,
    };
  });
}

/** Fold a request list back into the shared store, keyed by member id. */
export function writeBackHealth(
  health: Map<string, ScopedAccountHealth>,
  list: ScopedAccount[]
): void {
  for (const member of list) {
    if (!member.fingerprint) continue;
    health.set(member.fingerprint, {
      cooldownUntil: member.cooldownUntil,
      consecutiveFails: member.consecutiveFails,
    });
  }
}

/**
 * The list for this request body, rebuilt once per body identity so the
 * parent replay (same body re-entering) reuses it instead of dropping what
 * the first pass learned. A non-object body gets a throwaway list.
 */
export function listForRequest(
  origin: unknown,
  health: Map<string, ScopedAccountHealth>,
  credentials: ProviderCredentials
): ScopedAccount[] {
  if (!isObject(origin)) return syncFromHealth(health, credentials);
  const existing = scoped.get(origin);
  if (existing) return existing;
  const list = syncFromHealth(health, credentials);
  scoped.set(origin, list);
  return list;
}

/** Release a request list once its request is over. Write back first. */
export function releaseRequestList(
  origin: unknown,
  health: Map<string, ScopedAccountHealth>
): void {
  if (!isObject(origin)) return;
  const list = scoped.get(origin);
  if (list) writeBackHealth(health, list);
  scoped.delete(origin);
}
