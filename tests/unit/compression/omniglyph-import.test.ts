import { test } from "node:test";
import assert from "node:assert";

test("pacote omniglyph exporta a API que o adapter consome", async () => {
  const mod = await import("omniglyph");
  assert.equal(typeof mod.transformAnthropicMessages, "function");
  assert.equal(typeof mod.isOmniGlyphSupportedModel, "function");
  assert.equal(mod.isOmniGlyphSupportedModel("claude-fable-5"), true);
  assert.equal(mod.isOmniGlyphSupportedModel("gpt-5.5"), false);
});
