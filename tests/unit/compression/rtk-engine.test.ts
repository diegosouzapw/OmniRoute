import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  detectCommandType,
  loadRtkFilters,
  matchRtkFilter,
  processRtkText,
  applyRtkCompression,
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

  it("applies to chat tool messages", () => {
    const body = {
      messages: [{ role: "tool", content: Array.from({ length: 20 }, () => "same").join("\n") }],
    };
    const result = applyRtkCompression(body);
    assert.equal(result.compressed, true);
    assert.equal(result.stats?.mode, "rtk");
  });
});
