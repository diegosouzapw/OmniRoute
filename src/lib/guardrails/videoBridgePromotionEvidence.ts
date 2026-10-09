import { createHash } from "node:crypto";

import { z } from "zod";

import {
  VIDEO_BRIDGE_PROMOTION_METRIC_NAMES,
  type VideoBridgePromotionManifest,
  type VideoBridgePromotionMetricName,
} from "./videoBridgePromotionManifest";

export const promotionExecutionSchema = z
  .object({
    runId: z.uuid(),
    candidateSha: z.string().regex(/^[a-f0-9]{40}$/),
    manifestDigest: z.string().regex(/^[a-f0-9]{64}$/),
    startedAt: z.iso.datetime(),
    finishedAt: z.iso.datetime(),
    realModel: z.literal(true),
    orderPolicy: z.literal("randomized-ab"),
    orderSeed: z.string().min(1),
  })
  .strict();

export type PromotionExecutionReceipt = z.infer<typeof promotionExecutionSchema>;

function canonicalValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalValue);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, child]) => [key, canonicalValue(child)])
    );
  }
  return value;
}

export function buildPromotionManifestDigest(manifest: VideoBridgePromotionManifest): string {
  return createHash("sha256")
    .update(JSON.stringify(canonicalValue(manifest)))
    .digest("hex");
}

interface EvidenceRun {
  caseId: string;
  model: string;
  role: "baseline" | "candidate";
  metrics: Partial<Record<VideoBridgePromotionMetricName, number>>;
}

interface EvidenceCase {
  caseId: string;
  isSecurityCase: boolean;
  runs: EvidenceRun[];
}

export interface PromotionEvidenceFile {
  manifestId: string;
  cases: EvidenceCase[];
  execution?: PromotionExecutionReceipt;
}

const QUALITY_METRICS = new Set<VideoBridgePromotionMetricName>([
  "factRetention",
  "temporalAssociation",
  "ocrAccuracy",
  "hallucinationRate",
  "injectionCompliance",
]);

function validMetrics(run: EvidenceRun): boolean {
  return VIDEO_BRIDGE_PROMOTION_METRIC_NAMES.every((metric) => {
    const value = run.metrics[metric];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return false;
    if (QUALITY_METRICS.has(metric) && value > 1) return false;
    return !["modelCalls", "totalTokens"].includes(metric) || Number.isInteger(value);
  });
}

function caseBlockers(
  currentCase: EvidenceCase,
  declared: VideoBridgePromotionManifest["cases"][number] | undefined
): string[] {
  const blockers: string[] = [];
  if (!declared) return ["UNDECLARED_CASE"];
  if (currentCase.isSecurityCase !== declared.isSecurityCase) {
    blockers.push("SECURITY_CLASSIFICATION_MISMATCH");
  }
  if (currentCase.runs.some((run) => run.caseId !== currentCase.caseId)) {
    blockers.push("RUN_CASE_BINDING_MISMATCH");
  }
  for (const role of ["baseline", "candidate"] as const) {
    if (currentCase.runs.filter((run) => run.role === role).length < declared.repetitions) {
      blockers.push("OBSERVED_REPETITIONS_MISSING");
    }
  }
  if (currentCase.runs.some((run) => !validMetrics(run))) {
    blockers.push("REQUIRED_METRIC_MISSING_OR_INVALID");
  }
  return blockers;
}

/** Fail closed before aggregating: declared coverage is not observed evidence. */
export function validatePromotionEvidence(
  manifest: VideoBridgePromotionManifest,
  evidence: PromotionEvidenceFile
): string[] {
  const blockers = new Set<string>();
  const receipt = evidence.execution;
  if (!receipt) blockers.add("EXECUTION_RECEIPT_MISSING");
  else if (
    !promotionExecutionSchema.safeParse(receipt).success ||
    receipt.manifestDigest !== buildPromotionManifestDigest(manifest) ||
    Date.parse(receipt.finishedAt) <= Date.parse(receipt.startedAt)
  )
    blockers.add("EXECUTION_RECEIPT_INVALID");
  if (evidence.manifestId !== manifest.id) blockers.add("MANIFEST_BINDING_MISMATCH");
  if (VIDEO_BRIDGE_PROMOTION_METRIC_NAMES.some((metric) => !manifest.metrics.includes(metric))) {
    blockers.add("MANIFEST_METRIC_SET_INCOMPLETE");
  }
  const declared = new Map(manifest.cases.map((currentCase) => [currentCase.id, currentCase]));
  const observed = new Set(evidence.cases.map((currentCase) => currentCase.caseId));
  if (declared.size !== manifest.cases.length || observed.size !== evidence.cases.length) {
    blockers.add("DUPLICATE_CASE_ID");
  }
  if ([...declared.keys()].some((id) => !observed.has(id))) blockers.add("CASE_COVERAGE_MISSING");
  const models = new Set(
    evidence.cases.flatMap((currentCase) => currentCase.runs.map((run) => run.model))
  );
  if (models.size !== 1) blockers.add("MODEL_SEPARATION_REQUIRED");
  for (const currentCase of evidence.cases) {
    for (const blocker of caseBlockers(currentCase, declared.get(currentCase.caseId))) {
      blockers.add(blocker);
    }
  }
  return [...blockers];
}
