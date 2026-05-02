# Task 13 — Golden-Set Regression Tests for All New Rules

> **Priority**: P2 | **Effort**: 45 min | **Dependencies**: Tasks 01–03, 07, 08, 11 | **Branch**: `release/v3.7.9`

---

## Problem

After adding 5+ new rules (articles, pleasantries, leaders, redundant phrasing) and modifying the preservation layer (fence parser, sentinels, validation), we need a comprehensive golden-set test suite that:

1. Verifies all new rules fire correctly on realistic prompts
2. Ensures combined rule application achieves Caveman-level compression (40%+ savings)
3. Detects regressions if any rule is accidentally broken
4. Validates that critical content (code, URLs, identifiers) is never corrupted

---

## Solution

Create a golden-set test file with 10 realistic prompt pairs (input → expected_output) that exercise all rules together, plus savings threshold assertions.

## File: `tests/golden-set/compression-caveman-v2.test.ts`

```typescript
import { describe, it } from "node:test";
import assert from "node:assert";
import { cavemanCompress } from "../../open-sse/services/compression/caveman.ts";

// Helper: extract compressed text from result
function compress(text: string, role = "user"): string {
  const result = cavemanCompress({ messages: [{ role, content: text }] });
  return typeof (result.body as any).messages[0].content === "string"
    ? (result.body as any).messages[0].content
    : text;
}

function savings(original: string, compressed: string): number {
  return ((original.length - compressed.length) / original.length) * 100;
}

describe("Caveman v2 Golden-Set", () => {
  // ── Prompt 1: Model-generated verbose response ──
  it("GS-01: Should compress verbose model response", () => {
    const input =
      "Sure! I'd be happy to help you with that. The issue you're experiencing " +
      "is most likely caused by the authentication middleware not properly " +
      "validating the token expiry. Let me take a look and suggest a fix.";
    const output = compress(input, "assistant");

    // Articles removed
    assert(!output.match(/\bthe\s+[a-z]/i) || output.length < input.length * 0.7);
    // Pleasantries removed
    assert(!output.includes("Sure!"));
    assert(!output.includes("I'd be happy"));
    // Leaders removed
    assert(!output.includes("Let me"));
    // Must still contain technical substance
    assert(output.includes("authentication") || output.includes("auth"));
    assert(output.includes("middleware"));
    assert(output.includes("token"));
    // Savings threshold
    assert(savings(input, output) > 30, `Expected >30% savings, got ${savings(input, output)}%`);
  });

  // ── Prompt 2: User prompt with filler ──
  it("GS-02: Should compress user prompt with filler and hedging", () => {
    const input =
      "I was wondering if you could basically explain why the database " +
      "connection is actually timing out. It seems like it might be related " +
      "to the connection pool configuration.";
    const output = compress(input, "user");

    assert(!output.includes("I was wondering if you could"));
    assert(!output.includes("basically"));
    assert(!output.includes("actually"));
    assert(!output.includes("It seems like"));
    assert(output.includes("connection"));
    assert(output.includes("timing out") || output.includes("timeout"));
    assert(savings(input, output) > 25);
  });

  // ── Prompt 3: Code block preservation ──
  it("GS-03: Should preserve code blocks intact", () => {
    const input =
      "I need you to please review the following code and explain what's wrong:\n" +
      "```typescript\n" +
      "const handler = async (req: Request) => {\n" +
      '  const token = req.headers.get("Authorization");\n' +
      "  if (!token) throw new Error('Unauthorized');\n" +
      "  return Response.json({ ok: true });\n" +
      "};\n" +
      "```\n" +
      "The error is basically that it doesn't validate the token properly.";
    const output = compress(input, "user");

    // Code block must be byte-exact
    assert(output.includes('const handler = async (req: Request) => {'));
    assert(output.includes('req.headers.get("Authorization")'));
    assert(output.includes("throw new Error('Unauthorized')"));
    // Filler removed from prose
    assert(!output.includes("basically"));
    assert(!output.includes("I need you to please"));
  });

  // ── Prompt 4: URL and path preservation ──
  it("GS-04: Should preserve URLs and file paths", () => {
    const input =
      "Please check the documentation at https://docs.example.com/api/v2/auth " +
      "and update the configuration file at /src/config/auth.yaml. " +
      "Make sure to also review the CONTRIBUTING.md file.";
    const output = compress(input, "user");

    assert(output.includes("https://docs.example.com/api/v2/auth"));
    assert(output.includes("/src/config/auth.yaml"));
    assert(!output.includes("Please"));
    assert(!output.includes("Make sure to") || output.includes("ensure"));
  });

  // ── Prompt 5: Inline code preservation ──
  it("GS-05: Should preserve inline code tokens", () => {
    const input =
      "You can use `useMemo` to memoize the value and `useCallback` for " +
      "the handler. The `MAX_RETRIES` constant should be set to 3.";
    const output = compress(input, "assistant");

    assert(output.includes("`useMemo`"));
    assert(output.includes("`useCallback`"));
    assert(output.includes("`MAX_RETRIES`"));
  });

  // ── Prompt 6: Redundant phrasing ──
  it("GS-06: Should simplify redundant phrasing", () => {
    const input =
      "Due to the fact that the server is not able to handle the load, " +
      "it is important to note that we need to scale horizontally. " +
      "In the event that the primary fails, the secondary takes over.";
    const output = compress(input, "user");

    assert(!output.includes("Due to the fact that"));
    assert(!output.includes("is not able to"));
    assert(!output.includes("it is important to note that"));
    assert(!output.includes("In the event that"));
    assert(output.includes("because") || output.includes("can"));
  });

  // ── Prompt 7: Version numbers and identifiers ──
  it("GS-07: Should preserve version numbers and CONST_CASE", () => {
    const input =
      "Upgrade from version 3.7.8 to 3.7.9 and set DEFAULT_TIMEOUT to 5000. " +
      "The process.env.NODE_ENV variable should be 'production'.";
    const output = compress(input, "user");

    assert(output.includes("3.7.8"));
    assert(output.includes("3.7.9"));
    assert(output.includes("DEFAULT_TIMEOUT"));
    assert(output.includes("process.env"));
  });

  // ── Prompt 8: Multi-turn context ──
  it("GS-08: Should handle multi-message compression", () => {
    const result = cavemanCompress({
      messages: [
        { role: "user", content: "I was wondering if you could help me with the auth issue." },
        { role: "assistant", content: "Sure! I'd be happy to help. Let me check the configuration." },
        { role: "user", content: "Thank you so much! The error is in the middleware basically." },
      ],
    });
    const msgs = (result.body as any).messages;
    // All 3 messages should be compressed
    assert(!msgs[0].content.includes("I was wondering if you could"));
    assert(!msgs[1].content.includes("Sure!"));
    assert(!msgs[2].content.includes("Thank you so much"));
  });

  // ── Prompt 9: Empty and short messages should pass through ──
  it("GS-09: Should not corrupt short messages", () => {
    const result = cavemanCompress({
      messages: [
        { role: "user", content: "Fix bug" },
        { role: "user", content: "" },
        { role: "system", content: "You are a helpful assistant." },
      ],
    });
    const msgs = (result.body as any).messages;
    assert.strictEqual(msgs[0].content, "Fix bug"); // below minMessageLength
    assert.strictEqual(msgs[1].content, "");
  });

  // ── Prompt 10: Overall savings benchmark ──
  it("GS-10: Should achieve >35% average savings on verbose prompts", () => {
    const prompts = [
      "Sure! I'd be happy to help you with that. The issue is most likely caused by the authentication middleware.",
      "I was wondering if you could basically explain why the database connection is actually timing out.",
      "Let me take a look at the configuration. You can use the environment variable to set the timeout.",
      "Due to the fact that the server is not able to handle the load, we need to scale horizontally.",
      "Please make sure to run the test suite before pushing any changes to the main branch.",
    ];
    let totalOrig = 0;
    let totalComp = 0;
    for (const p of prompts) {
      const c = compress(p, "assistant");
      totalOrig += p.length;
      totalComp += c.length;
    }
    const avgSavings = ((totalOrig - totalComp) / totalOrig) * 100;
    assert(avgSavings > 35, `Expected >35% average savings, got ${avgSavings.toFixed(1)}%`);
  });
});
```

## Verification

```bash
node --import tsx/esm --test tests/golden-set/compression-caveman-v2.test.ts
```

Expected: All 10 golden-set tests pass. Average savings on verbose prompts >35%.

## Commit

```
test(compression): add Caveman v2 golden-set regression tests

10 golden-set test cases covering all new rules (articles, pleasantries,
leaders, redundant phrasing), preservation correctness (code blocks,
URLs, inline code, version numbers), and savings benchmarks (>35%
average on verbose prompts).
```

## Rollback

Delete the test file. No production code is affected.

## 2026-05-02 Expansion Addendum

Do not rely on the older weak savings assertions. The current golden savings test title says
`>=20%`, but the actual assertion accepts much lower savings. This task must add real gates:

- `standard`/Caveman full: meaningful savings on verbose English prose, target documented in
  the test.
- `aggressive`: stronger savings on long coding sessions without losing tool semantics.
- `ultra`: high savings only within documented safe boundaries.
- Multimodal payloads: non-text parts are preserved exactly.
- Protected content: code blocks, inline code, URLs, paths, versions, frontmatter, headings,
  tables, and math are preserved.

Also add a regression case for each new rule introduced in Tasks 01, 02, 03, and 11.
