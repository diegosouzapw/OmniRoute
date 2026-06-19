import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveQwenTarget, buildQwenSettings } from "../../../bin/cli/commands/setup-qwen.mjs";

test("resolveQwenTarget ensures /v1", () => {
  assert.equal(resolveQwenTarget({ remote: "http://vps:20128" }).baseUrl, "http://vps:20128/v1");
});
test("resolveQwenTarget: explicit --api-key wins", () => {
  assert.equal(resolveQwenTarget({ remote: "http://x:20128", apiKey: "sk-x" }).apiKey, "sk-x");
});
test("buildQwenSettings adds an openai modelProvider (baseUrl /v1, envKey), sets model", () => {
  const s = buildQwenSettings({}, { baseUrl: "http://vps:20128/v1", model: "glm/glm-5.2" });
  const p = s.modelProviders.find((x) => x.id === "omniroute");
  assert.equal(p.authType, "openai");
  assert.equal(p.baseUrl, "http://vps:20128/v1");
  assert.equal(p.envKey, "OMNIROUTE_API_KEY");
  assert.equal(s.model, "glm/glm-5.2");
  assert.equal(s.selectedProvider, "omniroute");
});
test("buildQwenSettings de-dupes the omniroute provider + preserves others", () => {
  const s = buildQwenSettings(
    { modelProviders: [{ id: "other" }, { id: "omniroute", baseUrl: "old" }], theme: "dark" },
    { baseUrl: "http://x/v1", model: "m" }
  );
  assert.equal(s.modelProviders.filter((p) => p.id === "omniroute").length, 1);
  assert.ok(s.modelProviders.some((p) => p.id === "other"));
  assert.equal(s.theme, "dark");
});
