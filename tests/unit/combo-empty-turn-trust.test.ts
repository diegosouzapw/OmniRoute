/**
 * #15586 — the combo empty-turn exemption is granted only when the connection that
 * actually served the response is a first-party Anthropic one. Provider IDs alone are
 * not enough: an `anthropic` connection may point at a custom/third-party base URL.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-empty-turn-trust-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { isTrustedEmptyTurn } = await import("../../open-sse/services/combo/emptyTurnTrust.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

function responseFrom(connectionId?: string): Response {
  const headers = new Headers({ "content-type": "text/event-stream" });
  if (connectionId) headers.set("X-OmniRoute-Selected-Connection-Id", connectionId);
  return new Response("", { status: 200, headers });
}

async function createConnection(provider: string, baseUrl?: string): Promise<string> {
  const connection = (await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${baseUrl ?? "default"}`,
    apiKey: `sk-test-${crypto.randomUUID()}`,
    ...(baseUrl ? { providerSpecificData: { baseUrl } } : {}),
  })) as { id: string };
  return connection.id;
}

test("official anthropic connection (default base URL) is trusted", async () => {
  const id = await createConnection("anthropic");
  assert.equal(await isTrustedEmptyTurn("anthropic", responseFrom(id)), true);
});

test("anthropic connection explicitly pointed at api.anthropic.com is trusted", async () => {
  const id = await createConnection("anthropic", "https://api.anthropic.com/v1");
  assert.equal(await isTrustedEmptyTurn("anthropic", responseFrom(id)), true);
});

test("anthropic connection with a custom third-party base URL is not trusted", async () => {
  const id = await createConnection("anthropic", "https://gateway.example.com/v1");
  assert.equal(await isTrustedEmptyTurn("anthropic", responseFrom(id)), false);
});

test("claude connection uses the same selected-connection host check", async () => {
  const id = await createConnection("claude");
  assert.equal(await isTrustedEmptyTurn("claude", responseFrom(id)), true);
});

test("fallback pinned connection ID is used when the header is absent", async () => {
  const id = await createConnection("anthropic");
  assert.equal(await isTrustedEmptyTurn("anthropic", responseFrom(), id), true);
});

test("unknown selected connection fails closed", async () => {
  assert.equal(await isTrustedEmptyTurn("anthropic", responseFrom()), false);
  assert.equal(await isTrustedEmptyTurn("anthropic", responseFrom("missing-connection")), false);
});

test("connection belonging to a different provider is not trusted", async () => {
  const id = await createConnection("anthropic");
  assert.equal(await isTrustedEmptyTurn("claude", responseFrom(id)), false);
});

test("third-party provider IDs are never trusted", async () => {
  const id = await createConnection("anthropic");
  assert.equal(await isTrustedEmptyTurn("anthropic-compatible-gateway", responseFrom(id)), false);
});

test("unresolved alias provider is trusted only via the selected official connection header", async () => {
  const id = await createConnection("anthropic");
  assert.equal(await isTrustedEmptyTurn(null, responseFrom(id)), true);
  // A planned (fallback) connection ID is not proof of what actually served the alias.
  assert.equal(await isTrustedEmptyTurn(null, responseFrom(), id), false);
});

test("unresolved alias provider stays untrusted for third-party selected connections", async () => {
  const custom = await createConnection("anthropic", "https://gateway.example.com/v1");
  assert.equal(await isTrustedEmptyTurn(null, responseFrom(custom)), false);
  const other = await createConnection("openai");
  assert.equal(await isTrustedEmptyTurn(null, responseFrom(other)), false);
  assert.equal(await isTrustedEmptyTurn(null, responseFrom("missing-connection")), false);
});
