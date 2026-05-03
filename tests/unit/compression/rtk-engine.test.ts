import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  detectCommandType,
  loadRtkFilters,
  matchRtkFilter,
  processRtkText,
  applyRtkCompression,
  rtkEngine,
} from "../../../open-sse/services/compression/index.ts";

describe("RTK compression engine", () => {
  it("detects TypeScript build output", () => {
    const output = "src/a.ts:1:1 - error TS2322: Type 'string' is not assignable";
    const detection = detectCommandType(output, "tsc --noEmit");
    assert.equal(detection.type, "build-typescript");
    assert.equal(detection.category, "build");
  });

  it("loads builtin declarative filters", () => {
    const filters = loadRtkFilters({ refresh: true });
    assert.ok(filters.length >= 10);
    assert.ok(filters.some((filter) => filter.id === "git-diff"));
  });

  it("matches filters by detected output type", () => {
    const filter = matchRtkFilter("diff --git a/a.ts b/a.ts\n@@ -1,1 +1,1 @@", "git diff");
    assert.equal(filter?.id, "git-diff");
  });

  it("compresses repeated tool output", () => {
    const output = Array.from({ length: 20 }, () => "same noisy line").join("\n");
    const result = processRtkText(output);
    assert.equal(result.compressed, true);
    assert.ok(result.text.includes("[rtk:dropped"));
  });

  it("honors disabled and empty-message runtime branches", () => {
    const disabled = applyRtkCompression(
      { messages: [{ role: "tool", content: "same\nsame\nsame" }] },
      { config: { enabled: false } }
    );
    assert.equal(disabled.compressed, false);
    assert.equal(disabled.stats, null);

    const empty = applyRtkCompression({ messages: [] });
    assert.equal(empty.compressed, false);
    assert.equal(empty.stats, null);
  });

  it("respects enabled and disabled filter lists", () => {
    const output = "diff --git a/a.ts b/a.ts\n@@ -1,1 +1,1 @@\n-error\n+ok";

    const disabled = processRtkText(output, {
      command: "git diff",
      config: { disabledFilters: ["git-diff"] },
    });
    assert.ok(!disabled.rulesApplied.includes("git-diff:keep"));

    const enabledMismatch = processRtkText(output, {
      command: "git diff",
      config: { enabledFilters: ["git-status"] },
    });
    assert.ok(!enabledMismatch.rulesApplied.includes("git-diff:keep"));
  });

  it("exposes RTK engine schema, validation, apply and compress contracts", () => {
    assert.ok(rtkEngine.getConfigSchema().some((field) => field.key === "rawOutputRetention"));
    assert.equal(rtkEngine.validateConfig({ intensity: "invalid" }).valid, false);
    assert.equal(rtkEngine.validateConfig({ rawOutputRetention: "always" }).valid, true);

    const body = { messages: [{ role: "tool", content: "same\nsame\nsame\nsame" }] };
    assert.equal(
      rtkEngine.apply(body, { config: { rtkConfig: { enabled: true } } }).stats?.engine,
      "rtk"
    );
    assert.equal(rtkEngine.compress(body, { enabled: true }).stats?.engine, "rtk");
  });

  it("applies to chat tool messages", () => {
    const body = {
      messages: [{ role: "tool", content: Array.from({ length: 20 }, () => "same").join("\n") }],
    };
    const result = applyRtkCompression(body);
    assert.equal(result.compressed, true);
    assert.equal(result.stats?.mode, "rtk");
  });

  it("compresses multipart text parts independently without duplicating output", () => {
    const imagePart = { type: "image_url", image_url: { url: "data:image/png;base64,abc" } };
    const body = {
      messages: [
        {
          role: "tool",
          content: [
            { type: "text", text: Array.from({ length: 12 }, () => "alpha noisy line").join("\n") },
            imagePart,
            { type: "text", text: Array.from({ length: 12 }, () => "beta noisy line").join("\n") },
          ],
        },
      ],
    };

    const result = applyRtkCompression(body);
    const content = (result.body.messages as typeof body.messages)[0].content;

    assert.equal(result.compressed, true);
    assert.ok(Array.isArray(content));
    assert.match(content[0].text ?? "", /alpha noisy line/);
    assert.match(content[2].text ?? "", /beta noisy line/);
    assert.notEqual(content[0].text, content[2].text);
    assert.deepEqual(content[1], imagePart);
  });
});
