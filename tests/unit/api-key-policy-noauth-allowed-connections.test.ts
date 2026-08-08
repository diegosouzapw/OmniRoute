/**
 * #9057 — API key `allowedConnections` MUST gate no-auth synthetic credentials
 *
 * TDD regression test: an API key pinned via `allowedConnections` to a specific
 * connection must NOT receive synthetic no-auth credentials for free providers
 * (e.g. felo-chat).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9057-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "9057-test-secret";

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { isModelAllowedForKey } = await import("../../src/lib/db/apiKeys.ts");

const RESTRICTED_CONNECTION_UUID = "00000000-0000-4000-8000-000000000001";

test.after(() => {
  coreDb.resetDbInstance();
  try { fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true }); } catch {}
});

test("#9057 LAYER1: restricted key gets NO synthetic credentials for noauth provider felo", async () => {
  // LAYER1: getProviderCredentials() with explicit allowedConnections
  // must NOT return synthetic noauth credentials because the synthetic
  // "noauth" connection is never in an explicit allowed-connections list.
  const creds = await getProviderCredentials(
    "felo",
    null,
    [RESTRICTED_CONNECTION_UUID], // allowedConnections restricts to a real UUID
    "felo-chat"
  );
  assert.equal(creds, null,
    "noauth provider felo must not leak synthetic credentials for a connection-restricted key");
});

test("#9057 LAYER1: unrestricted key still gets synthetic credentials for felo", async () => {
  const creds = await getProviderCredentials(
    "felo",
    null,
    null,   // allowedConnections=null means unrestricted
    "felo-chat"
  );
  assert(creds, "unrestricted key must receive synthetic credentials for felo");
  assert.equal(
    (creds as Record<string, unknown>)?.connectionId,
    "noauth",
    "synthetic noauth connection"
  );
});

test("#9057 LAYER2: isModelAllowedForKey rejects felo-chat for disableNonPublicModels key", async () => {
  // Create a key with disableNonPublicModels=true
  const created = await apiKeysDb.createApiKey("dnp-9057", "machine-dnp");
  assert(created, "key must be created");
  const key = created.key;
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    disableNonPublicModels: true,
  });

  const allowed = await isModelAllowedForKey(key, "felo-chat");
  assert.equal(allowed, false, "disableNonPublicModels key must reject felo-chat");
});
