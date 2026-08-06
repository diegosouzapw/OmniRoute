#!/usr/bin/env node
// Validates that count-based assertions in docs match the actual code state.
//
// Two tiers of checks:
//   • STRICT (always blocking — exit 1 on drift): high-confidence, slow-moving counts
//     that historically caused the worst drift across user-facing documentation.
//       - provider count (source of truth: live AI_PROVIDERS from
//         src/shared/constants/providers.ts)
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
// PROVIDER_REFERENCE.md is checked as an output, never trusted as the source of truth.
// This prevents a stale generated catalog from making the README/agent docs appear green.

import fs from "node:fs";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

// Side-effect-free fallback for linked worktrees whose shared node_modules cannot load one of
// the runtime MCP handlers. These are the exact source files that contribute definitions to the
// de-duplicated inventory assembled in open-sse/mcp-server/server.ts. The base registry spreads
// three smaller schema modules, so they are included explicitly here as well.
const MCP_TOOL_SOURCE_FILES = [
  "open-sse/mcp-server/schemas/tools.ts",
  "open-sse/mcp-server/schemas/toolSearch.ts",
  "open-sse/mcp-server/schemas/pickFastestModel.ts",
  "open-sse/mcp-server/schemas/ccrTools.ts",
  "open-sse/mcp-server/tools/memoryTools.ts",
  "open-sse/mcp-server/tools/skillTools.ts",
  "open-sse/mcp-server/tools/agentSkillTools.ts",
  "open-sse/mcp-server/tools/githubSkillTools.ts",
  "open-sse/mcp-server/tools/poolTools.ts",
  "open-sse/mcp-server/tools/gamificationTools.ts",
  "open-sse/mcp-server/tools/pluginTools.ts",
  "open-sse/mcp-server/tools/notionTools.ts",
  "open-sse/mcp-server/tools/obsidianTools.ts",
  "open-sse/mcp-server/tools/localCorpusTools.ts",
  "open-sse/mcp-server/tools/compressionTools.ts",
];

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

function countTopLevelFiles(dir, suffix) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return 0;
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(suffix)).length;
}

export function listLocalizedDocs(relativePath) {
  const root = path.join(ROOT, "docs", "i18n");
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.posix.join("docs", "i18n", entry.name, relativePath))
    .filter((relPath) => fs.existsSync(path.join(ROOT, relPath)))
    .sort();
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

// STRICT: canonical provider total, read from the live runtime catalog.
export function readProviderTotal() {
  return readCodeFacts()?.providerTotal ?? 0;
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

// PURE with respect to application state: reads literal tool metadata without importing handlers,
// opening SQLite, or resolving optional runtime dependencies. Names are de-duplicated for the same
// reason as countUniqueMcpTools(); scopes are unioned from the same canonical definitions.
export function readMcpFactsFromSource() {
  const names = new Set();
  const scopes = new Set();

  for (const relPath of MCP_TOOL_SOURCE_FILES) {
    const abs = path.join(ROOT, relPath);
    if (!fs.existsSync(abs)) return null;
    const source = fs.readFileSync(abs, "utf8");

    for (const match of source.matchAll(/\bname:\s*"([^"]+)"/g)) {
      names.add(match[1]);
    }
    for (const match of source.matchAll(/\bscopes:\s*\[([^\]]*)\]/g)) {
      for (const scope of match[1].matchAll(/"([^"]+)"/g)) {
        scopes.add(scope[1]);
      }
    }
  }

  return { tools: names.size, scopes: scopes.size };
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
      if (c.validate) {
        if (content == null) continue;
        const v = c.validate(content);
        lines.push(`  ${v.ok ? "✓" : c.strict ? "✗" : "⚠"} ${f} — ${v.detail}`);
        if (!v.ok) {
          if (c.strict) strict++;
          else soft++;
        }
        continue;
      }
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

// Reads every code-derived fact in ONE tsx subprocess — the same functions the app
// serves at runtime, never a hardcoded copy. DATA_DIR is redirected to a throwaway dir
// so importing the MCP tool modules cannot touch the operator's real SQLite file.
// Returns null when tsx is unavailable so the gate degrades to a skip, not a false red.
let codeFactsCache;

function readCodeFacts() {
  if (codeFactsCache !== undefined) return codeFactsCache;
  const script = [
    'import {computeFreeModelTotals} from "./open-sse/config/freeModelCatalog.ts";',
    'import {AI_PROVIDERS,NOAUTH_PROVIDERS} from "./src/shared/constants/providers.ts";',
    'import {ENGINE_IDS} from "./open-sse/services/compression/engineCatalog.ts";',
    'import {CLI_TOOLS} from "./src/shared/constants/cliTools.ts";',
    'import {countUniqueMcpTools} from "./open-sse/mcp-server/toolCount.ts";',
    'import {MCP_TOOLS} from "./open-sse/mcp-server/schemas/tools.ts";',
    'import {memoryTools} from "./open-sse/mcp-server/tools/memoryTools.ts";',
    'import {skillTools} from "./open-sse/mcp-server/tools/skillTools.ts";',
    'import {agentSkillTools} from "./open-sse/mcp-server/tools/agentSkillTools.ts";',
    'import {githubSkillTools} from "./open-sse/mcp-server/tools/githubSkillTools.ts";',
    'import {poolTools} from "./open-sse/mcp-server/tools/poolTools.ts";',
    'import {gamificationTools} from "./open-sse/mcp-server/tools/gamificationTools.ts";',
    'import {pluginTools} from "./open-sse/mcp-server/tools/pluginTools.ts";',
    'import {notionTools} from "./open-sse/mcp-server/tools/notionTools.ts";',
    'import {obsidianTools} from "./open-sse/mcp-server/tools/obsidianTools.ts";',
    'import {localCorpusTools} from "./open-sse/mcp-server/tools/localCorpusTools.ts";',
    'import {compressionTools} from "./open-sse/mcp-server/tools/compressionTools.ts";',
    "const cols={MCP_TOOLS,memoryTools,skillTools,agentSkillTools,githubSkillTools,poolTools,",
    "gamificationTools,pluginTools,notionTools,obsidianTools,localCorpusTools,compressionTools};",
    "const sc=new Set();",
    "for(const col of Object.values(cols))for(const t of Object.values(col))",
    "for(const x of (t?.scopes||[]))sc.add(x);",
    "const t=computeFreeModelTotals();const cli=Object.values(CLI_TOOLS);",
    "const providers=Object.values(AI_PROVIDERS);",
    "const freeIds=new Set([...Object.values(NOAUTH_PROVIDERS),",
    "...providers.filter(p=>p?.hasFree===true)].map(p=>p.id));",
    "const by=(c)=>cli.filter(x=>x.category===c).length;",
    'console.log("@@"+JSON.stringify({providerTotal:providers.length,providerFree:freeIds.size,',
    "freeSteady:t.steadyRecurringTokens,freeFirst:t.firstMonthRealisticTokens,",
    "freePools:t.poolCount,freeModels:t.modelCount,engines:ENGINE_IDS.length,",
    "cliTotal:cli.length,cliCode:by('code'),cliAgent:by('agent'),",
    "mcpTools:countUniqueMcpTools(cols),mcpScopes:sc.size}));",
  ].join("");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "docs-counts-"));
  try {
    const run = (source) =>
      spawnSync(process.execPath, ["--import", "tsx/esm", "-e", source], {
        cwd: ROOT,
        encoding: "utf8",
        timeout: 180000,
        env: { ...process.env, DATA_DIR: tmp, APP_LOG_LEVEL: "silent" },
      });
    const parse = (result) => {
      if (result.status !== 0 || !result.stdout) return null;
      const line = result.stdout.split("\n").find((l) => l.startsWith("@@"));
      return line ? JSON.parse(line.slice(2)) : null;
    };
    const full = parse(run(script));
    if (full) return (codeFactsCache = full);

    // A linked node_modules shared by git worktrees can make an unrelated optional MCP
    // dependency fail ESM resolution. Keep the provider/free-tier gate strict by falling
    // back to the lightweight runtime modules, then recover MCP counts from literal source
    // metadata without importing the failing handlers. Normal CI installations take the
    // full runtime path above.
    const fallbackScript = [
      'import {computeFreeModelTotals} from "./open-sse/config/freeModelCatalog.ts";',
      'import {AI_PROVIDERS,NOAUTH_PROVIDERS} from "./src/shared/constants/providers.ts";',
      'import {ENGINE_IDS} from "./open-sse/services/compression/engineCatalog.ts";',
      'import {CLI_TOOLS} from "./src/shared/constants/cliTools.ts";',
      "const t=computeFreeModelTotals();const cli=Object.values(CLI_TOOLS);",
      "const providers=Object.values(AI_PROVIDERS);",
      "const freeIds=new Set([...Object.values(NOAUTH_PROVIDERS),",
      "...providers.filter(p=>p?.hasFree===true)].map(p=>p.id));",
      "const by=(c)=>cli.filter(x=>x.category===c).length;",
      'console.log("@@"+JSON.stringify({providerTotal:providers.length,providerFree:freeIds.size,',
      "freeSteady:t.steadyRecurringTokens,freeFirst:t.firstMonthRealisticTokens,",
      "freePools:t.poolCount,freeModels:t.modelCount,engines:ENGINE_IDS.length,",
      "cliTotal:cli.length,cliCode:by('code'),cliAgent:by('agent')}));",
    ].join("");
    const fallback = parse(run(fallbackScript));
    const mcpFacts = readMcpFactsFromSource();
    if (!fallback || !mcpFacts) return (codeFactsCache = null);
    return (codeFactsCache = {
      ...fallback,
      mcpTools: mcpFacts.tools,
      mcpScopes: mcpFacts.scopes,
    });
  } catch {
    return (codeFactsCache = null);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// The docs publish a rounded aggregate headline ("~1.4B"). Accept a claim that rounds to
// the live value at one decimal place; reject a stale one. Tolerance is tight on purpose:
// this gate exists so the headline cannot drift upward unnoticed.
//
// Only the AGGREGATE headline is validated, via an explicit whitelist. These files also
// carry figures that are legitimately not the headline and must never trip the gate:
// the theoretical ceiling ("would read ~10B; not published"), the historical "previous
// ~1.94B", and per-model rows ("mistral … ~1.00B"). A whitelist keeps those safe without
// having to enumerate every contrastive phrasing.
const HEADLINE_AFTER = /^\s*(?:documented\s+)?free tokens|^\s*in (?:your|the) first month/i;
const HEADLINE_BEFORE = /(recurring grant[^|]*\|\s*\**|signup credits[^|]*\|\s*\**|up to\s*)$/i;

export function extractHeadlineClaims(content) {
  const claims = [];
  for (const m of content.matchAll(/~(\d+(?:\.\d+)?)B/g)) {
    const after = content.slice(m.index + m[0].length, m.index + m[0].length + 80);
    const before = content.slice(Math.max(0, m.index - 80), m.index);
    if (!HEADLINE_AFTER.test(after) && !HEADLINE_BEFORE.test(before)) continue;
    claims.push({ value: Number(m[1]), text: m[0] });
  }
  return claims;
}

export function checkFreeTierHeadline(content, totals) {
  const claims = extractHeadlineClaims(content);
  if (!claims.length) return { ok: true, detail: "no aggregate free-tier headline in this file" };
  const steady = totals.s / 1e9;
  const first = totals.m / 1e9;
  const stale = claims.filter(
    (c) => Math.abs(c.value - steady) >= 0.05 && Math.abs(c.value - first) >= 0.05
  );
  if (!stale.length)
    return { ok: true, detail: `${claims.length} headline claim(s) match the live catalog` };
  return {
    ok: false,
    detail:
      `stale headline ${[...new Set(stale.map((c) => c.text))].join(", ")} — live catalog ` +
      `computes ~${steady.toFixed(2)}B steady / ~${first.toFixed(2)}B first month`,
  };
}

export function checkFreeTierInventory(content, totals) {
  const claims = [
    ...content.matchAll(
      /(\d+)\s+(?:provider\s+)?pools?\s*(?:\/|and|·)\s*(\d+)\s+(?:model budget entries|models)/gi
    ),
  ];
  if (!claims.length) return { ok: true, detail: "no aggregate free-tier inventory claim" };
  const stale = claims.filter(
    (claim) => Number(claim[1]) !== totals.pools || Number(claim[2]) !== totals.models
  );
  if (!stale.length) {
    return { ok: true, detail: `${claims.length} inventory claim(s) match the live catalog` };
  }
  return {
    ok: false,
    detail:
      `stale free-tier inventory: ${[...new Set(stale.map((claim) => `"${claim[0]}"`))].join(", ")} — ` +
      `live catalog has ${totals.pools} pools / ${totals.models} model budget entries`,
  };
}

// --- Generic numeric-claim gate ---------------------------------------------
// Same principle as the free-tier headline: docs legitimately carry numbers that are
// NOT the aggregate being gated (per-module tool counts like "Memory tool definitions
// (3 tools)", the CLI catalog's "33 tools (25 CLI Code's ...)" next to the MCP total).
// So every check declares what to skip rather than assuming any "N tools" is the claim.
export function extractNumberClaims(content, { pattern, skipBefore, skipAfter }) {
  const claims = [];
  for (const m of content.matchAll(pattern)) {
    const before = content.slice(Math.max(0, m.index - 40), m.index);
    const after = content.slice(m.index + m[0].length, m.index + m[0].length + 40);
    if (skipBefore && skipBefore.test(before)) continue;
    if (skipAfter && skipAfter.test(after)) continue;
    claims.push({ value: Number(m[1]), text: m[0].trim() });
  }
  return claims;
}

export function makeNumberClaimValidator(expected, opts) {
  return (content) => {
    const claims = extractNumberClaims(content, opts);
    if (!claims.length) return { ok: true, detail: `no ${opts.what} claim in this file` };
    const stale = claims.filter((c) => c.value !== expected);
    if (!stale.length)
      return { ok: true, detail: `${claims.length} ${opts.what} claim(s) match the code` };
    return {
      ok: false,
      detail:
        `stale ${opts.what}: ${[...new Set(stale.map((c) => `"${c.text}"`))].join(", ")} — ` +
        `code has ${expected}`,
    };
  };
}

export function makeRequiredCountsValidator(requirements) {
  return (content) => {
    const missing = requirements.filter(({ value }) => !content.includes(String(value)));
    if (!missing.length) {
      return {
        ok: true,
        detail: `${requirements.length} required live count marker(s) are present`,
      };
    }
    return {
      ok: false,
      detail: `missing live count marker(s): ${missing
        .map(({ label, value }) => `${label}=${value}`)
        .join(", ")}`,
    };
  };
}

export function buildChecks() {
  const f = readCodeFacts();
  const dbModules = countTopLevelFiles("src/lib/db", ".ts");
  const migrations = countTopLevelFiles("src/lib/db/migrations", ".sql");
  const executors = countFiles("open-sse/executors");
  const services = countTopLevelFiles("open-sse/services", ".ts");
  const oauthModules = countFiles("src/lib/oauth/providers");
  return [
    {
      label: "Provider count",
      actual: f?.providerTotal ?? 0,
      docKey: "providers",
      strict: true,
      files: ["README.md", "CLAUDE.md", "docs/reference/PROVIDER_REFERENCE.md"],
    },
    {
      label: "i18n locales count",
      actual: countLocales(),
      docKey: "i18n locales",
      strict: true,
      files: ["docs/README.md", "docs/guides/I18N.md"],
    },
    ...(() => {
      if (!f)
        return [
          {
            label: "Code-derived counts",
            actual: 0,
            docKey: "code facts",
            strict: false,
            files: [],
          },
        ];
      const claim = (expected, what, opts, files) => ({
        label: `${what} (live code)`,
        actual: expected,
        docKey: what,
        strict: true,
        files,
        validate: makeNumberClaimValidator(expected, { what, ...opts }),
      });
      return [
        {
          label: "Free-tier headline (live catalog)",
          actual: `~${(f.freeSteady / 1e9).toFixed(2)}B steady / ${f.freePools} pools`,
          docKey: "free-tier headline",
          strict: true,
          files: ["README.md", "docs/reference/FREE_TIERS.md"],
          validate: (content) =>
            checkFreeTierHeadline(content, { s: f.freeSteady, m: f.freeFirst }),
        },
        {
          label: "Free-tier inventory (live catalog)",
          actual: `${f.freePools} pools / ${f.freeModels} model budget entries`,
          docKey: "free-tier inventory",
          strict: true,
          files: ["README.md", "docs/reference/FREE_TIERS.md"],
          validate: (content) =>
            checkFreeTierInventory(content, { pools: f.freePools, models: f.freeModels }),
        },
        claim(
          f.providerFree,
          "free-access providers",
          {
            pattern:
              /(\d+)\s+(?:catalog entries|providers)\s+marked\s+(?:with\s+)?free(?:\s+access)?\/no-auth/gi,
          },
          ["README.md", "docs/reference/FREE_TIERS.md"]
        ),
        claim(
          f.engines,
          "compression engines",
          { pattern: /(\d+)[-\s](?:engine stack|composable engines|stacked engines)/gi },
          ["README.md"]
        ),
        claim(
          f.mcpTools,
          "MCP tools",
          {
            pattern: /(\d+) tools/gi,
            // per-module rows ("Memory tool definitions (3 tools)") and the CLI catalog
            // total ("33 tools (25 CLI Code's …)") are not the MCP aggregate
            // per-module rows read "… tool definitions (N tools" / "… management tools
            // (N tools" — the word tool(s)/definitions sits right before the paren. The
            // aggregate ("MCP Server (107 tools", "all 107 tools") never does.
            skipBefore: /(tools?|definitions?)\s*\(\s*$/i,
            skipAfter: /^\s*\(\d+ CLI/,
          },
          ["README.md", "CLAUDE.md", "docs/frameworks/MCP-SERVER.md"]
        ),
        claim(f.mcpScopes, "MCP scopes", { pattern: /(\d+) scopes/gi }, ["README.md", "CLAUDE.md"]),
        claim(f.cliTotal, "CLI tools", { pattern: /(\d+) tools(?=\s*\(\d+ CLI)/gi }, ["README.md"]),
        {
          label: "Localized README headline counts",
          actual: f.providerTotal,
          docKey: "localized README provider/MCP counts",
          strict: true,
          files: listLocalizedDocs("README.md"),
          validate: makeRequiredCountsValidator([
            { label: "providers", value: f.providerTotal },
            { label: "MCP tools", value: f.mcpTools },
            { label: "MCP scopes", value: f.mcpScopes },
          ]),
        },
        {
          label: "Localized CLAUDE inventory counts",
          actual: f.providerTotal,
          docKey: "localized CLAUDE inventory counts",
          strict: true,
          files: listLocalizedDocs("CLAUDE.md"),
          validate: makeRequiredCountsValidator([
            { label: "providers", value: f.providerTotal },
            { label: "DB modules", value: dbModules },
            { label: "migrations", value: migrations },
            { label: "MCP tools", value: f.mcpTools },
            { label: "MCP scopes", value: f.mcpScopes },
          ]),
        },
        {
          label: "Localized architecture inventory counts",
          actual: f.providerTotal,
          docKey: "localized architecture inventory counts",
          strict: true,
          files: listLocalizedDocs("docs/architecture/ARCHITECTURE.md"),
          validate: makeRequiredCountsValidator([
            { label: "providers", value: f.providerTotal },
            { label: "executors", value: executors },
            { label: "OAuth modules", value: oauthModules },
            { label: "DB modules", value: dbModules },
            { label: "MCP tools", value: f.mcpTools },
            { label: "MCP scopes", value: f.mcpScopes },
          ]),
        },
        {
          label: "Localized contributing inventory counts",
          actual: f.providerTotal,
          docKey: "localized contributing inventory counts",
          strict: true,
          files: listLocalizedDocs("CONTRIBUTING.md"),
          validate: makeRequiredCountsValidator([
            { label: "providers", value: f.providerTotal },
            { label: "DB modules", value: dbModules },
            { label: "migrations", value: migrations },
            { label: "executors", value: executors },
            { label: "services", value: services },
            { label: "MCP tools", value: f.mcpTools },
            { label: "MCP scopes", value: f.mcpScopes },
          ]),
        },
      ];
    })(),
    {
      label: "Executors count",
      actual: executors,
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
      actual: oauthModules,
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
