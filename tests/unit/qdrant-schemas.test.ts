import test from "node:test";
import assert from "node:assert/strict";

import {
  QdrantHealthResultSchema,
  QdrantSearchSchema,
  QdrantSettingsSchema,
  QdrantSettingsUpdateSchema,
} from "../../src/shared/schemas/qdrant.ts";

test("qdrant schema module keeps runtime request and response schemas exported", () => {
  assert.equal(typeof QdrantSettingsSchema.safeParse, "function");
  assert.equal(typeof QdrantSettingsUpdateSchema.safeParse, "function");
  assert.equal(typeof QdrantSearchSchema.safeParse, "function");
  assert.equal(typeof QdrantHealthResultSchema.safeParse, "function");
});

test("QdrantSettingsUpdateSchema validates partial updates", () => {
  const result = QdrantSettingsUpdateSchema.safeParse({
    enabled: true,
    host: "qdrant.local",
    port: 6334,
  });

  assert.equal(result.success, true);
});

test("QdrantSearchSchema applies the default topK", () => {
  const result = QdrantSearchSchema.safeParse({ query: "semantic search" });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.topK, 5);
  }
});
