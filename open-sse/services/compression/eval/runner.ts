import { selectCompressionPlan, applyCompressionAsync } from "../strategySelector.ts";
import { estimateCompressionTokens } from "../stats.ts";
import type { CompressionConfig, CompressionMode } from "../types.ts";
import { loadCorpus, hashCorpus } from "./corpus.ts";
import { buildJudgePrompt, parseJudgeVerdict, runSelfTest } from "./judge.ts";
import { buildGradePrompt, parseGradeVerdict } from "./grader.ts";
import { computeSavings } from "./savings.ts";
import { createCostMeter } from "./costMeter.ts";
import { aggregateRecords } from "./aggregate.ts";
import type { EvalCase, EvalRecord, EvalReport, ModelClient, RunStamps } from "./types.ts";

export interface RunEvalOptions {
  corpus: EvalCase[];
  client: ModelClient;
  config: CompressionConfig;
  comboId: string | null;
  combos: Record<string, CompressionConfig["stackedPipeline"]>;
  answerModel: string;
  judgeModel: string;
  provider: string;
  /** USD; <= 0 means unbounded. */
  costCapUsd: number;
  /** Score at most N cases (the seam for `--sample N`). */
  sample?: number;
  costPerKTokenIn?: number;
}

export interface RunEvalResult {
  aborted: boolean;
  abortReason?: string;
  report: EvalReport | null;
}

/** Build a one-question chat body the pipeline + model both accept. */
function buildBody(context: string, question: string): Record<string, unknown> {
  return { messages: [{ role: "user", content: `${context}\n\nQuestion: ${question}` }] };
}

function answerText(body: Record<string, unknown>): string {
  const messages = (body.messages ?? []) as Array<{ content?: unknown }>;
  return messages.map((m) => (typeof m.content === "string" ? m.content : "")).join("\n");
}

/**
 * Offline corpus eval (D1 §4.1). Self-test the judge FIRST (D-D3 abort), then for each case:
 * model(full) baseline, compress via the REAL pipeline at the target config, model(compressed),
 * judge fidelity, grade gold when present, compute mechanical savings. Errored cases are
 * recorded + excluded; the cost cap stops the loop and flags partial (no silent truncation).
 */
export async function runEval(opts: RunEvalOptions): Promise<RunEvalResult> {
  const corpus = loadCorpus(opts.corpus);

  // D-D3 self-test gate — a broken judge aborts before any score is emitted.
  const selfTest = await runSelfTest(opts.client, opts.judgeModel);
  if (!selfTest.passed) {
    return { aborted: true, abortReason: `judge self-test failed: ${selfTest.detail}`, report: null };
  }

  const limit = typeof opts.sample === "number" ? Math.max(0, opts.sample) : corpus.length;
  const cases = corpus.slice(0, limit);
  const meter = createCostMeter(opts.costCapUsd);
  // Self-test calls are NOT metered against the run cap — the cap governs only the corpus loop.
  const records: EvalRecord[] = [];
  let partial = false;

  for (const c of cases) {
    // Stop BEFORE a case if we cannot afford its (~3) model calls; flag partial.
    if (meter.exceeded) { partial = true; break; }

    const fullBody = buildBody(c.context, c.question);
    try {
      const full = await opts.client.complete(opts.answerModel, [{ role: "user", content: answerText(fullBody) }]);
      meter.add(full.usdCost ?? 0);

      const estimatedTokens = estimateCompressionTokens(fullBody);
      const plan = selectCompressionPlan(opts.config, opts.comboId, estimatedTokens, fullBody, undefined, opts.combos);
      const compressedResult = await applyCompressionAsync(fullBody, plan.mode as CompressionMode, {
        config: opts.config,
        model: opts.answerModel,
      });
      const compressedBody = compressedResult.compressed ? (compressedResult.body as Record<string, unknown>) : fullBody;

      const compressed = await opts.client.complete(opts.answerModel, [{ role: "user", content: answerText(compressedBody) }]);
      meter.add(compressed.usdCost ?? 0);

      const judge = await opts.client.complete(opts.judgeModel, buildJudgePrompt(full.text, compressed.text));
      meter.add(judge.usdCost ?? 0);
      const fidelity = parseJudgeVerdict(judge.text);

      let goldFull: boolean | null = null;
      let goldCompressed: boolean | null = null;
      if (typeof c.gold === "string") {
        const gf = await opts.client.complete(opts.judgeModel, buildGradePrompt(full.text, c.gold));
        meter.add(gf.usdCost ?? 0);
        const gc = await opts.client.complete(opts.judgeModel, buildGradePrompt(compressed.text, c.gold));
        meter.add(gc.usdCost ?? 0);
        goldFull = parseGradeVerdict(gf.text).correct;
        goldCompressed = parseGradeVerdict(gc.text).correct;
      }

      records.push({
        id: c.id,
        kind: c.kind,
        fidelity,
        goldFull,
        goldCompressed,
        savings: computeSavings(fullBody, compressedBody, opts.costPerKTokenIn),
        errored: false,
      });
    } catch (err) {
      records.push({
        id: c.id,
        kind: c.kind,
        fidelity: "unparseable",
        goldFull: null,
        goldCompressed: null,
        savings: { tokensBefore: 0, tokensAfter: 0, ratio: 1 },
        errored: true,
        errorDetail: err instanceof Error ? err.message : String(err),
      });
    }

    // After the case, if the cap is now crossed, stop the loop and flag partial.
    if (meter.exceeded) { partial = true; break; }
  }

  const stamps: RunStamps = {
    answerModel: opts.answerModel,
    judgeModel: opts.judgeModel,
    corpusHash: hashCorpus(corpus),
    sampleSize: typeof opts.sample === "number" ? opts.sample : "all",
  };
  const report = aggregateRecords(records, stamps, { partial, totalCostUsd: meter.spent });
  return { aborted: false, report };
}
