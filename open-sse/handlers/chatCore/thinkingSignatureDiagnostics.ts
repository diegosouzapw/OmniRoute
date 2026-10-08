import { isAnthropicThinkingSignatureError } from "./passthroughHelpers.ts";

/**
 * #15534 — privacy-safe structural diagnostics for Anthropic invalid-thinking-signature
 * 400s. Production post-mortems were impossible because retained logs/artifacts carry no
 * payload shape: this projector emits ONLY typed structural scalars (counts, booleans,
 * bounded enums). It never emits signature values, thinking text, encrypted content,
 * headers, credentials or raw error bodies — enforced by tests with sentinels.
 *
 * Emission is strictly gated: `shouldEmitThinkingSignatureDiagnostics` fires only on the
 * Anthropic-bound invalid-signature 400 already detected by the one-shot recovery path;
 * normal requests log nothing.
 */

const MAX_TRACKED_TURNS = 64;
const MAX_TRACKED_BLOCKS_PER_TURN = 64;

type TurnThinkingFacts = {
  signed: number;
  unsigned: number;
  emptyTextSigned: number;
  redacted: number;
};

export type ThinkingSignatureStructure = {
  assistantTurns: number;
  signedThinking: number;
  unsignedThinking: number;
  emptyTextSignedThinking: number;
  redactedThinking: number;
  toolResultTurns: number;
};

/** Project structural facts from a Claude-shaped request body. Allowlist-only. */
export function projectThinkingSignatureStructure(body: unknown): ThinkingSignatureStructure {
  const result: ThinkingSignatureStructure = {
    assistantTurns: 0,
    signedThinking: 0,
    unsignedThinking: 0,
    emptyTextSignedThinking: 0,
    redactedThinking: 0,
    toolResultTurns: 0,
  };
  const messages = extractMessages(body);
  for (let index = 0; index < messages.length && index < MAX_TRACKED_TURNS; index++) {
    const message = messages[index];
    if (!message || typeof message !== "object") continue;
    const role = (message as { role?: unknown }).role;
    const content = (message as { content?: unknown }).content;
    if (role === "assistant") {
      result.assistantTurns += 1;
      const facts = countTurnThinking(content);
      result.signedThinking += facts.signed;
      result.unsignedThinking += facts.unsigned;
      result.emptyTextSignedThinking += facts.emptyTextSigned;
      result.redactedThinking += facts.redacted;
    } else if (role === "user") {
      const blocks = Array.isArray(content) ? content : [];
      if (
        blocks
          .slice(0, MAX_TRACKED_BLOCKS_PER_TURN)
          .some((b) => (b as { type?: unknown } | null)?.type === "tool_result")
      ) {
        result.toolResultTurns += 1;
      }
    }
  }
  return result;
}

/** Signatures collected in-memory for same-request comparison; never serialized. */
function collectSignatures(body: unknown): string[] {
  const signatures: string[] = [];
  const messages = extractMessages(body);
  for (let index = 0; index < messages.length && index < MAX_TRACKED_TURNS; index++) {
    const content = (messages[index] as { content?: unknown } | null)?.content;
    if (!Array.isArray(content)) continue;
    for (const block of content.slice(0, MAX_TRACKED_BLOCKS_PER_TURN)) {
      const candidate = block as { type?: unknown; signature?: unknown } | null;
      if (candidate?.type === "thinking" && typeof candidate.signature === "string") {
        signatures.push(candidate.signature);
      }
    }
  }
  return signatures;
}

export type SignatureDelta = { unchanged: number; removed: number; added: number };

/** Compare signature multisets across one request's boundaries. Emits counts only. */
export function compareThinkingSignatures(before: unknown, after: unknown): SignatureDelta {
  const from = collectSignatures(before);
  const to = collectSignatures(after);
  const remaining = [...to];
  let unchanged = 0;
  for (const signature of from) {
    const at = remaining.indexOf(signature);
    if (at >= 0) {
      unchanged += 1;
      remaining.splice(at, 1);
    }
  }
  return { unchanged, removed: from.length - unchanged, added: remaining.length };
}

export type ThinkingSignatureDiagnosticsEvent = {
  correlationId: string | null;
  provider: "claude" | "anthropic-compatible";
  model: "claude" | "other";
  status: number;
  recoveryAttempted: boolean;
  recoverySucceeded: boolean;
  outboundBodyCaptured: boolean;
  ingress: ThinkingSignatureStructure;
  outbound: ThinkingSignatureStructure;
  ingressToOutbound: SignatureDelta;
};

export function shouldEmitThinkingSignatureDiagnostics(args: {
  provider?: string | null;
  status: number;
  message: string;
}): boolean {
  return isAnthropicThinkingSignatureError(args);
}

/**
 * Build the diagnostics event for the Anthropic invalid-signature-400 boundary.
 * The result contains only the allowlisted scalars above — safe to log as JSON.
 */
export function emitThinkingSignatureDiagnostics(
  args: Parameters<typeof buildThinkingSignatureDiagnosticsEvent>[0],
  noLog: boolean,
  log?: { warn?: (tag: string, message: string) => void } | null
): void {
  if (noLog || !log?.warn) return;
  const event = buildThinkingSignatureDiagnosticsEvent(args);
  if (event) log.warn("THINKING_SIGNATURE", JSON.stringify(event));
}

export function buildThinkingSignatureDiagnosticsEvent(args: {
  correlationId: string | null;
  provider?: string | null;
  model?: string | null;
  status: number;
  message: string;
  ingressBody: unknown;
  outboundBody: unknown;
  recoveryAttempted: boolean;
  recoverySucceeded: boolean;
  outboundBodyCaptured: boolean;
}): ThinkingSignatureDiagnosticsEvent | null {
  if (!shouldEmitThinkingSignatureDiagnostics(args)) return null;
  return {
    // The route may preserve a caller-supplied X-Correlation-Id. Only UUIDs are safe to
    // echo in this incident event; arbitrary header bytes can contain sensitive payloads.
    correlationId:
      typeof args.correlationId === "string" &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(args.correlationId)
        ? args.correlationId
        : null,
    provider: args.provider === "claude" ? "claude" : "anthropic-compatible",
    model: typeof args.model === "string" && args.model.startsWith("claude-") ? "claude" : "other",
    status: args.status,
    recoveryAttempted: args.recoveryAttempted,
    recoverySucceeded: args.recoverySucceeded,
    outboundBodyCaptured: args.outboundBodyCaptured,
    ingress: projectThinkingSignatureStructure(args.ingressBody),
    outbound: projectThinkingSignatureStructure(args.outboundBody),
    ingressToOutbound: compareThinkingSignatures(args.ingressBody, args.outboundBody),
  };
}

function extractMessages(body: unknown): unknown[] {
  if (!body || typeof body !== "object") return [];
  const messages = (body as { messages?: unknown }).messages;
  return Array.isArray(messages) ? messages : [];
}

function countTurnThinking(content: unknown): TurnThinkingFacts {
  const facts: TurnThinkingFacts = { signed: 0, unsigned: 0, emptyTextSigned: 0, redacted: 0 };
  if (!Array.isArray(content)) return facts;
  for (const block of content.slice(0, MAX_TRACKED_BLOCKS_PER_TURN)) {
    const candidate = block as { type?: unknown; signature?: unknown; thinking?: unknown } | null;
    if (!candidate || typeof candidate !== "object") continue;
    if (candidate.type === "redacted_thinking") {
      facts.redacted += 1;
    } else if (candidate.type === "thinking") {
      if (typeof candidate.signature === "string" && candidate.signature.length > 0) {
        facts.signed += 1;
        if (typeof candidate.thinking === "string" && candidate.thinking.length === 0) {
          facts.emptyTextSigned += 1;
        }
      } else {
        facts.unsigned += 1;
      }
    }
  }
  return facts;
}
