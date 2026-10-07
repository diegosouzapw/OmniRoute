export type FieldCategory = "content" | "reasoning" | "toolArgs" | "partialJson";

// Keys that always map to a fixed category, regardless of where they appear in the chunk.
const FIXED_CATEGORY_MAP: Record<string, FieldCategory> = {
  reasoning: "reasoning",
  thinking: "reasoning",
  reasoning_content: "reasoning",
  arguments: "toolArgs",
  partial_json: "partialJson",
};

// System/protocol metadata keys that must never be routed through the PII processor or
// buffer, no matter which JSON shape they appear in. Shared by the real-time sanitizeObject
// pass (below) and streamingPiiTransform.ts's onFlush generic-fallback branch — the two
// copies of this list had drifted (see issue #13488): neither one listed `provider`,
// `native_finish_reason`, or the `reasoning_details[].format` field, so those OpenRouter
// metadata strings fell through to the default "content" category and got spliced into the
// same sliding-window buffer as the actual answer text.
export const METADATA_KEYS = new Set([
  "id",
  "model",
  "object",
  "created",
  "finish_reason",
  "finishReason",
  "native_finish_reason",
  "role",
  "type",
  "index",
  "stop_reason",
  "stop_sequence",
  "system_fingerprint",
  "service_tier",
  "usage",
  "prompt_tokens",
  "completion_tokens",
  "total_tokens",
  "input_tokens",
  "output_tokens",
  "logprobs",
  "refusal",
  "name",
  "event",
  "provider",
  "format",
]);

/**
 * Classify a string field as a PII-processed category, or `null` when it is metadata that
 * must pass through untouched. `parentKey` is the key of the object that directly contains
 * `key` (empty string at the JSON root) — it disambiguates `text`, which means the answer
 * everywhere except inside a `reasoning_details[]` item, where it is reasoning text (and
 * `format` alongside it is metadata, not content, even though it is not disambiguated by
 * parent elsewhere). Any string field not explicitly recognized as metadata defaults to
 * "content" — this keeps non-standard/unrecognized stream shapes (arbitrary JSON keys that
 * match none of the known provider formats) from silently losing their text.
 */
export function classifyField(key: string, parentKey = ""): FieldCategory | null {
  if (FIXED_CATEGORY_MAP[key]) {
    return FIXED_CATEGORY_MAP[key];
  }
  if (key === "text" && parentKey === "reasoning_details") {
    return "reasoning";
  }
  if (METADATA_KEYS.has(key)) {
    return null;
  }
  return "content";
}

// Back-compat helper kept for any external caller expecting a category rather than `null`
// for metadata; internal call sites use `classifyField` so they can skip metadata entirely.
export function getFieldCategory(key: string): FieldCategory {
  return classifyField(key) ?? "content";
}

const STOP_EVENT_TYPES = new Set([
  "response.done",
  "response.completed",
  "response.cancelled",
  "response.failed",
]);

export function checkIfStopSignal(json: any): boolean {
  if (!json || typeof json !== "object") return false;
  if (json.choices && Array.isArray(json.choices) && json.choices.some((c: any) => c.finish_reason))
    return true;
  if (
    json.candidates &&
    Array.isArray(json.candidates) &&
    json.candidates.some((c: any) => c.finishReason)
  )
    return true;
  if (json.type === "content_block_stop") return true;
  if (json.type === "message_stop") return true;
  if (json.type === "message_delta" && json.delta?.stop_reason) return true;
  if (STOP_EVENT_TYPES.has(json.type)) return true;
  return false;
}

export function checkIfSnapshot(json: any): boolean {
  if (!json || typeof json !== "object") return false;
  if (typeof json.type === "string") {
    const t = json.type;
    if (t.endsWith(".done") || t.endsWith(".completed") || STOP_EVENT_TYPES.has(t)) return true;
  }
  return false;
}

const fallbackDecoder = new TextDecoder();

export function createSseTextTransform(
  processor: (
    text: string,
    field: FieldCategory,
    isStopSignal?: boolean,
    index?: string | number,
    isSnapshot?: boolean
  ) => string,
  onFlush?: (lastJson: any, isJsonStream?: boolean, lastContentJson?: any) => any,
  onCancel?: () => void
): TransformStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");
  let lineBuffer = "";
  let lastPrefix = "data: ";
  let lastJson: any = null;
  let lastContentJson: any = null;
  let isJsonStream = false;
  let flushed = false;
  let errored = false;
  let currentEventLine = "";
  let lastEventLine = "";
  let pendingEventLine = "";

  const handleLine = (line: string, controller: TransformStreamDefaultController) => {
    const trimmed = line.trim();
    if (trimmed === "" || line.startsWith(":")) {
      // Pass comments and empty lines through unchanged
      if (trimmed === "") {
        currentEventLine = "";
      }
      if (pendingEventLine) {
        controller.enqueue(encoder.encode(pendingEventLine + "\n"));
        pendingEventLine = "";
      }
      controller.enqueue(encoder.encode(line + "\n"));
      return;
    }

    if (line.startsWith("data:")) {
      const prefix = line.startsWith("data: ") ? "data: " : "data:";
      lastPrefix = prefix;
      const segment = line.startsWith("data: ") ? line.slice(6) : line.slice(5);
      if (segment === "[DONE]") {
        if (onFlush && !flushed) {
          const flushedValue = onFlush(lastJson, isJsonStream, lastContentJson);
          if (flushedValue) {
            const prefix = lastPrefix || "data: ";
            const payload =
              typeof flushedValue === "string" ? flushedValue : JSON.stringify(flushedValue);
            if (lastEventLine) {
              controller.enqueue(encoder.encode(lastEventLine + "\n"));
            }
            controller.enqueue(encoder.encode(prefix + payload + "\n\n"));
          }
          flushed = true;
        }
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
          pendingEventLine = "";
        }
        controller.enqueue(encoder.encode(line + "\n"));
        return;
      }

      const trimmedSegment = segment.trim();
      if (trimmedSegment.startsWith("{") || trimmedSegment.startsWith("[")) {
        try {
          const json = JSON.parse(trimmedSegment);
          isJsonStream = true;

          let matched = false;

          const isStopSignal = checkIfStopSignal(json);
          const isSnapshot = checkIfSnapshot(json);

          // Recursively sanitize string properties, skipping recognized system metadata
          // (`classifyField` returns null for METADATA_KEYS — `provider`,
          // `native_finish_reason`, `reasoning_details[].format`, etc.). `parentKey` is the
          // key of the enclosing object (unchanged across array-index recursion) so
          // `classifyField` can tell `reasoning_details[].text` apart from ordinary content
          // text. See issue #13488.
          const sanitizeObject = (
            obj: any,
            currentChoiceIdx = 0,
            currentToolIdx = 0,
            parentKey = ""
          ) => {
            if (!obj || typeof obj !== "object") return;

            let choiceIdx = currentChoiceIdx;
            let toolIdx = currentToolIdx;

            if (typeof obj.index === "number") {
              if (obj.delta || obj.message || obj.finish_reason) {
                choiceIdx = obj.index;
              } else if (obj.function || obj.id || obj.type === "function") {
                toolIdx = obj.index;
              } else {
                choiceIdx = obj.index;
              }
            }

            const compositeKey = `${choiceIdx}_${toolIdx}`;
            const isArray = Array.isArray(obj);

            for (const key of Object.keys(obj)) {
              if (typeof obj[key] === "string") {
                const val = obj[key];
                const field = classifyField(key, parentKey);
                if (field === null) {
                  continue;
                }
                if (field === "toolArgs" || field === "partialJson") {
                  obj[key] = val;
                  matched = true;
                  continue;
                }
                obj[key] = processor(val, field, isStopSignal, compositeKey, isSnapshot);
                matched = true;
              } else if (typeof obj[key] === "object") {
                sanitizeObject(obj[key], choiceIdx, toolIdx, isArray ? parentKey : key);
              }
            }
          };

          sanitizeObject(json, 0, 0);

          if (!matched) {
            console.warn(
              "[SSE-TRANSFORM] No string fields sanitized in SSE JSON chunk. Keys:",
              Object.keys(json).slice(0, 5).join(", ")
            );
          } else {
            lastContentJson = json;
          }

          if (isStopSignal && onFlush && !flushed) {
            const flushedValue = onFlush(
              lastJson || json,
              isJsonStream,
              lastContentJson || lastJson || json
            ); // Use json as fallback just in case
            if (flushedValue) {
              const prefix = lastPrefix || "data: ";
              const payload =
                typeof flushedValue === "string" ? flushedValue : JSON.stringify(flushedValue);
              // Only enqueue if the flushed value actually has content (onFlush usually returns null if buffer is empty now)
              if (lastEventLine) {
                controller.enqueue(encoder.encode(lastEventLine + "\n"));
              }
              controller.enqueue(encoder.encode(prefix + payload + "\n\n"));
            }
            flushed = true;
          }

          if (!isStopSignal && !isSnapshot) {
            lastEventLine = currentEventLine;
          }

          lastJson = json;
          if (pendingEventLine) {
            controller.enqueue(encoder.encode(pendingEventLine + "\n"));
            pendingEventLine = "";
          }
          controller.enqueue(encoder.encode(prefix + JSON.stringify(json) + "\n"));
        } catch (err: any) {
          if (err?.message?.startsWith("[PII]")) {
            throw err;
          }
          if (err instanceof SyntaxError) {
            // JSON parsing failed. Check if it looks like JSON that failed to parse.
            if (trimmedSegment.startsWith("{") || trimmedSegment.startsWith("[")) {
              console.warn(
                "[SSE-TRANSFORM] Dropping malformed JSON chunk to prevent syntax injection:",
                trimmedSegment.slice(0, 100)
              );
              pendingEventLine = "";
            } else {
              if (pendingEventLine) {
                controller.enqueue(encoder.encode(pendingEventLine + "\n"));
                pendingEventLine = "";
              }
              // Treat segment as raw text delta (fail-open)
              const processed = processor(segment, "content");
              controller.enqueue(encoder.encode(prefix + processed + "\n"));
            }
          } else {
            throw err;
          }
        }
      } else {
        // Starts with data: but not JSON, process as raw text
        lastEventLine = currentEventLine;
        const processed = processor(segment, "content");
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
          pendingEventLine = "";
        }
        controller.enqueue(encoder.encode(prefix + processed + "\n"));
      }
    } else {
      // Non-data line, pass through (e.g. event: content_block_delta)
      if (line.startsWith("event:")) {
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
        }
        currentEventLine = line;
        pendingEventLine = line;
      } else {
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
          pendingEventLine = "";
        }
        controller.enqueue(encoder.encode(line + "\n"));
      }
    }
  };

  return new TransformStream({
    transform(chunk, controller) {
      try {
        const chunkStr = decoder.decode(chunk, { stream: true });
        lineBuffer += chunkStr;
        const lines = lineBuffer.split(/\r?\n/);
        lineBuffer = lines.pop() || "";

        for (const line of lines) {
          handleLine(line, controller);
        }
      } catch (err: any) {
        let context = "[REDACTED_DUE_TO_PII]";
        if (!err?.message?.startsWith("[PII]")) {
          if (typeof chunk === "string") {
            context = chunk.slice(0, 200);
          } else if (chunk instanceof Uint8Array) {
            context = fallbackDecoder.decode(chunk.slice(0, 200));
          } else {
            context = String(chunk).slice(0, 200);
          }
        }
        console.error("[SSE-TRANSFORM] Error in transform:", err, "chunk:", context);
        lineBuffer = "";
        errored = true;
        controller.error(err);
      }
    },
    flush(controller) {
      if (errored) return;
      try {
        const remaining = decoder.decode() + lineBuffer;
        if (remaining) {
          handleLine(remaining, controller);
        }
        if (pendingEventLine) {
          controller.enqueue(encoder.encode(pendingEventLine + "\n"));
          pendingEventLine = "";
        }
        if (onFlush && !flushed) {
          const flushedValue = onFlush(lastJson, isJsonStream, lastContentJson);
          if (flushedValue) {
            const prefix = lastPrefix || "data: ";
            const payload =
              typeof flushedValue === "string" ? flushedValue : JSON.stringify(flushedValue);
            if (lastEventLine) {
              controller.enqueue(encoder.encode(lastEventLine + "\n"));
            }
            controller.enqueue(encoder.encode(prefix + payload + "\n\n"));
          }
        }
      } catch (err) {
        console.error("[SSE-TRANSFORM] Error in flush:", err);
        controller.error(err);
      }
    },
    cancel(reason: any) {
      if (onCancel) {
        onCancel();
      }
    },
  } as any);
}
