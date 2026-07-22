/**
 * Pure semver comparison helpers, split out of `versionCheck.ts` so they are
 * importable from CLIENT components without dragging that module's server-only
 * top-level `import { execFile } from "child_process"` into the browser bundle.
 *
 * `versionCheck.ts` re-exports both names for back-compat; new client-reachable
 * callers (e.g. `kimiSponsorBannerGate.ts`) MUST import from here instead — a
 * value-import of the server module breaks the Turbopack `next build` with
 * "Module not found: Can't resolve 'child_process'" (the client bundle cannot
 * tree-shake a top-level Node built-in import away).
 *
 * This file must stay dependency-free (no Node built-ins, no logger, no
 * installer utils) so it is safe in any bundling context.
 */

/**
 * Strip a leading `v`, drop pre-release/build metadata (`-`/`+` suffix), split on `.`,
 * and return a numeric tuple. Returns null when the string is empty or any segment is
 * non-numeric, so callers can fail safe instead of comparing `NaN`.
 */
export function normalizeVersion(v: string): number[] | null {
  if (typeof v !== "string") return null;
  const cleaned = v.trim().replace(/^v/i, "").split(/[-+]/)[0];
  if (!cleaned) return null;
  const parts = cleaned.split(".").map((p) => Number(p));
  if (parts.length === 0 || parts.some((n) => !Number.isFinite(n))) return null;
  return parts;
}

/**
 * True iff `latest` is a strictly higher semver than `current`. Safe on null/garbage
 * (returns false rather than throwing or yielding a `NaN`-driven false positive).
 */
export function isNewer(latest: string | null | undefined, current: string): boolean {
  if (!latest) return false;
  const a = normalizeVersion(latest);
  const b = normalizeVersion(current);
  if (!a || !b) return false;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const av = a[i] ?? 0;
    const bv = b[i] ?? 0;
    if (av !== bv) return av > bv;
  }
  return false;
}
