import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { isOpencodePassthroughClient, buildNonClientRefusal } =
  await import("../../open-sse/executors/opencodeClientGate.ts");

function headersOf(pairs: Array<[string, string]>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of pairs) out[key] = value;
  return out;
}

describe("OpenCode passthrough client gate", () => {
  it("accepts the OpenCode client identity (versioned user agent with session id)", () => {
    const headers = headersOf([
      ["user-agent", "opencode/1.18.31"],
      ["x-opencode-session-id", "ses_abc123"],
    ]);
    assert.equal(isOpencodePassthroughClient(headers), true);
  });

  it("accepts mixed-case header names and user agent values", () => {
    const headers = headersOf([
      ["User-Agent", "OpenCode/2.4.0"],
      ["X-OpenCode-Session-Id", "ses_abc123"],
    ]);
    assert.equal(isOpencodePassthroughClient(headers), true);
  });

  it("refuses a bare curl caller with no client identity", () => {
    const headers = headersOf([["user-agent", "curl/8.4.0"]]);
    assert.equal(isOpencodePassthroughClient(headers), false);
  });

  it("refuses a versioned user agent without a session id", () => {
    const headers = headersOf([["user-agent", "opencode/1.18.31"]]);
    assert.equal(isOpencodePassthroughClient(headers), false);
  });

  it("refuses a session id carried by a generic SDK user agent", () => {
    const headers = headersOf([
      ["user-agent", "curl/8.4.0"],
      ["x-opencode-session-id", "ses_abc123"],
    ]);
    assert.equal(isOpencodePassthroughClient(headers), false);
  });

  it("refuses an empty session id", () => {
    const headers = headersOf([
      ["user-agent", "opencode/1.18.31"],
      ["x-opencode-session-id", "   "],
    ]);
    assert.equal(isOpencodePassthroughClient(headers), false);
  });

  it("accepts the live x-opencode-session header form", () => {
    const headers = headersOf([
      ["user-agent", "opencode/1.18.31"],
      ["x-opencode-session", "ses_abc123"],
    ]);
    assert.equal(isOpencodePassthroughClient(headers), true);
  });

  it("reads the user agent from the explicit argument when headers carry none", () => {
    assert.equal(
      isOpencodePassthroughClient(
        headersOf([["x-opencode-session-id", "ses_abc123"]]),
        "opencode/1.18.31"
      ),
      true
    );
  });

  it("reads production-shaped client headers built by the shared normalizer", async () => {
    const { buildExecutorClientHeaders } =
      await import("../../open-sse/handlers/chatCore/executorClientHeaders.ts");
    const raw = new Headers();
    raw.set("user-agent", "opencode/1.18.31");
    raw.set("x-opencode-session-id", "ses_abc123");
    const headers = buildExecutorClientHeaders(raw, null, null);
    assert.equal(isOpencodePassthroughClient(headers), true);
  });

  it("refuses a non-client caller with a 403 JSON error body", async () => {
    const result = buildNonClientRefusal();
    assert.ok("response" in result);
    const response = (result as { response: Response }).response;
    assert.equal(response.status, 403);
    const body = (await response.json()) as { error: { message: string } };
    assert.ok(body.error.message.includes("OpenCode client"));
    assert.ok(!body.error.message.includes("at /"));
  });
});
