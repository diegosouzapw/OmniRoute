import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-ws-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-ws-policy-test-secret";
process.env.OMNIROUTE_WS_BRIDGE_SECRET = "bridge-secret";

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { POST } = await import("../../src/app/api/internal/codex-responses-ws/route.ts");

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Codex Responses WS prepare enforces API key model/combo policy for query-token auth", async () => {
  const created = await apiKeysDb.createApiKey("Combo Only", "machine-codex-ws-policy");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedModels: ["combo/model-1.0"],
    allowedCombos: ["combo/model-1.0"],
  });

  const response = await POST(
    new Request("http://omniroute.local/api/internal/codex-responses-ws", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-omniroute-ws-bridge-secret": "bridge-secret",
      },
      body: JSON.stringify({
        action: "prepare",
        requestUrl: `/v1/responses?api_key=${encodeURIComponent(created.key)}`,
        headers: {},
        response: {
          model: "gpt-5.5",
          input: [{ role: "user", content: "hello" }],
        },
      }),
    })
  );

  const body = (await response.json()) as { error?: { message?: string } };

  assert.equal(response.status, 403);
  assert.match(body.error?.message || "", /gpt-5\.5/);
  assert.match(body.error?.message || "", /not allowed for this API key/);
});
