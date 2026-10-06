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
  type PersistablePromotionRecord,
} from "../../src/lib/guardrails/videoBridgePromotionDigest";
import {
  evaluateFu07Promotion,
  evaluateFu09Promotion,
  type PromotionVerdict,
} from "../../src/lib/guardrails/videoBridgePromotionEvaluator";
import {
  videoBridgePromotionManifestSchema,
  videoBridgePromotionMetricNameSchema,
  type VideoBridgePromotionManifest,
} from "../../src/lib/guardrails/videoBridgePromotionManifest";

const OVERALL_CASE_ID = "__overall__";

const videoBridgePromotionRunSchema = z
  .object({
    caseId: z.string().min(1),
    metrics: z.partialRecord(videoBridgePromotionMetricNameSchema, z.number().finite()),
    model: z.string().min(1),
    rawResponseText: z.string(),
    role: z.enum(["baseline", "candidate"]),
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
    cases: z.array(videoBridgePromotionCaseObservationsSchema).min(1),
    manifestId: z.string().min(1),
  })
  .strict();

export type VideoBridgePromotionRunFile = z.infer<typeof videoBridgePromotionRunFileSchema>;

export interface VideoBridgePromotionReport {
  candidateModel: string | null;
  execution: { state: "executed" | "not-configured" };
  fu07: PromotionVerdict;
  fu09: PromotionVerdict;
  generatedAt: string;
  kind: "video-bridge-fu07-fu09-promotion-eval";
  manifestId: string | null;
  missingConfiguration: string[];
  records: PersistablePromotionRecord[];
  schemaVersion: 1;
}

export function createVideoBridgePromotionHoldReport(
  missingConfiguration: string[]
): VideoBridgePromotionReport {
  const reasons = ["REAL_EVIDENCE_RUN_NOT_CONFIGURED"];
  return {
    candidateModel: null,
    execution: { state: "not-configured" },
    fu07: { reasons, status: "hold" },
    fu09: { reasons, status: "hold" },
    generatedAt: new Date().toISOString(),
    kind: "video-bridge-fu07-fu09-promotion-eval",
    manifestId: null,
    missingConfiguration,
    records: [],
    schemaVersion: 1,
  };
}

function toAggregate(aggregate: VideoBridgePromotionAggregate | undefined): {
  medians: VideoBridgePromotionAggregate["medians"];
  p95: VideoBridgePromotionAggregate["p95"];
} {
  return { medians: aggregate?.medians ?? {}, p95: aggregate?.p95 ?? {} };
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
  return aggregatePromotionObservations(observations)[0];
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
    currentCase.runs.map((run) =>
      buildPersistablePromotionRecord({
        caseId: run.caseId,
        metrics: run.metrics,
        model: run.model,
        rawResponseText: run.rawResponseText,
      })
    )
  );
}

/**
 * Composes aggregate -> compare -> evaluate -> digest for one baseline/candidate pair
 * spanning every case in `runFile`. Pure aside from `Date.now()` in `generatedAt` — the
 * verdicts themselves are deterministic given identical `manifest`/`runFile` input, which
 * is what #11656's "two consecutive runs produce the same eligible verdict" depends on.
 */
export function buildVideoBridgePromotionReport(
  manifest: VideoBridgePromotionManifest,
  runFile: VideoBridgePromotionRunFile
): VideoBridgePromotionReport {
  videoBridgePromotionManifestSchema.parse(manifest);
  videoBridgePromotionRunFileSchema.parse(runFile);

  const baselineAggregate = aggregateByRole(runFile, "baseline");
  const candidateAggregate = aggregateByRole(runFile, "candidate");
  const baseline = toAggregate(baselineAggregate);
  const candidate = toAggregate(candidateAggregate);
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

  return {
    candidateModel: resolveModel(runFile, "candidate"),
    execution: { state: "executed" },
    fu07,
    fu09,
    generatedAt: new Date().toISOString(),
    kind: "video-bridge-fu07-fu09-promotion-eval",
    manifestId: manifest.id,
    missingConfiguration: [],
    records: digestAllRuns(runFile),
    schemaVersion: 1,
  };
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
  const missingConfiguration: string[] = [];
  if (!manifestPath) missingConfiguration.push("--manifest");
  if (!observationsPath) missingConfiguration.push("--observations");
  if (missingConfiguration.length > 0) {
    console.log(JSON.stringify(createVideoBridgePromotionHoldReport(missingConfiguration), null, 2));
    return;
  }
  const manifest = await loadJson(manifestPath!, videoBridgePromotionManifestSchema);
  const runFile = await loadJson(observationsPath!, videoBridgePromotionRunFileSchema);
  console.log(JSON.stringify(buildVideoBridgePromotionReport(manifest, runFile), null, 2));
}

const isMainModule =
  typeof process.argv[1] === "string" &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMainModule) {
  main().catch((error: unknown) => {
    console.error("Video Bridge promotion eval failed validation or execution.", error);
    process.exitCode = 1;
  });
}
