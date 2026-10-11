import test from "node:test";
import assert from "node:assert/strict";
import { isExplicitModelCapacityFailure } from "../../open-sse/services/accountFallback/perModelFailureScope.ts";

test("#15788 only explicit current-model capacity/timeout narrows the failure scope", () => {
  const model = "qwen/qwen3.8-27b";
  assert.equal(
    isExplicitModelCapacityFailure(
      413,
      `Request too large for model \`${model}\` on service tier on_demand`,
      model
    ),
    true
  );
  for (const suffix of ["-other", ".other", ":free", "/other"]) {
    assert.equal(
      isExplicitModelCapacityFailure(413, `Request too large for model ${model}${suffix}`, model),
      false
    );
  }
  assert.equal(isExplicitModelCapacityFailure(413, "Payload too large", model), false);
  assert.equal(
    isExplicitModelCapacityFailure(413, `Request too large for model ${model}-other`, model),
    false
  );
  assert.equal(
    isExplicitModelCapacityFailure(413, "Request too large for model other", model),
    false
  );
  assert.equal(isExplicitModelCapacityFailure(504, "Gateway timeout", model), false);
  assert.equal(
    isExplicitModelCapacityFailure(
      504,
      `Fetch timeout after 110000ms on https://example.invalid/models/${model}:streamGenerateContent`,
      model
    ),
    true
  );
  assert.equal(
    isExplicitModelCapacityFailure(
      504,
      "Fetch timeout on https://example.invalid/models/other:streamGenerateContent",
      model
    ),
    false
  );
  assert.equal(
    isExplicitModelCapacityFailure(
      504,
      `Fetch timeout on https://example.invalid/models/${model}:streamGenerateContent?alt=sse`,
      model
    ),
    true
  );
  assert.equal(
    isExplicitModelCapacityFailure(
      504,
      `Fetch timeout on https://example.invalid/models/${model}-other:streamGenerateContent?alt=sse`,
      model
    ),
    false
  );
  assert.equal(isExplicitModelCapacityFailure(504, `Model ${model}:other timed out`, model), false);
  assert.equal(isExplicitModelCapacityFailure(504, `Model ${model} timed out`, model), true);
  assert.equal(isExplicitModelCapacityFailure(503, `Model ${model} timed out`, model), false);
  assert.equal(isExplicitModelCapacityFailure(504, `Model ${model} timed out`, null), false);
});
