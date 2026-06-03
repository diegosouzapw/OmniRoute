import { test } from "node:test";
import assert from "node:assert";
import { POST } from "../../src/app/api/v1/embeddings/route";
import { extractApiKey, isValidApiKey } from "../../src/sse/services/auth";

test("extractApiKey", async (t) => {
  await t.test("should extract bearer token", async () => {
    const req = new Request("http://localhost", {
      headers: { Authorization: "Bearer my-token" },
    });
    assert.strictEqual(extractApiKey(req), "my-token");
  });

  await t.test("should return null if no authorization header", async () => {
    const req = new Request("http://localhost");
    assert.strictEqual(extractApiKey(req), null);
  });

  await t.test("should return null if header is not bearer", async () => {
    const req = new Request("http://localhost", {
      headers: { Authorization: "NotBearer my-token" },
    });
    assert.strictEqual(extractApiKey(req), null);
  });

  await t.test("should return null if header is just 'Bearer '", async () => {
    const req = new Request("http://localhost", {
      headers: { Authorization: "Bearer " },
    });
    assert.strictEqual(extractApiKey(req), null);
  });
});

test("isValidApiKey", async (t) => {
  const originalEnv = process.env.OMNIROUTE_API_KEY;

  await t.test("should return true if key matches OMNIROUTE_API_KEY", async () => {
    process.env.OMNIROUTE_API_KEY = "test-key";
    assert.strictEqual(await isValidApiKey("test-key"), true);
    delete process.env.OMNIROUTE_API_KEY;
  });

  await t.test("should return false for unknown key (when not in env)", async () => {
    // We assume validateApiKey will return false for a dummy key if the DB is empty.
    assert.strictEqual(await isValidApiKey("non-existent-key"), false);
  });

  // Restore original env in case of failure
  process.env.OMNIROUTE_API_KEY = originalEnv;
});

test("POST /v1/embeddings authentication", async (t) => {
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  const originalOmniKey = process.env.OMNIROUTE_API_KEY;

  await t.test("should return 401 when an invalid API key is provided", async () => {
    process.env.OMNIROUTE_API_KEY = "valid-key";
    const req = new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: { Authorization: "Bearer invalid-key" },
      body: JSON.stringify({ model: "mistral/mistral-embed", input: "test" }),
    });
    const res = await POST(req);
    assert.strictEqual(res.status, 401);
    delete process.env.OMNIROUTE_API_KEY;
  });

  await t.test(
    "should return 401 when no API key is provided and REQUIRE_API_KEY is true",
    async () => {
      process.env.REQUIRE_API_KEY = "true";
      const req = new Request("http://localhost/v1/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "mistral/mistral-embed", input: "test" }),
      });
      const res = await POST(req);
      assert.strictEqual(res.status, 401);
      delete process.env.REQUIRE_API_KEY;
    }
  );

  await t.test("should NOT return 401 when a valid API key is provided", async () => {
    process.env.OMNIROUTE_API_KEY = "valid-key";
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response(JSON.stringify({ data: [] }), { status: 200 });

    try {
      const req = new Request("http://localhost/v1/embeddings", {
        method: "POST",
        headers: {
          Authorization: "Bearer valid-key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "mistral/mistral-embed", input: "test" }),
      });
      const res = await POST(req);
      const body = await res.text();
      // It might be 400, 404, etc. because of downstream failure, but NOT 401.
      assert.notStrictEqual(res.status, 401, "Should not be 401 Unauthorized");
    } finally {
      globalThis.fetch = originalFetch;
      delete process.env.OMNIROUTE_API_KEY;
    }
  });

  // Restore original env in case of failure
  process.env.REQUIRE_API_KEY = originalRequireApiKey;
  process.env.OMNIROUTE_API_KEY = originalOmniKey;
});
