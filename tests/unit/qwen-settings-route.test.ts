import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_HOME = path.join(os.tmpdir(), `omniroute-qwen-route-${process.pid}-${Date.now()}`);
const SETTINGS_PATH = path.join(TEST_HOME, ".qwen", "settings.json");
const ENV_PATH = path.join(TEST_HOME, ".qwen", ".env");
const originalHome = os.homedir;
const originalJwtSecret = process.env.JWT_SECRET;
const originalWriteFlag = process.env.CLI_ALLOW_CONFIG_WRITES;

os.homedir = () => TEST_HOME;
process.env.CLI_ALLOW_CONFIG_WRITES = "true";

const route = await import("../../src/app/api/cli-tools/qwen-settings/route.ts");

const authCookie = async (): Promise<string> => {
  process.env.JWT_SECRET = "qwen-settings-route-test-secret";
  const token = await new SignJWT({ sub: "qwen-route-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${token}`;
};

const request = async (method: string, body?: unknown): Promise<Request> =>
  new Request("http://localhost/api/cli-tools/qwen-settings", {
    method,
    headers: {
      cookie: await authCookie(),
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });

test.beforeEach(async () => {
  await fs.rm(TEST_HOME, { recursive: true, force: true });
  await fs.mkdir(path.dirname(SETTINGS_PATH), { recursive: true });
});

test.after(async () => {
  os.homedir = originalHome;
  await fs.rm(TEST_HOME, { recursive: true, force: true });
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  if (originalWriteFlag === undefined) delete process.env.CLI_ALLOW_CONFIG_WRITES;
  else process.env.CLI_ALLOW_CONFIG_WRITES = originalWriteFlag;
});

test("POST writes the shared V4 contract and preserves unrelated credentials", async () => {
  await fs.writeFile(
    SETTINGS_PATH,
    JSON.stringify({
      ui: { theme: "dark" },
      modelProviders: {
        openai: [
          {
            id: "personal-model",
            envKey: "OPENAI_API_KEY",
            baseUrl: "https://api.openai.com/v1",
          },
        ],
      },
    })
  );
  await fs.writeFile(ENV_PATH, "OPENAI_API_KEY=keep-openai\nGEMINI_API_KEY=keep-gemini\n");

  const response = await route.POST(
    await request("POST", {
      baseUrl: "http://localhost:20128",
      apiKey: "sk-route-secret",
      model: "qwen/qwen3.8-max-preview",
    })
  );
  assert.equal(response.status, 200);

  const settings = JSON.parse(await fs.readFile(SETTINGS_PATH, "utf8"));
  assert.equal(settings.ui.theme, "dark");
  assert.equal(settings.modelProviders.openai.length, 2);
  assert.deepEqual(settings.modelProviders.openai[1], {
    id: "qwen/qwen3.8-max-preview",
    name: "qwen/qwen3.8-max-preview (OmniRoute)",
    envKey: "OMNIROUTE_API_KEY",
    baseUrl: "http://localhost:20128/v1",
  });
  assert.equal(JSON.stringify(settings).includes("sk-route-secret"), false);

  const env = await fs.readFile(ENV_PATH, "utf8");
  assert.match(env, /^OPENAI_API_KEY=keep-openai$/m);
  assert.match(env, /^GEMINI_API_KEY=keep-gemini$/m);
  assert.match(env, /^OMNIROUTE_API_KEY="sk-route-secret"$/m);
});

test("DELETE removes only OmniRoute-owned settings and env lines", async () => {
  const configured = {
    ui: { theme: "dark" },
    security: { auth: { selectedType: "openai" } },
    model: { name: "managed", baseUrl: "http://localhost:20128/v1" },
    modelProviders: {
      openai: [
        {
          id: "personal",
          envKey: "OPENAI_API_KEY",
          baseUrl: "https://api.openai.com/v1",
        },
        {
          id: "managed",
          name: "managed (OmniRoute)",
          envKey: "OMNIROUTE_API_KEY",
          baseUrl: "http://localhost:20128/v1",
        },
      ],
    },
  };
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(configured));
  await fs.writeFile(ENV_PATH, "OPENAI_API_KEY=keep\nOMNIROUTE_API_KEY=remove\n");

  const response = await route.DELETE(await request("DELETE"));
  assert.equal(response.status, 200);

  const settings = JSON.parse(await fs.readFile(SETTINGS_PATH, "utf8"));
  assert.deepEqual(settings.ui, { theme: "dark" });
  assert.equal(settings.model, undefined);
  assert.deepEqual(settings.modelProviders.openai, [configured.modelProviders.openai[0]]);
  assert.equal(await fs.readFile(ENV_PATH, "utf8"), "OPENAI_API_KEY=keep\n");
});

test("DELETE is a no-op when Qwen Code has no config files", async () => {
  const response = await route.DELETE(await request("DELETE"));
  assert.equal(response.status, 200);
  await assert.rejects(fs.access(SETTINGS_PATH));
  await assert.rejects(fs.access(ENV_PATH));
});
