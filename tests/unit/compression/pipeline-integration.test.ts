import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  applyCompression,
  applyStackedCompression,
} from "../../../open-sse/services/compression/index.ts";

describe("compression pipeline integration", () => {
  it("runs stacked compression in RTK then Caveman order", () => {
    const body = {
      messages: [
        {
          role: "tool",
          content: Array.from({ length: 8 }, () => "same noisy line").join("\n"),
        },
        {
          role: "user",
          content: "Please provide a detailed explanation of the authentication configuration",
        },
      ],
    };

    const result = applyStackedCompression(body, [
      { engine: "rtk", intensity: "standard" },
      { engine: "caveman", intensity: "full" },
    ]);

    assert.equal(result.stats?.engine, "stacked");
    assert.deepEqual(
      result.stats?.engineBreakdown?.map((entry) => entry.engine),
      ["rtk", "caveman"]
    );
    assert.ok(result.stats?.techniquesUsed.includes("rtk-dedup"));
  });

  it("uses the default stacked pipeline when no explicit pipeline is provided", () => {
    const body = {
      messages: [{ role: "tool", content: Array.from({ length: 8 }, () => "same").join("\n") }],
    };

    const result = applyCompression(body, "stacked", {
      config: {
        enabled: true,
        defaultMode: "stacked",
        autoTriggerTokens: 0,
        cacheMinutes: 5,
        preserveSystemPrompt: true,
        comboOverrides: {},
        rtkConfig: {
          enabled: true,
          intensity: "standard",
          applyToToolResults: true,
          applyToCodeBlocks: false,
          applyToAssistantMessages: false,
          enabledFilters: [],
          disabledFilters: [],
          maxLinesPerResult: 120,
          maxCharsPerResult: 12000,
          deduplicateThreshold: 3,
        },
      },
    });

    assert.equal(result.stats?.engine, "stacked");
    assert.deepEqual(
      result.stats?.engineBreakdown?.map((entry) => entry.engine),
      ["rtk", "caveman"]
    );
  });
});
