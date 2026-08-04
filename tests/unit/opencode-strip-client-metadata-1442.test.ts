import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");

/**
 * Regression test for upstream decolua/9router#1442:
 *
 * OpenCode upstreams (e.g. kimi-k2.6 via opencode-go) reject the
 * `client_metadata` passthrough field (an OpenAI-Codex/Claude-CLI artifact)
 * with 400 "Extra inputs are not permitted, field: 'client_metadata'".
 * DefaultExecutor strips it only for cerebras/mistral, and OpencodeExecutor
 * extends BaseExecutor directly, so nothing removed it on the opencode path.
 * OpencodeExecutor.transformRequest must strip it.
 */
describe("OpencodeExecutor — strips client_metadata (#1442)", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const CREDENTIALS = { apiKey: "k" } as Record<string, unknown>;

  function body() {
    return {
      model: "oc/kimi-k2.6",
      stream: true,
      client_metadata: { user_id: "abc" },
      messages: [{ role: "user", content: "hi" }],
    };
  }

  it("removes client_metadata from the forwarded body", () => {
    const out = executor.transformRequest("oc/kimi-k2.6", body(), true, CREDENTIALS) as Record<
      string,
      unknown
    >;
    assert.equal(
      Object.prototype.hasOwnProperty.call(out, "client_metadata"),
      false,
      "opencode forward body must not carry client_metadata"
    );
    assert.ok(Array.isArray(out.messages), "messages preserved");
  });

  it("is a no-op when client_metadata is absent", () => {
    const b = body();
    delete (b as Record<string, unknown>).client_metadata;
    const out = executor.transformRequest("oc/kimi-k2.6", b, true, CREDENTIALS) as Record<
      string,
      unknown
    >;
    assert.equal("client_metadata" in out, false);
    assert.ok(Array.isArray(out.messages));
  });
});
