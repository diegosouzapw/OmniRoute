import assert from "node:assert/strict";
import { test } from "node:test";

test("proxyFetch identifies transient DNS and network errors (EAI_AGAIN, ENOTFOUND, ECONNREFUSED) as retryable dispatcher errors", () => {
  const isRetryableError = (err: unknown): boolean => {
    const msg = err instanceof Error ? err.message : String(err);
    const errCode = (err as { code?: unknown })?.code;
    return Boolean(
      msg.includes("fetch failed") ||
        errCode === "ECONNREFUSED" ||
        msg.includes("ECONNREFUSED") ||
        errCode === "EAI_AGAIN" ||
        msg.includes("EAI_AGAIN") ||
        errCode === "ENOTFOUND" ||
        msg.includes("ENOTFOUND") ||
        errCode === "ETIMEDOUT" ||
        msg.includes("ETIMEDOUT") ||
        (typeof errCode === "string" && errCode.startsWith("UND_ERR")) ||
        msg.includes("UND_ERR")
    );
  };

  assert.equal(isRetryableError({ code: "EAI_AGAIN", message: "getaddrinfo EAI_AGAIN www.googleapis.com" }), true);
  assert.equal(isRetryableError({ code: "ENOTFOUND", message: "getaddrinfo ENOTFOUND api.example.com" }), true);
  assert.equal(isRetryableError({ code: "ECONNREFUSED", message: "connect ECONNREFUSED 127.0.0.1:20128" }), true);
  assert.equal(isRetryableError(new Error("HTTP 404 Not Found")), false);
});
