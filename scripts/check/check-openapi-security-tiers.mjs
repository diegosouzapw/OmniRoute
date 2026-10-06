#!/usr/bin/env node
/**
 * Cross-references openapi.yaml x-loopback-only / x-always-protected annotations
 * against the compile-time route-classification constants in
 * src/server/authz/routeGuard.ts.
 *
 * routeGuard classifies a loopback-only route through TWO mechanisms, and this
 * checker must honor BOTH or it reports false positives (regression #12335):
 *
 *   1. LOCAL_ONLY_API_PREFIXES — flat string prefixes. One entry
 *      (VNC_ROUTE_PREFIX) is an imported const rather than a string literal, so
 *      it is resolved from its source module.
 *   2. LOCAL_ONLY_API_PATTERNS — RegExp entries for spawn-capable routes whose
 *      dynamic path parameter sits BEFORE the gated segment (e.g.
 *      /api/providers/{id}/login), which a flat prefix cannot target without
 *      over-broadening the whole /api/providers/ subtree.
 *
 * A route is "covered" iff it matches a resolved prefix OR a pattern — exactly
 * the `isLocalOnlyPath()` runtime contract. Fails if any YAML annotation
 * disagrees with the routeGuard.ts constants.
 */

import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, "docs", "openapi.yaml");
const ROUTE_GUARD_PATH = path.join(ROOT, "src", "server", "authz", "routeGuard.ts");
const guardSrc = fs.readFileSync(ROUTE_GUARD_PATH, "utf-8");

// Capture an exported array's body up to its closing `\n];`. Unlike a `[^\]]+`
// capture, this is immune to `]` characters inside comments or regex character
// classes (e.g. `[^/]`) — the exact footgun documented at routeGuard.ts's
// /api/oauth/cursor/auto-import entry, and the reason regex patterns could not
// be parsed at all before.
function extractArrayBody(name) {
  const m = guardSrc.match(
    new RegExp(`export const ${name}\\b[\\s\\S]*?=\\s*\\[([\\s\\S]*?)\\n\\];`)
  );
  return m ? m[1] : null;
}

const stripLineComments = (s) => s.replace(/\/\/[^\n]*/g, "");

function resolveModule(spec) {
  let base;
  if (spec.startsWith("@/")) base = path.join(ROOT, "src", spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(ROUTE_GUARD_PATH), spec);
  else throw new Error(`openapi-security-tiers: unsupported import specifier '${spec}'`);
  for (const cand of [base, `${base}.ts`, `${base}.mts`, path.join(base, "index.ts")]) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) return cand;
  }
  throw new Error(`openapi-security-tiers: cannot resolve module '${spec}' (from ${base})`);
}

// Resolve a bare identifier used inside a prefix array (e.g. VNC_ROUTE_PREFIX)
// to its string-literal value by following its import in routeGuard.ts.
function resolveIdentifier(ident) {
  const imp = guardSrc.match(
    new RegExp(`import\\s*(?:type\\s*)?\\{[^}]*\\b${ident}\\b[^}]*\\}\\s*from\\s*["']([^"']+)["']`)
  );
  if (!imp)
    throw new Error(
      `openapi-security-tiers: '${ident}' used in a prefix array has no import in routeGuard.ts`
    );
  const modSrc = fs.readFileSync(resolveModule(imp[1]), "utf-8");
  const lit = modSrc.match(new RegExp(`export const ${ident}\\s*=\\s*["']([^"']+)["']`));
  if (!lit)
    throw new Error(`openapi-security-tiers: cannot resolve '${ident}' to a string literal`);
  return lit[1];
}

// String prefixes: quoted entries pass through; bare identifiers are resolved.
function parsePrefixes(name) {
  const body = extractArrayBody(name);
  if (body == null)
    throw new Error(`openapi-security-tiers: could not locate ${name} in routeGuard.ts`);
  return stripLineComments(body)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((tok) => {
      const unquoted = tok.replace(/^["']|["']$/g, "");
      return unquoted !== tok ? unquoted : resolveIdentifier(tok);
    });
}

// RegExp patterns: one `/.../ ` literal per line.
function parsePatterns(name) {
  const body = extractArrayBody(name);
  if (body == null)
    throw new Error(`openapi-security-tiers: could not locate ${name} in routeGuard.ts`);
  const out = [];
  for (const raw of body.split("\n")) {
    const t = raw
      .replace(/\/\/.*$/, "")
      .trim()
      .replace(/,\s*$/, "")
      .trim();
    if (t.length > 2 && t.startsWith("/") && t.endsWith("/")) out.push(new RegExp(t.slice(1, -1)));
  }
  return out;
}

const LOCAL_ONLY_PREFIXES = parsePrefixes("LOCAL_ONLY_API_PREFIXES");
const LOCAL_ONLY_PATTERNS = parsePatterns("LOCAL_ONLY_API_PATTERNS");
const ALWAYS_PROTECTED_PATHS = parsePrefixes("ALWAYS_PROTECTED_API_PATHS");
// isAlwaysProtectedPath() is ALSO two-armed (paths || patterns) — reading only the
// path array repeated, on this half, the very bug #12350 fixed on the LOCAL_ONLY
// half: the pattern-gated credential routes (…/{claude,codex}-auth/{export,
// apply-local}, #12600) read as unannotated even though they are protected.
const ALWAYS_PROTECTED_PATTERNS = parsePatterns("ALWAYS_PROTECTED_API_PATTERNS");

if (
  LOCAL_ONLY_PREFIXES.length === 0 ||
  LOCAL_ONLY_PATTERNS.length === 0 ||
  ALWAYS_PROTECTED_PATHS.length === 0 ||
  ALWAYS_PROTECTED_PATTERNS.length === 0
) {
  console.error(
    `[openapi-security-tiers] FAIL — could not parse routeGuard.ts constants ` +
      `(prefixes=${LOCAL_ONLY_PREFIXES.length}, patterns=${LOCAL_ONLY_PATTERNS.length}, ` +
      `alwaysProtected=${ALWAYS_PROTECTED_PATHS.length}, ` +
      `alwaysProtectedPatterns=${ALWAYS_PROTECTED_PATTERNS.length})`
  );
  process.exit(1);
}

// OpenAPI template params ({id}, {sessionId}, …) → a concrete single non-slash
// segment, so pattern regexes written against resolved paths (`[^/]+`) match.
const concretize = (p) => p.replace(/\{[^}]+\}/g, "x");

const matchesPrefix = (concrete) =>
  LOCAL_ONLY_PREFIXES.some((prefix) => {
    const norm = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
    return concrete === norm || concrete.startsWith(`${norm}/`);
  });

function coveredByLocalOnly(pathStr) {
  const concrete = concretize(pathStr);
  return matchesPrefix(concrete) || LOCAL_ONLY_PATTERNS.some((re) => re.test(concrete));
}

/** Mirror of routeGuard.isAlwaysProtectedPath() — both arms, same order. */
function coveredByAlwaysProtected(pathStr) {
  const concrete = concretize(pathStr);
  return (
    ALWAYS_PROTECTED_PATHS.some((p) => concrete === p || concrete.startsWith(`${p}/`)) ||
    ALWAYS_PROTECTED_PATTERNS.some((re) => re.test(concrete))
  );
}

const raw = yaml.load(fs.readFileSync(OPENAPI_PATH, "utf-8"));
const paths = raw.paths || {};
const errors = [];

for (const [pathStr, methods] of Object.entries(paths)) {
  if (!methods || typeof methods !== "object") continue;
  for (const [method, spec] of Object.entries(methods)) {
    if (!["get", "post", "put", "patch", "delete"].includes(method) || !spec) continue;

    if (spec["x-loopback-only"] === true && !coveredByLocalOnly(pathStr)) {
      errors.push(
        `${method.toUpperCase()} ${pathStr}: has x-loopback-only but is NOT covered by ` +
          `LOCAL_ONLY_API_PREFIXES or LOCAL_ONLY_API_PATTERNS`
      );
    }

    if (spec["x-always-protected"] === true && !coveredByAlwaysProtected(pathStr)) {
      errors.push(
        `${method.toUpperCase()} ${pathStr}: has x-always-protected but is NOT covered by ` +
          `ALWAYS_PROTECTED_API_PATHS or ALWAYS_PROTECTED_API_PATTERNS`
      );
    }
  }
}

// Reverse pass (non-fatal): every YAML path that falls under a LOCAL_ONLY prefix
// should carry `x-loopback-only`. Pattern-only routes are intentionally excluded
// — they are not "under" a broad prefix. Known annotation gaps stay warnings.
const reverseWarnings = [];
for (const [pathStr, methods] of Object.entries(paths)) {
  if (!methods || typeof methods !== "object") continue;
  if (!matchesPrefix(concretize(pathStr))) continue;
  for (const [method, spec] of Object.entries(methods)) {
    if (!["get", "post", "put", "patch", "delete"].includes(method) || !spec) continue;
    if (spec["x-loopback-only"] !== true) {
      reverseWarnings.push(
        `${method.toUpperCase()} ${pathStr}: falls under LOCAL_ONLY_API_PREFIXES ` +
          `but is missing x-loopback-only: true annotation`
      );
    }
  }
}

if (reverseWarnings.length > 0) {
  console.warn(
    `[openapi-security-tiers] WARN — ${reverseWarnings.length} LOCAL_ONLY paths missing x-loopback-only annotation (non-fatal):`
  );
  reverseWarnings.forEach((w) => console.warn(`  - ${w}`));
}

if (errors.length === 0) {
  console.log("[openapi-security-tiers] PASS — all security tier annotations match routeGuard.ts");
  process.exit(0);
} else {
  console.error(`[openapi-security-tiers] FAIL — ${errors.length} annotation mismatches:`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
