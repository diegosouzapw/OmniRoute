// Regression tests for the Gemini tier-suffix 404 (custom model alias case).
//
// Scenario: an operator defines a custom model `gemini-3.7-flash-high` on the
// `gemini` provider and a payload override that rewrites `model` to the real
// upstream id `gemini-3.7-flash` plus injects the thinking config. chatCore's
// prepareUpstreamBody() applies the override to the BODY, but the executor was
// handed the ORIGINAL alias as `model` and buildUrl() interpolates `model`
// into the URL path:
//
//   URL:  /v1beta/models/gemini-3.7-flash-high:streamGenerateContent  ← 404
//   body: { model: "gemini-3.7-flash", ... }                          ← correct
//
// The fix: DefaultExecutor keeps URL and body in lockstep — when the
// payload-rule-prepared body carries a rewritten `model`, the URL is built
// from the body's model id instead of the alias.

import { test } from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const CREDENTIALS = { apiKey: "test-key" } as never;

test("gemini buildUrl uses the payload-rule-rewritten body model, not the alias", () => {
  const executor = new DefaultExecutor("gemini");
  const body = {
    // prepareUpstreamBody() already rewrote the alias to the real id.
    model: "gemini-3.7-flash",
  };
  const url = executor.buildUrlForBody(
    "gemini-3.7-flash-high", // the alias the executor received
    body,
    true,
    0,
    CREDENTIALS
  );
  assert.equal(
    url,
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:streamGenerateContent?alt=sse"
  );
});

test("gemini buildUrl keeps the executor model when the body model matches", () => {
  const executor = new DefaultExecutor("gemini");
  const url = executor.buildUrlForBody(
    "gemini-3.7-flash",
    { model: "gemini-3.7-flash" },
    false,
    0,
    CREDENTIALS
  );
  assert.equal(
    url,
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent"
  );
});

test("gemini buildUrlForBody falls back to the executor model when the body has no model", () => {
  const executor = new DefaultExecutor("gemini");
  const url = executor.buildUrlForBody("gemini-3.7-flash", { contents: [] }, false, 0, CREDENTIALS);
  assert.equal(
    url,
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent"
  );
});

test("gemini execute() fetches the rewritten body.model, not the alias", async () => {
  const executor = new DefaultExecutor("gemini");
  const originalFetch = globalThis.fetch;
  const seen: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request) => {
    seen.push(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
    return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "gemini-3.7-flash-high",
      body: {
        model: "gemini-3.7-flash",
        contents: [{ role: "user", parts: [{ text: "hi" }] }],
      },
      stream: true,
      credentials: CREDENTIALS,
    } as never);
    const captured = result && typeof result === "object" && "url" in result ? result.url : undefined;
    assert.match(
      String(captured || seen[0] || ""),
      /\/models\/gemini-3\.7-flash:streamGenerateContent/
    );
    assert.doesNotMatch(String(captured || seen[0] || ""), /gemini-3\.7-flash-high/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
