import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  buildProfileSettings,
  syncClaudeProfilesFromModels,
} from "../../../bin/cli/commands/setup-claude.mjs";
import { buildClaudeEnv, resolveLaunchTarget } from "../../../bin/cli/commands/launch.mjs";
import { categoriseModel } from "../../../bin/cli/commands/setup-codex.mjs";

// ── setup-claude profile generation ──────────────────────────────────────────

test("buildProfileSettings pins the model + base URL + gateway discovery", () => {
  const cfg = categoriseModel("glm/glm-5.2"); // thinking → effort xhigh
  const json = JSON.parse(buildProfileSettings("glm/glm-5.2", "http://vps:20128", cfg));
  assert.equal(json.model, "glm/glm-5.2");
  assert.equal(json.env.ANTHROPIC_BASE_URL, "http://vps:20128");
  assert.equal(json.env.ANTHROPIC_MODEL, "glm/glm-5.2");
  assert.equal(json.env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY, "1");
  assert.equal(json.effortLevel, "xhigh");
});

test("buildProfileSettings NEVER writes the auth token to disk", () => {
  const cfg = categoriseModel("kmc/kimi-k2.7");
  const raw = buildProfileSettings("kmc/kimi-k2.7", "http://vps:20128", cfg);
  assert.equal(raw.includes("ANTHROPIC_AUTH_TOKEN"), false);
  assert.equal(raw.includes("ANTHROPIC_API_KEY"), false);
});

test("buildProfileSettings omits effortLevel for the simple tier", () => {
  const cfg = categoriseModel("ollamacloud/gemma4:31b"); // simple → no effort
  const json = JSON.parse(buildProfileSettings("ollamacloud/gemma4:31b", "http://x:20128", cfg));
  assert.equal("effortLevel" in json, false);
});

test("profile names match setup-codex (cross-CLI consistency)", () => {
  assert.equal(categoriseModel("glm/glm-5.2").name, "glm52");
  assert.equal(categoriseModel("kmc/kimi-k2.7").name, "kimi-k27");
});

test("syncClaudeProfilesFromModels writes directory-per-profile settings + threads baseUrl, skips non-ids", async () => {
  const claudeHome = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-claude-profiles-"));
  try {
    const result = await syncClaudeProfilesFromModels(
      [{ id: "glm/glm-5.2" }, { id: "" }],
      { claudeHome, baseUrl: "http://vps:20128" }
    );

    assert.equal(result.written, 1);
    assert.equal(result.skipped, 1);
    assert.deepEqual(result.profiles.map((p) => p.name), ["glm52"]);

    // Directory-per-profile: <claudeHome>/profiles/<name>/settings.json
    const settingsPath = path.join(claudeHome, "profiles", "glm52", "settings.json");
    const json = JSON.parse(await fs.readFile(settingsPath, "utf8"));
    assert.equal(json.model, "glm/glm-5.2");
    assert.equal(json.env.ANTHROPIC_BASE_URL, "http://vps:20128");
    assert.equal(json.env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY, "1");
    // The auth token must never be written to disk.
    assert.equal(JSON.stringify(json).includes("ANTHROPIC_AUTH_TOKEN"), false);
  } finally {
    await fs.rm(claudeHome, { recursive: true, force: true });
  }
});

test("syncClaudeProfilesFromModels dry-run writes nothing", async () => {
  const claudeHome = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-claude-dry-"));
  try {
    const result = await syncClaudeProfilesFromModels([{ id: "glm/glm-5.2" }], {
      claudeHome,
      baseUrl: "http://vps:20128",
      dryRun: true,
    });
    assert.equal(result.written, 1);
    await assert.rejects(
      fs.stat(path.join(claudeHome, "profiles", "glm52", "settings.json")),
      /ENOENT/
    );
  } finally {
    await fs.rm(claudeHome, { recursive: true, force: true });
  }
});

// ── launch env (Claude Code) ─────────────────────────────────────────────────

test("buildClaudeEnv still accepts a bare port (backward compatible)", () => {
  const env = buildClaudeEnv({ PATH: "/bin" }, 20128, "secret");
  assert.equal(env.ANTHROPIC_BASE_URL, "http://localhost:20128");
  assert.equal(env.ANTHROPIC_AUTH_TOKEN, "secret");
  assert.equal(env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY, "1");
});

test("buildClaudeEnv accepts a full base URL and strips /v1", () => {
  const env = buildClaudeEnv({}, "https://vps.example.com:20128/v1", "t");
  assert.equal(env.ANTHROPIC_BASE_URL, "https://vps.example.com:20128");
});

test("buildClaudeEnv sets CLAUDE_CONFIG_DIR for a profile", () => {
  const env = buildClaudeEnv({}, 20128, "t", { configDir: "/home/u/.claude/profiles/glm52" });
  assert.equal(env.CLAUDE_CONFIG_DIR, "/home/u/.claude/profiles/glm52");
});

test("buildClaudeEnv strips inherited ANTHROPIC_* and does not mutate input", () => {
  const input = { ANTHROPIC_API_KEY: "leak", PATH: "/bin" };
  const env = buildClaudeEnv(input, 20128, "x");
  assert.equal(env.ANTHROPIC_API_KEY, undefined);
  assert.equal(input.ANTHROPIC_API_KEY, "leak");
});

test("resolveLaunchTarget: explicit --remote wins, strips /v1", () => {
  const { baseUrl } = resolveLaunchTarget({ remote: "https://vps:20128/v1" });
  assert.equal(baseUrl, "https://vps:20128");
});

test("resolveLaunchTarget: explicit token wins over everything", () => {
  const { authToken } = resolveLaunchTarget({ remote: "http://x:20128", token: "tok-explicit" });
  assert.equal(authToken, "tok-explicit");
});
