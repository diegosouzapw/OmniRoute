/**
 * Regression test for #10711.
 *
 * The Hermes Agent dashboard "Apply" flow (HermesAgentToolCard.tsx) only ever
 * sends `{ keyId, selections }` — never a raw `apiKey` — because resolving a
 * real key from a stored keyId is expected to happen server-side, mirroring
 * claude-settings/route.ts and codex-settings/route.ts. The POST handler for
 * hermes-agent-settings never resolved `keyId` before this fix, so it always
 * fell through to the literal placeholder "YOUR_OMNIROUTE_API_KEY_HERE" in
 * providers.omniroute.api_key, delegation.api_key, and every auxiliary.*.api_key.
 *
 * This test drives the real POST handler end-to-end (real DB-backed API key,
 * real JWT auth cookie, preview mode so nothing is written to disk) and
 * asserts the generated YAML references the env var without carrying the key.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import * as yaml from "js-yaml";

interface HermesAgentParsedConfig {
  custom_providers: Array<{ name: string; key_env: string; api_key?: string }>;
  delegation: { api_key?: string };
  auxiliary: Record<string, { api_key?: string }>;
}

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-hermes-agent-10711-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "hermes-agent-10711-api-secret";
process.env.JWT_SECRET = "hermes-agent-10711-jwt-secret";
process.env.CLI_ALLOW_CONFIG_WRITES = "true";
process.env.HERMES_HOME = path.join(TEST_DATA_DIR, "hermes");

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const route = await import("../../src/app/api/cli-tools/hermes-agent-settings/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function authCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${jwt}`;
}

test("POST hermes-agent-settings preview never serializes the resolved key", async () => {
  const created = await apiKeysDb.createApiKey(
    "hermes-agent-10711-key",
    "hermes-agent-10711-machine"
  );
  const realKey = created.key;
  assert.ok(realKey && realKey.length > 0, "createApiKey must return the real plaintext key");

  const response = await route.POST(
    new Request("http://localhost/api/cli-tools/hermes-agent-settings", {
      method: "POST",
      headers: {
        cookie: await authCookie(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128",
        keyId: created.id,
        selections: [
          { role: "default", model: "gpt-4o" },
          { role: "delegation", model: "gpt-4o" },
          { role: "vision", model: "gpt-4o-vision" },
        ],
        preview: true,
      }),
    })
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);

  const parsed = yaml.load(body.yaml) as HermesAgentParsedConfig;
  const provider = parsed.custom_providers.find((entry) => entry.name === "omniroute");
  assert.equal(provider?.key_env, "OMNIROUTE_API_KEY");
  assert.equal(provider?.api_key, undefined);
  assert.ok(!body.yaml.includes(realKey));
  assert.equal(parsed.delegation.api_key, undefined);
  assert.equal(parsed.auxiliary.vision.api_key, undefined);
});

test("POST hermes-agent-settings stores the resolved key only in a mode-0600 Hermes .env", async () => {
  const created = await apiKeysDb.createApiKey("hermes-agent-env-key", "hermes-agent-env-machine");

  const response = await route.POST(
    new Request("http://localhost/api/cli-tools/hermes-agent-settings", {
      method: "POST",
      headers: {
        cookie: await authCookie(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128",
        keyId: created.id,
        selections: [{ role: "default", model: "gpt-4o" }],
      }),
    })
  );

  assert.equal(response.status, 200);
  const envPath = path.join(process.env.HERMES_HOME!, ".env");
  const configPath = path.join(process.env.HERMES_HOME!, "config.yaml");
  const env = fs.readFileSync(envPath, "utf8");
  const config = fs.readFileSync(configPath, "utf8");
  assert.match(env, new RegExp(`^OMNIROUTE_API_KEY=${created.key}$`, "m"));
  assert.ok(!config.includes(created.key));
  assert.equal(fs.statSync(envPath).mode & 0o777, 0o600);
});

test("POST hermes-agent-settings refuses apply when neither keyId nor Hermes .env resolves a key", async () => {
  const envPath = path.join(process.env.HERMES_HOME!, ".env");
  const configPath = path.join(process.env.HERMES_HOME!, "config.yaml");
  fs.rmSync(envPath, { force: true });
  const configBefore = fs.readFileSync(configPath, "utf8");

  const response = await route.POST(
    new Request("http://localhost/api/cli-tools/hermes-agent-settings", {
      method: "POST",
      headers: {
        cookie: await authCookie(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128",
        keyId: "does-not-exist-in-db",
        selections: [{ role: "default", model: "must-not-be-written" }],
      }),
    })
  );

  assert.equal(response.status, 400);
  assert.equal(fs.readFileSync(configPath, "utf8"), configBefore);
  assert.equal(fs.existsSync(envPath), false);
});

test("POST hermes-agent-settings does not trust known placeholder values in Hermes .env", async () => {
  const envPath = path.join(process.env.HERMES_HOME!, ".env");
  const configPath = path.join(process.env.HERMES_HOME!, "config.yaml");
  fs.writeFileSync(envPath, "OMNIROUTE_API_KEY=YOUR_OMNIROUTE_API_KEY_HERE\n", { mode: 0o600 });
  const configBefore = fs.readFileSync(configPath, "utf8");

  const response = await route.POST(
    new Request("http://localhost/api/cli-tools/hermes-agent-settings", {
      method: "POST",
      headers: {
        cookie: await authCookie(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128",
        keyId: "does-not-exist-in-db",
        selections: [{ role: "default", model: "must-not-be-written" }],
      }),
    })
  );

  assert.equal(response.status, 400);
  assert.equal(fs.readFileSync(configPath, "utf8"), configBefore);
});

test("#10711: POST hermes-agent-settings falls back gracefully when keyId does not resolve", async () => {
  const response = await route.POST(
    new Request("http://localhost/api/cli-tools/hermes-agent-settings", {
      method: "POST",
      headers: {
        cookie: await authCookie(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baseUrl: "http://localhost:20128",
        keyId: "does-not-exist-in-db",
        selections: [{ role: "default", model: "gpt-4o" }],
        preview: true,
      }),
    })
  );

  // Must not crash the Apply flow — still succeeds, just without a resolved key.
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
});
