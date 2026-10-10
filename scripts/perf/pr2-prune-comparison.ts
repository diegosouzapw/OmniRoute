/**
 * PR-2 benchmark: times the frozen pre-change algorithms
 * (tests/helpers/context-estimation-reference.ts) against the live optimized
 * ones on large multimodal histories. The committed harness from PR 1
 * (scripts/perf/large-context-hotpaths.ts) covers the estimator via the
 * final-guard sequence; this adds the image-pruner comparison PR 2 targets.
 *
 *   node --expose-gc --import tsx/esm scripts/perf/pr2-prune-comparison.ts
 */
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const TMP_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pr2-bench-"));
process.env.DATA_DIR = TMP_DATA_DIR;

const { estimateTokens, pruneOlderInlineImages } =
  await import("../../open-sse/services/contextManager.ts");
const { referenceEstimateTokens, referencePruneOlderInlineImages } =
  await import("../../tests/helpers/context-estimation-reference.ts");

const b64 = (n: number) => Buffer.alloc(n, 65).toString("base64");
const IMG = { type: "image_url", image_url: { url: `data:image/png;base64,${b64(64_000)}` } };

function multimodalHistory(messages: number): Record<string, unknown>[] {
  return Array.from({ length: messages }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: [
      { type: "text", text: `turn ${i} ` + "analysis ".repeat(80) },
      { type: "image_url", image_url: { url: `data:image/png;base64,${b64(64_000)}` } },
    ],
  }));
}

function med(a: number[]): number {
  const s = [...a].sort((x, y) => x - y);
  return s[Math.floor(s.length / 2)];
}
function bench(label: string, iterations: number, fn: () => unknown): void {
  fn();
  const t: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    fn();
    t.push(performance.now() - t0);
  }
  console.log(
    `${label}: median ${med(t).toFixed(3)} ms (min ${Math.min(...t).toFixed(3)}, n=${iterations})`
  );
}

for (const [name, messages, iterations] of [
  ["history-24-img", 24, 30],
  ["history-100-img", 100, 10],
] as const) {
  const history = multimodalHistory(messages);
  // Same alias-free fixture for both sides.
  const fresh = () => structuredClone(history);

  // Parity precondition before timing anything.
  const total = referenceEstimateTokens(history);
  if (estimateTokens(history) !== total) throw new Error("estimate parity broken");
  for (const keepLatest of [0, 2]) {
    for (const target of [total, total - 5_000, total - 40_000]) {
      const a = pruneOlderInlineImages(structuredClone(history), {
        keepLatest,
        targetTokens: target,
      });
      const b = referencePruneOlderInlineImages(structuredClone(history), {
        keepLatest,
        targetTokens: target,
      });
      if (a.pruned !== b.pruned || JSON.stringify(a.messages) !== JSON.stringify(b.messages)) {
        throw new Error(`prune parity broken keep=${keepLatest} target=${target}`);
      }
    }
  }
  console.log(
    `\n== ${name} (${messages} messages, wire ${Math.round(JSON.stringify(history).length / 1024)} KB) ==`
  );
  bench("estimateTokens (old reference)", iterations, () => referenceEstimateTokens(history));
  bench("estimateTokens (new fused)   ", iterations, () => estimateTokens(history));
  const target = total - 40_000; // forces several removals before the stop
  bench("prune w/ target (old recount)", iterations, () =>
    referencePruneOlderInlineImages(fresh(), { keepLatest: 2, targetTokens: target })
  );
  bench("prune w/ target (new deltas) ", iterations, () =>
    pruneOlderInlineImages(fresh(), { keepLatest: 2, targetTokens: target })
  );
}

fs.rmSync(TMP_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
