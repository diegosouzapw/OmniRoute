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

  it("keeps multipart tool output safe through stacked RTK then Caveman", () => {
    const imagePart = { type: "image_url", image_url: { url: "data:image/png;base64,abc" } };
    const body = {
      messages: [
        {
          role: "tool",
          content: [
            {
              type: "text",
              text: Array.from({ length: 12 }, () => "first repeated tool line").join("\n"),
            },
            imagePart,
            {
              type: "text",
              text: Array.from({ length: 12 }, () => "second repeated tool line").join("\n"),
            },
          ],
        },
      ],
    };

    const result = applyStackedCompression(body, [
      { engine: "rtk", intensity: "standard" },
      { engine: "caveman", intensity: "full" },
    ]);
    const content = (result.body.messages as typeof body.messages)[0].content;

    assert.equal(result.stats?.engine, "stacked");
    assert.ok(Array.isArray(content));
    assert.match(content[0].text ?? "", /first repeated tool line/);
    assert.match(content[2].text ?? "", /second repeated tool line/);
    assert.notEqual(content[0].text, content[2].text);
    assert.deepEqual(content[1], imagePart);
  });
});
