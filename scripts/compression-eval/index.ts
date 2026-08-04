/**
 * Compression evaluation harness CLI (D1). Runs the offline corpus eval (full-vs-compressed
 * + self-validating judge + gold grading + mechanical savings) and prints a markdown report.
 *
 * Real model calls cost money — a full run is OPT-IN. Use --sample and --cost-cap-usd.
 *
 * Usage:
 *   npm run eval:compression -- --answer-model <id> --judge-model <id> --provider <p> \
 *     --sample 10 --cost-cap-usd 2 --mode lite
 *
 * Implementer-config (spec leaves open): the answer/judge model ids, the provider, and the
 * default cost cap / sample. There is NO safe default that calls a real model — the CLI errors
 * if --answer-model / --judge-model / --provider are missing, so a bare run never spends money.
 */
import { runEval } from "../../open-sse/services/compression/eval/runner.ts";
import { createExecutorModelClient } from "../../open-sse/services/compression/eval/executorModelClient.ts";
import { formatReport } from "../../open-sse/services/compression/eval/report.ts";
import { SEED_CORPUS } from "../../open-sse/services/compression/eval/seedCorpus.ts";
import { getDefaultCompressionConfig } from "../../open-sse/services/compression/stats.ts";
import type { CompressionConfig } from "../../open-sse/services/compression/types.ts";

function flag(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

async function main(): Promise<void> {
  const answerModel = flag("answer-model");
  const judgeModel = flag("judge-model");
  const provider = flag("provider");
  if (!answerModel || !judgeModel || !provider) {
    console.error("eval:compression requires --answer-model, --judge-model and --provider (no model is called without them).");
    process.exitCode = 2;
    return;
  }
  const sample = flag("sample") ? Number(flag("sample")) : undefined;
  const costCapUsd = flag("cost-cap-usd") ? Number(flag("cost-cap-usd")) : 0;
  const mode = (flag("mode") ?? "lite") as CompressionConfig["defaultMode"];

  // Credentials wiring is operator-supplied (env / connection store). Documented in Rule #18:
  // the adapter is validated against a real account; this CLI reads the credential the operator
  // exports for the chosen provider. Placeholder lookup left to the operator's environment.
  const credentials = JSON.parse(process.env.OMNIROUTE_EVAL_CREDENTIALS ?? "{}");
  const client = createExecutorModelClient(provider, credentials);

  const config: CompressionConfig = { ...getDefaultCompressionConfig(), enabled: true, defaultMode: mode };

  const result = await runEval({
    corpus: SEED_CORPUS,
    client,
    config,
    comboId: null,
    combos: {},
    answerModel,
    judgeModel,
    provider,
    costCapUsd,
    sample,
  });

  if (result.aborted) {
    console.error(`eval aborted: ${result.abortReason}`);
    process.exitCode = 1;
    return;
  }
  console.log(formatReport(result.report!));
}

main().catch((err) => {
  console.error("eval:compression failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
