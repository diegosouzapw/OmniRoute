/**
 * Large-context hot-path benchmark (PR: remove redundant request-path work).
 *
 * Measures the real production estimators touched by the optimization PRs —
 * `estimateFinalInputTokenBreakdown` / `estimateCalibratedFinalInputTokens`
 * (chatCore final guard), `estimateCompressionTokens` (compression stats), and
 * the outbound-body `JSON.stringify` cost the executor used to pay twice on
 * fingerprint-enabled dispatches — over deterministic large-request fixtures.
 *
 * The handler-sequence rows compose those same functions in the exact order
 * chatCore used BEFORE and uses AFTER the change, so the removed work shows up
 * as a measured difference rather than a claim.
 *
 * Deterministic and API-free (no network, no credentials, no DB writes).
 * Node only, run with --expose-gc for the allocation columns:
 *
 *   node --expose-gc --import tsx/esm scripts/perf/large-context-hotpaths.ts
 *   node --expose-gc --import tsx/esm scripts/perf/large-context-hotpaths.ts --json
 */
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Defensive: some imports transitively read DATA_DIR on load; keep the
// benchmark hermetic even if a future import grows a store dependency.
const TMP_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hotpath-bench-"));
process.env.DATA_DIR = TMP_DATA_DIR;

const { buildAgentPayload } = await import("./agentPayloadCorpus.ts");
const { estimateFinalInputTokenBreakdown, estimateCalibratedFinalInputTokens } =
  await import("../../open-sse/handlers/chatCore/contextEstimation.ts");
const { estimateTokens } = await import("../../open-sse/services/contextManager.ts");
const { estimateCompressionTokens } = await import("../../open-sse/services/compression/stats.ts");

const AS_JSON = process.argv.includes("--json");
const MIB = 1024 * 1024;
const gc = globalThis.gc as (() => void) | undefined;

function settle(): void {
  for (let i = 0; i < 3; i++) gc?.();
}

type Row = {
  scenario: string;
  operation: string;
  iterations: number;
  medianMs: number;
  minMs: number;
  allocBytesPerIter: number | null;
};

function bench(scenario: string, operation: string, iterations: number, fn: () => unknown): Row {
  fn(); // warm-up + shape check
  const samples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    fn();
    samples.push(performance.now() - t0);
  }
  samples.sort((a, b) => a - b);

  let allocPerIter: number | null = null;
  if (gc) {
    settle();
    const before = process.memoryUsage().heapUsed;
    for (let i = 0; i < iterations; i++) fn();
    settle();
    allocPerIter = Math.max(0, process.memoryUsage().heapUsed - before) / iterations;
  }

  const median = samples[Math.floor(samples.length / 2)];
  return {
    scenario,
    operation,
    iterations,
    medianMs: Math.round(median * 1000) / 1000,
    minMs: Math.round(samples[0] * 1000) / 1000,
    allocBytesPerIter: allocPerIter === null ? null : Math.round(allocPerIter),
  };
}

// ── Fixtures ─────────────────────────────────────────────────────────────────

function agentBody(messages: number, tools: number, words: number): Record<string, unknown> {
  return buildAgentPayload(messages, tools, words);
}

/** Array-content (Claude-style) body without images — the COW fast path. */
function arrayContentBody(messages: number, withImages: number): Record<string, unknown> {
  const blocks = [];
  for (let i = 0; i < messages; i++) {
    const content: Array<Record<string, unknown>> = [
      { type: "text", text: `turn ${i} — analyze the attached transcript carefully.` },
      { type: "text", text: "context ".repeat(600) },
    ];
    if (i < withImages) {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/png",
          data: Buffer.alloc(64_000, 65).toString("base64"),
        },
      });
    }
    blocks.push({ role: i % 2 === 0 ? "user" : "assistant", content });
  }
  return { model: "claude-sonnet-5", max_tokens: 4096, messages: blocks };
}

const FIXTURES: Array<{ name: string; body: Record<string, unknown>; iterations: number }> = [
  { name: "small-no-tools", body: agentBody(4, 0, 20), iterations: 300 },
  { name: "agent-1mib", body: agentBody(200, 30, 300), iterations: 40 },
  { name: "incident-3mib", body: agentBody(729, 86, 527), iterations: 12 },
  { name: "stats-array-1mib", body: arrayContentBody(160, 0), iterations: 40 },
  { name: "stats-array-images", body: arrayContentBody(160, 8), iterations: 40 },
];

// ── Operations ───────────────────────────────────────────────────────────────

/** chatCore's final-guard sequence as composed BEFORE the change. */
function guardSequenceOld(body: Record<string, unknown>): void {
  const calibrated = estimateCalibratedFinalInputTokens(body, "bench", "bench-model");
  const toolsReserve = Array.isArray(body.tools) ? estimateTokens(body.tools) : 0;
  // Last-resort compaction re-check (body unchanged when it fits): one more
  // calibrated pass + a full breakdown for the log line.
  estimateCalibratedFinalInputTokens(body, "bench", "bench-model");
  const breakdown = estimateFinalInputTokenBreakdown(body);
  if (calibrated < 0 || toolsReserve < 0 || breakdown.total < 0) throw new Error("unreachable");
}

/** chatCore's final-guard sequence as composed AFTER the change. */
function guardSequenceNew(body: Record<string, unknown>): void {
  const breakdown = estimateFinalInputTokenBreakdown(body);
  const calibrated = estimateCalibratedFinalInputTokens(body, "bench", "bench-model", breakdown);
  const toolsReserve = breakdown.tools;
  // Compaction re-check: one fresh breakdown, reused by calibration + log.
  const fresh = estimateFinalInputTokenBreakdown(body);
  if (calibrated < 0 || toolsReserve < 0 || fresh.total < 0) throw new Error("unreachable");
}

const rows: Row[] = [];
for (const fixture of FIXTURES) {
  const wireBytes = Buffer.byteLength(JSON.stringify(fixture.body), "utf8");
  rows.push({
    scenario: fixture.name,
    operation: "fixture-wire-bytes",
    iterations: 1,
    medianMs: wireBytes,
    minMs: 0,
    allocBytesPerIter: null,
  });
  rows.push(
    bench(fixture.name, "final-guard-sequence-old", fixture.iterations, () =>
      guardSequenceOld(fixture.body)
    ),
    bench(fixture.name, "final-guard-sequence-new", fixture.iterations, () =>
      guardSequenceNew(fixture.body)
    ),
    bench(
      fixture.name,
      "outbound-stringify-once",
      fixture.iterations,
      () => JSON.stringify(fixture.body).length
    )
  );
  if (fixture.name.startsWith("stats-")) {
    rows.push(
      bench(fixture.name, "estimateCompressionTokens", fixture.iterations, () =>
        estimateCompressionTokens(fixture.body)
      )
    );
  }
}

if (AS_JSON) {
  console.log(JSON.stringify({ node: process.version, gcAvailable: !!gc, rows }, null, 2));
} else {
  console.log(`# Large-context hot-path benchmark (node ${process.version}, gc=${!!gc})\n`);
  console.log("| scenario | operation | iter | median ms | min ms | alloc/iter |");
  console.log("| --- | --- | ---: | ---: | ---: | ---: |");
  for (const r of rows) {
    const val = r.operation === "fixture-wire-bytes" ? `${r.medianMs} B` : `${r.medianMs}`;
    const alloc = r.allocBytesPerIter === null ? "-" : `${r.allocBytesPerIter}`;
    console.log(
      `| ${r.scenario} | ${r.operation} | ${r.iterations} | ${val} | ${r.minMs} | ${alloc} |`
    );
  }
}

fs.rmSync(TMP_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
