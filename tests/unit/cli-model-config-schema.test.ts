import test from "node:test";
import assert from "node:assert/strict";

import { cliModelConfigSchema } from "../../src/shared/validation/schemas.ts";

test("cliModelConfigSchema accepts Codex xhigh reasoning effort", () => {
  const result = cliModelConfigSchema.safeParse({
    baseUrl: "http://localhost:20128/api/v1",
    apiKey: "sk_omniroute",
    model: "gpt-5.5",
    reasoningEffort: "xhigh",
    wireApi: "responses",
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.reasoningEffort, "xhigh");
  }
});
