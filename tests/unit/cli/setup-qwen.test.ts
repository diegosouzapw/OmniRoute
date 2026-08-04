import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { resolveQwenTarget, runSetupQwenCommand } from "../../../bin/cli/commands/setup-qwen.mjs";

test("resolveQwenTarget normalizes a remote endpoint to the OpenAI /v1 base", () => {
  assert.deepEqual(resolveQwenTarget({ remote: "https://omni.example/", apiKey: "sk-explicit" }), {
    baseUrl: "https://omni.example/v1",
    apiKey: "sk-explicit",
  });
});

test("setup-qwen writes current V4 settings and only its dedicated env key", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-setup-qwen-"));
  const settingsPath = path.join(tempDir, "settings.json");
  const envPath = path.join(tempDir, ".env");
  await fs.writeFile(
    settingsPath,
    JSON.stringify({
      ui: { theme: "dark" },
      modelProviders: {
        openai: [
          {
            id: "personal",
            envKey: "OPENAI_API_KEY",
            baseUrl: "https://api.openai.com/v1",
          },
        ],
      },
    })
  );
  await fs.writeFile(envPath, "OPENAI_API_KEY=keep-me\n");

  try {
    const code = await runSetupQwenCommand({
      remote: "http://router:20128",
      apiKey: "sk-qwen-dedicated",
      model: "qwen/qwen3.8-max-preview",
      configPath: settingsPath,
      envPath,
      yes: true,
    });
    assert.equal(code, 0);

    const settings = JSON.parse(await fs.readFile(settingsPath, "utf8"));
    assert.equal(settings.ui.theme, "dark");
    assert.equal(Array.isArray(settings.modelProviders.openai), true);
    assert.equal(settings.modelProviders.openai.length, 2);
    assert.deepEqual(settings.modelProviders.openai[1], {
      id: "qwen/qwen3.8-max-preview",
      name: "qwen/qwen3.8-max-preview (OmniRoute)",
      envKey: "OMNIROUTE_API_KEY",
      baseUrl: "http://router:20128/v1",
    });
    assert.equal(JSON.stringify(settings).includes("sk-qwen-dedicated"), false);

    const env = await fs.readFile(envPath, "utf8");
    assert.match(env, /^OPENAI_API_KEY=keep-me$/m);
    assert.match(env, /^OMNIROUTE_API_KEY="sk-qwen-dedicated"$/m);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});

test("setup-qwen does not overwrite an invalid settings file", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-setup-qwen-bad-"));
  const settingsPath = path.join(tempDir, "settings.json");
  await fs.writeFile(settingsPath, "{ invalid JSON");

  try {
    const code = await runSetupQwenCommand({
      remote: "http://router:20128",
      model: "model-id",
      configPath: settingsPath,
      yes: true,
    });
    assert.equal(code, 1);
    assert.equal(await fs.readFile(settingsPath, "utf8"), "{ invalid JSON");
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});
