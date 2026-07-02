import { test } from "node:test";
import assert from "node:assert/strict";
import { getUnsupportedParams } from "../../open-sse/config/providerRegistry.ts";

// Regression guard for `TypeError: entry.models is not iterable`.
//
// A registry entry can legitimately have no static model catalogue — e.g. the
// `mimocode` proxy provider, whose `models` is `undefined`. The byModelId map
// builder already tolerates this (`if (entry.models && entry.models.length > 0)`),
// but `getUnsupportedParams` had two unguarded accesses:
//   - `ensureUnsupportedParamsPopulated()` iterated `entry.models` for EVERY entry,
//   - the per-provider lookup did `entry?.models.find(...)`.
// Either one threw on the first call once a model-less entry existed, which made
// `handleChatCore` report "All models failed" for unrelated requests.

test("getUnsupportedParams does not throw when a registry entry has no models (mimocode regression)", () => {
  // This call triggers ensureUnsupportedParamsPopulated() which walks ALL entries.
  assert.doesNotThrow(() => getUnsupportedParams("openai", "gpt-4o"));
});

test("getUnsupportedParams returns [] for a model-less proxy provider", () => {
  assert.deepEqual(getUnsupportedParams("mimocode", "anything"), []);
});
