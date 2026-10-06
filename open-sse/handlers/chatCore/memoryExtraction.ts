import { capMemoryExtractionText, MEMORY_EXTRACTION_TEXT_LIMIT } from "./logTruncation.ts";

export function extractMemoryTextFromResponse(
  response: Record<string, unknown> | null | undefined
): string {
  if (!response || typeof response !== "object") return "";

  const openAIText = response?.choices?.[0]?.message?.content;
  if (typeof openAIText === "string") {
    return capMemoryExtractionText(openAIText.trim());
  }

  if (Array.isArray(response?.content)) {
    const contentText = response.content
      .filter(
        (part: Record<string, unknown>) => part?.type === "text" && typeof part?.text === "string"
      )
      .map((part: Record<string, unknown>) => String(part.text).trim())
      .filter(Boolean)
      .join("\n");
    if (contentText) return capMemoryExtractionText(contentText);
  }

  if (typeof response?.output_text === "string") {
    return capMemoryExtractionText(response.output_text.trim());
  }

  return "";
}

export function extractMemoryTextFromRequestBody(
  body: Record<string, unknown> | null | undefined
): string {
  if (!body || typeof body !== "object") return "";

  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (messages && messages.length > 0) {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const msg = messages[i] as Record<string, unknown>;
      if (msg?.role !== "user") continue;

      if (typeof msg.content === "string" && msg.content.trim().length > 0) {
        return capMemoryExtractionText(msg.content.trim());
      }

      if (Array.isArray(msg.content)) {
        const text = msg.content
          .map((part: Record<string, unknown>) => {
            if (typeof part?.text === "string") return part.text.trim();
            if (part?.type === "input_text" && typeof part?.text === "string")
              return part.text.trim();
            return "";
          })
          .filter(Boolean)
          .join("\n")
          .trim();
        if (text) return capMemoryExtractionText(text);
      }
    }
  }

  const input = Array.isArray(body.input) ? body.input : null;
  if (input && input.length > 0) {
    for (let i = input.length - 1; i >= 0; i -= 1) {
      const item = input[i] as Record<string, unknown>;
      const role = typeof item?.role === "string" ? item.role.trim().toLowerCase() : "";
      const itemType = typeof item?.type === "string" ? item.type.trim().toLowerCase() : "";
      if (role && role !== "user") continue;
      if (itemType && itemType !== "message") continue;

      if (typeof item?.content === "string" && item.content.trim()) {
        return capMemoryExtractionText(item.content.trim());
      }
      if (Array.isArray(item?.content)) {
        const text = item.content
          .map((part: Record<string, unknown>) => {
            if (typeof part?.text === "string") return part.text.trim();
            if (part?.type === "input_text" && typeof part?.text === "string")
              return part.text.trim();
            return "";
          })
          .filter(Boolean)
          .join("\n")
          .trim();
        if (text) return capMemoryExtractionText(text);
      }
    }

    const tailChunks: string[] = [];
    let tailLength = 0;
    for (let i = input.length - 1; i >= 0 && tailLength < MEMORY_EXTRACTION_TEXT_LIMIT; i -= 1) {
      const item = input[i] as Record<string, unknown>;
      const text = (() => {
        const role = typeof item?.role === "string" ? item.role.trim().toLowerCase() : "";
        const itemType = typeof item?.type === "string" ? item.type.trim().toLowerCase() : "";
        if (role && role !== "user") return "";
        if (itemType && itemType !== "message") return "";

        if (typeof item?.content === "string") return item.content.trim();
        if (Array.isArray(item?.content)) {
          return item.content
            .map((part: Record<string, unknown>) => {
              if (typeof part?.text === "string") return part.text.trim();
              if (part?.type === "input_text" && typeof part?.text === "string")
                return part.text.trim();
              return "";
            })
            .filter(Boolean)
            .join("\n")
            .trim();
        }
        return "";
      })();
      if (!text) continue;
      tailChunks.unshift(text);
      tailLength += text.length + 1;
    }
    const chunks = tailChunks.join("\n").trim();
    if (chunks) return capMemoryExtractionText(chunks);
  }

  return "";
}

export function resolveMemoryOwnerId(apiKeyInfo: Record<string, unknown> | null): string | null {
  const rawId = apiKeyInfo?.id;
  if (typeof rawId === "string" && rawId.trim().length > 0) {
    return rawId;
  }
  return null;
}

/**
 * Pure decision for whether durable Memory should be extracted from this
 * request at all (#12150 P1b, surface 3). Wraps chatCore.ts's original inline
 * `memoryOwnerId && memorySettings?.enabled && memorySettings.maxTokens > 0`
 * check (unchanged) plus one new condition: a video-bridge-observed request
 * must never populate durable Memory — not from its request-derived text (a
 * flattened transcript description, not user-authored conversation) and, per
 * fix round 1 (adversarial review), not from its response-derived text
 * either, since the model's own reply also received the full transcript and
 * can echo it back. `videoBridgeObserved` is optional and defaults to falsy,
 * so every existing non-video caller (which never passes it) keeps today's
 * exact behavior. See `runMemoryExtractionGate` below for the call-site
 * wiring that applies this decision to both extraction sources at once.
 */
export function shouldExtractMemory(input: {
  enabled: boolean | null | undefined;
  maxTokens: number | null | undefined;
  memoryOwnerId: string | null | undefined;
  videoBridgeObserved?: boolean | null;
}): boolean {
  const { enabled, maxTokens, memoryOwnerId, videoBridgeObserved } = input;
  if (!memoryOwnerId) return false;
  if (!enabled) return false;
  if (!(typeof maxTokens === "number" && maxTokens > 0)) return false;
  if (videoBridgeObserved) return false;
  return true;
}

/**
 * Runs the full request+response Memory-extraction gate shared by
 * chatCore.ts's non-streaming and streaming completion paths (#12150 P1b fix
 * round 1). Extracted so this wiring — not just the pure `shouldExtractMemory`
 * decision — is unit-testable against the REAL
 * `extractMemoryTextFromRequestBody`/`extractMemoryTextFromResponse`, rather
 * than a test file hand-mirroring the call sites' shape.
 *
 * `extractFacts` is injected (not imported directly) purely for testability —
 * production callers pass the real `@/lib/memory/extraction` one. When
 * `shouldExtractMemory` says no (memory disabled/unconfigured, OR a
 * video-bridge-observed request), this is a complete no-op: neither the
 * request- nor the response-derived text is extracted, so an observed
 * request populates NO durable memory from either source.
 */
export function runMemoryExtractionGate(input: {
  memoryOwnerId: string | null | undefined;
  memorySettings: { enabled?: boolean | null; maxTokens?: number | null } | null | undefined;
  videoBridgeObserved: boolean;
  pipelineSessionId: string;
  requestBody: Record<string, unknown> | null | undefined;
  responseBody: Record<string, unknown> | null | undefined;
  extractFacts: (text: string, memoryOwnerId: string, sessionId: string) => void;
  log?: { debug?: (tag: string, message: string) => void } | null;
}): void {
  const {
    memoryOwnerId,
    memorySettings,
    videoBridgeObserved,
    pipelineSessionId,
    requestBody,
    responseBody,
    extractFacts,
    log,
  } = input;
  if (!memoryOwnerId) return;

  const allowed = shouldExtractMemory({
    enabled: memorySettings?.enabled,
    maxTokens: memorySettings?.maxTokens,
    memoryOwnerId,
    videoBridgeObserved,
  });
  if (!allowed) {
    // Only worth a log line for the video-bridge case — memory being
    // disabled/unconfigured entirely is the normal, silent, non-video path.
    if (videoBridgeObserved && memorySettings?.enabled) {
      log?.debug?.(
        "MEMORY",
        "Skipping request+response memory extraction: video-bridge transcript observed"
      );
    }
    return;
  }

  const requestMemoryText = extractMemoryTextFromRequestBody(requestBody ?? null);
  if (requestMemoryText) {
    extractFacts(requestMemoryText, memoryOwnerId, pipelineSessionId);
  }

  const responseMemoryText = extractMemoryTextFromResponse(responseBody ?? null);
  if (responseMemoryText) {
    extractFacts(responseMemoryText, memoryOwnerId, pipelineSessionId);
  }
}
