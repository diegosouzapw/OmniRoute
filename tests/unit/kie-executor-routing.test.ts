import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { KieExecutor } from "../../open-sse/executors/kie.ts";

test("KIE chat traffic uses the default executor while media keeps its task executor", () => {
  assert.equal(hasSpecializedExecutor("kie"), false);
  assert.ok(getExecutor("kie") instanceof DefaultExecutor);
  assert.equal(typeof KieExecutor, "function");
});
