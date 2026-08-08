import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  estimateTokens,
  estimateMessageTokens,
  detectCodeComplexity,
  detectMathComplexity,
  detectReasoningDepth,
  detectContextSize,
  detectToolCalling,
  detectDomainSpecificity,
  getSpecificityBreakdown,
  detectConversationDepth,
  detectFileReferences,
  detectErrorContext,
  detectEnhancedContextSize,
  getEnhancedSpecificityBreakdown,
} from "../../open-sse/services/specificityRules.ts";
import type { RuleInput } from "../../open-sse/services/specificityTypes.ts";

// Helpers. Every expected value below is derived by hand from the source logic in
// open-sse/services/specificityRules.ts, not recorded from a live run.
const repeat = (n: number): string => "a".repeat(n);
const stringMessages = (content: string): RuleInput => ({ messages: [{ content }] });

describe("estimateTokens", () => {
  test("empty string is 0 tokens", () => {
    assert.equal(estimateTokens(""), 0);
  });

  test("exactly 4 chars is 1 token (4/4)", () => {
    assert.equal(estimateTokens("abcd"), 1);
  });

  test("rounds up: 5 chars -> ceil(1.25) -> 2 tokens", () => {
    assert.equal(estimateTokens("abcde"), 2);
  });

  test("rounds up: 1 char -> ceil(0.25) -> 1 token", () => {
    assert.equal(estimateTokens("a"), 1);
  });
});

describe("estimateMessageTokens", () => {
  test("string content is summed via estimateTokens", () => {
    // "abcd" -> 1, "abcdefgh" (8) -> 2 => 3
    assert.equal(estimateMessageTokens([{ content: "abcd" }, { content: "abcdefgh" }]), 3);
  });

  test("array content sums estimateTokens of each string .text part", () => {
    // [{text:"abcd"}] -> 1, [{text:"abcdefgh"}] -> 2 => 3
    assert.equal(
      estimateMessageTokens([{ content: [{ text: "abcd" }, { text: "abcdefgh" }] }]),
      3
    );
  });

  test("array parts whose .text is not a string contribute 0", () => {
    assert.equal(
      estimateMessageTokens([{ content: [{ text: 123 }, { notText: "abcd" }] }]),
      0
    );
  });

  test("non-string, non-array content hits the untouched-sum branch (0)", () => {
    assert.equal(estimateMessageTokens([{ content: { foo: 1 } }]), 0);
  });

  test("mixed string + object content only counts the string", () => {
    assert.equal(estimateMessageTokens([{ content: "abcd" }, { content: { x: 1 } }]), 1);
  });
});

describe("detectCodeComplexity", () => {
  test("no code -> 0", () => {
    assert.equal(detectCodeComplexity(stringMessages("hello world")), 0);
  });

  test("one language indicator (const decl) -> raw 2", () => {
    // langMatches: /const\s+\w+\s*=/ matches once => 1*2 = 2
    assert.equal(detectCodeComplexity(stringMessages("const x = 5")), 2);
  });

  test("one inline code span -> raw 0.5 -> round -> 1", () => {
    // inlineCodeCount 1 => 0.5, Math.round(0.5) === 1
    assert.equal(detectCodeComplexity(stringMessages("use `foo` here")), 1);
  });

  test("clamps to a maximum of 25", () => {
    // 13 const decls => langMatches 13 => 13*2 = 26 => min(25, 26) = 25
    assert.equal(detectCodeComplexity(stringMessages("const a = ".repeat(13))), 25);
  });
});

describe("detectMathComplexity", () => {
  test("no math -> 0", () => {
    assert.equal(detectMathComplexity(stringMessages("hello world")), 0);
  });

  test("one inline latex span -> 1*4 = 4", () => {
    assert.equal(detectMathComplexity(stringMessages("$x$")), 4);
  });

  test("three math word indicators -> 3*1.5 = 4.5 -> round -> 5", () => {
    // /\b(sin|cos|tan|...)\b/ matches sin, cos, tan => 3 => 4.5 => Math.round -> 5
    assert.equal(detectMathComplexity(stringMessages("sin cos tan")), 5);
  });

  test("clamps to a maximum of 20", () => {
    // 6 block-latex spans => 6*4 = 24 => min(20, 24) = 20
    assert.equal(
      detectMathComplexity(stringMessages(Array(6).fill("$$a$$").join(" "))),
      20
    );
  });
});

describe("detectReasoningDepth", () => {
  test("no messages -> 0 (no depth bonus)", () => {
    assert.equal(detectReasoningDepth({ messages: [] }), 0);
  });

  test("FINDING: a message with no reasoning markers still scores > 0", () => {
    // reasonMatches 0, but messageDepthBonus = min(5, 1) = 1 => raw 1 => 1
    assert.equal(detectReasoningDepth(stringMessages("hello")), 1);
  });

  test("one reasoning marker + 1-message bonus -> 2 + 1 = 3", () => {
    assert.equal(detectReasoningDepth(stringMessages("therefore")), 3);
  });

  test("message-depth bonus clamps at 5", () => {
    // 6 marker-free messages => reasonMatches 0, bonus = min(5, 6) = 5 => 5
    const messages = Array.from({ length: 6 }, () => ({ content: "hello" }));
    assert.equal(detectReasoningDepth({ messages }), 5);
  });
});

describe("detectContextSize", () => {
  // estimateTokens = ceil(len/4); each string of length N yields ceil(N/4) tokens.
  test("empty -> 0", () => {
    assert.equal(detectContextSize(stringMessages("")), 0);
  });

  test("exactly 1000 tokens is NOT > 1000 -> 0", () => {
    assert.equal(detectContextSize(stringMessages(repeat(4000))), 0);
  });

  test("> 1000 tokens -> 2", () => {
    assert.equal(detectContextSize(stringMessages(repeat(4004))), 2);
  });

  test("> 4000 tokens -> 4", () => {
    assert.equal(detectContextSize(stringMessages(repeat(16004))), 4);
  });

  test("> 8000 tokens -> 6", () => {
    assert.equal(detectContextSize(stringMessages(repeat(32004))), 6);
  });

  test("> 16000 tokens -> 9", () => {
    assert.equal(detectContextSize(stringMessages(repeat(64004))), 9);
  });

  test("> 32000 tokens -> 12", () => {
    assert.equal(detectContextSize(stringMessages(repeat(128004))), 12);
  });

  test("> 64000 tokens -> 15", () => {
    assert.equal(detectContextSize(stringMessages(repeat(256004))), 15);
  });
});

describe("detectToolCalling", () => {
  const tools = (n: number) =>
    Array.from({ length: n }, (_, i) => ({ function: { name: `t${i}` } }));

  test("undefined tools -> 0", () => {
    assert.equal(detectToolCalling({ messages: [] }), 0);
  });

  test("0 tools -> 0", () => {
    assert.equal(detectToolCalling({ messages: [], tools: tools(0) }), 0);
  });

  test("1 tool (<=2) -> 2", () => {
    assert.equal(detectToolCalling({ messages: [], tools: tools(1) }), 2);
  });

  test("3 tools (>2) -> 4", () => {
    assert.equal(detectToolCalling({ messages: [], tools: tools(3) }), 4);
  });

  test("6 tools (>5) -> 6", () => {
    assert.equal(detectToolCalling({ messages: [], tools: tools(6) }), 6);
  });

  test("11 tools (>10) -> 8", () => {
    assert.equal(detectToolCalling({ messages: [], tools: tools(11) }), 8);
  });

  test("21 tools (>20) -> 10", () => {
    assert.equal(detectToolCalling({ messages: [], tools: tools(21) }), 10);
  });
});

describe("detectDomainSpecificity", () => {
  test("no domain terms -> 0", () => {
    assert.equal(detectDomainSpecificity(stringMessages("hello world")), 0);
  });

  test("all 5 medical terms -> 5*2 = 10 (and hits the clamp)", () => {
    assert.equal(
      detectDomainSpecificity(
        stringMessages("diagnosis symptoms treatment patient clinical")
      ),
      10
    );
  });

  test("two legal terms -> 4", () => {
    assert.equal(detectDomainSpecificity(stringMessages("pursuant statute")), 4);
  });

  test("scientific has only 4 terms -> max 8", () => {
    assert.equal(
      detectDomainSpecificity(
        stringMessages("hypothesis methodology empirical significant")
      ),
      8
    );
  });

  test("mixed domains return the MAX domain score, not the sum", () => {
    // 1 medical term (2) + 1 legal term (2). Sum would be 4; max is 2.
    assert.equal(detectDomainSpecificity(stringMessages("diagnosis pursuant")), 2);
  });
});

describe("getSpecificityBreakdown", () => {
  test("assembles the six detectors, using detectContextSize for contextSize", () => {
    // "const x = 5": code 2, math 0, reasoning 1 (depth bonus), context 0, tools 0, domain 0
    assert.deepEqual(getSpecificityBreakdown(stringMessages("const x = 5")), {
      codeComplexity: 2,
      mathComplexity: 0,
      reasoningDepth: 1,
      contextSize: 0,
      toolCalling: 0,
      domainSpecificity: 0,
    });
  });
});

describe("detectConversationDepth", () => {
  const turns = (n: number) => Array.from({ length: n }, () => ({ role: "user", content: "x" }));

  test("messages without a role are not counted -> 0", () => {
    assert.equal(detectConversationDepth(stringMessages("hello")), 0);
  });

  test("<=5 turns -> 0", () => {
    assert.equal(detectConversationDepth({ messages: turns(5) }), 0);
  });

  test("6 turns (>5) -> 2", () => {
    assert.equal(detectConversationDepth({ messages: turns(6) }), 2);
  });

  test("11 turns (>10) -> 4", () => {
    assert.equal(detectConversationDepth({ messages: turns(11) }), 4);
  });

  test("21 turns (>20) -> 6", () => {
    assert.equal(detectConversationDepth({ messages: turns(21) }), 6);
  });

  test("31 turns (>30) -> 8", () => {
    assert.equal(detectConversationDepth({ messages: turns(31) }), 8);
  });

  test("counts both user and assistant roles", () => {
    // 3 user + 3 assistant = 6 turns -> 2
    const messages = [
      { role: "user", content: "a" },
      { role: "assistant", content: "b" },
      { role: "user", content: "c" },
      { role: "assistant", content: "d" },
      { role: "user", content: "e" },
      { role: "assistant", content: "f" },
    ];
    assert.equal(detectConversationDepth({ messages }), 2);
  });
});

describe("detectFileReferences", () => {
  test("no references -> 0", () => {
    assert.equal(detectFileReferences(stringMessages("hello world")), 0);
  });

  test("a multi-segment path counts once", () => {
    assert.equal(detectFileReferences(stringMessages("/src/app/main.ts")), 1);
  });

  test("a file:line:col reference counts once", () => {
    assert.equal(detectFileReferences(stringMessages("foo:12:5")), 1);
  });

  test("canonical doc names count once", () => {
    assert.equal(detectFileReferences(stringMessages("README")), 1);
  });

  test("a unified-diff hunk header counts once", () => {
    assert.equal(detectFileReferences(stringMessages("@@ -1,2 @@")), 1);
  });

  test("clamps to a maximum of 5", () => {
    // README/CHANGELOG/TODO -> 3, diff/patch/merge -> 3 => 6 matches => min(5, 6) = 5
    assert.equal(
      detectFileReferences(stringMessages("README CHANGELOG TODO diff patch merge")),
      5
    );
  });
});

describe("detectErrorContext", () => {
  test("no error context -> 0", () => {
    assert.equal(detectErrorContext(stringMessages("hello world")), 0);
  });

  test("FINDING: single match yields 0.5 (this detector does not round)", () => {
    assert.equal(detectErrorContext(stringMessages("Error")), 0.5);
  });

  test("two matches -> 2*0.5 = 1", () => {
    assert.equal(detectErrorContext(stringMessages("Error Exception")), 1);
  });

  test("clamps to a maximum of 5", () => {
    // 5 error names + throw/catch/finally (3) + failed/crashed (2) = 10 => 10*0.5 = 5
    assert.equal(
      detectErrorContext(
        stringMessages(
          "Error Exception TypeError ReferenceError SyntaxError throw catch finally failed crashed"
        )
      ),
      5
    );
  });
});

describe("detectEnhancedContextSize", () => {
  test("no messages, no systemPrompt, no tools -> 0", () => {
    assert.equal(detectEnhancedContextSize({ messages: [] }), 0);
  });

  test("systemPrompt tokens count toward the total (> 1000 -> 1)", () => {
    // 4004 chars -> 1001 tokens -> > 1000 -> 1
    assert.equal(detectEnhancedContextSize({ messages: [], systemPrompt: repeat(4004) }), 1);
  });

  test("larger systemPrompt climbs the ladder (> 4000 -> 3)", () => {
    // 16004 chars -> 4001 tokens -> > 4000 -> 3
    assert.equal(detectEnhancedContextSize({ messages: [], systemPrompt: repeat(16004) }), 3);
  });

  test("tool definitions contribute tokens when present", () => {
    // A single tool with a ~4000-char description serializes to ~1000+ tokens -> 1
    const tool = { function: { name: "x", description: repeat(4000) } };
    assert.equal(detectEnhancedContextSize({ messages: [], tools: [tool] }), 1);
  });
});

describe("getEnhancedSpecificityBreakdown", () => {
  test("differs from getSpecificityBreakdown ONLY in contextSize", () => {
    const input: RuleInput = {
      messages: [{ content: "const x = 5" }],
      systemPrompt: repeat(64004), // 16001 tokens -> enhanced contextSize crosses > 16000 -> 7
    };
    const plain = getSpecificityBreakdown(input);
    const enhanced = getEnhancedSpecificityBreakdown(input);

    // Only messages feed detectContextSize, so plain stays at 0.
    assert.equal(plain.contextSize, 0);
    // systemPrompt tokens push the enhanced context to the > 16000 rung.
    assert.equal(enhanced.contextSize, 7);

    // Every other dimension is computed identically.
    assert.equal(plain.codeComplexity, enhanced.codeComplexity);
    assert.equal(plain.mathComplexity, enhanced.mathComplexity);
    assert.equal(plain.reasoningDepth, enhanced.reasoningDepth);
    assert.equal(plain.toolCalling, enhanced.toolCalling);
    assert.equal(plain.domainSpecificity, enhanced.domainSpecificity);
  });
});
