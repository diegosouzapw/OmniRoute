import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveCrushTarget, buildCrushProvider, mergeCrushConfig } from "../../../bin/cli/commands/setup-crush.mjs";

test("resolveCrushTarget ensures /v1", () => {
  assert.equal(resolveCrushTarget({ remote: "http://vps:20128" }).baseUrl, "http://vps:20128/v1");
});
test("resolveCrushTarget: explicit --api-key wins", () => {
  assert.equal(resolveCrushTarget({ remote: "http://x:20128", apiKey: "sk-x" }).apiKey, "sk-x");
});
test("buildCrushProvider emits openai-compat + env-ref key + curated models w/ context_window", () => {
  const p = buildCrushProvider(["glm/glm-5.2", "some/unknown"], "http://vps:20128/v1");
  assert.equal(p.type, "openai-compat");
  assert.equal(p.base_url, "http://vps:20128/v1");
  assert.equal(p.api_key, "$OMNIROUTE_API_KEY");
  assert.equal(p.models.length, 1); // unknown skipped
  assert.equal(p.models[0].id, "glm/glm-5.2");
  assert.ok(p.models[0].context_window > 0);
});
test("mergeCrushConfig adds providers.omniroute, preserves the rest", () => {
  const m = mergeCrushConfig({ options: { tui: true }, providers: { local: {} } }, buildCrushProvider(["glm/glm-5.2"], "http://x/v1"));
  assert.deepEqual(m.options, { tui: true });
  assert.ok(m.providers.local);
  assert.ok(m.providers.omniroute);
});
