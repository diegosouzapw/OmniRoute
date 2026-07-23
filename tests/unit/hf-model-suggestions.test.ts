import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveHfPipelineTag,
  sortHfSuggestedModels,
  type HfModelSummary,
} from "../../open-sse/services/hfModelSuggestions.ts";

test("resolveHfPipelineTag: maps the 'image' kind to HF's text-to-image pipeline_tag", () => {
  assert.equal(resolveHfPipelineTag("image"), "text-to-image");
});

test("resolveHfPipelineTag: returns null for an unmapped kind", () => {
  assert.equal(resolveHfPipelineTag("video"), null);
  assert.equal(resolveHfPipelineTag("does-not-exist"), null);
});

test("sortHfSuggestedModels: sorts descending by downloads (default)", () => {
  const models: HfModelSummary[] = [
    { id: "a/low", downloads: 10, likes: 500 },
    { id: "b/high", downloads: 1000, likes: 1 },
    { id: "c/mid", downloads: 100, likes: 50 },
  ];

  const result = sortHfSuggestedModels(models);
  assert.deepEqual(
    result.map((m) => m.id),
    ["b/high", "c/mid", "a/low"]
  );
});

test("sortHfSuggestedModels: sorts descending by likes when requested", () => {
  const models: HfModelSummary[] = [
    { id: "a/low", downloads: 10, likes: 500 },
    { id: "b/high", downloads: 1000, likes: 1 },
    { id: "c/mid", downloads: 100, likes: 50 },
  ];

  const result = sortHfSuggestedModels(models, "likes");
  assert.deepEqual(
    result.map((m) => m.id),
    ["a/low", "c/mid", "b/high"]
  );
});

test("sortHfSuggestedModels: caps results at the requested limit", () => {
  const models: HfModelSummary[] = Array.from({ length: 30 }, (_, i) => ({
    id: `model/${i}`,
    downloads: i,
  }));

  const result = sortHfSuggestedModels(models, "downloads", 5);
  assert.equal(result.length, 5);
  // Highest downloads (29..25) come first
  assert.deepEqual(
    result.map((m) => m.id),
    ["model/29", "model/28", "model/27", "model/26", "model/25"]
  );
});

test("sortHfSuggestedModels: drops entries without a usable string id", () => {
  const models = [
    { id: "", downloads: 999 },
    { id: "  ", downloads: 998 },
    { downloads: 997 },
    { id: "valid/model", downloads: 1 },
  ] as HfModelSummary[];

  const result = sortHfSuggestedModels(models);
  assert.deepEqual(
    result.map((m) => m.id),
    ["valid/model"]
  );
});

test("sortHfSuggestedModels: treats missing/non-numeric metric values as 0 (no throw)", () => {
  const models = [
    { id: "a/no-metric" },
    { id: "b/has-metric", downloads: 5 },
    { id: "c/nan-metric", downloads: Number.NaN },
  ] as HfModelSummary[];

  const result = sortHfSuggestedModels(models, "downloads");
  assert.deepEqual(
    result.map((m) => m.id),
    ["b/has-metric", "a/no-metric", "c/nan-metric"]
  );
});

test("sortHfSuggestedModels: handles an empty input array", () => {
  assert.deepEqual(sortHfSuggestedModels([]), []);
});

test("sortHfSuggestedModels: falls back to a default limit for an invalid limit value", () => {
  const models: HfModelSummary[] = Array.from({ length: 25 }, (_, i) => ({
    id: `model/${i}`,
    downloads: i,
  }));

  const result = sortHfSuggestedModels(models, "downloads", 0);
  assert.equal(result.length, 20);
});
