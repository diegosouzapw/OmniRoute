import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

// #2463 — NVIDIA NIM validation must not crash with `e.startsWith is not a function`
// when providerSpecificData has malformed shapes; and the validation must use a
// direct chat probe instead of the /models probe.
//
// #3226 — the validator now probes via `directHttpsRequest` → `safeOutboundFetch`
// with `bypassProxyPatch: true`, which uses the ORIGINAL (un-patched) native fetch
// captured at module load. Patching `globalThis.fetch` in the test no longer
// intercepts it, so we point `baseUrl` at a real local HTTP server instead (the
// outbound guard is "none" for validation, so 127.0.0.1 is reachable). This
// exercises the true code path end-to-end without a real upstream call.
//
// IMPORTANT: import the validator at FILE LOAD (top-level), not lazily inside a
// test. `proxyFetch` captures the un-patched `globalThis.fetch` on its first
// import; if the first import happened inside a test that had already patched
// `globalThis.fetch`, `getOriginalFetch()` would forever return that test's mock
// and poison every later bypass call. Loading here pins the real native fetch.
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

async function withMockServer(
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void,
  fn: (baseUrl: string) => Promise<void>
): Promise<void> {
  const server = http.createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  const baseUrl = `http://127.0.0.1:${port}/v1`;
  try {
    await fn(baseUrl);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

test("normalizeBaseUrl tolerates non-string baseUrl without throwing", async () => {
  // Call validation entrypoint with a non-string baseUrl in PSD; the function
  // should return a normal Validation result (not throw a TypeError such as
  // `e.startsWith is not a function` after minification — see #2463). A malformed
  // baseUrl normalizes to "" and yields an invalid relative probe URL, which the
  // outbound layer rejects gracefully — so no real upstream call is made.
  const result = await validateProviderApiKey({
    provider: "nvidia",
    apiKey: "nv-test-key",
    providerSpecificData: { baseUrl: { not: "a string" } as any },
  });
  assert.equal(typeof result, "object");
  assert.equal(typeof result.valid, "boolean");
  if (!result.valid && typeof result.error === "string") {
    assert.ok(
      !result.error.includes("startsWith"),
      `error must not mention startsWith TypeError, got: ${result.error}`
    );
    assert.ok(
      !result.error.includes("is not a function"),
      `error must not mention TypeError, got: ${result.error}`
    );
  }
});

test("nvidia specialty validator returns Invalid API key on 401", async () => {
  await withMockServer(
    (_req, res) => {
      res.writeHead(401, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "unauthorized" }));
    },
    async (baseUrl) => {
      const result = await validateProviderApiKey({
        provider: "nvidia",
        apiKey: "nv-badkey",
        providerSpecificData: { baseUrl },
      });
      assert.equal(result.valid, false);
      assert.equal(result.error, "Invalid API key");
    }
  );
});

test("nvidia specialty validator accepts a successful chat probe", async () => {
  const calls: string[] = [];
  await withMockServer(
    (req, res) => {
      calls.push(String(req.url));
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({}));
    },
    async (baseUrl) => {
      const result = await validateProviderApiKey({
        provider: "nvidia",
        apiKey: "nv-key",
        providerSpecificData: { baseUrl },
      });
      assert.equal(result.valid, true);
      assert.ok(
        calls.every((u) => !u.endsWith("/v1/models")),
        `should not call /v1/models, called: ${JSON.stringify(calls)}`
      );
      assert.ok(
        calls.some((u) => u.endsWith("/chat/completions")),
        `should call /chat/completions, called: ${JSON.stringify(calls)}`
      );
    }
  );
});

test("nvidia specialty validator falls back to stable chat validation model", async () => {
  let payload: any = null;
  const calls: string[] = [];
  await withMockServer(
    (req, res) => {
      calls.push(String(req.url));
      let body = "";
      req.on("data", (chunk) => {
        body += String(chunk);
      });
      req.on("end", () => {
        if (String(req.url).endsWith("/chat/completions")) {
          payload = JSON.parse(body || "{}");
        }
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({}));
      });
    },
    async (baseUrl) => {
      const result = await validateProviderApiKey({
        provider: "nvidia",
        apiKey: "nv-key",
        providerSpecificData: { baseUrl },
      });
      assert.equal(result.valid, true);
      assert.ok(
        calls.some((u) => u.endsWith("/chat/completions")),
        `should fall back to /chat/completions, called: ${JSON.stringify(calls)}`
      );
      assert.equal(payload?.model, "meta/llama-3.1-8b-instruct");
    }
  );
});
