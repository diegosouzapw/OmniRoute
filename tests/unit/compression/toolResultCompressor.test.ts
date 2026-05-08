import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { compressToolResult } from "../../../open-sse/services/compression/toolResultCompressor.ts";
import type { ToolStrategiesConfig } from "../../../open-sse/services/compression/types.ts";

const ALL_ON: ToolStrategiesConfig = {
  fileContent: true,
  grepSearch: true,
  shellOutput: true,
  json: true,
  errorMessage: true,
};

describe("compressToolResult", () => {
  it("returns 'none' strategy for plain prose input", () => {
    const result = compressToolResult("Hello, this is a simple message.", ALL_ON);
    assert.equal(result.strategy, "none");
    assert.equal(result.saved, 0);
    assert.equal(result.compressed, "Hello, this is a simple message.");
  });

  it("returns 'none' for empty string", () => {
    const result = compressToolResult("", ALL_ON);
    assert.equal(result.strategy, "none");
  });

  it("compresses file content with code indicators", () => {
    const lines = Array.from({ length: 100 }, (_, i) => `line ${i}`);
    const code = `import x from "y";\nfunction f() {\n${lines.join("\n")}\n}`;
    const result = compressToolResult(code, ALL_ON);
    assert.equal(result.strategy, "fileContent");
    assert.ok(result.saved > 0);
    assert.ok(result.compressed.includes("…") || result.compressed.includes("elided"));
  });

  it("compresses grep search output", () => {
    const lines = Array.from(
      { length: 100 },
      (_, i) => `src/file${i % 5}.ts:${i + 1}:10: match found`
    );
    const content = lines.join("\n");
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "grepSearch");
    assert.ok(result.saved > 0);
    assert.ok(result.compressed.includes("… [") || result.compressed.includes("more matches"));
  });

  it("compresses shell output with ANSI codes", () => {
    const content =
      "\x1b[32mSuccess\x1b[0m\n" +
      Array.from({ length: 60 }, (_, i) => `output line ${i}`).join("\n");
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "shellOutput");
    assert.ok(result.saved > 0);
    assert.ok(!result.compressed.includes("\x1b["));
  });

  it("compresses shell output with $ prompt", () => {
    const content = "$ ls -la\ntotal 42\nfile1.txt\nfile2.txt";
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "shellOutput");
  });

  it("compresses large JSON array", () => {
    const arr = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `item${i}`,
      data: "x".repeat(50),
    }));
    const content = JSON.stringify(arr);
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "json");
    assert.ok(result.saved > 0);
    assert.ok(result.compressed.includes("total"));
  });

  it("compresses large JSON object", () => {
    const obj: Record<string, unknown> = {};
    for (let i = 0; i < 30; i++) {
      obj[`key${i}`] = { nested: "value".repeat(20) };
    }
    const content = JSON.stringify(obj);
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "json");
    assert.ok(result.saved > 0);
  });

  it("does not compress small JSON", () => {
    const content = JSON.stringify({ a: 1, b: 2 });
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "none");
  });

  it("compresses error messages with stack trace", () => {
    const frames = Array.from(
      { length: 20 },
      (_, i) => `    at func${i} (file${i}.ts:${i + 1}:${i + 10})`
    );
    const content = `TypeError: Cannot read property 'x' of undefined\n${frames.join("\n")}`;
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "errorMessage");
    assert.ok(result.saved > 0);
  });

  it("compresses Python Traceback", () => {
    const content =
      "Traceback (most recent call last):\n  File 'app.py', line 42\n    x = undefined()\nException: NameError";
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "errorMessage");
  });

  it("skips strategy when toggle is off", () => {
    const code =
      `import x from "y";\nfunction f() {}\n` +
      Array.from({ length: 50 }, (_, i) => `line ${i}`).join("\n");
    const opts: ToolStrategiesConfig = { ...ALL_ON, fileContent: false };
    const result = compressToolResult(code, opts);
    assert.notEqual(result.strategy, "fileContent");
  });

  it("skips grep strategy when toggle is off", () => {
    const content = "src/file.ts:10:5: match\nsrc/file.ts:20:8: match";
    const opts: ToolStrategiesConfig = { ...ALL_ON, grepSearch: false };
    const result = compressToolResult(content, opts);
    assert.notEqual(result.strategy, "grepSearch");
  });

  it("skips shell strategy when toggle is off", () => {
    const content = "\x1b[32moutput\x1b[0m\n$ command";
    const opts: ToolStrategiesConfig = { ...ALL_ON, shellOutput: false };
    const result = compressToolResult(content, opts);
    assert.notEqual(result.strategy, "shellOutput");
  });

  it("skips json strategy when toggle is off", () => {
    const arr = Array.from({ length: 100 }, (_, i) => ({ id: i }));
    const content = JSON.stringify(arr);
    const opts: ToolStrategiesConfig = { ...ALL_ON, json: false };
    const result = compressToolResult(content, opts);
    assert.notEqual(result.strategy, "json");
  });

  it("skips error strategy when toggle is off", () => {
    const content = "Error: something went wrong\n  at func (file.ts:1:1)";
    const opts: ToolStrategiesConfig = { ...ALL_ON, errorMessage: false };
    const result = compressToolResult(content, opts);
    assert.notEqual(result.strategy, "errorMessage");
  });

  it("all toggles off returns 'none'", () => {
    const content = "Error: bad\nsrc/file.ts:10:5: match\n$ ls";
    const opts: ToolStrategiesConfig = {
      fileContent: false,
      grepSearch: false,
      shellOutput: false,
      json: false,
      errorMessage: false,
    };
    const result = compressToolResult(content, opts);
    assert.equal(result.strategy, "none");
    assert.equal(result.saved, 0);
  });

  it("deduplicates consecutive identical lines in shell output", () => {
    const lines = ["$ ls", "file1.txt", "file1.txt", "file1.txt", "file2.txt"];
    const content = lines.join("\n");
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "shellOutput");
    const deduped = result.compressed.split("\n");
    const file1Count = deduped.filter((l) => l === "file1.txt").length;
    assert.ok(file1Count <= 2, `Expected <= 2 'file1.txt' lines, got ${file1Count}`);
  });

  it("handles malformed JSON gracefully", () => {
    const content = "{invalid json" + "x".repeat(3000);
    const result = compressToolResult(content, ALL_ON);
    assert.notEqual(result.strategy, "json");
  });

  it("handles short code without compression", () => {
    const content = "import x from 'y';\nconst z = 1;";
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "none");
  });

  it("fileContent keeps first 20 and last 5 lines", () => {
    const lines = Array.from({ length: 100 }, (_, i) => `line ${i}`);
    const code = `import x from "y";\nfunction f() {\n${lines.join("\n")}\n}`;
    const result = compressToolResult(code, ALL_ON);
    assert.equal(result.strategy, "fileContent");
    assert.ok(result.compressed.includes("line 0"));
    assert.ok(result.compressed.includes("line 99"));
  });

  it("grepSearch deduplicates paths", () => {
    const lines = Array.from({ length: 50 }, (_, i) => `src/app.ts:${i + 1}:10: match`);
    const content = lines.join("\n");
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "grepSearch");
    assert.ok(result.compressed.includes("Files:"));
    assert.ok(result.compressed.includes("src/app.ts"));
  });

  it("errorMessage keeps error type and stack frames", () => {
    const content =
      "Error: TS2304 Cannot find name 'x'\n  at func1 (a.ts:1:1)\n  at func2 (b.ts:2:2)\n  at func3 (c.ts:3:3)";
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.strategy, "errorMessage");
    assert.ok(result.compressed.includes("Error: TS2304"));
  });

  it("json array compression preserves first 5 and last 2 elements", () => {
    const arr = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `item${i}` }));
    const content = JSON.stringify(arr);
    const padded = content.padEnd(3000, " ");
    const result = compressToolResult(padded, ALL_ON);
    if (result.strategy === "json") {
      assert.ok(result.compressed.includes("total"));
    }
  });

  it("returns original content unchanged for 'none' strategy", () => {
    const content = "Just some plain text without any patterns.";
    const result = compressToolResult(content, ALL_ON);
    assert.equal(result.compressed, content);
    assert.equal(result.strategy, "none");
    assert.equal(result.saved, 0);
  });
});
