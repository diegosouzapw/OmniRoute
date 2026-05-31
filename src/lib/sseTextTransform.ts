export type FieldCategory = "content" | "reasoning" | "toolArgs" | "partialJson";

export function createSseTextTransform(
  processor: (text: string, field: FieldCategory) => string,
  onFlush?: () => string,
  onCancel?: () => void,
): TransformStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");
  let lineBuffer = "";

  const handleLine = (line: string, controller: TransformStreamDefaultController) => {
    const trimmed = line.trim();
    if (trimmed === "" || line.startsWith(":")) {
      // Pass comments and empty lines through unchanged
      controller.enqueue(encoder.encode(line + "\n"));
      return;
    }

    if (line.startsWith("data:")) {
      const segment = line.startsWith("data: ") ? line.slice(6) : line.slice(5);
      if (segment === "[DONE]") {
        controller.enqueue(encoder.encode(line + "\n"));
        return;
      }

      if (segment.startsWith("{") || segment.startsWith("[")) {
        try {
          const json = JSON.parse(segment);
          
          const processDeep = (val: any): any => {
            if (!val) return val;
            if (typeof val === "string") {
              return processor(val, "content");
            }
            if (Array.isArray(val)) {
              for (let i = 0; i < val.length; i++) {
                val[i] = processDeep(val[i]);
              }
            } else if (typeof val === "object") {
              for (const key of Object.keys(val)) {
                val[key] = processDeep(val[key]);
              }
            }
            return val;
          };

          let matched = false;

          // OpenAI CC
          if (json.choices && Array.isArray(json.choices)) {
            for (const choice of json.choices) {
              if (choice.delta) {
                const delta = choice.delta;
                if (typeof delta.content === "string") {
                  delta.content = processor(delta.content, "content");
                  matched = true;
                } else if (Array.isArray(delta.content)) {
                  for (const part of delta.content) {
                    if (part && typeof part.text === "string") {
                      part.text = processor(part.text, "content");
                      matched = true;
                    }
                  }
                }
                if (typeof delta.reasoning_content === "string") {
                  delta.reasoning_content = processor(delta.reasoning_content, "reasoning");
                  matched = true;
                }
                if (typeof delta.reasoning === "string") {
                  delta.reasoning = processor(delta.reasoning, "reasoning");
                  matched = true;
                }
                if (Array.isArray(delta.tool_calls)) {
                  for (const tool of delta.tool_calls) {
                    if (tool?.function && typeof tool.function.arguments === "string") {
                      tool.function.arguments = processor(tool.function.arguments, "toolArgs");
                      matched = true;
                    }
                  }
                }
              }
            }
          }

          // Claude
          if (json.delta && typeof json.delta === "object") {
            const delta = json.delta;
            if (typeof delta.text === "string") {
              delta.text = processor(delta.text, "content");
              matched = true;
            }
            if (typeof delta.thinking === "string") {
              delta.thinking = processor(delta.thinking, "reasoning");
              matched = true;
            }
            if (typeof delta.partial_json === "string") {
              delta.partial_json = processor(delta.partial_json, "partialJson");
              matched = true;
            }
          }

          // Responses API
          if (typeof json.delta === "string") {
            json.delta = processor(json.delta, "content");
            matched = true;
          }
          if (json.item?.arguments && typeof json.item.arguments === "string") {
            json.item.arguments = processor(json.item.arguments, "toolArgs");
            matched = true;
          }

          // Gemini
          if (Array.isArray(json.candidates)) {
            for (const cand of json.candidates) {
              if (cand?.content && Array.isArray(cand.content.parts)) {
                for (const part of cand.content.parts) {
                  if (part && typeof part.text === "string") {
                    part.text = processor(part.text, "content");
                    matched = true;
                  }
                }
              }
            }
          }

          // Generic
          if (typeof json.content === "string") {
            json.content = processor(json.content, "content");
            matched = true;
          }
          if (typeof json.text === "string") {
            json.text = processor(json.text, "content");
            matched = true;
          }

          if (!matched) {
            processDeep(json);
          }

          const prefix = line.startsWith("data: ") ? "data: " : "data:";
          controller.enqueue(encoder.encode(prefix + JSON.stringify(json) + "\n"));
        } catch {
          // JSON parsing failed, treat segment as raw text delta (fail-open)
          const processed = processor(segment, "content");
          const prefix = line.startsWith("data: ") ? "data: " : "data:";
          controller.enqueue(encoder.encode(prefix + processed + "\n"));
        }
      } else {
        // Starts with data: but not JSON, process as raw text
        const processed = processor(segment, "content");
        const prefix = line.startsWith("data: ") ? "data: " : "data:";
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
        console.error("[SSE-TRANSFORM] Error in transform:", err);
        controller.enqueue(chunk);
      }
    },
    flush(controller) {
      try {
        const remaining = decoder.decode() + lineBuffer;
        if (remaining) {
          handleLine(remaining, controller);
        }
        if (onFlush) {
          const flushed = onFlush();
          if (flushed) {
            controller.enqueue(encoder.encode(flushed));
          }
        }
      } catch (err) {
        console.error("[SSE-TRANSFORM] Error in flush:", err);
      }
    },
    cancel(reason: any) {
      if (onCancel) {
        onCancel();
      }
    }
  } as any);
}
