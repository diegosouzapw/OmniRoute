import test from "node:test";
import assert from "node:assert/strict";

import { stripProviderCacheControls } from "../../open-sse/utils/providerCacheIsolation.ts";

test("stripProviderCacheControls removes prompt-cache hints at every nesting level", () => {
  const payload = {
    prompt_cache_key: "shared-key",
    prompt_cache_retention: "24h",
    system: [
      {
        type: "text",
        text: "system",
        cache_control: { type: "ephemeral", ttl: "1h" },
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "hello",
            cache_control: { type: "ephemeral" },
          },
        ],
      },
    ],
    tools: [
      {
        name: "tool",
        cache_control: { type: "ephemeral" },
      },
    ],
  };

  const result = stripProviderCacheControls(payload);

  assert.equal("prompt_cache_key" in result, false);
  assert.equal("prompt_cache_retention" in result, false);
  assert.equal("cache_control" in result.system[0], false);
  assert.equal("cache_control" in result.messages[0].content[0], false);
  assert.equal("cache_control" in result.tools[0], false);
  assert.equal(result.messages[0].content[0].text, "hello");
});
