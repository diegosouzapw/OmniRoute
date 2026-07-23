/**
 * #2463 — parseModel must not crash on a non-string truthy input.
 *
 * The NVIDIA NIM investigation (Part C) showed parseModel({}) threw
 * `cleanStr.endsWith is not a function`: the `if (!modelStr)` guard only catches
 * falsy values (null/undefined/""), so a truthy non-string (object/number/array
 * — e.g. a malformed combo `modelStr` or providerSpecificData saved as an object
 * by a UI bug) reached `cleanStr.endsWith("[1m]")` and crashed. Same class of bug
 * as #2359 (combo modelStr) and the proxyFetch errCode crash.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { parseModel } from "../../open-sse/services/model.ts";

test("#2463 — parseModel returns a null result (no throw) for an object", () => {
  assert.doesNotThrow(() => parseModel({} as never));
  const parsed = parseModel({} as never);
  assert.equal(parsed.provider, null);
  assert.equal(parsed.model, null);
  assert.equal(parsed.isAlias, false);
});

test("#2463 — parseModel does not throw for number / array inputs", () => {
  assert.doesNotThrow(() => parseModel(123 as never));
  assert.doesNotThrow(() => parseModel(["nvidia/foo"] as never));
});

test("parseModel still parses a normal provider/model string unchanged", () => {
  const parsed = parseModel("nvidia/openai/gpt-oss-120b");
  assert.equal(parsed.provider, "nvidia");
  assert.equal(parsed.model, "openai/gpt-oss-120b");
});
