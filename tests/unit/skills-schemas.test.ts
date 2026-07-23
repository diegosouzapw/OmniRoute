import test from "node:test";
import assert from "node:assert/strict";

import {
  SkillConfigSchema,
  SkillCreateInputSchema,
  SkillSchema,
  SkillUpdateInputSchema,
} from "../../src/lib/skills/schemas.ts";
import { SkillMode } from "../../src/lib/skills/types.ts";

test("skills schema module keeps runtime schemas exported", () => {
  assert.equal(typeof SkillSchema.safeParse, "function");
  assert.equal(typeof SkillCreateInputSchema.safeParse, "function");
  assert.equal(typeof SkillUpdateInputSchema.safeParse, "function");
  assert.equal(typeof SkillConfigSchema.safeParse, "function");
});

test("SkillCreateInputSchema accepts a valid custom skill definition", () => {
  const result = SkillCreateInputSchema.safeParse({
    name: "memory-search",
    version: "1.2.3",
    description: "Search memory entries",
    schema: {
      input: { query: "string" },
      output: { results: "array" },
    },
    handler: "export default async function run() {}",
  });

  assert.equal(result.success, true);
});

test("SkillConfigSchema applies defaults for execution settings", () => {
  const result = SkillConfigSchema.safeParse({
    enabled: true,
    mode: SkillMode.HYBRID,
    allowedSkills: ["memory-search"],
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.timeout, 30000);
    assert.equal(result.data.maxRetries, 3);
  }
});
