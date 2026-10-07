/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
import { estimateTokens } from "../../lib/token-estimate";
import {
  CHATGPT_WEB_BACKEND_MODEL,
  resolveChatGptWebContextLimits,
} from "../../chatgpt-web-models";
import type { CodexParsedRequest, CodexUsage } from "../../types";
import { estimateCompiledChatGptWebInputTokens } from "./input-tokens";
import {
  CHATGPT_BIGGER_CONTEXT_PARTS,
  compileChatGptWebPrompt,
  type ChatGptWebMultipartPartCount,
} from "./prompt";
import { extractChatGptTurnIdentity } from "./environment";
import {
  CHATGPT_WEB_LUNA_MODEL_ID,
  resolveChatGptWebModelMode,
  type ChatGptWebCapabilities,
} from "./model";
import type { BrokerToolRequest } from "./turn-broker";

// The real capability has the same length. Keeping it out of usage accounting would make
// estimates differ slightly between the prepared browser prompt and later Codex tool rounds.
const ESTIMATE_TURN_TOKEN = "turn_00000000000000000000000000000000";

export interface ChatGptWebRoundEvidence {
  answer?: string;
  reasoning?: string[];
  toolRequests?: BrokerToolRequest[];
}

function conservativeTextTokens(text: string, modelId: string): number {
  return estimateTokens(text, modelId);
}

export function estimateChatGptWebInputTokens(
  parsed: CodexParsedRequest,
  capabilities: ChatGptWebCapabilities
): number {
  const mode = resolveChatGptWebModelMode(parsed.modelId, parsed.options.reasoning, capabilities);
  const identity = extractChatGptTurnIdentity(parsed);
  const compiled = compileChatGptWebPrompt(
    parsed,
    capabilities,
    mode.localTools ? ESTIMATE_TURN_TOKEN : undefined,
    {
      captureLunaCheckpoint:
        parsed.modelId === CHATGPT_WEB_LUNA_MODEL_ID &&
        !parsed._compactionRequest &&
        Boolean(identity.threadId && identity.turnId),
    }
  );
  return estimateCompiledChatGptWebInputTokens(compiled, parsed.modelId);
}

/**
 * Use the existing model/account compaction threshold as the size of one context part. Normal
 * turns stay on the original one-message transport until they actually need the experiment;
 * compaction itself always receives all three parts so it can summarize the expanded window.
 */
export function resolveBiggerContextMultipartParts(
  parsed: CodexParsedRequest,
  capabilities: ChatGptWebCapabilities
): ChatGptWebMultipartPartCount | undefined {
  if (parsed.modelId === CHATGPT_WEB_LUNA_MODEL_ID) {
    throw new Error(
      "Bigger Context is unavailable for Luna because its accumulated browser transcript still shares one 28,000-token transport budget"
    );
  }
  const mode = resolveChatGptWebModelMode(parsed.modelId, parsed.options.reasoning, capabilities);

  const onePartLimit = resolveChatGptWebContextLimits(
    CHATGPT_WEB_BACKEND_MODEL,
    mode.effort,
    capabilities
  ).autoCompactTokenLimit;
  const inputTokens = estimateChatGptWebInputTokens(parsed, capabilities);
  return biggerContextPartCount(inputTokens, onePartLimit, parsed._compactionRequest === true);
}

export function biggerContextPartCount(
  inputTokens: number,
  onePartLimit: number,
  compaction: boolean
): ChatGptWebMultipartPartCount | undefined {
  if (compaction) return CHATGPT_BIGGER_CONTEXT_PARTS;
  if (inputTokens < onePartLimit) return undefined;
  if (inputTokens < onePartLimit * 2) return 2;
  return CHATGPT_BIGGER_CONTEXT_PARTS;
}

function roundEvidenceText(evidence: ChatGptWebRoundEvidence): string {
  return JSON.stringify({
    reasoning: evidence.reasoning ?? [],
    ...(evidence.answer !== undefined ? { answer: evidence.answer } : {}),
    ...(evidence.toolRequests
      ? {
          tool_calls: evidence.toolRequests.map((request) => ({
            call_id: request.callId,
            name: request.wireName,
            ...(request.freeform
              ? { input: request.input ?? "" }
              : { arguments: request.arguments ?? {} }),
          })),
        }
      : {}),
  });
}

export function estimateChatGptWebUsage(
  parsed: CodexParsedRequest,
  evidence: ChatGptWebRoundEvidence,
  capabilities: ChatGptWebCapabilities
): CodexUsage {
  const inputTokens = estimateChatGptWebInputTokens(parsed, capabilities);
  const outputTokens = conservativeTextTokens(roundEvidenceText(evidence), parsed.modelId);
  return {
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    estimated: true,
  };
}
