import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15634-"));
process.env.DATA_DIR = DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "15634-test-secret";

const { isModelLocked } = await import("../../open-sse/services/accountFallback.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DIR, { recursive: true, force: true });
});

// #15634: Copilot answers 400 model_not_supported for a model its own /models listed.
// A DIRECT (non-combo) request must learn that for this connection, so the model is
// not retried on every request (combos already lock it for 1h in executeTargetAttempt).
test("#15634: direct github 400 model_not_supported locks the model for that connection", async () => {
  const conn = (await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    accessToken: "gho_x",
    isActive: true,
    testStatus: "active",
  })) as Record<string, unknown>;
  const connId = conn.id as string;

  const result = await auth.markAccountUnavailable(
    connId,
    400,
    '{"message":"The requested model is not supported.","code":"model_not_supported","param":"model","type":"invalid_request_error"}',
    "github",
    "claude-sonnet-5"
  );
  assert.equal((result as { reason?: string }).reason, "provider_model_unsupported");
  assert.equal(
    isModelLocked("github", connId, "claude-sonnet-5"),
    true,
    "model stays unlocked: every direct request re-hits upstream and fails again"
  );
});
