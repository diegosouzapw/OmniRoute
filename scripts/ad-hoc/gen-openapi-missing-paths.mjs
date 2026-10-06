#!/usr/bin/env node
// One-shot generator (2026-08-31 docs audit follow-up nº 3): append a minimal,
// honest OpenAPI entry for every real route that docs/openapi.yaml does not
// document yet. Enumerates routes with the SAME lib the check:api-docs-refs
// gate uses, so the generated set can never diverge from the gate's universe.
// Minimal by design: real methods (parsed from each route.ts's exports), a
// group tag, a neutral path-derived summary and a generic 200 — no invented
// semantics. Rich schemas stay hand-curated in the existing entries.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectApiRouteFiles, toApiUrlPath, apiRoot } from "../check/lib/apiRoutes.mjs";
import { isLocalOnlyPath, ALWAYS_PROTECTED_API_PATHS } from "../../src/server/authz/routeGuard.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SPEC = path.join(ROOT, "docs", "openapi.yaml");
const APPLY = process.argv.includes("--apply");

const normalizeParams = (p) => p.replace(/\{[^}]+\}/g, "{}");

// --- real routes + their exported HTTP methods --------------------------------
const METHOD_RE =
  /export\s+(?:async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b|export\s+const\s+(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b|export\s*\{[^}]*\b(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b[^}]*\}/g;

function routeMethods(absFile) {
  const src = fs.readFileSync(absFile, "utf8");
  const methods = new Set();
  for (const m of src.matchAll(METHOD_RE)) {
    const name = m[1] || m[2];
    if (name) methods.add(name);
    if (m[3]) {
      // re-export list: capture every method inside the braces
      for (const inner of m[0].matchAll(/\b(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/g))
        methods.add(inner[1]);
    }
  }
  methods.delete("OPTIONS"); // CORS preflight — not a documented operation
  methods.delete("HEAD");
  return [...methods];
}

const routeFiles = collectApiRouteFiles(ROOT);
const API_ROOT = apiRoot(ROOT);
const routes = new Map(); // urlPath -> methods
for (const rel of routeFiles) {
  const abs = path.join(ROOT, rel);
  const url = toApiUrlPath(path.dirname(abs), API_ROOT);
  if (url) routes.set(url, routeMethods(abs));
}

// --- paths already in the spec -------------------------------------------------
const spec = fs.readFileSync(SPEC, "utf8");
const specPaths = new Set();
for (const m of spec.matchAll(/^ {2}(\/[^\s:]+):\s*$/gm)) specPaths.add(normalizeParams(m[1]));

const missing = [...routes.entries()]
  .filter(([url]) => !specPaths.has(normalizeParams(url)))
  .filter(([, methods]) => methods.length > 0)
  .sort(([a], [b]) => a.localeCompare(b));

// --- tag + summary derivation --------------------------------------------------
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function groupTag(url) {
  const seg = url.replace(/^\/api\//, "").split("/");
  if (seg[0] === "v1") return seg[1] ? `V1 ${cap(seg[1].replace(/\{|\}/g, ""))}` : "V1";
  return cap(seg[0].replace(/\{|\}/g, "").replace(/-/g, " "));
}
function summaryFor(url, method) {
  const tail = url
    .replace(/^\/api\/(v1\/)?/, "")
    .replace(/\{([^}]+)\}/g, "<$1>")
    .replace(/[/]/g, " › ")
    .replace(/-/g, " ");
  return `${method} ${tail}`;
}

// --- emit YAML -----------------------------------------------------------------
const existingTags = new Set(
  [...spec.matchAll(/^ {2}- name: (.+)$/gm)].map((m) => m[1].trim().toLowerCase())
);
const newTags = new Map();
const lines = [];
lines.push("");
lines.push("  # --- Generated route coverage (docs audit 2026-08-31) -----------------------");
lines.push("  # Minimal entries for every implemented route not documented above. Methods");
lines.push("  # are parsed from each route.ts's exports; summaries are path-derived.");
lines.push(
  "  # Regenerate with: node --import tsx/esm scripts/ad-hoc/gen-openapi-missing-paths.mjs --apply"
);
for (const [url, methods] of missing) {
  const tag = groupTag(url);
  if (!existingTags.has(tag.toLowerCase()) && !newTags.has(tag))
    newTags.set(tag, `${tag} endpoints (generated route coverage)`);
  lines.push(`  ${url}:`);
  const loopbackOnly = isLocalOnlyPath(url);
  const alwaysProtected = ALWAYS_PROTECTED_API_PATHS.includes(url);
  for (const method of methods.sort()) {
    lines.push(`    ${method.toLowerCase()}:`);
    lines.push(`      tags:`);
    lines.push(`        - ${tag}`);
    lines.push(`      summary: "${summaryFor(url, method)}"`);
    if (loopbackOnly || isLocalOnlyPath(url, method)) lines.push(`      x-loopback-only: true`);
    if (alwaysProtected) lines.push(`      x-always-protected: true`);
    lines.push(`      responses:`);
    lines.push(`        "200":`);
    lines.push(`          description: OK`);
  }
}

const tagLines = [...newTags.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([name, description]) => `  - name: ${name}\n    description: ${description}`)
  .join("\n");

console.log(
  `real routes: ${routes.size} · already in spec: ${specPaths.size} · missing with methods: ${missing.length} · new tags: ${newTags.size}`
);
if (!APPLY) {
  console.log("(dry-run) pass --apply to write docs/openapi.yaml");
  process.exit(0);
}

let out = spec;
// append new tags right after the last existing tag entry (before `paths:`)
if (tagLines) out = out.replace(/\npaths:\n/, `\n${tagLines}\n\npaths:\n`);
// insert generated paths right before the components section
out = out.replace(/\ncomponents:\n/, `\n${lines.join("\n")}\n\ncomponents:\n`);
fs.writeFileSync(SPEC, out);
console.log(`wrote ${missing.length} paths + ${newTags.size} tags to docs/openapi.yaml`);
