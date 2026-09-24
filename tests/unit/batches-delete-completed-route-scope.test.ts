/**
 * GHSA-wvxc-jp3v-5mg5 — route-level regression guard for
 * `DELETE /api/v1/batches/delete-completed`.
 *
 * The DB-level contract lives in batches-delete-completed-ownership-wvxc.test.ts.
 * This file drives the REAL route handler with REAL credentials (API keys created
 * through `createApiKey`, a dashboard session via a signed `auth_token` cookie) so
 * it fails whenever the route stops translating the caller's scope into the
 * matching `deleteCompletedBatches` scope:
 *
 *   - an inference key must only sweep its own completed batches and the response
 *     must report 0 deletions when it owns none — proven against an un-scoped
 *     `{ allTenants: true }` regression (the "flip" recorded in the PR notes);
 *   - a presented API key always scopes the sweep to that key, even alongside a
 *     dashboard session cookie (the key wins, like GET /v1/batches); only a
 *     session WITHOUT a key sweeps the whole instance;
 *   - a presented key that does not resolve (deleted/rotated/mistyped) is rejected
 *     with 401 even when a session cookie is also present (fail closed);
 *   - a presented key that resolves but is no longer VALID (revoked, deactivated,
 *     banned or expired) is rejected with 401 too — existence of the row is not
 *     authorization (CWE-613); the 401 body is the `buildErrorBody()` shape;
 *   - a VALID key still goes through the per-key operator policy
 *     (`enforceApiKeyPolicy`: endpoint allowlist, schedule, usage cap, rate
 *     limit) like every other `/v1` route — a key whose `allowedEndpoints`
 *     excludes `batches` is rejected by the enforcer and sweeps nothing, for
 *     BOTH path shapes the handler can see (`/v1/…` via the rewrite and the
 *     App Router's own `/api/v1/…`) (omni-code-sec LEDGER-9/13/16);
 *   - no credentials at all → 401;
 *   - a sweep that throws → sanitized 500 (no stack trace, no raw SQLite message)
 *     and nothing deleted (the sweep is atomic);
 *   - the rejection audit line carries an HONEST `reason`: `getApiKeyRequestScope`
 *     is the single lifecycle gate and surfaces `keyState`, so a revoked key logs
 *     `invalid` and an unknown key logs `unresolved` — the route never re-runs
 *     `validateApiKey` to re-derive it (omni-code-review LEDGER-3/9).
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any `@/lib/db/*`
 * module loads (dynamic imports below), so this file never touches ~/.omniroute.
 */
import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import pino from "pino";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "wvxc-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "wvxc-route-api-secret";
process.env.JWT_SECRET = "wvxc-route-jwt-secret";
// The audit-reason case below reads the route's info-level line off the shared pino
// stream; pin the level so a CI-wide APP_LOG_LEVEL=warn cannot silently drop it.
process.env.APP_LOG_LEVEL = "info";

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createApiKey, revokeApiKey, updateApiKeyPermissions, setApiKeyExpiry } =
  await import("../../src/lib/db/apiKeys.ts");
const { createFile, getFile, getFileContent } = await import("../../src/lib/db/files.ts");
const { createBatch, getBatch } = await import("../../src/lib/db/batches.ts");
const { DELETE } = await import("../../src/app/api/v1/batches/delete-completed/route.ts");
const { getApiKeyRequestScope } = await import("../../src/app/api/v1/_helpers/apiKeyScope.ts");
const { logger: rootLogger } = await import("../../src/shared/utils/logger.ts");

const ROUTE_URL = "http://localhost/api/v1/batches/delete-completed";
const LOG_ROUTE = "batches/delete-completed";

async function sessionCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${jwt}`;
}

/**
 * `label` names the seeded batch's `.jsonl` file. Keep it word-shaped or under 10 chars: the
 * gitleaks generic-api-key rule reports a literal of 10+ chars with Shannon entropy >= 3.5 that
 * sits right after a `key*.id` argument (the argument supplies the rule's "key" keyword).
 * `wvxc-route-401` did (entropy 3.66) and became `route401` in #13729; the word-shaped
 * `wvxc-route-<scenario>` siblings stay under the entropy floor and are clean.
 */
function seedCompletedBatch(apiKeyId: string | null, label: string) {
  const file = createFile({
    bytes: 8,
    filename: `${label}.jsonl`,
    purpose: "batch",
    content: Buffer.from(label),
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

async function callDelete(headers: Record<string, string>, url: string = ROUTE_URL) {
  const res = await DELETE(new Request(url, { method: "DELETE", headers }));
  const body = (await res.json()) as {
    deleted?: boolean;
    deletedBatches?: number;
    deletedFiles?: number;
    hasMore?: boolean;
    error?: { message: string; type?: string; code?: string };
  };
  return { res, body };
}

const REJECTION_AUDIT_MSG = "delete-completed: presented API key rejected";

/**
 * Run `fn` while tapping the ROOT pino stream and return the parsed
 * `presented API key rejected` audit line it emitted. The route logs through the
 * `sse` child (`createLogger("sse")`, a module-private `Object.create(root)`), and a
 * pino child resolves `streamSym` through its prototype chain, so shadowing `write`
 * on the root's stream object sees every child line — no ESM namespace mocking.
 * pino serializes to a JSON line BEFORE handing it to the stream, so the tap sees
 * the structured fields, not pino-pretty output.
 */
async function captureRejectionAudit<T>(
  fn: () => Promise<T>
): Promise<{ result: T; audit: Record<string, unknown> | null }> {
  const stream = (rootLogger as unknown as Record<symbol, { write: (line: string) => boolean }>)[
    pino.symbols.streamSym
  ];
  const originalWrite = stream.write;
  const lines: string[] = [];
  stream.write = (line: string) => {
    lines.push(line);
    return true;
  };
  try {
    const result = await fn();
    const audit =
      lines
        .map((line) => {
          try {
            return JSON.parse(line) as Record<string, unknown>;
          } catch {
            return null;
          }
        })
        .find((entry) => entry?.msg === REJECTION_AUDIT_MSG) ?? null;
    return { result, audit };
  } finally {
    stream.write = originalWrite;
  }
}

describe("DELETE /api/v1/batches/delete-completed — caller scope (GHSA-wvxc-jp3v-5mg5)", () => {
  after(() => {
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("an inference key sweeps only its own batches: another key's batch survives and the response reports 0", async () => {
    const keyA = await createApiKey("wvxc-route-key-a", "machine-wvxc-a", []);
    const keyB = await createApiKey("wvxc-route-key-b", "machine-wvxc-b", []);
    const victim = seedCompletedBatch(keyB.id, "wvxc-route-victim");

    const { res, body } = await callDelete({ Authorization: `Bearer ${keyA.key}` });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.deleted, true);
    assert.strictEqual(body.deletedBatches, 0, "key A owns no completed batch — nothing to sweep");
    assert.strictEqual(body.deletedFiles, 0);
    assert.strictEqual(
      body.hasMore,
      false,
      "the response must surface deleteCompletedBatches' hasMore continuation flag (#13680)"
    );
    assert.ok(getBatch(victim.batch.id), "key B's completed batch must survive key A's sweep");
    assert.strictEqual(
      getFileContent(victim.file.id)?.toString(),
      "wvxc-route-victim",
      "key B's file content must not be nulled by key A"
    );

    // And key A's own batch IS swept by key A.
    const own = seedCompletedBatch(keyA.id, "wvxc-route-own");
    const second = await callDelete({ Authorization: `Bearer ${keyA.key}` });
    assert.strictEqual(second.res.status, 200);
    assert.strictEqual(second.body.deletedBatches, 1);
    assert.strictEqual(second.body.deletedFiles, 1);
    assert.strictEqual(getBatch(own.batch.id), null, "key A's own completed batch is swept");
    assert.ok(getBatch(victim.batch.id), "key B's batch still survives");
  });

  it("a dashboard session WITHOUT a key sweeps the whole instance", async () => {
    const keyB = await createApiKey("wvxc-route-session-b", "machine-wvxc-sb", []);
    const other = seedCompletedBatch(keyB.id, "wvxc-route-session-other");
    const unowned = seedCompletedBatch(null, "wvxc-route-session-unowned");

    const { res, body } = await callDelete({ cookie: await sessionCookie() });

    assert.strictEqual(res.status, 200);
    assert.ok(
      body.deletedBatches! >= 2,
      `session sweep must reach every tenant, got ${body.deletedBatches}`
    );
    assert.strictEqual(getBatch(other.batch.id), null, "session sweep removes another key's batch");
    assert.strictEqual(getBatch(unowned.batch.id), null, "session sweep removes the unowned batch");
    assert.strictEqual(getFile(other.file.id), null, "session sweep soft-deletes the files too");
  });

  it("a request carrying BOTH a session cookie and an API key is scoped to the key (the key wins, like GET /v1/batches)", async () => {
    const keyA = await createApiKey("wvxc-route-both-a", "machine-wvxc-ba", []);
    const keyB = await createApiKey("wvxc-route-both-b", "machine-wvxc-bb", []);
    const own = seedCompletedBatch(keyA.id, "wvxc-route-both-own");
    const other = seedCompletedBatch(keyB.id, "wvxc-route-both-other");
    const unowned = seedCompletedBatch(null, "wvxc-route-both-unowned");

    const { res, body } = await callDelete({
      Authorization: `Bearer ${keyA.key}`,
      cookie: await sessionCookie(),
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.deletedBatches, 1, "only key A's own completed batch is swept");
    assert.strictEqual(getBatch(own.batch.id), null, "key A's own batch is swept");
    assert.ok(
      getBatch(other.batch.id),
      "key B's batch survives — a presented key never widens the sweep"
    );
    assert.ok(getBatch(unowned.batch.id), "the unowned batch survives a key-scoped sweep");
    assert.strictEqual(
      getFileContent(other.file.id)?.toString(),
      "wvxc-route-both-other",
      "key B's file content is intact"
    );
  });

  it("rejects a presented API key that does not resolve with 401 — even alongside a session cookie — and deletes nothing", async () => {
    const keyB = await createApiKey("wvxc-route-unknown-b", "machine-wvxc-ub", []);
    const other = seedCompletedBatch(keyB.id, "wvxc-route-unknown-other");

    const { res, body } = await callDelete({
      Authorization: "Bearer sk-omni-this-key-was-rotated-away-wvxc",
      cookie: await sessionCookie(),
    });

    assert.strictEqual(
      res.status,
      401,
      "an unresolvable key must fail closed, not fall through to the session"
    );
    assert.match(body.error?.message ?? "", /Invalid API key/);
    assert.ok(getBatch(other.batch.id), "nothing is swept on a rejected credential");
    assert.strictEqual(
      getFileContent(other.file.id)?.toString(),
      "wvxc-route-unknown-other",
      "file content is intact on a rejected credential"
    );
  });

  it("rejects a REVOKED key with 401 — the row still exists but is no longer valid — and deletes nothing", async () => {
    const keyA = await createApiKey("wvxc-route-revoked-a", "machine-wvxc-ra", []);
    const own = seedCompletedBatch(keyA.id, "wvxc-route-revoked-own");
    assert.strictEqual(await revokeApiKey(keyA.id), true);

    const { res, body } = await callDelete({ Authorization: `Bearer ${keyA.key}` });

    assert.strictEqual(res.status, 401, "a revoked key must not run the sweep");
    assert.strictEqual(body.error?.message, "Invalid API key");
    assert.strictEqual(body.error?.type, "authentication_error");
    assert.strictEqual(body.error?.code, "invalid_api_key");
    assert.ok(getBatch(own.batch.id), "nothing is swept with a revoked key");
    assert.strictEqual(
      getFileContent(own.file.id)?.toString(),
      "wvxc-route-revoked-own",
      "file content is intact with a revoked key"
    );
  });

  it("rejects a DEACTIVATED key (is_active = 0) with 401 and deletes nothing", async () => {
    const keyA = await createApiKey("wvxc-route-inactive-a", "machine-wvxc-ia", []);
    const own = seedCompletedBatch(keyA.id, "wvxc-route-inactive-own");
    await updateApiKeyPermissions(keyA.id, { isActive: false });

    const { res, body } = await callDelete({ Authorization: `Bearer ${keyA.key}` });

    assert.strictEqual(res.status, 401, "a deactivated key must not run the sweep");
    assert.strictEqual(body.error?.message, "Invalid API key");
    assert.ok(getBatch(own.batch.id), "nothing is swept with a deactivated key");
  });

  it("rejects a BANNED key with 401 and deletes nothing", async () => {
    const keyA = await createApiKey("wvxc-route-banned-a", "machine-wvxc-ba2", []);
    const own = seedCompletedBatch(keyA.id, "wvxc-route-banned-own");
    await updateApiKeyPermissions(keyA.id, { isBanned: true });

    const { res, body } = await callDelete({ Authorization: `Bearer ${keyA.key}` });

    assert.strictEqual(res.status, 401, "a banned key must not run the sweep");
    assert.strictEqual(body.error?.message, "Invalid API key");
    assert.ok(getBatch(own.batch.id), "nothing is swept with a banned key");
  });

  it("rejects an EXPIRED key with 401 — even alongside a session cookie — and deletes nothing", async () => {
    const keyA = await createApiKey("wvxc-route-expired-a", "machine-wvxc-ea", []);
    const own = seedCompletedBatch(keyA.id, "wvxc-route-expired-own");
    const unowned = seedCompletedBatch(null, "wvxc-route-expired-unowned");
    await setApiKeyExpiry(keyA.id, new Date(Date.now() - 60_000).toISOString());

    const { res, body } = await callDelete({
      Authorization: `Bearer ${keyA.key}`,
      cookie: await sessionCookie(),
    });

    assert.strictEqual(
      res.status,
      401,
      "an expired key must fail closed, not fall through to the session"
    );
    assert.strictEqual(body.error?.message, "Invalid API key");
    assert.ok(getBatch(own.batch.id), "nothing is swept with an expired key");
    assert.ok(getBatch(unowned.batch.id), "the session branch is never reached");
  });

  it("applies the caller's API-key policy: a key whose allowedEndpoints excludes 'batches' is rejected by the enforcer and sweeps nothing (both /api/v1 and /v1 path shapes)", async () => {
    const keyA = await createApiKey("wvxc-route-policy-a", "machine-wvxc-pa", []);
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });
    const own = seedCompletedBatch(keyA.id, "wvxc-route-policy-own");

    for (const url of [ROUTE_URL, "http://localhost/v1/batches/delete-completed"]) {
      const { res, body } = await callDelete({ Authorization: `Bearer ${keyA.key}` }, url);

      assert.strictEqual(res.status, 403, `${url}: the enforcer's endpoint-allowlist rejection`);
      assert.match(body.error?.message ?? "", /batches/, `${url}: names the blocked category`);
      assert.ok(getBatch(own.batch.id), `${url}: nothing is swept when the policy rejects`);
      assert.strictEqual(
        getFileContent(own.file.id)?.toString(),
        "wvxc-route-policy-own",
        `${url}: file content is intact when the policy rejects`
      );
    }
  });

  it("getApiKeyRequestScope surfaces `keyState` (valid / invalid / unresolved / none) so the route derives its audit reason instead of re-validating (omni-code-review LEDGER-3/9)", async () => {
    const live = await createApiKey("wvxc-route-state-live", "machine-wvxc-sl", []);
    const revoked = await createApiKey("wvxc-route-state-revoked", "machine-wvxc-sr", []);
    assert.strictEqual(await revokeApiKey(revoked.id), true);
    const scopeOf = (headers: Record<string, string>) =>
      getApiKeyRequestScope(new Request(ROUTE_URL, { method: "DELETE", headers }));

    const liveScope = await scopeOf({ Authorization: `Bearer ${live.key}` });
    assert.strictEqual(liveScope.keyState, "valid");
    assert.strictEqual(liveScope.apiKeyId, live.id, "a valid key still resolves its id");

    const revokedScope = await scopeOf({ Authorization: `Bearer ${revoked.key}` });
    assert.strictEqual(
      revokedScope.keyState,
      "invalid",
      "row exists but failed the lifecycle gate"
    );
    assert.strictEqual(revokedScope.apiKeyId, null, "the #13881 fold-to-null contract is kept");
    assert.strictEqual(revokedScope.apiKeyMetadata, null);

    const unknownScope = await scopeOf({ Authorization: "Bearer sk-omni-never-issued-wvxc-state" });
    assert.strictEqual(unknownScope.keyState, "unresolved", "no row at all");
    assert.strictEqual(unknownScope.apiKeyId, null);

    const anonymousScope = await scopeOf({});
    assert.strictEqual(anonymousScope.keyState, "none", "no key presented");
    assert.strictEqual(anonymousScope.apiKey, null);
    assert.strictEqual(anonymousScope.rejection, null, "the helper still never sets rejection");
  });

  it("the rejection audit line is honest: a REVOKED key logs reason 'invalid', an unknown key logs 'unresolved' (omni-code-review LEDGER-3/9)", async () => {
    const keyA = await createApiKey("wvxc-route-reason-a", "machine-wvxc-rsn", []);
    assert.strictEqual(await revokeApiKey(keyA.id), true);

    const revoked = await captureRejectionAudit(() =>
      callDelete({ Authorization: `Bearer ${keyA.key}` })
    );
    assert.strictEqual(revoked.result.res.status, 401, "the revoked key is still refused");
    assert.ok(revoked.audit, "a rejected key must emit the audit line");
    assert.strictEqual(
      revoked.audit?.reason,
      "invalid",
      "a key whose row exists but failed the lifecycle gate must not be logged as 'unresolved'"
    );
    assert.strictEqual(revoked.audit?.route, LOG_ROUTE);
    assert.strictEqual(
      revoked.audit?.apiKeyId,
      null,
      "the fold-to-null contract shows in the audit"
    );

    const unknown = await captureRejectionAudit(() =>
      callDelete({ Authorization: "Bearer sk-omni-never-issued-wvxc-reason" })
    );
    assert.strictEqual(unknown.result.res.status, 401, "the unknown key is still refused");
    assert.ok(unknown.audit, "an unresolvable key must emit the audit line");
    assert.strictEqual(unknown.audit?.reason, "unresolved", "no row at all → 'unresolved'");
  });

  it("rejects an unauthenticated request with 401 and deletes nothing", async () => {
    const keyB = await createApiKey("wvxc-route-401-b", "machine-wvxc-401", []);
    // short label: see the seedCompletedBatch docblock (#13729)
    const seeded = seedCompletedBatch(keyB.id, "route401");

    const { res, body } = await callDelete({});

    assert.strictEqual(res.status, 401);
    assert.strictEqual(body.error?.message, "Authentication required");
    assert.strictEqual(body.error?.type, "authentication_error", "401 body uses buildErrorBody()");
    assert.strictEqual(body.error?.code, "invalid_api_key");
    assert.ok(getBatch(seeded.batch.id), "nothing is swept without credentials");
  });

  it("returns a sanitized 500 (no stack trace, no raw SQLite message) when the sweep throws, and deletes nothing", async () => {
    const keyA = await createApiKey("wvxc-route-500-a", "machine-wvxc-500", []);
    // short label: see the seedCompletedBatch docblock (#13729)
    const own = seedCompletedBatch(keyA.id, "route500");
    const db = getDbInstance();

    db.exec(
      "CREATE TRIGGER wvxc_route_abort_batch_delete BEFORE DELETE ON batches BEGIN SELECT RAISE(ABORT, 'wvxc route injected failure at /secret/path.ts:1'); END"
    );
    let outcome: Awaited<ReturnType<typeof callDelete>>;
    try {
      outcome = await callDelete({ Authorization: `Bearer ${keyA.key}` });
    } finally {
      db.exec("DROP TRIGGER IF EXISTS wvxc_route_abort_batch_delete");
    }

    assert.strictEqual(outcome.res.status, 500);
    const message = outcome.body.error?.message ?? "";
    assert.ok(message.length > 0, "a 500 still carries a human-readable message");
    assert.ok(!message.includes("at /"), `stack trace leaked: ${message}`);
    assert.ok(!message.includes("wvxc route injected failure"), `raw DB error leaked: ${message}`);
    assert.ok(!message.includes("SQLITE"), `raw SQLite code leaked: ${message}`);
    assert.ok(getBatch(own.batch.id), "a failed sweep leaves the batch row in place");
    assert.strictEqual(
      getFileContent(own.file.id)?.toString(),
      "route500",
      "a failed sweep rolls the file content back"
    );
  });

  it("a key presented ONLY via x-api-key (no anthropic-version, plain UA) sweeps its own batches, not the instance or nothing (LEDGER-27, omni-code-sec round 3)", async () => {
    const keyA = await createApiKey("wvxc-route-xkey-a", "machine-wvxc-xa", []);
    const keyB = await createApiKey("wvxc-route-xkey-b", "machine-wvxc-xb", []);
    const own = seedCompletedBatch(keyA.id, "wvxc-route-xkey-own");
    const victim = seedCompletedBatch(keyB.id, "wvxc-route-xkey-victim");

    // `getApiKeyRequestScope`/`extractApiKey()` ignore a bare x-api-key with no
    // anthropic-version/claude UA, so scope.apiKeyId is null here — only
    // enforceApiKeyPolicy() resolves keyA via extractUngatedClientApiKey().
    const { res, body } = await callDelete({ "x-api-key": keyA.key });

    assert.strictEqual(res.status, 200, `expected a scoped sweep, got ${JSON.stringify(body)}`);
    assert.strictEqual(body.deletedBatches, 1, "only key A's own completed batch is swept");
    assert.strictEqual(body.deletedFiles, 1);
    assert.strictEqual(getBatch(own.batch.id), null, "key A's own batch was deleted");
    assert.ok(
      getBatch(victim.batch.id),
      "key B's batch must survive — the sweep must not fall through to instance-wide"
    );
    assert.strictEqual(
      getFileContent(victim.file.id)?.toString(),
      "wvxc-route-xkey-victim",
      "key B's file content must not be nulled by key A's x-api-key sweep"
    );
  });
});
