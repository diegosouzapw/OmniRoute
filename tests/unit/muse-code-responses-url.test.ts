import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// Native muse-code OAuth connections persist providerSpecificData.baseUrl from the
// mint response ("https://api.meta.ai/v1"). The custom-baseUrl branch normalized
// that to /chat/completions while chatCore sent a Responses body (registry
// targetFormat openai-responses), so Meta rejected every request with
// "unknown parameter `input`" / "unknown parameter `include`". The release tip fixed
// the URL in DefaultExecutor.buildUrl's `case "muse-code"` (#15576); these cases keep
// guarding that behavior after #15567 dropped its own duplicate URL rewrite.

const museCredentials = {
  accessToken: "minted-key",
  providerSpecificData: { baseUrl: "https://api.meta.ai/v1" },
};

test("muse-code Responses models with a stored baseUrl route to /responses", () => {
  const executor = new DefaultExecutor("muse-code");
  for (const model of ["muse-spark-1.3", "muse-spark-1.2-contributor", "llama-4-maverick"]) {
    assert.equal(
      executor.buildUrl(model, true, 0, museCredentials),
      "https://api.meta.ai/v1/responses",
      model
    );
  }
});

test("muse-code without a stored baseUrl keeps the registry Responses endpoint", () => {
  const executor = new DefaultExecutor("muse-code");
  assert.equal(
    executor.buildUrl("muse-spark-1.3", true, 0, { accessToken: "minted-key" }),
    "https://api.meta.ai/v1/responses"
  );
});

test("chat-format models behind a custom baseUrl still use /chat/completions", () => {
  const executor = new DefaultExecutor("openrouter");
  assert.equal(
    executor.buildUrl("openai/gpt-4o-mini", true, 0, {
      apiKey: "k",
      providerSpecificData: { baseUrl: "https://gateway.example/v1" },
    }),
    "https://gateway.example/v1/chat/completions"
  );
});

// Live 2026-10-01: health probes with max_output_tokens 16–32 got
// response.incomplete(max_output_tokens) + response.failed "Provider returned empty
// content" — Muse spends the budget on hidden reasoning — so every probe was a 502
// plus a model lockout. 128+ returned text (95–293 reasoning tokens).
test("muse-code floors tiny output budgets and leaves larger or unset budgets alone", () => {
  const executor = new DefaultExecutor("muse-code");
  const send = (extra: Record<string, unknown>) =>
    executor.transformRequest(
      "muse-spark-1.3",
      { model: "muse-spark-1.3", input: [{ role: "user", content: "ok" }], ...extra },
      false,
      museCredentials
    ) as Record<string, unknown>;

  const tiny = send({ max_output_tokens: 16, max_tokens: 32 });
  assert.equal(tiny.max_output_tokens, 512);
  assert.equal(tiny.max_tokens, 512);
  assert.equal(send({ max_output_tokens: 4000 }).max_output_tokens, 4000);
  assert.equal(send({}).max_output_tokens, undefined);
});

test("non-Muse providers keep a tiny caller budget", () => {
  const executor = new DefaultExecutor("openrouter");
  const out = executor.transformRequest(
    "openai/gpt-4o-mini",
    { model: "openai/gpt-4o-mini", messages: [{ role: "user", content: "ok" }], max_tokens: 16 },
    false,
    { apiKey: "k" }
  ) as Record<string, unknown>;
  assert.equal(out.max_tokens, 16);
});
