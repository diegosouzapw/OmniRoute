/**
 * Regression guard for issue #5872 — operator-authored pre-request hook code
 * must execute inside a hardened Node `vm` sandbox (minimal context, no ambient
 * globals / process.env, execution timeout, no require) instead of
 * `new Function()` running with full main-process authority.
 *
 * Closes the Hard Rule #3 / SonarCloud S1523 exposure.
 */

import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";

import {
  registerHook,
  updateHook,
  runHooks,
  createHookContext,
  getHook,
  clearAllHooks,
} from "../../src/lib/middleware/registry.ts";
import { HookPriority, type HookConfig } from "../../src/lib/middleware/types.ts";

function baseConfig(overrides: Partial<HookConfig> & Pick<HookConfig, "name" | "code">): HookConfig {
  return {
    description: "test hook",
    priority: HookPriority.NORMAL,
    scope: { type: "global" },
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
    ...overrides,
  };
}

function ctx() {
  return createHookContext({
    body: { messages: [] },
    headers: {},
    model: "gpt-4o",
  });
}

beforeEach(() => {
  clearAllHooks();
});

after(() => {
  clearAllHooks();
});

test("(a) valid hook compiles, runs in sandbox, and returns a HookResult applied to context", async () => {
  registerHook(
    baseConfig({
      name: "valid-hook",
      code: `
        context.body.injected = "yes";
        return { body: { added: true }, model: "gpt-4o-mini" };
      `,
    })
  );

  const { context } = await runHooks(ctx());

  // Result body/model merged by runHooks.
  assert.equal(context.body.added, true);
  assert.equal(context.model, "gpt-4o-mini");
  // Direct context mutation also visible.
  assert.equal(context.body.injected, "yes");
  assert.equal(getHook("valid-hook")?.lastError, undefined);
});

test("(b) hook cannot reach ambient authority: process / require / globalThis are undefined", async () => {
  registerHook(
    baseConfig({
      name: "no-ambient-hook",
      code: `
        return {
          body: {
            typeofProcess: typeof process,
            typeofRequire: typeof require,
            typeofFetch: typeof fetch,
            // globalThis inside a vm context is the sandbox itself — it must
            // not expose host ambient authority.
            globalHasProcess: typeof globalThis.process,
            globalHasRequire: typeof globalThis.require,
          },
        };
      `,
    })
  );

  const { context } = await runHooks(ctx());

  assert.equal(context.body.typeofProcess, "undefined");
  assert.equal(context.body.typeofRequire, "undefined");
  assert.equal(context.body.typeofFetch, "undefined");
  assert.equal(context.body.globalHasProcess, "undefined");
  assert.equal(context.body.globalHasRequire, "undefined");
  assert.equal(getHook("no-ambient-hook")?.lastError, undefined);
});

test("(b') hook attempting to read process.env throws inside the sandbox (no leak)", async () => {
  process.env.__SECRET_5872 = "top-secret";
  try {
    registerHook(
      baseConfig({
        name: "env-read-hook",
        code: `return { body: { stolen: process.env.__SECRET_5872 } };`,
      })
    );

    const { context } = await runHooks(ctx());

    // The hook throws (process is undefined) → runHooks records the error and
    // never applies a body, so the secret cannot leak into the request.
    assert.equal(context.body.stolen, undefined);
    const err = getHook("env-read-hook")?.lastError ?? "";
    assert.match(err, /process is not defined/);
  } finally {
    delete process.env.__SECRET_5872;
  }
});

test("(c) runaway synchronous hook is aborted by the execution timeout", async () => {
  registerHook(
    baseConfig({
      name: "runaway-hook",
      code: `while (true) {}`,
    })
  );

  const { context } = await runHooks(ctx());

  // runHooks catches the timeout error, records it, and leaves the context
  // untouched instead of hanging the process.
  const err = getHook("runaway-hook")?.lastError ?? "";
  assert.match(err, /timed out|Script execution timed out/);
  assert.equal(context.model, "gpt-4o");
});

test("(d) recompilation on update reuses the cached middleware and runs the new code", async () => {
  registerHook(
    baseConfig({
      name: "recompile-hook",
      code: `return { body: { version: 1 } };`,
    })
  );

  let out = await runHooks(ctx());
  assert.equal(out.context.body.version, 1);

  // Update code → recompile. The Map entry is replaced once, and subsequent
  // runs reuse the same compiled closure (no per-request recompilation).
  const updated = updateHook("recompile-hook", { code: `return { body: { version: 2 } };` });
  assert.equal(updated, true);

  out = await runHooks(ctx());
  assert.equal(out.context.body.version, 2);

  // Cached closure is stable across repeated invocations.
  out = await runHooks(ctx());
  assert.equal(out.context.body.version, 2);
});
