/**
 * GHSA-wvxc-jp3v-5mg5 — `DELETE /api/v1/batches/delete-completed` deleted the
 * completed batches of EVERY api key on the instance, and nulled the contents of
 * every file those batches referenced.
 *
 * Two defects in one endpoint:
 *   1. `deleteCompletedBatches()` carried no `api_key_id` predicate — the file
 *      SELECT, the checkpoint DELETE and the batch DELETE were all instance-wide.
 *   2. The route only checked that SOME key was present (`!scope.apiKeyId` →
 *      401), never that the caller owned anything. A key with `scopes: []` —
 *      an ordinary inference key — could wipe another tenant's batches.
 *
 * The ownership pattern this restores is not new: `listBatches(apiKeyId?)` and
 * `countBatches(apiKeyId?)` in the same module already scope by `api_key_id`,
 * and `batches/[id]/route.ts` already gates per-record access with `scopeCheck`
 * (session auth sees everything, a key sees only its own). This helper was the
 * one that never got it.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/batch-delete-completed-ownership-wvxc.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createFile, getFile } from "@/lib/db/files";
import { createBatch, getBatch, deleteCompletedBatches } from "@/lib/db/batches";

const KEY_A = "key-wvxc-aaaa";
const KEY_B = "key-wvxc-bbbb";

// Source-text guard for the LEDGER-3/9 invariant. Comments are stripped BEFORE matching
// (LEDGER-51/61): the route's own comment says "it runs `validateApiKey` (is_active, …" and
// a reflow that drops the backticks — or a `@see validateApiKey(key)` — is prose, not a
// second lookup. The assertion is about code.
const STRIP_COMMENTS_RE = /\/\*[\s\S]*?\*\/|\/\/.*$/gm;
const VALIDATE_API_KEY_CALL_RE = /import\s*\{[^}]*\bvalidateApiKey\b|\bvalidateApiKey\s*\(/;

function routeReRunsValidateApiKey(src: string): boolean {
  return VALIDATE_API_KEY_CALL_RE.test(src.replace(STRIP_COMMENTS_RE, ""));
}

function seedCompletedBatch(apiKeyId: string | null, tag: string) {
  // The file carries the batch's owner, as an upload through that key does in production.
  // #13374 (SEC-C) scopes the file half of a key sweep to files the caller owns, so an
  // unowned file referenced by the caller's batch is deliberately left intact.
  const file = createFile({
    bytes: 10,
    filename: `wvxc-${tag}.jsonl`,
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId,
  });
  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    status: "completed",
    apiKeyId,
  });
  return { file, batch };
}

// The helper now takes an explicit scope (#12969): `{ apiKeyId }` or `{ allTenants: true }`.
// A bare string or an omitted argument throws instead of widening the sweep, so every call
// below states its scope. The assertions are the original #13211 ones, unchanged.
describe("deleteCompletedBatches — ownership scoping (GHSA-wvxc-jp3v-5mg5)", () => {
  it("scoped to one key deletes ONLY that key's completed batches", () => {
    const a = seedCompletedBatch(KEY_A, "a1");
    const b = seedCompletedBatch(KEY_B, "b1");

    const result = deleteCompletedBatches({ apiKeyId: KEY_A });

    assert.equal(getBatch(a.batch.id), null, "the caller's own batch should be gone");
    assert.ok(getBatch(b.batch.id), "another key's batch must survive");
    assert.equal(result.deletedBatches, 1, "must report only what it actually deleted");
  });

  it("scoped deletion does not touch another key's file contents", () => {
    const a = seedCompletedBatch(KEY_A, "a2");
    const b = seedCompletedBatch(KEY_B, "b2");

    deleteCompletedBatches({ apiKeyId: KEY_A });

    assert.equal(getFile(a.file.id), null, "the caller's own file should be gone");
    assert.ok(getFile(b.file.id), "another key's file must survive with its content intact");
  });

  it("a key with no completed batches deletes nothing at all", () => {
    const b = seedCompletedBatch(KEY_B, "b3");

    const result = deleteCompletedBatches({ apiKeyId: "key-wvxc-with-nothing" });

    assert.equal(result.deletedBatches, 0);
    assert.equal(result.deletedFiles, 0);
    assert.ok(getBatch(b.batch.id), "an unrelated key's batch must survive");
  });

  it("unscoped (dashboard session) still clears the whole instance", () => {
    // The operator's own dashboard legitimately cleans up everything; that is
    // the ONLY caller allowed to ask for allTenants. Preserved deliberately.
    seedCompletedBatch(KEY_A, "a4");
    seedCompletedBatch(KEY_B, "b4");

    const result = deleteCompletedBatches({ allTenants: true });

    assert.ok(
      result.deletedBatches >= 2,
      `expected an instance-wide sweep, got ${result.deletedBatches}`
    );
  });
});

describe("the route passes the caller's key through", () => {
  it("delete-completed scopes by api key instead of calling the helper bare", async () => {
    const { readFileSync } = await import("node:fs");
    const { fileURLToPath } = await import("node:url");
    const src = readFileSync(
      fileURLToPath(
        new URL("../../src/app/api/v1/batches/delete-completed/route.ts", import.meta.url)
      ),
      "utf8"
    );
    assert.ok(
      !/deleteCompletedBatches\(\s*\)/.test(src),
      "the route still calls deleteCompletedBatches() with no owner — every tenant's batches go"
    );
    assert.ok(
      /deleteCompletedBatches\(\s*sweepScope\s*\)/.test(src) &&
        /sweepScope = \{ apiKeyId: scope\.apiKeyId \}/.test(src),
      "the route must pass the caller's scope into the helper"
    );
  });

  it("does not re-run validateApiKey: getApiKeyRequestScope is the single lifecycle gate and the audit reason is its keyState (omni-code-review LEDGER-3/9)", async () => {
    const { readFileSync } = await import("node:fs");
    const { fileURLToPath } = await import("node:url");
    const src = readFileSync(
      fileURLToPath(
        new URL("../../src/app/api/v1/batches/delete-completed/route.ts", import.meta.url)
      ),
      "utf8"
    );
    assert.ok(
      !routeReRunsValidateApiKey(src),
      "the route re-checks a lifecycle the helper already folded into apiKeyId: null — a redundant second lookup on every keyed request"
    );
    assert.ok(
      /reason:\s*scope\.keyState/.test(src),
      "the audit reason must come from the helper's keyState, not be re-derived from apiKeyId"
    );
  });

  it("the validateApiKey guard ignores prose: a comment mentioning `validateApiKey (` must not trip it (LEDGER-51/61)", () => {
    const proseOnly = [
      "// getApiKeyRequestScope is the single gate: it runs validateApiKey (is_active,",
      "// revoked_at, is_banned, expires_at) itself and folds failures into apiKeyId: null.",
      "/** @see validateApiKey(key) for the lifecycle checks this route relies on. */",
      "const scope = await getApiKeyRequestScope(request);",
      "logger.info({ reason: scope.keyState });",
    ].join("\n");
    assert.equal(
      routeReRunsValidateApiKey(proseOnly),
      false,
      "a comment reflow must not be reported as a redundant second lookup"
    );
  });

  it("the validateApiKey guard still catches a real re-run in code (mutation check)", () => {
    const importAgain = [
      'import { validateApiKey } from "@/lib/db/apiKeys";',
      "const scope = await getApiKeyRequestScope(request);",
    ].join("\n");
    const callAgain = [
      "const scope = await getApiKeyRequestScope(request);",
      "const record = validateApiKey(scope.apiKey);",
    ].join("\n");
    assert.equal(routeReRunsValidateApiKey(importAgain), true, "an import must still trip it");
    assert.equal(routeReRunsValidateApiKey(callAgain), true, "a call must still trip it");
  });
});
