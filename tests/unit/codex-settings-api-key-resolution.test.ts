import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

/**
 * Regression test for #13563.
 *
 * Applying Codex settings from /dashboard/cli-code/codex always failed with
 * `400 baseUrl, apiKey and model are required` whenever the dashboard sent an
 * empty apiKey — which it does in cloud mode (CLOUD_URL set) with no management
 * key selected. `baseUrl` and `model` are already Zod-gated (min(1)), so this
 * response could only ever fire on an empty apiKey, yet the error text points
 * at all three fields.
 *
 * The codex-settings route had diverged from the canonical API-key resolution
 * used by cline/forge/openclaw/grok-build/jcode-settings: an inline
 * `if (!apiKey) return 400` guard plus a hand-rolled `getApiKeyById` lookup,
 * instead of the shared `resolveApiKey(keyId, apiKey)`. That helper resolves by
 * keyId first, then falls back to the submitted apiKey, then to `sk_omniroute`.
 *
 * This test drives the real POST handler end-to-end (real DB-backed API key,
 * real JWT auth cookie) and asserts the value written into auth.json.
 */

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omr-codex-settings-key-"));
const TEST_HOME = path.join(TEST_ROOT, "fake-home");
fs.mkdirSync(TEST_HOME, { recursive: true });

const originalHome = os.homedir;
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;
const originalWriteFlag = process.env.CLI_ALLOW_CONFIG_WRITES;

os.homedir = () => TEST_HOME;
process.env.DATA_DIR = path.join(TEST_ROOT, "data");
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-settings-key-api-secret";
process.env.CLI_ALLOW_CONFIG_WRITES = "true";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const route = await import("../../src/app/api/cli-tools/codex-settings/route.ts");

const AUTH_PATH = path.join(TEST_HOME, ".codex", "auth.json");

test.after(async () => {
  core.resetDbInstance();
  os.homedir = originalHome;
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  if (originalWriteFlag === undefined) delete process.env.CLI_ALLOW_CONFIG_WRITES;
  else process.env.CLI_ALLOW_CONFIG_WRITES = originalWriteFlag;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const authCookie = async (): Promise<string> => {
  process.env.JWT_SECRET = "codex-settings-key-api-jwt";
  const token = await new SignJWT({ authenticated: true, sub: "codex-settings-key-api-test" })
    .setProtectedHeader({ alg: "HS256" })
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
        baseUrl: "http://localhost:20128/api/v1",
        model: "gpt-5.6-sol",
        ...body,
      }),
    })
  );

const readWrittenApiKey = (): string | null => {
  try {
    return JSON.parse(fs.readFileSync(AUTH_PATH, "utf8")).OPENAI_API_KEY ?? null;
  } catch {
    return null;
  }
};

test("#13563: POST codex-settings with empty apiKey resolves the real key from keyId instead of 400", async () => {
  const created = await apiKeysDb.createApiKey("codex-settings-key-test", "codex-settings-machine");
  assert.ok(created.key && created.key.length > 0, "createApiKey must return a real plaintext key");

  const response = await post({ apiKey: "", keyId: created.id });

  assert.equal(response.status, 200);
  assert.equal(readWrittenApiKey(), created.key);
});

test("#13563: POST codex-settings with empty apiKey and no keyId writes sk_omniroute instead of 400", async () => {
  const response = await post({ apiKey: "" });

  assert.equal(response.status, 200);
  assert.equal(readWrittenApiKey(), "sk_omniroute");
});

test("#13563: POST codex-settings with an explicit apiKey still writes it verbatim", async () => {
  const response = await post({ apiKey: "sk-test-explicit" });

  assert.equal(response.status, 200);
  assert.equal(readWrittenApiKey(), "sk-test-explicit");
});
