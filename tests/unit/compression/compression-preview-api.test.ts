import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  PreviewCompressionConfigSchema,
  PreviewRequestSchema,
} from "../../../src/app/api/compression/preview/route.ts";

describe("compression preview API contract", () => {
  it("accepts RTK and stacked preview payloads", () => {
    assert.equal(
      PreviewRequestSchema.safeParse({
        messages: [{ role: "tool", content: "same\nsame\nsame" }],
        mode: "rtk",
        config: {
          rtkConfig: {
            intensity: "standard",
            applyToToolResults: true,
            customFiltersEnabled: true,
            rawOutputRetention: "never",
          },
        },
      }).success,
      true
    );

    assert.equal(
      PreviewRequestSchema.safeParse({
        messages: [{ role: "tool", content: "same\nsame\nsame" }],
        mode: "stacked",
        config: {
          stackedPipeline: [
            { engine: "rtk", intensity: "standard" },
            { engine: "caveman", intensity: "full" },
          ],
        },
      }).success,
      true
    );
  });

  it("rejects invalid preview config instead of accepting arbitrary records", () => {
    assert.equal(PreviewCompressionConfigSchema.safeParse({ unknown: true }).success, false);
    assert.equal(
      PreviewRequestSchema.safeParse({
        messages: [{ role: "tool", content: "x" }],
        mode: "rtk",
        config: { rtkConfig: { intensity: "extreme" } },
      }).success,
      false
    );
    assert.equal(
      PreviewCompressionConfigSchema.safeParse({
        stackedPipeline: [{ engine: "rtk", intensity: "bogus" }],
      }).success,
      false
    );
    assert.equal(
      PreviewCompressionConfigSchema.safeParse({
        stackedPipeline: [{ engine: "rtk", config: { maxLinesPerResult: -1 } }],
      }).success,
      false
    );
  });
});
