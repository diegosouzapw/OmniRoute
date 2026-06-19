import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveGeminiTarget, buildGeminiRecipe, buildGeminiSettings } from "../../../bin/cli/commands/setup-gemini.mjs";

test("resolveGeminiTarget strips /v1beta and /v1 to the root (SDK appends /v1beta)", () => {
  assert.equal(resolveGeminiTarget({ remote: "http://vps:20128/v1beta" }).baseUrl, "http://vps:20128");
  assert.equal(resolveGeminiTarget({ remote: "http://vps:20128/v1/" }).baseUrl, "http://vps:20128");
  assert.equal(resolveGeminiTarget({ remote: "http://vps:20128" }).baseUrl, "http://vps:20128");
});
test("resolveGeminiTarget: explicit --api-key wins", () => {
  assert.equal(resolveGeminiTarget({ remote: "http://x:20128", apiKey: "sk-x" }).apiKey, "sk-x");
});
test("buildGeminiRecipe sets GOOGLE_GEMINI_BASE_URL (root) + GEMINI_API_KEY env-ref + model", () => {
  const r = buildGeminiRecipe({ baseUrl: "http://vps:20128", model: "gemini-3-flash" });
  assert.ok(r.includes("GOOGLE_GEMINI_BASE_URL=http://vps:20128"));
  assert.ok(r.includes("GEMINI_API_KEY=$OMNIROUTE_API_KEY"));
  assert.ok(r.includes("GEMINI_MODEL=gemini-3-flash"));
  assert.ok(r.includes("gemini -p"));
});
test("buildGeminiSettings sets model, preserves other settings", () => {
  const s = buildGeminiSettings({ theme: "Default" }, { model: "gemini-3-flash" });
  assert.equal(s.model, "gemini-3-flash");
  assert.equal(s.theme, "Default");
});
