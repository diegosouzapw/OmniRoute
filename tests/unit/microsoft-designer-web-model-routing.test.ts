import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-designer-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");
const { resolveImageRouteModel } = await import("../../src/lib/images/imageRouteModel.ts");
const { RESERVED_PROVIDER_PREFIXES, isReservedProviderPrefix } =
  await import("../../src/shared/constants/reservedProviderPrefixes.ts");
const { createProviderNodeSchema, updateProviderNodeSchema } =
  await import("../../src/shared/validation/schemas.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createCompatibleNode(id: string, prefix: string): Promise<void> {
  await providersDb.createProviderNode({
    id,
    type: "openai-compatible",
    name: `${prefix}-test-node`,
    prefix,
    apiType: "chat",
    baseUrl: "https://compatible.invalid/v1",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
}

function assertRetiredError(error: unknown): boolean {
  assert.ok(error instanceof Error);
  assert.equal((error as Error & { status?: number }).status, 410);
  assert.equal(error.message, "Provider has been retired from OmniRoute runtime.");
  return true;
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("retired Designer IDs remain reserved after leaving the live provider registry", () => {
  for (const providerId of [
    "microsoft-designer-web",
    "msdesigner",
    "  MICROSOFT-DESIGNER-WEB\t",
    "\nMsDesigner  ",
  ]) {
    assert.equal(isReservedProviderPrefix(providerId), true, providerId);
  }
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("microsoft-designer-web"), true);
  assert.equal(RESERVED_PROVIDER_PREFIXES.has("msdesigner"), true);
  assert.equal(isReservedProviderPrefix("microsoft-designer-web-preview"), false);
});

test("provider-node schemas reject exact retired prefixes but preserve similar IDs", () => {
  for (const prefix of ["microsoft-designer-web", "MSDESIGNER"]) {
    const create = createProviderNodeSchema.safeParse({
      name: "Retired collision",
      prefix,
      apiType: "chat",
      baseUrl: "https://compatible.invalid/v1",
    });
    const update = updateProviderNodeSchema.safeParse({
      name: "Retired collision",
      prefix,
      baseUrl: "https://compatible.invalid/v1",
    });
    assert.equal(create.success, false, prefix);
    assert.equal(update.success, false, prefix);
  }

  assert.equal(
    createProviderNodeSchema.safeParse({
      name: "Similar control",
      prefix: "microsoft-designer-web-preview",
      apiType: "chat",
      baseUrl: "https://compatible.invalid/v1",
    }).success,
    true
  );
});

test("compatible-node remapping cannot erase a retired Designer prefix", async () => {
  await createCompatibleNode("openai-compatible-chat-designer-retired", "microsoft-designer-web");

  await assert.rejects(() => getModelInfo("microsoft-designer-web/gpt-4o"), assertRetiredError);

  const resolved = await resolveModelOrError("microsoft-designer-web/gpt-4o", {
    messages: [{ role: "user", content: "test" }],
  });
  assert.ok(resolved.error instanceof Response);
  assert.equal(resolved.error.status, 410);
  assert.deepEqual(await resolved.error.json(), {
    error: {
      message: "Provider has been retired from OmniRoute runtime.",
      type: "invalid_request_error",
      code: "model_shutdown",
    },
  });
});

test("stripModelPrefix cannot erase the retired Designer alias", async () => {
  await settingsDb.updateSettings({ stripModelPrefix: true });

  await assert.rejects(() => getModelInfo("  MSDESIGNER  /gpt-4o"), assertRetiredError);
});

test("image prefix resolution refuses retired nodes but preserves a similar control", async () => {
  await createCompatibleNode("openai-compatible-images-designer-retired", "msdesigner");
  await createCompatibleNode(
    "openai-compatible-images-designer-preview",
    "microsoft-designer-web-preview"
  );

  await assert.rejects(() => resolveImageRouteModel("msdesigner/dall-e-3"), assertRetiredError);
  assert.equal(
    await resolveImageRouteModel("microsoft-designer-web-preview/control-image"),
    "openai-compatible-images-designer-preview/control-image"
  );
});
