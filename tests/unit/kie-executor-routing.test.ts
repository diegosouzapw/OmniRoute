import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { getKieTaskId, KieExecutor } from "../../open-sse/executors/kie.ts";

test("KIE chat traffic uses the default executor while media keeps its task executor", () => {
  assert.equal(hasSpecializedExecutor("kie"), false);
  assert.ok(getExecutor("kie") instanceof DefaultExecutor);
  assert.equal(typeof KieExecutor, "function");
});

test("KIE task id extraction safely rejects non-object responses", () => {
  for (const value of [null, undefined, "task-id", 123, true, []]) {
    assert.equal(getKieTaskId(value), null);
  }
});

test("KIE task id extraction accepts nested and top-level ids", () => {
  assert.equal(getKieTaskId({ data: { taskId: "nested-id" } }), "nested-id");
  assert.equal(getKieTaskId({ taskId: 123 }), "123");
});
