/**
 * Antigravity IDE handler.
 *
 * Antigravity (the Gemini-based IDE) sends requests in native Gemini
 * GenerateContent format (`contents`, `systemInstruction`, `generationConfig`,
 * `thinkingConfig`, …). The OmniRoute router endpoint `/v1/chat/completions`
 * expects OpenAI Chat Completions format, so the raw Gemini body must be
 * converted before forwarding — otherwise the unknown fields are either
 * ignored or cause upstream providers to return a 400 "invalid argument"
 * error (especially with thinking-capable models such as
 * `ag/claude-opus-4-6-thinking`).
 *
 * Pipeline:
 *   - parse the incoming Gemini JSON body,
 *   - convert it to an OpenAI chat.completions body (model = mapped model),
 *   - forward to `/v1/chat/completions` on the OmniRoute router,
 *   - pipe the SSE response back to the IDE.
 *
 * Non-regressive: any change here must keep the Antigravity flow working as
 * before (see `tests/unit/mitm-handler-antigravity.test.ts`).
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import type { AgentId } from "../types";
import { MitmHandlerBase } from "./base";

interface GeminiPart {
  text?: string;
}

interface GeminiContent {
  role?: string;
  parts?: GeminiPart[];
}

interface GeminiGenerationConfig {
  maxOutputTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
}

interface GeminiRequestBody {
  systemInstruction?: GeminiContent;
  contents?: GeminiContent[];
  generationConfig?: GeminiGenerationConfig;
  [key: string]: unknown;
}

interface OpenAIChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIChatBody {
  model: string;
  messages: OpenAIChatMessage[];
  stream: boolean;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stop?: string[];
}

function joinPartsText(parts: GeminiPart[] | undefined): string {
  return (parts || [])
    .map((p) => p.text)
    .filter((t): t is string => Boolean(t))
    .join("\n");
}

/**
 * Convert a Gemini GenerateContent request body to an OpenAI
 * chat.completions body.
 *
 * @param geminiBody parsed Gemini request
 * @param model      resolved OmniRoute model string
 * @param stream     whether the original request was streaming
 */
export function convertGeminiToOpenAI(
  geminiBody: GeminiRequestBody,
  model: string,
  stream: boolean,
): OpenAIChatBody {
  const messages: OpenAIChatMessage[] = [];

  // System instruction
  if (geminiBody.systemInstruction) {
    const systemText = joinPartsText(geminiBody.systemInstruction.parts);
    if (systemText) messages.push({ role: "system", content: systemText });
  }

  // Chat turns
  for (const content of geminiBody.contents || []) {
    const role: OpenAIChatMessage["role"] = content.role === "model" ? "assistant" : "user";
    messages.push({ role, content: joinPartsText(content.parts) });
  }

  const openaiBody: OpenAIChatBody = {
    model,
    messages,
    stream: !!stream,
  };

  const cfg = geminiBody.generationConfig || {};
  if (cfg.maxOutputTokens != null) openaiBody.max_tokens = cfg.maxOutputTokens;
  if (cfg.temperature != null) openaiBody.temperature = cfg.temperature;
  if (cfg.topP != null) openaiBody.top_p = cfg.topP;
  if (cfg.stopSequences?.length) openaiBody.stop = cfg.stopSequences;

  return openaiBody;
}

export class AntigravityHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "antigravity";

  async intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string,
  ): Promise<void> {
    const startedAt = this.now();
    const intercepted = await this.hookBufferStart(req, body, mappedModel);

    try {
      const geminiBody = JSON.parse(body.toString()) as GeminiRequestBody;

      // Streaming intent: Antigravity uses :streamGenerateContent for streaming.
      const isStream = (req.url || "").includes(":streamGenerateContent");

      const payload = convertGeminiToOpenAI(geminiBody, mappedModel, isStream);

      const upstreamStart = this.now();
      const upstream = await this.fetchRouter(payload, "/v1/chat/completions", req.headers);

      if (!upstream.ok) {
        const errText = await upstream.text().catch(() => "");
        throw new Error(`OmniRoute ${upstream.status}: ${errText}`);
      }

      let collected = "";
      await this.pipeSSE(upstream, res, (chunk) => {
        collected += chunk.toString();
      });

      const total = this.now() - startedAt;
      this.hookBufferUpdate(intercepted, {
        status: upstream.status,
        responseHeaders: Object.fromEntries(upstream.headers.entries()),
        responseBody: collected,
        responseSize: Buffer.byteLength(collected),
        proxyLatencyMs: upstreamStart - startedAt,
        upstreamLatencyMs: total - (upstreamStart - startedAt),
      });
    } catch (err) {
      await this.hookBufferError(intercepted, err);
      await this.writeError(res, err);
    }
  }
}
