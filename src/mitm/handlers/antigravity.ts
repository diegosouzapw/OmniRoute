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
import type { InterceptedRequest } from "../inspector/types";
import { MitmHandlerBase, createBoundedCollector } from "./base";
import { TOOL_RENAME_MAP } from "@omniroute/open-sse/services/claudeCodeToolRemapper";

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
  /**
   * Antigravity IDE talks to `cloudcode-pa.googleapis.com/v1internal:generateContent`,
   * whose envelope nests the real Gemini request one level down:
   *   `{ project, model, userAgent, requestType, request: { contents, systemInstruction,
   *      generationConfig, … } }`
   * (see `open-sse/translator/request/antigravity-to-openai.ts`). The legacy
   * `/v1beta/models/<model>:generateContent` path instead carries those fields at the top
   * level. We must read whichever level actually holds the conversation (#4294).
   */
  request?: GeminiRequestBody;
  [key: string]: unknown;
}

/**
 * Return the object that actually holds the Gemini conversation fields. Antigravity's
 * cloudcode-pa envelope wraps them under `.request`; the legacy `/v1beta` path puts them at
 * the top level. Without this unwrap, a real Antigravity request yields zero messages, so
 * the upstream gets an empty conversation and the IDE prompt hangs (#4294).
 */
function resolveGeminiSource(body: GeminiRequestBody): GeminiRequestBody {
  const inner = body.request;
  if (
    inner &&
    typeof inner === "object" &&
    ("contents" in inner || "systemInstruction" in inner || "generationConfig" in inner)
  ) {
    return inner;
  }
  return body;
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
  stream: boolean
): OpenAIChatBody {
  // Unwrap the cloudcode-pa envelope (`.request`) used by the real Antigravity IDE; fall
  // back to the top level for the legacy `/v1beta` shape. (#4294)
  const src = resolveGeminiSource(geminiBody);

  const messages: OpenAIChatMessage[] = [];

  // System instruction
  if (src.systemInstruction) {
    const systemText = joinPartsText(src.systemInstruction.parts);
    if (systemText) messages.push({ role: "system", content: systemText });
  }

  // Chat turns
  for (const content of src.contents || []) {
    const role: OpenAIChatMessage["role"] = content.role === "model" ? "assistant" : "user";
    messages.push({ role, content: joinPartsText(content.parts) });
  }

  const openaiBody: OpenAIChatBody = {
    model,
    messages,
    stream: !!stream,
  };

  const cfg = src.generationConfig || {};
  if (cfg.maxOutputTokens != null) openaiBody.max_tokens = cfg.maxOutputTokens;
  if (cfg.temperature != null) openaiBody.temperature = cfg.temperature;
  if (cfg.topP != null) openaiBody.top_p = cfg.topP;
  if (cfg.stopSequences?.length) openaiBody.stop = cfg.stopSequences;

  return openaiBody;
}

export interface DynamicCatalogModel {
  id: string;
  displayName?: string;
  description?: string;
}

/**
 * Merge operator's configured dynamic models/combos into Google Antigravity's
 * fetchAvailableModels response.
 *
 * @param catalog       Raw upstream catalog response from Google Cloud Code PA
 * @param dynamicModels Operator's configured combos/models to inject
 */
export function mergeAntigravityCatalog(
  catalog: Record<string, unknown>,
  dynamicModels: DynamicCatalogModel[]
): Record<string, unknown> {
  if (!dynamicModels || dynamicModels.length === 0) {
    return catalog;
  }

  const result = { ...catalog };
  const injectedIds: string[] = [];

  if (Array.isArray(result.models)) {
    const modelsArr = [...(result.models as Array<Record<string, unknown>>)];
    const templateModel = (modelsArr[0] as Record<string, unknown>) || {};
    for (const m of dynamicModels) {
      if (!m.id) continue;
      // Collision guard: do not overwrite an existing upstream native model
      if (modelsArr.some((existing) => existing.id === m.id || existing.name === m.id)) {
        continue;
      }
      injectedIds.push(m.id);
      modelsArr.push({
        ...templateModel,
        id: m.id,
        name: m.id,
        displayName: m.displayName || m.id,
        descriptionText: m.description || `OmniRoute dynamic model (${m.id})`,
      });
    }
    result.models = modelsArr;
  } else {
    const modelsObj = (
      result.models && typeof result.models === "object"
        ? { ...(result.models as Record<string, unknown>) }
        : {}
    ) as Record<string, Record<string, unknown>>;

    const templateModel =
      modelsObj["claude-sonnet-4-6"] ||
      modelsObj["gemini-2.5-pro"] ||
      modelsObj["gemini-3.7-flash-medium"] ||
      Object.values(modelsObj)[0] ||
      {};

    for (const m of dynamicModels) {
      if (!m.id) continue;
      // Collision guard: do not overwrite an existing upstream native model entry
      if (modelsObj[m.id]) {
        continue;
      }
      injectedIds.push(m.id);
      modelsObj[m.id] = {
        ...templateModel,
        ...(typeof templateModel.id === "string" ? { id: m.id } : {}),
        ...(typeof templateModel.name === "string" ? { name: m.id } : {}),
        displayName: m.displayName || m.id,
        descriptionText: m.description || `OmniRoute dynamic model (${m.id})`,
      };
    }
    result.models = modelsObj;
  }

  // Prepend custom models to agentModelSorts recommended group
  let sorts = Array.isArray(result.agentModelSorts)
    ? [...(result.agentModelSorts as Array<Record<string, unknown>>)]
    : [];

  if (sorts.length === 0) {
    sorts = [{ groups: [{ modelIds: [] }] }];
  }

  const firstSort = { ...(sorts[0] as Record<string, unknown>) };
  let groups = Array.isArray(firstSort.groups)
    ? [...(firstSort.groups as Array<Record<string, unknown>>)]
    : [];
  if (groups.length === 0) {
    groups = [{ modelIds: [] }];
  }

  const firstGroup = { ...(groups[0] as Record<string, unknown>) };
  const existingModelIds = Array.isArray(firstGroup.modelIds)
    ? (firstGroup.modelIds as string[])
    : [];

  firstGroup.modelIds = [
    ...injectedIds,
    ...existingModelIds.filter((id) => !injectedIds.includes(id)),
  ];

  groups[0] = firstGroup;
  firstSort.groups = groups;
  sorts[0] = firstSort;
  result.agentModelSorts = sorts;

  return result;
}

export class AntigravityHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "antigravity";
  private customCatalogModels?: DynamicCatalogModel[];

  constructor(customCatalogModels?: DynamicCatalogModel[]) {
    super();
    this.customCatalogModels = customCatalogModels;
  }

  /**
   * Dynamically retrieve the operator's configured models / combos from the
   * database repository or injected test config.
   */
  async getDynamicCatalogModels(): Promise<DynamicCatalogModel[]> {
    if (this.customCatalogModels) {
      return this.customCatalogModels;
    }
    try {
      const combosMod = await import("@/lib/db/combos").catch(
        () => import("../../lib/db/combos.ts")
      );
      if (typeof combosMod?.getCombos === "function") {
        const combos = await combosMod.getCombos();
        if (Array.isArray(combos)) {
          return (
            combos
              .filter((c: Record<string, unknown>) => c.isActive !== false && !c.isHidden)
              .map((c: Record<string, unknown>) => {
                const name = typeof c.name === "string" ? c.name.trim() : "";
                const desc = typeof c.description === "string" ? c.description.trim() : undefined;
                return name ? { id: name, displayName: name, description: desc } : null;
              })
              // The mapped element is the literal-or-null, not DynamicCatalogModel, so a
              // predicate on it is a TS2677 (#13866). Narrow by the element's own type.
              .filter((c): c is NonNullable<typeof c> => c !== null)
          );
        }
      }
    } catch {
      // Ignored: return empty if DB unavailable
    }
    return [];
  }

  async intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string
  ): Promise<void> {
    const startedAt = this.now();
    const intercepted = await this.hookBufferStart(req, body, mappedModel);

    try {
      const url = req.url || "";
      if (url.includes(":fetchAvailableModels")) {
        await this.interceptFetchAvailableModels(req, res, body, intercepted, startedAt);
        return;
      }

      const geminiBody = JSON.parse(body.toString()) as GeminiRequestBody;

      // Streaming intent: Antigravity uses :streamGenerateContent for streaming.
      const isStream = url.includes(":streamGenerateContent");

      const payload = convertGeminiToOpenAI(geminiBody, mappedModel, isStream);

      const upstreamStart = this.now();
      const upstream = await this.fetchRouter(payload, "/v1/chat/completions", req.headers);

      if (!upstream.ok) {
        const errText = await upstream.text().catch(() => "");
        throw new Error(`OmniRoute ${upstream.status}: ${errText}`);
      }

      const sink = createBoundedCollector();
      await this.pipeSSE(upstream, res, (chunk) => {
        let chunkStr = chunk.toString();
        for (const [lower, capitalized] of Object.entries(TOOL_RENAME_MAP)) {
          chunkStr = chunkStr.replace(
            new RegExp(`"name"\\s*:\\s*"${lower}"`, "g"),
            `"name":"${capitalized}"`
          );
        }
        sink.push(chunkStr);
      });

      const total = this.now() - startedAt;
      this.hookBufferUpdate(intercepted, {
        status: upstream.status,
        responseHeaders: Object.fromEntries(upstream.headers.entries()),
        responseBody: sink.text,
        responseSize: sink.totalBytes,
        proxyLatencyMs: upstreamStart - startedAt,
        upstreamLatencyMs: total - (upstreamStart - startedAt),
      });
    } catch (err) {
      await this.hookBufferError(intercepted, err);
      await this.writeError(res, err);
    }
  }

  private async interceptFetchAvailableModels(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    intercepted: InterceptedRequest,
    startedAt: number
  ): Promise<void> {
    const host =
      (typeof req.headers.host === "string" && req.headers.host) || "cloudcode-pa.googleapis.com";
    const upstreamUrl = `https://${host}${req.url || "/v1internal:fetchAvailableModels"}`;

    const upstreamHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      const lower = key.toLowerCase();
      if (
        lower === "host" ||
        lower === "connection" ||
        lower === "content-length" ||
        lower === "accept-encoding"
      ) {
        continue;
      }
      upstreamHeaders[lower] = Array.isArray(value) ? value.join(", ") : value;
    }
    if (!upstreamHeaders["content-type"]) {
      upstreamHeaders["content-type"] = "application/json";
    }

    const upstreamStart = this.now();
    const upstream = await fetch(upstreamUrl, {
      method: req.method || "POST",
      headers: upstreamHeaders,
      body: body && body.length > 0 ? body.toString() : JSON.stringify({}),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      throw new Error(`Google upstream ${upstream.status}: ${errText}`);
    }

    const rawCatalog = (await upstream.json()) as Record<string, unknown>;
    const dynamicModels = await this.getDynamicCatalogModels();
    const merged = mergeAntigravityCatalog(rawCatalog, dynamicModels);

    const respText = JSON.stringify(merged);
    const responseHeaders: Record<string, string> = {
      "content-type": "application/json; charset=utf-8",
      "content-length": String(Buffer.byteLength(respText)),
    };

    if (!res.headersSent) {
      res.writeHead(upstream.status, responseHeaders);
    }
    res.end(respText);

    const total = this.now() - startedAt;
    this.hookBufferUpdate(intercepted, {
      status: upstream.status,
      responseHeaders,
      responseBody: respText,
      responseSize: Buffer.byteLength(respText),
      proxyLatencyMs: upstreamStart - startedAt,
      upstreamLatencyMs: total - (upstreamStart - startedAt),
    });
  }
}
