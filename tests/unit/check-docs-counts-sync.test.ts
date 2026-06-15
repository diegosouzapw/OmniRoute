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
