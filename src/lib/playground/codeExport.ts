// src/lib/playground/codeExport.ts
import { z } from "zod";

/**
 * Endpoint suportado pelo Playground Studio. Reflete os 13 endpoints da API OmniRoute
 * consumíveis pelas tabs Chat/Compare/Build/Search/Scrape via Export Code.
 *
 * D4-rev2 (2026-05-28): contrato expandido de 10 → 13 incluindo `responses`, `video`,
 * `music` para refletir a API real (`/v1/responses`, `/v1/videos/generations`,
 * `/v1/music/generations`). A tab API (Monaco editor) mantém seu próprio sistema
 * de endpoint values (D14) e não consome este type.
 */
export type PlaygroundEndpoint =
  | "chat.completions"
  | "responses"
  | "completions"
  | "embeddings"
  | "images"
  | "audio.transcriptions"
  | "audio.speech"
  | "video"
  | "music"
  | "moderations"
  | "rerank"
  | "search"
  | "web.fetch";

/** Linguagens de export suportadas. */
export type ExportLanguage = "curl" | "python" | "typescript";

/** Mensagem chat single-turn ou multi-turn. */
export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | Array<{ type: string; [k: string]: unknown }>;
  name?: string;
  tool_call_id?: string;
}

/** Tool definition no formato OpenAI Function Calling. */
export interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters: Record<string, unknown>;
  };
}

/** Estado completo capturável pelo Playground (subset de campos por endpoint). */
export interface PlaygroundState {
  endpoint: PlaygroundEndpoint;
  baseUrl: string; // ex.: "http://localhost:20128"
  model?: string; // não aplicável a web.fetch
  systemPrompt?: string;
  messages?: ChatMessage[]; // chat/completions
  prompt?: string; // completions/embeddings
  query?: string; // search/rerank
  url?: string; // web.fetch
  params?: Partial<{
    temperature: number;
    max_tokens: number;
    top_p: number;
    presence_penalty: number;
    frequency_penalty: number;
    seed: number;
    stop: string | string[];
    response_format: { type: "text" | "json_object" | "json_schema"; json_schema?: unknown };
  }>;
  tools?: ToolDefinition[];
  stream?: boolean;
  // Search-specific
  searchProvider?: string;
  searchType?: "web" | "news";
  maxResults?: number;
  // Scrape-specific
  fetchProvider?: "firecrawl" | "jina-reader" | "tavily-search";
  fetchFormat?: "markdown" | "html" | "links" | "screenshot";
  fetchDepth?: 0 | 1 | 2;
  // Rerank-specific
  rerankModel?: string;
  documents?: string[];
}

export const PlaygroundStateSchema = z.object({
  endpoint: z.enum([
    "chat.completions",
    "responses",
    "completions",
    "embeddings",
    "images",
    "audio.transcriptions",
    "audio.speech",
    "video",
    "music",
    "moderations",
    "rerank",
    "search",
    "web.fetch",
  ]),
  baseUrl: z.string().min(1),
  model: z.string().optional(),
  systemPrompt: z.string().optional(),
  messages: z.array(z.any()).optional(),
  prompt: z.string().optional(),
  query: z.string().optional(),
  url: z.string().optional(),
  params: z.record(z.string(), z.any()).optional(),
  tools: z.array(z.any()).optional(),
  stream: z.boolean().optional(),
  searchProvider: z.string().optional(),
  searchType: z.enum(["web", "news"]).optional(),
  maxResults: z.number().int().optional(),
  fetchProvider: z.enum(["firecrawl", "jina-reader", "tavily-search"]).optional(),
  fetchFormat: z.enum(["markdown", "html", "links", "screenshot"]).optional(),
  fetchDepth: z.union([z.literal(0), z.literal(1), z.literal(2)]).optional(),
  rerankModel: z.string().optional(),
  documents: z.array(z.string()).optional(),
});

/** Constante: placeholder de API key — NUNCA embutir key real. */
export const API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY";

/**
 * Resolve o path HTTP a partir do endpoint (ex.: "chat.completions" → "/v1/chat/completions").
 * Exportado para reuso em testes.
 */
export function endpointToPath(endpoint: PlaygroundEndpoint): string {
  const map: Record<PlaygroundEndpoint, string> = {
    "chat.completions": "/v1/chat/completions",
    responses: "/v1/responses",
    completions: "/v1/completions",
    embeddings: "/v1/embeddings",
    images: "/v1/images/generations",
    "audio.transcriptions": "/v1/audio/transcriptions",
    "audio.speech": "/v1/audio/speech",
    video: "/v1/videos/generations",
    music: "/v1/music/generations",
    moderations: "/v1/moderations",
    rerank: "/v1/rerank",
    search: "/v1/search",
    "web.fetch": "/v1/web/fetch",
  };
  return map[endpoint];
}

/**
 * Build the request body for a given endpoint+state.
 * Internal helper — returns plain object suitable for JSON.stringify.
 */
function buildBody(state: PlaygroundState): Record<string, unknown> {
  const { endpoint, model, params, tools, stream } = state;

  switch (endpoint) {
    case "chat.completions": {
      let messages: ChatMessage[];
      if (state.messages && state.messages.length > 0) {
        messages = state.messages;
      } else if (state.systemPrompt) {
        messages = [
          { role: "system", content: state.systemPrompt },
          { role: "user", content: state.prompt ?? "Hello!" },
        ];
      } else {
        messages = [{ role: "user", content: state.prompt ?? "Hello!" }];
      }
      const body: Record<string, unknown> = {
        model: model ?? "gpt-4o-mini",
        messages,
        stream: stream ?? false,
      };
      if (params) Object.assign(body, params);
      if (tools && tools.length > 0) body.tools = tools;
      return body;
    }

    case "responses": {
      const body: Record<string, unknown> = {
        model: model ?? "gpt-4o-mini",
        input: state.prompt ?? "Hello!",
        stream: stream ?? false,
      };
      if (state.systemPrompt) body.instructions = state.systemPrompt;
      if (params) Object.assign(body, params);
      if (tools && tools.length > 0) body.tools = tools;
      return body;
    }

    case "completions": {
      const body: Record<string, unknown> = {
        model: model ?? "gpt-3.5-turbo-instruct",
        prompt: state.prompt ?? "Hello,",
        stream: stream ?? false,
      };
      if (params) Object.assign(body, params);
      return body;
    }

    case "embeddings": {
      return {
        model: model ?? "text-embedding-3-small",
        input: state.prompt ?? "Hello world",
      };
    }

    case "images": {
      return {
        model: model ?? "dall-e-3",
        prompt: state.prompt ?? "A beautiful sunset",
        n: 1,
        size: "1024x1024",
      };
    }

    case "audio.transcriptions": {
      // Note: actual usage needs multipart/form-data; shown as JSON for documentation
      return {
        model: model ?? "whisper-1",
        file: "<audio-file-binary>",
        language: "en",
      };
    }

    case "audio.speech": {
      return {
        model: model ?? "tts-1",
        input: state.prompt ?? "Hello, world!",
        voice: "alloy",
      };
    }

    case "video": {
      const body: Record<string, unknown> = {
        model: model ?? "sora-1.0",
        prompt: state.prompt ?? "A cinematic shot of a city at sunset",
      };
      if (params) Object.assign(body, params);
      return body;
    }

    case "music": {
      const body: Record<string, unknown> = {
        model: model ?? "music-1",
        prompt: state.prompt ?? "An upbeat lo-fi instrumental",
      };
      if (params) Object.assign(body, params);
      return body;
    }

    case "moderations": {
      return {
        model: model ?? "text-moderation-latest",
        input: state.prompt ?? "Hello world",
      };
    }

    case "rerank": {
      return {
        model: state.rerankModel ?? model ?? "rerank-english-v3.0",
        query: state.query ?? "search query",
        documents: state.documents ?? ["Document 1 text", "Document 2 text"],
        top_n: 3,
      };
    }

    case "search": {
      const body: Record<string, unknown> = {
        query: state.query ?? "search query",
      };
      if (model) body.model = model;
      if (state.searchProvider) body.provider = state.searchProvider;
      if (state.searchType) body.search_type = state.searchType;
      if (state.maxResults) body.max_results = state.maxResults;
      return body;
    }

    case "web.fetch": {
      const body: Record<string, unknown> = {
        url: state.url ?? "https://example.com",
      };
      if (state.fetchProvider) body.provider = state.fetchProvider;
      if (state.fetchFormat) body.format = state.fetchFormat;
      if (state.fetchDepth != null) body.depth = state.fetchDepth;
      return body;
    }
  }
}

/**
 * Escape a string for safe embedding inside single-quoted shell literals.
 */
function escSingleQuote(s: string): string {
  return s.replace(/'/g, "'\\''");
}

/**
 * Generate curl snippet for a given endpoint.
 */
function buildCurlSnippet(state: PlaygroundState): string {
  const path = endpointToPath(state.endpoint);
  const url = `${state.baseUrl}${path}`;
  const body = buildBody(state);
  const bodyJson = JSON.stringify(body, null, 2);

  const lines: string[] = [
    `# Set your API key: export OMNIROUTE_API_KEY="your-key-here"`,
    `curl -s -X POST \\`,
    `  "${url}" \\`,
    `  -H "Authorization: Bearer ${API_KEY_PLACEHOLDER}" \\`,
    `  -H "Content-Type: application/json" \\`,
    `  -d '${escSingleQuote(JSON.stringify(body))}'`,
  ];

  // Also show pretty body as a comment for readability
  const prettyLines = bodyJson.split("\n");
  const commentBlock = prettyLines.map((l) => `# ${l}`).join("\n");

  return `${lines.join("\n")}\n\n# Request body (pretty-printed for reference):\n${commentBlock}`;
}

/**
 * Generate Python (requests) snippet for a given endpoint.
 */
function buildPythonSnippet(state: PlaygroundState): string {
  const path = endpointToPath(state.endpoint);
  const url = `${state.baseUrl}${path}`;
  const body = buildBody(state);
  const bodyJson = JSON.stringify(body, null, 2);

  const lines: string[] = [
    `# Set your API key: export ${API_KEY_PLACEHOLDER}="your-key-here"`,
    `import os`,
    `import json`,
    `import requests`,
    ``,
    `api_key = os.environ["OMNIROUTE_API_KEY"]`,
    ``,
    `url = "${url}"`,
    `headers = {`,
    `    "Authorization": f"Bearer {api_key}",`,
    `    "Content-Type": "application/json",`,
    `}`,
    ``,
    `data = json.loads("""`,
    bodyJson,
    `""")`,
    ``,
    `response = requests.post(url, headers=headers, json=data)`,
    `print(response.json())`,
  ];

  return lines.join("\n");
}

/**
 * Generate TypeScript (fetch) snippet for a given endpoint.
 */
function buildTypescriptSnippet(state: PlaygroundState): string {
  const path = endpointToPath(state.endpoint);
  const url = `${state.baseUrl}${path}`;
  const body = buildBody(state);
  const bodyJson = JSON.stringify(body, null, 2);

  const lines: string[] = [
    `// Set your API key: export ${API_KEY_PLACEHOLDER}="your-key-here"`,
    `const apiKey = process.env.OMNIROUTE_API_KEY ?? "";`,
    ``,
    `const url = "${url}";`,
    `const body = ${bodyJson};`,
    ``,
    `const response = await fetch(url, {`,
    `  method: "POST",`,
    `  headers: {`,
    `    "Authorization": \`Bearer \${apiKey}\`,`,
    `    "Content-Type": "application/json",`,
    `  },`,
    `  body: JSON.stringify(body),`,
    `});`,
    ``,
    `const data = await response.json();`,
    `console.log(data);`,
  ];

  return lines.join("\n");
}

/**
 * Gera código para uma linguagem específica a partir do estado atual.
 * Sempre usa `API_KEY_PLACEHOLDER` para a API key (D11).
 */
export function exportCode(state: PlaygroundState, language: ExportLanguage): string {
  switch (language) {
    case "curl":
      return buildCurlSnippet(state);
    case "python":
      return buildPythonSnippet(state);
    case "typescript":
      return buildTypescriptSnippet(state);
  }
}

/** Gera os 3 snippets de uma vez (atalho para o ExportCodeModal de UI). */
export function exportAllLanguages(state: PlaygroundState): Record<ExportLanguage, string> {
  return {
    curl: exportCode(state, "curl"),
    python: exportCode(state, "python"),
    typescript: exportCode(state, "typescript"),
  };
}
