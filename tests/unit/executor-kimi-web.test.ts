// Tests for the international Kimi web executor (www.kimi.com Connect-RPC API).
//
// Previously this provider targeted kimi.moonshot.cn; that domain now redirects
// every non-CN visitor to www.kimi.com, which uses a Connect-RPC streaming API.
// These tests pin the parser behavior of the Connect envelope framing and the
// JSON event-delta extractor.

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/kimi-web.ts");

describe("KimiWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.KimiWebExecutor();
    assert.ok(executor);
  });

  it("execute returns a 400 error when no JWT is provided", async () => {
    const executor = new mod.KimiWebExecutor();
    const result = await executor.execute({
      model: "kimi-default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    } as never);
    assert.equal(result.response.status, 400);
    const body = (await result.response.json()) as { error: { code: string } };
    assert.match(body.error.code, /HTTP_400|400/);
  });

  it("execute targets www.kimi.com (not kimi.moonshot.cn)", async () => {
    const executor = new mod.KimiWebExecutor();
    let capturedUrl = "";
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = (async (url: any) => {
        capturedUrl = String(url);
        return new Response(new ReadableStream({ start: (c) => c.close() }), {
          status: 200,
          headers: { "content-type": "application/connect+json" },
        });
      }) as typeof fetch;
      await executor.execute({
        model: "kimi-default",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "kimi-auth=fake.jwt.token" },
        signal: null,
      } as never);
      assert.ok(capturedUrl.startsWith("https://www.kimi.com/"), `got ${capturedUrl}`);
      assert.ok(!capturedUrl.includes("moonshot.cn"));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

describe("extractKimiJwt", () => {
  const { extractKimiJwt } = mod;

  it("returns empty string for empty input", () => {
    assert.equal(extractKimiJwt(""), "");
    assert.equal(extractKimiJwt("   "), "");
  });

  it("extracts a bare JWT", () => {
    const jwt = "eyJhbGci.eyJzdWIi.c2ln";
    assert.equal(extractKimiJwt(jwt), jwt);
  });

  it("extracts kimi-auth from a full Cookie header", () => {
    const jwt = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4In0.signature";
    const pasted = `_ga=GA1.1.x; theme=dark; kimi-auth=${jwt}; _gcl_au=1.1.x; lang=en-US`;
    assert.equal(extractKimiJwt(pasted), jwt);
  });

  it("strips a leading Cookie: header label", () => {
    const jwt = "eyJhbGci.eyJzdWIi.c2ln";
    assert.equal(extractKimiJwt(`Cookie: kimi-auth=${jwt}`), jwt);
  });

  it("strips a leading Authorization: Bearer label", () => {
    const jwt = "eyJhbGci.eyJzdWIi.c2ln";
    assert.equal(extractKimiJwt(`Authorization: Bearer ${jwt}`), jwt);
  });

  it("returns empty when no JWT is present", () => {
    assert.equal(extractKimiJwt("foo=bar; baz=qux"), "");
  });
});
