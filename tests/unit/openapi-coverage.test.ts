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

test("openapi.yaml covers ≥ 99% of implemented routes (excluding x-internal routes counted as covered)", () => {
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

  if (coverage < 99) {
    console.error(`Coverage: ${coverage.toFixed(1)}% (${covered}/${total})`);
    console.error("Missing paths:");
    missing.forEach((p) => console.error(`  - ${p}`));
  }

  assert.ok(
    coverage >= 99,
    `OpenAPI coverage ${coverage.toFixed(1)}% < 99%. Missing: ${missing.slice(0, 10).join(", ")}${missing.length > 10 ? ` ... +${missing.length - 10} more` : ""}`
  );
});
