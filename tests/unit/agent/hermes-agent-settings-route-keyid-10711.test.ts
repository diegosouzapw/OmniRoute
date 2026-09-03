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
 * asserts the generated YAML carries the real resolved key.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import * as yaml from "js-yaml";

interface HermesAgentParsedConfig {
  providers: { omniroute: { api_key: string } };
  delegation: { api_key: string };
  auxiliary: Record<string, { api_key: string }>;
}

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-hermes-agent-10711-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "hermes-agent-10711-api-secret";
process.env.JWT_SECRET = "hermes-agent-10711-jwt-secret";
process.env.CLI_ALLOW_CONFIG_WRITES = "true";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const route = await import("../../../src/app/api/cli-tools/hermes-agent-settings/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function authCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${jwt}`;
}

test("#10711: POST hermes-agent-settings resolves keyId server-side instead of writing the placeholder", async () => {
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
  assert.notEqual(
    parsed.providers.omniroute.api_key,
    "YOUR_OMNIROUTE_API_KEY_HERE",
    "providers.omniroute.api_key must not be the unresolved placeholder"
  );
  assert.equal(parsed.providers.omniroute.api_key, realKey);
  assert.equal(parsed.delegation.api_key, realKey);
  assert.equal(parsed.auxiliary.vision.api_key, realKey);
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
