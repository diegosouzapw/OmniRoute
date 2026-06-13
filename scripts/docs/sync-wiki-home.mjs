#!/usr/bin/env node
// Keeps the GitHub wiki cover page (Home.md) counts in sync with the real code state.
// The wiki historically drifts (it has no generator) — this closes the loop for the
// most visible, fastest-drifting numbers on the landing page.
//
// Counts (source of truth):
//   - providers          → docs/reference/PROVIDER_REFERENCE.md "Total providers: **N**"
//   - routing strategies → src/shared/constants/routingStrategies.ts ROUTING_STRATEGY_VALUES
//   - MCP tools          → open-sse/mcp-server/server.ts TOTAL_MCP_TOOL_COUNT
//   - i18n locales       → config/i18n.json `locales`
//
// Usage:
//   node scripts/docs/sync-wiki-home.mjs --wiki-dir <path>           # rewrite Home.md
//   node scripts/docs/sync-wiki-home.mjs --wiki-dir <path> --check   # exit 1 on drift, no write
//
// The wiki uses curated Title-Case page names + 40+ translated mirrors; this script only
// touches the four cover-page counts on Home.md and never rewrites structure or i18n.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

function read(rel) {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

function providerCount() {
  const m = read("docs/reference/PROVIDER_REFERENCE.md").match(/Total providers:\s*\*\*(\d+)\*\*/);
  return m ? Number(m[1]) : null;
}
function strategyCount() {
  const m = read("src/shared/constants/routingStrategies.ts").match(
    /ROUTING_STRATEGY_VALUES\s*=\s*\[([^\]]*)\]/
  );
  return m ? (m[1].match(/"[^"]+"/g) || []).length : null;
}
function mcpToolCount() {
  const m = read("open-sse/mcp-server/server.ts").match(/TOTAL_MCP_TOOL_COUNT\s*=\s*(\d+)/);
  return m ? Number(m[1]) : null;
}
function localeCount() {
  try {
    const c = JSON.parse(read("config/i18n.json"));
    return Array.isArray(c.locales) ? c.locales.length : null;
  } catch {
    return null;
  }
}

// PURE: apply the cover-page count substitutions to Home.md text. Exported for tests.
export function syncHomeCounts(home, counts) {
  let out = home;
  if (counts.providers) {
    out = out
      .replace(
        /Connect every AI tool to \d+ providers/g,
        `Connect every AI tool to ${counts.providers} providers`
      )
      .replace(/\*\*\d+ AI Providers\*\*/g, `**${counts.providers} AI Providers**`)
      .replace(/All \d+ supported providers/g, `All ${counts.providers} supported providers`);
  }
  if (counts.strategies) {
    out = out.replace(
      /\*\*\d+ Routing Strategies\*\*/g,
      `**${counts.strategies} Routing Strategies**`
    );
  }
  if (counts.mcpTools) {
    out = out.replace(/(\|\s*\*\*MCP Server\*\*\s*\|\s*)\d+( tools)/g, `$1${counts.mcpTools}$2`);
  }
  return out;
}

export function readCounts() {
  return {
    providers: providerCount(),
    strategies: strategyCount(),
    mcpTools: mcpToolCount(),
    locales: localeCount(),
  };
}

function main() {
  const args = process.argv.slice(2);
  const i = args.indexOf("--wiki-dir");
  const wikiDir = i >= 0 ? args[i + 1] : null;
  const check = args.includes("--check");
  if (!wikiDir) {
    console.error("usage: sync-wiki-home.mjs --wiki-dir <path> [--check]");
    process.exit(2);
  }
  const homePath = path.join(wikiDir, "Home.md");
  if (!fs.existsSync(homePath)) {
    console.error(`Home.md not found in ${wikiDir}`);
    process.exit(2);
  }

  const counts = readCounts();
  const before = fs.readFileSync(homePath, "utf8");
  const after = syncHomeCounts(before, counts);
  const changed = after !== before;

  if (check) {
    if (changed) {
      console.error("✗ wiki Home.md is out of sync with code counts:", counts);
      process.exit(1);
    }
    console.log("✓ wiki Home.md counts in sync:", counts);
    return;
  }
  if (changed) {
    fs.writeFileSync(homePath, after);
    console.log("✓ updated wiki Home.md:", counts);
  } else {
    console.log("✓ wiki Home.md already in sync:", counts);
  }
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
