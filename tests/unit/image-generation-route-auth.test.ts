/**
 * Auth + call-log attribution contract for the image generation routes.
 *
 * Split out of image-generation-route.test.ts to stay under the 800-line
 * new-test-file cap enforced by `npm run check:file-size`.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-route-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-route-test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { getCallLogs } = await import("../../src/lib/usage/callLogs.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const { createPlaygroundImageStreamResponse } =
  await import("../../src/lib/playground/imageGenerationStream.ts");
const providerImageRoute =
  await import("../../src/app/api/v1/providers/[provider]/images/generations/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedConnection(provider: string, apiKey: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function waitForCallLog(apiKeyId: string, timeoutMs = 2000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const logs = await getCallLogs({ apiKey: apiKeyId, limit: 5 });
    const match = logs.find((log: { apiKeyId?: string | null }) => log.apiKeyId === apiKeyId);
    if (match) return match;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function readErrorMessage(response: Response): Promise<string> {
  const body = (await response.json()) as { error?: { message?: unknown } };
  return typeof body.error?.message === "string" ? body.error.message : "";
}

async function readRemainingText(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<string> {
  const decoder = new TextDecoder();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) return text + decoder.decode();
    text += decoder.decode(value, { stream: true });
  }
}

function readPlaygroundResultFrame(raw: string): {
  status: number;
  body: string;
  headers?: Record<string, string>;
} {
  const frame = raw
    .split(/\r?\n\r?\n/)
    .find((candidate) => candidate.includes("event: playground.image.result"));
  assert.ok(frame, `missing playground.image.result frame in ${raw}`);
  const data = frame
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart())
    .join("\n");
  return JSON.parse(data) as {
    status: number;
    body: string;
    headers?: Record<string, string>;
  };
}

async function waitFor(check: () => boolean, timeoutMs = 500): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!check()) {
    if (Date.now() >= deadline) throw new Error("Timed out waiting for condition");
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("v1 image generation POST requires an API key when REQUIRE_API_KEY is enabled", async () => {
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.REQUIRE_API_KEY = "true";

  try {
    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai/gpt-image-2",
          prompt: "authentication test",
        }),
      })
    );

    assert.equal(response.status, 401);
    assert.match(await readErrorMessage(response), /Authentication required/);
  } finally {
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
  }
});

test("v1 image generation POST rejects an invalid presented API key", async () => {
  const originalOmniRouteApiKey = process.env.OMNIROUTE_API_KEY;
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.OMNIROUTE_API_KEY = "valid-image-route-key";
  process.env.REQUIRE_API_KEY = "true";

  try {
    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: "Bearer invalid-image-route-key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-image-2",
          prompt: "invalid authentication test",
        }),
      })
    );

    assert.equal(response.status, 401);
    assert.match(await readErrorMessage(response), /Invalid API key/);
  } finally {
    if (originalOmniRouteApiKey === undefined) {
      delete process.env.OMNIROUTE_API_KEY;
    } else {
      process.env.OMNIROUTE_API_KEY = originalOmniRouteApiKey;
    }
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
  }
});

// Issue #2257: with enforcement off, a stale key in a CLI config must degrade to
// anonymous exactly like clientApiPolicy does — the route guard must not be
// stricter than the middleware that already fronts it.
test("v1 image generation POST ignores an invalid presented key while REQUIRE_API_KEY is off", async () => {
  const originalOmniRouteApiKey = process.env.OMNIROUTE_API_KEY;
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.OMNIROUTE_API_KEY = "valid-image-route-key";
  process.env.REQUIRE_API_KEY = "false";

  globalThis.fetch = async (url) => {
    assert.equal(String(url), "http://localhost:7860/sdapi/v1/txt2img");
    return new Response(JSON.stringify({ images: ["YW5vbnltb3Vz"] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: "Bearer stale-cli-key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sdwebui/stable-diffusion-v1-5",
          prompt: "stale key degrades to anonymous",
        }),
      })
    );

    assert.equal(response.status, 200);
  } finally {
    if (originalOmniRouteApiKey === undefined) {
      delete process.env.OMNIROUTE_API_KEY;
    } else {
      process.env.OMNIROUTE_API_KEY = originalOmniRouteApiKey;
    }
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
  }
});

// The dashboard Media page and Playground call these routes with a session
// cookie and no Bearer. clientApiPolicy admits them; the route guard must too.
test("v1 image generation POST accepts a dashboard session when REQUIRE_API_KEY is enabled", async () => {
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  const originalJwtSecret = process.env.JWT_SECRET;
  process.env.REQUIRE_API_KEY = "true";
  process.env.JWT_SECRET = "image-route-dashboard-session-secret";

  globalThis.fetch = async (url) => {
    assert.equal(String(url), "http://localhost:7860/sdapi/v1/txt2img");
    return new Response(JSON.stringify({ images: ["ZGFzaGJvYXJk"] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const { SignJWT } = await import("jose");
    const token = await new SignJWT({ authenticated: true, sub: "dashboard" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: {
          Cookie: `auth_token=${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sdwebui/stable-diffusion-v1-5",
          prompt: "dashboard session test",
        }),
      })
    );

    assert.equal(response.status, 200);
  } finally {
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  }
});

test("v1 image generation POST attributes its call log to the validated API key", async () => {
  const createdKey = await apiKeysDb.createApiKey(
    "Image generation caller",
    "machine-image-generation"
  );
  await seedConnection("openai", "image-provider-key");

  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://api.openai.com/v1/images/generations");
    return new Response(
      JSON.stringify({
        created: 123,
        data: [{ url: "https://cdn.example.com/attributed-image.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${createdKey.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-image-2",
        prompt: "call log attribution test",
      }),
    })
  );

  assert.equal(response.status, 200);
  const logged = await waitForCallLog(createdKey.id);
  assert.ok(logged, "expected an attributed image-generation call log");
  assert.equal(logged.apiKeyId, createdKey.id);
  assert.equal(logged.apiKeyName, "Image generation caller");
});

test("provider-scoped image generation requires an API key when configured", async () => {
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.REQUIRE_API_KEY = "true";

  try {
    const response = await providerImageRoute.POST(
      new Request("http://localhost/api/v1/providers/openai/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-image-2",
          prompt: "provider-scoped authentication test",
        }),
      }),
      { params: Promise.resolve({ provider: "openai" }) }
    );

    assert.equal(response.status, 401);
    assert.match(await readErrorMessage(response), /Authentication required/);
  } finally {
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
  }
});

test("provider-scoped image generation attributes its call log to the validated API key", async () => {
  const createdKey = await apiKeysDb.createApiKey(
    "Provider-scoped image caller",
    "machine-provider-image"
  );
  await seedConnection("openai", "provider-scoped-upstream-key");

  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://api.openai.com/v1/images/generations");
    return new Response(
      JSON.stringify({
        created: 456,
        data: [{ url: "https://cdn.example.com/provider-scoped-image.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const response = await providerImageRoute.POST(
    new Request("http://localhost/api/v1/providers/openai/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${createdKey.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: "provider-scoped attribution test",
      }),
    }),
    { params: Promise.resolve({ provider: "openai" }) }
  );

  assert.equal(response.status, 200);
  const logged = await waitForCallLog(createdKey.id);
  assert.ok(logged, "expected an attributed provider-scoped image-generation call log");
  assert.equal(logged.apiKeyId, createdKey.id);
  assert.equal(logged.apiKeyName, "Provider-scoped image caller");
});

test("provider-scoped image generation forwards caller cancellation", async () => {
  await seedConnection("openai", "provider-scoped-cancel-key");
  const controller = new AbortController();
  let upstreamSignal: AbortSignal | null | undefined;

  globalThis.fetch = async (_url, init) => {
    upstreamSignal = init?.signal;
    return new Promise<Response>((_resolve, reject) => {
      const abort = () => {
        const error = new Error("aborted");
        error.name = "AbortError";
        reject(error);
      };
      if (init?.signal?.aborted) abort();
      else init?.signal?.addEventListener("abort", abort, { once: true });
      setTimeout(abort, 50);
    });
  };

  const pending = providerImageRoute.POST(
    new Request("http://localhost/api/v1/providers/openai/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: "provider-scoped cancellation test",
      }),
      signal: controller.signal,
    }),
    { params: Promise.resolve({ provider: "openai" }) }
  );
  controller.abort();

  const response = await pending;
  assert.ok(upstreamSignal === undefined || upstreamSignal.aborted);
  assert.equal(response.status, 499);
});

test("Playground image stream sends a heartbeat before one slow generation and restores success", async () => {
  await seedConnection("openai", "playground-stream-key");
  let fetchCalls = 0;
  let resolveUpstream!: (response: Response) => void;
  const upstream = new Promise<Response>((resolve) => {
    resolveUpstream = resolve;
  });
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return upstream;
  };

  const pending = Promise.resolve(
    imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OmniRoute-Playground-Stream": "1",
        },
        body: JSON.stringify({ model: "openai/gpt-image-2", prompt: "slow image" }),
      })
    )
  );
  const immediate = await Promise.race([
    pending.then((response) => ({ response })),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), 50)),
  ]);

  if (!immediate) {
    resolveUpstream(
      new Response(JSON.stringify({ data: [{ url: "https://cdn.example.com/slow.png" }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );
    await pending;
    assert.fail("Playground stream response waited for upstream image headers");
  }

  const response = immediate.response;
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /^text\/event-stream/);
  const reader = response.body?.getReader();
  assert.ok(reader);
  const first = await reader.read();
  assert.equal(new TextDecoder().decode(first.value), ": keepalive\n\n");

  resolveUpstream(
    new Response(JSON.stringify({ data: [{ url: "https://cdn.example.com/slow.png" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  );
  const result = readPlaygroundResultFrame(await readRemainingText(reader));
  assert.equal(fetchCalls, 1);
  assert.equal(result.status, 200);
  assert.equal(result.headers?.["content-type"], "application/json");
  const body = JSON.parse(result.body) as { created?: unknown; data?: unknown };
  assert.equal(typeof body.created, "number");
  assert.deepEqual(body.data, [{ url: "https://cdn.example.com/slow.png" }]);
});

test("Playground image stream keeps auth inside the guarded POST", async () => {
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.REQUIRE_API_KEY = "true";
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("auth rejection must not dispatch upstream");
  };

  try {
    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OmniRoute-Playground-Stream": "1",
        },
        body: JSON.stringify({ model: "openai/gpt-image-2", prompt: "auth test" }),
      })
    );
    const result = readPlaygroundResultFrame(await response.text());
    assert.equal(response.status, 200);
    assert.equal(result.status, 401);
    assert.match(result.body, /Authentication required/);
    assert.equal(fetchCalls, 0);
  } finally {
    if (originalRequireApiKey === undefined) delete process.env.REQUIRE_API_KEY;
    else process.env.REQUIRE_API_KEY = originalRequireApiKey;
  }
});

test("cancelling the Playground image response aborts the single upstream request", async () => {
  await seedConnection("openai", "playground-cancel-key");
  let fetchCalls = 0;
  let upstreamSignal: AbortSignal | null | undefined;
  globalThis.fetch = async (_url, init) => {
    fetchCalls += 1;
    upstreamSignal = init?.signal;
    return new Promise<Response>((_resolve, reject) => {
      const abort = () => {
        const error = new Error("aborted");
        error.name = "AbortError";
        reject(error);
      };
      if (init?.signal?.aborted) abort();
      else init?.signal?.addEventListener("abort", abort, { once: true });
      setTimeout(abort, 100);
    });
  };

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-OmniRoute-Playground-Stream": "1",
      },
      body: JSON.stringify({ model: "openai/gpt-image-2", prompt: "cancel stream" }),
    })
  );
  const reader = response.body?.getReader();
  assert.ok(reader);
  await reader.read();
  await waitFor(() => fetchCalls === 1);
  await reader.cancel("Playground request cancelled");
  await waitFor(() => upstreamSignal?.aborted === true);

  assert.equal(fetchCalls, 1);
  assert.equal(upstreamSignal?.aborted, true);
});

test("Playground stream converts a guarded POST throw into one sanitized terminal result", async () => {
  let calls = 0;
  const response = createPlaygroundImageStreamResponse(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      body: "{}",
    }),
    undefined,
    async () => {
      calls += 1;
      throw new Error("private failure at /srv/omniroute/secret.ts");
    }
  );
  const text = await response.text();
  const result = readPlaygroundResultFrame(text);

  assert.equal(calls, 1);
  assert.equal((text.match(/event: playground\.image\.result/g) || []).length, 1);
  assert.equal(result.status, 500);
  assert.doesNotMatch(result.body, /\/srv\/omniroute|secret\.ts/);
});

test("Playground stream converts an inner response-body failure into a terminal result", async () => {
  const response = createPlaygroundImageStreamResponse(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      body: "{}",
    }),
    undefined,
    async () =>
      new Response(
        new ReadableStream({
          start(controller) {
            controller.error(new Error("body failure at /srv/omniroute/secret.ts"));
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
  );
  const result = readPlaygroundResultFrame(await response.text());

  assert.equal(result.status, 500);
  assert.doesNotMatch(result.body, /\/srv\/omniroute|secret\.ts/);
});

test("an already-aborted Playground stream closes before dispatch", async () => {
  const controller = new AbortController();
  controller.abort();
  let calls = 0;
  const response = createPlaygroundImageStreamResponse(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      body: "{}",
      signal: controller.signal,
    }),
    undefined,
    async () => {
      calls += 1;
      return new Response("unexpected");
    }
  );

  assert.equal(await response.text(), "");
  assert.equal(calls, 0);
});

test("Playground stream emits periodic heartbeats while the guarded POST is pending", async () => {
  let calls = 0;
  const response = createPlaygroundImageStreamResponse(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      body: "{}",
    }),
    undefined,
    (forwardedRequest: Request) => {
      calls += 1;
      return new Promise<Response>((_resolve, reject) => {
        forwardedRequest.signal.addEventListener("abort", () => reject(new Error("cancelled")), {
          once: true,
        });
      });
    },
    5
  );
  const reader = response.body?.getReader();
  assert.ok(reader);

  assert.equal(new TextDecoder().decode((await reader.read()).value), ": keepalive\n\n");
  const periodic = await Promise.race([
    reader.read(),
    new Promise<never>((_resolve, reject) =>
      setTimeout(() => reject(new Error("missing periodic heartbeat")), 100)
    ),
  ]);
  assert.equal(new TextDecoder().decode(periodic.value), ": keepalive\n\n");
  await reader.cancel("done");
  assert.equal(calls, 1);
});
