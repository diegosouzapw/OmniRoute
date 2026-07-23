import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveAiderTarget, buildAiderConfig, buildAiderRecipe } from "../../../bin/cli/commands/setup-aider.mjs";

test("resolveAiderTarget strips /v1 (LiteLLM appends it)", () => {
  assert.equal(resolveAiderTarget({ remote: "http://vps:20128/v1/" }).apiBase, "http://vps:20128");
  assert.equal(resolveAiderTarget({ remote: "http://vps:20128" }).apiBase, "http://vps:20128");
});
test("resolveAiderTarget: explicit --api-key wins", () => {
  assert.equal(resolveAiderTarget({ remote: "http://x:20128", apiKey: "sk-x" }).apiKey, "sk-x");
});
test("buildAiderConfig sets openai-api-base + openai/<model>, preserves rest", () => {
  const c = buildAiderConfig({ "auto-commits": false }, { apiBase: "http://vps:20128", model: "glm/glm-5.2" });
  assert.equal(c["openai-api-base"], "http://vps:20128");
  assert.equal(c.model, "openai/glm/glm-5.2");
  assert.equal(c["auto-commits"], false);
});
test("buildAiderRecipe references the env key + headless command", () => {
  const r = buildAiderRecipe({ apiBase: "http://vps:20128", model: "glm/glm-5.2" });
  assert.ok(r.includes("OPENAI_API_BASE=http://vps:20128"));
  assert.ok(r.includes("OPENAI_API_KEY=$OMNIROUTE_API_KEY"));
  assert.ok(r.includes("--model openai/glm/glm-5.2"));
  assert.ok(r.includes("--message") && r.includes("--yes"));
});
