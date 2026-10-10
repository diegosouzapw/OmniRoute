import test from "node:test";
import assert from "node:assert/strict";

const { normalizeOpenAiLikeModelsResponse } =
  await import("../../src/app/api/providers/[id]/models/discovery/normalizers.ts");

test("normalizeOpenAiLikeModelsResponse keeps reasoning effort declarations (#15762)", () => {
  const out = normalizeOpenAiLikeModelsResponse(
    {
      data: [
        {
          id: "GLM-5.3",
          reasoning: { supported: true, supported_efforts: ["max", "high", "low"] },
          context_length: 1234,
          pricing: { prompt: "1" },
        },
        { id: "plain" },
      ],
    },
    "owner"
  ) as Array<Record<string, unknown>>;
  assert.deepEqual((out[0].reasoning as { supported_efforts: string[] }).supported_efforts, [
    "max",
    "high",
    "low",
  ]);
  assert.equal(out[0].owned_by, "owner");
  assert.equal("context_length" in out[0], false);
  assert.equal("pricing" in out[0], false);
  assert.deepEqual(Object.keys(out[1]).sort(), ["id", "name", "owned_by"]);
});
