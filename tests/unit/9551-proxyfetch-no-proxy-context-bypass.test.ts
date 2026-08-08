import test from "node:test";
import assert from "node:assert/strict";
import { runWithProxyContext, resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";

async function withEnv(
  overrides: Record<string, string | undefined>,
  fn: () => unknown
): Promise<unknown> {
  const previous = new Map<string, string | undefined>();

  for (const [key, value] of Object.entries(overrides)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test("[9551] BUG: context-proxy ignores NO_PROXY for non-local domains", async () => {
  await withEnv(
    {
      NO_PROXY: "ark.cn-beijing.volces.com",
      HTTP_PROXY: undefined,
    },
    async () => {
      await runWithProxyContext({ type: "http", host: "127.0.0.1", port: 7897 }, () => {
        const resolved = resolveProxyForRequest("https://ark.cn-beijing.volces.com/api/v3/models");
        assert.equal(resolved.source, "direct", "NO_PROXY should bypass context proxy");
      });
    }
  );
});

test("[9551] resolveProxyForRequest: context-proxy respects NO_PROXY=*", async () => {
  await withEnv(
    {
      NO_PROXY: "*",
      HTTP_PROXY: undefined,
    },
    async () => {
      await runWithProxyContext({ type: "http", host: "127.0.0.1", port: 7897 }, () => {
        const resolved = resolveProxyForRequest("https://api.openai.com/v1/chat/completions");
        assert.equal(resolved.source, "direct", "NO_PROXY=* should bypass context proxy");
      });
    }
  );
});
