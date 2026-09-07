#!/usr/bin/env node
// Validates that count-based assertions in docs match the actual code state.
//
// Two tiers of checks:
//   • STRICT (always blocking — exit 1 on drift): high-confidence, slow-moving counts
//     that historically caused the worst drift across user-facing documentation.
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
// NOTE: PROVIDER_REFERENCE.md is no longer blindly trusted — a STRICT check compares
// the doc's `Total providers` against the live provider modules (the same collections
// the generator reads), so a hand-stale doc is a red, not a silently propagated total.
// Fix by running `npm run gen:provider-reference`. Additional STRICT coverage added in
// the 2026-08-12 hardening: llm.txt + package.json description (providers), migration
// count (README/AGENTS/llm.txt), and canonical numbers inside the README SVG diagrams
// (providers / MCP tools / routing strategies / free-tier pools).

import fs from "node:fs";
import { spawnSync } from "node:child_process";
import os from "node:os";
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

// PURE: count the factors the Auto-Combo scorer actually declares.
// The engine is described as "N-factor" in prose, in code comments and in the
// strategy descriptions; N is `DEFAULT_WEIGHTS`, and nothing else. Two of those
// factors sit at weight 0 by default — they are still computed and consumed
// (`cacheAffinity > 0` gates prompt-cache dedup), so they count as declared.
export function parseScoringFactors(sourceText) {
  if (!sourceText) return 0;
  const m = sourceText.match(/DEFAULT_WEIGHTS[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!m) return 0;
  const body = m[1].replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  return (body.match(/^\s*([A-Za-z_$][\w$]*)\s*:/gm) || []).length;
}

function countScoringFactors() {
  const file = path.join(ROOT, "open-sse", "services", "autoCombo", "scoring.ts");
  if (!fs.existsSync(file)) return 0;
  return parseScoringFactors(fs.readFileSync(file, "utf8"));
}

// PURE: the reference document must NAME every shipped pack. Reporting which one is
// missing is the point — "6 packs" tells a doc it is stale, "chaos-mode is missing"
// tells it what to write.
export function makeModePackNamesValidator(names) {
  return (content) => {
    if (!names.length) return { ok: true, detail: "no mode packs found in source — skipping" };
    // Token boundary, not `includes`: "ship-fast" is a substring of
    // "ship-fast-v2", so a doc could satisfy the gate while naming a pack that
    // does not ship — and a future pack named as a prefix of another would be
    // masked by it.
    const missing = names.filter(
      (name) =>
        !new RegExp(`(^|[^\\w-])${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^\\w-]|$)`).test(
          content
        )
    );
    if (!missing.length) return { ok: true, detail: `all ${names.length} mode packs are named` };
    return { ok: false, detail: `mode pack(s) never named in this file: ${missing.join(", ")}` };
  };
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

// STRICT: number of SQL migration files shipped with the app.
export function countMigrations() {
  const abs = path.join(ROOT, "src", "lib", "db", "migrations");
  if (!fs.existsSync(abs)) return 0;
  return fs.readdirSync(abs).filter((f) => f.endsWith(".sql")).length;
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
function readCodeFacts() {
  const script = [
    'import {computeFreeModelTotals,FREE_MODEL_BUDGETS} from "./open-sse/config/freeModelCatalog.ts";',
    'import {MODE_PACKS} from "./open-sse/services/autoCombo/modePacks.ts";',
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
    // Live provider total — the SAME collections gen-provider-reference.ts unions, so the
    // doc-vs-live check below cannot drift from the generator's definition of "provider".
    'import * as PROV from "./src/shared/constants/providers.ts";',
    "const provCols=[PROV.FREE_PROVIDERS,PROV.NOAUTH_PROVIDERS,PROV.OAUTH_PROVIDERS,",
    "PROV.WEB_COOKIE_PROVIDERS,PROV.APIKEY_PROVIDERS,PROV.LOCAL_PROVIDERS,PROV.SEARCH_PROVIDERS,",
    "PROV.AUDIO_ONLY_PROVIDERS,PROV.UPSTREAM_PROXY_PROVIDERS,PROV.CLOUD_AGENT_PROVIDERS,",
    "PROV.SYSTEM_PROVIDERS];",
    "const pids=new Set();",
    "for(const c of provCols)for(const p of Object.values(c||{}))if(p&&p.id)pids.add(p.id);",
    "const cols={MCP_TOOLS,memoryTools,skillTools,agentSkillTools,githubSkillTools,poolTools,",
    "gamificationTools,pluginTools,notionTools,obsidianTools,localCorpusTools,compressionTools};",
    "const sc=new Set();",
    "for(const col of Object.values(cols))for(const t of Object.values(col))",
    "for(const x of (t?.scopes||[]))sc.add(x);",
    "const t=computeFreeModelTotals();const cli=Object.values(CLI_TOOLS);",
    "const by=(c)=>cli.filter(x=>x.category===c).length;",
    // "Free forever" = every provider whose free access renews or needs no key at all.
    // one-time-initial (signup credits) and discontinued pools are excluded on purpose,
    // and so is every eligibility-gated row: a provider nobody can sign up for without
    // clearing a gate is not "free forever" for the reader of the headline.
    "const FOREVER=new Set(['recurring-monthly','recurring-daily','recurring-uncapped',",
    "'recurring-credit','keyless']);",
    "const ff=new Set();for(const m of t.perModel)",
    "if(FOREVER.has(m.freeType)&&!m.eligibilityGate)ff.add(m.provider);",
    'console.log("@@"+JSON.stringify({freeSteady:t.steadyRecurringTokens,entries:t.perModel.length,',
    "freeFirst:t.firstMonthRealisticTokens,freeGated:t.gatedRecurringTokens,",
    "freePools:t.poolCount,engines:ENGINE_IDS.length,",
    "cliTotal:cli.length,cliCode:by('code'),cliAgent:by('agent'),",
    "mcpTools:countUniqueMcpTools(cols),mcpScopes:sc.size,providers:pids.size,freeForever:ff.size,",
    "modePacks:Object.keys(MODE_PACKS),",
    "hardStop:FREE_MODEL_BUDGETS.filter(e=>e.hardStopGuaranteed===true).length,",
    "trainsOnPrompts:FREE_MODEL_BUDGETS.filter(e=>e.trainsOnPrompts===true).length}));",
  ].join("");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "docs-counts-"));
  try {
    const r = spawnSync(process.execPath, ["--import", "tsx/esm", "-e", script], {
      cwd: ROOT,
      encoding: "utf8",
      timeout: 180000,
      env: { ...process.env, DATA_DIR: tmp, APP_LOG_LEVEL: "silent" },
    });
    if (r.status !== 0 || !r.stdout) return null;
    const line = r.stdout.split("\n").find((l) => l.startsWith("@@"));
    return line ? JSON.parse(line.slice(2)) : null;
  } catch {
    return null;
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

// The eligibility-gated figure ("+~6M behind regional identity verification") is validated
// with its own anchor so it can neither drift nor be silently dropped once it exists.
const GATED_ANCHOR = /^\s*behind regional identity verification/i;

export function extractGatedClaims(content) {
  const claims = [];
  for (const m of content.matchAll(/\+?~?(\d+(?:\.\d+)?)([BM])\b/g)) {
    const after = content.slice(m.index + m[0].length, m.index + m[0].length + 60);
    if (!GATED_ANCHOR.test(after)) continue;
    claims.push({ tokens: Number(m[1]) * (m[2] === "B" ? 1e9 : 1e6), unit: m[2], text: m[0] });
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
  const problems = [];
  if (stale.length) {
    problems.push(
      `stale headline ${[...new Set(stale.map((c) => c.text))].join(", ")} — live catalog ` +
        `computes ~${steady.toFixed(2)}B steady / ~${first.toFixed(2)}B first month`
    );
  }
  if (totals.g != null && totals.g > 0) {
    const gated = extractGatedClaims(content);
    const tol = (c) => (c.unit === "B" ? 0.05e9 : 0.5e6);
    const gatedStale = gated.filter((c) => Math.abs(c.tokens - totals.g) >= tol(c));
    if (!gated.length) {
      problems.push(
        `missing gated figure — live catalog computes ${Math.round(totals.g / 1e6)}M behind regional identity verification`
      );
    } else if (gatedStale.length) {
      problems.push(
        `stale gated figure ${[...new Set(gatedStale.map((c) => c.text))].join(", ")} — live catalog ` +
          `computes ${Math.round(totals.g / 1e6)}M behind regional identity verification`
      );
    }
  }
  if (!problems.length)
    return { ok: true, detail: `${claims.length} headline claim(s) match the live catalog` };
  return { ok: false, detail: problems.join("; ") };
}

// PURE: docs prose that names the product version ("OmniRoute v3.8.50 ·",
// "**Current version:** 3.8.50") must match package.json exactly.
export function readPackageVersion() {
  try {
    return String(JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version);
  } catch {
    return null;
  }
}

export function makeVersionClaimValidator(expected) {
  const PATTERNS = [
    /OmniRoute v(\d+\.\d+\.\d+)/g,
    /Current version:\*{0,2}\s*\*{0,2}(\d+\.\d+\.\d+)/g,
  ];
  return (content) => {
    if (!expected) return { ok: false, detail: "package.json version could not be read" };
    const claims = [];
    for (const pattern of PATTERNS)
      for (const m of content.matchAll(pattern)) claims.push({ value: m[1], text: m[0].trim() });
    if (!claims.length) return { ok: true, detail: "no version claim in this file" };
    const stale = claims.filter((c) => c.value !== expected);
    if (!stale.length)
      return {
        ok: true,
        detail: `${claims.length} version claim(s) match package.json ${expected}`,
      };
    return {
      ok: false,
      detail:
        `stale version: ${[...new Set(stale.map((c) => `"${c.text}"`))].join(", ")} — ` +
        `package.json is ${expected}`,
    };
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

// Three spellings of the same claim are in use across the docs, and all three
// must be watched: "6 curated **mode packs**", "6 pre-defined weight profiles",
// "4 weight profiles". Matching only the first left the other two unguarded.
const MODE_PACK_CLAIM_PATTERN =
  /(\d+)\s+(?:curated\s+|pre-defined\s+)?\*{0,2}(?:mode\s+packs?|weight\s+profiles?)\b/gi;

export function makeNumberClaimValidator(expected, opts) {
  return (content) => {
    const claims = extractNumberClaims(content, opts);
    if (!claims.length) {
      // Most files in a check's list legitimately never mention the number, so
      // "no claim" is normally a pass. But for a reference document that is
      // supposed to state it, silence is the failure mode that matters: reword
      // the sentence past the pattern and the gate goes quiet while reporting
      // green. `requireClaim` says this file must carry the claim.
      if (opts.requireClaim)
        return {
          ok: false,
          detail:
            `no ${opts.what} claim found, and this file is required to state one — ` +
            `either the sentence was reworded past the pattern, or it was deleted ` +
            `(code has ${expected})`,
        };
      return { ok: true, detail: `no ${opts.what} claim in this file` };
    }
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

// --- v3.8.50 hardening validators --------------------------------------------
// PURE: doc total must equal the live provider-module total (closes the falso-verde
// found in the 2026-08-12 audit: the doc sat hand-stale at 291 while the modules
// defined 338, and every downstream check inherited the stale total).
export function makeProviderReferenceValidator(expected) {
  return (content) => {
    const total = parseProviderTotal(content);
    if (!total) return { ok: false, detail: "no `Total providers: **N**` marker found" };
    if (total === expected)
      return { ok: true, detail: `doc total ${total} matches the live provider modules` };
    return {
      ok: false,
      detail:
        `doc total ${total} is stale — the live provider modules define ${expected} ` +
        `(run npm run gen:provider-reference)`,
    };
  };
}

// PURE: the npm package description must carry the live provider count.
export function makePackageDescriptionValidator(expected) {
  return (content) => {
    let desc = "";
    try {
      desc = String(JSON.parse(content).description || "");
    } catch {
      return { ok: false, detail: "package.json could not be parsed" };
    }
    if (desc.includes(String(expected)))
      return { ok: true, detail: `description mentions the live provider count ${expected}` };
    return {
      ok: false,
      detail: `description does not mention the live provider count ${expected}: "${desc}"`,
    };
  };
}

// PURE: sweep an SVG's text/aria content for the canonical numbers. Patterns are
// deliberately narrow — they anchor on the surrounding words so path coordinates,
// width/font-size attributes and small unrelated counts ("15 providers ToS-flagged",
// "100+ providers") can never register as claims. Providers require 3+ digits for the
// same reason.
const SVG_CANONICAL_PATTERNS = [
  { key: "providers", what: "providers", pattern: /(\d{3,4}) (?:AI )?providers\b/g },
  { key: "mcpTools", what: "MCP tools", pattern: /MCP (?:server with |with |\()(\d+)/g },
  { key: "strategies", what: "routing strategies", pattern: /(\d+) routing strategies\b/g },
  { key: "pools", what: "free-tier pools", pattern: /(\d+) provider pools\b/g },
];

export function checkSvgCanonicalNumbers(content, expected) {
  const stale = [];
  let claims = 0;
  for (const { key, what, pattern } of SVG_CANONICAL_PATTERNS) {
    if (expected[key] == null) continue;
    for (const m of content.matchAll(pattern)) {
      claims++;
      const value = Number(m[1]);
      if (value !== expected[key]) stale.push(`"${m[0]}" (${what} — code has ${expected[key]})`);
    }
  }
  if (!claims) return { ok: true, detail: "no canonical-number claims in this SVG" };
  if (!stale.length) return { ok: true, detail: `${claims} canonical claim(s) match the code` };
  return { ok: false, detail: `stale: ${[...new Set(stale)].join(", ")}` };
}

// The README-embedded diagrams that historically rotted because no gate read them
// (the alt-text in README.md is checked, the SVG text nodes never were).
const SVG_DIAGRAM_FILES = [
  "docs/diagrams/readme-hero.svg",
  "docs/diagrams/free-tier-budget.svg",
  "docs/diagrams/promise-pillars.svg",
  "docs/diagrams/comparison-table.svg",
  "docs/diagrams/cli-terminal.svg",
  "docs/diagrams/tier-cascade.svg",
  "public/images/tier-flow-dark.svg",
  "public/images/tier-flow-light.svg",
];

export function buildChecks() {
  return [
    {
      label: "Provider count",
      actual: readProviderTotal(),
      docKey: "providers",
      strict: true,
      files: ["README.md", "AGENTS.md", "llm.txt"],
    },
    {
      label: "Provider count (package.json description)",
      actual: readProviderTotal(),
      docKey: "providers",
      strict: true,
      files: ["package.json"],
      validate: makePackageDescriptionValidator(readProviderTotal()),
    },
    {
      label: "DB migrations count",
      actual: countMigrations(),
      docKey: "migrations",
      strict: true,
      files: ["README.md", "AGENTS.md", "llm.txt"],
      validate: makeNumberClaimValidator(countMigrations(), {
        what: "migrations",
        pattern: /(\d+)\+? (?:versioned )?(?:SQL )?migrations?\b/gi,
      }),
    },
    {
      // The README footer and llm.txt each carry the product version as prose; both
      // shipped stale ("v3.8.50" on a 3.8.51 tree) in the 2026-08-31 audit. Compare
      // every such claim against package.json, which is authoritative.
      label: "Package version (docs prose)",
      actual: readPackageVersion(),
      docKey: "package version",
      strict: true,
      files: ["README.md", "llm.txt"],
      validate: makeVersionClaimValidator(readPackageVersion()),
    },
    {
      label: "i18n locales count",
      actual: countLocales(),
      docKey: "i18n locales",
      strict: true,
      files: ["docs/README.md", "docs/guides/I18N.md"],
    },
    ...(() => {
      const f = readCodeFacts();
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
      const packs = Array.isArray(f.modePacks) ? f.modePacks : [];
      return [
        {
          // Two packs shipped after the docs were written and nothing noticed.
          // The count and the names are two different gates: a table can carry
          // the right number and still describe the wrong four out of six.
          label: "Auto-Combo mode packs",
          actual: packs.length,
          docKey: "mode packs",
          strict: true,
          files: [
            "README.md",
            "llm.txt",
            "docs/guides/FEATURES.md",
            "docs/architecture/ARCHITECTURE.md",
            "docs/architecture/REPOSITORY_MAP.md",
            "docs/routing/AUTO-COMBO.md",
          ],
          validate: makeNumberClaimValidator(packs.length, {
            what: "mode packs",
            // Three spellings are in use across the docs, and all three are the
            // same claim: "6 curated **mode packs**", "6 pre-defined weight
            // profiles", "4 weight profiles". Matching only the first left the
            // other two unwatched.
            pattern: MODE_PACK_CLAIM_PATTERN,
          }),
        },
        {
          // Same claim, but on the one document that MUST carry it. Without
          // `requireClaim` the strongest gate in this file is also the easiest to
          // silence: reword the sentence and "no claim in this file" reads as a pass.
          label: "Auto-Combo mode packs (reference doc must state the count)",
          actual: packs.length,
          docKey: "mode packs",
          strict: true,
          files: ["docs/routing/AUTO-COMBO.md"],
          validate: makeNumberClaimValidator(packs.length, {
            what: "mode packs",
            pattern: MODE_PACK_CLAIM_PATTERN,
            requireClaim: true,
          }),
        },
        {
          label: "Auto-Combo mode packs (named in the reference doc)",
          actual: packs.length,
          docKey: "mode packs",
          strict: true,
          files: ["docs/routing/AUTO-COMBO.md"],
          validate: makeModePackNamesValidator(packs),
        },
        {
          label: "Provider reference total (doc vs live modules)",
          actual: f.providers,
          docKey: "providers (live)",
          strict: true,
          files: ["docs/reference/PROVIDER_REFERENCE.md"],
          validate: makeProviderReferenceValidator(f.providers),
        },
        {
          label: "SVG canonical numbers (live code)",
          actual:
            `${f.providers} providers / ${f.mcpTools} MCP tools / ` +
            `${countRoutingStrategies()} strategies / ${f.freePools} pools`,
          docKey: "SVG canonical numbers",
          strict: true,
          files: SVG_DIAGRAM_FILES,
          validate: (content) =>
            checkSvgCanonicalNumbers(content, {
              providers: f.providers,
              mcpTools: f.mcpTools,
              strategies: countRoutingStrategies(),
              pools: f.freePools,
            }),
        },
        {
          label: "Free-tier headline (live catalog)",
          actual: `~${(f.freeSteady / 1e9).toFixed(2)}B steady / ${f.freePools} pools / ${Math.round(f.freeGated / 1e6)}M gated`,
          docKey: "free-tier headline",
          strict: true,
          files: ["README.md", "docs/reference/FREE_TIERS.md"],
          validate: (content) =>
            checkFreeTierHeadline(content, { s: f.freeSteady, m: f.freeFirst, g: f.freeGated }),
        },
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
            pattern: /(\d+)[- ]tools?\b/gi,
            // per-module rows ("Memory tool definitions (3 tools)") and the CLI catalog
            // total ("33 tools (25 CLI Code's …)") are not the MCP aggregate
            // per-module rows read "… tool definitions (N tools" / "… management tools
            // (N tools" — the word tool(s)/definitions sits right before the paren. The
            // aggregate ("MCP Server (109 tools", "all 109 tools") never does.
            // "Phase 2 tool handlers" is a phase number, not a tool count
            skipBefore: /(tools?|definitions?)\s*\(\s*$|phase\s+$/i,
            skipAfter: /^\s*\(\d+ CLI/,
          },
          [
            "README.md",
            "AGENTS.md",
            "docs/frameworks/MCP-SERVER.md",
            "llm.txt",
            "open-sse/mcp-server/README.md",
            "skills/omni-mcp/SKILL.md",
          ]
        ),
        claim(f.mcpScopes, "MCP scopes", { pattern: /(\d+) scopes/gi }, [
          "README.md",
          "AGENTS.md",
          "llm.txt",
          "skills/omni-mcp/SKILL.md",
        ]),
        claim(f.cliTotal, "CLI tools", { pattern: /(\d+) tools(?=\s*\(\d+ CLI)/gi }, ["README.md"]),
        claim(
          f.freeForever,
          "free-forever providers",
          { pattern: /(\d+)(?:\s+recurring(?:\/|\s+or\s+)keyless)?\s+free[- ]forever/gi },
          ["README.md", "docs/diagrams/promise-pillars.svg"]
        ),
        claim(
          f.entries,
          "free-tier catalog entries",
          { pattern: /(\d+) (?:cataloged |catalogued )?(?:free-tier |catalog )entries\b/gi },
          ["README.md", "docs/diagrams/free-tier-budget.svg"]
        ),
        claim(
          f.freePools,
          "recurring pools",
          {
            pattern: /(\d+) (?:documented )?(?:recurring|free-tier) pool(?:s|(?:\s+keys))?\b/gi,
            // "20 recurring pools with a published positive monthly budget" is the
            // positive-budget SUBSET, not the recurring-pool total — never gate it.
            skipAfter: /^\s+with a published positive/i,
          },
          ["README.md", "docs/diagrams/free-tier-budget.svg", "docs/reference/FREE_TIERS.md"]
        ),
        // The reference page says what an entry vouches for. These two facts are
        // curated by hand rather than inferred, so the page quotes their counts —
        // and quoting a count is how a page goes stale. The patterns are deliberately
        // narrow: FREE_TIERS.md is full of numbers, and a loose one would gate a
        // token budget by accident.
        claim(
          f.hardStop,
          "hard-stop-guaranteed entries",
          {
            // `requireClaim`: this page is the one place that states the number,
            // so a reworded or deleted sentence must fail rather than pass as
            // "no claim in this file" — otherwise the gate is one edit from silent.
            requireClaim: true,
            pattern:
              /(\d+) entr(?:y|ies) (?:that )?(?:carry|carries) an? independently documented hard stop/gi,
          },
          ["docs/reference/FREE_TIERS.md"]
        ),
        claim(
          f.trainsOnPrompts,
          "training-disclosure entries",
          {
            // `requireClaim`: this page is the one place that states the number,
            // so a reworded or deleted sentence must fail rather than pass as
            // "no claim in this file" — otherwise the gate is one edit from silent.
            requireClaim: true,
            pattern:
              /(\d+) entr(?:y|ies) (?:that )?(?:carry|carries) a (?:prompt-)?training disclosure/gi,
          },
          ["docs/reference/FREE_TIERS.md"]
        ),
      ];
    })(),
    {
      label: "Executors count",
      actual: countFiles("open-sse/executors"),
      docKey: "executors",
      strict: false,
      files: ["docs/architecture/ARCHITECTURE.md", "docs/architecture/CODEBASE_DOCUMENTATION.md"],
    },
    {
      // The Auto-Combo engine is advertised as "N-factor" in a dozen places, in
      // prose and in code comments alike, and N had drifted to five different
      // values (6, 9, 12, 13, 14) against a code that declares 15. The number
      // now comes from `DEFAULT_WEIGHTS`; adding a factor without touching the
      // prose fails here. `CHANGELOG.md` is deliberately out of scope: its old
      // entries record what was true when they were written.
      label: "Auto-Combo scoring factors count",
      actual: countScoringFactors(),
      docKey: "scoring factors",
      strict: true,
      files: [
        "README.md",
        "AGENTS.md",
        "docs/routing/AUTO-COMBO.md",
        "docs/guides/TIERS.md",
        "docs/guides/FEATURES.md",
        "docs/guides/FREE_PROVIDER_RANKINGS.md",
        "docs/diagrams/strategies-grid.svg",
        "docs/diagrams/auto-combo-scoring.mmd",
        "llm.txt",
        "docs/architecture/ARCHITECTURE.md",
        "docs/architecture/REPOSITORY_MAP.md",
        "docs/architecture/RESILIENCE_GUIDE.md",
        "docs/frameworks/OPEN_SSE_ARCHITECTURE.md",
        "docs/getting-started/AUTO-COMBO-GUIDE.md",
        "skills/omni-combos-routing/SKILL.md",
        "open-sse/services/autoCombo/routerStrategy.ts",
        "open-sse/services/taskAwareRouter.ts",
        "tests/unit/lkgp-enabled-context-11181.test.ts",
        "tests/integration/combo-matrix/auto.test.ts",
      ],
      validate: makeNumberClaimValidator(countScoringFactors(), {
        what: "scoring factors",
        pattern: /(\d+)[- ]factors?\b/gi,
      }),
    },
    {
      label: "Routing strategies count",
      actual: countRoutingStrategies(),
      docKey: "strategies",
      strict: false,
      files: ["docs/routing/AUTO-COMBO.md", "docs/architecture/RESILIENCE_GUIDE.md", "llm.txt"],
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
