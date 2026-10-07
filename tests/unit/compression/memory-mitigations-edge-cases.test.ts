/**
 * Comprehensive Edge Cases, Failure Modes, and Workflows Test Suite
 * for all #7847 OOM & Memory Mitigations in OmniRoute.
 *
 * Verifies the memory mitigations hold across edge cases and failure modes:
 * 1. jsonSha256: BigInt/circular throws, toJSON/Date, Unicode, control chars,
 *    sparse arrays, undefined/function/symbol, deep nesting
 * 2. liveZone: fail-open on non-serializable messages, large base64 tool
 *    output digests + frozen prefix reuse
 * 3. hardBudget: multimodal non-string content, already-in-budget, unreachable
 *    budget, per-message proportional allocation
 * 4. thinkingBudget: adaptive multiplier scaling (messageCount/toolCount/lastMsg
 *    length >2000) via the real applyThinkingBudget entry point
 * 5. stats.ts & codex engine: exact-vs-heuristic boundary and oversized bodies
 * 6. streamPayloadCollector: exact byte-limit accounting via jsonLength
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { jsonSha256 } from "../../../open-sse/utils/jsonHash.ts";
import { jsonLength } from "../../../open-sse/utils/jsonSize.ts";
import { applyLiveZoneCompression } from "../../../open-sse/services/compression/liveZone.ts";
import { applyHardBudget } from "../../../open-sse/services/compression/hardBudget.ts";
import { applyThinkingBudget, ThinkingMode } from "../../../open-sse/services/thinkingBudget.ts";
import { estimateCompressionTokens } from "../../../open-sse/services/compression/stats.ts";
import { createStructuredSSECollector } from "../../../open-sse/utils/streamPayloadCollector.ts";
import type { CompressionResult } from "../../../open-sse/services/compression/types.ts";
import { adaptBodyForCompression } from "../../../open-sse/services/compression/bodyAdapter.ts";
import { codexResponsesEngine } from "../../../open-sse/services/compression/engines/codexResponses/index.ts";

function sha256hex(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

describe("Memory Mitigations — Comprehensive Edge Cases & Failure Modes", () => {
  // =========================================================================
  // 1. jsonSha256 Edge Cases & Failure Modes
  // =========================================================================
  describe("jsonSha256: Error handling & Edge cases", () => {
    it("throws TypeError on BigInt (matching JSON.stringify failure mode)", () => {
      assert.throws(
        () => jsonSha256({ val: BigInt(42) }),
        (err: unknown) => err instanceof TypeError
      );
      assert.throws(
        () => jsonSha256([1, 2, BigInt(99)]),
        (err: unknown) => err instanceof TypeError
      );
    });

    it("throws TypeError on circular references (matching JSON.stringify)", () => {
      const circularObj: Record<string, unknown> = { a: 1 };
      circularObj.self = circularObj;
      assert.throws(
        () => jsonSha256(circularObj),
        (err: unknown) => err instanceof TypeError && /circular/i.test((err as Error).message)
      );

      const circularArr: unknown[] = [1, 2];
      circularArr.push(circularArr);
      assert.throws(
        () => jsonSha256(circularArr),
        (err: unknown) => err instanceof TypeError && /circular/i.test((err as Error).message)
      );
    });

    it("matches JSON.stringify hash for toJSON methods, Dates, and complex subtrees", () => {
      const custom = {
        name: "test",
        toJSON() {
          return { resolved: true, num: 123 };
        },
      };
      const date = new Date("2026-08-25T05:00:00.000Z");
      const complex = { item: custom, date, nested: [{ inside: custom }] };
      assert.equal(jsonSha256(complex), sha256hex(JSON.stringify(complex)));
    });

    it("handles the full Unicode spectrum identically to JSON.stringify", () => {
      const unicodeCases = [
        "Hello 🌍 world 🚀",
        "👨‍👩‍👧‍👦 complex emoji sequence",
        "日本語のテストです。中文测试。한국어 테스트.",
        "∀x ∈ ℝ: x² ≥ 0 ∧ ∫ e^x dx = e^x + C",
        "Special quotes: „smart“ «guillemets» ‘single’ “double”",
      ];
      for (const str of unicodeCases) {
        const payload = { text: str, arr: [str, { k: str }] };
        assert.equal(jsonSha256(payload), sha256hex(JSON.stringify(payload)));
      }
    });

    it("handles control characters and escape sequences identically to JSON.stringify", () => {
      const controlCases = [
        "\x00\x01\x02\x03\x04\x05\x06\x07",
        "\b\t\n\x0b\f\r\x0e\x0f",
        "\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f",
        'Quotes: " \\ and escaped \\" \\\\ \n \t',
      ];
      for (const ctrl of controlCases) {
        const payload = { ctrl, nested: { value: ctrl } };
        assert.equal(jsonSha256(payload), sha256hex(JSON.stringify(payload)));
      }
    });

    it("handles sparse arrays, undefined/function/symbol, NaN/Infinity identically", () => {
      const sparseArr = new Array(5);
      sparseArr[1] = "foo";
      sparseArr[3] = null;

      const weirdObject = {
        a: undefined,
        b: () => {},
        c: Symbol("sym"),
        d: "kept",
        arr: [undefined, () => {}, Symbol("sym"), null, "kept", NaN, Infinity, -Infinity],
      };

      assert.equal(jsonSha256(sparseArr), sha256hex(JSON.stringify(sparseArr)));
      assert.equal(jsonSha256(weirdObject), sha256hex(JSON.stringify(weirdObject)));
    });

    it("handles deeply nested structures (depth 50) without recursion overflow", () => {
      let deep: Record<string, unknown> = { leaf: "value" };
      for (let i = 0; i < 50; i++) {
        deep = { level: i, next: deep };
      }
      assert.equal(jsonSha256(deep), sha256hex(JSON.stringify(deep)));
    });
  });

  // =========================================================================
  // 2. liveZone Edge Cases & Failure Modes
  // =========================================================================
  describe("liveZone: Edge cases, failure modes & streaming digests", () => {
    it("fails open gracefully when a message contains non-serializable data", async () => {
      const circularContent: Record<string, unknown> = { role: "tool" };
      circularContent.self = circularContent;

      const body = {
        messages: [{ role: "user", content: "hello" }, circularContent],
      };

      let compressorCalled = false;
      const compressor = async (b: Record<string, unknown>) => {
        compressorCalled = true;
        return { body: b, compressed: false, stats: null };
      };

      const result = await applyLiveZoneCompression(
        body,
        { principalId: "p1", sessionId: "s1", variant: "v1" },
        compressor
      );

      assert.ok(compressorCalled, "compressor called as fail-open fallback");
      assert.ok(result.body, "returned body intact");
    });

    it("digests large base64 tool output and reuses frozen prefix on new user message", async () => {
      const largeBase64 = "C".repeat(2 * 1024 * 1024); // 2 MiB payload
      const body = {
        messages: [
          { role: "user", content: "run tool" },
          { role: "tool", content: largeBase64, tool_call_id: "call_123" },
        ],
      };

      let compressionRuns = 0;
      const compressor = async (b: Record<string, unknown>): Promise<CompressionResult> => {
        compressionRuns++;
        return {
          body: {
            ...b,
            messages: (b.messages as Array<Record<string, unknown>>).map((m) =>
              m.role === "tool" ? { ...m, content: "compressed_tool" } : m
            ),
          },
          compressed: true,
          stats: {
            originalTokens: 100,
            compressedTokens: 20,
            savingsPercent: 80,
            techniquesUsed: ["tool-compress"],
            mode: "stacked",
            timestamp: Date.now(),
          },
        };
      };

      const opts = {
        principalId: "user_test",
        sessionId: "session_img",
        variant: "v1",
        ttlMinutes: 10,
      };
      const res1 = await applyLiveZoneCompression(body, opts, compressor);
      assert.equal(compressionRuns, 1, "first call ran compression and stored in liveZone");
      assert.equal(res1.compressed, true);

      // Second request with same messages + 1 new user message reuses frozen tool output
      const body2 = {
        messages: [...body.messages, { role: "user", content: "what next?" }],
      };
      const res2 = await applyLiveZoneCompression(body2, opts, compressor);
      assert.ok(res2.body);
      const resMsgs = res2.body.messages as Array<Record<string, unknown>>;
      assert.equal(resMsgs.length, 3);
      assert.equal(resMsgs[1].content, "compressed_tool");
    });
  });

  // =========================================================================
  // 3. hardBudget Edge Cases & Failure Modes
  // =========================================================================
  describe("hardBudget: Multimodal, boundary & warning failure modes", () => {
    it("preserves non-string multimodal content while compressing string content", () => {
      const body = {
        messages: [
          { role: "system", content: "You are an assistant." },
          {
            role: "user",
            content: [
              { type: "text", text: "Explain this diagram:" },
              { type: "image", source: { type: "base64", data: "fakebase64" } },
            ],
          },
          {
            role: "assistant",
            content: "This is a very long response that will be compressed. ".repeat(30),
          },
        ],
      };

      const result = applyHardBudget(body, { targetTokens: 40 });
      assert.ok(result.body);
      const msgs = result.body.messages as Array<Record<string, unknown>>;
      assert.equal(msgs.length, 3);
      // Non-string array content preserved intact (image block not dropped by token logic)
      assert.ok(Array.isArray(msgs[1].content));
      assert.equal((msgs[1].content as unknown[]).length, 2);
      assert.equal(result.compressed, true);
      assert.ok(result.stats);
    });

    it("returns compressed:false when already within targetTokens", () => {
      const body = {
        messages: [{ role: "user", content: "Short message." }],
      };
      const result = applyHardBudget(body, { targetTokens: 1000 });
      assert.equal(result.compressed, false);
      assert.equal(result.stats, null);
    });

    it("emits validationWarnings when preserved content prevents reaching target", () => {
      const body = {
        messages: [{ role: "user", content: "`preserve_code_block_that_exceeds_target`" }],
      };
      const result = applyHardBudget(body, { targetTokens: 1 });
      if (result.compressed) {
        assert.ok(
          result.stats?.validationWarnings?.some((w) => /could not reach target/i.test(w)),
          "expected a validationWarning when target unreachable"
        );
      }
    });
  });

  // =========================================================================
  // 4. thinkingBudget Adaptive Multiplier via real entry point
  // =========================================================================
  describe("thinkingBudget: adaptive multiplier scaling", () => {
    function adaptiveBudgetFor(body: unknown, effort: string): number {
      const result = applyThinkingBudget(body, {
        mode: ThinkingMode.ADAPTIVE,
        effortLevel: effort,
      }) as { thinking?: { budget_tokens: number } };
      return result.thinking?.budget_tokens ?? 0;
    }

    it("scales multiplier for long last user message (>2000 chars) on string content", () => {
      const shortBody = {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "x".repeat(500) }],
      };
      const longBody = {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "x".repeat(2500) }],
      };

      const shortBudget = adaptiveBudgetFor(shortBody, "medium");
      const longBudget = adaptiveBudgetFor(longBody, "medium");

      // Base 10240. Long last-msg adds +0.3 => ceil(10240*1.3) = 13312
      // (short stays at 1.0 => 10240, unless model caps).
      assert.equal(shortBudget, 10240);
      assert.ok(longBudget > shortBudget, `long budget ${longBudget} > short ${shortBudget}`);
    });

    it("scales multiplier for >2000-char array content via jsonLength", () => {
      const longArrayBody = {
        model: "claude-opus-4-8",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "x".repeat(1500) },
              { type: "text", text: "y".repeat(1500) },
            ],
          },
        ],
      };
      const budget = adaptiveBudgetFor(longArrayBody, "medium");
      // array content length ~3000 > 2000 => multiplier 1.3
      assert.equal(budget, 10240 * 1.3);
    });

    it("handles missing, empty, or null user messages without throwing", () => {
      const base: Record<string, unknown> = { model: "claude-opus-4-8", messages: [] };
      assert.doesNotThrow(() => adaptiveBudgetFor(base, "low"));
      assert.doesNotThrow(() =>
        adaptiveBudgetFor({ ...base, messages: [{ role: "system", content: "hi" }] }, "low")
      );
      assert.doesNotThrow(() =>
        adaptiveBudgetFor({ ...base, messages: [{ role: "user", content: "" }] }, "low")
      );
      assert.doesNotThrow(() =>
        adaptiveBudgetFor({ ...base, messages: [{ role: "user", content: null }] }, "low")
      );
    });
  });

  // =========================================================================
  // 5. stats.ts exact-vs-heuristic boundary (50k chars)
  // =========================================================================
  describe("estimateCompressionTokens: boundary threshold behavior", () => {
    it("computes bounded estimates under and over the 50k-char threshold", () => {
      const underBoundary = {
        messages: [{ role: "user", content: "hello world ".repeat(3000) }], // ~36k chars
      };
      const overBoundary = {
        messages: [{ role: "user", content: "hello world ".repeat(6000) }], // ~72k chars
      };

      const estUnder = estimateCompressionTokens(underBoundary);
      const estOver = estimateCompressionTokens(overBoundary);

      assert.ok(estUnder > 0, "under-boundary estimate computed");
      assert.ok(estOver > 0, "over-boundary estimate computed");
      assert.ok(estOver > estUnder, "larger payload has larger token count");
    });

    it("strips base64 data URIs embedded in arbitrary strings (tool-output screenshot)", () => {
      // A base64 screenshot embedded in a tool-output JSON *string* is NOT a structured
      // image block, but must not inflate the token estimate either. Prior to the fix,
      // charTokensOf counted the raw string length → ~200KB img inflated the estimate
      // (~52k tokens). Now the embedded data URI is stripped.
      const img = `data:image/png;base64,${"A".repeat(200 * 1024)}`;
      const body = {
        messages: [
          { role: "user", content: "analyze the screenshot" },
          {
            role: "tool",
            content: JSON.stringify({ tool: "browser_snapshot", png: img, text: "dom" }),
          },
        ],
      };
      const est = estimateCompressionTokens(body);
      assert.ok(est > 0, "estimate computed");
      assert.ok(
        est < 5000,
        `embedded 200KB data URI must be stripped, not inflate the estimate (got ${est})`
      );
    });
  });

  // =========================================================================
  // 6. codexResponses oversized-body token guard (>50k chars → heuristic)
  // =========================================================================
  describe("codexResponses: oversized tool-output token estimate stays bounded", () => {
    it("compresses a >50k-char eligible tool output without inflating the token estimate", () => {
      // Pretty-printed JSON (>50k chars with whitespace to strip, but under the
      // 512KB maxCandidateBytes cap). minifyJson removes the whitespace so the
      // engine compresses it, and countCodexTokensForBody must engage the >50k
      // heuristic rather than a giant exact tokenizer pass.
      const pretty = Array.from({ length: 700 }, (_, i) => ({
        name: `src/module_${i}/file_${i}.ts`,
        status: "modified",
        meta: { lines: 40 + i, author: `dev_${i % 5}`, branch: "feature/compression" },
        note: "some descriptive content that gets minified away",
      }));
      const bigOutput = JSON.stringify(pretty, null, 2); // indented => minifiable

      assert.ok(
        bigOutput.length > 50_000,
        `fixture must exceed 50k chars (got ${bigOutput.length})`
      );
      assert.ok(bigOutput.length < 512 * 1024, "fixture under maxCandidateBytes");

      const adapter = adaptBodyForCompression({
        input: [
          { type: "function_call", call_id: "c1", name: "run_command", arguments: "{}" },
          { type: "function_call_output", call_id: "c1", output: bigOutput },
        ],
      });
      const result = codexResponsesEngine.apply(adapter.body, {
        stepConfig: { enabled: true },
      });

      assert.equal(result.compressed, true, "oversized eligible output should compress");
      assert.ok(result.stats, "stats present");
      // The token estimate must be bounded: a >50k-char body uses the heuristic
      // (jsonLength/4) rather than a full exact tokenizer, so it stays
      // proportional to the real content and never balloons.
      assert.ok(
        result.stats.originalTokens < bigOutput.length,
        "originalTokens bounded below raw char count"
      );
      assert.ok(result.stats.originalTokens > 0, "positive token estimate");
      assert.ok(
        result.stats.compressedTokens > 0 &&
          result.stats.compressedTokens <= result.stats.originalTokens
      );
    });

    it("does not inflate originalTokens for oversized output embedding a base64 image", () => {
      // countCodexTokensForBody's oversized branch must strip base64 data URIs before the
      // char heuristic, matching countTextTokens(JSON.stringify(body)) semantics. Otherwise a
      // large embedded screenshot (~5x-10x raw length vs true tokens) inflates originalTokens
      // and distorts savingsPercent, the silent-threshold-drift class the review warned against.
      const imgBase64 = `data:image/png;base64,${"A".repeat(200 * 1024)}`;
      // Pretty-printed JSON (>50k chars) that minifyJson rewrites, so the engine produces stats.
      const bigOutput = JSON.stringify(
        {
          tool: "browser_snapshot",
          png: imgBase64,
          metadata: {
            url: "https://example.com/page",
            viewport: "1440x900",
            status: "complete",
          },
          text: "some surrounding snapshot text that should dominate the true token estimate",
        },
        null,
        2
      );
      assert.ok(
        bigOutput.length > 50_000,
        `fixture must exceed 50k chars (got ${bigOutput.length})`
      );

      const adapter = adaptBodyForCompression({
        input: [
          { type: "function_call", call_id: "c2", name: "browser_snapshot", arguments: "{}" },
          { type: "function_call_output", call_id: "c2", output: bigOutput },
        ],
      });
      const result = codexResponsesEngine.apply(adapter.body, { stepConfig: { enabled: true } });

      assert.ok(result.stats, "stats present");
      // Without stripping, originalTokens ≈ (200KB base64 + overhead)/4 ≈ 51k+. With stripping,
      // it is proportional to the real text → well under 5k. Assert it stayed low.
      const raw = bigOutput.length;
      assert.ok(
        result.stats.originalTokens < raw / 4,
        `base64 must be stripped: originalTokens ${result.stats.originalTokens} should be well below raw/4 = ${raw / 4}`
      );
      assert.ok(
        result.stats.originalTokens < 5000,
        `embedded 200KB image must not inflate the estimate (got ${result.stats.originalTokens})`
      );
      assert.ok(result.stats.originalTokens > 0, "still a positive token estimate");
    });

    it("does not allocate a giant exact tokenizer string for oversized non-string bodies", () => {
      // Non-tool, non-string message with a huge nested object still routes through
      // the jsonLength guard in countCodexTokensForBody (heuristic), not a huge exact stringify.
      const bigBlob = {
        data: Array.from({ length: 8000 }, (_, i) => ({ v: `chunk${i}_${"x".repeat(20)}` })),
      };
      const adapter = adaptBodyForCompression({ input: [bigBlob] });
      const result = codexResponsesEngine.apply(adapter.body, { stepConfig: { enabled: true } });
      // Should not throw and should not produce an inflated token count.
      assert.ok(result.body);
      assert.equal(result.compressed, false, "ineligible blob left untouched");
    });
  });

  // =========================================================================
  // 7. streamPayloadCollector Exact Byte-Limit Accounting via jsonLength
  // =========================================================================
  describe("streamPayloadCollector: exact byte-limit accounting", () => {
    it("collects a bounded subset within maxBytes using jsonLength", () => {
      const collector = createStructuredSSECollector({
        maxEvents: 100,
        maxBytes: 200,
      });

      collector.push({ role: "assistant", content: "hi" });
      assert.equal(collector.getEvents().length, 1);

      for (let i = 0; i < 10; i++) {
        collector.push({ role: "assistant", content: `msg_${i}_${"x".repeat(30)}` });
      }

      const events = collector.getEvents();
      assert.ok(events.length >= 1 && events.length < 10, `bounded events ${events.length}`);
      const totalBytes = events.reduce((sum, e) => sum + jsonLength(e), 0);
      assert.ok(totalBytes <= 200, `totalBytes ${totalBytes} <= maxBytes 200`);
    });

    it("does not exceed maxEvents even when individual events are tiny", () => {
      const collector = createStructuredSSECollector({
        maxEvents: 5,
        maxBytes: 100000,
      });
      for (let i = 0; i < 20; i++) {
        collector.push({ role: "assistant", content: `m${i}` });
      }
      assert.equal(collector.getEvents().length, 5);
    });
  });
});
