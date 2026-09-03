/**
 * #9057 — API key `allowedConnections` MUST gate no-auth synthetic credentials
 *
 * TDD regression test: an API key pinned via `allowedConnections` to a specific
 * connection must NOT receive synthetic no-auth credentials for free providers
 * (e.g. OpenCode Free).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9057-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "9057-test-secret";

const coreDb = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const { getProviderCredentials } = await import("../../../src/sse/services/auth.ts");
const { isModelAllowedForKey } = await import("../../../src/lib/db/apiKeys.ts");

const RESTRICTED_CONNECTION_UUID = "00000000-0000-4000-8000-000000000001";

test.after(() => {
  coreDb.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("#9057 LAYER1: restricted key gets NO synthetic credentials for OpenCode Free", async () => {
  // LAYER1: getProviderCredentials() with explicit allowedConnections
  // must NOT return synthetic noauth credentials because the synthetic
  // "noauth" connection is never in an explicit allowed-connections list.
  const creds = await getProviderCredentials(
    "opencode",
    null,
    [RESTRICTED_CONNECTION_UUID], // allowedConnections restricts to a real UUID
    "big-pickle"
  );
  assert.equal(
    creds,
    null,
    "OpenCode Free must not leak synthetic credentials for a connection-restricted key"
  );
});

test("#9057 LAYER1: unrestricted key still gets synthetic credentials for OpenCode Free", async () => {
  const creds = await getProviderCredentials(
    "opencode",
    null,
    null, // allowedConnections=null means unrestricted
    "big-pickle"
  );
  assert(creds, "unrestricted key must receive synthetic credentials for OpenCode Free");
  assert.equal(
    (creds as Record<string, unknown>)?.connectionId,
    "noauth",
    "synthetic noauth connection"
  );
});

test("#9057 LAYER2: isModelAllowedForKey rejects keyless model for disableNonPublicModels key", async () => {
  // Create a key with disableNonPublicModels=true
  const created = await apiKeysDb.createApiKey("dnp-9057", "machine-dnp");
  assert(created, "key must be created");
  const key = created.key;
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    disableNonPublicModels: true,
  });

  const allowed = await isModelAllowedForKey(key, "big-pickle");
  assert.equal(allowed, false, "disableNonPublicModels key must reject keyless models");
});
