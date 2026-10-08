import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  MODEL_ACCESS_DENIED_PATTERNS,
  isProviderModelUnsupported400,
} from "../../open-sse/services/accountFallback.ts";

const CLIPROXYAPI_ERROR_TEXT = "unknown provider for model Qwen/Qwen3.6-27B-TEE";

describe("#12800 — CLIProxyAPI 'unknown provider for model X' classification", () => {
  it("MODEL_ACCESS_DENIED_PATTERNS should recognize it as a model-access-denied 400", () => {
    const matches = MODEL_ACCESS_DENIED_PATTERNS.some((p) => p.test(CLIPROXYAPI_ERROR_TEXT));
    assert.equal(matches, true);
  });

  it("isProviderModelUnsupported400() should recognize it as provider-wide unsupported", () => {
    const result = isProviderModelUnsupported400(400, CLIPROXYAPI_ERROR_TEXT);
    assert.equal(result, true);
  });

  it("should not match a genuine auth/credential error", () => {
    const authText = "invalid api key for model Qwen/Qwen3.6-27B-TEE";
    assert.equal(isProviderModelUnsupported400(400, authText), false);
  });
});
