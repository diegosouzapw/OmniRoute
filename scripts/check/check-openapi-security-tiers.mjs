#!/usr/bin/env node
/**
 * Cross-references openapi.yaml x-loopback-only / x-always-protected annotations
 * against the compile-time constants in src/server/authz/routeGuard.ts.
 *
 * Fails if any YAML annotation disagrees with the routeGuard.ts constants.
 */

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, "docs", "reference", "openapi.yaml");
const ROUTE_GUARD_PATH = path.join(ROOT, "src", "server", "authz", "routeGuard.ts");

function parseStringArray(match) {
  if (!match) return [];
  // Strip line comments before splitting — array entries in routeGuard.ts often
  // carry inline `// T-XX:` annotations that would otherwise pollute the parsed tokens.
  return match[1]
    .replace(/\/\/[^\n]*/g, "")
    .split(",")
    .map((s) => s.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

const guardSrc = fs.readFileSync(ROUTE_GUARD_PATH, "utf-8");
const LOCAL_ONLY_PREFIXES = parseStringArray(
  guardSrc.match(/export const LOCAL_ONLY_API_PREFIXES.*?=\s*\[([^\]]+)\]/s)
);
const ALWAYS_PROTECTED_PATHS = parseStringArray(
  guardSrc.match(/export const ALWAYS_PROTECTED_API_PATHS.*?=\s*\[([^\]]+)\]/s)
);

if (LOCAL_ONLY_PREFIXES.length === 0 || ALWAYS_PROTECTED_PATHS.length === 0) {
  console.error("[openapi-security-tiers] FAIL — could not parse routeGuard.ts constants");
  process.exit(1);
}

const raw = yaml.load(fs.readFileSync(OPENAPI_PATH, "utf-8"));
const paths = raw.paths || {};

const errors = [];

for (const [pathStr, methods] of Object.entries(paths)) {
  if (!methods || typeof methods !== "object") continue;
  for (const [method, spec] of Object.entries(methods)) {
    if (!["get", "post", "put", "patch", "delete"].includes(method) || !spec) continue;

    if (spec["x-loopback-only"] === true) {
      const matchesPrefix = LOCAL_ONLY_PREFIXES.some((prefix) => {
        const norm = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
        return pathStr === norm || pathStr.startsWith(norm + "/");
      });
      if (!matchesPrefix) {
        errors.push(
          `${method.toUpperCase()} ${pathStr}: has x-loopback-only but is NOT covered by ` +
            `LOCAL_ONLY_API_PREFIXES [${LOCAL_ONLY_PREFIXES.join(", ")}]`
        );
      }
    }

    if (spec["x-always-protected"] === true) {
      const matchesPath = ALWAYS_PROTECTED_PATHS.some(
        (p) => pathStr === p || pathStr.startsWith(`${p}/`)
      );
      if (!matchesPath) {
        errors.push(
          `${method.toUpperCase()} ${pathStr}: has x-always-protected but is NOT in ` +
            `ALWAYS_PROTECTED_API_PATHS [${ALWAYS_PROTECTED_PATHS.join(", ")}]`
        );
      }
    }
  }
}

// Reverse pass: every YAML path that falls under a LOCAL_ONLY prefix should
// carry `x-loopback-only: true` on every method, otherwise external API
// consumers have no signal that the route is loopback-restricted. Closes the
// "new spawn-capable route added without annotation" regression class.
//
// Currently reported as warnings (non-fatal) because the v3.8.4 release ships
// with a known annotation gap on /api/services/* and /api/cli-tools/runtime/*
// that will be patched in a follow-up doc-only PR. Promote to errors once the
// backlog is cleared.
const reverseWarnings = [];
for (const [pathStr, methods] of Object.entries(paths)) {
  if (!methods || typeof methods !== "object") continue;
  const fallsUnderLocalOnly = LOCAL_ONLY_PREFIXES.some((prefix) => {
    const norm = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
    return pathStr === norm || pathStr.startsWith(norm + "/");
  });
  if (!fallsUnderLocalOnly) continue;
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
    `[openapi-security-tiers] WARN — ${reverseWarnings.length} LOCAL_ONLY paths missing x-loopback-only annotation (non-fatal, follow-up doc PR):`
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
