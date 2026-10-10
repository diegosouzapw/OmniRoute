import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// The executor graph can initialize settings; isolate before any application import.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omr-anthropic-beta-15942-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
assert.equal(process.env.DATA_DIR, dataDir);

const { ANTHROPIC_BETA_API_KEY, ANTHROPIC_BETA_FULL, ANTHROPIC_BETA_CLAUDE_OAUTH } =
  await import("../../open-sse/config/anthropicHeaders.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

const CC_BETA = "claude-code-20250219";
const OAUTH_BETA = "oauth-2025-04-20";
const tokens = (header: string) => new Set(header.split(",").map((value) => value.trim()));
const readHeader = (headers: Record<string, string>, name: string): string => {
  const value = new Headers(headers).get(name);
  assert.ok(value !== null, `missing ${name}`);
  return value;
};

for (const stream of [false, true]) {
  test(`#15942 plain Anthropic API-key headers omit CC identity (stream=${stream})`, () => {
    const headers = new DefaultExecutor("anthropic").buildHeaders(
      { apiKey: "fixture-api-key" },
      stream
    );
    const betas = tokens(readHeader(headers, "anthropic-beta"));
    assert.equal(betas.has(CC_BETA), false, "plain API-key requests must not claim Claude Code");
    assert.equal(betas.has(OAUTH_BETA), false);
    assert.equal(headers["x-api-key"], "fixture-api-key");
    assert.equal(headers["x-app"], undefined);
    assert.equal(readHeader(headers, "anthropic-version"), "2023-06-01");
    assert.equal(headers.Accept, stream ? "text/event-stream" : "application/json");
  });
}

test("#15942 API-key defaults retain functional API betas", () => {
  const betas = tokens(ANTHROPIC_BETA_API_KEY);
  for (const value of [
    "interleaved-thinking-2025-05-14",
    "context-management-2025-06-27",
    "code-execution-2025-08-25",
  ]) {
    assert.ok(betas.has(value), value);
  }
});

test("#15942 full and OAuth beta sets retain their CC and OAuth identity", () => {
  for (const value of [ANTHROPIC_BETA_FULL, ANTHROPIC_BETA_CLAUDE_OAUTH]) {
    assert.ok(tokens(value).has(CC_BETA));
    assert.ok(tokens(value).has(OAUTH_BETA));
  }
  const headers = new DefaultExecutor("claude").buildHeaders({ accessToken: "fixture-oauth" });
  assert.ok(tokens(readHeader(headers, "anthropic-beta")).has(CC_BETA));
  assert.equal(headers.Authorization, "Bearer fixture-oauth");
});

test("#15942 compatible providers preserve explicitly configured beta headers", () => {
  const headers = new DefaultExecutor("anthropic-compatible-explicit").buildHeaders({
    apiKey: "fixture-compatible-key",
    providerSpecificData: {
      baseUrl: "https://fixture.invalid/v1",
      customHeaders: { "Anthropic-Beta": `${CC_BETA},operator-beta` },
    },
  });
  assert.deepEqual(
    tokens(readHeader(headers, "anthropic-beta")),
    new Set([CC_BETA, "operator-beta"])
  );
});

test("#15942 client-negotiated functional betas still reach the API-key provider", () => {
  const headers = new DefaultExecutor("anthropic").buildHeaders(
    { apiKey: "fixture-api-key" },
    true,
    { "anthropic-beta": "thinking-binding-controls-2026-08-01" }
  );
  assert.ok(
    tokens(readHeader(headers, "anthropic-beta")).has("thinking-binding-controls-2026-08-01")
  );
});
