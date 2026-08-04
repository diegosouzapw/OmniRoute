import test from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";

/**
 * Generic BaseExecutor consumer — no buildHeaders() override — representing
 * every provider (xai, cliproxyapi, chipotle, mimocode, ninerouter, theoldllm,
 * gitlab, ...) that relies on BaseExecutor.buildHeaders() as-is.
 *
 * Regression guard for #8467/#8493: resolveEffectiveKey() already rotates to
 * an extra key when the primary apiKey is empty, but the header-write gate in
 * buildHeaders() tested the raw `credentials.apiKey` instead of the resolved
 * `effectiveKey` — so with an empty primary + populated extras, no
 * Authorization header was ever written, even though a valid key existed.
 */
class GenericExecutor extends BaseExecutor {
  constructor() {
    super("generic-provider", {
      baseUrls: ["https://default.example/v1/chat/completions"],
    });
  }

  async transformRequest(model: string, body: unknown, stream: boolean) {
    return body;
  }
}

test("buildHeaders: writes Authorization from the rotated extra key when primary apiKey is empty (#8467/#8493)", () => {
  const executor = new GenericExecutor();
  const headers = executor.buildHeaders({
    apiKey: "",
    connectionId: "generic-empty-primary",
    providerSpecificData: { extraApiKeys: ["sk-extra-only"] },
  });

  assert.equal(headers["Authorization"], "Bearer sk-extra-only");
});
