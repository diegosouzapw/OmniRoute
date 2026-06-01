export type FieldCategory = "content" | "reasoning" | "toolArgs" | "partialJson";

export function createSseTextTransform(
  processor: (text: string, field: FieldCategory, isStopSignal?: boolean) => string,
  onFlush?: (lastJson: any) => any,
  onCancel?: () => void,
): TransformStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");
  let lineBuffer = "";
  let lastPrefix = "data: ";
  let lastJson: any = null;
  let flushed = false;
  let errored = false;

  const handleLine = (line: string, controller: TransformStreamDefaultController) => {
    const trimmed = line.trim();
    if (trimmed === "" || line.startsWith(":")) {
      // Pass comments and empty lines through unchanged
      controller.enqueue(encoder.encode(line + "\n"));
      return;
    }

    if (line.startsWith("data:")) {
      const prefix = line.startsWith("data: ") ? "data: " : "data:";
      lastPrefix = prefix;
      const segment = line.startsWith("data: ") ? line.slice(6) : line.slice(5);
      if (segment === "[DONE]") {
        if (onFlush) {
          const flushedValue = onFlush(lastJson);
          if (flushedValue) {
            const prefix = lastPrefix || "data: ";
            const payload = typeof flushedValue === "string" ? flushedValue : JSON.stringify(flushedValue);
            controller.enqueue(encoder.encode(prefix + payload + "\n"));
          }
          flushed = true;
        }
        controller.enqueue(encoder.encode(line + "\n"));
        return;
      }

      const trimmedSegment = segment.trim();
      if (trimmedSegment.startsWith("{") || trimmedSegment.startsWith("[")) {
        try {
          const json = JSON.parse(trimmedSegment);
          
          let matched = false;
          
          const isStopSignal = 
            (json.choices && json.choices.some((c: any) => c.finish_reason)) ||
            (json.candidates && json.candidates.some((c: any) => c.finishReason)) ||
            (json.type === "content_block_stop") ||
            (json.type === "message_stop") ||
            (json.type === "message_delta" && json.delta?.stop_reason) ||
            ["response.done", "response.completed", "response.cancelled", "response.failed"].includes(json.type);

          // OpenAI CC
          if (json.choices && Array.isArray(json.choices)) {
            for (const choice of json.choices) {
              if (choice?.delta) {
                const delta = choice.delta;
                if (typeof delta.content === "string") {
                  delta.content = processor(delta.content, "content", isStopSignal);
                  matched = true;
                } else if (Array.isArray(delta.content)) {
                  for (const part of delta.content) {
                    if (part && typeof part.text === "string") {
                      part.text = processor(part.text, "content", isStopSignal);
                      matched = true;
                    }
                  }
                }
                if (typeof delta.reasoning_content === "string") {
                  delta.reasoning_content = processor(delta.reasoning_content, "reasoning", isStopSignal);
                  matched = true;
                } else if (typeof delta.reasoning === "string") {
                  delta.reasoning = processor(delta.reasoning, "reasoning", isStopSignal);
                  matched = true;
                }
                if (Array.isArray(delta.tool_calls)) {
                  for (const tool of delta.tool_calls) {
                    if (typeof tool?.function?.arguments === "string") {
                      tool.function.arguments = processor(tool.function.arguments, "toolArgs", isStopSignal);
                      matched = true;
                    }
                  }
                }
              }
            }
          }

          // Claude
          else if (json.delta && typeof json.delta === "object") {
            const delta = json.delta;
            if (typeof delta.text === "string") {
              delta.text = processor(delta.text, "content", isStopSignal);
              matched = true;
            }
            if (typeof delta.thinking === "string") {
              delta.thinking = processor(delta.thinking, "reasoning", isStopSignal);
              matched = true;
            }
            if (typeof delta.partial_json === "string") {
              delta.partial_json = processor(delta.partial_json, "partialJson", isStopSignal);
              matched = true;
            }
          }

          // Responses API
          else if (typeof json.delta === "string") {
            json.delta = processor(json.delta, "content", isStopSignal);
            matched = true;
          }
          else if (typeof json.item?.arguments === "string") {
            json.item.arguments = processor(json.item.arguments, "toolArgs", isStopSignal);
            matched = true;
          }

          // Gemini
          else if (Array.isArray(json.candidates)) {
            for (const cand of json.candidates) {
              if (cand?.content && Array.isArray(cand.content.parts)) {
                for (const part of cand.content.parts) {
                  if (part && typeof part.text === "string") {
                    part.text = processor(part.text, "content", isStopSignal);
                    matched = true;
                  }
                }
              }
            }
          }

          // Generic
          else if (typeof json.content === "string") {
            json.content = processor(json.content, "content", isStopSignal);
            matched = true;
          } else if (typeof json.text === "string") {
            json.text = processor(json.text, "content", isStopSignal);
            matched = true;
          }

          if (!matched) {
            const deepSanitizeKnownKeys = (obj: any) => {
              if (!obj || typeof obj !== "object") return;
              for (const key of Object.keys(obj)) {
                if (typeof obj[key] === "string" && ["text", "content", "arguments", "reasoning"].includes(key)) {
                  // Map the key to a valid FieldCategory. Default to "content".
                  let field: "content" | "reasoning" | "toolArgs" | "partialJson" = "content";
                  if (key === "reasoning") field = "reasoning";
                  if (key === "arguments") field = "toolArgs";
                  obj[key] = processor(obj[key], field, isStopSignal);
                  matched = true;
                } else if (typeof obj[key] === "object") {
                  deepSanitizeKnownKeys(obj[key]);
                }
              }
            };
            deepSanitizeKnownKeys(json);
            
            if (!matched) {
              console.warn("[SSE-TRANSFORM] Unrecognized SSE JSON format, passing through unprocessed. Keys:", Object.keys(json).slice(0, 5).join(", "));
            }
          }

          if (isStopSignal && onFlush && !flushed) {
            const flushedValue = onFlush(lastJson || json); // Use json as fallback just in case
            if (flushedValue) {
              const prefix = lastPrefix || "data: ";
              const payload = typeof flushedValue === "string" ? flushedValue : JSON.stringify(flushedValue);
              // Only enqueue if the flushed value actually has content (onFlush usually returns null if buffer is empty now)
              controller.enqueue(encoder.encode(prefix + payload + "\n"));
            }
            flushed = true;
          }

          lastJson = json;
          controller.enqueue(encoder.encode(prefix + JSON.stringify(json) + "\n"));
        } catch (err: any) {
          if (err?.message?.startsWith("[PII]")) {
            throw err;
          }
          // JSON parsing failed. Check if it looks like JSON that failed to parse.
          if (trimmedSegment.startsWith("{") || trimmedSegment.startsWith("[")) {
            console.warn("[SSE-TRANSFORM] Dropping malformed JSON chunk to prevent syntax injection:", trimmedSegment.slice(0, 100));
          } else {
            // Treat segment as raw text delta (fail-open)
            const processed = processor(segment, "content");
            controller.enqueue(encoder.encode(prefix + processed + "\n"));
          }
        }
      } else {
        // Starts with data: but not JSON, process as raw text
        const processed = processor(segment, "content");
        controller.enqueue(encoder.encode(prefix + processed + "\n"));
      }
    } else {
      // Non-data line, pass through (e.g. event: content_block_delta)
      controller.enqueue(encoder.encode(line + "\n"));
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
      } catch (err) {
        const context = typeof chunk === "string" 
          ? chunk.slice(0, 200) 
          : chunk instanceof Uint8Array 
            ? new TextDecoder().decode(chunk.slice(0, 200)) 
            : String(chunk).slice(0, 200);
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
        if (onFlush && !flushed) {
          const flushedValue = onFlush(lastJson);
          if (flushedValue) {
            const prefix = lastPrefix || "data: ";
            const payload = typeof flushedValue === "string" ? flushedValue : JSON.stringify(flushedValue);
            controller.enqueue(encoder.encode(prefix + payload + "\n"));
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
    }
  } as any);
}
