import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  applyRtkCompression,
  detectCodeLanguage,
  stripCode,
} from "../../../open-sse/services/compression/index.ts";

describe("RTK code stripper", () => {
  it("detects common code languages", () => {
    assert.equal(detectCodeLanguage("interface User { id: string }"), "typescript");
    assert.equal(detectCodeLanguage("def run():\n    print('x')"), "python");
    assert.equal(detectCodeLanguage('fn main() { println!("x"); }'), "rust");
    assert.equal(detectCodeLanguage("package main\nfunc main() {}"), "go");
    assert.equal(detectCodeLanguage("class Main { }"), "java");
  });

  it("removes single-line and multi-line comments", () => {
    const js = stripCode(
      "// comment\nconst value = 1;\n/* block */\nconsole.log(value);",
      "javascript"
    );
    const py = stripCode('"""doc"""\n# comment\nprint("ok")', "python");
    const rb = stripCode("=begin\ncomment\n=end\n# comment\nputs 'ok'", "ruby");

    assert.ok(!js.text.includes("comment"));
    assert.ok(!js.text.includes("block"));
    assert.ok(!py.text.includes("doc"));
    assert.ok(!rb.text.includes("comment"));
  });

  it("preserves docstrings when configured", () => {
    const result = stripCode('"""doc"""\n# comment\nprint("ok")', "python", {
      preserveDocstrings: true,
    });

    assert.ok(result.text.includes("doc"));
    assert.ok(!result.text.includes("# comment"));
  });

  it("applies to fenced code blocks through RTK runtime", () => {
    const body = {
      messages: [
        {
          role: "assistant",
          content: "```ts\n// remove\nconst value: number = 1;\n```\nDone.",
        },
      ],
    };
    const result = applyRtkCompression(body, {
      config: {
        enabled: true,
        intensity: "standard",
        applyToToolResults: false,
        applyToAssistantMessages: false,
        applyToCodeBlocks: true,
        enabledFilters: [],
        disabledFilters: [],
        maxLinesPerResult: 100,
        maxCharsPerResult: 12000,
        deduplicateThreshold: 3,
      },
    });

    assert.equal(result.compressed, true);
    const serialized = JSON.stringify(result.body.messages);
    assert.match(serialized, /const value/);
    assert.doesNotMatch(serialized, /remove/);
    assert.ok(result.stats?.techniquesUsed.includes("rtk-code-strip"));
  });
});
