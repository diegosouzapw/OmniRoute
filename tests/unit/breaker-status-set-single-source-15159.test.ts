// Regression guard for audit #15159 — B-04 + B-05.
//
// B-04: `isProviderFailureCode` (open-sse/services/accountFallback.ts) was dead
// production code. Its only inbound edge was a unit test, so the test pinned a
// function nothing called — and worse, it encoded the WRONG policy for the name it
// advertises: `PROVIDER_FAILURE_ERROR_CODES` includes 429, while 429 is explicitly
// NOT a whole-provider breaker failure (it is per-connection cooldown / model
// lockout scope). The live set is `PROVIDER_BREAKER_FAILURE_STATUSES` in
// `src/sse/handlers/chatPredicates.ts`. A future reader reaching for a
// "isProviderFailureCode" helper would have found the 429-inclusive one.
//
// B-05: the combo path's comments pointed at `src/sse/handlers/chat.ts:206` as the
// source of truth for the breaker set. The symbol moved to
// `src/sse/handlers/chatPredicates.ts`, so the pointer was stale — while the local
// copy of the set in the same file was correct.
//
// These two are one change: deleting the dead export requires rewriting the
// comment that references it, and that comment is the one carrying the stale
// `chat.ts:206` pointer. Separating them would mean editing the same comment block
// twice.
//
// The assertions below are source-level on purpose: the point is not "does the
// breaker trip on 408" (that is covered by chatPredicates' own tests) but "can the
// dead export and the stale pointer come back".
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const ACCOUNT_FALLBACK = "open-sse/services/accountFallback.ts";
const COMBO_PREDICATES = "open-sse/services/combo/comboPredicates.ts";
const CHAT_PREDICATES = "src/sse/handlers/chatPredicates.ts";

function source(path: string): string {
  return readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("B-04: accountFallback no longer exports the dead isProviderFailureCode", () => {
  const text = source(ACCOUNT_FALLBACK);

  assert.doesNotMatch(
    text,
    /export\s+function\s+isProviderFailureCode/,
    "the dead export must not come back — its only caller was a test"
  );
  // The Set had exactly one consumer: the export above. Removing the Set too is
  // what makes this a real deletion rather than a no-op rename.
  assert.doesNotMatch(
    text,
    /PROVIDER_FAILURE_ERROR_CODES/,
    "the 429-inclusive Set must go with the dead export"
  );
});

test("B-04: no production module imports isProviderFailureCode", () => {
  const offenders: string[] = [];
  for (const path of [COMBO_PREDICATES, CHAT_PREDICATES, ACCOUNT_FALLBACK]) {
    const text = source(path);
    if (/import[^;]*\bisProviderFailureCode\b/.test(text)) offenders.push(path);
  }

  assert.deepEqual(
    offenders,
    [],
    `these modules import the deleted helper: ${offenders.join(", ")}`
  );
});

test("B-04/B-05: the combo breaker set still excludes 429", () => {
  const combo = source(COMBO_PREDICATES);
  const match = combo.match(/const PROVIDER_BREAKER_FAILURE_STATUSES = new Set\(\[([^\]]*)\]/);

  assert.ok(match, "the combo path must keep its local copy of the breaker set");

  const statuses = match[1]
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);

  // 429 is per-connection cooldown / model lockout scope, NOT whole-provider.
  assert.ok(!statuses.includes(429), "429 must not open the whole-provider breaker");
  assert.deepEqual(statuses, [408, 500, 502, 503, 504]);
});

test("B-05: the combo comments cite the live location, not the stale one", () => {
  const combo = source(COMBO_PREDICATES);

  assert.doesNotMatch(
    combo,
    /chat\.ts:206/,
    "chat.ts:206 is stale — the set moved to src/sse/handlers/chatPredicates.ts"
  );
  assert.match(
    combo,
    /chatPredicates\.ts/,
    "the source-of-truth pointer must name chatPredicates.ts"
  );
});

test("B-05: the live breaker set is the one chatPredicates exports", () => {
  const live = source(CHAT_PREDICATES);
  const match = live.match(/PROVIDER_BREAKER_FAILURE_STATUSES = new Set\(\[([^\]]*)\]/);

  assert.ok(match, "chatPredicates must own PROVIDER_BREAKER_FAILURE_STATUSES");

  const statuses = match[1]
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);

  assert.deepEqual(statuses, [408, 500, 502, 503, 504]);
});
