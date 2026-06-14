/**
 * tests/unit/plugins-hook-payload-chaining-3286.test.ts
 *
 * Regression for #3286 — emitHookBlocking must CHAIN the payload between
 * handlers. Before the fix, every handler received the original static
 * `payload`, so plugin B could not observe plugin A's `body`/`metadata`
 * mutations (the accumulated mergedBody/mergedMetadata were only used for the
 * final return value, never fed forward to the next handler).
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  registerHook,
  emitHookBlocking,
  resetHooks,
} from "../../src/lib/plugins/hooks.ts";

test.afterEach(() => {
  resetHooks();
});

test("emitHookBlocking feeds each handler the body mutated by previous handlers", async () => {
  const seenByB: unknown[] = [];

  // Plugin A: rewrites the body.
  registerHook(
    "onRequest",
    "plugin-a",
    (p: unknown) => {
      const ctx = p as { body?: { value?: number } };
      return { body: { value: (ctx.body?.value ?? 0) + 1 } };
    },
    10
  );

  // Plugin B (lower priority → runs after A): records what body it received.
  registerHook(
    "onRequest",
    "plugin-b",
    (p: unknown) => {
      const ctx = p as { body?: { value?: number } };
      seenByB.push(ctx.body);
      return { body: { value: (ctx.body?.value ?? 0) + 1 } };
    },
    20
  );

  const result = await emitHookBlocking("onRequest", { body: { value: 0 } });

  // Plugin B must have seen plugin A's mutation ({value:1}), not the original {value:0}.
  assert.deepEqual(seenByB, [{ value: 1 }]);
  // Final merged body reflects BOTH handlers: 0 → 1 (A) → 2 (B).
  assert.deepEqual((result as { body?: { value?: number } }).body, { value: 2 });
});

test("emitHookBlocking chains metadata across handlers", async () => {
  let metadataSeenByB: Record<string, unknown> | undefined;

  registerHook(
    "onRequest",
    "meta-a",
    () => ({ metadata: { a: true } }),
    10
  );

  registerHook(
    "onRequest",
    "meta-b",
    (p: unknown) => {
      metadataSeenByB = (p as { metadata?: Record<string, unknown> }).metadata;
      return { metadata: { b: true } };
    },
    20
  );

  const result = await emitHookBlocking("onRequest", { body: {}, metadata: {} });

  // Plugin B sees plugin A's metadata.
  assert.equal(metadataSeenByB?.a, true);
  // Final metadata carries both.
  const meta = (result as { metadata?: Record<string, unknown> }).metadata;
  assert.equal(meta?.a, true);
  assert.equal(meta?.b, true);
});
