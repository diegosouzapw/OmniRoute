import test from "node:test";
import assert from "node:assert/strict";

import {
  formatRuntimeEnvValidationErrors,
  getWebRuntimeEnv,
  validateWebRuntimeEnv,
} from "../../src/lib/env/runtimeEnv.ts";

function buildEnv(overrides = {}) {
  return {
    NODE_ENV: "test",
    DATA_DIR: "/tmp/omniroute-test",
    JWT_SECRET: "j".repeat(48),
    API_KEY_SECRET: "k".repeat(32),
    AUTH_COOKIE_SECURE: "true",
    REQUIRE_API_KEY: "false",
    PRICING_SYNC_ENABLED: "false",
    OMNIROUTE_DISABLE_BACKGROUND_SERVICES: "false",
    CLOUD_URL: "https://cloud.example",
    NEXT_PUBLIC_CLOUD_URL: "https://public-cloud.example",
    NEXT_PUBLIC_BASE_URL: "https://app.example",
    OMNIROUTE_PORT: "20128",
    API_PORT: "21128",
    DASHBOARD_PORT: "22128",
    ...overrides,
  };
}

test("validateWebRuntimeEnv accepts a valid runtime env payload", () => {
  const result = validateWebRuntimeEnv(buildEnv());

  assert.equal(result.valid, true);
  assert.equal(result.errors.length, 0);
  assert.equal(result.data.AUTH_COOKIE_SECURE, "true");
  assert.equal(result.data.API_PORT, "21128");
});

test("validateWebRuntimeEnv rejects invalid boolean and port flags", () => {
  const result = validateWebRuntimeEnv(
    buildEnv({
      AUTH_COOKIE_SECURE: "1",
      API_PORT: "70000",
    })
  );

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.name === "AUTH_COOKIE_SECURE"));
  assert.ok(result.errors.some((error) => error.name === "API_PORT"));
});

test("validateWebRuntimeEnv rejects malformed public URLs", () => {
  const result = validateWebRuntimeEnv(
    buildEnv({
      NEXT_PUBLIC_CLOUD_URL: "cloud.example",
    })
  );

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.name === "NEXT_PUBLIC_CLOUD_URL"));
});

test("getWebRuntimeEnv throws sanitized messages without leaking secret values", () => {
  const env = buildEnv({
    API_KEY_SECRET: "short-secret",
  });

  assert.throws(
    () => getWebRuntimeEnv(env),
    (error: any) => {
      assert.match(error.message, /API_KEY_SECRET/);
      assert.doesNotMatch(error.message, /short-secret/);
      return true;
    }
  );
});

test("formatRuntimeEnvValidationErrors preserves hints but never requires raw values", () => {
  const message = formatRuntimeEnvValidationErrors([
    {
      name: "API_KEY_SECRET",
      issue: 'Required environment variable "API_KEY_SECRET" is not set.',
      hint: "Generate with: openssl rand -hex 32",
    },
  ]);

  assert.match(message, /API_KEY_SECRET/);
  assert.match(message, /openssl rand -hex 32/);
});
