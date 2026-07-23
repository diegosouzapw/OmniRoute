import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-wildcard-alias-7693-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
process.env.API_KEY_SECRET = "test-wildcard-alias-7693-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_API_KEY_SECRET === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  }
});

test("#7693: a wildcard alias saved via settings.wildcardAliases IS applied by getModelInfo", async () => {
  // Exactly what ModelAliasesUnified.tsx::addWildcardAlias() does: PATCH
  // /api/settings with { wildcardAliases: [...] } -> src/lib/db/settings.ts::updateSettings().
  await settingsDb.updateSettings({
    wildcardAliases: [{ pattern: "claude-haiku-*", target: "openai/gpt-4o-mini" }],
  });

  // Same bare-model request Claude Code sends when routed through
  // ~/.claude/settings.json's `model` field, exactly as reported in #7693.
  const info = await getModelInfo("claude-haiku-4-5-20251001");

  assert.equal(
    info.provider,
    "openai",
    `expected the "claude-haiku-*" wildcard alias to route to provider "openai", got ${JSON.stringify(info)}`
  );
  assert.equal(info.model, "gpt-4o-mini");
});

test("#7693: an exact alias still wins over a wildcard alias on the same model id", async () => {
  await settingsDb.updateSettings({
    modelAliases: { "claude-haiku-4-5-20251001": "anthropic/claude-3-5-sonnet-20241022" },
    wildcardAliases: [{ pattern: "claude-haiku-*", target: "openai/gpt-4o-mini" }],
  });

  const info = await getModelInfo("claude-haiku-4-5-20251001");

  assert.equal(
    info.provider,
    "anthropic",
    `expected the exact alias to win over the wildcard alias, got ${JSON.stringify(info)}`
  );
  assert.equal(info.model, "claude-3-5-sonnet-20241022");
});
