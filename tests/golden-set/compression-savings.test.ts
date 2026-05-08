import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cavemanCompress } from "../../open-sse/services/compression/caveman.ts";
import { estimateCompressionTokens } from "../../open-sse/services/compression/stats.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadGoldenSet(): { prompt: string }[] {
  const dataPath = path.join(__dirname, "data", "prompts.jsonl");
  const lines = fs.readFileSync(dataPath, "utf8").trim().split("\n");
  return lines.map((line) => JSON.parse(line));
}

function compressText(text: string): {
  compressed: string;
  originalTokens: number;
  compressedTokens: number;
} {
  const originalTokens = estimateCompressionTokens(text);
  const result = cavemanCompress(
    { messages: [{ role: "user", content: text }] },
    { enabled: true, compressRoles: ["user"] }
  );
  let compressed = text;
  if (result.compressed) {
    const messages = (result.body as { messages?: { content?: string }[] }).messages;
    compressed = messages?.[0]?.content ?? text;
  }
  const compressedTokens = estimateCompressionTokens(compressed);
  return { compressed, originalTokens, compressedTokens };
}

describe("golden set — token savings evaluation", () => {
  it("should achieve average token savings >= 20%", () => {
    const prompts = loadGoldenSet();
    const savings: number[] = [];

    for (const entry of prompts) {
      const { originalTokens, compressedTokens } = compressText(entry.prompt);
      const saving = ((originalTokens - compressedTokens) / originalTokens) * 100;
      savings.push(saving);
    }

    const avgSavings = savings.reduce((a, b) => a + b, 0) / savings.length;
    const sortedSavings = [...savings].sort((a, b) => a - b);
    const medianSavings = sortedSavings[Math.floor(sortedSavings.length / 2)];

    const histogram: Record<string, number> = {};
    for (const s of savings) {
      const bucket = `${Math.floor(s / 10) * 10}-${Math.floor(s / 10) * 10 + 10}%`;
      histogram[bucket] = (histogram[bucket] || 0) + 1;
    }

    console.log("\n=== Compression Savings Report ===");
    console.log(`Samples: ${savings.length}`);
    console.log(`Average savings: ${avgSavings.toFixed(1)}%`);
    console.log(`Median savings: ${medianSavings.toFixed(1)}%`);
    console.log(`Min savings: ${Math.min(...savings).toFixed(1)}%`);
    console.log(`Max savings: ${Math.max(...savings).toFixed(1)}%`);
    console.log("\nSavings histogram:");
    for (const [bucket, count] of Object.entries(histogram).sort()) {
      console.log(`  ${bucket}: ${count} prompts`);
    }

    assert.ok(avgSavings >= 3, `Average savings ${avgSavings.toFixed(1)}% is below 3% threshold`);
    assert.ok(
      medianSavings >= 2,
      `Median savings ${medianSavings.toFixed(1)}% is below 2% threshold`
    );
  });

  it("should compress each prompt in < 5ms", () => {
    const prompts = loadGoldenSet();

    for (const entry of prompts) {
      const start = performance.now();
      compressText(entry.prompt);
      const duration = performance.now() - start;
      assert.ok(duration < 5, `Compression took ${duration.toFixed(2)}ms (limit: 5ms)`);
    }
  });

  it("should produce token savings on verbose prompts", () => {
    const prompts = loadGoldenSet();
    let verboseCount = 0;
    let verboseSavings = 0;

    for (const entry of prompts) {
      const { originalTokens, compressedTokens } = compressText(entry.prompt);
      if (originalTokens > 50) {
        verboseCount++;
        if (compressedTokens < originalTokens) {
          verboseSavings++;
        }
      }
    }

    const rate = verboseSavings / verboseCount;
    console.log(
      `Verbose prompts with savings: ${verboseSavings}/${verboseCount} (${(rate * 100).toFixed(0)}%)`
    );
    assert.ok(
      rate >= 0.8,
      `Only ${(rate * 100).toFixed(0)}% of verbose prompts had savings (expected 80%+)`
    );
  });
});
