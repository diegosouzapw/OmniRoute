/**
 * Regression for #11803: embedded CLIProxyAPI health and model-discovery credentials.
 *
 * The fake service deliberately separates its public liveness endpoint from
 * its authenticated data plane:
 *   - GET /healthz is public.
 *   - GET /v1/models accepts only the operator-configured dedicated API key.
 *
 * CLIProxyAPI's MANAGEMENT_PASSWORD is a control-plane credential and must
 * never be reused for /v1/models.
 */

import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cliproxy-auth-"));
const DEDICATED_API_KEY = "cpa-dedicated-data-plane-key";

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.STORAGE_ENCRYPTION_KEY = "cliproxy-health-model-auth-test-key";
process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE = "1";

const seenPaths: string[] = [];
const modelAuthorizationHeaders: Array<string | null> = [];

const fakeCliproxy = http.createServer((req, res) => {
  const requestPath = req.url ?? "/";
  seenPaths.push(requestPath);

  if (requestPath === "/healthz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (requestPath === "/v1/models") {
    const authorization = req.headers.authorization ?? null;
    modelAuthorizationHeaders.push(authorization);
    if (authorization !== `Bearer ${DEDICATED_API_KEY}`) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "invalid API key" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: [{ id: "fake-cpa-model", object: "model" }] }));
    return;
  }

  res.writeHead(404).end();
});

await new Promise<void>((resolve, reject) => {
  fakeCliproxy.once("error", reject);
  fakeCliproxy.listen(0, "127.0.0.1", () => resolve());
});

const address = fakeCliproxy.address();
assert.ok(address && typeof address === "object");
process.env.CLIPROXYAPI_PORT = String(address.port);

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const versionManager = await import("../../../src/lib/db/versionManager.ts");
const { decrypt } = await import("../../../src/lib/db/encryption.ts");
const { bootstrapEmbeddedServices } = await import("../../../src/lib/services/bootstrap.ts");
const { getSupervisor, unregisterSupervisor } =
  await import("../../../src/lib/services/registry.ts");
const { getOrInitSupervisor } = await import("../../../src/app/api/services/cliproxy/_lib.ts");
const { getServiceModels } = await import("../../../src/lib/db/serviceModels.ts");
const { stopServiceModelSync } = await import("../../../src/lib/services/modelSync.ts");

await versionManager.upsertVersionManagerTool({
  tool: "cliproxy",
  installedVersion: "test",
  status: "stopped",
  port: address.port,
});
await settingsDb.updateSettings({ cliproxyapi_api_key: DEDICATED_API_KEY });

after(async () => {
  stopServiceModelSync("cliproxy");
  const supervisor = getSupervisor("cliproxy");
  if (supervisor) await supervisor.stop();
  unregisterSupervisor("cliproxy");
  await new Promise<void>((resolve) => fakeCliproxy.close(() => resolve()));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("embedded CLIProxyAPI uses public health and dedicated model credentials", async () => {
  await bootstrapEmbeddedServices();

  const supervisor = getSupervisor("cliproxy");
  assert.ok(supervisor, "bootstrap must register the installed CLIProxyAPI service");

  const serviceRow = await versionManager.getServiceRow("cliproxy");
  const managementKey = decrypt(serviceRow?.apiKey);
  assert.ok(managementKey, "bootstrap must create the separate management credential");
  assert.notEqual(
    managementKey,
    DEDICATED_API_KEY,
    "the management and data-plane credentials must remain distinct"
  );

  const status = await supervisor.start();
  assert.equal(status.state, "running", "the public /healthz probe must accept the fake service");

  const deadline = Date.now() + 3_000;
  while (modelAuthorizationHeaders.length === 0 && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 25));
  }

  assert.ok(seenPaths.includes("/healthz"), "embedded health checks must use public /healthz");
  assert.deepEqual(
    modelAuthorizationHeaders,
    [`Bearer ${DEDICATED_API_KEY}`],
    "/v1/models must receive only settings.cliproxyapi_api_key"
  );
  assert.ok(
    getServiceModels("cliproxy").some((model) => model.id === "cliproxy/fake-cpa-model"),
    "the authenticated discovery response must be persisted"
  );

  stopServiceModelSync("cliproxy");
  await supervisor.stop();
  unregisterSupervisor("cliproxy");
  seenPaths.length = 0;
  modelAuthorizationHeaders.length = 0;

  const onDemandSupervisor = await getOrInitSupervisor();
  const onDemandStatus = await onDemandSupervisor.start();
  assert.equal(
    onDemandStatus.state,
    "running",
    "the on-demand route supervisor must also use public /healthz"
  );
  assert.ok(seenPaths.includes("/healthz"));
  assert.equal(
    modelAuthorizationHeaders.length,
    0,
    "the on-demand health probe must not call authenticated /v1/models"
  );
});
