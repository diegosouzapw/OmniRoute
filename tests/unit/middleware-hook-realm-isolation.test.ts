/**
 * GHSA-9p9m-h9rj-rhhg — pre-request hook code must not reach the host realm.
 *
 * The old sandbox handed hook code the host `Object`, `Promise`, … and the live
 * `context`, so a hook could write the SERVER's `Object.prototype`
 * (`Object.prototype.env = { NODE_OPTIONS: "--require …" }`), which a later
 * `worker_threads` Worker inherited → code execution. Each case below is a way to reach
 * the host realm from hook code; none of them may leave a trace in the host.
 */
import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";

import {
  registerHook,
  runHooks,
  createHookContext,
  getHook,
  clearAllHooks,
} from "../../src/lib/middleware/registry.ts";
import { HookPriority, type HookConfig } from "../../src/lib/middleware/types.ts";

function hook(name: string, code: string): HookConfig {
  return {
    name,
    code,
    description: "realm isolation",
    priority: HookPriority.NORMAL,
    scope: { type: "global" },
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  };
}

function ctx(log?: { info: (t: string, m: string) => void }) {
  return createHookContext({
    body: { messages: [] },
    headers: { "x-test": "1" },
    model: "gpt-4o",
    log: log ? { info: log.info, warn: () => {}, error: () => {} } : undefined,
  });
}

const PROBES = ["__ghsa9p9mEnv", "__ghsa9p9mProto", "__ghsa9p9mCtor", "__ghsa9p9mArr"];

function hostPolluted(): string[] {
  const probe: Record<string, unknown> = {};
  return PROBES.filter((key) => key in probe || key in []);
}

beforeEach(() => clearAllHooks());
after(() => {
  clearAllHooks();
  for (const key of PROBES) {
    delete (Object.prototype as Record<string, unknown>)[key];
    delete (Array.prototype as unknown as Record<string, unknown>)[key];
  }
  delete (globalThis as Record<string, unknown>).__ghsa9p9mEscaped;
});

test("writing Object.prototype inside a hook does not pollute the server", async () => {
  registerHook(
    hook(
      "pollute-object",
      `Object.prototype.__ghsa9p9mEnv = { NODE_OPTIONS: "--require /tmp/x.js" };
       Array.prototype.__ghsa9p9mArr = 1;`
    )
  );
  await runHooks(ctx());
  assert.deepEqual(hostPolluted(), []);
  assert.equal(getHook("pollute-object")?.lastError, undefined, "the hook itself still runs");
});

test("reaching Object.prototype through the context object does not pollute the server", async () => {
  registerHook(
    hook(
      "pollute-via-context",
      `context.__proto__.__ghsa9p9mProto = 1;
       context.constructor.prototype.__ghsa9p9mCtor = 1;
       context.body.messages.constructor.prototype.__ghsa9p9mArr = 1;`
    )
  );
  await runHooks(ctx());
  assert.deepEqual(hostPolluted(), []);
});

test("the constructor-chain escape cannot compile code", async () => {
  registerHook(
    hook(
      "ctor-escape",
      `const F = this.constructor.constructor;
       return { body: { got: typeof F("return process")() } };`
    )
  );
  const { context } = await runHooks(ctx());
  assert.equal(context.body.got, undefined);
  assert.match(getHook("ctor-escape")?.lastError ?? "", /[Cc]ode generation from strings/);
});

test("a replaced Promise.prototype.then never receives a host function", async () => {
  registerHook(
    hook(
      "then-hijack",
      `Promise.prototype.then = function (resolve) {
         try { resolve.constructor("globalThis.__ghsa9p9mEscaped = true")(); } catch {}
       };
       return { model: "still-here" };`
    )
  );
  await runHooks(ctx());
  assert.equal((globalThis as Record<string, unknown>).__ghsa9p9mEscaped, undefined);
});

test("contract kept: in-place mutations, result merge and log lines reach the host", async () => {
  const lines: string[] = [];
  registerHook(
    hook(
      "contract",
      `context.body.injected = "yes";
       context.metadata.seen = true;
       context.log.info("HOOK", "ran for " + context.model);
       return { body: { added: true }, model: "gpt-4o-mini" };`
    )
  );
  const { context } = await runHooks(ctx({ info: (t, m) => lines.push(`${t}:${m}`) }));
  assert.equal(context.body.injected, "yes");
  assert.equal(context.body.added, true);
  assert.equal(context.model, "gpt-4o-mini");
  assert.equal(context.metadata.seen, true);
  assert.deepEqual(lines, ["HOOK:ran for gpt-4o"]);
});

test("a hook awaiting something that never settles fails instead of hanging", async () => {
  registerHook(hook("never-settles", `await new Promise(() => {}); return { model: "x" };`));
  const { context } = await runHooks(ctx());
  assert.equal(context.model, "gpt-4o");
  assert.match(getHook("never-settles")?.lastError ?? "", /did not finish/);
});
