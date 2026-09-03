import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import { parse } from "jsonc-parser";

const originalDataDir = process.env.DATA_DIR;
const databaseRoot = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-apply-jsonc-db-"));
process.env.DATA_DIR = databaseRoot;
const applyRoute = await import("../../../src/app/api/cli-tools/apply/route.ts");

const originalFetch = globalThis.fetch;
const originalJwtSecret = process.env.JWT_SECRET;
const originalApiKeySecret = process.env.API_KEY_SECRET;
const originalXdg = process.env.XDG_CONFIG_HOME;
const originalAllowContainerWrite = process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE;
// This test exercises the apply/merge path, not the container guard (#10057) —
// keep it hermetic on container devboxes/CI.
process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE = "1";
const testRoots = new Set<string>();

async function createAuthCookie(): Promise<string> {
  process.env.JWT_SECRET = "test-cli-tools-apply-secret";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: "test-user" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

async function postApply(): Promise<Response> {
  const cookie = await createAuthCookie();
  return applyRoute.POST(
    new Request("http://localhost/api/cli-tools/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({
        toolId: "opencode",
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
        model: "catalog-model",
      }),
    })
  );
}

test.beforeEach(async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-apply-jsonc-"));
  testRoots.add(root);
  process.env.XDG_CONFIG_HOME = root;
  process.env.API_KEY_SECRET = "test-secret";
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: [
          {
            id: "catalog-model",
            context_length: 131072,
            max_output_tokens: 8192,
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  if (originalApiKeySecret === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = originalApiKeySecret;
  if (originalXdg === undefined) delete process.env.XDG_CONFIG_HOME;
  else process.env.XDG_CONFIG_HOME = originalXdg;
  if (originalAllowContainerWrite === undefined)
    delete process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE;
  else process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE = originalAllowContainerWrite;
  for (const root of testRoots)
    await fs.rm(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  testRoots.clear();
});

test.after(async () => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  await fs.rm(databaseRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("apply writes back to the selected opencode.jsonc and does not create opencode.json (#10227)", async () => {
  const configDir = path.join(process.env.XDG_CONFIG_HOME!, "opencode");
  const jsoncPath = path.join(configDir, "opencode.jsonc");
  const jsonPath = path.join(configDir, "opencode.json");
  const original = `{
  // this comment must survive the merge
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "custom": {
      // keep comments inside unrelated providers too
      "name": "Custom Provider"
    },
  },
}\n`;
  await fs.mkdir(configDir, { recursive: true });
  await fs.writeFile(jsoncPath, original, "utf-8");

  const response = await postApply();
  const body = (await response.json()) as {
    success?: boolean;
    configPath?: string;
    backupPath?: string;
  };

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.configPath, jsoncPath);
  assert.equal(body.backupPath, path.join(configDir, ".omniroute.bak", "opencode.jsonc.bak"));
  await assert.rejects(fs.access(jsonPath));

  const updatedText = await fs.readFile(jsoncPath, "utf-8");
  assert.match(updatedText, /this comment must survive the merge/);
  assert.match(updatedText, /keep comments inside unrelated providers too/);
  const updated = parse(updatedText);
  assert.deepEqual(updated.provider.custom, { name: "Custom Provider" });
  assert.equal(updated.provider.omniroute.models["catalog-model"].limit.context, 131072);
  assert.equal(await fs.readFile(body.backupPath!, "utf-8"), original);
});

test("apply leaves an invalid opencode.jsonc untouched instead of overwriting it (#10227)", async () => {
  const configDir = path.join(process.env.XDG_CONFIG_HOME!, "opencode");
  const jsoncPath = path.join(configDir, "opencode.jsonc");
  const jsonPath = path.join(configDir, "opencode.json");
  const invalid = "{ invalid jsonc\n";
  await fs.mkdir(configDir, { recursive: true });
  await fs.writeFile(jsoncPath, invalid, "utf-8");

  const response = await postApply();
  const body = (await response.json()) as { error?: string };

  assert.equal(response.status, 400);
  assert.match(body.error || "", /invalid.*JSONC|refus/i);
  assert.equal(await fs.readFile(jsoncPath, "utf-8"), invalid);
  await assert.rejects(fs.access(jsonPath));
});
