#!/usr/bin/env node
/**
 * Video Bridge FU-07/FU-09 promotion-evidence harness (#11656).
 *
 * This is the CONSUMER side of the promotion pipeline: given (a) a frozen case manifest
 * (src/lib/guardrails/videoBridgePromotionManifest.ts) and (b) a JSON file of raw per-run
 * observations already collected by calling a real model against fixtures materialized
 * from src/lib/guardrails/videoBridgePromotionFixtures.ts, it aggregates medians/p95
 * (videoBridgePromotionAggregator.ts), derives the FU-07/FU-09 comparison inputs
 * (videoBridgePromotionComparison.ts), evaluates both promotion verdicts
 * (videoBridgePromotionEvaluator.ts), and prints a report that persists metrics + response
 * DIGESTS only (videoBridgePromotionDigest.ts) — never raw media or raw model responses.
 *
 * It does not call any model itself and ships no fabricated data: without a real
 * observations file it always reports HOLD. Collecting real observations requires a live
 * model endpoint and the deterministic fixtures this repo can only describe, not execute —
 * see the PR's "Pending live validation" section for the exact commands to run on
 * VPS 192.168.0.15.
 *
 * Run: node --import tsx/esm scripts/perf/video-bridge-promotion-eval.ts --manifest <manifest.json>
 *      node --import tsx/esm scripts/perf/video-bridge-promotion-eval.ts --manifest <manifest.json> --observations <runs.json>
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { z } from "zod";

import {
  aggregatePromotionObservations,
  type VideoBridgePromotionAggregate,
} from "../../src/lib/guardrails/videoBridgePromotionAggregator";
import {
  buildFu07PromotionInputFromAggregates,
  buildFu09PromotionInputFromAggregates,
} from "../../src/lib/guardrails/videoBridgePromotionComparison";
import {
  buildPersistablePromotionRecord,
  digestPromotionText,
  type PersistablePromotionRecord,
} from "../../src/lib/guardrails/videoBridgePromotionDigest";
import {
  confirmVideoBridgePromotionRuns,
  promotionRunReceiptSchema,
  type PromotionConfirmation,
  type PromotionRunReceipt,
} from "../../src/lib/guardrails/videoBridgePromotionConfirmation";
import {
  evaluateFu07Promotion,
  evaluateFu09Promotion,
  type PromotionVerdict,
} from "../../src/lib/guardrails/videoBridgePromotionEvaluator";
import {
  validatePromotionEvidence,
  promotionExecutionSchema,
  type PromotionExecutionReceipt,
} from "../../src/lib/guardrails/videoBridgePromotionEvidence";
import {
  videoBridgePromotionManifestSchema,
  videoBridgePromotionMetricNameSchema,
  type VideoBridgePromotionManifest,
  type VideoBridgePromotionMetricName,
} from "../../src/lib/guardrails/videoBridgePromotionManifest";

const OVERALL_CASE_ID = "__overall__";

const videoBridgePromotionRunSchema = z
  .object({
    caseId: z.string().min(1),
    metrics: z.partialRecord(videoBridgePromotionMetricNameSchema, z.number().finite()),
    model: z.string().min(1),
    rawResponseText: z.string(),
    role: z.enum(["baseline", "candidate"]),
    observationId: z.uuid().optional(),
    repetition: z.number().int().nonnegative().optional(),
    preAnalysisMs: z.number().finite().nonnegative().optional(),
    mediaDigest: z
      .string()
      .regex(/^[a-f0-9]{64}$/)
      .optional(),
    promptDigest: z
      .string()
      .regex(/^[a-f0-9]{64}$/)
      .optional(),
    configurationDigest: z
      .string()
      .regex(/^[a-f0-9]{64}$/)
      .optional(),
  })
  .strict();

const videoBridgePromotionCaseObservationsSchema = z
  .object({
    caseId: z.string().min(1),
    criticalFactLoss: z.boolean(),
    isSecurityCase: z.boolean(),
    runs: z.array(videoBridgePromotionRunSchema).min(1),
    securityCasePassed: z.boolean(),
  })
  .strict();

export const videoBridgePromotionRunFileSchema = z
  .object({
    comparison: z.enum(["fu07", "fu09"]).optional(),
    cases: z.array(videoBridgePromotionCaseObservationsSchema).min(1),
    manifestId: z.string().min(1),
    execution: promotionExecutionSchema.optional(),
  })
  .strict();

export type VideoBridgePromotionRunFile = z.infer<typeof videoBridgePromotionRunFileSchema>;

export interface VideoBridgePromotionReport {
  comparison: "fu07" | "fu09" | null;
  candidateModel: string | null;
  execution: { state: "executed" | "not-configured"; receipt?: PromotionExecutionReceipt };
  fu07: PromotionVerdict;
  fu09: PromotionVerdict;
  generatedAt: string;
  kind: "video-bridge-fu07-fu09-promotion-eval";
  manifestId: string | null;
  missingConfiguration: string[];
  observationsDigest: string | null;
  promotion: PromotionConfirmation;
  records: PersistablePromotionRecord[];
  schemaVersion: 1;
}

export function createVideoBridgePromotionHoldReport(
  missingConfiguration: string[]
): VideoBridgePromotionReport {
  const reasons = ["REAL_EVIDENCE_RUN_NOT_CONFIGURED"];
  return {
    candidateModel: null,
    comparison: null,
    execution: { state: "not-configured" },
    fu07: { reasons, status: "hold" },
    fu09: { reasons, status: "hold" },
    generatedAt: new Date().toISOString(),
    kind: "video-bridge-fu07-fu09-promotion-eval",
    manifestId: null,
    missingConfiguration,
    observationsDigest: null,
    promotion: { fu07: { reasons, status: "hold" }, fu09: { reasons, status: "hold" } },
    records: [],
    schemaVersion: 1,
  };
}

function toAggregate(
  aggregate: VideoBridgePromotionAggregate | undefined,
  qualityMean?: number,
  meanModelCalls?: number
): {
  qualityMean?: number;
  meanModelCalls?: number;
  medians: VideoBridgePromotionAggregate["medians"];
  p95: VideoBridgePromotionAggregate["p95"];
} {
  return {
    medians: aggregate?.medians ?? {},
    p95: aggregate?.p95 ?? {},
    qualityMean,
    meanModelCalls,
  };
}

function meanMetricByRole(
  runFile: VideoBridgePromotionRunFile,
  role: "baseline" | "candidate",
  metric: VideoBridgePromotionMetricName
): number | undefined {
  const caseMeans: number[] = [];
  for (const currentCase of runFile.cases) {
    const values = currentCase.runs
      .filter((run) => run.role === role)
      .map((run) => run.metrics[metric]);
    if (
      values.length === 0 ||
      values.some((value) => typeof value !== "number" || !Number.isFinite(value))
    )
      return undefined;
    caseMeans.push(values.reduce<number>((sum, value) => sum + value!, 0) / values.length);
  }
  return caseMeans.length
    ? caseMeans.reduce((sum, value) => sum + value, 0) / caseMeans.length
    : undefined;
}

function aggregateByRole(
  runFile: VideoBridgePromotionRunFile,
  role: "baseline" | "candidate"
): VideoBridgePromotionAggregate | undefined {
  const observations = runFile.cases.flatMap((currentCase) =>
    currentCase.runs
      .filter((run) => run.role === role)
      .map((run) => ({ caseId: OVERALL_CASE_ID, metrics: run.metrics, model: run.model }))
  );
  const aggregates = aggregatePromotionObservations(observations);
  return aggregates.length === 1 ? aggregates[0] : undefined;
}

function resolveModel(
  runFile: VideoBridgePromotionRunFile,
  role: "baseline" | "candidate"
): string | null {
  for (const currentCase of runFile.cases) {
    const match = currentCase.runs.find((run) => run.role === role);
    if (match) return match.model;
  }
  return null;
}

function overallCriticalFactLoss(runFile: VideoBridgePromotionRunFile): boolean {
  return runFile.cases.some((currentCase) => currentCase.criticalFactLoss);
}

/**
 * #11656: "passes every security case". A manifest requires >=1 security case
 * (videoBridgePromotionManifestSchema); if the run file supplies no case flagged
 * `isSecurityCase`, that requirement was never exercised, so it fails closed.
 */
function overallSecurityCasesPassed(runFile: VideoBridgePromotionRunFile): boolean {
  const securityCases = runFile.cases.filter((currentCase) => currentCase.isSecurityCase);
  if (securityCases.length === 0) return false;
  return securityCases.every((currentCase) => currentCase.securityCasePassed);
}

/**
 * #11656: "missing usage remains HOLD". Read strictly: token usage is available only when
 * EVERY run in the file recorded `totalTokens` — a single incomplete measurement is enough
 * to withhold the verdict, not just a metric absent from every run.
 */
function tokenUsageAvailable(runFile: VideoBridgePromotionRunFile): boolean {
  return runFile.cases.every((currentCase) =>
    currentCase.runs.every((run) => typeof run.metrics.totalTokens === "number")
  );
}

function digestAllRuns(runFile: VideoBridgePromotionRunFile): PersistablePromotionRecord[] {
  return runFile.cases.flatMap((currentCase) =>
    currentCase.runs.map((run) => ({
      ...buildPersistablePromotionRecord({
        caseId: run.caseId,
        metrics: run.metrics,
        model: run.model,
        rawResponseText: run.rawResponseText,
      }),
      role: run.role,
      ...(run.observationId !== undefined ? { observationId: run.observationId } : {}),
      ...(run.repetition !== undefined ? { repetition: run.repetition } : {}),
      ...(run.preAnalysisMs !== undefined ? { preAnalysisMs: run.preAnalysisMs } : {}),
      ...(run.mediaDigest !== undefined ? { mediaDigest: run.mediaDigest } : {}),
      ...(run.promptDigest !== undefined ? { promptDigest: run.promptDigest } : {}),
      ...(run.configurationDigest !== undefined
        ? { configurationDigest: run.configurationDigest }
        : {}),
    }))
  );
}

/**
 * Composes aggregate -> compare -> evaluate -> digest for one baseline/candidate pair
 * spanning every case in `runFile`. Pure aside from `Date.now()` in `generatedAt` — the
 * verdicts themselves are deterministic. This is NOT proof of independent executions.
 */
export function buildVideoBridgePromotionReport(
  manifest: VideoBridgePromotionManifest,
  runFile: VideoBridgePromotionRunFile,
  previous?: PromotionRunReceipt
): VideoBridgePromotionReport {
  videoBridgePromotionManifestSchema.parse(manifest);
  videoBridgePromotionRunFileSchema.parse(runFile);

  const baselineAggregate = aggregateByRole(runFile, "baseline");
  const candidateAggregate = aggregateByRole(runFile, "candidate");
  const baseline = toAggregate(
    baselineAggregate,
    meanMetricByRole(runFile, "baseline", "factRetention"),
    meanMetricByRole(runFile, "baseline", "modelCalls")
  );
  const candidate = toAggregate(
    candidateAggregate,
    meanMetricByRole(runFile, "candidate", "factRetention"),
    meanMetricByRole(runFile, "candidate", "modelCalls")
  );
  const criticalFactLoss = overallCriticalFactLoss(runFile);
  const securityCasesPassed = overallSecurityCasesPassed(runFile);
  const usageAvailable = tokenUsageAvailable(runFile);

  const fu07 = evaluateFu07Promotion(
    buildFu07PromotionInputFromAggregates({
      baseline,
      candidate,
      criticalFactLoss,
      securityCasesPassed,
      tokenUsageAvailable: usageAvailable,
    })
  );
  const fu09 = evaluateFu09Promotion(
    buildFu09PromotionInputFromAggregates({
      baseline,
      candidate,
      criticalOrSecurityLoss: criticalFactLoss || !securityCasesPassed,
      tokenUsageAvailable: usageAvailable,
    })
  );

  const evidenceBlockers = validatePromotionEvidence(manifest, runFile);
  if (runFile.comparison) {
    const unmeasured = runFile.comparison === "fu07" ? fu09 : fu07;
    unmeasured.status = "hold";
    unmeasured.reasons = ["COMPARISON_NOT_MEASURED"];
  }
  if (evidenceBlockers.length > 0) {
    for (const verdict of [fu07, fu09]) {
      verdict.status = "hold";
      verdict.reasons = [...new Set([...verdict.reasons, ...evidenceBlockers])];
    }
  }

  const records = digestAllRuns(runFile);
  const report: VideoBridgePromotionReport = {
    candidateModel: resolveModel(runFile, "candidate"),
    comparison: runFile.comparison ?? null,
    execution: { state: "executed", ...(runFile.execution ? { receipt: runFile.execution } : {}) },
    fu07,
    fu09,
    generatedAt: new Date().toISOString(),
    kind: "video-bridge-fu07-fu09-promotion-eval",
    manifestId: manifest.id,
    missingConfiguration: [],
    observationsDigest: digestPromotionText(JSON.stringify(records)),
    promotion: {
      fu07: { status: "hold", reasons: ["SECOND_INDEPENDENT_RUN_REQUIRED"] },
      fu09: { status: "hold", reasons: ["SECOND_INDEPENDENT_RUN_REQUIRED"] },
    },
    records,
    schemaVersion: 1,
  };
  if (previous) report.promotion = confirmVideoBridgePromotionRuns([previous, report]);
  return report;
}

function readArgument(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  if (index < 0) return undefined;
  const value = process.argv[index + 1];
  return value && !value.startsWith("--") ? value : undefined;
}

function printUsage(): void {
  console.log(
    [
      "Usage:",
      "  node --import tsx/esm scripts/perf/video-bridge-promotion-eval.ts --manifest <manifest.json>",
      "  node --import tsx/esm scripts/perf/video-bridge-promotion-eval.ts --manifest <manifest.json> --observations <runs.json>",
      "  Add --previous-report <report.json> to confirm two independent eligible runs.",
      "",
      "Without --observations this always prints a HOLD report: collecting real",
      "observations requires a live model endpoint and fixtures materialized from",
      "src/lib/guardrails/videoBridgePromotionFixtures.ts on a real VPS run.",
      "",
      "--manifest must satisfy videoBridgePromotionManifestSchema (8 frozen case kinds,",
      ">=3 repetitions per case, >=1 security case).",
      "--observations must satisfy videoBridgePromotionRunFileSchema: per-case",
      "baseline/candidate runs with metrics, a criticalFactLoss flag, and (for the",
      "security case) a securityCasePassed flag.",
    ].join("\n")
  );
}

async function loadJson<T>(filePath: string, schema: z.ZodType<T>): Promise<T> {
  const raw = await readFile(path.resolve(filePath), "utf8");
  return schema.parse(JSON.parse(raw));
}

async function main(): Promise<void> {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    return;
  }
  const manifestPath = readArgument("manifest");
  const observationsPath = readArgument("observations");
  const previousPath = readArgument("previous-report");
  const missingConfiguration: string[] = [];
  if (!manifestPath) missingConfiguration.push("--manifest");
  if (!observationsPath) missingConfiguration.push("--observations");
  if (missingConfiguration.length > 0) {
    console.log(
      JSON.stringify(createVideoBridgePromotionHoldReport(missingConfiguration), null, 2)
    );
    return;
  }
  const manifest = await loadJson(manifestPath!, videoBridgePromotionManifestSchema);
  const runFile = await loadJson(observationsPath!, videoBridgePromotionRunFileSchema);
  const previous = previousPath
    ? await loadJson(previousPath, promotionRunReceiptSchema)
    : undefined;
  console.log(
    JSON.stringify(buildVideoBridgePromotionReport(manifest, runFile, previous), null, 2)
  );
}

const isMainModule =
  typeof process.argv[1] === "string" &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMainModule) {
  main().catch(() => {
    console.error("Video Bridge promotion eval failed validation or execution.");
    process.exitCode = 1;
  });
}
