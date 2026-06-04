import { test } from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "@omniroute/open-sse/executors/default.ts";

// Regression for issue #3136: a `llama-cpp` local provider connection must send
// requests to the user's configured local baseUrl, not OpenAI's API. Before the
// fix, `llama-cpp` was missing from the local-provider case group in buildUrl(),
// so it fell through to the registry/default path and (because llama-cpp is not
// in the registry → DefaultExecutor falls back to PROVIDERS.openai) resolved to
// https://api.openai.com/v1/... — producing OpenAI-worded 401 "no api key" errors.
test("llama-cpp buildUrl routes to the configured local baseUrl, not OpenAI", () => {
  const executor = new DefaultExecutor("llama-cpp");
  const url = executor.buildUrl("some-model", true, 0, {
    providerSpecificData: { baseUrl: "http://127.0.0.1:8080/v1" },
  });

  assert.equal(url, "http://127.0.0.1:8080/v1/chat/completions");
  // Assert the resolved host is the local one — parse the URL and compare the
  // hostname exactly (a substring check like `url.includes("api.openai.com")`
  // is an incomplete URL sanitization pattern: `api.openai.com.evil` would match).
  assert.equal(new URL(url).hostname, "127.0.0.1", `expected local host, got ${url}`);
});
