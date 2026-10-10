/**
 * Provider allowlist filter for the published catalog.
 *
 * A provider is the raw id prefix before the first `/` (for example `cc`
 * in `cc/claude-sonnet-4-6`), read BEFORE the enrichment overlay renames
 * anything. Ids without a `/` carry no provider claim and always pass.
 *
 * Unknown names in the allowlist warn once and filter nothing for that
 * name (fail-open, the inverse of the capacity-subset options which are
 * fail-closed). Only a filter that matches nothing publishes an empty
 * catalog, with an explicit warning (fail-explicit, never a silent
 * fallback to the full catalog).
 *
 * Alias design: the same alias pass as the usable-prefix filter resolves
 * short aliases (`cc`) to canonical provider ids (`claude`), so `["claude"]`
 * matches `cc/...` rows.
 */

import type { Logger } from "./shared/logger.js";

/** Compiled allowlist. `undefined` means inactive (empty/absent = full catalog). */
export interface ProviderFilter {
  /** Normalized (trimmed, lowercased, deduplicated) allowlist entries. */
  allow: Set<string>;
  /** Operator-facing spellings, same order, for diagnostics. */
  originals: string[];
}

/** Alias/canonical resolution tables, normalized lowercase at build time. */
export interface ProviderResolve {
  /** Every known name: enrichment aliases, provider canonicals, canonicals of aliases. */
  known: Set<string>;
  /** alias -> canonical (for example `cc` -> `claude`). */
  aliasToCanonical: Map<string, string>;
  /** canonical -> aliases (for example `claude` -> {`cc`}). */
  canonicalToAliases: Map<string, Set<string>>;
}

/** Normalize one operator entry; empty after trim means "no opinion". */
function normalizeName(value: string): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Compile the operator allowlist. Empty/absent/blank-only input returns
 * `undefined` (filter inactive, full catalog, no warning).
 */
export function compileProviderFilter(allow?: string[]): ProviderFilter | undefined {
  if (!allow || allow.length === 0) return undefined;
  const seen = new Set<string>();
  const originals: string[] = [];
  for (const raw of allow) {
    const normalized = normalizeName(raw);
    if (normalized === undefined || seen.has(normalized)) continue;
    seen.add(normalized);
    originals.push(typeof raw === "string" ? raw.trim() : String(raw));
  }
  if (seen.size === 0) return undefined;
  return { allow: seen, originals };
}

/**
 * Provider prefix of a raw catalog id (lowercased). `undefined` for bare
 * ids without a `/` — those carry no provider claim and always pass.
 */
export function providerOf(id: string): string | undefined {
  if (typeof id !== "string") return undefined;
  const slash = id.indexOf("/");
  if (slash <= 0) return undefined;
  const prefix = id.slice(0, slash).trim().toLowerCase();
  return prefix.length > 0 ? prefix : undefined;
}

/**
 * Build the resolution tables from raw enrichment alias/canonical pairs
 * plus usable canonicals. All keys normalized lowercase once here, never
 * per comparison.
 */
export function buildProviderResolve(
  pairs: Array<{ alias?: string; canonical?: string }>,
  usableCanonicals?: Iterable<string>
): ProviderResolve {
  const known = new Set<string>();
  const aliasToCanonical = new Map<string, string>();
  const canonicalToAliases = new Map<string, Set<string>>();
  const addAlias = (alias: string, canonical: string): void => {
    aliasToCanonical.set(alias, canonical);
    let bucket = canonicalToAliases.get(canonical);
    if (!bucket) {
      bucket = new Set<string>();
      canonicalToAliases.set(canonical, bucket);
    }
    bucket.add(alias);
  };
  for (const pair of pairs) {
    const alias = normalizeName(pair.alias ?? "");
    const canonical = normalizeName(pair.canonical ?? "");
    if (alias !== undefined) known.add(alias);
    if (canonical !== undefined) known.add(canonical);
    if (alias !== undefined && canonical !== undefined && alias !== canonical) {
      if (!aliasToCanonical.has(alias)) addAlias(alias, canonical);
      else {
        const existing = aliasToCanonical.get(alias);
        if (existing !== undefined && existing !== canonical) {
          let bucket = canonicalToAliases.get(canonical);
          if (!bucket) {
            bucket = new Set<string>();
            canonicalToAliases.set(canonical, bucket);
          }
          bucket.add(alias);
        }
      }
      known.add(alias);
      known.add(canonical);
    }
  }
  if (usableCanonicals) {
    for (const raw of usableCanonicals) {
      const canonical = normalizeName(raw);
      if (canonical === undefined) continue;
      known.add(canonical);
    }
  }
  return { known, aliasToCanonical, canonicalToAliases };
}

/**
 * Whether one provider prefix matches the allowlist. Without a resolve
 * table this is a direct prefix comparison; with one, aliases resolve both
 * ways: prefix in allow, canonical(prefix) in allow, or prefix is an alias
 * of an allowed canonical.
 */
export function matchesAllow(
  prefix: string | undefined,
  filter: ProviderFilter | undefined,
  resolve?: ProviderResolve
): boolean {
  if (!filter) return true;
  if (prefix === undefined) return true;
  if (filter.allow.has(prefix)) return true;
  if (!resolve) return false;
  const canonPrefix = resolve.aliasToCanonical.get(prefix) ?? prefix;
  for (const allowed of filter.allow) {
    if (canonPrefix === allowed) return true;
    const canonAllowed = resolve.aliasToCanonical.get(allowed) ?? allowed;
    if (prefix === canonAllowed || canonPrefix === canonAllowed) return true;
    const aliases = resolve.canonicalToAliases.get(allowed);
    if (aliases !== undefined && aliases.has(prefix)) return true;
    const aliasesOfPrefix = resolve.canonicalToAliases.get(canonPrefix);
    if (aliasesOfPrefix !== undefined && aliasesOfPrefix.has(allowed)) return true;
  }
  return false;
}

/** Whether a raw model/combo id passes the provider filter. */
export function passesProviderFilter(
  id: string,
  filter: ProviderFilter | undefined,
  resolve?: ProviderResolve,
  allUnknown?: boolean
): boolean {
  if (!filter) return true;
  const prefix = providerOf(id);
  if (prefix === undefined) return true;
  if (matchesAllow(prefix, filter, resolve)) return true;
  // Fail-open on prefixes unknown to the vocabulary tables: an unknown
  // prefix proves nothing about the provider, so it cannot exclude.
  if (resolve && !resolve.known.has(prefix)) return true;
  // Fail-open on allow entries unknown to the vocabulary: when EVERY allow
  // name is outside the vocabulary, the whole filter stays inert (warned
  // once at publish time). A mix of known + unknown still lets the known
  // names restrict. The flag is precomputed once per publish; without a
  // resolve table it is false and only the direct comparison above decides.
  if (resolve && (allUnknown ?? filterAllUnknown(filter, resolve))) return true;
  return false;
}

/** Whether every allow entry sits outside the vocabulary (filter inert). */
export function filterAllUnknown(filter: ProviderFilter, resolve: ProviderResolve): boolean {
  for (const allowed of filter.allow) {
    if (resolve.known.has(allowed)) return false;
  }
  return true;
}

/** Allow entries unknown to the vocabulary tables (operator spellings back). */
export function unknownProviders(filter: ProviderFilter | undefined, known: Set<string>): string[] {
  if (!filter) return [];
  const out: string[] = [];
  for (const original of filter.originals) {
    const normalized = normalizeName(original);
    if (normalized === undefined) continue;
    if (!known.has(normalized)) out.push(original);
  }
  return out;
}

/**
 * Warn once about unknown allow entries. Callers pass the publish-wide
 * warning set (`opts.collisionWarned`, shared across publishes) so a repeat
 * publish warns once per key.
 */
export function warnUnknownProviders(
  filter: ProviderFilter | undefined,
  known: Set<string>,
  warned: Set<string>,
  log: Pick<Logger, "warn">
): void {
  if (!filter) return;
  const unknown = unknownProviders(filter, known);
  if (unknown.length === 0) return;
  const key = `provider-unknown::${[...filter.allow].sort().join(",")}`;
  if (warned.has(key)) return;
  warned.add(key);
  log.warn(
    `[omniroute-v2] unknown provider(s) in providersAllow: ${unknown.join(",")} — ` +
      `no catalog entry matches these names, they filter nothing.`
  );
}

/** Warn once when the filter is active but no vocabulary exists. */
export function warnNoVocabulary(
  filter: ProviderFilter | undefined,
  known: Set<string>,
  warned: Set<string>,
  log: Pick<Logger, "warn">
): void {
  if (!filter) return;
  if (known.size > 0) return;
  const key = "provider-no-vocabulary";
  if (warned.has(key)) return;
  warned.add(key);
  log.warn(
    `[omniroute-v2] provider filter active but no provider vocabulary available, ` +
      `keeping the full catalog.`
  );
}
