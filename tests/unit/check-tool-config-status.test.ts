/**
 * Unit tests for src/lib/cliTools/checkToolConfigStatus.ts
 *
 * Uses real temp files (DI via _configPathOverride) — no mock.module required.
 * Tests cover all 8 tool branches + edge cases.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

// Set DATA_DIR before importing modules that read it
process.env.DATA_DIR = path.join(os.tmpdir(), "omniroute-check-tool-test");

const { checkToolConfigStatus } = await import("../../src/lib/cliTools/checkToolConfigStatus.ts");

// Helper: create a temp file with given content and return its path
async function writeTempFile(filename: string, content: string): Promise<string> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-clicheck-"));
  const filePath = path.join(tmpDir, filename);
  await fs.writeFile(filePath, content, "utf-8");
  return filePath;
}

// Helper: create a temp TOML config for codex with optional auth.json alongside
async function writeCodexConfig(opts: {
  hasOmniRoute: boolean;
  authApiKey?: string;
}): Promise<string> {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-codex-"));
  const configPath = path.join(tmpDir, "config.toml");

  const tomlContent = opts.hasOmniRoute
    ? `[openai]\nbase_url = "http://localhost:20128/v1"\napi_key_env = "OPENAI_API_KEY"\n`
    : `[openai]\nbase_url = "https://api.openai.com/v1"\n`;

  await fs.writeFile(configPath, tomlContent, "utf-8");

  if (opts.authApiKey !== undefined) {
    const authPath = path.join(tmpDir, "auth.json");
    await fs.writeFile(
      authPath,
      JSON.stringify({ OPENAI_API_KEY: opts.authApiKey }),
      "utf-8"
    );
  }

  return configPath;
}

// ── Claude tests ──────────────────────────────────────────────────────────────

test("claude: returns 'configured' when ANTHROPIC_BASE_URL is set", async () => {
  const configPath = await writeTempFile(
    "settings.json",
    JSON.stringify({ env: { ANTHROPIC_BASE_URL: "http://localhost:20128" } })
  );
  const result = await checkToolConfigStatus("claude", configPath);
  assert.equal(result, "configured");
});

test("claude: returns 'not_configured' when ANTHROPIC_BASE_URL is absent", async () => {
  const configPath = await writeTempFile(
    "settings.json",
    JSON.stringify({ env: {} })
  );
  const result = await checkToolConfigStatus("claude", configPath);
  assert.equal(result, "not_configured");
});

// ── Codex tests ───────────────────────────────────────────────────────────────

test("codex: returns 'configured' when TOML has OmniRoute URL + valid auth key", async () => {
  const configPath = await writeCodexConfig({
    hasOmniRoute: true,
    authApiKey: "sk_omniroute_testkey_1234567890abcdef",
  });
  const result = await checkToolConfigStatus("codex", configPath);
  assert.equal(result, "configured");
});

test("codex: returns 'not_configured' when TOML has OmniRoute URL but auth key is masked", async () => {
  const configPath = await writeCodexConfig({
    hasOmniRoute: true,
    authApiKey: "sk_****",
  });
  const result = await checkToolConfigStatus("codex", configPath);
  assert.equal(result, "not_configured");
});

test("codex: returns 'not_configured' when TOML does not mention OmniRoute", async () => {
  const configPath = await writeCodexConfig({ hasOmniRoute: false });
  const result = await checkToolConfigStatus("codex", configPath);
  assert.equal(result, "not_configured");
});

// ── Qwen tests ────────────────────────────────────────────────────────────────

test("qwen: returns 'configured' when modelProviders has OmniRoute URL", async () => {
  const configPath = await writeTempFile(
    "qwen.json",
    JSON.stringify({
      modelProviders: [{ apiBase: "http://localhost:20128/v1", name: "omniroute" }],
    })
  );
  const result = await checkToolConfigStatus("qwen", configPath);
  assert.equal(result, "configured");
});

test("qwen: returns 'not_configured' when modelProviders is missing", async () => {
  const configPath = await writeTempFile("qwen.json", JSON.stringify({}));
  const result = await checkToolConfigStatus("qwen", configPath);
  assert.equal(result, "not_configured");
});

// ── Hermes tests ──────────────────────────────────────────────────────────────

test("hermes: returns 'configured' when config contains OmniRoute", async () => {
  const configPath = await writeTempFile(
    "hermes.toml",
    `[openai]\nbase_url = "http://localhost:20128/v1"\n`
  );
  const result = await checkToolConfigStatus("hermes", configPath);
  assert.equal(result, "configured");
});

test("hermes: returns 'not_configured' when config points elsewhere", async () => {
  const configPath = await writeTempFile(
    "hermes.toml",
    `[openai]\nbase_url = "https://api.openai.com"\n`
  );
  const result = await checkToolConfigStatus("hermes", configPath);
  assert.equal(result, "not_configured");
});

// ── Droid / Openclaw / Kilo ───────────────────────────────────────────────────

test("droid: returns 'configured' when JSON config contains sk_omniroute marker", async () => {
  const configPath = await writeTempFile(
    "droid.json",
    JSON.stringify({ apiKey: "sk_omniroute_somekey", baseUrl: "http://localhost:20128/v1" })
  );
  const result = await checkToolConfigStatus("droid", configPath);
  assert.equal(result, "configured");
});

test("openclaw: returns 'configured' when JSON config contains omniroute text", async () => {
  const configPath = await writeTempFile(
    "openclaw.json",
    JSON.stringify({ openAiBaseUrl: "http://omniroute.local/v1", openAiApiKey: "sk-test" })
  );
  const result = await checkToolConfigStatus("openclaw", configPath);
  assert.equal(result, "configured");
});

test("cline: returns 'configured' when openAiBaseUrl is set with openai provider", async () => {
  const configPath = await writeTempFile(
    "cline.json",
    JSON.stringify({
      actModeApiProvider: "openai",
      openAiBaseUrl: "http://localhost:20128/v1",
    })
  );
  const result = await checkToolConfigStatus("cline", configPath);
  assert.equal(result, "configured");
});

test("kilo: returns 'not_configured' when no OmniRoute markers present", async () => {
  const configPath = await writeTempFile(
    "kilo.json",
    JSON.stringify({ apiProvider: "anthropic", model: "claude-3-sonnet" })
  );
  const result = await checkToolConfigStatus("kilo", configPath);
  assert.equal(result, "not_configured");
});

// ── Edge cases ────────────────────────────────────────────────────────────────

test("error path: non-existent file returns 'not_configured' (no throw)", async () => {
  const result = await checkToolConfigStatus("claude", "/nonexistent/path/settings.json");
  assert.equal(result, "not_configured");
});

test("unknown toolId: returns 'unknown' (no configPath for unknown tool)", async () => {
  // unknown tool has no config path via getCliPrimaryConfigPath — configPathOverride not needed
  // but we can also test via override with a valid JSON file to hit the default branch
  const configPath = await writeTempFile(
    "unknown.json",
    JSON.stringify({ foo: "bar" })
  );
  const result = await checkToolConfigStatus("totally-unknown-tool-id", configPath);
  assert.equal(result, "unknown");
});

test("invalid JSON: returns 'not_configured' (no throw)", async () => {
  const configPath = await writeTempFile("bad.json", "{ invalid json ]]]");
  const result = await checkToolConfigStatus("claude", configPath);
  assert.equal(result, "not_configured");
});
