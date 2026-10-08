import assert from "node:assert/strict";
import test from "node:test";

import { applyHuggingFaceBillToHeader } from "../../open-sse/executors/base/headers.ts";

test("applyHuggingFaceBillToHeader sets X-HF-Bill-To when billTo is present", () => {
  const headers: Record<string, string> = {};
  applyHuggingFaceBillToHeader(headers, { billTo: "account-123" });
  assert.equal(headers["X-HF-Bill-To"], "account-123");
});

test("applyHuggingFaceBillToHeader trims the billTo value", () => {
  const headers: Record<string, string> = {};
  applyHuggingFaceBillToHeader(headers, { billTo: "  account-123  " });
  assert.equal(headers["X-HF-Bill-To"], "account-123");
});

test("applyHuggingFaceBillToHeader is a no-op when billTo is missing, blank, or non-string", () => {
  const cases: Array<{ label: string; psd: unknown }> = [
    { label: "undefined psd", psd: undefined },
    { label: "null psd", psd: null },
    { label: "empty object", psd: {} },
    { label: "blank string", psd: { billTo: "   " } },
    { label: "empty string", psd: { billTo: "" } },
    { label: "non-string value", psd: { billTo: 42 } },
  ];
  for (const { label, psd } of cases) {
    const headers: Record<string, string> = { "User-Agent": "omniroute" };
    applyHuggingFaceBillToHeader(headers, psd as Record<string, unknown> | null | undefined);
    assert.equal(headers["X-HF-Bill-To"], undefined, `${label} must not set the header`);
    assert.equal(headers["User-Agent"], "omniroute", `${label} must not touch other headers`);
  }
});

test("applyHuggingFaceBillToHeader overwrites a previously set X-HF-Bill-To value", () => {
  // The executor request loop runs on every attempt (including fallback URL rebuilds),
  // so a fresh connection's billTo must win over any stale header from a prior attempt.
  const headers: Record<string, string> = { "X-HF-Bill-To": "stale-account" };
  applyHuggingFaceBillToHeader(headers, { billTo: "fresh-account" });
  assert.equal(headers["X-HF-Bill-To"], "fresh-account");
});
