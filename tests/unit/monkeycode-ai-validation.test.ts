import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import { __resetModelCooldownsForTests } from "../../open-sse/executors/monkeycode-ai.ts";

function stubFetch(handler: (url: string, body: string) => Response) {
  const original = globalThis.fetch;
  globalThis.fetch = (async (url: unknown, init?: { body?: unknown }) =>
    handler(String(url), String(init?.body ?? ""))) as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

const okChat = () =>
  new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content: "pong" } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

describe("monkeycode-ai validation", () => {
  beforeEach(() => __resetModelCooldownsForTests());

  it("routes through the signing validator, not the generic /models probe", async () => {
    const seen: string[] = [];
    const restore = stubFetch((url) => {
      seen.push(url);
      return okChat();
    });
    try {
      const result = await validateProviderApiKey({
        provider: "monkeycode-ai",
        apiKey: "oma_test",
        providerSpecificData: { signingSecret: "omas_test" },
      });
      assert.strictEqual(result.valid, true);
      assert.ok(
        seen.every((u) => u.includes("/chat/completions")),
        `expected only chat pings, got: ${seen.join(", ")}`
      );
      assert.ok(
        seen.every((u) => !u.includes("/models")),
        "must never probe the 403-only /models endpoint"
      );
    } finally {
      restore();
    }
  });

  it("fails clearly without a signing secret (no network)", async () => {
    let called = false;
    const restore = stubFetch(() => {
      called = true;
      return okChat();
    });
    try {
      const result = await validateProviderApiKey({
        provider: "monkeycode-ai",
        apiKey: "oma_test",
        providerSpecificData: {},
      });
      assert.strictEqual(result.valid, false);
      assert.ok(String(result.error).toLowerCase().includes("signing secret"));
      assert.strictEqual(called, false);
    } finally {
      restore();
    }
  });

  it("fails when upstream rejects the pair", async () => {
    const restore = stubFetch(
      () =>
        new Response(JSON.stringify({ error: { message: "nope" } }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        })
    );
    try {
      const result = await validateProviderApiKey({
        provider: "monkeycode-ai",
        apiKey: "oma_bad",
        providerSpecificData: { signingSecret: "omas_bad" },
      });
      assert.strictEqual(result.valid, false);
    } finally {
      restore();
    }
  });
});
