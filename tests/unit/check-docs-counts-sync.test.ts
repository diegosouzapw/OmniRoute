import { test } from "node:test";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseProviderTotal,
  tallyDrift,
  readProviderTotal,
  countLocales,
} from "../../scripts/check/check-docs-counts-sync.mjs";

// Explicit types for the .mjs exports — keep the test at 0 no-explicit-any warnings.
const parse = parseProviderTotal as (text: string) => number;
const tally = tallyDrift as (
  checks: {
    label: string;
    actual: number;
    docKey: string;
    strict: boolean;
    files: string[];
  }[],
  getContent: (file: string) => string | null
) => { strict: number; soft: number; lines: string[] };
const readTotal = readProviderTotal as () => number;
const locales = countLocales as () => number;

const here = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.resolve(here, "../../scripts/check/check-docs-counts-sync.mjs");

// --- parseProviderTotal (pure) -------------------------------------------------------

test("parses the canonical provider total from the auto-generated catalog text", () => {
  assert.equal(parse("Total providers: **226**. See category breakdown below."), 226);
});

test("returns 0 when no total marker is present", () => {
  assert.equal(parse("# Provider Reference\n\nNo total here."), 0);
  assert.equal(parse(""), 0);
});

// --- tallyDrift (pure) ---------------------------------------------------------------

const strictCheck = {
  label: "Provider count",
  actual: 226,
  docKey: "providers",
  strict: true,
  files: ["README.md", "AGENTS.md"],
};

test("no drift when every file mentions the real count", () => {
  const { strict, soft } = tally([strictCheck], () => "we have 226 providers");
  assert.equal(strict, 0);
  assert.equal(soft, 0);
});

test("STRICT drift is counted when a file omits the real count", () => {
  const { strict, soft } = tally([strictCheck], (f) =>
    f === "README.md" ? "we have 226 providers" : "we have 177 providers"
  );
  assert.equal(strict, 1, "AGENTS.md (177) should register one strict drift");
  assert.equal(soft, 0);
});

test("SOFT drift does not count as strict", () => {
  const softCheck = { ...strictCheck, strict: false };
  const { strict, soft } = tally([softCheck], () => "no number here");
  assert.equal(strict, 0);
  assert.equal(soft, 2, "both files miss → two soft drifts");
});

test("a check with actual=0 is skipped (source count undetermined)", () => {
  const zero = { ...strictCheck, actual: 0 };
  const { strict, soft } = tally([zero], () => null);
  assert.equal(strict, 0);
  assert.equal(soft, 0);
});

test("a missing file (null content) registers drift, not a crash", () => {
  const { strict } = tally([strictCheck], () => null);
  assert.equal(strict, 2);
});

// --- live source readers (smoke) -----------------------------------------------------

test("readProviderTotal reads a real, positive total from the catalog", () => {
  assert.ok(readTotal() > 100, "provider catalog total should be > 100");
});

test("countLocales reads a real, positive locale count from config/i18n.json", () => {
  assert.ok(locales() >= 40, "i18n config should define at least 40 locales");
});

// --- live gate smoke -----------------------------------------------------------------

test("the gate exits 0 against the current (synced) repo state", () => {
  // Throws if exit code is non-zero; current docs are synced so this must pass.
  assert.doesNotThrow(() => execFileSync("node", [GATE], { encoding: "utf8", stdio: "pipe" }));
});

// --- Free-tier headline gate ------------------------------------------------
// Regression guard for the drift found in the v3.8.49 README audit: the README
// headlined ~1.6B for seven releases after the catalog had already been corrected
// down to 1.37B, because no gate watched that number.
import {
  checkFreeTierHeadline,
  extractHeadlineClaims,
} from "../../scripts/check/check-docs-counts-sync.mjs";

const checkHeadline = checkFreeTierHeadline as (
  content: string,
  totals: { s: number; m: number; p: number }
) => { ok: boolean; detail: string };
const extractClaims = extractHeadlineClaims as (
  content: string
) => { value: number; text: string }[];

const TOTALS = { s: 1_371_725_000, m: 1_998_225_000, p: 39 };

test("free-tier gate accepts a headline that rounds to the live catalog", () => {
  assert.equal(checkHeadline("~1.4B free tokens per month", TOTALS).ok, true);
  assert.equal(checkHeadline("up to ~2.0B in the first month", TOTALS).ok, true);
});

test("free-tier gate rejects the stale headlines this audit found", () => {
  for (const stale of ["~1.6B free tokens/mo", "~1.54B free tokens per month"]) {
    const r = checkHeadline(stale, TOTALS);
    assert.equal(r.ok, false, `expected ${stale} to be rejected`);
    assert.match(r.detail, /live catalog computes/);
  }
  assert.equal(checkHeadline("up to ~2.1B in the first month", TOTALS).ok, false);
});

test("free-tier gate ignores non-headline figures", () => {
  // The theoretical ceiling, the historical value and per-model rows are legitimate
  // and must never trip the gate — that is why the extractor is a whitelist.
  const noise =
    "counting every rate limit 24/7 would read ~10B; not published. " +
    "Why this dropped from the previous ~1.94B. | `mistral` | recurring | ~1.00B |";
  assert.deepEqual(extractClaims(noise), []);
  assert.equal(checkHeadline(noise, TOTALS).ok, true);
});

test("free-tier gate passes when a file carries no headline at all", () => {
  assert.equal(checkHeadline("no figures here", TOTALS).ok, true);
});

// --- Generic numeric-claim gate (engines / MCP tools / scopes / CLI) --------
// Extends the same drift guard to the counts that silently drifted in v3.8.49:
// 11→12 engines, 94→104 MCP tools, 30→31 scopes, 26→33 CLI tools.
import { makeNumberClaimValidator } from "../../scripts/check/check-docs-counts-sync.mjs";

const makeValidator = makeNumberClaimValidator as (
  expected: number,
  opts: { what: string; pattern: RegExp; skipBefore?: RegExp; skipAfter?: RegExp }
) => (content: string) => { ok: boolean; detail: string };

test("MCP-tools gate accepts the aggregate and rejects a stale one", () => {
  const v = makeValidator(104, {
    what: "MCP tools",
    pattern: /(\d+) tools/gi,
    skipBefore: /(tools?|definitions?)\s*\(\s*$/i,
    skipAfter: /^\s*\(\d+ CLI/,
  });
  assert.equal(v("MCP Server (104 tools)").ok, true);
  assert.equal(v("with 104 tools total").ok, true);
  assert.equal(v("MCP Server (94 tools)").ok, false);
});

test("MCP-tools gate ignores per-module counts and the CLI catalog total", () => {
  const v = makeValidator(104, {
    what: "MCP tools",
    pattern: /(\d+) tools/gi,
    skipBefore: /(tools?|definitions?)\s*\(\s*$/i,
    skipAfter: /^\s*\(\d+ CLI/,
  });
  // "Memory tool definitions (3 tools)" and "33 tools (25 CLI Code's)" are not the MCP total
  assert.equal(v("Memory tool definitions (3 tools)").ok, true);
  assert.equal(v("management tools (8 tools)").ok, true);
  assert.equal(v("all 33 tools (25 CLI Code's + 8 CLI Agents)").ok, true);
});

test("compression-engines and CLI-tools gates catch their v3.8.49 drift", () => {
  const eng = makeValidator(12, {
    what: "compression engines",
    pattern: /(\d+)[-\s](?:engine stack|composable engines|stacked engines)/gi,
  });
  assert.equal(eng("12-engine stack").ok, true);
  assert.equal(eng("11-engine stack").ok, false);

  const cli = makeValidator(33, {
    what: "CLI tools",
    pattern: /(\d+) tools(?=\s*\(\d+ CLI)/gi,
  });
  assert.equal(cli("all 33 tools (25 CLI Code's)").ok, true);
  assert.equal(cli("all 26 tools (25 CLI Code's)").ok, false);
});
