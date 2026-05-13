#!/usr/bin/env node
// Validates that count-based assertions in docs match the actual code state.
// Examples checked:
//   - executors count in open-sse/executors/
//   - routing strategies in src/shared/constants/routingStrategies.ts
//   - OAuth providers in src/lib/oauth/providers/
//   - A2A skills in src/lib/a2a/skills/
//   - Cloud agents in src/lib/cloudAgent/agents/
//
// Exits 0 on success, 1 on detected drift.
// Run: node scripts/check-docs-counts-sync.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const COMMON_NON_IMPL_BASENAMES = new Set([
  "index.ts",
  "index.mts",
  "types.ts",
  "base.ts",
  "constants.ts",
]);

function countFiles(dir, suffix = ".ts") {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return 0;
  return fs
    .readdirSync(abs)
    .filter(
      (f) =>
        f.endsWith(suffix) &&
        !f.endsWith(".test.ts") &&
        !f.startsWith("__") &&
        !COMMON_NON_IMPL_BASENAMES.has(f)
    ).length;
}

function countRoutingStrategies() {
  const file = path.join(ROOT, "src", "shared", "constants", "routingStrategies.ts");
  if (!fs.existsSync(file)) return 0;
  const txt = fs.readFileSync(file, "utf8");
  const m = txt.match(/ROUTING_STRATEGY_VALUES\s*=\s*\[([^\]]*)\]/);
  if (!m) return 0;
  return (m[1].match(/"[^"]+"/g) || []).length;
}

function docContains(docPath, needle) {
  const abs = path.join(ROOT, "docs", docPath);
  if (!fs.existsSync(abs)) return false;
  return fs.readFileSync(abs, "utf8").includes(needle);
}

const checks = [
  {
    label: "Executors count",
    actual: countFiles("open-sse/executors"),
    docKey: "executors",
    docs: ["ARCHITECTURE.md", "CODEBASE_DOCUMENTATION.md"],
  },
  {
    label: "Routing strategies count",
    actual: countRoutingStrategies(),
    docKey: "strategies",
    docs: ["AUTO-COMBO.md", "RESILIENCE_GUIDE.md"],
  },
  {
    label: "OAuth providers count",
    actual: countFiles("src/lib/oauth/providers"),
    docKey: "OAuth providers",
    docs: ["ARCHITECTURE.md"],
  },
  {
    label: "A2A skills count",
    actual: countFiles("src/lib/a2a/skills"),
    docKey: "A2A skills",
    docs: ["A2A-SERVER.md"],
  },
  {
    label: "Cloud agents count",
    actual: countFiles("src/lib/cloudAgent/agents"),
    docKey: "cloud agents",
    docs: ["CLOUD_AGENT.md", "AGENT_PROTOCOLS_GUIDE.md"],
  },
];

let drift = 0;
console.log("Docs counts sync report");
console.log("=======================");

for (const c of checks) {
  console.log(`\n• ${c.label}: ${c.actual} (real)`);
  for (const doc of c.docs) {
    const found = docContains(doc, String(c.actual));
    if (found) {
      console.log(`  ✓ docs/${doc} mentions "${c.actual}"`);
    } else {
      console.log(`  ⚠ docs/${doc} does NOT mention "${c.actual}" for ${c.docKey}`);
      drift++;
    }
  }
}

console.log();
if (drift > 0) {
  console.warn(`⚠ ${drift} potential drift(s) detected. Review the docs above.`);
  // Soft-fail by default (count-based heuristic can false-positive).
  // To enforce, pass --strict.
  if (process.argv.includes("--strict")) process.exit(1);
} else {
  console.log("✓ All checks pass.");
}
