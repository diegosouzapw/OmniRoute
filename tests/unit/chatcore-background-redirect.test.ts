// tests/unit/chatcore-background-redirect.test.ts
// Characterization of resolveBackgroundTaskRedirect — the Background Task Redirection (T41)
// decision extracted from handleChatCore (chatCore god-file decomposition, #3501). Decides whether
// a request should be downgraded to a cheaper model: only when the feature is enabled, the request
// looks like a background task, AND the model has a degradation mapping. The handler keeps the
// effects (log, model/body mutation, audit). Uses the real backgroundTaskDetector config via its
// setter so the decision is exercised end-to-end.
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { resolveBackgroundTaskRedirect } from "../../open-sse/handlers/chatCore/backgroundRedirect.ts";
import { setBackgroundDegradationConfig } from "../../open-sse/services/backgroundTaskDetector.ts";

afterEach(() => {
  setBackgroundDegradationConfig({ enabled: false, degradationMap: {} });
});

test("disabled config → no detection, no redirect (even for a clear background task)", () => {
  setBackgroundDegradationConfig({ enabled: false, degradationMap: { "gpt-5": "gpt-5-mini" } });
  assert.deepEqual(
    resolveBackgroundTaskRedirect({ body: { max_tokens: 10 }, headers: null, model: "gpt-5" }),
    { backgroundReason: null, redirect: null }
  );
});

test("enabled + low-max-tokens background + mapped model → detection + redirect", () => {
  setBackgroundDegradationConfig({ enabled: true, degradationMap: { "gpt-5": "gpt-5-mini" } });
  const r = resolveBackgroundTaskRedirect({
    body: { max_tokens: 10 },
    headers: null,
    model: "gpt-5",
  });
  assert.deepEqual(r, {
    backgroundReason: "low_max_tokens",
    redirect: { degradedModel: "gpt-5-mini", reason: "low_max_tokens" },
  });
});

test("enabled + x-task-type:background header → reason header_background", () => {
  setBackgroundDegradationConfig({ enabled: true, degradationMap: { "gpt-5": "gpt-5-mini" } });
  const r = resolveBackgroundTaskRedirect({
    body: { messages: [{ role: "user", content: "hi" }] },
    headers: { "x-task-type": "background" },
    model: "gpt-5",
  });
  assert.deepEqual(r, {
    backgroundReason: "header_background",
    redirect: { degradedModel: "gpt-5-mini", reason: "header_background" },
  });
});

test("enabled but the request is not a background task → no detection, no redirect", () => {
  setBackgroundDegradationConfig({ enabled: true, degradationMap: { "gpt-5": "gpt-5-mini" } });
  assert.deepEqual(
    resolveBackgroundTaskRedirect({
      body: { max_tokens: 4096, messages: [{ role: "user", content: "write an essay" }] },
      headers: null,
      model: "gpt-5",
    }),
    { backgroundReason: null, redirect: null }
  );
});

test("enabled + background but the model has no degradation mapping → detection but no redirect", () => {
  setBackgroundDegradationConfig({ enabled: true, degradationMap: { "gpt-5": "gpt-5-mini" } });
  assert.deepEqual(
    resolveBackgroundTaskRedirect({ body: { max_tokens: 10 }, headers: null, model: "claude-opus-4" }),
    { backgroundReason: "low_max_tokens", redirect: null }
  );
});
