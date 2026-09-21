import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// #10460 pattern: DATA_DIR must be assigned BEFORE any transitive DB import.
// accountFallback.ts statically imports `@/lib/db/providers` -> `src/lib/db/core.ts`,
// whose DATA_DIR is captured once at module-load time.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-errortext-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-errortext-test-secret";

const { shouldMarkAccountExhaustedFrom429 } =
  await import("../../open-sse/services/accountFallback.ts");

/**
 * `shouldPreserveQuotaSignals(provider, errorText)` (open-sse/services/quotaResetParsing.ts)
 * gained its second parameter with the #6638 fix, but only ONE of its two call sites was
 * updated: `checkFallbackError` passes `errorText`, while
 * `shouldMarkAccountExhaustedFrom429` still called it with the provider alone. With
 * `errorText` undefined the helper's `Boolean(errorText) && looksLikeQuotaExhausted(...)`
 * branch can never be true, so for every apikey-category provider the quota cache was
 * never marked exhausted — even when the upstream body explicitly said a long-window cap
 * was hit. These cases pin both directions of the now-threaded argument.
 */

// An explicit long-window quota body — the exact shape #6638 was reported with.
const QUOTA_EXHAUSTED_BODY = JSON.stringify({
  error: "You have exceeded your weekly usage quota. Your quota will reset in 3 days.",
});

test("shouldMarkAccountExhaustedFrom429 seeds the quota cache for an apikey 429 whose body says the quota is exhausted", () => {
  // `openai` is apikey-category and has no per-model quota, so the result is decided
  // purely by whether the body-text quota signal reaches shouldPreserveQuotaSignals.
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      undefined,
      QUOTA_EXHAUSTED_BODY
    ),
    true
  );
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "anthropic",
      "claude-sonnet-4-6",
      undefined,
      undefined,
      QUOTA_EXHAUSTED_BODY
    ),
    true
  );
});

test("shouldMarkAccountExhaustedFrom429 still ignores a plain apikey rate limit", () => {
  // Neither body matches QUOTA_PATTERNS, so a plain 429 must keep falling through to the
  // short generic cooldown instead of poisoning the connection's quota cache.
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      undefined,
      "Rate limit exceeded, retry in 20s"
    ),
    false
  );
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      undefined,
      "Too Many Requests"
    ),
    false
  );
});

test("shouldMarkAccountExhaustedFrom429 keeps its pre-existing behavior when no errorText is supplied", () => {
  // The new parameter is optional and additive: OAuth-category providers still preserve
  // quota signals unconditionally, and apikey-category ones still default to "not
  // exhausted" without an explicit body signal.
  assert.equal(shouldMarkAccountExhaustedFrom429("claude", "claude-sonnet-4-6"), true);
  assert.equal(shouldMarkAccountExhaustedFrom429("openai", "gpt-4o-mini"), false);
});

test("shouldMarkAccountExhaustedFrom429 lets a transient failureKind win over a quota body", () => {
  // The failureKind short-circuit runs before the body-text check and must stay that way:
  // a 429 the classifier already called transient never poisons the quota cache.
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      "rate_limit",
      QUOTA_EXHAUSTED_BODY
    ),
    false
  );
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      "transient",
      QUOTA_EXHAUSTED_BODY
    ),
    false
  );
});

/**
 * The cases above pin the helper. This one pins the WIRING, and it is the reason the
 * fix does anything in production.
 *
 * `errorText` is an OPTIONAL 5th parameter, so dropping it at the call site is neither a
 * type error nor a helper-test failure — exactly the shape of the bug being fixed (a
 * two-argument helper whose call site silently passes one). Without this case the
 * production half of the patch could be reverted, or lost in a refactor, with the whole
 * suite green.
 *
 * `handleSingleModelChat` is not exported from `src/sse/handlers/chat.ts`, so the call
 * cannot be driven or spied without changing the production surface. A source-level
 * assertion is the precedent for that situation in this suite — see
 * `tests/unit/api-key-provider-quota-bypass-scope.test.ts`. Parse the argument list
 * rather than regex-matching the formatted text, so Prettier reflowing the call cannot
 * turn this guard into a false failure (or, worse, a false pass).
 */
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** Top-level (paren/bracket/brace-depth 0) comma split of one argument list. */
function splitTopLevelArgs(argList: string): string[] {
  const args: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of argList) {
    if (ch === "(" || ch === "[" || ch === "{") depth++;
    else if (ch === ")" || ch === "]" || ch === "}") depth--;
    if (ch === "," && depth === 0) {
      args.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim().length > 0) args.push(current.trim());
  return args;
}

/** Every `fn(...)` call in `source`, returned as its list of top-level arguments. */
function callSiteArgs(source: string, fn: string): string[][] {
  const calls: string[][] = [];
  const needle = `${fn}(`;
  let from = 0;
  for (;;) {
    const start = source.indexOf(needle, from);
    if (start === -1) break;
    from = start + needle.length;
    // Skip the import/declaration forms — only real invocations carry arguments.
    const before = source.slice(Math.max(0, start - 9), start);
    if (/\bfunction\s+$/.test(before)) continue;
    let depth = 1;
    let i = from;
    while (i < source.length && depth > 0) {
      const ch = source[i];
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      i++;
    }
    calls.push(splitTopLevelArgs(source.slice(from, i - 1)));
  }
  return calls;
}

test("chat.ts forwards the upstream body as the 5th argument to shouldMarkAccountExhaustedFrom429", () => {
  const source = fs.readFileSync(path.join(repoRoot, "src/sse/handlers/chat.ts"), "utf8");
  const calls = callSiteArgs(source, "shouldMarkAccountExhaustedFrom429").filter(
    // Drop the `import { … }` specifier, which parses as a zero-argument "call".
    (args) => args.length > 0
  );

  assert.equal(
    calls.length,
    1,
    "expected exactly one shouldMarkAccountExhaustedFrom429 call site in chat.ts; " +
      "a new one must forward errorText too"
  );
  assert.deepEqual(calls[0], ["provider", "model", "passthroughModels", "failureKind", "errorStr"]);

  // Pin what `errorStr` is, so the guard cannot pass on a same-named local that no longer
  // holds the upstream body (chat.ts:2282).
  assert.match(source, /const errorStr = String\(result\.rawMessage \?\? result\.error \?\? ""\);/);
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});
