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

/** Seeded random A/B order: freeze the seed before collection and verify the observed sequence. */
export function getPromotionPairRoles(
  seed: string,
  caseId: string,
  repetition: number
): readonly ["baseline" | "candidate", "baseline" | "candidate"] {
  const byte = createHash("sha256")
    .update(JSON.stringify([seed, caseId, repetition]))
    .digest()[0];
  return byte % 2 === 0 ? ["baseline", "candidate"] : ["candidate", "baseline"];
}

interface EvidenceRun {
  caseId: string;
  model: string;
  role: "baseline" | "candidate";
  metrics: Partial<Record<VideoBridgePromotionMetricName, number>>;
  observationId?: string;
  repetition?: number;
  preAnalysisMs?: number;
  mediaDigest?: string;
  promptDigest?: string;
  configurationDigest?: string;
}

interface EvidenceCase {
  caseId: string;
  isSecurityCase: boolean;
  runs: EvidenceRun[];
}

export interface PromotionEvidenceFile {
  comparison?: "fu07" | "fu09";
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
  declared: VideoBridgePromotionManifest["cases"][number] | undefined,
  configurationDigest: string | undefined
): string[] {
  const blockers: string[] = [];
  if (!declared) return ["UNDECLARED_CASE"];
  if (
    currentCase.runs.some(
      (run) =>
        run.mediaDigest !== declared.mediaDigest ||
        run.promptDigest !== declared.promptDigest ||
        run.configurationDigest !== configurationDigest
    )
  ) {
    blockers.push("RUN_INPUT_BINDING_MISMATCH");
  }
  if (currentCase.isSecurityCase !== declared.isSecurityCase) {
    blockers.push("SECURITY_CLASSIFICATION_MISMATCH");
  }
  if (currentCase.runs.some((run) => run.caseId !== currentCase.caseId)) {
    blockers.push("RUN_CASE_BINDING_MISMATCH");
  }
  for (const role of ["baseline", "candidate"] as const) {
    const roleRuns = currentCase.runs.filter((run) => run.role === role);
    if (roleRuns.length < declared.repetitions) {
      blockers.push("OBSERVED_REPETITIONS_MISSING");
    }
    const repetitions = new Set(roleRuns.map((run) => run.repetition));
    if (
      roleRuns.length !== declared.repetitions ||
      repetitions.size !== declared.repetitions ||
      roleRuns.some(
        (run) =>
          !Number.isInteger(run.repetition) ||
          run.repetition! < 0 ||
          run.repetition! >= declared.repetitions
      )
    ) {
      blockers.push("REPETITION_BINDING_INVALID");
    }
  }
  if (currentCase.runs.some((run) => !validMetrics(run))) {
    blockers.push("REQUIRED_METRIC_MISSING_OR_INVALID");
  }
  return blockers;
}

function validCaseOrder(currentCase: EvidenceCase, repetitions: number, seed: string): boolean {
  if (currentCase.runs.length !== repetitions * 2) return false;
  for (let repetition = 0; repetition < repetitions; repetition += 1) {
    const roles = getPromotionPairRoles(seed, currentCase.caseId, repetition);
    for (const [offset, role] of roles.entries()) {
      const run = currentCase.runs[repetition * 2 + offset];
      if (run?.role !== role || run.repetition !== repetition) return false;
    }
  }
  return true;
}

/** Fail closed before aggregating: declared coverage is not observed evidence. */
export function validatePromotionEvidence(
  manifest: VideoBridgePromotionManifest,
  evidence: PromotionEvidenceFile
): string[] {
  const blockers = new Set<string>();
  if (
    !manifest.configurationDigest ||
    manifest.cases.some((currentCase) => !currentCase.promptDigest)
  ) {
    blockers.add("INPUT_DIGEST_BINDING_MISSING");
  }
  if (!manifest.resourceCaps) blockers.add("RESOURCE_CAPS_MISSING");
  if (evidence.comparison !== "fu07" && evidence.comparison !== "fu09") {
    blockers.add("COMPARISON_NOT_DECLARED");
  }
  const receipt = evidence.execution;
  if (!receipt) blockers.add("EXECUTION_RECEIPT_MISSING");
  else if (
    !promotionExecutionSchema.safeParse(receipt).success ||
    receipt.manifestDigest !== buildPromotionManifestDigest(manifest) ||
    Date.parse(receipt.finishedAt) <= Date.parse(receipt.startedAt)
  )
    blockers.add("EXECUTION_RECEIPT_INVALID");
  if (evidence.manifestId !== manifest.id) blockers.add("MANIFEST_BINDING_MISMATCH");
  if (!manifest.cases.some((currentCase) => currentCase.kind === "real_sanitized")) {
    blockers.add("REAL_SANITIZED_CASE_MISSING");
  }
  if (
    manifest.cases.some(
      (currentCase) => !currentCase.mediaDigest || !currentCase.expectedFactsDigest
    )
  ) {
    blockers.add("FIXTURE_DIGEST_BINDING_MISSING");
  }
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
  const runs = evidence.cases.flatMap((currentCase) => currentCase.runs);
  if (
    runs.some(
      (run) =>
        typeof run.preAnalysisMs !== "number" ||
        !Number.isFinite(run.preAnalysisMs) ||
        run.preAnalysisMs < 0
    )
  ) {
    blockers.add("PRE_ANALYSIS_METRIC_MISSING_OR_INVALID");
  }
  const caps = manifest.resourceCaps;
  if (
    caps &&
    runs.some(
      (run) =>
        (run.metrics.cpuMs ?? Infinity) > caps.maxCpuMs ||
        (run.metrics.rssKiB ?? Infinity) > caps.maxRssKiB ||
        (run.preAnalysisMs ?? Infinity) > caps.maxPreAnalysisMs
    )
  ) {
    blockers.add("RESOURCE_CAP_EXCEEDED");
  }
  const observationIds = new Set(runs.map((run) => run.observationId));
  if (
    observationIds.size !== runs.length ||
    runs.some((run) => !z.uuid().safeParse(run.observationId).success)
  ) {
    blockers.add("OBSERVATION_IDENTITY_INVALID");
  }
  for (const currentCase of evidence.cases) {
    const declaredCase = declared.get(currentCase.caseId);
    for (const blocker of caseBlockers(currentCase, declaredCase, manifest.configurationDigest)) {
      blockers.add(blocker);
    }
    if (
      declaredCase &&
      receipt &&
      !validCaseOrder(currentCase, declaredCase.repetitions, receipt.orderSeed)
    ) {
      blockers.add("AB_ORDER_MISMATCH");
    }
  }
  return [...blockers];
}
