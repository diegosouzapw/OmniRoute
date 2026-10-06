import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-visionbridge-cred-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const { hasUsableCredentialsForModel } =
  await import("../../../src/lib/guardrails/visionBridgeCredentials.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("issue #10702: hasUsableCredentialsForModel resolves alias-prefixed model to the raw provider id (command-code / alias cmd)", async () => {
  await providersDb.createProviderConnection({
    provider: "command-code",
    authType: "apikey",
    apiKey: "sk-test-command-code-key",
    isActive: true,
  });

  const result = await hasUsableCredentialsForModel("cmd/some-vision-model");
  assert.equal(
    result,
    true,
    "the credentialed command-code connection must be found via its public alias 'cmd'"
  );
});

test("issue #10702: hasUsableCredentialsForModel resolves alias-prefixed model to the raw provider id (opencode / alias oc)", async () => {
  await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "apikey",
    apiKey: "sk-test-opencode-key",
    isActive: true,
  });

  const result = await hasUsableCredentialsForModel("oc/some-vision-model");
  assert.equal(
    result,
    true,
    "the credentialed opencode connection must be found via its public alias 'oc'"
  );
});
