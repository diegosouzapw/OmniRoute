import { describe, it } from "node:test";
import { equal } from "node:assert/strict";

describe("Forwarded upstream response-header budget (#9243)", () => {
  it("resolveForwardedHeaderBudget returns default 768 when env is unset", async () => {
    const { resolveForwardedHeaderBudget } = await import(
      "@/../open-sse/handlers/chatCore/responseHeaders"
    );
    equal(resolveForwardedHeaderBudget(undefined), 768);
    equal(resolveForwardedHeaderBudget(), 768);
  });

  it("resolveForwardedHeaderBudget overrides with a valid value", async () => {
    const { resolveForwardedHeaderBudget } = await import(
      "@/../open-sse/handlers/chatCore/responseHeaders"
    );
    equal(resolveForwardedHeaderBudget("2048"), 2048);
    equal(resolveForwardedHeaderBudget("1"), 1);
    equal(resolveForwardedHeaderBudget("4096"), 4096);
  });

  it("resolveForwardedHeaderBudget falls back to default on invalid input", async () => {
    const { resolveForwardedHeaderBudget } = await import(
      "@/../open-sse/handlers/chatCore/responseHeaders"
    );
    equal(resolveForwardedHeaderBudget(""), 768, "empty string");
    equal(resolveForwardedHeaderBudget("abc"), 768, "non-numeric");
    equal(resolveForwardedHeaderBudget("0"), 768, "zero");
    equal(resolveForwardedHeaderBudget("-1"), 768, "negative");
  });
});
