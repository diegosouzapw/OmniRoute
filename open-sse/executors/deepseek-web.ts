import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { solveDeepSeekPowAsync } from "../lib/deepseek-pow.ts";

export const DEEPSEEK_WEB_BASE = "https://chat.deepseek.com";
const DEEPSEEK_API_BASE = `${DEEPSEEK_WEB_BASE}/api`;
const COMPLETION_URL = `${DEEPSEEK_API_BASE}/v0/chat/completion`;

const FAKE_HEADERS: Record<string, string> = {
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.9",
  Origin: DEEPSEEK_WEB_BASE,
  Referer: `${DEEPSEEK_WEB_BASE}/`,
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  "X-App-Version": "20241129.1",
  "X-Client-Locale": "en-US",
  "X-Client-Platform": "web",
  "X-Client-Version": "1.8.0",
};

// ── Types ────────────────────────────────────────────────────────────────

interface PowChallenge {
  algorithm: string;
  challenge: string;
  salt: string;
  signature: string;
  difficulty: number;
  expire_at: number;
  expire_after: number;
  target_path: string;
}

interface TokenInfo {
  accessToken: string;
  expiresAt: number;
}

// ── Token cache (keyed by userToken → short-lived access token) ─────────

const tokenCache = new Map<string, TokenInfo>();
const sessionCache = new Map<string, { sessionId: string; createdAt: number }>();

const CACHE_MAX_SIZE = 100;

function evictOldest(cache: Map<string, unknown>): void {
  if (cache.size >= CACHE_MAX_SIZE) {
    const first = cache.keys().next().value;
    if (first) cache.delete(first);
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────

export function extractUserToken(credentials: Record<string, unknown>): string | null {
  const raw = credentials?.apiKey || credentials?.accessToken;
  if (typeof raw !== "string" || raw.length === 0) return null;
  // Handle JSON-wrapped tokens (DeepSeek stores token as {"value":"..."})
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.value === "string") return parsed.value;
  } catch {
    // not JSON, use raw
  }
  return raw;
}

function errorResponse(status: number, message: string, dsCode?: number): Response {
  return new Response(
    JSON.stringify({
      error: { message, type: "upstream_error", code: dsCode ?? `HTTP_${status}` },
    }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

function resolveModelOptions(
  model?: string,
  bodyObj?: Record<string, unknown>
): {
  modelType: string;
  thinkingEnabled: boolean;
  searchEnabled: boolean;
} {
  const m = (model || "").toLowerCase();
  const modelType = m.includes("pro") || m.includes("expert") ? "expert" : "default";
  const thinkingEnabled =
    m.includes("r1") ||
    m.includes("think") ||
    m.includes("reason") ||
    bodyObj?.thinking_enabled === true ||
    bodyObj?.thinking === true ||
    !!bodyObj?.reasoning_effort;
  const searchEnabled =
    m.includes("search") ||
    bodyObj?.search_enabled === true ||
    bodyObj?.search === true ||
    bodyObj?.web_search === true;
  return { modelType, thinkingEnabled, searchEnabled };
}

function generateFakeCookie(): string {
  const ts = Date.now();
  const hex = (n: number) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  const uid = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  return `intercom-HWWAFSESTIME=${ts}; HWWAFSESID=${hex(18)}; Hm_lvt_${uid()}=${Math.floor(ts / 1000)}; _frid=${uid()}`;
}

// ── PoW Solver (DeepSeekHashV1) ─────────────────────────────────────────

async function solvePow(challenge: PowChallenge): Promise<string> {
  const answer = await solveDeepSeekPowAsync(
    challenge.algorithm,
    challenge.challenge,
    challenge.salt,
    challenge.difficulty,
    challenge.expire_at
  );
  if (answer < 0) throw new Error("PoW solver failed");
  return Buffer.from(
    JSON.stringify({
      algorithm: challenge.algorithm,
      challenge: challenge.challenge,
      salt: challenge.salt,
      answer,
      signature: challenge.signature,
      target_path: challenge.target_path,
    })
  ).toString("base64");
}

// ── SSE Transform (DeepSeek → OpenAI) ───────────────────────────────────

function isThinkingModel(model: string): boolean {
  const m = model.toLowerCase();
  return m.includes("think") || m.includes("r1") || m.includes("reason");
}

function isSearchModel(model: string): boolean {
  const m = model.toLowerCase();
  return m.includes("search") || m.includes("fold");
}

function cleanDeepSeekToken(text: string): string {
  return text.replace(/FINISHED/g, "").replace(/^(SEARCH|WEB_SEARCH|SEARCHING)\s*/i, "");
}

function formatStreamContent(raw: string, model: string): string {
  let text = cleanDeepSeekToken(raw);
  if (!isSearchModel(model)) return text;
  if (model.toLowerCase().includes("search-silent")) {
    return text.replace(/\[citation:(\d+)\]/g, "");
  }
  return text.replace(/\[citation:(\d+)\]/g, "[$1]");
}

interface DeepSeekSearchResult {
  cite_index?: number;
  title?: string;
  url?: string;
}

function appendSearchCitations(searchResults: DeepSeekSearchResult[], model: string): string {
  if (searchResults.length === 0 || model.toLowerCase().includes("search-silent")) {
    return "";
  }
  return searchResults
    .filter((r) => r.cite_index)
    .sort((a, b) => (a.cite_index || 0) - (b.cite_index || 0))
    .map((r) => `[${r.cite_index}]: [${r.title}](${r.url})`)
    .join("\n");
}

function transformSSE(deepseekStream: ReadableStream, model: string): ReadableStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const streamModel = model || "deepseek-web";
  const id = `chatcmpl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const created = Math.floor(Date.now() / 1000);
  let emittedRole = false;
  let currentPath: "thinking" | "content" | "" = "";
  const thinkingModel = isThinkingModel(streamModel);
  const searchResults: DeepSeekSearchResult[] = [];

  return new ReadableStream({
    async start(controller) {
      const reader = deepseekStream.getReader();
      let buffer = "";

      const emit = (obj: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      const chunk = (delta: object, finish?: string) => {
        emit({
          id,
          object: "chat.completion.chunk",
          created,
          model: streamModel,
          choices: [{ index: 0, delta, finish_reason: finish ?? null }],
        });
      };

      const ensureRole = () => {
        if (!emittedRole) {
          emittedRole = true;
          chunk({ role: "assistant", content: "" });
        }
      };

      const finishStream = () => {
        const citations = appendSearchCitations(searchResults, streamModel);
        if (citations) {
          ensureRole();
          chunk({ content: `\n\n${citations}` });
        }
        ensureRole();
        chunk({}, "stop");
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      };

      const sendByPath = (raw: string) => {
        const text = formatStreamContent(raw, streamModel);
        if (!text) return;
        ensureRole();
        let path = currentPath;
        if (!path && thinkingModel) path = "thinking";
        else if (!path && isSearchModel(streamModel)) path = "content";
        if (path === "thinking") {
          chunk({ reasoning_content: text });
        } else {
          chunk({ content: text });
        }
      };

      const applyFragmentType = (frag: any) => {
        const type = String(frag?.type || "").toUpperCase();
        if (type === "THINK") currentPath = "thinking";
        else if (type === "ANSWER" || type === "RESPONSE") currentPath = "content";
      };

      const handleFragment = (frag: any, setPathFromType = false) => {
        if (setPathFromType) applyFragmentType(frag);
        if (typeof frag?.content !== "string" || frag.content.length === 0) return;
        if (!setPathFromType) {
          const type = String(frag?.type || "").toUpperCase();
          if (type === "THINK") currentPath = "thinking";
          else if (type === "ANSWER" || type === "RESPONSE") currentPath = "content";
        }
        sendByPath(frag.content);
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ") && !line.startsWith("data:")) continue;
            const payload = line.replace(/^data:\s*/, "").trim();

            if (payload === "[DONE]") {
              finishStream();
              return;
            }

            let data: Record<string, unknown>;
            try {
              data = JSON.parse(payload);
            } catch {
              continue;
            }

            const p = (data as any)?.p;
            const o = (data as any)?.o;
            const v = (data as any)?.v;

            if (v && typeof v === "object" && v.response) {
              if (v.response.thinking_enabled === true) currentPath = "thinking";
              else if (v.response.thinking_enabled === false) currentPath = "content";
              const fragments = v.response.fragments;
              if (Array.isArray(fragments)) {
                for (const frag of fragments) handleFragment(frag, false);
              }
            }

            if (p === "response/fragments") {
              if (Array.isArray(v)) {
                for (const frag of v) handleFragment(frag, true);
              } else if (v && typeof v === "object") {
                handleFragment(v, true);
              }
            }

            if (p === "response" && Array.isArray(v)) {
              for (const entry of v) {
                if (entry?.p === "response" && entry?.v?.thinking_enabled === true) {
                  currentPath = "thinking";
                }
              }
            }

            if (p === "response/search_status") continue;

            if (p === "response/search_results" && Array.isArray(v)) {
              if (o !== "BATCH") {
                searchResults.length = 0;
                searchResults.push(...v);
              } else {
                for (const op of v) {
                  const match = String(op?.p || "").match(/^(\d+)\/cite_index$/);
                  if (match) {
                    const index = parseInt(match[1], 10);
                    if (searchResults[index]) searchResults[index].cite_index = op.v;
                  }
                }
              }
              continue;
            }

            if (typeof v === "string") {
              sendByPath(v);
            } else if (Array.isArray(v) && p === "response") {
              for (const entry of v) {
                if (Array.isArray(entry?.v)) {
                  const joined = entry.v.map((item: any) => item?.content || "").join("");
                  if (joined) sendByPath(joined);
                }
              }
            }

            // Do not close on FINISHED — DeepSeek may still send search_results afterward.
            if (p === "response/status" && v === "FINISHED") {
              continue;
            }
          }
        }
      } catch (err) {
        controller.error(err);
        return;
      }

      finishStream();
    },
  });
}

async function collectSSEContent(
  deepseekStream: ReadableStream,
  model: string
): Promise<{ content: string; reasoningContent: string }> {
  const decoder = new TextDecoder();
  const reader = deepseekStream.getReader();
  let buffer = "";
  let content = "";
  let reasoningContent = "";
  let currentPath: "thinking" | "content" | "" = "";
  const streamModel = model || "deepseek-web";
  const thinkingModel = isThinkingModel(streamModel);
  const searchResults: DeepSeekSearchResult[] = [];

  const appendByPath = (raw: string) => {
    const text = formatStreamContent(raw, streamModel);
    if (!text) return;
    let path = currentPath;
    if (!path && thinkingModel) path = "thinking";
    else if (!path && isSearchModel(streamModel)) path = "content";
    if (path === "thinking") reasoningContent += text;
    else content += text;
  };

  const applyFragmentType = (frag: any) => {
    const type = String(frag?.type || "").toUpperCase();
    if (type === "THINK") currentPath = "thinking";
    else if (type === "ANSWER" || type === "RESPONSE") currentPath = "content";
  };

  const handleFragment = (frag: any, setPathFromType = false) => {
    if (setPathFromType) applyFragmentType(frag);
    if (typeof frag?.content !== "string" || frag.content.length === 0) return;
    if (!setPathFromType) {
      const type = String(frag?.type || "").toUpperCase();
      if (type === "THINK") currentPath = "thinking";
      else if (type === "ANSWER" || type === "RESPONSE") currentPath = "content";
    }
    appendByPath(frag.content);
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ") && !line.startsWith("data:")) continue;
      const payload = line.replace(/^data:\s*/, "").trim();
      try {
        const data = JSON.parse(payload);
        const p = data?.p;
        const v = data?.v;

        if (v && typeof v === "object" && v.response) {
          if (v.response.thinking_enabled === true) currentPath = "thinking";
          else if (v.response.thinking_enabled === false) currentPath = "content";
          if (Array.isArray(v.response.fragments)) {
            for (const frag of v.response.fragments) handleFragment(frag, false);
          }
        }

        if (p === "response/fragments") {
          if (Array.isArray(v)) {
            for (const frag of v) handleFragment(frag, true);
          } else if (v && typeof v === "object") {
            handleFragment(v, true);
          }
        }

        if (p === "response" && Array.isArray(v)) {
          for (const entry of v) {
            if (entry?.p === "response" && entry?.v?.thinking_enabled === true) {
              currentPath = "thinking";
            }
          }
        }

        if (p === "response/search_status") continue;

        if (p === "response/search_results" && Array.isArray(v)) {
          if (data?.o !== "BATCH") {
            searchResults.length = 0;
            searchResults.push(...v);
          } else {
            for (const op of v) {
              const match = String(op?.p || "").match(/^(\d+)\/cite_index$/);
              if (match) {
                const index = parseInt(match[1], 10);
                if (searchResults[index]) searchResults[index].cite_index = op.v;
              }
            }
          }
          continue;
        }

        if (typeof v === "string") {
          appendByPath(v);
        } else if (Array.isArray(v) && p === "response") {
          for (const entry of v) {
            if (Array.isArray(entry?.v)) {
              const joined = entry.v.map((item: any) => item?.content || "").join("");
              if (joined) appendByPath(joined);
            }
          }
        }
      } catch {
        // skip
      }
    }
  }

  const citations = appendSearchCitations(searchResults, streamModel);
  if (citations) content += `\n\n${citations}`;

  return { content, reasoningContent };
}

// ── Prompt builder (DeepSeek native format, matches Chat2API) ────────────

function messagesToPrompt(messages: Array<{ role: string; content: string }>): string {
  const extractText = (content: unknown): string => {
    if (Array.isArray(content)) {
      return (content as any[])
        .filter((item: any) => item.type === "text")
        .map((item: any) => item.text)
        .join("\n");
    }
    return String(content || "");
  };

  if (messages.length === 0) return "";

  // Collect system prompt(s) and find the last user message
  const systemParts: string[] = [];
  let lastUserContent = "";
  for (const m of messages) {
    if (m.role === "system") {
      const text = extractText(m.content).trim();
      if (text) systemParts.push(text);
    } else if (m.role === "user") {
      lastUserContent = extractText(m.content).trim();
    }
  }

  const parts: string[] = [];
  if (systemParts.length > 0) {
    parts.push(systemParts.join("\n\n"));
  }
  if (lastUserContent) {
    parts.push(lastUserContent);
  }

  return parts.join("\n\n").replace(/!\[.*?\]\(.*?\)/g, "");
}

// ── DeepSeek API calls (Bearer token auth, like Chat2API) ───────────────

async function acquireAccessToken(
  userToken: string,
  signal?: AbortSignal | null,
  log?: ExecuteInput["log"]
): Promise<string> {
  const cached = tokenCache.get(userToken);
  if (cached && cached.expiresAt > Math.floor(Date.now() / 1000)) {
    return cached.accessToken;
  }

  log?.info?.("DEEPSEEK-WEB", "Acquiring access token from /users/current...");
  const resp = await fetch(`${DEEPSEEK_API_BASE}/v0/users/current`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      ...FAKE_HEADERS,
    },
    signal: signal ?? undefined,
  });

  if (resp.status === 401 || resp.status === 403) {
    throw new Error("Token invalid or expired — get a new userToken from DeepSeek localStorage");
  }
  if (!resp.ok) {
    throw new Error(`users/current HTTP ${resp.status}`);
  }

  const json = await resp.json();
  if (json?.code && json.code !== 0) {
    const errMsg = json.msg || json?.data?.biz_msg || `error code ${json.code}`;
    tokenCache.delete(userToken);
    throw new Error(`DeepSeek rejected token: ${errMsg}`);
  }
  const bizData = json?.data?.biz_data || json?.biz_data;
  if (!bizData?.token) {
    const errMsg = json?.msg || json?.data?.biz_msg || "Unknown error";
    throw new Error(`Failed to acquire token: ${errMsg}`);
  }

  const accessToken = bizData.token;
  evictOldest(tokenCache);
  tokenCache.set(userToken, {
    accessToken,
    expiresAt: Math.floor(Date.now() / 1000) + 3600,
  });

  log?.info?.("DEEPSEEK-WEB", `Access token acquired (${accessToken.length} chars)`);
  return accessToken;
}

function parseDeepSeekErrorPayload(payload: unknown): { code?: number; message: string } | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const codeRaw = record.code;
  const code = typeof codeRaw === "number" ? codeRaw : undefined;
  const msg = record.msg;
  const data = record.data as Record<string, unknown> | undefined;
  const bizMsg = data?.biz_msg;
  const messageRaw = typeof msg === "string" ? msg : typeof bizMsg === "string" ? bizMsg : "";
  if (code !== undefined && code !== 0) {
    return { code, message: messageRaw || `DeepSeek error ${code}` };
  }
  return null;
}

async function createSession(accessToken: string, signal?: AbortSignal | null): Promise<string> {
  const resp = await fetch(`${DEEPSEEK_API_BASE}/v0/chat_session/create`, {
    method: "POST",
    headers: {
      ...FAKE_HEADERS,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Cookie: generateFakeCookie(),
    },
    body: JSON.stringify({}),
    signal: signal ?? undefined,
  });

  if (!resp.ok) throw new Error(`chat_session/create HTTP ${resp.status}`);
  const json = await resp.json();
  const bizData = json?.data?.biz_data || json?.biz_data;
  const id = bizData?.chat_session?.id;
  if (!id) throw new Error(`No session id: code=${json?.code}`);
  return id;
}

async function deleteSessionOnDeepSeek(accessToken: string, sessionId: string): Promise<void> {
  try {
    await fetch(`${DEEPSEEK_API_BASE}/v0/chat_session/delete`, {
      method: "POST",
      headers: {
        ...FAKE_HEADERS,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ chat_session_id: sessionId }),
    });
  } catch {
    // best-effort cleanup
  }
}

function wrapStreamWithCleanup(
  responseStream: ReadableStream,
  cleanup: () => Promise<void>
): ReadableStream {
  const reader = responseStream.getReader();
  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        cleanup().catch(() => {});
        return;
      }
      controller.enqueue(value);
    },
    cancel() {
      reader.cancel();
      cleanup().catch(() => {});
    },
  });
}

async function getPowChallenge(
  accessToken: string,
  signal?: AbortSignal | null
): Promise<PowChallenge> {
  const resp = await fetch(`${DEEPSEEK_API_BASE}/v0/chat/create_pow_challenge`, {
    method: "POST",
    headers: {
      ...FAKE_HEADERS,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ target_path: "/api/v0/chat/completion" }),
    signal: signal ?? undefined,
  });
  if (!resp.ok) throw new Error(`create_pow_challenge HTTP ${resp.status}`);
  const json = await resp.json();
  const bizData = json?.data?.biz_data || json?.biz_data;
  if (!bizData?.challenge?.challenge) throw new Error(`No PoW challenge: code=${json?.code}`);
  return bizData.challenge as PowChallenge;
}

// ── Executor ─────────────────────────────────────────────────────────────

export class DeepSeekWebExecutor extends BaseExecutor {
  constructor() {
    super("deepseek-web", { baseUrl: DEEPSEEK_WEB_BASE });
  }

  async testConnection(
    credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      const userToken = extractUserToken(credentials);
      if (!userToken) return false;
      const accessToken = await acquireAccessToken(userToken, signal);
      return !!accessToken;
    } catch {
      return false;
    }
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    const bodyObj = (body || {}) as Record<string, unknown>;
    const messages = (Array.isArray(bodyObj.messages) ? bodyObj.messages : []) as Array<{
      role: string;
      content: string;
    }>;
    const rawCreds = credentials as unknown as Record<string, unknown>;

    const userToken = extractUserToken(rawCreds);
    if (!userToken) {
      return {
        response: errorResponse(
          400,
          "Invalid credentials: paste your userToken from DeepSeek localStorage " +
            "(DevTools → Application → Local Storage → chat.deepseek.com → userToken)"
        ),
        url: COMPLETION_URL,
        headers: {},
        transformedBody: body,
      };
    }

    const { modelType, thinkingEnabled, searchEnabled } = resolveModelOptions(
      model as string,
      bodyObj
    );

    try {
      let t0 = Date.now();
      const accessToken = await acquireAccessToken(userToken, signal, log);
      log?.info?.("DEEPSEEK-WEB", `Token acquired in ${Date.now() - t0}ms`);

      // Always create a fresh session per request (matches Chat2API behavior).
      // Avoids all stale-session issues when user deletes chats from DeepSeek UI.
      t0 = Date.now();
      const sessionId = await createSession(accessToken, signal);
      log?.info?.("DEEPSEEK-WEB", `Session created in ${Date.now() - t0}ms`);

      t0 = Date.now();
      const powChallenge = await getPowChallenge(accessToken, signal);
      log?.info?.(
        "DEEPSEEK-WEB",
        `PoW challenge fetched in ${Date.now() - t0}ms (difficulty=${powChallenge.difficulty})`
      );
      t0 = Date.now();
      const powAnswer = await solvePow(powChallenge);
      log?.info?.("DEEPSEEK-WEB", `PoW solved in ${Date.now() - t0}ms`);

      const prompt = messagesToPrompt(messages);
      const refFileIds = Array.isArray(bodyObj.ref_file_ids) ? bodyObj.ref_file_ids : [];
      log?.info?.(
        "DEEPSEEK-WEB",
        `model_type=${modelType}, thinking=${thinkingEnabled}, search=${searchEnabled}, files=${refFileIds.length}, stream=${stream !== false}`
      );

      const reqHeaders: Record<string, string> = {
        ...FAKE_HEADERS,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Ds-Pow-Response": powAnswer,
        "X-Client-Timezone-Offset": String(new Date().getTimezoneOffset() * -60),
        Cookie: generateFakeCookie(),
      };

      const requestPayload = {
        chat_session_id: sessionId,
        parent_message_id: null,
        model_type: modelType,
        prompt,
        ref_file_ids: refFileIds,
        thinking_enabled: thinkingEnabled,
        search_enabled: searchEnabled,
        preempt: false,
      };

      t0 = Date.now();
      log?.info?.("DEEPSEEK-WEB", `POST ${COMPLETION_URL}`);
      const resp = await fetch(COMPLETION_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(requestPayload),
        signal: signal ?? undefined,
      });
      log?.info?.(
        "DEEPSEEK-WEB",
        `Completion response in ${Date.now() - t0}ms, status=${resp.status}`
      );

      if (!resp.ok) {
        const status = resp.status;
        let errMsg = `DeepSeek API error (${status})`;
        if (status === 401 || status === 403) {
          tokenCache.delete(userToken);
          errMsg = "DeepSeek token expired — get a fresh userToken from localStorage.";
        } else if (status === 429) {
          errMsg = "DeepSeek rate limited. Wait and retry.";
        }
        log?.warn?.("DEEPSEEK-WEB", errMsg);

        try {
          const errBody = await resp.json();
          if (errBody?.code && errBody.code !== 0) {
            errMsg = `DeepSeek error ${errBody.code}: ${errBody.msg}`;
          }
        } catch {
          /* ignore */
        }

        deleteSessionOnDeepSeek(accessToken, sessionId).catch(() => {});
        return {
          response: errorResponse(status, errMsg),
          url: COMPLETION_URL,
          headers: reqHeaders,
          transformedBody: requestPayload,
        };
      }

      // Check for HTTP 200 with DeepSeek error JSON
      const ct = resp.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        try {
          const json = await resp.json();
          const parsed = parseDeepSeekErrorPayload(json);
          if (parsed) {
            const errMsg = `DeepSeek error ${parsed.code}: ${parsed.message}`;
            log?.warn?.("DEEPSEEK-WEB", errMsg);
            const status = parsed.code === 40003 ? 401 : parsed.code === 40002 ? 429 : 502;
            if (parsed.code === 40003) {
              tokenCache.delete(userToken);
            }
            deleteSessionOnDeepSeek(accessToken, sessionId).catch(() => {});
            return {
              response: errorResponse(status, errMsg, parsed.code),
              url: COMPLETION_URL,
              headers: reqHeaders,
              transformedBody: requestPayload,
            };
          }
          deleteSessionOnDeepSeek(accessToken, sessionId).catch(() => {});
          return {
            response: new Response(JSON.stringify(json), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
            url: COMPLETION_URL,
            headers: reqHeaders,
            transformedBody: requestPayload,
          };
        } catch {
          /* not JSON, continue */
        }
      }

      const cleanupFn = () => deleteSessionOnDeepSeek(accessToken, sessionId);

      const clientModel = typeof model === "string" && model.trim() ? model.trim() : "deepseek-web";

      if (stream !== false) {
        const openaiStream = transformSSE(resp.body!, clientModel);
        const wrappedStream = wrapStreamWithCleanup(openaiStream, cleanupFn);
        return {
          response: new Response(wrappedStream, {
            status: 200,
            headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
          }),
          url: COMPLETION_URL,
          headers: reqHeaders,
          transformedBody: requestPayload,
        };
      }

      const { content, reasoningContent } = await collectSSEContent(resp.body!, clientModel);
      await cleanupFn();
      const message: Record<string, string> = { role: "assistant", content };
      if (reasoningContent) message.reasoning_content = reasoningContent;
      const openaiResponse = {
        id: `chatcmpl-${Date.now()}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: model || modelType,
        choices: [
          {
            index: 0,
            message,
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      };
      return {
        response: new Response(JSON.stringify(openaiResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
        url: COMPLETION_URL,
        headers: reqHeaders,
        transformedBody: requestPayload,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log?.error?.("DEEPSEEK-WEB", `Execute failed: ${msg}`);

      if (err instanceof DOMException && err.name === "AbortError") {
        return {
          response: errorResponse(499, "Request cancelled"),
          url: COMPLETION_URL,
          headers: {},
          transformedBody: body,
        };
      }

      return {
        response: errorResponse(502, `DeepSeek error: ${msg}`),
        url: COMPLETION_URL,
        headers: {},
        transformedBody: body,
      };
    }
  }
}

export const deepseekWebExecutor = new DeepSeekWebExecutor();

// Re-export for auto-refresh executor and tests
export { acquireAccessToken, tokenCache, sessionCache };
