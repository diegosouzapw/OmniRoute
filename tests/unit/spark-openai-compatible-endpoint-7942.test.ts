import { test } from "node:test";
import assert from "node:assert/strict";
import { iflytekProvider } from "../../open-sse/config/providers/registry/iflytek/index.ts";
import { sparkdeskProvider } from "../../open-sse/config/providers/registry/sparkdesk/index.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";

// #7942: both entries declare format: "openai" + authHeader: "bearer", but pointed at
// spark-api.xf-yun.com — Spark's WebSocket host, which authenticates with an
// HMAC-SHA256 signature over app_id/apiKey/apiSecret and rejects bearer tokens. The
// OpenAI-compatible HTTP API lives on spark-api-open.xf-yun.com/v1.

test("#7942: iflytek registry baseUrl uses Spark's OpenAI-compatible HTTP host", () => {
  assert.equal(
    iflytekProvider.baseUrl,
    "https://spark-api-open.xf-yun.com/v1/chat/completions",
    "iflytek must route through the OpenAI-compatible HTTP endpoint, not the " +
      "WebSocket-only spark-api.xf-yun.com host (which rejects bearer auth)"
  );
});

test("#7942: sparkdesk registry baseUrl uses Spark's OpenAI-compatible HTTP host", () => {
  assert.equal(
    sparkdeskProvider.baseUrl,
    "https://spark-api-open.xf-yun.com/v1/chat/completions",
    "sparkdesk must route through the OpenAI-compatible HTTP endpoint, not the " +
      "WebSocket-only spark-api.xf-yun.com/v3.1 host (which rejects bearer auth)"
  );
});

test("#7942: sparkdesk no longer advertises the WebSocket-only 'general' domain", () => {
  const modelIds = sparkdeskProvider.models.map((m) => m.id);
  assert.ok(
    !modelIds.includes("general"),
    "'general' is a WebSocket-domain value rejected by the HTTP endpoint"
  );
  assert.ok(
    modelIds.includes("lite"),
    "sparkdesk should advertise 'lite' (Spark Lite) in place of the removed 'general' domain"
  );
});

test("#7942: free-model catalog's sparkdesk row references a model the registry still advertises", () => {
  const sparkdeskModelIds = new Set(sparkdeskProvider.models.map((m) => m.id));
  const catalogRows = FREE_MODEL_BUDGETS.filter((row) => row.provider === "sparkdesk");
  assert.ok(catalogRows.length > 0, "expected at least one sparkdesk row in the free catalog");
  for (const row of catalogRows) {
    assert.ok(
      sparkdeskModelIds.has(row.modelId),
      `free catalog references sparkdesk/${row.modelId}, which the registry no longer advertises`
    );
  }
});
