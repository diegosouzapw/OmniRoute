import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityIdeVersionCache,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";
import { shouldRetryWithCredits } from "../../open-sse/services/antigravityCredits.ts";

async function readRequestBody(body: BodyInit | null | undefined): Promise<string> {
  if (typeof body === "string") return body;
  if (body instanceof URLSearchParams) return body.toString();
  if (body instanceof ReadableStream) {
    return new Response(body).text();
  }
  if (body instanceof ArrayBuffer) return new TextDecoder().decode(body);
  if (ArrayBuffer.isView(body)) {
    return new TextDecoder().decode(
      body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength)
    );
  }
  throw new TypeError("Unsupported request body in fetch mock");
}

async function withEnv<T>(
  name: string,
  value: string | undefined,
  fn: () => T | Promise<T>
): Promise<T> {
  const previous = process.env[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;

  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env[name];
    else process.env[name] = previous;
  }
}

test.afterEach(() => {
  clearAntigravityVersionCaches();
});

test("AntigravityExecutor keeps tool-name maps internal across credits request paths", async () => {
  const originalFetch = globalThis.fetch;
  const longOriginal = "namespace:" + "very_long_tool_name_".repeat(5);
  const toolNameMap = new Map([
    ["weather", "ns:weather"],
    ["long_tool_alias", longOriginal],
  ]);
  seedAntigravityIdeVersionCache("2026.04.17-test");
  seedAntigravityCliVersionCache("2026.04.17-test");

  const success = () =>
    new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"OK"}]},"finishReason":"STOP"}]}}\n\n',
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  const quota429 = () =>
    new Response(
      JSON.stringify({
        error: {
          message: "Quota exhausted. Resets in 5s",
          details: [{ reason: "QUOTA_EXHAUSTED" }],
        },
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );

  try {
    for (const mode of ["always", "retry"] as const) {
      const wireBodies: Array<Record<string, unknown>> = [];
      globalThis.fetch = async (_url, init) => {
        const wireBody = JSON.parse(await readRequestBody(init?.body)) as Record<string, unknown>;
        wireBodies.push(wireBody);
        return mode === "retry" && wireBodies.length === 1 ? quota429() : success();
      };

      const result = await withEnv("ANTIGRAVITY_CREDITS", mode, () =>
        new AntigravityExecutor().execute({
          model: "antigravity/gemini-2.5-flash",
          body: {
            _toolNameMap: toolNameMap,
            request: {
              contents: [{ role: "user", parts: [{ text: "hello" }] }],
              tools: [
                {
                  functionDeclarations: [{ name: "weather" }, { name: "long_tool_alias" }],
                },
              ],
            },
          },
          stream: true,
          credentials: {
            accessToken: "tool-map-" + mode,
            connectionId: "tool-map-" + mode,
            projectId: "project-1",
          },
          log: { debug() {}, warn() {}, info() {} },
        })
      );

      assert.equal(
        wireBodies.some((body) => "_toolNameMap" in body),
        false
      );
      assert.equal(JSON.stringify(wireBodies).includes("_toolNameMap"), false);
      const returnedBody = result.transformedBody as Record<string, unknown>;
      assert.equal(returnedBody._toolNameMap, toolNameMap);
      assert.equal(Object.keys(returnedBody).includes("_toolNameMap"), false);
      assert.equal(
        (returnedBody._toolNameMap as Map<string, string>).get("long_tool_alias"),
        longOriginal
      );
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("client aborts during credits retry do not disable future credits attempts", async () => {
  const originalFetch = globalThis.fetch;
  const authKey = "credits-client-abort-token";
  seedAntigravityIdeVersionCache("2026.04.17-test");
  seedAntigravityCliVersionCache("2026.04.17-test");

  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      const controller = new AbortController();
      let calls = 0;
      globalThis.fetch = async (_url, init) => {
        calls++;
        if (calls === 1) {
          return new Response(
            JSON.stringify({
              error: {
                message: "Quota exhausted. Resets in 5s",
                details: [{ reason: "QUOTA_EXHAUSTED" }],
              },
            }),
            { status: 429, headers: { "Content-Type": "application/json" } }
          );
        }
        return new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal;
          if (signal?.aborted) {
            reject(signal.reason);
            return;
          }
          signal?.addEventListener("abort", () => reject(signal.reason), { once: true });
        });
      };

      const pending = withEnv("ANTIGRAVITY_CREDITS", "retry", () =>
        new AntigravityExecutor().execute({
          model: "antigravity/gemini-2.5-flash",
          body: { request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] } },
          stream: true,
          credentials: {
            accessToken: authKey,
            connectionId: "credits-client-abort-connection",
            projectId: "project-1",
          },
          signal: controller.signal,
          log: { debug() {}, warn() {}, info() {}, error() {} },
        })
      );

      while (calls < 2) {
        await new Promise<void>((resolve) => setImmediate(resolve));
      }
      controller.abort(new DOMException("caller disconnected", "AbortError"));

      await assert.rejects(pending, { name: "AbortError" });
      assert.equal(shouldRetryWithCredits(authKey, "retry"), true);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("AntigravityExecutor credits modes control envelopes and eligible retry counts", async (t) => {
  const originalFetch = globalThis.fetch;
  seedAntigravityIdeVersionCache("2026.04.17-test");
  seedAntigravityCliVersionCache("2026.04.17-test");

  const success = () =>
    new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"OK"}]},"finishReason":"STOP"}]}}\n\n',
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  const quota429 = () =>
    new Response(
      JSON.stringify({
        error: {
          message: "Quota exhausted. Resets in 5s",
          details: [{ reason: "QUOTA_EXHAUSTED" }],
        },
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );

  try {
    await t.test("off strips caller credits and never retries with credits", async () => {
      const bodies: Array<Record<string, unknown>> = [];
      globalThis.fetch = async (_url, init) => {
        bodies.push(JSON.parse(await readRequestBody(init?.body)));
        return success();
      };

      await withEnv("ANTIGRAVITY_CREDITS", "off", () =>
        new AntigravityExecutor().execute({
          model: "antigravity/gemini-2.5-flash",
          body: {
            enabledCreditTypes: ["GOOGLE_ONE_AI"],
            request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] },
          },
          stream: true,
          credentials: { accessToken: "credits-off-token", projectId: "project-1" },
          log: { debug() {}, warn() {} },
        })
      );

      assert.equal(bodies.length, 1);
      assert.equal(bodies[0].enabledCreditTypes, undefined);
    });

    await t.test("retry sends no credits first and injects exactly once after eligible 429", async () => {
      const bodies: Array<Record<string, unknown>> = [];
      globalThis.fetch = async (_url, init) => {
        bodies.push(JSON.parse(await readRequestBody(init?.body)));
        return bodies.length === 1 ? quota429() : success();
      };

      const result = await withEnv("ANTIGRAVITY_CREDITS", "retry", () =>
        new AntigravityExecutor().execute({
          model: "antigravity/gemini-2.5-flash",
          body: { request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] } },
          stream: true,
          credentials: { accessToken: "credits-retry-token", projectId: "project-1" },
          log: { debug() {}, warn() {}, info() {} },
        })
      );

      assert.equal(result.response.status, 200);
      assert.equal(bodies.length, 2);
      assert.equal(bodies[0].enabledCreditTypes, undefined);
      assert.deepEqual(bodies[1].enabledCreditTypes, ["GOOGLE_ONE_AI"]);
    });

    await t.test("retry injects credits at most once when quota exhaustion persists across fallbacks", async () => {
      const bodies: Array<Record<string, unknown>> = [];
      const originalSetTimeout = globalThis.setTimeout;
      globalThis.fetch = async (_url, init) => {
        bodies.push(JSON.parse(await readRequestBody(init?.body)));
        return quota429();
      };
      globalThis.setTimeout = ((callback) => {
        (callback as () => void)();
        return 0;
      }) as typeof setTimeout;

      try {
        const result = await withEnv("ANTIGRAVITY_CREDITS", "retry", () =>
          new AntigravityExecutor().execute({
            model: "antigravity/gemini-2.5-flash",
            body: { request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] } },
            stream: true,
            credentials: {
              accessToken: "credits-persistent-429-token",
              connectionId: "credits-persistent-429-connection",
              projectId: "project-1",
            },
            log: { debug() {}, warn() {}, info() {} },
          })
        );

        assert.equal(result.response.status, 429);
        assert.equal(bodies.length, 9);
        assert.equal(bodies.filter((body) => body.enabledCreditTypes !== undefined).length, 1);
        assert.equal(bodies[0].enabledCreditTypes, undefined);
        assert.deepEqual(bodies[1].enabledCreditTypes, ["GOOGLE_ONE_AI"]);
        assert.ok(bodies.slice(2).every((body) => body.enabledCreditTypes === undefined));
      } finally {
        globalThis.setTimeout = originalSetTimeout;
      }
    });

    await t.test("always injects credits on the first and only successful call", async () => {
      const bodies: Array<Record<string, unknown>> = [];
      globalThis.fetch = async (_url, init) => {
        bodies.push(JSON.parse(await readRequestBody(init?.body)));
        return success();
      };

      const result = await withEnv("ANTIGRAVITY_CREDITS", "always", () =>
        new AntigravityExecutor().execute({
          model: "antigravity/gemini-2.5-flash",
          body: { request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] } },
          stream: true,
          credentials: { accessToken: "credits-always-token", projectId: "project-1" },
          log: { debug() {}, warn() {}, info() {} },
        })
      );

      assert.equal(result.response.status, 200);
      assert.equal(bodies.length, 1);
      assert.deepEqual(bodies[0].enabledCreditTypes, ["GOOGLE_ONE_AI"]);
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
