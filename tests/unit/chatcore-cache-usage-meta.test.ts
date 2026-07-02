// tests/unit/chatcore-cache-usage-meta.test.ts
// Characterization of toPositiveNumber / buildCacheUsageLogMeta / attachLogMeta — cache-usage log
// meta helpers extracted from handleChatCore (chatCore god-file decomposition, #3501). Locks: the
// positive-number coercion, the cache-token derivation across top-level and prompt_tokens_details
// shapes (null when no cache fields), and the _omniroute meta attachment/merge.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  toPositiveNumber,
  buildCacheUsageLogMeta,
  attachLogMeta,
} from "../../open-sse/handlers/chatCore/cacheUsageMeta.ts";

test("toPositiveNumber keeps finite positives, zeros everything else", () => {
  assert.equal(toPositiveNumber(5), 5);
  assert.equal(toPositiveNumber(0), 0);
  assert.equal(toPositiveNumber(-3), 0);
  assert.equal(toPositiveNumber(Infinity), 0);
  assert.equal(toPositiveNumber("5"), 0);
  assert.equal(toPositiveNumber(null), 0);
});

test("buildCacheUsageLogMeta returns null when there are no cache fields", () => {
  assert.equal(buildCacheUsageLogMeta(null), null);
  assert.equal(buildCacheUsageLogMeta({ prompt_tokens: 10 }), null);
});

test("buildCacheUsageLogMeta reads top-level cache fields", () => {
  const meta = buildCacheUsageLogMeta({
    cache_read_input_tokens: 12,
    cache_creation_input_tokens: 4,
  });
  assert.deepEqual(meta, { cacheReadTokens: 12, cacheCreationTokens: 4 });
});

test("buildCacheUsageLogMeta reads prompt_tokens_details shapes", () => {
  const meta = buildCacheUsageLogMeta({
    prompt_tokens_details: { cached_tokens: 7, cache_creation_tokens: 2 },
  });
  assert.deepEqual(meta, { cacheReadTokens: 7, cacheCreationTokens: 2 });
});

test("attachLogMeta returns the payload untouched when meta is empty", () => {
  const payload = { a: 1 };
  assert.equal(attachLogMeta(payload, null), payload);
  assert.equal(attachLogMeta(payload, {}), payload);
  assert.equal(attachLogMeta(payload, { x: null, y: undefined }), payload);
});

test("attachLogMeta merges compact meta into _omniroute", () => {
  const out = attachLogMeta({ a: 1, _omniroute: { keep: true } }, { added: 2, drop: null });
  assert.deepEqual(out, { a: 1, _omniroute: { keep: true, added: 2 } });
});

test("attachLogMeta wraps non-object payloads", () => {
  const out = attachLogMeta(null, { added: 2 });
  assert.deepEqual(out, { _omniroute: { added: 2 }, _payload: null });
});
