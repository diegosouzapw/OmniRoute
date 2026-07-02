import test from "node:test";
import assert from "node:assert/strict";

const { formatProviderError } = await import("../../open-sse/utils/error.ts");

test("formatProviderError: appends low-level cause.code for fetch failures", () => {
  const err = Object.assign(new Error("fetch failed"), {
    cause: { code: "UND_ERR_SOCKET" },
  });
  const out = formatProviderError(err, "openai", "gpt-4o", null);
  assert.equal(out, "[FETCH_FAILED]: fetch failed (cause: UND_ERR_SOCKET)");
});

test("formatProviderError: appends both cause.code and cause.message when present", () => {
  const err = Object.assign(new Error("fetch failed"), {
    cause: { code: "ECONNRESET", message: "socket hang up" },
  });
  const out = formatProviderError(err, "anthropic", "claude-3", null);
  assert.equal(out, "[FETCH_FAILED]: fetch failed (cause: ECONNRESET: socket hang up)");
});

test("formatProviderError: appends only cause.message when code is absent", () => {
  const err = Object.assign(new Error("fetch failed"), {
    cause: { message: "ETIMEDOUT raised" },
  });
  const out = formatProviderError(err, "gemini", "gemini-2", null);
  assert.equal(out, "[FETCH_FAILED]: fetch failed (cause: ETIMEDOUT raised)");
});

test("formatProviderError: no cause suffix when error has no cause", () => {
  const err = { code: "rate_limited", message: "Too many requests" };
  const out = formatProviderError(err, "openai", "gpt-4o", 429);
  assert.equal(out, "[429]: Too many requests");
});

test("formatProviderError: ignores a cause that carries neither code nor message", () => {
  const err = Object.assign(new Error("boom"), { cause: {} });
  const out = formatProviderError(err, "openai", "gpt-4o", null);
  assert.equal(out, "[FETCH_FAILED]: boom");
});

test("formatProviderError: handles a primitive (string) cause without crashing", () => {
  const err = Object.assign(new Error("boom"), { cause: "raw string cause" });
  const out = formatProviderError(err, "openai", "gpt-4o", null);
  // primitive cause has no .code/.message → no suffix appended
  assert.equal(out, "[FETCH_FAILED]: boom");
});
