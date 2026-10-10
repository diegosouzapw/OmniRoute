import test from "node:test";
import assert from "node:assert/strict";
import { maybeAllowJevCacheRead } from "../../../open-sse/handlers/chatCore/jevCacheGate.ts";
import {
  __resetJevClientForTests,
  __resetJevRuntimeCacheForTests,
} from "../../../open-sse/services/jev/index.ts";

// Helper to reset Jev-related environment variables
function clearJevEnv(): void {
  const keys = [
    "OMNIROUTE_JEV_ENABLED",
    "OMNIROUTE_JEV_API_KEY",
    "OMNIROUTE_JEV_BASE_URL",
    "OMNIROUTE_JEV_MODEL",
    "OMNIROUTE_JEV_TIMEOUT_MS",
    "OMNIROUTE_JEV_FEATURES",
    "OMNIROUTE_JEV_BLOCK_THRESHOLD",
    "TYPESAFE_API_KEY",
    "TYPESAFE_BASE_URL",
  ];
  for (const key of keys) {
    delete process.env[key];
  }
}

// Helper to set up test credentials
function useCredential(): void {
  process.env.OMNIROUTE_JEV_API_KEY = "test-key";
  // #15641: the decision layer is opt-in — a credential alone engages nothing.
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_BASE_URL = "https://jev.test";
  process.env.OMNIROUTE_JEV_TIMEOUT_MS = "2000";
}

// Helper to reset Jev-related environment variables
function resetJevEnv() {
  clearJevEnv();
  const keys = [
    "OMNIROUTE_JEV_ENABLED",
    "OMNIROUTE_JEV_API_KEY",
    "OMNIROUTE_JEV_BASE_URL",
    "OMNIROUTE_JEV_MODEL",
    "OMNIROUTE_JEV_TIMEOUT_MS",
    "OMNIROUTE_JEV_FEATURES",
    "OMNIROUTE_JEV_BLOCK_THRESHOLD",
    "TYPESAFE_API_KEY",
    "TYPESAFE_BASE_URL",
  ];
  const savedEnv: Record<string, string | undefined> = {};
  for (const key of keys) {
    savedEnv[key] = process.env[key];
  }
  return savedEnv;
}

// Helper to restore environment
function restoreEnv(savedEnv: Record<string, string | undefined>) {
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

test("jevCacheGate: feature off returns false and zero fetch calls", async ({}) => {
  const savedEnv = resetJevEnv();

  try {
    // Provide credentials but disable cache feature (enable a different feature to ensure cache is off)
    useCredential();
    process.env.OMNIROUTE_JEV_FEATURES = "routing"; // any feature except cache

    // Reset Jev runtime cache so env changes are seen immediately
    __resetJevRuntimeCacheForTests();
    __resetJevClientForTests();

    // Mock fetch to return cacheSafe 0.9 (should not be called)
    let fetchCallCount = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      fetchCallCount++;
      return new Response(JSON.stringify({ cacheSafe: 0.9 }), { status: 200 });
    };

    try {
      const result = await maybeAllowJevCacheRead({
        body: { messages: [{ role: "user", content: "test" }], temperature: 0.7 },
        model: "test-model",
        log: { debug: () => {} },
      });

      assert.strictEqual(result, false);
      assert.strictEqual(fetchCallCount, 0, "Should not call fetch when cache feature disabled");
    } finally {
      globalThis.fetch = originalFetch;
    }
  } finally {
    restoreEnv(savedEnv);
  }
});

test("jevCacheGate: credential + stub cacheSafe 0.9 returns true", async ({}) => {
  const savedEnv = resetJevEnv();

  try {
    // Enable cache feature and provide credentials
    useCredential();
    process.env.OMNIROUTE_JEV_FEATURES = "cache";

    // Reset Jev runtime cache so env changes are seen immediately
    __resetJevRuntimeCacheForTests();
    __resetJevClientForTests();

    // Mock fetch to return cacheSafe 0.9 in the Jev answer envelope
    let fetchCallCount = 0;
    let lastRequestBody: string | null = null;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (_input: RequestInfo, init?: RequestInit) => {
      fetchCallCount++;
      if (init?.body) {
        lastRequestBody = typeof init.body === "string" ? init.body : JSON.stringify(init.body);
      }
      return new Response(
        JSON.stringify({
          model: "test-model",
          answers: { cacheSafe: { type: "noul", noul: 0.9 } },
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        }),
        { status: 200 }
      );
    };

    try {
      const result = await maybeAllowJevCacheRead({
        body: { messages: [{ role: "user", content: "test" }], temperature: 0.7 },
        model: "test-model",
        log: { debug: () => {} },
      });

      assert.strictEqual(result, true);
      assert.strictEqual(fetchCallCount, 1, "Should call fetch once");
      assert.ok(
        lastRequestBody?.includes("temperature: 0.7"),
        "Temperature should be included in request"
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  } finally {
    restoreEnv(savedEnv);
  }
});

test("jevCacheGate: stub cacheSafe 0.5 returns false", async ({}) => {
  const savedEnv = resetJevEnv();

  try {
    // Enable cache feature and provide credentials
    useCredential();
    process.env.OMNIROUTE_JEV_FEATURES = "cache";

    // Reset Jev runtime cache so env changes are seen immediately
    __resetJevRuntimeCacheForTests();
    __resetJevClientForTests();

    // Mock fetch to return cacheSafe 0.5 in the Jev answer envelope
    let fetchCallCount = 0;
    let lastRequestBody: string | null = null;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (_input: RequestInfo, init?: RequestInit) => {
      fetchCallCount++;
      if (init?.body) {
        lastRequestBody = typeof init.body === "string" ? init.body : JSON.stringify(init.body);
      }
      return new Response(
        JSON.stringify({
          model: "test-model",
          answers: { cacheSafe: { type: "noul", noul: 0.5 } },
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        }),
        { status: 200 }
      );
    };

    try {
      const result = await maybeAllowJevCacheRead({
        body: { messages: [{ role: "user", content: "test" }], temperature: 0.3 },
        model: "test-model",
        log: { debug: () => {} },
      });

      assert.strictEqual(result, false);
      assert.strictEqual(fetchCallCount, 1, "Should call fetch once");
      assert.ok(
        lastRequestBody?.includes("temperature: 0.3"),
        "Temperature should be included in request"
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  } finally {
    restoreEnv(savedEnv);
  }
});

test("jevCacheGate: fetch 500 returns false and no throw", async ({}) => {
  const savedEnv = resetJevEnv();

  try {
    // Enable cache feature and provide credentials
    useCredential();
    process.env.OMNIROUTE_JEV_FEATURES = "cache";

    // Reset Jev runtime cache so env changes are seen immediately
    __resetJevRuntimeCacheForTests();
    __resetJevClientForTests();

    // Mock fetch to return 500
    let fetchCallCount = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      fetchCallCount++;
      return new Response(null, { status: 500 });
    };

    try {
      const result = await maybeAllowJevCacheRead({
        body: { messages: [{ role: "user", content: "test" }] },
        model: "test-model",
        log: { debug: () => {} },
      });

      assert.strictEqual(result, false);
      assert.ok(fetchCallCount >= 1, "Should call fetch at least once on error (fail-open)");
    } finally {
      globalThis.fetch = originalFetch;
    }
  } finally {
    restoreEnv(savedEnv);
  }
});

test("jevCacheGate: temperature shown in state", async ({}) => {
  const savedEnv = resetJevEnv();

  try {
    // Enable cache feature and provide credentials
    useCredential();
    process.env.OMNIROUTE_JEV_FEATURES = "cache";

    // Reset Jev runtime cache so env changes are seen immediately
    __resetJevRuntimeCacheForTests();
    __resetJevClientForTests();

    // Mock fetch to return cacheSafe 0.9 in the Jev answer envelope
    let fetchCallCount = 0;
    let lastRequestBody: string | null = null;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (_input: RequestInfo, init?: RequestInit) => {
      fetchCallCount++;
      if (init?.body) {
        lastRequestBody = typeof init.body === "string" ? init.body : JSON.stringify(init.body);
      }
      return new Response(
        JSON.stringify({
          model: "test-model",
          answers: { cacheSafe: { type: "noul", noul: 0.9 } },
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        }),
        { status: 200 }
      );
    };

    try {
      const result = await maybeAllowJevCacheRead({
        body: { messages: [{ role: "user", content: "test" }], temperature: 0 },
        model: "test-model",
        log: { debug: () => {} },
      });

      assert.strictEqual(result, true);
      assert.strictEqual(fetchCallCount, 1, "Should call fetch once");
      assert.ok(
        lastRequestBody?.includes("temperature: 0"),
        "Temperature 0 should be included in request"
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  } finally {
    restoreEnv(savedEnv);
  }
});

test("jevCacheGate: null/empty conversation returns false", async ({}) => {
  const savedEnv = resetJevEnv();

  try {
    // Enable cache feature and provide credentials
    useCredential();
    process.env.OMNIROUTE_JEV_FEATURES = "cache";

    // Reset Jev runtime cache so env changes are seen immediately
    __resetJevRuntimeCacheForTests();
    __resetJevClientForTests();

    // Mock fetch to return cacheSafe 0.9 (should not be called for empty input)
    let fetchCallCount = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      fetchCallCount++;
      return new Response(JSON.stringify({ cacheSafe: 0.9 }), { status: 200 });
    };

    try {
      // Test with null body
      let result = await maybeAllowJevCacheRead({
        body: null as unknown as Record<string, unknown>,
        model: "test-model",
        log: { debug: () => {} },
      });
      assert.strictEqual(result, false);

      // Test with empty messages
      result = await maybeAllowJevCacheRead({
        body: { messages: [] },
        model: "test-model",
        log: { debug: () => {} },
      });
      assert.strictEqual(result, false);

      // Test with undefined messages
      result = await maybeAllowJevCacheRead({
        body: { foo: "bar" },
        model: "test-model",
        log: { debug: () => {} },
      });
      assert.strictEqual(result, false);

      assert.strictEqual(fetchCallCount, 0, "Should not call fetch for empty/null input");
    } finally {
      globalThis.fetch = originalFetch;
    }
  } finally {
    restoreEnv(savedEnv);
  }
});
