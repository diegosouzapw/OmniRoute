import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveRooTarget, buildRooImport, buildRooVscodeAutoImport } from "../../../bin/cli/commands/setup-roo.mjs";

test("resolveRooTarget ensures /v1 on the base URL", () => {
  assert.equal(resolveRooTarget({ remote: "http://vps:20128" }).baseUrl, "http://vps:20128/v1");
});
test("resolveRooTarget: explicit --api-key wins", () => {
  assert.equal(resolveRooTarget({ remote: "http://x:20128", apiKey: "sk-x" }).apiKey, "sk-x");
});
test("buildRooImport produces an openai-compatible provider profile (baseUrl /v1, model)", () => {
  const d = buildRooImport({ baseUrl: "http://vps:20128/v1", apiKey: "k", model: "glm/glm-5.2" });
  const cfg = d.providerProfiles.apiConfigs.OmniRoute;
  assert.equal(cfg.apiProvider, "openai");
  assert.equal(cfg.openAiBaseUrl, "http://vps:20128/v1");
  assert.equal(cfg.openAiModelId, "glm/glm-5.2");
  assert.equal(d.providerProfiles.currentApiConfigName, "OmniRoute");
});
test("buildRooImport falls back to a placeholder key", () => {
  assert.equal(buildRooImport({ baseUrl: "http://x/v1", apiKey: "", model: "m" }).providerProfiles.apiConfigs.OmniRoute.openAiApiKey, "sk_omniroute");
});
test("buildRooVscodeAutoImport sets the pointer, preserving other settings", () => {
  const s = buildRooVscodeAutoImport({ "editor.tabSize": 2 }, "/home/u/.omniroute/roo-settings.json");
  assert.equal(s["editor.tabSize"], 2);
  assert.equal(s["roo-cline.autoImportSettingsPath"], "/home/u/.omniroute/roo-settings.json");
});
