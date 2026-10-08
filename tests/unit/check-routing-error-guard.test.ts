/**
 * #13614 — scripts/check/check-routing-error-guard.mjs (npm run check:routing-error-guard).
 * Frozen swallowed catches are keyed by file + body snippet, so line shifts never break
 * the gate; void-async allowlist anchors must sit next to the site they cover.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { catchSnippet, collectSwallowedCatches, evaluateSwallowedCatches, evaluateVoidAsyncSites } =
  await import("../../scripts/check/check-routing-error-guard.mjs");

const FILE = "open-sse/services/combo/example.ts";
const file = (source: string, path = FILE) => ({ path, source });

const SWALLOW = "try {\n  await work();\n} catch {\n  pending = fallback;\n}\n";

test("a bare swallowed catch is a violation when not frozen", () => {
  const { violations, stale } = evaluateSwallowedCatches([file(SWALLOW)], []);
  assert.equal(violations.length, 1);
  assert.match(violations[0], /example\.ts:3 :: swallowed-catch ::/);
  assert.deepEqual(stale, []);
});

test("rethrowing catches, no-effect markers and chained .catch() are not swallows", () => {
  const sources = [
    "try {\n  await work();\n} catch (err) {\n  log.warn(err);\n  throw err;\n}\n",
    "try {\n  clone = r.clone();\n} catch {\n  // no-effect: clone fallback\n  clone = r;\n}\n",
    "const quota = await fetchQuota(id).catch(() => null);\n",
  ];
  assert.deepEqual(collectSwallowedCatches(sources.map((s) => file(s))), []);
});

test("a frozen entry survives line shifts (keyed by snippet, not line number)", () => {
  const frozen = [
    {
      file: FILE,
      snippet: catchSnippet("\n  pending = fallback;\n"),
      count: 1,
      reason: "fallback",
    },
  ];
  const shifted = "// a new line\n// another\n\n" + SWALLOW;
  assert.deepEqual(evaluateSwallowedCatches([file(SWALLOW)], frozen), {
    violations: [],
    stale: [],
  });
  assert.deepEqual(evaluateSwallowedCatches([file(shifted)], frozen), {
    violations: [],
    stale: [],
  });
});

test("counts: a second identical swallow is new, a removed one makes the entry stale", () => {
  const frozen = [{ file: FILE, snippet: "pending = fallback;", count: 1, reason: "fallback" }];
  const twice = evaluateSwallowedCatches([file(SWALLOW + SWALLOW)], frozen);
  assert.equal(twice.violations.length, 1);
  assert.match(twice.violations[0], /example\.ts:8 ::/);

  const gone = evaluateSwallowedCatches([file("const ok = 1;\n")], frozen);
  assert.deepEqual(gone.violations, []);
  assert.equal(gone.stale.length, 1);
  assert.match(gone.stale[0], /frozen 1, live 0/);
});

test("editing a frozen catch body re-flags it (the snippet no longer matches)", () => {
  const frozen = [{ file: FILE, snippet: "pending = fallback;", count: 1, reason: "fallback" }];
  const edited = SWALLOW.replace("pending = fallback;", "pending = otherFallback;");
  const result = evaluateSwallowedCatches([file(edited)], frozen);
  assert.equal(result.violations.length, 1);
  assert.equal(result.stale.length, 1);
});

test("a frozen entry without a reason is rejected", () => {
  const frozen = [{ file: FILE, snippet: "pending = fallback;", count: 1, reason: " " }];
  const { violations } = evaluateSwallowedCatches([file(SWALLOW)], frozen);
  assert.equal(violations.length, 1);
  assert.match(violations[0], /entry needs a reason/);
});

const VOID_SITE =
  "void (async () => {\n  try {\n    await persist();\n  } catch (err) {\n    log.warn('Failed to record Last Known Good Provider', err);\n  }\n})();\n";

test("void async: an anchored allowlist entry covers the site", () => {
  const allow = [
    { file: FILE, anchor: "Failed to record Last Known Good Provider", reason: "persist" },
  ];
  assert.deepEqual(evaluateVoidAsyncSites([file(VOID_SITE)], allow), { violations: [], stale: [] });
});

test("void async: an unlisted site, a reasonless entry and an orphan entry all fail", () => {
  const unlisted = evaluateVoidAsyncSites(
    [file("void (async () => {\n  await work();\n})();\n")],
    []
  );
  assert.equal(unlisted.violations.length, 1);
  assert.match(unlisted.violations[0], /example\.ts:1 :: void-async ::/);

  const reasonless = evaluateVoidAsyncSites(
    [file(VOID_SITE)],
    [{ file: FILE, anchor: "Failed to record Last Known Good Provider" }]
  );
  assert.match(reasonless.violations[0], /needs a reason/);

  const orphan = evaluateVoidAsyncSites(
    [file("const x = 1;\n")],
    [{ file: "open-sse/services/combo/removed.ts", anchor: "gone", reason: "left over" }]
  );
  assert.deepEqual(orphan.violations, []);
  assert.deepEqual(orphan.stale, ["open-sse/services/combo/removed.ts :: gone"]);
});

test("void async: an anchor elsewhere in the file does not cover an unrelated site", () => {
  const source =
    "void (async () => {\n  await work();\n})();\n" +
    "\n".repeat(40) +
    "// Failed to record Last Known Good Provider\n";
  const { violations } = evaluateVoidAsyncSites(
    [file(source)],
    [{ file: FILE, anchor: "Failed to record Last Known Good Provider", reason: "persist" }]
  );
  assert.equal(violations.length, 1);
});

test("wired as the check:routing-error-guard npm script (not a CI job)", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts: Record<string, string>;
  };
  assert.equal(
    pkg.scripts["check:routing-error-guard"],
    "node scripts/check/check-routing-error-guard.mjs"
  );
});
