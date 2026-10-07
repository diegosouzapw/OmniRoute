import "./_helpers/modelValidationEnvironment.ts";
import assert from "node:assert/strict";
import test from "node:test";
import { withPluginExecutionGuard } from "../../src/lib/plugins/executionGuard.ts";
import { createValidationPluginFence } from "../../src/lib/modelValidation/pluginFence.ts";
import {
  emitHook,
  emitHookBlocking,
  registerHook,
  runOnResponse,
  unregisterHooks,
} from "../../src/lib/plugins/hooks.ts";

test("request guard blocks every plugin handler without altering unguarded traffic", async () => {
  let calls = 0;
  let violations = 0;
  registerHook("onResponse", "validation-guard", () => {
    calls++;
  });
  const guard = {
    assertIdle() {},
    reject(): never {
      violations++;
      throw new Error("strict plugin fence");
    },
  };
  const context = { requestId: "test", provider: "openai", model: "test", body: {}, metadata: {} };
  try {
    for (const run of [
      () => emitHook("onResponse", {}),
      () => emitHookBlocking("onResponse", {}),
      () => runOnResponse(context, {}),
    ]) {
      await assert.rejects(() => withPluginExecutionGuard(guard, run), /strict plugin fence/);
    }
    assert.equal(calls, 0);
    assert.equal(violations, 3);
    await emitHook("onResponse", {});
    await emitHookBlocking("onResponse", {});
    await runOnResponse(context, {});
    assert.equal(calls, 3);
  } finally {
    unregisterHooks("validation-guard");
  }
});

test("delayed request work retains its guard after the operation returns", async () => {
  let calls = 0;
  let release: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  let late: Promise<void>;
  const guard = {
    assertIdle() {},
    reject(): never {
      throw new Error("late strict plugin fence");
    },
  };
  withPluginExecutionGuard(guard, () => {
    late = pending.then(() => emitHook("onResponse", {}));
  });
  registerHook("onResponse", "validation-late-guard", () => {
    calls++;
  });
  try {
    release();
    await assert.rejects(() => late, /late strict plugin fence/);
    assert.equal(calls, 0);
  } finally {
    unregisterHooks("validation-late-guard");
  }
});

test("a swallowed hook rejection stays latched after the plugin is unregistered", async () => {
  const fence = createValidationPluginFence();
  fence.assertIdle();
  let calls = 0;
  registerHook("onError", "validation-swallowed", () => {
    calls++;
  });
  try {
    await withPluginExecutionGuard(fence, () => emitHook("onError", {})).catch(() => {});
  } finally {
    unregisterHooks("validation-swallowed");
  }
  assert.equal(calls, 0);
  assert.throws(() => fence.assertIdle(), { code: "VALIDATION_PLUGINS_UNSUPPORTED" });
});
