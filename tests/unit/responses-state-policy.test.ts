import test from "node:test";
import assert from "node:assert/strict";

import {
  applyResponsesPreviousResponseIdPolicy,
  normalizeResponsesPreviousResponseIdMode,
  shouldStripPreviousResponseId,
} from "../../open-sse/utils/responsesStatePolicy.ts";

test("responses previous_response_id policy defaults to auto", () => {
  assert.equal(normalizeResponsesPreviousResponseIdMode(undefined), "auto");
  assert.equal(normalizeResponsesPreviousResponseIdMode("invalid"), "auto");
  assert.equal(normalizeResponsesPreviousResponseIdMode("strip"), "strip");
  assert.equal(normalizeResponsesPreviousResponseIdMode("preserve"), "preserve");
});

test("auto strips previous_response_id for stateless Responses upstreams", () => {
  const result = applyResponsesPreviousResponseIdPolicy(
    { model: "gpt-5.5", previous_response_id: "resp_prev_123", input: [] },
    { mode: "auto", sourceFormat: "openai-responses", targetFormat: "openai-responses" }
  );

  assert.equal(result.stripped, true);
  assert.equal((result.body as Record<string, unknown>).previous_response_id, undefined);
});

test("auto preserves previous_response_id when Responses storage is explicitly enabled", () => {
  const result = applyResponsesPreviousResponseIdPolicy(
    { model: "gpt-5.5", previous_response_id: "resp_prev_123", input: [] },
    {
      mode: "auto",
      sourceFormat: "openai-responses",
      targetFormat: "openai-responses",
      credentials: { providerSpecificData: { openaiStoreEnabled: true } },
    }
  );

  assert.equal(result.stripped, false);
  assert.equal((result.body as Record<string, unknown>).previous_response_id, "resp_prev_123");
});

test("strip and preserve modes override auto detection", () => {
  assert.equal(
    shouldStripPreviousResponseId({
      mode: "strip",
      sourceFormat: "openai",
      targetFormat: "openai",
    }),
    true
  );
  assert.equal(
    shouldStripPreviousResponseId({
      mode: "preserve",
      sourceFormat: "openai-responses",
      targetFormat: "openai-responses",
    }),
    false
  );
});

test("auto leaves unrelated non-Responses requests untouched", () => {
  const body = { model: "gpt-4o-mini", previous_response_id: "client-extra-field" };
  const result = applyResponsesPreviousResponseIdPolicy(body, {
    mode: "auto",
    sourceFormat: "openai",
    targetFormat: "openai",
  });

  assert.equal(result.body, body);
  assert.equal(result.stripped, false);
});
