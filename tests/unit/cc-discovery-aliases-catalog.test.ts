import { test } from "node:test";
import assert from "node:assert/strict";

import { buildCcAliasPredicate } from "../../src/app/api/v1/models/ccAliasPredicate.ts";

test("global off + provider on: only that provider's entries are eligible", () => {
  const predicate = buildCcAliasPredicate({
    global: false,
    providers: new Map([["kimi", "on"]]),
    models: new Map(),
  });
  assert.equal(predicate({ id: "kimi/kimi-k2.6", owned_by: "kimi" }), true);
  assert.equal(predicate({ id: "openai/gpt-5.6", owned_by: "openai" }), false);
});

test("model 'off' wins over provider 'on'", () => {
  const predicate = buildCcAliasPredicate({
    global: false,
    providers: new Map([["kimi", "on"]]),
    models: new Map([["kimi/kimi-k2.6", "off"]]),
  });
  assert.equal(predicate({ id: "kimi/kimi-k2.6", owned_by: "kimi" }), false);
  // sibling model under the same provider is unaffected by the model-level override
  assert.equal(predicate({ id: "kimi/kimi-k2.5", owned_by: "kimi" }), true);
});

test("model 'on' wins over provider 'off' and global false", () => {
  const predicate = buildCcAliasPredicate({
    global: false,
    providers: new Map([["kimi", "off"]]),
    models: new Map([["kimi/kimi-k2.6", "on"]]),
  });
  assert.equal(predicate({ id: "kimi/kimi-k2.6", owned_by: "kimi" }), true);
});

test("combo: provider-level virtual key 'combo' set on makes combo entries eligible", () => {
  const predicate = buildCcAliasPredicate({
    global: false,
    providers: new Map([["combo", "on"]]),
    models: new Map(),
  });
  assert.equal(predicate({ id: "custo-otimizado", owned_by: "combo" }), true);
});

test("combo: model-level key 'combo/<name>' off wins over provider 'on' and global true", () => {
  const predicate = buildCcAliasPredicate({
    global: true,
    providers: new Map([["combo", "on"]]),
    models: new Map([["combo/custo-otimizado", "off"]]),
  });
  assert.equal(predicate({ id: "custo-otimizado", owned_by: "combo" }), false);
  // sibling combo unaffected
  assert.equal(predicate({ id: "outro-combo", owned_by: "combo" }), true);
});

test("entry without '/' that is not a combo follows the global flag only", () => {
  const onPredicate = buildCcAliasPredicate({
    global: true,
    providers: new Map(),
    models: new Map(),
  });
  assert.equal(onPredicate({ id: "bareModelId", owned_by: "someProvider" }), true);

  const offPredicate = buildCcAliasPredicate({
    global: false,
    providers: new Map(),
    models: new Map(),
  });
  assert.equal(offPredicate({ id: "bareModelId", owned_by: "someProvider" }), false);
});

test("model id containing extra slashes: split only on the first '/'", () => {
  const predicate = buildCcAliasPredicate({
    global: false,
    providers: new Map(),
    models: new Map([["openrouter/anthropic/claude-fable-5", "on"]]),
  });
  assert.equal(
    predicate({ id: "openrouter/anthropic/claude-fable-5", owned_by: "openrouter" }),
    true
  );
});

test("non-string or empty id is never eligible", () => {
  const predicate = buildCcAliasPredicate({
    global: true,
    providers: new Map(),
    models: new Map(),
  });
  assert.equal(predicate({ id: undefined }), false);
  assert.equal(predicate({ id: "" }), false);
  assert.equal(predicate({ id: 42 as unknown as string }), false);
});

test("global on, no overrides at all: everything is eligible", () => {
  const predicate = buildCcAliasPredicate({
    global: true,
    providers: new Map(),
    models: new Map(),
  });
  assert.equal(predicate({ id: "kimi/kimi-k2.6", owned_by: "kimi" }), true);
  assert.equal(predicate({ id: "custo-otimizado", owned_by: "combo" }), true);
});
