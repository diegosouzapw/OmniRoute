import { createSseTextTransform, FieldCategory } from "./sseTextTransform";
import { sanitizePIIChunk } from "./piiSanitizer";

export interface PiiTransformOptions {
  windowSize?: number;
}

export function createPiiSseTransform(options?: PiiTransformOptions): TransformStream {
  const buffers: Record<FieldCategory, string> = {
    content: "",
    reasoning: "",
    toolArgs: "",
    partialJson: ""
  };
  const W = Math.max(1, options?.windowSize ?? (parseInt(process.env.PII_WINDOW_SIZE || "", 10) || 100));

  const processor = (text: string, field: FieldCategory, isStopSignal = false): string => {
    buffers[field] += text;
    const sanitized = sanitizePIIChunk(buffers[field], isStopSignal);
    let emitLength = isStopSignal ? sanitized.length : Math.max(0, sanitized.length - W);
    
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

  const onFlush = (lastJson: any): any => {
    // Force final redaction on anything left in the buffers
    for (const key of Object.keys(buffers)) {
      const field = key as FieldCategory;
      if (buffers[field]) {
        buffers[field] = sanitizePIIChunk(buffers[field], true);
      }
    }

    let hasRemaining = false;
    for (const key of Object.keys(buffers)) {
      if (buffers[key as FieldCategory].length > 0) {
        hasRemaining = true;
      }
    }
    if (!hasRemaining) {
      return null;
    }

    if (!lastJson) {
      if (buffers.content) {
        const remaining = buffers.content;
        buffers.content = "";
        return remaining;
      }
      return null;
    }

    const finalJson = JSON.parse(JSON.stringify(lastJson));

    const populateRemaining = (obj: any) => {
      if (!obj || typeof obj !== "object") return;

      // OpenAI CC
      if (obj.choices && Array.isArray(obj.choices)) {
        if (obj.choices.length === 0) obj.choices.push({});
        const choice = obj.choices[0];
        if (!choice.delta) choice.delta = {};
        const delta = choice.delta;
        
        if (buffers.content) {
          delta.content = buffers.content;
          buffers.content = "";
        }
        if (buffers.reasoning) {
          delta.reasoning_content = buffers.reasoning;
          buffers.reasoning = "";
        }
        if (buffers.toolArgs) {
          if (!Array.isArray(delta.tool_calls)) {
            delta.tool_calls = [];
          }
          if (delta.tool_calls.length === 0) {
            delta.tool_calls.push({ function: {} });
          }
          if (!delta.tool_calls[0].function) {
            delta.tool_calls[0].function = {};
          }
          delta.tool_calls[0].function.arguments = buffers.toolArgs;
          buffers.toolArgs = "";
        }
        if (buffers.partialJson) buffers.partialJson = "";
      }

      // Claude
      else if (obj.delta && typeof obj.delta === "object") {
        const delta = obj.delta;
        if (buffers.content) {
          delta.text = buffers.content;
          buffers.content = "";
        }
        if (buffers.reasoning) {
          delta.thinking = buffers.reasoning;
          buffers.reasoning = "";
        }
        if (buffers.partialJson) {
          delta.partial_json = buffers.partialJson;
          buffers.partialJson = "";
        }
        if (buffers.toolArgs) buffers.toolArgs = "";
      }

      // Responses API
      else if (typeof obj.delta === "string" || typeof obj.item?.arguments === "string") {
        if (buffers.content) {
          obj.delta = buffers.content;
          buffers.content = "";
        }
        if (buffers.toolArgs) {
          if (!obj.item) obj.item = {};
          obj.item.arguments = buffers.toolArgs;
          buffers.toolArgs = "";
        }
        if (buffers.reasoning) buffers.reasoning = "";
        if (buffers.partialJson) buffers.partialJson = "";
      }

      // Gemini
      else if (Array.isArray(obj.candidates)) {
        if (obj.candidates.length === 0) obj.candidates.push({});
        const cand = obj.candidates[0];
        if (!cand.content) cand.content = {};
        if (!Array.isArray(cand.content.parts)) cand.content.parts = [];
        if (cand.content.parts.length === 0) cand.content.parts.push({});
        
        if (buffers.content) {
          cand.content.parts[0].text = buffers.content;
          buffers.content = "";
        }
        if (buffers.reasoning) buffers.reasoning = "";
        if (buffers.toolArgs) buffers.toolArgs = "";
        if (buffers.partialJson) buffers.partialJson = "";
      }

      // Generic
      else if (typeof obj.content === "string" || typeof obj.text === "string" || buffers.content) {
        if (buffers.content) {
          if (typeof obj.content === "string") obj.content = buffers.content;
          else if (typeof obj.text === "string") obj.text = buffers.content;
          else obj.content = buffers.content;
          buffers.content = "";
        }
        if (buffers.reasoning) buffers.reasoning = "";
        if (buffers.toolArgs) {
          if (obj.item && typeof obj.item === "object") obj.item.arguments = buffers.toolArgs;
          else if (typeof obj.arguments === "string" || !obj.arguments) obj.arguments = buffers.toolArgs;
          buffers.toolArgs = "";
        }
        if (buffers.partialJson) buffers.partialJson = "";
      }
    };

    populateRemaining(finalJson);
    buffers.content = "";
    buffers.reasoning = "";
    buffers.toolArgs = "";
    buffers.partialJson = "";
    return finalJson;
  };

  return createSseTextTransform(processor, onFlush);
}
