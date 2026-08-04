import { test } from "node:test";
import assert from "node:assert/strict";
import { chutesProvider } from "../../open-sse/config/providers/registry/chutes/index.ts";

test("#7621: chutes registry baseUrl must use the resolvable llm.chutes.ai domain", () => {
  assert.equal(
    chutesProvider.baseUrl,
    "https://llm.chutes.ai/v1/chat/completions",
    "chutesProvider.baseUrl must point at the resolvable llm.chutes.ai host, not the " +
      "non-resolving api.chutesai.com"
  );
});
