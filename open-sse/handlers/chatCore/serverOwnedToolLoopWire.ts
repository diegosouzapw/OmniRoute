import type {
  ExecutionContext,
  NonStreamingProviderLegResult,
  ProviderLegUsage,
  ServerOwnedToolLoopResult,
  ToolCall,
} from "@/lib/skills/toolLoopTypes.ts";
import { executeServerOwned } from "@/lib/skills/interception";
import { runServerOwnedToolLoop, LOOP_BUDGET_MS } from "@/lib/skills/serverOwnedToolLoop.ts";
import { deriveToolRequestIdentity } from "@/lib/skills/stableJson.ts";
import { getIdempotencyKey } from "@/lib/idempotencyLayer";
import { runNonStreamingProviderLeg } from "./nonStreamingProviderLeg.ts";
import type { ProviderLegInput } from "./nonStreamingProviderLeg.ts";
import { shouldRunServerOwnedToolLoop } from "./serverOwnedToolLoopGate.ts";
import { FORMATS } from "../../translator/formats.ts";

export function derivePostInjectionRequestIdentity(input: {
  apiKeyId: string;
  headers: unknown;
  skillRequestId: string;
  postInjectionBody: Record<string, unknown>;
}): string {
  const stableClientRequestId = getIdempotencyKey(input.headers as never);
  return deriveToolRequestIdentity({
    apiKeyId: input.apiKeyId,
    stableClientRequestId,
    skillRequestId: input.skillRequestId,
    postInjectionBody: input.postInjectionBody,
  });
}

export async function continueServerOwnedToolLoop(input: {
  initialLeg: NonStreamingProviderLegResult & { kind: "ok" };
  sourceBody: Record<string, unknown>;
  sourceFormat: "openai" | "claude";
  skillsModelId: string;
  executionContext: ExecutionContext;
  abortSignal?: AbortSignal;
  deadlineAtMs: number;
  expectedConnectionId?: string;
  followUpLeg: (nextSourceBody: Record<string, unknown>) => Promise<NonStreamingProviderLegResult>;
  executeServerOwned?: (
    calls: ToolCall[],
    context: ExecutionContext
  ) => Promise<import("@/lib/skills/toolLoopTypes.ts").ExecutedToolResult[]>;
}): Promise<ServerOwnedToolLoopResult> {
  const runOwned = input.executeServerOwned ?? executeServerOwned;
  return runServerOwnedToolLoop({
    initialLeg: input.initialLeg,
    sourceBody: input.sourceBody,
    sourceFormat: input.sourceFormat,
    skillsModelId: input.skillsModelId,
    executionContext: input.executionContext,
    abortSignal: input.abortSignal,
    deadlineAtMs: input.deadlineAtMs,
    executeServerOwned: (calls: ToolCall[], context: ExecutionContext) => runOwned(calls, context),
    resumeUpstream: async (nextSourceBody, expectedConnectionId) => {
      if (
        expectedConnectionId &&
        input.expectedConnectionId &&
        expectedConnectionId !== input.expectedConnectionId
      ) {
        return {
          kind: "error",
          result: {
            success: false,
            status: 409,
            response: new Response(null, { status: 409 }),
            error: "Follow-up connection mismatch",
            errorCode: "LEASE_CONNECTION_MISMATCH",
          },
          receipt: input.initialLeg.receipt,
          usage: null,
        };
      }
      return input.followUpLeg(nextSourceBody);
    },
  });
}

export function followUpLegInput(
  base: Omit<
    ProviderLegInput,
    "phase" | "allowAccountRotation" | "allowModelFallback" | "sourceBody"
  >,
  nextSourceBody: Record<string, unknown>,
  expectedConnectionId?: string
): ProviderLegInput {
  return {
    ...base,
    phase: "follow-up",
    sourceBody: nextSourceBody,
    expectedConnectionId,
    allowAccountRotation: false,
    allowModelFallback: false,
  };
}

export function mergeLoopIntoOkLeg(
  leg: NonStreamingProviderLegResult & { kind: "ok" },
  loop: ServerOwnedToolLoopResult
): NonStreamingProviderLegResult & { kind: "ok" } {
  return {
    ...leg,
    response: loop.response ?? leg.response,
    responseForMemoryExtraction:
      loop.responseForMemoryExtraction ?? leg.responseForMemoryExtraction,
    providerBody: loop.finalProviderBody ?? leg.providerBody,
    providerRequest: loop.finalProviderRequest ?? leg.providerRequest,
    usage: loop.cumulativeUsage,
  };
}

export type ToolLoopApplyResult =
  | { kind: "skip" }
  | {
      kind: "ok";
      leg: NonStreamingProviderLegResult & { kind: "ok" };
      usage: ProviderLegUsage | null;
      loop: ServerOwnedToolLoopResult;
    }
  | { kind: "error"; loop: ServerOwnedToolLoopResult };

export async function applyServerOwnedToolLoopIfNeeded(input: {
  enabled: boolean;
  stream: boolean;
  isResponsesEndpoint: boolean;
  sourceFormat: string;
  initialLeg: NonStreamingProviderLegResult;
  sourceBody: Record<string, unknown>;
  skillsModelId: string;
  executionContext: ExecutionContext;
  abortSignal?: AbortSignal;
  expectedConnectionId?: string;
  followUpLeg: (nextSourceBody: Record<string, unknown>) => Promise<NonStreamingProviderLegResult>;
  logReceipt: (receipt: ServerOwnedToolLoopResult["receipts"][number]) => void;
  executeServerOwned?: (
    calls: ToolCall[],
    context: ExecutionContext
  ) => Promise<import("@/lib/skills/toolLoopTypes.ts").ExecutedToolResult[]>;
}): Promise<ToolLoopApplyResult> {
  if (
    input.initialLeg.kind !== "ok" ||
    !shouldRunServerOwnedToolLoop({
      enabled: input.enabled,
      stream: input.stream,
      isResponsesEndpoint: input.isResponsesEndpoint,
      sourceFormat: input.sourceFormat,
    })
  ) {
    return { kind: "skip" };
  }
  const loop = await continueServerOwnedToolLoop({
    initialLeg: input.initialLeg,
    sourceBody: input.sourceBody,
    sourceFormat: input.sourceFormat === FORMATS.CLAUDE ? "claude" : "openai",
    skillsModelId: input.skillsModelId,
    executionContext: input.executionContext,
    abortSignal: input.abortSignal,
    deadlineAtMs: Date.now() + LOOP_BUDGET_MS,
    expectedConnectionId: input.expectedConnectionId,
    followUpLeg: input.followUpLeg,
    executeServerOwned: input.executeServerOwned,
  });
  for (const receipt of loop.receipts) input.logReceipt(receipt);
  if (loop.kind === "error") return { kind: "error", loop };
  return {
    kind: "ok",
    leg: mergeLoopIntoOkLeg(input.initialLeg, loop),
    usage: loop.cumulativeUsage,
    loop,
  };
}

export { LOOP_BUDGET_MS, runNonStreamingProviderLeg };
