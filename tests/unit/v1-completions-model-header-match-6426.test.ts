import test from "node:test";
import assert from "node:assert/strict";

import { echoModelInObject } from "../../open-sse/services/responseModelEcho.ts";

// #6426: on non-streaming success (including /v1/completions), the response body
// `model` field must equal the resolved backend model advertised in the
// `X-OmniRoute-Model` header. Some upstreams (notably legacy text-completions)
// return a body `model` that drifts from the id we advertised. chatCore now
// rewrites body.model to the resolved `model` before the optional #1311 echo,
// so strict clients can reconcile body ↔ header.

test("#6426 body.model rewritten to resolved backend model aligns with header value", () => {
  // simulate the non-streaming success path: header carries resolved model,
  // upstream body carries a drifted id.
  const resolvedModel = "gpt-5.5"; // this is what attachOmniRouteMetaHeaders wrote to X-OmniRoute-Model
  const translatedResponse: Record<string, unknown> = {
    id: "cmpl-1",
    object: "text_completion",
    model: "gpt-5.5-2026-06-preview", // upstream drifted alias
    choices: [{ text: "hi" }],
  };

  // the fix: rewrite body.model to the resolved id
  echoModelInObject(translatedResponse, resolvedModel);

  assert.equal(
    translatedResponse.model,
    resolvedModel,
    "body.model must equal the resolved backend model that is in X-OmniRoute-Model header"
  );
});

test("#6426 #1311 echo still wins when both alignments apply", () => {
  // when the user opts in to #1311 (echoRequestedModelName), the echo (alias/combo name)
  // wins because the #6426 alignment runs first and #1311 runs second.
  const resolvedModel = "gpt-5.5";
  const echoModel = "claude-sonnet-cx"; // client-requested alias
  const translatedResponse: Record<string, unknown> = {
    id: "cmpl-2",
    model: "gpt-5.5-drift",
    choices: [],
  };

  // step 1: #6426 aligns to resolved model
  echoModelInObject(translatedResponse, resolvedModel);
  // step 2: #1311 overrides with the client-requested alias
  echoModelInObject(translatedResponse, echoModel);

  assert.equal(translatedResponse.model, echoModel);
});

test("#6426 alignment is a no-op when resolved model is empty/null", () => {
  const translatedResponse: Record<string, unknown> = {
    id: "cmpl-3",
    model: "gpt-5.5",
    choices: [],
  };

  echoModelInObject(translatedResponse, null);
  assert.equal(translatedResponse.model, "gpt-5.5");

  echoModelInObject(translatedResponse, "");
  assert.equal(translatedResponse.model, "gpt-5.5");
});
