import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_CODEX_CLIENT_VERSION } from "../../src/shared/constants/codexClient.ts";
import {
  clearCodexClientVersionCache,
  getCodexClientVersion,
  resolveCodexClientVersion,
} from "../../open-sse/config/codexClient.ts";

const CODEX_RELEASE_URL = "https://api.github.com/repos/openai/codex/releases/latest";

function releaseFetch(tagName: string): typeof fetch {
  return (async (url: string | URL | Request) => {
    assert.equal(String(url), CODEX_RELEASE_URL);
    return new Response(JSON.stringify({ tag_name: tagName }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
}

async function withEnv<T>(
  entries: Record<string, string | undefined>,
  fn: () => T | Promise<T>
): Promise<T> {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(entries)) {
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

test.afterEach(() => {
  clearCodexClientVersionCache();
  delete process.env.CODEX_CLIENT_VERSION;
});

test("a fetched Codex release newer than the pin is returned", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: undefined }, async () => {
    const version = await resolveCodexClientVersion(releaseFetch("rust-v0.160.1"));
    assert.equal(version, "0.160.1");
    assert.equal(getCodexClientVersion(), "0.160.1");
    assert.notEqual(version, DEFAULT_CODEX_CLIENT_VERSION);
  });
});

test("a rejected fetch falls back to the pinned Codex version", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: undefined }, async () => {
    const failingFetch = (async () => {
      throw new Error("network down");
    }) as typeof fetch;

    const version = await resolveCodexClientVersion(failingFetch);
    assert.equal(version, DEFAULT_CODEX_CLIENT_VERSION);
    assert.equal(getCodexClientVersion(), DEFAULT_CODEX_CLIENT_VERSION);
  });
});

test("CODEX_CLIENT_VERSION beats a newer fetched release", async () => {
  await withEnv({ CODEX_CLIENT_VERSION: "0.99.0" }, async () => {
    const version = await resolveCodexClientVersion(releaseFetch("rust-v0.160.1"));
    assert.equal(version, "0.160.1");
    assert.equal(getCodexClientVersion(), "0.99.0");
  });
});
