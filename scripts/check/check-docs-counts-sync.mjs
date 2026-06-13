#!/usr/bin/env node
// Validates that count-based assertions in docs match the actual code state.
//
// Two tiers of checks:
//   • STRICT (always blocking — exit 1 on drift): high-confidence, slow-moving counts
//     that historically caused the worst drift across README / AGENTS / docs.
//       - provider count (source of truth: docs/reference/PROVIDER_REFERENCE.md total,
//         which is auto-generated from src/shared/constants/providers.ts)
//       - i18n locale count (source of truth: config/i18n.json `locales`)
//   • SOFT (heuristic — only fails with --strict): file-count based assertions that can
//     false-positive.
//       - executors count in open-sse/executors/
//       - routing strategies in src/shared/constants/routingStrategies.ts
//       - OAuth providers in src/lib/oauth/providers/
//       - A2A skills in src/lib/a2a/skills/
//       - Cloud agents in src/lib/cloudAgent/agents/
//
// Exits 0 on success, 1 on STRICT drift (or any drift with --strict).
// Run: node scripts/check/check-docs-counts-sync.mjs
//
// NOTE: the provider check trusts PROVIDER_REFERENCE.md as the canonical total. If a
// provider is added to the code but the reference is not regenerated, this guard will
// not catch it — regenerate with `npm run gen:provider-reference` before relying on it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

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

// PURE: parse the canonical provider total out of the auto-generated catalog text.
export function parseProviderTotal(referenceText) {
  if (!referenceText) return 0;
  const m = referenceText.match(/Total providers:\s*\*\*(\d+)\*\*/);
  return m ? Number(m[1]) : 0;
}

// STRICT: canonical provider total, read from the auto-generated catalog.
export function readProviderTotal() {
  const abs = path.join(ROOT, "docs", "reference", "PROVIDER_REFERENCE.md");
  if (!fs.existsSync(abs)) return 0;
  return parseProviderTotal(fs.readFileSync(abs, "utf8"));
}

// STRICT: canonical i18n locale count, read from the shared config.
export function countLocales() {
  const abs = path.join(ROOT, "config", "i18n.json");
  if (!fs.existsSync(abs)) return 0;
  try {
    const cfg = JSON.parse(fs.readFileSync(abs, "utf8"));
    return Array.isArray(cfg.locales) ? cfg.locales.length : 0;
  } catch {
    return 0;
  }
}

// PURE: tally STRICT vs SOFT drift for a list of checks, given a content lookup.
// `getContent(file) -> string | null`. A check whose `actual` is 0 is skipped (the
// source count could not be determined). Returns { strict, soft, lines }.
export function tallyDrift(checks, getContent) {
  let strict = 0;
  let soft = 0;
  const lines = [];
  for (const c of checks) {
    const tier = c.strict ? "STRICT" : "soft";
    lines.push(`\n• ${c.label}: ${c.actual} (real) [${tier}]`);
    if (!c.actual) {
      lines.push(`  ⚠ could not determine ${c.docKey} count from source — skipping`);
      continue;
    }
    for (const f of c.files) {
      const content = getContent(f);
      const found = content != null && content.includes(String(c.actual));
      if (found) {
        lines.push(`  ✓ ${f} mentions "${c.actual}"`);
      } else {
        lines.push(`  ${c.strict ? "✗" : "⚠"} ${f} does NOT mention "${c.actual}" for ${c.docKey}`);
        if (c.strict) strict++;
        else soft++;
      }
    }
  }
  return { strict, soft, lines };
}

export function buildChecks() {
  return [
    {
      label: "Provider count",
      actual: readProviderTotal(),
      docKey: "providers",
      strict: true,
      files: ["README.md", "AGENTS.md", "CLAUDE.md"],
    },
    {
      label: "i18n locales count",
      actual: countLocales(),
      docKey: "i18n locales",
      strict: true,
      files: ["docs/README.md", "docs/guides/I18N.md", "AGENTS.md"],
    },
    {
      label: "Executors count",
      actual: countFiles("open-sse/executors"),
      docKey: "executors",
      strict: false,
      files: ["docs/architecture/ARCHITECTURE.md", "docs/architecture/CODEBASE_DOCUMENTATION.md"],
    },
    {
      label: "Routing strategies count",
      actual: countRoutingStrategies(),
      docKey: "strategies",
      strict: false,
      files: ["docs/routing/AUTO-COMBO.md", "docs/architecture/RESILIENCE_GUIDE.md"],
    },
    {
      label: "OAuth providers count",
      actual: countFiles("src/lib/oauth/providers"),
      docKey: "OAuth providers",
      strict: false,
      files: ["docs/architecture/ARCHITECTURE.md"],
    },
    {
      label: "A2A skills count",
      actual: countFiles("src/lib/a2a/skills"),
      docKey: "A2A skills",
      strict: false,
      files: ["docs/frameworks/A2A-SERVER.md"],
    },
    {
      label: "Cloud agents count",
      actual: countFiles("src/lib/cloudAgent/agents"),
      docKey: "cloud agents",
      strict: false,
      files: ["docs/frameworks/CLOUD_AGENT.md", "docs/frameworks/AGENT_PROTOCOLS_GUIDE.md"],
    },
  ];
}

function main() {
  const checks = buildChecks();
  const getContent = (relPath) => {
    const abs = path.join(ROOT, relPath);
    return fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
  };

  console.log("Docs counts sync report");
  console.log("=======================");
  const { strict, soft, lines } = tallyDrift(checks, getContent);
  for (const l of lines) console.log(l);

  console.log();
  if (strict > 0) {
    console.error(
      `✗ ${strict} STRICT drift(s) detected. ` +
        `Update the docs above to the real counts, or regenerate auto-generated sources ` +
        `(npm run gen:provider-reference).`
    );
    process.exit(1);
  }
  if (soft > 0) {
    console.warn(`⚠ ${soft} potential (soft) drift(s) detected. Review the docs above.`);
    if (process.argv.includes("--strict")) process.exit(1);
  } else {
    console.log("✓ All checks pass.");
  }
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
