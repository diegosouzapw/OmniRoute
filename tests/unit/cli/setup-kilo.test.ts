import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildKiloAuth,
  buildKiloVscodeSettings,
  resolveKiloTarget,
} from "../../../bin/cli/commands/setup-kilo.mjs";

test("buildKiloAuth sets the openai-compatible provider (baseUrl WITH /v1, model)", () => {
  const auth = buildKiloAuth({}, { apiKey: "sk-x", baseUrl: "http://vps:20128/v1", model: "glm/glm-5.2" });
  assert.equal(auth["openai-compatible"].apiKey, "sk-x");
  assert.equal(auth["openai-compatible"].baseUrl, "http://vps:20128/v1");
  assert.equal(auth["openai-compatible"].model, "glm/glm-5.2");
});

test("buildKiloAuth merges (preserves other providers/keys)", () => {
  const auth = buildKiloAuth({ anthropic: { apiKey: "keep" } }, { apiKey: "k", baseUrl: "http://x/v1", model: "m" });
  assert.equal(auth.anthropic.apiKey, "keep");
  assert.equal(auth["openai-compatible"].model, "m");
});

test("buildKiloAuth falls back to a placeholder key", () => {
  const auth = buildKiloAuth({}, { apiKey: "", baseUrl: "http://x/v1", model: "m" });
  assert.equal(auth["openai-compatible"].apiKey, "sk_omniroute");
});

test("buildKiloVscodeSettings sets kilocode.customProvider + defaultModel, preserving others", () => {
  const s = buildKiloVscodeSettings(
    { "editor.fontSize": 14 },
    { apiKey: "k", baseUrl: "http://vps:20128/v1", model: "glm/glm-5.2" }
  );
  assert.equal(s["editor.fontSize"], 14);
  assert.equal(s["kilocode.customProvider"].name, "OmniRoute");
  assert.equal(s["kilocode.customProvider"].baseURL, "http://vps:20128/v1");
  assert.equal(s["kilocode.defaultModel"], "glm/glm-5.2");
});

test("resolveKiloTarget ensures /v1 on the base URL (Kilo wants it)", () => {
  assert.equal(resolveKiloTarget({ remote: "http://vps:20128" }).baseUrl, "http://vps:20128/v1");
  assert.equal(resolveKiloTarget({ remote: "http://vps:20128/v1/" }).baseUrl, "http://vps:20128/v1");
});

test("resolveKiloTarget: explicit --api-key wins", () => {
  assert.equal(resolveKiloTarget({ remote: "http://x:20128", apiKey: "sk-explicit" }).apiKey, "sk-explicit");
});
