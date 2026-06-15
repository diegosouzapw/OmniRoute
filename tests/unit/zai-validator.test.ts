import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

// #3905 — Z.AI (glm) provider validation must use directHttpsRequest (native HTTPS,
// bypass the undici pool) for the same reason NVIDIA uses it in #3226: api.z.ai
// silently drops idle keep-alive sockets without TCP RST after 502 responses,
// causing undici to reuse dead sockets and hang for up to headersTimeout (600 s).
//
// Test design (same approach as nvidia-nim-validator.test.ts):
//   - Import at FILE LOAD so proxyFetch captures the unpatched globalThis.fetch.
//   - Redirect the validator at a local HTTP server via providerSpecificData.baseUrl.
//     The safeOutboundFetch guard is "none" for validation calls, so 127.0.0.1 is
//     reachable. directHttpsRequest accepts plain HTTP URLs in test environments.
//   - Assert that (a) the correct auth header is used, (b) 401/403 → "Invalid API key",
//     (c) any other status → valid (including 502 which is z.ai's queue timeout, not auth).
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

async function withMockServer(
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void,
  fn: (baseUrl: string) => Promise<void>
): Promise<void> {
  const server = http.createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  // Omit the path — the validator appends ?beta=true itself via the baseUrl override.
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await fn(baseUrl);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

test("zai validator returns Invalid API key on 401", async () => {
  await withMockServer(
    (_req, res) => {
      res.writeHead(401, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: { message: "token expired or incorrect", type: "401" } }));
    },
    async (baseUrl) => {
      const result = await validateProviderApiKey({
        provider: "zai",
        apiKey: "bad-key",
        providerSpecificData: { baseUrl },
      });
      assert.equal(result.valid, false);
      assert.equal(result.error, "Invalid API key");
    }
  );
});

test("zai validator returns Invalid API key on 403", async () => {
  await withMockServer(
    (_req, res) => {
      res.writeHead(403, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: { message: "forbidden" } }));
    },
    async (baseUrl) => {
      const result = await validateProviderApiKey({
        provider: "zai",
        apiKey: "bad-key",
        providerSpecificData: { baseUrl },
      });
      assert.equal(result.valid, false);
      assert.equal(result.error, "Invalid API key");
    }
  );
});

test("zai validator accepts a successful 200 probe", async () => {
  await withMockServer(
    (_req, res) => {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ content: [{ text: "x" }] }));
    },
    async (baseUrl) => {
      const result = await validateProviderApiKey({
        provider: "zai",
        apiKey: "valid-key",
        providerSpecificData: { baseUrl },
      });
      assert.equal(result.valid, true);
      assert.equal(result.error, null);
    }
  );
});

test("zai validator treats 502 as valid (z.ai queue timeout is not an auth error)", async () => {
  await withMockServer(
    (_req, res) => {
      res.writeHead(502, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: { message: "job timed out after 120s" } }));
    },
    async (baseUrl) => {
      const result = await validateProviderApiKey({
        provider: "zai",
        apiKey: "valid-key",
        providerSpecificData: { baseUrl },
      });
      assert.equal(result.valid, true);
    }
  );
});

test("zai validator sends x-api-key header (Anthropic wire format, not Bearer)", async () => {
  let capturedHeaders: http.IncomingHttpHeaders = {};
  let capturedMethod = "";
  let capturedBody = "";

  await withMockServer(
    (req, res) => {
      capturedHeaders = req.headers;
      capturedMethod = req.method ?? "";
      let body = "";
      req.on("data", (chunk) => {
        body += String(chunk);
      });
      req.on("end", () => {
        capturedBody = body;
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({}));
      });
    },
    async (baseUrl) => {
      await validateProviderApiKey({
        provider: "zai",
        apiKey: "test-zai-key-123",
        providerSpecificData: { baseUrl },
      });
    }
  );

  assert.equal(capturedMethod, "POST");
  assert.equal(
    capturedHeaders["x-api-key"],
    "test-zai-key-123",
    "must use x-api-key, not Authorization: Bearer"
  );
  assert.ok(
    !capturedHeaders["authorization"],
    `must not send Authorization header, got: ${capturedHeaders["authorization"]}`
  );
  assert.equal(capturedHeaders["anthropic-version"], "2023-06-01");
  assert.equal(capturedHeaders["content-type"], "application/json");

  const body = JSON.parse(capturedBody);
  assert.equal(body.model, "glm-5.1");
  assert.equal(body.max_tokens, 1);
  assert.deepEqual(body.messages, [{ role: "user", content: "test" }]);
});

test("zai validator uses directHttpsRequest (does not proxy through undici pool)", async () => {
  // The key invariant: directHttpsRequest calls safeOutboundFetch with
  // bypassProxyPatch:true, which uses the original (pre-patch) native fetch.
  // This means patching globalThis.fetch AFTER module load must NOT intercept it.
  // If the validator were using validationWrite (undici), globalThis.fetch would
  // still be the patched version at call time and we would see our mock called.
  let mockCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (...args: Parameters<typeof fetch>) => {
    mockCalled = true;
    return originalFetch(...args);
  };

  try {
    await withMockServer(
      (_req, res) => {
        res.writeHead(200, { "content-type": "application/json" });
        res.end("{}");
      },
      async (baseUrl) => {
        await validateProviderApiKey({
          provider: "zai",
          apiKey: "key",
          providerSpecificData: { baseUrl },
        });
      }
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(
    mockCalled,
    false,
    "zai validator must use bypassProxyPatch path, not the patched globalThis.fetch"
  );
});
