import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_HOME = path.join(os.tmpdir(), `omniroute-codex-wire-api-${process.pid}-${Date.now()}`);
const CONFIG_PATH = path.join(TEST_HOME, ".codex", "config.toml");
const originalHome = os.homedir;
const originalJwtSecret = process.env.JWT_SECRET;
const originalWriteFlag = process.env.CLI_ALLOW_CONFIG_WRITES;

os.homedir = () => TEST_HOME;
process.env.CLI_ALLOW_CONFIG_WRITES = "true";

const route = await import("../../src/app/api/cli-tools/codex-settings/route.ts");

const authCookie = async (): Promise<string> => {
  process.env.JWT_SECRET = "codex-wire-api-default-test-secret";
  const token = await new SignJWT({ sub: "codex-wire-api-default-test" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${token}`;
};

const post = async (body: Record<string, unknown>) =>
  route.POST(
    new Request("http://localhost/api/cli-tools/codex-settings", {
      method: "POST",
      headers: {
        cookie: await authCookie(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: "sk-test-only",
        model: "gpt-5.6-sol",
        ...body,
      }),
    })
  );

test.after(async () => {
  os.homedir = originalHome;
  await fs.rm(TEST_HOME, { recursive: true, force: true });
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  if (originalWriteFlag === undefined) delete process.env.CLI_ALLOW_CONFIG_WRITES;
  else process.env.CLI_ALLOW_CONFIG_WRITES = originalWriteFlag;
});

test("POST resolves the Codex wire API before URL normalization and TOML generation", async (t) => {
  const cases = [
    {
      name: "omitted wireApi defaults to responses",
      body: { baseUrl: "http://localhost:20128/api/v1/responses" },
      expectedBaseUrl: "http://localhost:20128/v1",
      expectedWireApi: "responses",
    },
    {
      name: "explicit responses remains responses",
      body: {
        baseUrl: "http://localhost:20128/api/v1/responses",
        wireApi: "responses",
      },
      expectedBaseUrl: "http://localhost:20128/v1",
      expectedWireApi: "responses",
    },
    {
      name: "explicit chat remains chat",
      body: { baseUrl: "http://localhost:20128/api/v1", wireApi: "chat" },
      expectedBaseUrl: "http://localhost:20128/v1",
      expectedWireApi: "chat",
    },
  ] as const;

  for (const testCase of cases) {
    await t.test(testCase.name, async () => {
      await fs.rm(TEST_HOME, { recursive: true, force: true });
      const response = await post(testCase.body);
      assert.equal(response.status, 200);

      const config = await fs.readFile(CONFIG_PATH, "utf8");
      assert.match(config, new RegExp(`^base_url = "${testCase.expectedBaseUrl}"$`, "m"));
      assert.match(config, new RegExp(`^wire_api = "${testCase.expectedWireApi}"$`, "m"));
    });
  }
});
