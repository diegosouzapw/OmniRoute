#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import { z } from "zod";

import {
  buildVideoContactSheet,
  type ContactSheetFrame,
} from "../../src/lib/guardrails/videoBridgeContactSheet";

export type VideoContactSheetEvalConfigurationState = "configured-not-executed" | "not-configured";

export interface VideoContactSheetEvalHoldReportInput {
  caseCount: number;
  configurationState: VideoContactSheetEvalConfigurationState;
  missingConfiguration?: string[];
}

export interface VideoContactSheetEvalHoldReport {
  caseCount: number;
  execution: {
    realModel: false;
    state: VideoContactSheetEvalConfigurationState;
  };
  kind: "video-contact-sheet-ab-eval";
  missingConfiguration: string[];
  promotion: {
    reasons: ["REAL_MODEL_CONFIGURATION_MISSING" | "REAL_MODEL_EVAL_NOT_EXECUTED"];
    status: "HOLD";
  };
  results: [];
  schemaVersion: 1;
  summary: null;
}

export interface VideoContactSheetEvalThresholds {
  minLatencyReductionRatio: number;
  minQualityRetention: number;
  minQualityScore: number;
  minTokenReductionRatio: number;
}

export interface VideoContactSheetEvalAggregate {
  latencyMs: number;
  qualityScore: number;
  totalTokens: number | null;
}

export type VideoContactSheetPromotionReason =
  | "LATENCY_REDUCTION_BELOW_THRESHOLD"
  | "QUALITY_RETENTION_BELOW_THRESHOLD"
  | "QUALITY_SCORE_BELOW_THRESHOLD"
  | "TOKEN_REDUCTION_BELOW_THRESHOLD"
  | "TOKEN_USAGE_UNAVAILABLE";

export interface VideoContactSheetPromotionDecision {
  metrics: {
    latencyReductionRatio: number;
    qualityRetention: number;
    tokenReductionRatio: number | null;
  };
  reasons: VideoContactSheetPromotionReason[];
  status: "ELIGIBLE" | "HOLD";
}

const MAX_EVAL_FRAME_BASE64_CHARS = 5_592_408;

const evalThresholdsSchema = z
  .object({
    minLatencyReductionRatio: z.number().positive().max(1),
    minQualityRetention: z.number().min(0).max(1),
    minQualityScore: z.number().min(0).max(1),
    minTokenReductionRatio: z.number().positive().max(1),
  })
  .strict();

const evalManifestSchema = z
  .object({
    cases: z
      .array(
        z
          .object({
            expectedFacts: z
              .array(
                z
                  .object({
                    id: z.string().min(1),
                    requiredTerms: z.array(z.string().min(1)).min(1),
                    timestampSeconds: z.number().finite().nonnegative(),
                  })
                  .strict()
              )
              .min(1),
            frames: z
              .array(
                z
                  .object({
                    dataUri: z
                      .string()
                      .max("data:image/jpeg;base64,".length + MAX_EVAL_FRAME_BASE64_CHARS)
                      .regex(
                        /^data:image\/jpeg;base64,[A-Za-z0-9+/=]{4,5592408}$/i,
                        "expected a bounded JPEG data URI"
                      ),
                    timestampSeconds: z.number().finite().nonnegative(),
                  })
                  .strict()
              )
              .min(1)
              .max(16),
            id: z.string().min(1),
            prompt: z.string().min(1),
          })
          .strict()
      )
      .min(1),
    id: z.string().min(1),
    schemaVersion: z.literal(1),
    thresholds: evalThresholdsSchema,
  })
  .strict();

const chatCompletionSchema = z
  .object({
    choices: z
      .array(
        z
          .object({
            message: z.object({ content: z.string() }).passthrough(),
          })
          .passthrough()
      )
      .min(1),
    usage: z
      .object({
        completion_tokens: z.number().nonnegative().optional(),
        prompt_tokens: z.number().nonnegative().optional(),
        total_tokens: z.number().nonnegative().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export type VideoContactSheetEvalManifest = z.infer<typeof evalManifestSchema>;

export interface VideoContactSheetEvalConfig {
  apiKey: string;
  endpoint: string;
  model: string;
}

interface EvalFactScore {
  matchedFactIds: string[];
  qualityScore: number;
}

interface EvalPathResult extends EvalFactScore {
  latencyMs: number;
  modelCalls: number;
  responseDigest: string;
  totalTokens: number | null;
}

export interface VideoContactSheetEvalCaseResult {
  caseId: string;
  individual: EvalPathResult;
  sheet: EvalPathResult;
}

export interface VideoContactSheetEvalExecutedReport {
  caseCount: number;
  execution: {
    realModel: true;
    state: "executed";
  };
  generatedAt: string;
  kind: "video-contact-sheet-ab-eval";
  manifestDigest: string;
  manifestId: string;
  model: string;
  promotion: VideoContactSheetPromotionDecision;
  results: VideoContactSheetEvalCaseResult[];
  schemaVersion: 1;
  summary: {
    individual: VideoContactSheetEvalAggregate & { modelCalls: number };
    sheet: VideoContactSheetEvalAggregate & { modelCalls: number };
  };
  thresholds: VideoContactSheetEvalThresholds;
}

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export function createVideoContactSheetEvalHoldReport(
  input: VideoContactSheetEvalHoldReportInput
): VideoContactSheetEvalHoldReport {
  const reason =
    input.configurationState === "not-configured"
      ? "REAL_MODEL_CONFIGURATION_MISSING"
      : "REAL_MODEL_EVAL_NOT_EXECUTED";
  return {
    caseCount: input.caseCount,
    execution: {
      realModel: false,
      state: input.configurationState,
    },
    kind: "video-contact-sheet-ab-eval",
    missingConfiguration: [...(input.missingConfiguration ?? [])],
    promotion: {
      reasons: [reason],
      status: "HOLD",
    },
    results: [],
    schemaVersion: 1,
    summary: null,
  };
}

function reductionRatio(baseline: number, candidate: number): number {
  if (baseline <= 0) return 0;
  return (baseline - candidate) / baseline;
}

export function assessVideoContactSheetPromotion(input: {
  individual: VideoContactSheetEvalAggregate;
  sheet: VideoContactSheetEvalAggregate;
  thresholds: VideoContactSheetEvalThresholds;
}): VideoContactSheetPromotionDecision {
  const latencyReductionRatio = reductionRatio(input.individual.latencyMs, input.sheet.latencyMs);
  const qualityRetention =
    input.individual.qualityScore > 0
      ? input.sheet.qualityScore / input.individual.qualityScore
      : 0;
  const tokenReductionRatio =
    input.individual.totalTokens === null || input.sheet.totalTokens === null
      ? null
      : reductionRatio(input.individual.totalTokens, input.sheet.totalTokens);
  const reasons: VideoContactSheetPromotionReason[] = [];
  const requiredLatencyReduction = Math.max(
    Number.EPSILON,
    input.thresholds.minLatencyReductionRatio
  );
  const requiredTokenReduction = Math.max(Number.EPSILON, input.thresholds.minTokenReductionRatio);
  if (latencyReductionRatio < requiredLatencyReduction) {
    reasons.push("LATENCY_REDUCTION_BELOW_THRESHOLD");
  }
  if (input.sheet.qualityScore < input.thresholds.minQualityScore) {
    reasons.push("QUALITY_SCORE_BELOW_THRESHOLD");
  }
  if (qualityRetention < input.thresholds.minQualityRetention) {
    reasons.push("QUALITY_RETENTION_BELOW_THRESHOLD");
  }
  if (tokenReductionRatio === null) {
    reasons.push("TOKEN_USAGE_UNAVAILABLE");
  } else if (tokenReductionRatio < requiredTokenReduction) {
    reasons.push("TOKEN_REDUCTION_BELOW_THRESHOLD");
  }
  return {
    metrics: {
      latencyReductionRatio,
      qualityRetention,
      tokenReductionRatio,
    },
    reasons,
    status: reasons.length === 0 ? "ELIGIBLE" : "HOLD",
  };
}

function normalizeEvalText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function formatEvalTimestamp(timestampSeconds: number): string {
  const totalMilliseconds = Math.max(0, Math.round(timestampSeconds * 1000));
  const minutes = Math.floor(totalMilliseconds / 60_000);
  const seconds = Math.floor((totalMilliseconds % 60_000) / 1000);
  const milliseconds = totalMilliseconds % 1000;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
}

function scoreFacts(
  response: string,
  expectedFacts: VideoContactSheetEvalManifest["cases"][number]["expectedFacts"]
): EvalFactScore {
  const normalizedResponse = normalizeEvalText(response);
  const matchedFactIds = expectedFacts
    .filter((fact) => {
      const timestamp = normalizeEvalText(formatEvalTimestamp(fact.timestampSeconds));
      const timestampIndex = normalizedResponse.indexOf(timestamp);
      if (timestampIndex < 0) return false;
      const factWindow = normalizedResponse.slice(
        Math.max(0, timestampIndex - 160),
        Math.min(normalizedResponse.length, timestampIndex + timestamp.length + 160)
      );
      return fact.requiredTerms.every((term) => factWindow.includes(normalizeEvalText(term)));
    })
    .map((fact) => fact.id);
  return {
    matchedFactIds,
    qualityScore: matchedFactIds.length / expectedFacts.length,
  };
}

function digestResponse(response: string): string {
  return createHash("sha256").update(response).digest("hex");
}

function sumTokens(values: Array<number | null>): number | null {
  if (values.some((value) => value === null)) return null;
  return values.reduce<number>((sum, value) => sum + (value ?? 0), 0);
}

async function callVisionModel(input: {
  config: VideoContactSheetEvalConfig;
  dataUri: string;
  fetchImpl: FetchLike;
  prompt: string;
}): Promise<{ content: string; totalTokens: number | null }> {
  const response = await input.fetchImpl(input.config.endpoint, {
    body: JSON.stringify({
      messages: [
        {
          content: [
            { text: input.prompt, type: "text" },
            { image_url: { url: input.dataUri }, type: "image_url" },
          ],
          role: "user",
        },
      ],
      model: input.config.model,
      temperature: 0,
    }),
    headers: {
      authorization: `Bearer ${input.config.apiKey}`,
      "content-type": "application/json",
    },
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Video contact-sheet eval request failed with HTTP ${response.status}`);
  }
  const parsed = chatCompletionSchema.parse(await response.json());
  const usage = parsed.usage;
  const totalTokens =
    usage?.total_tokens ??
    (usage?.prompt_tokens !== undefined && usage.completion_tokens !== undefined
      ? usage.prompt_tokens + usage.completion_tokens
      : null);
  return {
    content: parsed.choices[0].message.content,
    totalTokens,
  };
}

async function evaluateIndividualFrames(input: {
  evalCase: VideoContactSheetEvalManifest["cases"][number];
  config: VideoContactSheetEvalConfig;
  fetchImpl: FetchLike;
}): Promise<EvalPathResult> {
  const startedAt = performance.now();
  const calls: Array<{ content: string; totalTokens: number | null }> = [];
  for (const frame of input.evalCase.frames) {
    calls.push(
      await callVisionModel({
        config: input.config,
        dataUri: frame.dataUri,
        fetchImpl: input.fetchImpl,
        prompt: `${input.evalCase.prompt}\nAnalyze only the frame at ${formatEvalTimestamp(frame.timestampSeconds)}. Associate every observation with that exact timestamp label.`,
      })
    );
  }
  const content = calls.map((call) => call.content).join("\n");
  return {
    ...scoreFacts(content, input.evalCase.expectedFacts),
    latencyMs: performance.now() - startedAt,
    modelCalls: calls.length,
    responseDigest: digestResponse(content),
    totalTokens: sumTokens(calls.map((call) => call.totalTokens)),
  };
}

async function evaluateContactSheet(input: {
  evalCase: VideoContactSheetEvalManifest["cases"][number];
  config: VideoContactSheetEvalConfig;
  fetchImpl: FetchLike;
}): Promise<EvalPathResult> {
  const startedAt = performance.now();
  const sheet = await buildVideoContactSheet(input.evalCase.frames as ContactSheetFrame[], {
    columns: 4,
    timeoutMs: 30_000,
  });
  if (!sheet.used || !sheet.dataUri) {
    throw new Error("Video contact-sheet eval could not compose the bounded JPEG grid");
  }
  const call = await callVisionModel({
    config: input.config,
    dataUri: sheet.dataUri,
    fetchImpl: input.fetchImpl,
    prompt: `${input.evalCase.prompt}\nAnalyze every cell in the contact sheet. Timestamp labels are burned into each cell. Associate every observation with its visible timestamp.`,
  });
  return {
    ...scoreFacts(call.content, input.evalCase.expectedFacts),
    latencyMs: performance.now() - startedAt,
    modelCalls: 1,
    responseDigest: digestResponse(call.content),
    totalTokens: call.totalTokens,
  };
}

function aggregatePathResults(
  results: VideoContactSheetEvalCaseResult[],
  path: "individual" | "sheet"
): VideoContactSheetEvalAggregate & { modelCalls: number } {
  const pathResults = results.map((result) => result[path]);
  return {
    latencyMs: pathResults.reduce((sum, result) => sum + result.latencyMs, 0),
    modelCalls: pathResults.reduce((sum, result) => sum + result.modelCalls, 0),
    qualityScore:
      pathResults.reduce((sum, result) => sum + result.qualityScore, 0) / pathResults.length,
    totalTokens: sumTokens(pathResults.map((result) => result.totalTokens)),
  };
}

export async function runVideoContactSheetEval(input: {
  config: VideoContactSheetEvalConfig;
  fetchImpl?: FetchLike;
  manifest: VideoContactSheetEvalManifest;
}): Promise<VideoContactSheetEvalExecutedReport> {
  const manifest = evalManifestSchema.parse(input.manifest);
  const endpoint = z.string().url().parse(input.config.endpoint);
  const config = {
    apiKey: z.string().min(1).parse(input.config.apiKey),
    endpoint,
    model: z.string().min(1).parse(input.config.model),
  };
  const fetchImpl = input.fetchImpl ?? fetch;
  const results: VideoContactSheetEvalCaseResult[] = [];
  for (const evalCase of manifest.cases) {
    const individual = await evaluateIndividualFrames({ config, evalCase, fetchImpl });
    const sheet = await evaluateContactSheet({ config, evalCase, fetchImpl });
    results.push({ caseId: evalCase.id, individual, sheet });
  }
  const individual = aggregatePathResults(results, "individual");
  const sheet = aggregatePathResults(results, "sheet");
  const promotion = assessVideoContactSheetPromotion({
    individual,
    sheet,
    thresholds: manifest.thresholds,
  });
  return {
    caseCount: manifest.cases.length,
    execution: { realModel: true, state: "executed" },
    generatedAt: new Date().toISOString(),
    kind: "video-contact-sheet-ab-eval",
    manifestDigest: createHash("sha256").update(JSON.stringify(manifest)).digest("hex"),
    manifestId: manifest.id,
    model: config.model,
    promotion,
    results,
    schemaVersion: 1,
    summary: { individual, sheet },
    thresholds: manifest.thresholds,
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
      "  node --import tsx/esm scripts/perf/video-bridge-contact-sheet-eval.ts --manifest <manifest.json> --model <vision-model>",
      "  node --import tsx/esm scripts/perf/video-bridge-contact-sheet-eval.ts --manifest <manifest.json> --model <vision-model> --execute-real",
      "",
      "The default command validates configuration and emits HOLD without calling a model.",
      "A real paid/networked run requires --execute-real, --model, and the documented variables:",
      "  OMNIROUTE_BASE_URL",
      "  OMNIROUTE_API_KEY",
      "",
      "Manifest v1: id, thresholds, and 1+ cases. Each case has 1-16 bounded JPEG data URIs,",
      "timestamps, a prompt, and expectedFacts with timestampSeconds + requiredTerms.",
    ].join("\n")
  );
}

async function loadManifest(manifestPath: string): Promise<VideoContactSheetEvalManifest> {
  const raw = await readFile(path.resolve(manifestPath), "utf8");
  return evalManifestSchema.parse(JSON.parse(raw));
}

function resolveChatCompletionsEndpoint(baseUrl: string): string {
  const normalized = baseUrl.replace(/\/{1,8}$/u, "");
  if (normalized.endsWith("/v1/chat/completions")) return normalized;
  if (normalized.endsWith("/v1")) return `${normalized}/chat/completions`;
  return `${normalized}/v1/chat/completions`;
}

async function main(): Promise<void> {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    return;
  }
  const manifestPath = readArgument("manifest");
  const model = readArgument("model");
  const missingConfiguration: string[] = [];
  if (!manifestPath) missingConfiguration.push("--manifest");
  if (!model) missingConfiguration.push("--model");
  const baseUrl = process.env.OMNIROUTE_BASE_URL;
  const apiKey = process.env.OMNIROUTE_API_KEY;
  if (!baseUrl) missingConfiguration.push("OMNIROUTE_BASE_URL");
  if (!apiKey) missingConfiguration.push("OMNIROUTE_API_KEY");

  let manifest: VideoContactSheetEvalManifest | null = null;
  if (manifestPath) manifest = await loadManifest(manifestPath);
  if (missingConfiguration.length > 0) {
    console.log(
      JSON.stringify(
        createVideoContactSheetEvalHoldReport({
          caseCount: manifest?.cases.length ?? 0,
          configurationState: "not-configured",
          missingConfiguration,
        }),
        null,
        2
      )
    );
    return;
  }
  if (!process.argv.includes("--execute-real")) {
    console.log(
      JSON.stringify(
        createVideoContactSheetEvalHoldReport({
          caseCount: manifest?.cases.length ?? 0,
          configurationState: "configured-not-executed",
        }),
        null,
        2
      )
    );
    return;
  }
  if (!manifest || !baseUrl || !apiKey || !model) {
    throw new Error("Video contact-sheet eval configuration was not resolved");
  }
  console.log(
    JSON.stringify(
      await runVideoContactSheetEval({
        config: { apiKey, endpoint: resolveChatCompletionsEndpoint(baseUrl), model },
        manifest,
      }),
      null,
      2
    )
  );
}

const isMainModule =
  typeof process.argv[1] === "string" &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMainModule) {
  main().catch(() => {
    console.error("Video contact-sheet eval failed validation or execution.");
    process.exitCode = 1;
  });
}
