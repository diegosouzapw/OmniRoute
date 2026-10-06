import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-exhaustion-id-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const chatHelpers = await import("../../src/sse/handlers/chatHelpers.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function createConnection(provider = "opencode-test") {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    isActive: true,
    testStatus: "active",
  });
  return String(conn.id);
}

async function driveExhaustionViaBare500(
  connId: string,
  options?: { correlationId?: string | null }
) {
  // Bare 500 takes the status === 500 early branch: no model lockout, the
  // request-scoped id lands on the exhaustion line.
  return auth.markAccountUnavailable(
    connId,
    500,
    "transient upstream 500",
    "opencode-test",
    "test-model",
    null,
    options ?? {}
  );
}

function readSource(rel: string) {
  return fs.readFileSync(new URL(rel, import.meta.url), "utf8");
}

test("exhaustion lines carry the request id", async (t) => {
  await t.test("chat sender forwards the id (sender side)", async () => {
    // A receiver-only test (options hand-set at the auth call) would
    // still pass if a chat sender stopped forwarding the id. This test reads
    // the sender call sites directly: every chat sender must pass its
    // in-scope request id via options. If any of the four senders drops the
    // field, the count/asserts below fail.
    const chatSource = readSource("../../src/sse/handlers/chat.ts");
    const helpersSource = readSource("../../src/sse/handlers/chatHelpers.ts");

    const chatSenders = [
      ...chatSource.matchAll(/buildExhaustionOptions\(runtimeOptions\.correlationId \?\? null,/g),
    ];
    assert.equal(
      chatSenders.length,
      3,
      "chat.ts must pass runtimeOptions.correlationId at all three markAccountUnavailable senders (:2089/:2138/:2383)"
    );
    assert.match(
      helpersSource,
      /buildExhaustionOptions\(correlationId \?\? null,/,
      "chatHelpers.ts onStreamFailure must pass its in-scope correlationId via options"
    );
    // The fallback-path sender (:2383) carries the full options literal —
    // persist flag, combo flag, headers AND the id together.
    assert.match(
      chatSource,
      /buildExhaustionOptions\(runtimeOptions\.correlationId \?\? null, \{\s*persistUnavailableState: !\([\s\S]*?headers: result\.response\.headers,\s*\}\)/,
      "chat.ts:2383 fallback sender must forward the id alongside the existing options literal"
    );
    // The exhaustion caller passes the id positionally (10th arg), not a bare
    // request id from another scope.
    assert.match(
      chatSource,
      /handleNoCredentials\(\s*credentials,[\s\S]*?shadowedNode,\s*runtimeOptions\?\.correlationId \?\? null\s*\)/,
      "chat.ts:1775 must pass runtimeOptions?.correlationId ?? null as the trailing handleNoCredentials arg"
    );

    // The pure helper itself forwards the exact id the sender passes in.
    assert.deepEqual(auth.buildExhaustionOptions("trace-123", { isCombo: true }), {
      isCombo: true,
      correlationId: "trace-123",
    });
    assert.deepEqual(auth.buildExhaustionOptions(null, { isCombo: false }), {
      isCombo: false,
      correlationId: null,
    });
  });

  await t.test("auth.ts emits structured id meta on the exhaustion line", async () => {
    const authSource = readSource("../../src/sse/services/auth.ts");
    assert.match(
      authSource,
      /\.\.\.\(options\.correlationId \? \{ correlationId: options\.correlationId \} : \{\}\)/,
      "auth.ts:2868 must spread correlationId into the log meta only when truthy"
    );

    await resetStorage();
    const withId = await createConnection();
    const resWithId = await driveExhaustionViaBare500(
      withId,
      auth.buildExhaustionOptions("trace-123")
    );
    // Bare 500: no model lockout, connection stays active, fallback allowed.
    assert.equal(resWithId.shouldFallback, true);
    const withAfter = await providersDb.getProviderConnectionById(withId);
    assert.equal(
      (withAfter as unknown as { lastErrorType?: string })?.lastErrorType,
      "server_error"
    );

    await resetStorage();
    const withoutId = await createConnection();
    const resWithoutId = await driveExhaustionViaBare500(
      withoutId,
      auth.buildExhaustionOptions(null)
    );
    assert.equal(resWithoutId.shouldFallback, true);
  });

  await t.test("handleNoCredentials emits structured id meta", async () => {
    const helpersSource = readSource("../../src/sse/handlers/chatHelpers.ts");
    assert.match(
      helpersSource,
      /\.\.\.\(correlationId \? \{ correlationId \} : \{\}\)/,
      "chatHelpers.ts:771 must spread correlationId into the log meta only when truthy"
    );

    // Exhaustion with an id returns the upstream error; without an id the
    // response shape is unchanged.
    const withId = chatHelpers.handleNoCredentials(
      null,
      "conn-1",
      "opencode-test",
      "test-model",
      "upstream 500",
      500,
      undefined,
      false,
      null,
      "trace-123"
    );
    assert.equal(withId.status, 500);
    const withBody = (await withId.json()) as { error?: { message?: string } };
    assert.equal(withBody?.error?.message, "upstream 500");

    const withoutId = chatHelpers.handleNoCredentials(
      null,
      "conn-1",
      "opencode-test",
      "test-model",
      "upstream 500",
      500
    );
    assert.equal(withoutId.status, 500);
    const withoutBody = (await withoutId.json()) as { error?: { message?: string } };
    assert.equal(withoutBody?.error?.message, "upstream 500");
  });
});
