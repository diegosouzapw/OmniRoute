import assert from "node:assert/strict";
import { test } from "node:test";

import { getOpenCodeGoUsage } from "../../open-sse/services/opencodeOllamaUsage.ts";

test("getOpenCodeGoUsage does not send the user's OpenCode Go API key to api.z.ai by default", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = process.env.OMNIROUTE_OPENCODE_GO_QUOTA_URL;
  delete process.env.OMNIROUTE_OPENCODE_GO_QUOTA_URL;

  let calledHost: string | null = null;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();
    calledHost = new URL(url).host;
    throw new Error(`unexpected outbound fetch to ${url}`);
  }) as typeof fetch;

  try {
    const result = await getOpenCodeGoUsage("sk-fake-opencode-go-key", undefined);
    assert.notStrictEqual(calledHost, "api.z.ai");
    assert.strictEqual(calledHost, null);
    assert.ok(
      typeof result.message === "string" && result.message.length > 0,
      "expected a descriptive message when no quota URL is configured"
    );
  } finally {
    globalThis.fetch = originalFetch;
    if (originalEnv === undefined) delete process.env.OMNIROUTE_OPENCODE_GO_QUOTA_URL;
    else process.env.OMNIROUTE_OPENCODE_GO_QUOTA_URL = originalEnv;
  }
});
