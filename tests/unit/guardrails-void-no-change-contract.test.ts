import test from "node:test";
import assert from "node:assert/strict";

import { BaseGuardrail, GuardrailRegistry } from "../../src/lib/guardrails/index.ts";

/**
 * `docs/security/GUARDRAILS.md`: "A guardrail signals 'no change' by returning
 * either `void`, `{}`, or ...".
 *
 * The `void` arm of that contract had no test — `guardrails-registry.test.ts`
 * covers guardrails that return a result and one that throws, but never one
 * that simply returns nothing. These tests pin it, because the registry's
 * dispatch reads the return value's properties and must keep treating "nothing"
 * as a clean pass rather than a block or a modification.
 */

class SilentGuardrail extends BaseGuardrail {
  constructor(name = "silent") {
    super(name, { priority: 10 });
  }

  override async preCall() {
    // no return — the documented "no change" signal
  }

  override async postCall() {
    // no return — the documented "no change" signal
  }
}

class EmptyResultGuardrail extends BaseGuardrail {
  constructor(name = "empty") {
    super(name, { priority: 10 });
  }

  override async preCall() {
    return {};
  }

  override async postCall() {
    return {};
  }
}

test("a preCall returning nothing passes the payload through untouched", async () => {
  const registry = new GuardrailRegistry();
  registry.register(new SilentGuardrail());

  const payload = { messages: [{ role: "user", content: "hello" }] };
  const result = await registry.runPreCallHooks(payload, {});

  assert.equal(result.blocked, false, "returning nothing must not block");
  assert.deepEqual(result.payload, payload, "payload must be forwarded unchanged");

  const execution = result.results[0];
  assert.equal(execution?.guardrail, "silent");
  assert.equal(execution?.blocked, false);
  assert.equal(execution?.modified, false, "nothing returned means nothing modified");
  assert.equal(execution?.skipped, false, "the guardrail ran — it is not 'skipped'");
  assert.equal(execution?.error, undefined, "a silent pass is not an error");
  assert.equal(execution?.stage, "pre");
});

test("a postCall returning nothing passes the response through untouched", async () => {
  const registry = new GuardrailRegistry();
  registry.register(new SilentGuardrail());

  const response = { choices: [{ message: { content: "hi" } }] };
  const result = await registry.runPostCallHooks(response, {});

  assert.equal(result.blocked, false);
  assert.deepEqual(result.response, response);

  const execution = result.results[0];
  assert.equal(execution?.modified, false);
  assert.equal(execution?.skipped, false);
  assert.equal(execution?.error, undefined);
  assert.equal(execution?.stage, "post");
});

test("returning an empty object behaves identically to returning nothing", async () => {
  const payload = { messages: [{ role: "user", content: "hello" }] };

  const silent = new GuardrailRegistry();
  silent.register(new SilentGuardrail("g"));
  const silentResult = await silent.runPreCallHooks(payload, {});

  const empty = new GuardrailRegistry();
  empty.register(new EmptyResultGuardrail("g"));
  const emptyResult = await empty.runPreCallHooks(payload, {});

  assert.deepEqual(
    silentResult.results,
    emptyResult.results,
    "the two documented no-change signals must produce the same execution record"
  );
  assert.deepEqual(silentResult.payload, emptyResult.payload);
});

test("a silent guardrail does not stop later guardrails from modifying", async () => {
  class AppendGuardrail extends BaseGuardrail {
    constructor() {
      super("append", { priority: 20 });
    }

    override async preCall(payload: unknown) {
      return { modifiedPayload: { ...(payload as Record<string, unknown>), seen: true } };
    }
  }

  const registry = new GuardrailRegistry();
  registry.register(new SilentGuardrail());
  registry.register(new AppendGuardrail());

  const result = await registry.runPreCallHooks({ messages: [] }, {});

  assert.equal((result.payload as Record<string, unknown>).seen, true);
  assert.equal(result.results.length, 2);
  assert.equal(result.results[0]?.modified, false, "silent guardrail ran first, modified nothing");
  assert.equal(result.results[1]?.modified, true, "the later guardrail still applied");
});
