import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveCursorTarget, buildCursorInstructions } from "../../../bin/cli/commands/setup-cursor.mjs";

test("resolveCursorTarget ensures /v1 (Cursor appends /chat/completions)", () => {
  assert.equal(resolveCursorTarget({ remote: "http://vps:20128" }).apiBase, "http://vps:20128/v1");
  assert.equal(resolveCursorTarget({ remote: "http://vps:20128/v1/" }).apiBase, "http://vps:20128/v1");
});

test("resolveCursorTarget: explicit --api-key wins", () => {
  assert.equal(resolveCursorTarget({ remote: "http://x:20128", apiKey: "sk-x" }).apiKey, "sk-x");
});

test("buildCursorInstructions includes the base URL, /v1 note, and model samples", () => {
  const txt = buildCursorInstructions({ apiBase: "http://vps:20128/v1", models: ["glm/glm-5.2", "kmc/kimi-k2.7"] });
  assert.ok(txt.includes("http://vps:20128/v1"));
  assert.ok(txt.includes("Override OpenAI Base URL"));
  assert.ok(txt.includes("glm/glm-5.2"));
  assert.ok(/chat panel only/i.test(txt));
});

test("buildCursorInstructions falls back to sample models when none given", () => {
  const txt = buildCursorInstructions({ apiBase: "http://x/v1", models: [] });
  assert.ok(txt.includes("glm/glm-5.2"));
});
