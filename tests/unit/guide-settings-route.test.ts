import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
const guideSettingsRoute =
  await import("../../src/app/api/cli-tools/guide-settings/[toolId]/route.ts");

const DUMMY_HOME = path.join(os.tmpdir(), "omniroute-qwen-test-" + Date.now());
const QWEN_CONFIG_PATH = path.join(DUMMY_HOME, ".qwen", "settings.json");
const QWEN_ENV_PATH = path.join(DUMMY_HOME, ".qwen", ".env");

type QwenProviderEntry = {
  id?: string;
  baseUrl?: string;
  envKey?: string;
  generationConfig?: {
    contextWindowSize?: number;
  };
};

function buildRequest(body: any) {
  return new Request("http://localhost/api/cli-tools/guide-settings/qwen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  // Mock os.homedir to return our dummy path
  os.homedir = () => DUMMY_HOME;
  await fs.mkdir(path.dirname(QWEN_CONFIG_PATH), { recursive: true }).catch(() => {});
});

test.afterEach(async () => {
  await fs.rm(DUMMY_HOME, { recursive: true, force: true }).catch(() => {});
});

test("guide-settings POST creates new qwen settings.json if it doesn't exist", async () => {
  const req = buildRequest({ baseUrl: "http://my-omni", apiKey: "sk-123", model: "qwen-max" });
  const response = (await guideSettingsRoute.POST(req, { params: { toolId: "qwen" } })) as Response;
  const data = await response.json();

  assert.equal(response.status, 200, "Response should be OK");
  assert.equal(data.success, true);

  const content = JSON.parse(await fs.readFile(QWEN_CONFIG_PATH, "utf-8"));
  assert.ok(content.modelProviders.openai);

  const omniProvider = content.modelProviders.openai.find(
    (p: QwenProviderEntry) => p.baseUrl === "http://my-omni"
  );
  assert.ok(omniProvider);
  assert.equal(omniProvider.id, "qwen-max");
  assert.equal(omniProvider.baseUrl, "http://my-omni");
  assert.equal(omniProvider.envKey, "OPENAI_API_KEY");
  assert.equal(omniProvider.generationConfig?.contextWindowSize, 200000);

  const envContent = await fs.readFile(QWEN_ENV_PATH, "utf-8");
  assert.match(envContent, /^OPENAI_API_KEY=sk-123$/m);
  assert.match(envContent, /^ANTHROPIC_API_KEY=sk-123$/m);
  assert.match(envContent, /^GEMINI_API_KEY=sk-123$/m);
});

test("guide-settings POST merges into existing qwen settings.json", async () => {
  await fs.mkdir(path.dirname(QWEN_CONFIG_PATH), { recursive: true });
  await fs.writeFile(
    QWEN_CONFIG_PATH,
    JSON.stringify({
      modelProviders: {
        openai: [{ id: "other", baseUrl: "https://other" }],
      },
    }),
    "utf-8"
  );

  const req = buildRequest({ baseUrl: "http://my-omni", apiKey: "sk-123", model: "auto" });
  const response = (await guideSettingsRoute.POST(req, { params: { toolId: "qwen" } })) as Response;
  assert.equal(response.status, 200);

  const content = JSON.parse(await fs.readFile(QWEN_CONFIG_PATH, "utf-8"));
  assert.equal(content.modelProviders.openai.length, 2);

  const otherProvider = content.modelProviders.openai.find(
    (p: QwenProviderEntry) => p.id === "other"
  );
  assert.ok(otherProvider);
  assert.equal(otherProvider.baseUrl, "https://other");

  const omniProvider = content.modelProviders.openai.find(
    (p: QwenProviderEntry) => p.baseUrl === "http://my-omni"
  );
  assert.ok(omniProvider);
  assert.equal(omniProvider.id, "auto");
  assert.equal(omniProvider.envKey, "OPENAI_API_KEY");
  assert.equal(omniProvider.generationConfig?.contextWindowSize, 200000);

  const envContent = await fs.readFile(QWEN_ENV_PATH, "utf-8");
  assert.match(envContent, /^OPENAI_API_KEY=sk-123$/m);
  assert.match(envContent, /^ANTHROPIC_API_KEY=sk-123$/m);
  assert.match(envContent, /^GEMINI_API_KEY=sk-123$/m);
});
