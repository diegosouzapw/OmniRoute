import { test } from "node:test";
import assert from "node:assert";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { readFileSync } from "node:fs";
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
  files: ["README.md", "CLAUDE.md"],
};

test("no drift when every file mentions the real count", () => {
  const { strict, soft } = tally([strictCheck], () => "we have 226 providers");
  assert.equal(strict, 0);
  assert.equal(soft, 0);
});

test("STRICT drift is counted when a user-facing document omits the real count", () => {
  const { strict, soft } = tally([strictCheck], (f) =>
    f === "README.md" ? "we have 226 providers" : "we have 177 providers"
  );
  assert.equal(strict, 1, "CLAUDE.md (177) should register one strict drift");
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
  assert.ok(readTotal() >= 300, "live provider catalog total should be at least 300");
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
  extractGatedClaims,
  extractHeadlineClaims,
} from "../../scripts/check/check-docs-counts-sync.mjs";

const checkHeadline = checkFreeTierHeadline as (
  content: string,
  totals: { s: number; m: number; p: number; g?: number }
) => { ok: boolean; detail: string };
const extractClaims = extractHeadlineClaims as (
  content: string
) => { value: number; text: string }[];
const extractGated = extractGatedClaims as (
  content: string
) => { tokens: number; unit: "B" | "M"; text: string }[];

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

// --- Eligibility-gated bucket ("+~6M behind regional identity verification") --
// The gated figure sits next to the headline and is validated with its own anchor,
// so it can neither drift nor be silently dropped once the catalog reports one.
const TOTALS_G = { s: 1_503_225_000, m: 2_129_725_000, p: 35, g: 6_000_000 };

test("free-tier gate validates the gated figure that sits next to the headline", () => {
  const ok =
    "~1.5B free tokens per month … +~6M behind regional identity verification (ModelScope)";
  assert.equal(checkHeadline(ok, TOTALS_G).ok, true);
  const stale = "~1.5B free tokens per month … +~60M behind regional identity verification";
  assert.equal(checkHeadline(stale, TOTALS_G).ok, false);
  assert.match(checkHeadline(stale, TOTALS_G).detail, /gated/);
});

test("free-tier gate rejects a file that carries the headline but omits the gated line", () => {
  assert.equal(checkHeadline("~1.5B free tokens per month", TOTALS_G).ok, false);
  // a file with no headline at all is still fine (per-provider tables, changelogs)
  assert.equal(checkHeadline("no figures here", TOTALS_G).ok, true);
  // and nothing changes for callers that pass no gated total
  assert.equal(
    checkHeadline("~1.5B free tokens per month", { s: TOTALS_G.s, m: TOTALS_G.m, p: 35 }).ok,
    true
  );
});

test("gated claims are read in M or B and need the anchor phrase", () => {
  assert.deepEqual(extractGated("~6M of unrelated text"), []);
  assert.deepEqual(extractGated("+~6M behind regional identity verification"), [
    { tokens: 6_000_000, unit: "M", text: "+~6M" },
  ]);
  assert.equal(
    checkHeadline("~1.5B free tokens per month · ~1.2B behind regional identity verification", {
      ...TOTALS_G,
      g: 1_230_000_000,
    }).ok,
    true
  );
});

// --- Generic numeric-claim gate (engines / MCP tools / scopes / CLI) --------
// Extends the same drift guard to the counts that silently drifted in v3.8.49:
// 11→12 engines, 94→109 MCP tools, 30→33 scopes, 26→33 CLI tools.
import { makeNumberClaimValidator } from "../../scripts/check/check-docs-counts-sync.mjs";

const makeValidator = makeNumberClaimValidator as (
  expected: number,
  opts: { what: string; pattern: RegExp; skipBefore?: RegExp; skipAfter?: RegExp }
) => (content: string) => { ok: boolean; detail: string };

test("MCP-tools gate accepts the aggregate and rejects a stale one", () => {
  const v = makeValidator(109, {
    what: "MCP tools",
    pattern: /(\d+) tools/gi,
    skipBefore: /(tools?|definitions?)\s*\(\s*$/i,
    skipAfter: /^\s*\(\d+ CLI/,
  });
  assert.equal(v("MCP Server (109 tools)").ok, true);
  assert.equal(v("with 109 tools total").ok, true);
  assert.equal(v("MCP Server (94 tools)").ok, false);
});

test("MCP-tools gate ignores per-module counts and the CLI catalog total", () => {
  const v = makeValidator(109, {
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

// --- v3.8.50 hardening: live provider source, llm.txt/package.json, migrations, SVGs --
// Regression guards for the 2026-08-12 audit: PROVIDER_REFERENCE.md was hand-stale at
// 291 while the live provider modules defined 338, and the gate trusted the doc — so
// README/AGENTS validated against a stale total and the gate stayed falsely green.
import {
  countMigrations,
  makeProviderReferenceValidator,
  makePackageDescriptionValidator,
  checkSvgCanonicalNumbers,
} from "../../scripts/check/check-docs-counts-sync.mjs";

const countMigs = countMigrations as () => number;
const makeRefValidator = makeProviderReferenceValidator as (
  expected: number
) => (content: string) => { ok: boolean; detail: string };
const makePkgValidator = makePackageDescriptionValidator as (
  expected: number
) => (content: string) => { ok: boolean; detail: string };
const checkSvg = checkSvgCanonicalNumbers as (
  content: string,
  expected: { providers?: number; mcpTools?: number; strategies?: number; pools?: number }
) => { ok: boolean; detail: string };

test("countMigrations reads a real, positive migration count", () => {
  assert.ok(countMigs() > 100, "migrations dir should hold > 100 .sql files");
});

test("provider-reference validator accepts the live total and rejects a stale doc", () => {
  const v = makeRefValidator(338);
  assert.equal(v("Total providers: **338**. See category breakdown below.").ok, true);
  const stale = v("Total providers: **291**. See category breakdown below.");
  assert.equal(stale.ok, false, "a hand-stale doc total must be a red, not a silent pass");
  assert.match(stale.detail, /gen:provider-reference/);
  assert.equal(v("# Provider Reference\n\nNo total marker.").ok, false);
});

test("package.json description validator catches a stale provider count", () => {
  const v = makePkgValidator(338);
  assert.equal(v(JSON.stringify({ description: "Unified AI router with 338 providers" })).ok, true);
  assert.equal(
    v(JSON.stringify({ description: "Unified AI router with 291 providers" })).ok,
    false
  );
  assert.equal(v("not json at all {").ok, false);
});

test("migrations claim validator accepts the real count and rejects stale styles", () => {
  const v = makeValidator(146, { what: "migrations", pattern: /(\d+)\+? migrations?\b/gi });
  assert.equal(v("SQLite domain modules (146 migrations)").ok, true);
  assert.equal(v("local, zero-config, 110+ migrations").ok, false);
  assert.equal(v("(130 migrations)").ok, false);
});

const SVG_EXPECTED = { providers: 339, mcpTools: 109, strategies: 19, pools: 41 };

test("SVG gate accepts canonical numbers in text and aria-label claims", () => {
  const good =
    'aria-label="339 AI providers, 19 routing strategies, MCP with 109 tools, ' +
    '41 provider pools" <text>339 providers</text><text>MCP (109</text>';
  assert.equal(checkSvg(good, SVG_EXPECTED).ok, true);
});

test("SVG gate flags each stale canonical number the audit found", () => {
  for (const stale of [
    "<text>290 providers</text>",
    'aria-label="MCP server with 104 tools"',
    "<text>MCP (104</text>",
    "<text>18 routing strategies</text>",
    'aria-label="43 provider pools and 460+ models"',
  ]) {
    const r = checkSvg(stale, SVG_EXPECTED);
    assert.equal(r.ok, false, `expected stale claim to be flagged: ${stale}`);
  }
});

test("SVG gate ignores coordinates, sizes and unrelated small counts", () => {
  const noise =
    '<path d="M 30,310 C 136,290 176,240 296,206"/><rect width="104" height="24"/>' +
    '<animate values="250;290;250"/><text font-size="104">15 providers ToS-flagged</text>' +
    "<text>100+ providers</text><text>90+ free</text>";
  const r = checkSvg(noise, SVG_EXPECTED);
  assert.equal(r.ok, true, `coordinates/attrs must never register claims: ${r.detail}`);
});

// --- Auto-Combo scoring factors ------------------------------------------------------
// The engine was described as 6-, 9-, 12-, 13- and 14-factor across the repo while
// `DEFAULT_WEIGHTS` declared 15. The count is now read from the source of truth.

import { parseScoringFactors } from "../../scripts/check/check-docs-counts-sync.mjs";

const parseFactors = parseScoringFactors as (sourceText: string) => number;

const WEIGHTS_SOURCE = `
export const DEFAULT_WEIGHTS: ScoringWeights = {
  quota: 0.1429,
  health: 0.1605,
  // A comment naming a decoy: fake: 0.5
  cacheAffinity: 0,
  /* block comment with another decoy: alsoFake: 0.2 */
  quality: 0.03,
};
`;

test("counts every factor DEFAULT_WEIGHTS declares, comments included as noise", () => {
  assert.equal(parseFactors(WEIGHTS_SOURCE), 4);
});

test("a zero-weight factor still counts as declared", () => {
  // `cacheAffinity` and `resetWindowAffinity` sit at 0 but are computed, and
  // `cacheAffinity` gates prompt-cache dedup outside the score.
  assert.ok(WEIGHTS_SOURCE.includes("cacheAffinity: 0"));
  assert.equal(parseFactors(WEIGHTS_SOURCE.replace("cacheAffinity: 0,", "")), 3);
});

test("returns 0 rather than a wrong number when the source cannot be read", () => {
  assert.equal(parseFactors(""), 0);
  assert.equal(parseFactors("export const SOMETHING_ELSE = { a: 1 };"), 0);
});

test("scoring factor validator flags every stale count the repo carried", () => {
  const v = makeValidator(15, { what: "scoring factors", pattern: /(\d+)[- ]factors?\b/gi });
  assert.equal(v("a **15-factor** scoring function").ok, true);
  assert.equal(v("scores every candidate on **15 factors**").ok, true);
  assert.equal(v("a doc with no claim at all").ok, true);
  for (const stale of ["6-factor", "9-factor", "12-factor", "13-factor", "14-factor"]) {
    assert.equal(v(`the ${stale} scoring engine`).ok, false, `expected ${stale} to be flagged`);
  }
});

// --- v3.8.51 hardening: rewritten-claim evasion + version prose ------------------
// Regression guards for the 2026-08-31 audit: "56 recurring/keyless free-forever"
// and "105-tool MCP server" dodged the original patterns, "149 versioned SQL
// migration files" dodged the migrations pattern, and the README footer shipped
// "v3.8.50" on a 3.8.51 tree with no gate reading it.
import { makeVersionClaimValidator } from "../../scripts/check/check-docs-counts-sync.mjs";

const makeVersionValidator = makeVersionClaimValidator as (
  expected: string | null
) => (content: string) => { ok: boolean; detail: string };

test("free-forever gate catches the rewritten recurring/keyless form", () => {
  const v = makeValidator(53, {
    what: "free-forever providers",
    pattern: /(\d+)(?:\s+recurring(?:\/|\s+or\s+)keyless)?\s+free[- ]forever/gi,
  });
  assert.equal(v("53 free forever").ok, true);
  assert.equal(v("53 recurring/keyless free-forever providers").ok, true);
  assert.equal(v("56 recurring or keyless free-forever providers").ok, false);
  assert.equal(v("55 free-forever").ok, false);
});

test("migrations gate catches the 'versioned SQL migration files' form", () => {
  const v = makeValidator(167, {
    what: "migrations",
    pattern: /(\d+)\+? (?:versioned )?(?:SQL )?migrations?\b/gi,
  });
  assert.equal(v("167 versioned SQL migration files").ok, true);
  assert.equal(v("167 SQL migrations").ok, true);
  assert.equal(v("149 versioned SQL migration files").ok, false);
});

test("MCP-tools gate catches the hyphenated N-tool form and skips phase numbers", () => {
  const v = makeValidator(110, {
    what: "MCP tools",
    pattern: /(\d+)[- ]tools?\b/gi,
    skipBefore: /(tools?|definitions?)\s*\(\s*$|phase\s+$/i,
    skipAfter: /^\s*\(\d+ CLI/,
  });
  assert.equal(v("a 110-tool MCP server").ok, true);
  assert.equal(v("a 105-tool MCP server").ok, false);
  assert.equal(v("Phase 2 tool handlers (8 advanced tools)").ok, true);
});

test("recurring-pools gate skips the positive-budget subset", () => {
  const v = makeValidator(38, {
    what: "recurring pools",
    pattern: /(\d+) (?:documented )?(?:recurring|free-tier) pool(?:s|(?:\s+keys))?\b/gi,
    skipAfter: /^\s+with a published positive/i,
  });
  assert.equal(v("38 recurring pool keys").ok, true);
  assert.equal(v("20 recurring pools with a published positive monthly budget").ok, true);
  assert.equal(v("39 recurring pools").ok, false);
});

test("version gate compares README-footer and llm.txt prose against package.json", () => {
  const v = makeVersionValidator("3.8.51");
  assert.equal(v("OmniRoute v3.8.51 · Node ≥22.22.2").ok, true);
  assert.equal(v("**Current version:** 3.8.51").ok, true);
  assert.equal(v("OmniRoute v3.8.50 · Node ≥22.22.2").ok, false);
  assert.equal(v("**Current version:** 3.8.50").ok, false);
  assert.equal(v("no version here").ok, true);
  assert.equal(makeVersionValidator(null)("anything").ok, false);
});

// --- Mode packs ------------------------------------------------------------
// Two packs (`reliability-first`, `chaos-mode`) shipped without ever reaching
// the reference table, and two documents still claimed four. A count alone would
// not have caught the table: it names four packs and says so. So the gate reads
// the pack NAMES from the module itself and asks the reference document to
// mention each one.
import { makeModePackNamesValidator } from "../../scripts/check/check-docs-counts-sync.mjs";

const packNames = makeModePackNamesValidator as (
  names: string[]
) => (content: string) => { ok: boolean; detail: string };

test("a document that names every pack passes", () => {
  const validate = packNames(["ship-fast", "cost-saver"]);
  assert.equal(validate("We ship ship-fast and cost-saver profiles.").ok, true);
});

test("a document that forgets a pack fails, and says which one", () => {
  const validate = packNames(["ship-fast", "chaos-mode"]);
  const result = validate("We ship the ship-fast profile.");
  assert.equal(result.ok, false);
  assert.match(result.detail, /chaos-mode/);
});

test("a longer name does not satisfy the gate for a shorter one", () => {
  // `includes` would let "ship-fast-v2" stand in for "ship-fast", so a doc could
  // pass while naming a pack that does not ship.
  assert.equal(packNames(["ship-fast"])("only ship-fast-v2 is documented here").ok, false);
  assert.equal(packNames(["chaos"])("we document chaos-mode only").ok, false);
});

test("the name gate stays quiet when the source yields nothing", () => {
  assert.equal(packNames([])("anything at all").ok, true);
});

// The pack names come from the same tsx subprocess that already reads every other
// code-derived count, not from a regex over the source text: a reader that parses
// TypeScript by hand is a gate that can be silently wrong, which is worse than no
// gate at all.
test("the module is the source of the names, so the gate cannot misparse it", async () => {
  const { MODE_PACKS } = await import("../../open-sse/services/autoCombo/modePacks.ts");
  const names = Object.keys(MODE_PACKS);
  assert.ok(names.length > 0);
  const page = names.join(", ");
  assert.equal(packNames(names)(page).ok, true);
  assert.equal(packNames(names)(names.slice(1).join(", ")).ok, false);
});

const MODE_PACK_CLAIM = {
  what: "mode packs",
  pattern: /(\d+)\s+(?:curated\s+|pre-defined\s+)?\*{0,2}(?:mode\s+packs?|weight\s+profiles?)\b/gi,
};

test("a stale mode pack count is rejected, in each spelling the docs use", () => {
  const v = makeValidator(6, MODE_PACK_CLAIM);
  assert.equal(v("- **4 mode packs**: coding, fast, cheap, smart").ok, false);
  assert.equal(v("| modePacks.ts | 4 weight profiles (ship-fast, ...) |").ok, false);
  assert.equal(v("4 pre-defined weight profiles").ok, false);
});

test("markdown emphasis does not hide a mode pack count", () => {
  const v = makeValidator(6, MODE_PACK_CLAIM);
  assert.equal(v("Backed by 6 curated **mode packs** (ship-fast, ...)").ok, true);
  assert.equal(v("6 pre-defined weight profiles in `modePacks.ts`").ok, true);
});

test("a required claim cannot be silenced by rewording it away", () => {
  // This is the failure mode the gate exists to prevent: reword the sentence past
  // the pattern and "no claim in this file" used to read as a pass.
  const optional = makeValidator(6, MODE_PACK_CLAIM);
  const required = makeValidator(6, { ...MODE_PACK_CLAIM, requireClaim: true });
  const reworded = "half a dozen curated profiles ship with the engine";
  assert.equal(optional(reworded).ok, true, "a file that need not state it still passes");
  assert.equal(required(reworded).ok, false, "the reference document must state it");
  assert.match(required(reworded).detail, /required to state one/);
});

// --- Free-tier reference: the two curated facts ----------------------------
// FREE_TIERS.md is dense with numbers, so these two patterns are deliberately
// narrow. A loose one would gate a token budget by accident, and a gate that
// fires on the wrong number gets deleted rather than fixed.
const HARD_STOP_CLAIM = {
  what: "hard-stop-guaranteed entries",
  pattern:
    /(\d+) entr(?:y|ies) (?:that )?(?:carry|carries) an? independently documented hard stop/gi,
};

const TRAINING_CLAIM = {
  what: "training-disclosure entries",
  pattern: /(\d+) entr(?:y|ies) (?:that )?(?:carry|carries) a (?:prompt-)?training disclosure/gi,
};

test("the hard-stop claim passes on the real sentence and fails on a stale count", () => {
  const v = makeValidator(5, HARD_STOP_CLAIM);
  assert.equal(v("5 entries carry an independently documented hard stop, and").ok, true);
  assert.equal(v("99 entries carry an independently documented hard stop, and").ok, false);
});

test("the training claim passes on the real sentence and fails on a stale count", () => {
  const v = makeValidator(13, TRAINING_CLAIM);
  assert.equal(v("13 entries carry a prompt-training disclosure.").ok, true);
  assert.equal(v("13 entries carry a training disclosure.").ok, true);
  assert.equal(v("4 entries carry a prompt-training disclosure.").ok, false);
});

test("a reworded or deleted sentence fails, instead of passing as absent", () => {
  // The gate's real failure mode is not a stale number, it is silence: reword the
  // sentence past the pattern and "no claim in this file" used to read green.
  const required = makeValidator(5, { ...HARD_STOP_CLAIM, requireClaim: true });
  assert.equal(required("5 entries have a provider-documented hard-stop guarantee.").ok, false);
  assert.equal(required("the page no longer mentions it at all").ok, false);
  assert.equal(required("5 entries carry an independently documented hard stop.").ok, true);

  const trainingRequired = makeValidator(13, { ...TRAINING_CLAIM, requireClaim: true });
  assert.equal(trainingRequired("13 entries disclose training use.").ok, false);
  assert.equal(trainingRequired("13 entries carry a prompt-training disclosure.").ok, true);
});

test("the live page actually satisfies both required gates", () => {
  // A unit test on synthetic strings proves the validator; this one proves the
  // document. Without it, the two could drift apart and both stay green.
  const page = readFileSync(path.resolve(here, "../../docs/reference/FREE_TIERS.md"), "utf8");
  assert.equal(makeValidator(5, { ...HARD_STOP_CLAIM, requireClaim: true })(page).ok, true);
  assert.equal(makeValidator(13, { ...TRAINING_CLAIM, requireClaim: true })(page).ok, true);
});

test("neither claim fires on the other numbers the page is full of", () => {
  const page =
    "446 cataloged free-tier entries across 30 recurring pools, 12.5M tokens/mo, " +
    "$10 deposit unlock, 24M/mo boost, 800 output tokens, 2026-06-17.";
  assert.equal(makeValidator(7, HARD_STOP_CLAIM)(page).ok, true);
  assert.equal(makeValidator(13, TRAINING_CLAIM)(page).ok, true);
});
