export type JsonRecord = Record<string, unknown>;

export type AnthropicTool = {
  name: string;
  description?: string;
  input_schema?: JsonRecord;
};

export type DevinPrompt = {
  text: string;
  tools: AnthropicTool[];
  inputTokensEstimate: number;
  idSeed: string;
};

export type ParsedToolRequest = {
  id: string;
  name: string;
  input: JsonRecord;
};

export type ClaudeResponseArgs = {
  id: string;
  model: string;
  text: string;
  inputTokens: number;
  outputTokens: number;
};

export type ClaudeToolUseArgs = {
  id: string;
  model: string;
  tool: ParsedToolRequest;
  inputTokens: number;
  outputTokens: number;
};

export class DevinAgenticBridgeError extends Error {
  status: number;
  code: string;

  constructor(message: string, code = "devin_agentic_error", status = 400) {
    super(message);
    this.name = "DevinAgenticBridgeError";
    this.code = code;
    this.status = status;
  }
}

export function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}
