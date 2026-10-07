import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-models-test-all-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_DISABLE_AUTH = "1";
delete process.env.REQUIRE_API_KEY;

const core = await import("@/lib/db/core");
const { createProviderConnection } = await import("@/lib/db/providers");
const route = await import("@/app/api/models/test-all/route");

before(() => {
  core.resetDbInstance();
  core.getDbInstance();
});

after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("test-all returns 409 when provider has no active connections", async () => {
  await createProviderConnection({
    provider: "inactive-provider",
    authType: "apikey",
    name: "inactive-provider-connection",
    apiKey: "test-inactive-provider-key",
    isActive: false,
  });

  const response = await route.POST(
    new Request("http://localhost/api/models/test-all", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        providerId: "inactive-provider",
        modelIds: ["test-model"],
      }),
    })
  );

  assert.equal(response.status, 409);
  assert.deepEqual(await response.json(), {
    error: { message: "Provider inactive-provider has no active connections" },
  });
});
