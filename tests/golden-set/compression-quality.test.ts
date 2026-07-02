import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cavemanCompress } from "../../open-sse/services/compression/caveman.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface GoldenPrompt {
  prompt: string;
  keyPhrases: string[];
}

function loadGoldenSet(): GoldenPrompt[] {
  const dataPath = path.join(__dirname, "data", "prompts.jsonl");
  const lines = fs.readFileSync(dataPath, "utf8").trim().split("\n");
  return lines.map((line) => JSON.parse(line));
}

function extractCodeBlocks(text: string): string[] {
  const blocks: string[] = [];
  const regex = /```[\w]*\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    blocks.push(match[1].trim());
  }
  return blocks;
}

function compressText(text: string): string {
  const result = cavemanCompress(
    { messages: [{ role: "user", content: text }] },
    { enabled: true, compressRoles: ["user"] }
  );
  if (!result.compressed) return text;
  const messages = (result.body as { messages?: { content?: string }[] }).messages;
  return messages?.[0]?.content ?? text;
}

describe("golden set — compression quality (meaning preservation)", () => {
  it("should preserve all key phrases after compression", () => {
    const prompts = loadGoldenSet();
    let totalPhrases = 0;
    let preservedPhrases = 0;
    const failures: { prompt: string; missingPhrases: string[] }[] = [];

    for (const entry of prompts) {
      const compressed = compressText(entry.prompt);
      const compressedLower = compressed.toLowerCase();
      const missing: string[] = [];

      for (const phrase of entry.keyPhrases) {
        totalPhrases++;
        if (compressedLower.includes(phrase.toLowerCase())) {
          preservedPhrases++;
        } else {
          missing.push(phrase);
        }
      }

      if (missing.length > 0) {
        failures.push({
          prompt: entry.prompt.substring(0, 80) + "...",
          missingPhrases: missing,
        });
      }
    }

    const preservationRate = preservedPhrases / totalPhrases;
    console.log(
      `Key phrase preservation rate: ${(preservationRate * 100).toFixed(1)}% (${preservedPhrases}/${totalPhrases})`
    );

    if (failures.length > 0) {
      console.log("\nPrompts with missing key phrases:");
      for (const f of failures) {
        console.log(`  - "${f.prompt}"`);
        console.log(`    Missing: ${f.missingPhrases.join(", ")}`);
      }
    }

    assert.ok(
      preservationRate >= 0.95,
      `Key phrase preservation rate ${(preservationRate * 100).toFixed(1)}% is below 95% threshold`
    );
  });

  it("should preserve code blocks as fenced blocks after compression", () => {
    const prompts = loadGoldenSet();
    let totalOriginalBlocks = 0;
    let totalCompressedBlocks = 0;
    let allPromptsPreservedCode = true;

    for (const entry of prompts) {
      const originalBlocks = extractCodeBlocks(entry.prompt);
      if (originalBlocks.length === 0) continue;

      const compressed = compressText(entry.prompt);
      const compressedBlocks = extractCodeBlocks(compressed);

      totalOriginalBlocks += originalBlocks.length;
      totalCompressedBlocks += compressedBlocks.length;

      if (compressedBlocks.length < originalBlocks.length) {
        console.log(
          `Lost code blocks: ${originalBlocks.length} → ${compressedBlocks.length} in: "${entry.prompt.substring(0, 60)}..."`
        );
        allPromptsPreservedCode = false;
      }
    }

    console.log(
      `Code blocks: ${totalOriginalBlocks} original → ${totalCompressedBlocks} compressed`
    );

    assert.ok(
      totalCompressedBlocks >= totalOriginalBlocks * 0.95,
      `Code block count dropped from ${totalOriginalBlocks} to ${totalCompressedBlocks} (below 95%)`
    );
  });

  it("should not introduce grammatical errors outside code blocks", () => {
    const prompts = loadGoldenSet();
    const brokenPatterns = [/[.]{4,}/, /[?]{3,}/, /[!]{3,}/];

    for (const entry of prompts) {
      const compressed = compressText(entry.prompt);
      const withoutCodeBlocks = compressed.replace(/```[\s\S]*?```/g, "");
      for (const pattern of brokenPatterns) {
        assert.ok(
          !pattern.test(withoutCodeBlocks),
          `Compressed text contains broken pattern ${pattern} in: ${compressed.substring(0, 100)}`
        );
      }
    }
  });

  it("should produce non-empty output for all prompts", () => {
    const prompts = loadGoldenSet();
    for (const entry of prompts) {
      const compressed = compressText(entry.prompt);
      assert.ok(compressed.trim().length > 0, "Compressed output is empty");
    }
  });
});
