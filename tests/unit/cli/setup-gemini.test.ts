import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  mergeGeminiEnv,
  mergeGeminiSettings,
  resolveGeminiTarget,
  runSetupGeminiCommand,
} from "../../../bin/cli/commands/setup-gemini.mjs";

test("resolveGeminiTarget keeps the Gemini endpoint at the server root", () => {
  assert.deepEqual(
    resolveGeminiTarget({ remote: "https://omni.example/v1/", apiKey: "sk-explicit" }),
    {
      baseUrl: "https://omni.example",
      apiKey: "sk-explicit",
    }
  );
});

test("Gemini config merge preserves user settings and owns only OmniRoute env keys", () => {
  assert.deepEqual(
    mergeGeminiSettings(
      { ui: { theme: "dark" }, security: { auth: { useExternal: true } } },
      "x/y"
    ),
    {
      ui: { theme: "dark" },
      security: { auth: { useExternal: true, selectedType: "gemini-api-key" } },
      model: { name: "x/y" },
    }
  );

  const env = mergeGeminiEnv(
    [
      "KEEP_ME=yes",
      "GEMINI_API_KEY=old",
      "GOOGLE_GEMINI_BASE_URL=https://old.example",
      "GEMINI_MODEL=old/model",
      "",
    ].join("\n"),
    {
      baseUrl: "https://omni.example",
      apiKey: "secret-value",
      model: "x/y",
    }
  );
  assert.match(env, /^KEEP_ME=yes$/m);
  assert.match(env, /^GEMINI_API_KEY="secret-value"$/m);
  assert.match(env, /^GOOGLE_GEMINI_BASE_URL="https:\/\/omni\.example"$/m);
  assert.match(env, /^GEMINI_MODEL="x\/y"$/m);
  assert.equal((env.match(/^GEMINI_API_KEY=/gm) || []).length, 1);
});

test("setup-gemini writes a merged private user config for a remote OmniRoute", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-setup-gemini-"));
  const settingsPath = path.join(tempDir, "settings.json");
  const envPath = path.join(tempDir, ".env");
  await fs.writeFile(
    settingsPath,
    JSON.stringify({ ui: { theme: "dark" }, security: { auth: { useExternal: false } } })
  );
  await fs.writeFile(envPath, "KEEP_ME=yes\n");

  try {
    const code = await runSetupGeminiCommand({
      remote: "https://omni.example/v1",
      apiKey: "sk-gemini-dedicated",
      model: "glm/glm-5.2",
      settingsPath,
      envPath,
      yes: true,
      allowContainerWrite: true,
    });
    assert.equal(code, 0);

    const settings = JSON.parse(await fs.readFile(settingsPath, "utf8"));
    assert.equal(settings.ui.theme, "dark");
    assert.equal(settings.security.auth.useExternal, false);
    assert.equal(settings.security.auth.selectedType, "gemini-api-key");
    assert.equal(settings.model.name, "glm/glm-5.2");
    assert.equal(JSON.stringify(settings).includes("sk-gemini-dedicated"), false);

    const env = await fs.readFile(envPath, "utf8");
    assert.match(env, /^KEEP_ME=yes$/m);
    assert.match(env, /^GEMINI_API_KEY="sk-gemini-dedicated"$/m);
    assert.match(env, /^GOOGLE_GEMINI_BASE_URL="https:\/\/omni\.example"$/m);
    assert.match(env, /^GEMINI_MODEL="glm\/glm-5\.2"$/m);

    const [settingsStat, envStat] = await Promise.all([fs.stat(settingsPath), fs.stat(envPath)]);
    assert.equal(settingsStat.mode & 0o777, 0o600);
    assert.equal(envStat.mode & 0o777, 0o600);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});

test("setup-gemini does not overwrite invalid JSON", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-setup-gemini-bad-"));
  const settingsPath = path.join(tempDir, "settings.json");
  const envPath = path.join(tempDir, ".env");
  await fs.writeFile(settingsPath, "{ invalid JSON");

  try {
    const code = await runSetupGeminiCommand({
      remote: "http://localhost:20128",
      model: "model-id",
      settingsPath,
      envPath,
      yes: true,
      allowContainerWrite: true,
    });
    assert.equal(code, 1);
    assert.equal(await fs.readFile(settingsPath, "utf8"), "{ invalid JSON");
    await assert.rejects(fs.stat(envPath), /ENOENT/);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});
