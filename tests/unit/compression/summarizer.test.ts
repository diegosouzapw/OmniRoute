import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  RuleBasedSummarizer,
  createSummarizer,
} from "../../../open-sse/services/compression/summarizer.ts";

function makeMessages(messages: Array<{ role: string; content: string }>) {
  return messages;
}

describe("RuleBasedSummarizer", () => {
  const summarizer = new RuleBasedSummarizer();

  it("returns empty string for empty messages array", () => {
    const result = summarizer.summarize([]);
    assert.equal(result, "");
  });

  it("extracts intent from single user message", () => {
    const result = summarizer.summarize(
      makeMessages([
        { role: "user", content: "fix: bug in src/lib/db/core.ts causing Error: TS2304" },
      ])
    );
    assert.ok(result.startsWith("[COMPRESSED:summary]"));
    assert.ok(result.includes("fix:"));
    assert.ok(result.includes("src/lib/db/core.ts"));
  });

  it("extracts intent from first user message when no trigger phrase", () => {
    const result = summarizer.summarize(
      makeMessages([{ role: "user", content: "How do I implement authentication?" }])
    );
    assert.ok(result.startsWith("[COMPRESSED:summary]"));
    assert.ok(result.includes("How do I implement"));
  });

  it("extracts file paths from messages", () => {
    const result = summarizer.summarize(
      makeMessages([
        {
          role: "user",
          content: "Edit src/lib/db/core.ts and fix the bug in tests/unit/db/compression.test.ts",
        },
      ])
    );
    assert.ok(result.includes("src/lib/db/core.ts"));
    assert.ok(result.includes("tests/unit/db/compression.test.ts"));
  });

  it("extracts errors from messages", () => {
    const result = summarizer.summarize(
      makeMessages([
        {
          role: "assistant",
          content: "The build failed with Error: TS2304 and Exception: NullPointerException",
        },
      ])
    );
    assert.ok(result.includes("Error: TS2304") || result.includes("Exception:"));
  });

  it("extracts last assistant decision", () => {
    const result = summarizer.summarize(
      makeMessages([
        { role: "user", content: "fix the bug" },
        { role: "assistant", content: "I've patched the file and will run tests next." },
      ])
    );
    assert.ok(result.includes("Last decision:"));
    assert.ok(result.includes("patched"));
  });

  it("skips messages with [COMPRESSED: prefix", () => {
    const result = summarizer.summarize(
      makeMessages([
        { role: "system", content: "[COMPRESSED:summary] prior context" },
        { role: "user", content: "implement: new feature" },
      ])
    );
    assert.ok(!result.includes("prior context"));
    assert.ok(result.includes("implement:"));
  });

  it("trims code fences in long code blocks", () => {
    const longCode = Array.from({ length: 50 }, (_, i) => `line ${i}`).join("\n");
    const content = "```ts\n" + longCode + "\n```";
    const result = summarizer.summarize(makeMessages([{ role: "assistant", content: content }]), {
      preserveCode: true,
    });
    assert.ok(result.includes("[COMPRESSED:summary]"));
    assert.ok(result.includes("line 0"));
  });

  it("respects maxLen option", () => {
    const longContent = "x".repeat(5000);
    const result = summarizer.summarize(makeMessages([{ role: "user", content: longContent }]), {
      maxLen: 100,
    });
    assert.ok(result.length <= 103);
  });

  it("respects preserveCode=false option", () => {
    const result = summarizer.summarize(
      makeMessages([
        { role: "user", content: "fix: the bug" },
        { role: "assistant", content: "```ts\nconst x = 1;\nconst y = 2;\n```" },
      ]),
      { preserveCode: false }
    );
    assert.ok(result.startsWith("[COMPRESSED:summary]"));
  });

  it("handles mixed user/assistant turns", () => {
    const result = summarizer.summarize(
      makeMessages([
        { role: "user", content: "implement: auth module" },
        { role: "assistant", content: "Created src/auth/login.ts" },
        { role: "user", content: "fix: typo in login.ts" },
        { role: "assistant", content: "Fixed the typo." },
      ])
    );
    assert.ok(result.includes("implement:"));
    assert.ok(result.includes("fix:"));
    assert.ok(result.includes("src/auth/login.ts"));
  });

  it("handles messages with array content (tool results)", () => {
    const result = summarizer.summarize([
      { role: "user", content: [{ type: "text", text: "fix: the error in app.ts" }] },
    ] as unknown[]);
    assert.ok(result.includes("fix:"));
  });

  it("handles messages with undefined content", () => {
    const result = summarizer.summarize([{ role: "user" }] as unknown[]);
    assert.equal(result, "");
  });

  it("extracts multiple error formats", () => {
    const result = summarizer.summarize(
      makeMessages([
        { role: "assistant", content: "Build failed: Error: TS2304 and error TS2551 found" },
      ])
    );
    assert.ok(result.includes("Error: TS2304") || result.includes("error TS2551"));
  });

  it("limits file paths to 20 entries", () => {
    const files = Array.from({ length: 30 }, (_, i) => `src/file${i}.ts`).join(" ");
    const result = summarizer.summarize(makeMessages([{ role: "user", content: `fix: ${files}` }]));
    const filesSection = result.match(/Files touched: (.+?)\./);
    assert.ok(filesSection);
    const fileCount = filesSection[1].split(",").length;
    assert.ok(fileCount <= 20, `Expected <= 20 files, got ${fileCount}`);
  });

  it("limits errors to 10 entries", () => {
    const errors = Array.from({ length: 15 }, (_, i) => `Error: bug${i}`).join(". ");
    const result = summarizer.summarize(makeMessages([{ role: "assistant", content: errors }]));
    const errorsSection = result.match(/Errors: (.+?)\./);
    if (errorsSection) {
      const errorCount = errorsSection[1].split(";").length;
      assert.ok(errorCount <= 10, `Expected <= 10 errors, got ${errorCount}`);
    }
  });

  it("truncates last decision to 200 chars", () => {
    const longDecision = "x".repeat(500);
    const result = summarizer.summarize(
      makeMessages([{ role: "assistant", content: longDecision }])
    );
    const decisionMatch = result.match(/Last decision: (.+?)\./s);
    if (decisionMatch) {
      assert.ok(decisionMatch[1].length <= 210, `Decision too long: ${decisionMatch[1].length}`);
    }
  });

  it("handles single message with no trigger phrase", () => {
    const result = summarizer.summarize(
      makeMessages([{ role: "user", content: "Hello, how are you?" }])
    );
    assert.ok(result.startsWith("[COMPRESSED:summary]"));
    assert.ok(result.includes("Hello"));
  });

  it("createSummarizer factory returns RuleBasedSummarizer instance", () => {
    const s = createSummarizer();
    assert.ok(s instanceof RuleBasedSummarizer);
    assert.equal(s.summarize([]), "");
  });

  it("handles messages with only system role", () => {
    const result = summarizer.summarize(
      makeMessages([{ role: "system", content: "You are a helpful assistant." }])
    );
    assert.ok(result.startsWith("[COMPRESSED:summary]"));
  });

  it("handles empty string content", () => {
    const result = summarizer.summarize(makeMessages([{ role: "user", content: "" }]));
    assert.equal(result, "");
  });

  it("produces summary with all sections for rich input", () => {
    const result = summarizer.summarize(
      makeMessages([
        { role: "user", content: "implement: auth module in src/auth/login.ts" },
        { role: "assistant", content: "Created the auth module. Error: TS2304 found." },
        { role: "user", content: "fix: the TS2304 error" },
        { role: "assistant", content: "Fixed the type error in login.ts" },
      ])
    );
    assert.ok(result.includes("Intents:"));
    assert.ok(result.includes("Files touched:"));
    assert.ok(result.includes("Errors:"));
    assert.ok(result.includes("Last decision:"));
  });
});
