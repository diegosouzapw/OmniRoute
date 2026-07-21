import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import { parse } from "jsonc-parser";
import * as yaml from "js-yaml";
const guideSettingsRoute =
  await import("../../src/app/api/cli-tools/guide-settings/[toolId]/route.ts");

const DUMMY_HOME = path.join(os.tmpdir(), "omniroute-guide-settings-test-" + Date.now());
const OPENCODE_CONFIG_PATH = path.join(DUMMY_HOME, ".config", "opencode", "opencode.json");
// cliRuntime.ts hermes entry maps to .config/hermes/config.json (not .hermes/config.yaml)
const HERMES_CONFIG_PATH = path.join(DUMMY_HOME, ".config", "hermes", "config.json");
const originalXDG = process.env.XDG_CONFIG_HOME;
const originalAppData = process.env.APPDATA;
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

type HermesConfig = {
  model?: { default?: string; provider?: string; base_url?: string };
  providers?: { omniroute?: { base_url?: string; api_key?: string } };
};

async function buildRequest(toolId: string, body: unknown) {
  const cookie = await createAuthCookie();
  return new Request(`http://localhost/api/cli-tools/guide-settings/${toolId}`, {
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
  process.env.APPDATA = path.join(DUMMY_HOME, ".config");
  process.env.API_KEY_SECRET = "test-secret";
});

test.afterEach(async () => {
  await fs.rm(DUMMY_HOME, { recursive: true, force: true }).catch(() => {});
  if (originalXDG === undefined) delete process.env.XDG_CONFIG_HOME;
  else process.env.XDG_CONFIG_HOME = originalXDG;
  if (originalAppData === undefined) delete process.env.APPDATA;
  else process.env.APPDATA = originalAppData;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
});

test("guide-settings POST creates new hermes config.yaml if it doesn't exist", async () => {
  const req = await buildRequest("hermes", {
    baseUrl: "http://my-omni",
    apiKey: "sk-hermes",
    model: "gpt-5.4-mini",
  });
  const response = (await guideSettingsRoute.POST(req, {
    params: { toolId: "hermes" },
  })) as Response;
  const data = (await response.json()) as { success?: boolean };

  assert.equal(response.status, 200, "Response should be OK");
  assert.equal(data.success, true);

  const content = yaml.load(await fs.readFile(HERMES_CONFIG_PATH, "utf-8")) as HermesConfig;
  assert.equal(content.model?.default, "gpt-5.4-mini");
  assert.equal(content.model?.provider, "omniroute");
  assert.equal(content.model?.base_url, "http://my-omni/v1");
  assert.equal(content.providers?.omniroute?.base_url, "http://my-omni/v1");
  assert.ok(String(content.providers?.omniroute?.api_key || "").startsWith("sk-"));
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
  assert.ok(content.provider.omniroute.options.apiKey.startsWith("sk-"));
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
      models: ["cx/gpt-5.6-sol", "opencode-go/kimi-k2.6"],
      modelLabels: {
        "cx/gpt-5.6-sol": "GPT-5.6 Sol",
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
  assert.ok(content.provider.omniroute.options.apiKey.startsWith("sk-"));
  assert.deepEqual(content.provider.omniroute.models, {
    "cx/gpt-5.6-sol": { name: "GPT-5.6 Sol" },
    "opencode-go/kimi-k2.6": { name: "Kimi K2.6" },
  });
});
