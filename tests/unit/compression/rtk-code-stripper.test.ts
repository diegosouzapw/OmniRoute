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

  it("preserves comments and string literals safely", () => {
    const js = stripCode(
      "// comment\nconst url = 'https://example.com/a//b';\n/* block */\nconsole.log(url);",
      "javascript"
    );

    assert.ok(js.text.includes("// comment"));
    assert.match(js.text, /https:\/\/example\.com\/a\/\/b/);
    assert.ok(js.text.includes("/* block */"));
  });

  it("preserves Python docstrings and comments", () => {
    const result = stripCode('"""doc"""\n# comment\nprint("ok")', "python", {
      preserveDocstrings: true,
    });

    assert.ok(result.text.includes("doc"));
    assert.ok(result.text.includes("# comment"));
  });

  it("applies to fenced code blocks through RTK runtime", () => {
    const body = {
      messages: [
        {
          role: "assistant",
          content: `Before.

\`\`\`txt
${Array.from({ length: 20 }, () => "same code line").join("\n")}
\`\`\`

After.`,
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
    assert.match(serialized, /Before/);
    assert.match(serialized, /After/);
    assert.match(serialized, /same code line/);
    assert.match(serialized, /\[rtk:dropped/);
    assert.ok(result.stats?.techniquesUsed.includes("rtk-code-strip"));
  });

  it("does not compress non-code text when only code block compression is enabled", () => {
    const content = Array.from({ length: 20 }, () => "same prose line").join("\n");
    const body = {
      messages: [{ role: "assistant", content }],
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

    assert.equal(result.compressed, false);
    assert.deepEqual(result.body, body);
  });

  it("does not compress fenced code when code block compression is disabled", () => {
    const body = {
      messages: [
        {
          role: "assistant",
          content: `Before.

\`\`\`txt
${Array.from({ length: 20 }, () => "same code line").join("\n")}
\`\`\`

After.`,
        },
      ],
    };
    const result = applyRtkCompression(body, {
      config: {
        enabled: true,
        intensity: "standard",
        applyToToolResults: false,
        applyToAssistantMessages: false,
        applyToCodeBlocks: false,
        enabledFilters: [],
        disabledFilters: [],
        maxLinesPerResult: 100,
        maxCharsPerResult: 12000,
        deduplicateThreshold: 3,
      },
    });

    assert.equal(result.compressed, false);
    assert.deepEqual(result.body, body);
  });
});
