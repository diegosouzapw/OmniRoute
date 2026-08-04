import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7364-max-tokens-clamp-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const {
  stripUnsupportedParams,
  __STRIP_RULES_FOR_TEST,
} = await import("../../open-sse/translator/paramSupport.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#7364 Defect B: zai/glm-4.6v max_tokens above the 32768 ceiling is clamped before dispatch", () => {
  const body: Record<string, unknown> = {
    model: "glm-4.6v",
    max_tokens: 65536,
    messages: [{ role: "user", content: "describe this image" }],
  };
  stripUnsupportedParams("zai", "glm-4.6v", body);
  assert.equal(
    body.max_tokens,
    32768,
    "BUG #7364 Defect B: max_tokens must be clamped to the model's 32768 ceiling, but it is passed through unchanged"
  );
});

test("#7364 Defect B: glm/glm-4.6v (the openai-format alias) max_tokens above the ceiling is also clamped", () => {
  const body: Record<string, unknown> = {
    model: "glm-4.6v",
    max_tokens: 50000,
    messages: [{ role: "user", content: "describe this image" }],
  };
  stripUnsupportedParams("glm", "glm-4.6v", body);
  assert.equal(
    body.max_tokens,
    32768,
    "BUG #7364 Defect B: max_tokens must be clamped to the model's 32768 ceiling on the 'glm' provider path too"
  );
});

test("#7364 Defect B (sanity): STRIP_RULES now has clamp entries for both zai/glm-4.6v and glm/glm-4.6v", () => {
  const hasRuleFor = (provider: string) =>
    __STRIP_RULES_FOR_TEST.some(
      (rule) =>
        rule.provider === provider &&
        (rule.clampToModelMaxOutput || Number.isFinite(rule.maxOutputCap)) &&
        (typeof rule.match === "function" ? rule.match("glm-4.6v") : rule.match.test("glm-4.6v"))
    );
  assert.equal(hasRuleFor("zai"), true, "#7364 fix: a clamp rule must exist for zai/glm-4.6v");
  assert.equal(hasRuleFor("glm"), true, "#7364 fix: a clamp rule must exist for glm/glm-4.6v");
});
