import { test } from "node:test";
import assert from "node:assert/strict";
import { waferProvider } from "../../open-sse/config/providers/registry/wafer/index.ts";

test("wafer provider is Anthropic-compatible with Bearer auth", () => {
  assert.equal(waferProvider.id, "wafer");
  assert.equal(waferProvider.format, "claude");
  assert.equal(waferProvider.baseUrl, "https://pass.wafer.ai/v1/messages");
  assert.equal(waferProvider.authHeader, "bearer"); // NOT x-api-key → executor sends Authorization: Bearer
  assert.ok(Array.isArray(waferProvider.models) && waferProvider.models.length > 0);
});
