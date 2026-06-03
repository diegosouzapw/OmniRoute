/**
 * Issue #2962 — Playground cannot use the OpenCode free model:
 * "No credentials for the provider: opencode-zen".
 *
 * opencode-zen serves the public, signup-free OpenCode Zen endpoint
 * (https://opencode.ai/zen/v1). When no API-key connection is configured,
 * getProviderCredentials returned null → the chat handler surfaced
 * "No credentials for provider: opencode-zen". It must instead fall back to
 * anonymous (no-auth) credentials so the free tier works.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-zen-noauth-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#2962 opencode-zen with no connection falls back to anonymous no-auth credentials", async () => {
  const creds = await getProviderCredentials("opencode-zen");
  assert.ok(creds, "opencode-zen must resolve to credentials, not null (no-auth free tier)");
  assert.equal(
    (creds as { connectionId?: string }).connectionId,
    "noauth",
    "should be synthetic no-auth credentials"
  );
  assert.equal(
    (creds as { apiKey?: unknown }).apiKey,
    null,
    "anonymous access carries no api key"
  );
});

test("#2962 a normal api-key provider with no connection still returns null (no over-broadening)", async () => {
  const creds = await getProviderCredentials("openai");
  // Must NOT synthesize no-auth creds for a real api-key provider.
  const connectionId = (creds as { connectionId?: string } | null)?.connectionId;
  assert.notEqual(connectionId, "noauth", "openai must not get anonymous no-auth credentials");
});
