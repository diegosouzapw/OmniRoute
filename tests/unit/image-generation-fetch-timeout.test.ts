import test from "node:test";
import assert from "node:assert/strict";

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

const TIMEOUT_ENV_KEYS = [
  "FETCH_TIMEOUT_MS",
  "REQUEST_TIMEOUT_MS",
  "OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS",
] as const;

type TimeoutEnvKey = (typeof TIMEOUT_ENV_KEYS)[number];

async function withTimeoutEnv<T>(
  values: Partial<Record<TimeoutEnvKey, string>>,
  fn: () => Promise<T>
): Promise<T> {
  const originals = Object.fromEntries(
    TIMEOUT_ENV_KEYS.map((key) => [key, process.env[key]])
  ) as Record<TimeoutEnvKey, string | undefined>;

  for (const key of TIMEOUT_ENV_KEYS) {
    const value = values[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }

  try {
    return await fn();
  } finally {
    for (const key of TIMEOUT_ENV_KEYS) {
      const value = originals[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function captureImageFetchTimeout(
  options: {
    body?: { model: string; prompt: string };
    credentials?: Record<string, unknown>;
    resolvedProvider?: string;
  } = {}
): Promise<number | undefined> {
  const originalSetTimeout = globalThis.setTimeout;
  let capturedTimeout: number | undefined;

  globalThis.setTimeout = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
    capturedTimeout ??= Number(timeout);
    return originalSetTimeout(handler, 60_000, ...args);
  }) as typeof globalThis.setTimeout;

  try {
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          created: 999,
          data: [{ url: "https://cdn.example.com/timeout-test.png" }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );

    const result = await handleImageGeneration({
      body: options.body ?? { model: "openai/gpt-image-2", prompt: "timeout selection" },
      credentials: options.credentials ?? { apiKey: "test-key" },
      resolvedProvider: options.resolvedProvider,
      log: null,
    });
    assert.equal(result.success, true);
    return capturedTimeout;
  } finally {
    globalThis.setTimeout = originalSetTimeout;
  }
}

async function restore<T>(fn: () => Promise<T>): Promise<T> {
  const originalFetch = globalThis.fetch;
  try {
    return await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function makeAbortError() {
  return Object.create(Error.prototype, {
    message: { value: "The operation was aborted", writable: true, configurable: true },
    name: { value: "AbortError", writable: true, configurable: true },
  });
}

test("fetch timeout in OpenAI provider path returns 504 and sanitized error", () =>
  restore(async () => {
    globalThis.fetch = async () => {
      throw makeAbortError();
    };

    const result = await handleImageGeneration({
      body: { model: "openai/gpt-image-2", prompt: "timeout test" },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 504);
    assert.match(result.error, /Image provider error:/);
  }));

test("non-timeout fetch error still returns 502", () =>
  restore(async () => {
    globalThis.fetch = async () => {
      throw new Error("network down");
    };

    const result = await handleImageGeneration({
      body: { model: "openai/gpt-image-2", prompt: "network error test" },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  }));

test("successful image gen passes AbortSignal and returns URL", () =>
  restore(async () => {
    let seenSignal: AbortSignal | null = null;

    globalThis.fetch = async (url, options) => {
      seenSignal = (options as RequestInit).signal ?? null;
      return new Response(
        JSON.stringify({
          created: 999,
          data: [{ url: "https://cdn.example.com/timeout-test.png" }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    };

    const result = await handleImageGeneration({
      body: { model: "openai/gpt-image-2", prompt: "success test" },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(seenSignal, "AbortSignal should be passed through fetchWithTimeout");
    assert.equal(result.data.data[0].url, "https://cdn.example.com/timeout-test.png");
  }));

test("OpenAI image timeout defaults to 600s and honors central then legacy env precedence", () =>
  restore(async () => {
    await withTimeoutEnv({}, async () => {
      assert.equal(await captureImageFetchTimeout(), 600_000);
    });

    await withTimeoutEnv(
      {
        FETCH_TIMEOUT_MS: "111",
        REQUEST_TIMEOUT_MS: "222",
        OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS: "333",
      },
      async () => {
        assert.equal(await captureImageFetchTimeout(), 111);
      }
    );

    await withTimeoutEnv(
      { REQUEST_TIMEOUT_MS: "222", OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS: "333" },
      async () => {
        assert.equal(await captureImageFetchTimeout(), 222);
      }
    );

    await withTimeoutEnv({ OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS: "333" }, async () => {
      assert.equal(await captureImageFetchTimeout(), 333);
    });
  }));

test("connection timeout overrides env for built-in and custom OpenAI image providers", () =>
  restore(async () => {
    await withTimeoutEnv({ FETCH_TIMEOUT_MS: "111" }, async () => {
      assert.equal(
        await captureImageFetchTimeout({
          credentials: {
            apiKey: "test-key",
            providerSpecificData: { timeoutMs: 4_321 },
          },
        }),
        4_321
      );

      assert.equal(
        await captureImageFetchTimeout({
          body: { model: "custom/image-model", prompt: "custom timeout" },
          credentials: {
            apiKey: "test-key",
            providerSpecificData: {
              baseUrl: "https://images.example.test/v1",
              timeoutMs: 5_432,
            },
          },
          resolvedProvider: "custom",
        }),
        5_432
      );
    });
  }));

test("zero timeout disables the image timer and keeps the caller signal", () =>
  restore(async () => {
    await withTimeoutEnv({ FETCH_TIMEOUT_MS: "0" }, async () => {
      const controller = new AbortController();
      let seenSignal: AbortSignal | null | undefined;
      globalThis.fetch = async (_url, init) => {
        seenSignal = init?.signal;
        return new Response(
          JSON.stringify({ data: [{ url: "https://cdn.example.com/no-timeout.png" }] }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      };

      const result = await handleImageGeneration({
        body: { model: "openai/gpt-image-2", prompt: "no timeout" },
        credentials: { apiKey: "test-key" },
        signal: controller.signal,
        log: null,
      });

      assert.equal(result.success, true);
      assert.equal(seenSignal, controller.signal);
    });
  }));

test("caller abort is classified as 499 before the image timeout", () =>
  restore(async () => {
    await withTimeoutEnv({ FETCH_TIMEOUT_MS: "200" }, async () => {
      const controller = new AbortController();
      let seenSignal: AbortSignal | null | undefined;
      globalThis.fetch = async (_url, init) => {
        seenSignal = init?.signal;
        return new Promise<Response>((_resolve, reject) => {
          if (init?.signal?.aborted) {
            reject(makeAbortError());
            return;
          }
          init?.signal?.addEventListener(
            "abort",
            () => {
              reject(makeAbortError());
            },
            { once: true }
          );
          setTimeout(() => reject(makeAbortError()), 50);
        });
      };

      const pending = handleImageGeneration({
        body: { model: "openai/gpt-image-2", prompt: "cancel me" },
        credentials: { apiKey: "test-key" },
        signal: controller.signal,
        log: null,
      });
      controller.abort();

      const result = await pending;
      assert.equal(seenSignal?.aborted, true);
      assert.equal(result.success, false);
      assert.equal(result.status, 499);
    });
  }));

test("caller abort while reading the image body is still classified as 499", () =>
  restore(async () => {
    await withTimeoutEnv({ FETCH_TIMEOUT_MS: "200" }, async () => {
      const controller = new AbortController();
      globalThis.fetch = async (_url, init) =>
        new Response(
          new ReadableStream<Uint8Array>({
            start(streamController) {
              const abort = () => streamController.error(makeAbortError());
              if (init?.signal?.aborted) abort();
              else init?.signal?.addEventListener("abort", abort, { once: true });
            },
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );

      const pending = handleImageGeneration({
        body: { model: "openai/gpt-image-2", prompt: "cancel body read" },
        credentials: { apiKey: "test-key" },
        signal: controller.signal,
        log: null,
      });
      controller.abort();

      const result = await pending;
      assert.equal(result.success, false);
      assert.equal(result.status, 499);
    });
  }));

test("image timeout remains active while reading the response body", () =>
  restore(async () => {
    await withTimeoutEnv({ FETCH_TIMEOUT_MS: "20" }, async () => {
      globalThis.fetch = async (_url, init) =>
        new Response(
          new ReadableStream<Uint8Array>({
            start(streamController) {
              init?.signal?.addEventListener(
                "abort",
                () => {
                  const error = new Error("aborted");
                  error.name = "AbortError";
                  streamController.error(error);
                },
                { once: true }
              );
              setTimeout(() => streamController.error(new Error("body stayed open")), 80);
            },
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );

      const startedAt = Date.now();
      const result = await handleImageGeneration({
        body: { model: "openai/gpt-image-2", prompt: "body timeout" },
        credentials: { apiKey: "test-key" },
        log: null,
      });

      assert.equal(result.success, false);
      assert.equal(result.status, 504);
      assert.ok(Date.now() - startedAt < 70, "body timeout should use the configured deadline");
    });
  }));

test("an already-aborted image request does not dispatch a fallback URL", () =>
  restore(async () => {
    const controller = new AbortController();
    controller.abort();
    let fetchCalls = 0;
    globalThis.fetch = async () => {
      fetchCalls += 1;
      return new Response("temporarily unavailable", { status: 503 });
    };

    const result = await handleImageGeneration({
      body: {
        model: "nebius/black-forest-labs/flux-schnell",
        prompt: "do not retry cancellation",
      },
      credentials: { apiKey: "test-key" },
      signal: controller.signal,
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 499);
    assert.ok(fetchCalls <= 1, `expected at most one dispatch, got ${fetchCalls}`);
  }));
