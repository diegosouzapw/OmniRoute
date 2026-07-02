import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildContinueModels,
  mergeContinueConfig,
  resolveContinueTarget,
} from "../../../bin/cli/commands/setup-continue.mjs";

test("buildContinueModels emits provider:openai + apiBase + secret ref + roles", () => {
  const models = buildContinueModels(["glm/glm-5.2"], "http://vps:20128/v1");
  assert.equal(models.length, 1);
  const m = models[0];
  assert.equal(m.provider, "openai");
  assert.equal(m.model, "glm/glm-5.2");
  assert.equal(m.apiBase, "http://vps:20128/v1");
  assert.equal(m.apiKey, "${{ secrets.OMNIROUTE_API_KEY }}");
  assert.ok(m.roles.includes("chat") && m.roles.includes("edit") && m.roles.includes("apply"));
});

test("buildContinueModels gives the fast tier an autocomplete role", () => {
  const fast = buildContinueModels(["glm/glm-5-turbo"], "http://x/v1")[0]; // fast → effort low
  assert.ok(fast.roles.includes("autocomplete"));
});

test("buildContinueModels skips uncategorised models", () => {
  assert.equal(buildContinueModels(["some/unknown-model"], "http://x/v1").length, 0);
});

test("mergeContinueConfig replaces prior OmniRoute models, keeps others", () => {
  const existing = {
    name: "My Config",
    models: [
      { name: "Local Ollama", provider: "ollama", model: "llama3", apiBase: "http://localhost:11434" },
      { name: "old omni", provider: "openai", model: "x", apiBase: "http://vps:20128/v1" },
    ],
  };
  const fresh = buildContinueModels(["glm/glm-5.2"], "http://vps:20128/v1");
  const merged = mergeContinueConfig(existing, fresh, "http://vps:20128/v1");
  // kept the ollama model; dropped the old omni one (same apiBase); added the new
  const apiBases = merged.models.map((m) => m.apiBase);
  assert.ok(merged.models.some((m) => m.provider === "ollama"));
  assert.equal(merged.models.filter((m) => m.apiBase === "http://vps:20128/v1").length, 1);
  assert.equal(merged.name, "My Config", "preserves existing top-level keys");
});

test("mergeContinueConfig sets defaults on an empty config", () => {
  const merged = mergeContinueConfig({}, buildContinueModels(["glm/glm-5.2"], "http://x/v1"), "http://x/v1");
  assert.equal(merged.schema, "v1");
  assert.ok(merged.name && merged.version);
});

test("resolveContinueTarget ensures /v1 on apiBase", () => {
  assert.equal(resolveContinueTarget({ remote: "http://vps:20128" }).apiBase, "http://vps:20128/v1");
  assert.equal(resolveContinueTarget({ remote: "http://vps:20128/v1/" }).apiBase, "http://vps:20128/v1");
});
