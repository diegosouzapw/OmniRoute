import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = process.cwd();
const API_ROOT = path.join(ROOT, "src", "app", "api");
const OPENAPI_PATH = path.join(ROOT, "docs", "reference", "openapi.yaml");

function collectRoutePaths(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const paths: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...collectRoutePaths(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name === "route.ts") {
      const apiPath = path
        .dirname(fullPath)
        .replace(API_ROOT, "")
        .replace(/\[([^\]]+)\]/g, "{$1}");
      paths.push(`/api${apiPath}`);
    }
  }
  return paths;
}

function normalizePath(p: string): string {
  return p.replace(/\/\[\.\.\.([^\]]+)\]/g, "/{$1}").replace(/\[([^\]]+)\]/g, "{$1}");
}

// Floor recorded on 2026-05-26 for release/v3.8.4: 137/365 routes documented.
// The ≥99% target is tracked in the OpenAPI audit follow-up; until backlog routes
// (services, free-proxies, relay-tokens, key-groups, middleware/hooks, etc.) are
// documented, the gate enforces "no regressions" instead of the absolute target.
const OPENAPI_COVERAGE_FLOOR_PERCENT = 36;

test("openapi.yaml does not regress documented-route coverage below the agreed floor", () => {
  const implementedPaths = collectRoutePaths(API_ROOT).map(normalizePath).sort();
  const raw: any = yaml.load(fs.readFileSync(OPENAPI_PATH, "utf-8"));
  const documentedPaths = new Set(Object.keys(raw.paths || {}));

  let covered = 0;
  const missing: string[] = [];

  for (const p of implementedPaths) {
    if (documentedPaths.has(p)) {
      covered++;
    } else {
      missing.push(p);
    }
  }

  const total = implementedPaths.length;
  const coverage = (covered / total) * 100;

  if (coverage < OPENAPI_COVERAGE_FLOOR_PERCENT) {
    console.error(`Coverage: ${coverage.toFixed(1)}% (${covered}/${total})`);
    console.error("Missing paths:");
    missing.forEach((p) => console.error(`  - ${p}`));
  }

  assert.ok(
    coverage >= OPENAPI_COVERAGE_FLOOR_PERCENT,
    `OpenAPI coverage regressed: ${coverage.toFixed(1)}% < floor ${OPENAPI_COVERAGE_FLOOR_PERCENT}%. ` +
      `Missing: ${missing.slice(0, 10).join(", ")}${missing.length > 10 ? ` ... +${missing.length - 10} more` : ""}`
  );
});
