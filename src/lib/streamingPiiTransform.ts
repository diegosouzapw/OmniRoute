import { createSseTextTransform, FieldCategory, getFieldCategory } from "./sseTextTransform";
import { sanitizePII } from "./piiSanitizer";

export interface PiiTransformOptions {
  windowSize?: number;
}

export function createPiiSseTransform(options?: PiiTransformOptions): TransformStream {
  const choiceBuffers = new Map<string, Record<FieldCategory, string>>();

  const getBuffers = (index: string | number): Record<FieldCategory, string> => {
    const key = String(index);
    let buf = choiceBuffers.get(key);
    if (!buf) {
      buf = {
        content: "",
        reasoning: "",
        toolArgs: "",
        partialJson: "",
      };
      choiceBuffers.set(index, buf);
    }
    return buf;
  };

  let windowSize = Math.max(
    200,
    options?.windowSize ?? (parseInt(process.env.PII_WINDOW_SIZE || "", 10) || 200)
  );
  if (options?.windowSize !== undefined && process.env.PII_TEST_BYPASS_MIN_WINDOW === "true") {
    windowSize = options.windowSize;
  }
  const W = windowSize;

  const processor = (
    text: string,
    field: FieldCategory,
    isStopSignal = false,
    index: string | number = "0_0",
    isSnapshot = false
  ): string => {
    if (field === "toolArgs" || field === "partialJson") {
      return text;
    }
    if (isSnapshot) {
      return sanitizePII(text).text;
    }
    const buffers = getBuffers(index);
    buffers[field] += text;
    const { text: sanitized, endMatchIndex } = sanitizePII(buffers[field], !isStopSignal);
    let emitLength = isStopSignal ? sanitized.length : Math.max(0, sanitized.length - W);

    // Cap emitLength at the start of any PII that touched the end of the buffer
    if (!isStopSignal && endMatchIndex !== undefined && emitLength > endMatchIndex) {
      emitLength = endMatchIndex;
    }

    // Prevent slicing in the middle of a UTF-16 surrogate pair (e.g. emojis)
    if (emitLength > 0 && emitLength < sanitized.length) {
      const charCode = sanitized.charCodeAt(emitLength - 1);
      // High surrogate range is 0xD800 - 0xDBFF
      if (charCode >= 0xd800 && charCode <= 0xdbff) {
        emitLength -= 1;
      }
    }

    const toEmit = sanitized.slice(0, emitLength);
    buffers[field] = sanitized.slice(emitLength);
    return toEmit;
  };

  const onFlush = (lastJson: any, isJsonStream = false, lastContentJson: any = null): any => {
    // Force final redaction on all buffers
    for (const [index, buffers] of choiceBuffers.entries()) {
      for (const key of Object.keys(buffers)) {
        const field = key as FieldCategory;
        if (buffers[field]) {
          buffers[field] = sanitizePII(buffers[field]).text;
        }
      }
    }

    let hasRemaining = false;
    for (const buffers of choiceBuffers.values()) {
      for (const key of Object.keys(buffers)) {
        if (buffers[key as FieldCategory].length > 0) {
          hasRemaining = true;
        }
      }
    }
    if (!hasRemaining) {
      return null;
    }

    if (!lastJson) {
      const buffers = getBuffers("0_0");
      if (buffers.content) {
        const remaining = buffers.content;
        buffers.content = "";

        if (isJsonStream) {
          // Wrap in a safe default OpenAI format to prevent client-side SDK crashes
          return {
            choices: [
              {
                delta: {
                  content: remaining,
                },
              },
            ],
          };
        } else {
          return remaining;
        }
      }
      return null;
    }

    // Explicitly target formats to prevent metadata corruption and leakage
    const METADATA_KEYS = [
      "id",
      "model",
      "object",
      "created",
      "finish_reason",
      "finishReason",
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
    ];

    // 1. Claude format
    if (
      typeof lastJson.type === "string" &&
      (lastJson.type.startsWith("message") || lastJson.type.startsWith("content_block"))
    ) {
      const buffers = getBuffers("0_0");
      const delta: any = { type: "text_delta" };
      let hasDelta = false;
      if (buffers.content) {
        delta.text = buffers.content;
        buffers.content = "";
        hasDelta = true;
      }
      if (buffers.reasoning) {
        delta.thinking = buffers.reasoning;
        buffers.reasoning = "";
        hasDelta = true;
      }
      if (buffers.partialJson) {
        delta.partial_json = buffers.partialJson;
        buffers.partialJson = "";
        hasDelta = true;
      }
      if (hasDelta) {
        return {
          type: "content_block_delta",
          index: typeof lastJson.index === "number" ? lastJson.index : 0,
          delta,
        };
      }
      return null;
    }

    // 2. OpenAI Chat Completions
    if (lastJson.choices && Array.isArray(lastJson.choices)) {
      const finalJson = JSON.parse(JSON.stringify(lastJson));
      const presentIndexes = new Set(
        finalJson.choices.map((c: any) => c.index).filter((idx: any) => typeof idx === "number")
      );
      for (const [compositeKey, choiceBuf] of choiceBuffers.entries()) {
        const choiceIdx = parseInt(compositeKey.split("_")[0] || "0", 10);
        if (
          !presentIndexes.has(choiceIdx) &&
          (choiceBuf.content || choiceBuf.reasoning || choiceBuf.toolArgs)
        ) {
          finalJson.choices.push({ index: choiceIdx, delta: {} });
          presentIndexes.add(choiceIdx);
        }
      }

      for (const choice of finalJson.choices) {
        const choiceIdx = typeof choice.index === "number" ? choice.index : 0;

        // Find if we have tool buffers for this choice
        const toolEntries = Array.from(choiceBuffers.entries()).filter(
          ([key]) => key.startsWith(`${choiceIdx}_`) && key !== `${choiceIdx}_0`
        );

        const choiceBuf = getBuffers(`${choiceIdx}_0`);
        if (!choice.delta) choice.delta = {};
        const delta = choice.delta;

        if (choiceBuf.content) {
          delta.content = choiceBuf.content;
          choiceBuf.content = "";
        } else {
          delete delta.content;
        }
        if (choiceBuf.reasoning) {
          delta.reasoning_content = choiceBuf.reasoning;
          choiceBuf.reasoning = "";
        } else {
          delete delta.reasoning_content;
        }
        if (choiceBuf.toolArgs || toolEntries.length > 0) {
          if (!choice.delta.tool_calls) choice.delta.tool_calls = [];

          if (choiceBuf.toolArgs) {
            choice.delta.tool_calls.push({
              index: 0,
              function: { arguments: choiceBuf.toolArgs },
            });
            choiceBuf.toolArgs = "";
          }

          for (const [key, buf] of toolEntries) {
            if (buf.toolArgs) {
              const toolIdx = parseInt(key.split("_")[1] || "0", 10);
              choice.delta.tool_calls.push({
                index: toolIdx,
                function: { arguments: buf.toolArgs },
              });
              buf.toolArgs = "";
            }
          }
        } else {
          delete choice.delta.tool_calls;
        }
      }
      return finalJson;
    }

    // 3. Responses API
    if (typeof lastJson.type === "string" && lastJson.type.startsWith("response.")) {
      const finalJson = JSON.parse(JSON.stringify(lastJson));
      const idx = typeof finalJson.output_index === "number" ? finalJson.output_index : 0;
      const buffers = getBuffers(`${idx}_0`);
      if (buffers.content) {
        finalJson.delta = buffers.content;
        buffers.content = "";
      }
      if (buffers.toolArgs) {
        finalJson.item = {
          arguments: buffers.toolArgs,
        };
        buffers.toolArgs = "";
      }
      return finalJson;
    }

    // 4. Gemini format
    if (Array.isArray(lastJson.candidates)) {
      const finalJson = JSON.parse(JSON.stringify(lastJson));
      for (const cand of finalJson.candidates) {
        const idx = typeof cand.index === "number" ? cand.index : 0;
        const buffers = getBuffers(`${idx}_0`);
        if (!cand.content) cand.content = {};
        cand.content.parts = [];

        if (buffers.content) {
          cand.content.parts.push({ text: buffers.content });
          buffers.content = "";
        }
      }
      return finalJson;
    }

    // 5. Generic fallback
    const templateJson = lastContentJson || lastJson;
    const finalJson = JSON.parse(JSON.stringify(templateJson));
    const clearDeltas = (obj: any) => {
      if (!obj || typeof obj !== "object") return;
      for (const key of Object.keys(obj)) {
        if (METADATA_KEYS.includes(key)) {
          continue;
        }
        if (typeof obj[key] === "string") {
          obj[key] = "";
        } else if (typeof obj[key] === "object") {
          clearDeltas(obj[key]);
        }
      }
    };
    clearDeltas(finalJson);

    const populateRemaining = (obj: any, currentChoiceIdx = 0, currentToolIdx = 0) => {
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

      for (const key of Object.keys(obj)) {
        if (METADATA_KEYS.includes(key)) {
          continue;
        }
        if (typeof obj[key] === "string") {
          const field: FieldCategory = getFieldCategory(key);
          const choiceBuf = getBuffers(compositeKey);
          if (choiceBuf[field]) {
            obj[key] = (obj[key] || "") + choiceBuf[field];
            choiceBuf[field] = "";
          }
        } else if (typeof obj[key] === "object") {
          populateRemaining(obj[key], choiceIdx, toolIdx);
        }
      }
    };

    populateRemaining(finalJson, 0, 0);

    // Clear all buffers
    for (const buffers of choiceBuffers.values()) {
      buffers.content = "";
      buffers.reasoning = "";
      buffers.toolArgs = "";
      buffers.partialJson = "";
    }

    return finalJson;
  };

  return createSseTextTransform(processor, onFlush);
}
