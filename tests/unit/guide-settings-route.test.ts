import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import { parse } from "jsonc-parser";
const guideSettingsRoute =
  await import("../../src/app/api/cli-tools/guide-settings/[toolId]/route.ts");

const DUMMY_HOME = path.join(os.tmpdir(), "omniroute-qwen-test-" + Date.now());
const QWEN_CONFIG_PATH = path.join(DUMMY_HOME, ".qwen", "settings.json");
const QWEN_ENV_PATH = path.join(DUMMY_HOME, ".qwen", ".env");
const OPENCODE_CONFIG_PATH = path.join(DUMMY_HOME, ".config", "opencode", "opencode.json");
const originalXDG = process.env.XDG_CONFIG_HOME;
const originalJwtSecret = process.env.JWT_SECRET;

async function createAuthCookie() {
  process.env.JWT_SECRET = "test-cli-tools-secret";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: "test-user" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return `auth_token=${token}`;
}

type QwenProviderEntry = {
  id?: string;
  baseUrl?: string;
  envKey?: string;
  generationConfig?: {
    contextWindowSize?: number;
  };
};

async function buildRequest(body: any) {
  const cookie = await createAuthCookie();
  return new Request("http://localhost/api/cli-tools/guide-settings/qwen", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  // Mock os.homedir to return our dummy path
  os.homedir = () => DUMMY_HOME;
  // Force XDG_CONFIG_HOME so resolveOpencodeConfigPath resolves to our dummy dir
  // (CI runners often have XDG_CONFIG_HOME set, causing path mismatch)
  process.env.XDG_CONFIG_HOME = path.join(DUMMY_HOME, ".config");
  await fs.mkdir(path.dirname(QWEN_CONFIG_PATH), { recursive: true }).catch(() => {});
});

test.afterEach(async () => {
  await fs.rm(DUMMY_HOME, { recursive: true, force: true }).catch(() => {});
  if (originalXDG === undefined) delete process.env.XDG_CONFIG_HOME;
  else process.env.XDG_CONFIG_HOME = originalXDG;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
});

test("guide-settings POST creates new qwen settings.json if it doesn't exist", async () => {
  const req = await buildRequest({
    baseUrl: "http://my-omni",
    apiKey: "sk-123",
    model: "qwen-max",
  });
  const response = (await guideSettingsRoute.POST(req, { params: { toolId: "qwen" } })) as Response;
  const data = (await response.json()) as any;

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

  const req = await buildRequest({ baseUrl: "http://my-omni", apiKey: "sk-123", model: "auto" });
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

test("guide-settings POST writes OpenCode config with current schema and multi-model selection", async () => {
  await fs.mkdir(path.dirname(OPENCODE_CONFIG_PATH), { recursive: true });
  await fs.writeFile(
    OPENCODE_CONFIG_PATH,
    JSON.stringify({
      $schema: "https://opencode.ai/config.json",
      provider: {
        custom: {
          name: "Custom Provider",
        },
      },
    }),
    "utf-8"
  );

  const cookie = await createAuthCookie();
  const req = new Request("http://localhost/api/cli-tools/guide-settings/opencode", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({
      baseUrl: "http://my-omni/v1",
      apiKey: "sk-123",
      models: ["cc/claude-sonnet-4-20250514", "gg/gemini-2.5-pro"],
    }),
  });

  const response = (await guideSettingsRoute.POST(req, {
    params: { toolId: "opencode" },
  })) as Response;
  assert.equal(response.status, 200);

  const content = parse(await fs.readFile(OPENCODE_CONFIG_PATH, "utf-8"));
  assert.equal(content.$schema, "https://opencode.ai/config.json");
  assert.ok(content.provider.custom);
  assert.equal(content.provider.omniroute.npm, "@ai-sdk/openai-compatible");
  assert.equal(content.provider.omniroute.options.baseURL, "http://my-omni/v1");
  assert.equal(content.provider.omniroute.options.apiKey, "sk-123");
  assert.deepEqual(Object.keys(content.provider.omniroute.models), [
    "cc/claude-sonnet-4-20250514",
    "gg/gemini-2.5-pro",
  ]);
  assert.equal(content.providers, undefined);
});

test("guide-settings POST preserves existing OpenCode config fields while only updating provider.omniroute", async () => {
  await fs.mkdir(path.dirname(OPENCODE_CONFIG_PATH), { recursive: true });
  await fs.writeFile(
    OPENCODE_CONFIG_PATH,
    `{
  // existing config should survive
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "custom": {
      "name": "Custom Provider"
    },
    "omniroute": {
      "npm": "old-package",
      "name": "Old OmniRoute",
      "options": {
        "baseURL": "http://old-host/v1",
        "apiKey": "old-key"
      },
      "models": {
        "old/model": { "name": "Old Model" }
      }
    }
  },
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
    }
  }
}`,
    "utf-8"
  );

  const cookie = await createAuthCookie();
  const req = new Request("http://localhost/api/cli-tools/guide-settings/opencode", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({
      baseUrl: "http://my-omni/v1",
      apiKey: "sk-123",
      models: ["cx/gpt-5.4", "opencode-go/kimi-k2.6"],
      modelLabels: {
        "cx/gpt-5.4": "GPT-5.4",
        "opencode-go/kimi-k2.6": "Kimi K2.6",
      },
    }),
  });

  const response = (await guideSettingsRoute.POST(req, {
    params: { toolId: "opencode" },
  })) as Response;
  assert.equal(response.status, 200);

  const content = parse(await fs.readFile(OPENCODE_CONFIG_PATH, "utf-8"));
  assert.equal(content.$schema, "https://opencode.ai/config.json");
  assert.deepEqual(content.mcpServers, {
    filesystem: {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
    },
  });
  assert.deepEqual(content.provider.custom, {
    name: "Custom Provider",
  });
  assert.equal(content.provider.omniroute.npm, "@ai-sdk/openai-compatible");
  assert.equal(content.provider.omniroute.options.baseURL, "http://my-omni/v1");
  assert.equal(content.provider.omniroute.options.apiKey, "sk-123");
  assert.deepEqual(content.provider.omniroute.models, {
    "cx/gpt-5.4": { name: "GPT-5.4" },
    "opencode-go/kimi-k2.6": { name: "Kimi K2.6" },
  });
});
