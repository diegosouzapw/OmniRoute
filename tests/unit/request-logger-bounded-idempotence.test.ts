// cloneBoundedForLog must be idempotent (#7847).
//
// Since buildClientRawRequest now bounds the body at the entry point, the request logger applies
// cloneBoundedForLog to an ALREADY bounded value. If the second pass were not a no-op, the
// persisted log payload would change shape versus before the fix — and it did not used to be:
//
//   arrays  : [marker, ...24 items] is 25 entries, over the 24 limit, so a second pass dropped
//             the marker plus one real item and rewrote originalLength as 25 instead of 800.
//   objects : 80 keys + _omniroute_truncated_keys is 81, so a second pass evicted a real key to
//             make room and reported 1 dropped instead of the true count.
//   strings : the truncation marker was appended AFTER slicing to maxLength, so the "bounded"
//             string was longer than the bound and got truncated again.
import { test } from "node:test";
import assert from "node:assert/strict";

const { cloneBoundedForLog, MAX_LOG_ARRAY_ITEMS } = await import(
  "../../open-sse/utils/requestLogger.ts"
);

const MAX_KEYS = 80;
const MAX_STRING = 64 * 1024;

test("arrays: second pass preserves the marker, the tail, and the true originalLength", () => {
  const input = { messages: Array.from({ length: 800 }, (_, i) => ({ role: "user", n: i })) };
  const once = cloneBoundedForLog(input) as { messages: Record<string, unknown>[] };
  const twice = cloneBoundedForLog(once) as { messages: Record<string, unknown>[] };

  assert.deepEqual(twice, once, "re-bounding must be a no-op");
  assert.equal(twice.messages.length, MAX_LOG_ARRAY_ITEMS + 1, "marker plus the retained tail");
  assert.equal(
    twice.messages[0].originalLength,
    800,
    "originalLength must keep describing the ORIGINAL array, not the bounded one"
  );
  // The tail must still be the last items of the real history, not shifted by the marker.
  assert.equal((twice.messages.at(-1) as { n: number }).n, 799);
});

test("objects: second pass keeps the real keys and the true dropped count", () => {
  const input = Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`k${i}`, i]));
  const once = cloneBoundedForLog(input) as Record<string, unknown>;
  const twice = cloneBoundedForLog(once) as Record<string, unknown>;

  assert.deepEqual(twice, once, "re-bounding must be a no-op");
  assert.equal(once._omniroute_truncated_keys, 20, "100 keys minus the 80 retained");
  assert.equal(twice._omniroute_truncated_keys, 20, "the dropped count must not be recomputed");
  assert.equal(
    Object.keys(twice).filter((k) => k !== "_omniroute_truncated_keys").length,
    MAX_KEYS,
    "a real key must not be evicted to make room for the marker"
  );
});

test("strings: the bounded result respects the bound, so a second pass is a no-op", () => {
  const once = cloneBoundedForLog("x".repeat(200_000)) as string;
  const twice = cloneBoundedForLog(once) as string;

  assert.equal(twice, once, "re-bounding must be a no-op");
  assert.ok(
    once.length <= MAX_STRING,
    `bounded string is ${once.length} chars, over the ${MAX_STRING} bound — the marker must fit inside the budget`
  );
  assert.match(once, /\[\.\.\.truncated \d+ chars\.\.\.\]/);
});

test("values already within the bounds are returned unchanged", () => {
  const input = { model: "m", messages: [{ role: "user", content: "hi" }], n: 1, ok: true };
  assert.deepEqual(cloneBoundedForLog(input), input);
  assert.deepEqual(cloneBoundedForLog(cloneBoundedForLog(input)), input);
});

test("the tools exemption survives re-bounding", () => {
  // tools are deliberately exempt from array truncation (debug-critical inventory); a second
  // pass must not start truncating them.
  const input = { tools: Array.from({ length: 200 }, (_, i) => ({ name: `tool_${i}` })) };
  const once = cloneBoundedForLog(input) as { tools: unknown[] };
  const twice = cloneBoundedForLog(once) as { tools: unknown[] };

  assert.equal(once.tools.length, 200, "tools must not be truncated");
  assert.equal(twice.tools.length, 200, "and must stay untruncated on a second pass");
  assert.deepEqual(twice, once);
});

test("nested structures stay stable across repeated bounding", () => {
  const input = {
    messages: Array.from({ length: 50 }, (_, i) => ({
      role: "user",
      content: "y".repeat(100_000),
      meta: Object.fromEntries(Array.from({ length: 90 }, (_, k) => [`m${k}`, `${i}-${k}`])),
    })),
  };
  const once = cloneBoundedForLog(input);
  assert.deepEqual(cloneBoundedForLog(once), once);
  assert.deepEqual(cloneBoundedForLog(cloneBoundedForLog(once)), once, "stable under repetition");
});
