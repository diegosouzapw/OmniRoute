/**
 * Build the sampling-parameter prefix the Python proxy prepends to user_input.
 * Keeps the exact phrasing the upstream proxy uses so the model sees a familiar
 * shape and a fixed-style answer.
 */
export function buildSamplingPrefix(body: Record<string, unknown>): string {
  const hints = [
    hintTemperature(body.temperature),
    hintTopP(body.top_p),
    hintMaxTokens(body.max_tokens),
    hintFrequencyPenalty(body.frequency_penalty),
    hintPresencePenalty(body.presence_penalty),
    hintSeed(body.seed),
    ...hintResponseFormat(body.response_format),
    hintStop(body.stop),
  ].filter((h): h is string => Boolean(h));
  return hints.length > 0 ? `${hints.join(" ")}\n\n` : "";
}

function hintTemperature(temp: unknown): string | null {
  if (typeof temp !== "number" || !Number.isFinite(temp)) return null;
  const tag =
    temp < 0.5
      ? "be focused and deterministic"
      : temp > 1.2
        ? "be creative and varied"
        : "balance focus and creativity";
  return `(temperature=${temp}: ${tag})`;
}

function hintTopP(topP: unknown): string | null {
  if (typeof topP !== "number" || !Number.isFinite(topP)) return null;
  const tag = topP < 0.5 ? "stick to highest-probability responses" : "consider diverse options";
  return `(top_p=${topP}: ${tag})`;
}

function hintMaxTokens(maxTokens: unknown): string | null {
  if (typeof maxTokens !== "number" || !Number.isFinite(maxTokens)) return null;
  return `(max_tokens=${maxTokens}: keep response under ~${maxTokens} tokens)`;
}

function hintFrequencyPenalty(freqPenalty: unknown): string | null {
  if (typeof freqPenalty !== "number" || freqPenalty === 0) return null;
  const tag = freqPenalty > 0 ? "reduce repetition of frequent tokens" : "encourage repetition";
  return `(frequency_penalty=${freqPenalty}: ${tag})`;
}

function hintPresencePenalty(presPenalty: unknown): string | null {
  if (typeof presPenalty !== "number" || presPenalty === 0) return null;
  const tag = presPenalty > 0 ? "encourage new topics, reduce repetition" : "stay on topic";
  return `(presence_penalty=${presPenalty}: ${tag})`;
}

function hintSeed(seed: unknown): string | null {
  if (typeof seed !== "number" || !Number.isFinite(seed)) return null;
  return `(seed=${seed}: be as deterministic as possible)`;
}

function hintResponseFormat(responseFormat: unknown): string[] {
  if (!responseFormat || typeof responseFormat !== "object") return [];
  const fmt = responseFormat as Record<string, unknown>;
  if (fmt.type === "json_object") {
    return [
      "(response_format=json_object: you MUST respond with ONLY valid JSON, no markdown, no explanation, just the JSON object)",
    ];
  }
  if (fmt.type !== "json_schema") return [];
  return hintJsonSchema(fmt);
}

function hintJsonSchema(fmt: Record<string, unknown>): string[] {
  const schema =
    fmt.json_schema && typeof fmt.json_schema === "object"
      ? (fmt.json_schema as Record<string, unknown>).schema
      : null;
  if (!schema) return [];
  try {
    const schemaStr = JSON.stringify(schema);
    const preview = schemaStr.length > 500 ? `${schemaStr.slice(0, 500)}...` : schemaStr;
    return [
      "(response_format=json_schema: you MUST respond with ONLY valid JSON matching this schema, no markdown, no explanation):",
      preview,
    ];
  } catch {
    return [];
  }
}

function hintStop(stop: unknown): string | null {
  if (Array.isArray(stop) && stop.length > 0) {
    const joined = stop.filter((s) => typeof s === "string" || typeof s === "number").join(" / ");
    if (joined) return `(stop: end your response before any of these sequences: ${joined})`;
    return null;
  }
  if (typeof stop === "string" && stop) return `(stop: end your response before: ${stop})`;
  return null;
}
