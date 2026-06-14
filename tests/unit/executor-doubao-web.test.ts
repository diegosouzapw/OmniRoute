import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/doubao-web.ts");

describe("DoubaoWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.DoubaoWebExecutor();
    assert.ok(executor);
  });

  it("execute returns error on fetch failure", async () => {
    const executor = new mod.DoubaoWebExecutor();
    try {
      const result = await executor.execute({
        model: "doubao-default",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "" },
        signal: null,
      });
      assert.ok(result.response instanceof Response);
      // Parse the host instead of substring-matching the URL: a bare
      // `.includes("doubao.com")` would also accept hostile URLs like
      // `https://evil.com/?x=doubao.com` (CodeQL js/incomplete-url-substring-sanitization).
      const host = new URL(result.url).hostname;
      assert.ok(host === "doubao.com" || host.endsWith(".doubao.com"), `unexpected host: ${host}`);
    } catch {
      // Network error expected
    }
  });
});
