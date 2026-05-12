/**
 * CLIProxyAPI Executor — routes requests to a local CLIProxyAPI instance.
 *
 * Always uses the OpenAI-compatible /v1/chat/completions endpoint. CLIProxyAPI
 * internally detects Claude models and routes them through its Claude executor
 * with full emulation (CCH signing, billing header, system prompt, uTLS,
 * multi-account rotation, device profile learning, etc.).
 *
 * The UI toggle (cliproxyapiMode in providerSpecificData) controls WHETHER
 * to use CLIProxyAPI as the backend, not the wire format. Response format
 * is always OpenAI-compatible, so chatCore's SSE parsing works unchanged.
 *
 * Activation:
 *   1. Per-provider upstream_proxy_config (mode=cliproxyapi or fallback)
 *   2. Per-connection cliproxyapiMode toggle in providerSpecificData (UI)
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ProviderCredentials,
} from "./base.ts";
import { HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";

const DEFAULT_PORT = 8317;
const DEFAULT_HOST = "127.0.0.1";
const HEALTH_CHECK_TIMEOUT_MS = 5000;

// Anthropic's reserved tool-name namespace: ^mcp_[^_].* triggers their
// server-side MCP connector billing gate, returning a misleading
// "out of extra usage" 400. Two-underscore (mcp__X) and capitalized
// (Mcp_X) variants pass cleanly.
const MCP_RESERVED_PREFIX_RE = /^mcp_(?=[^_])/;

function rewriteMcpToolName(name: string): string | null {
  if (typeof name !== "string" || !MCP_RESERVED_PREFIX_RE.test(name)) return null;
  return "M" + name.slice(1); // mcp_call → Mcp_call
}

/**
 * Rewrite ^mcp_[^_] tool names on a body destined for Anthropic's
 * /v1/messages. Returns a reverse map (rewritten → original) that the SSE
 * response stream uses to restore the client's original names on tool_use
 * blocks coming back.
 *
 * Non-mutating: replaces nested array elements with cloned objects rather
 * than mutating in place, so the caller's input body is not affected. The
 * outer `body` reference itself is the cloned `transformed` object from
 * `transformRequest` — we mutate its top-level `tools`, `messages`, and
 * `tool_choice` properties to point at the new clones.
 */
function applyMcpToolNameRewrite(body: Record<string, unknown>): Map<string, string> {
  const reverseMap = new Map<string, string>();
  const remember = (original: string, rewritten: string) => {
    reverseMap.set(rewritten, original);
  };

  const tools = body.tools;
  if (Array.isArray(tools)) {
    body.tools = tools.map((tool) => {
      if (!tool || typeof tool !== "object") return tool;
      const t = tool as Record<string, unknown>;
      const original = typeof t.name === "string" ? t.name : "";
      const rewritten = rewriteMcpToolName(original);
      if (rewritten) {
        remember(original, rewritten);
        return { ...t, name: rewritten };
      }
      return tool;
    });
  }

  const messages = body.messages;
  if (Array.isArray(messages)) {
    body.messages = messages.map((msg) => {
      if (!msg || typeof msg !== "object") return msg;
      const m = msg as Record<string, unknown>;
      const content = m.content;
      if (!Array.isArray(content)) return msg;
      let mutated = false;
      const newContent = content.map((block) => {
        if (!block || typeof block !== "object") return block;
        const b = block as Record<string, unknown>;
        if (b.type !== "tool_use") return block;
        const original = typeof b.name === "string" ? b.name : "";
        const rewritten = rewriteMcpToolName(original);
        if (rewritten) {
          mutated = true;
          remember(original, rewritten);
          return { ...b, name: rewritten };
        }
        return block;
      });
      return mutated ? { ...m, content: newContent } : msg;
    });
  }

  const toolChoice = body.tool_choice;
  if (toolChoice && typeof toolChoice === "object") {
    const tc = toolChoice as Record<string, unknown>;
    if (tc.type === "tool" && typeof tc.name === "string") {
      const rewritten = rewriteMcpToolName(tc.name);
      if (rewritten) {
        const original = tc.name;
        body.tool_choice = { ...tc, name: rewritten };
        remember(original, rewritten);
      }
    }
  }

  return reverseMap;
}

function resolveCliproxyapiBaseUrl(): string {
  const host = process.env.CLIPROXYAPI_HOST || DEFAULT_HOST;
  const port = parseInt(process.env.CLIPROXYAPI_PORT || String(DEFAULT_PORT), 10);
  return `http://${host}:${port}`;
}

export { resolveCliproxyapiBaseUrl };

/**
 * Check if a connection has CLIProxyAPI deep mode enabled via UI toggle.
 * Used by chatCore's resolveExecutorWithProxy to decide routing.
 */
export function isCliproxyapiDeepModeEnabled(
  providerSpecificData?: Record<string, unknown> | null
): boolean {
  return providerSpecificData?.cliproxyapiMode === "claude-native";
}

export class CliproxyapiExecutor extends BaseExecutor {
  private readonly upstreamBaseUrl: string;

  constructor(baseUrl?: string) {
    const effectiveBase = baseUrl ?? resolveCliproxyapiBaseUrl();
    super("cliproxyapi", {
      id: "cliproxyapi",
      baseUrl: effectiveBase + "/v1/chat/completions",
      headers: { "Content-Type": "application/json" },
    });
    this.upstreamBaseUrl = effectiveBase;
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    _credentials: ProviderCredentials | null = null
  ): string {
    // Default endpoint when called without body context (kept for back-compat).
    // execute() picks the right endpoint from the body shape; see selectEndpoint().
    return `${this.upstreamBaseUrl}/v1/chat/completions`;
  }

  /**
   * Returns true when the body matches the Anthropic Messages wire shape.
   *
   * chatCore detects target=claude when the request comes from a Claude-source
   * client (`/v1/messages`, Anthropic-version header, claude/* model). In that
   * case no openai translation is applied and the executor sees the original
   * Anthropic body: top-level `system` as an array of content blocks, and
   * `messages[].content` as arrays. Routing those bodies to CPA's
   * /v1/chat/completions causes CPA to emit OpenAI-style SSE chunks, which
   * Anthropic SDK clients (Capy, claude-cli, etc.) cannot parse — the result
   * looks like a 200 server-side with "0 chunks received" client-side.
   *
   * CPA exposes /v1/messages natively (claude executor with uTLS spoof,
   * billing header, CCH signing, etc.) and emits proper Anthropic SSE:
   * `event: message_start`, `content_block_delta`, etc.
   */
  private isAnthropicShape(body: unknown): boolean {
    if (!body || typeof body !== "object") return false;
    const b = body as Record<string, unknown>;
    // Strong signal: top-level `system` field is unique to the Anthropic
    // Messages API. OpenAI Chat Completions encodes system as a role:"system"
    // entry inside messages[], not at body level. Accept both string and
    // array-of-content-blocks forms (Anthropic supports both per the docs).
    if (b.system !== undefined) return true;
    // Strong signal: top-level `thinking` field is Anthropic-only. OpenAI
    // uses `reasoning` / `reasoning_effort`. Even adaptive/raw Capy shapes
    // emit thinking, so this catches minimal Capy bodies (string content,
    // no system block) that would otherwise miss the messages[0].content
    // array check below.
    if (b.thinking !== undefined) return true;
    // Strong signal: top-level `metadata.user_id` is the CC wire-image
    // identifier; OpenAI request bodies don't carry it.
    if (
      b.metadata &&
      typeof b.metadata === "object" &&
      (b.metadata as Record<string, unknown>).user_id !== undefined
    )
      return true;
    // Strong signal: messages[0].content is an array of Anthropic content blocks
    const msgs = b.messages;
    if (Array.isArray(msgs) && msgs.length > 0) {
      const first = msgs[0] as Record<string, unknown>;
      if (Array.isArray(first?.content)) return true;
    }
    return false;
  }

  private selectEndpoint(body: unknown): string {
    return this.isAnthropicShape(body) ? "/v1/messages" : "/v1/chat/completions";
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = true): Record<string, string> {
    const key = credentials?.apiKey || credentials?.accessToken;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (key) {
      headers["Authorization"] = `Bearer ${key}`;
    }
    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(
    model: string,
    body: unknown,
    _stream: boolean,
    _credentials: ProviderCredentials | null
  ): unknown {
    if (!body || typeof body !== "object") return body;

    const transformed = { ...(body as Record<string, unknown>) };
    if (transformed.model !== model) {
      transformed.model = model;
    }

    // For Anthropic-shape bodies routed to CPA's /v1/messages, strip the
    // Capy/Anthropic-SDK premium extras that Anthropic gates with
    // "Extra usage is required" / "out of extra usage" (400). CPA does its
    // own Claude Code wire-image cloak (CCH, billing header, uTLS, metadata
    // user_id, system sentinel) downstream — but it forwards client extras
    // like output_config.effort=xhigh which trigger the extras-billing gate.
    //
    // Mirrors the runtime "Patch I2/I4" effect previously applied via patch.mjs.
    // Strips are no-op when fields are absent (OpenAI-shape passthrough).
    if (this.isAnthropicShape(transformed)) {
      delete transformed.output_config;
      delete transformed.context_management;
      delete transformed.client_info;
      delete transformed.prompt_cache_key;
      delete transformed.safety_identifier;
      delete transformed.metadata;

      // Conditional thinking strip: preserve Anthropic-valid shapes
      // ({type:"enabled"|"disabled", budget_tokens:N}) that applyThinkingBudget
      // already normalized. Strip non-Anthropic shapes (e.g. Capy's
      // {type:"adaptive", display:"summarized"}) which trigger Anthropic 400
      // "Extra usage required" / "out of extra usage". The `display` field is
      // a Capy-specific hint Anthropic doesn't accept.
      const thinking = transformed.thinking;
      if (thinking && typeof thinking === "object") {
        const t = thinking as Record<string, unknown>;
        const validType = t.type === "enabled" || t.type === "disabled";
        const hasValidBudget = typeof t.budget_tokens === "number" && t.budget_tokens >= 0;
        const hasInvalidExtras = "display" in t;
        if (!validType || !hasValidBudget || hasInvalidExtras) {
          delete transformed.thinking;
        }
      }

      // Rewrite tool names matching Anthropic's reserved ^mcp_[^_] namespace.
      // Anthropic returns "out of extra usage" / "Extra usage required" 400
      // when a client-declared tool name collides with their server-side MCP
      // connector tools. Bisected character-by-character against the real
      // Anthropic API via CPA (uTLS spoof, Claude OAuth):
      //   mcp_call, mcp_query, mcp_x, mcp_test  → 400 (gate hit)
      //   Mcp_call, _mcp_call, mcp__call, mcp-call, mcpcall, my_mcp_call → 200
      // The "Mcp_" capitalization is the smallest stable rewrite that
      // preserves readability. The reverse map below is propagated to
      // chatCore via body._toolNameMap, which the SSE passthrough stream
      // uses (utils/stream.ts:restoreClaudePassthroughToolUseName) to
      // rewrite tool_use.name back to the client's original namespace on
      // the response side. Capy sees mcp_call back in tool_use blocks.
      const toolNameMap = applyMcpToolNameRewrite(transformed);
      if (toolNameMap.size > 0) {
        transformed._toolNameMap = toolNameMap;
      }
    }

    return transformed;
  }

  async execute(input: {
    model: string;
    body: unknown;
    stream: boolean;
    credentials: ProviderCredentials;
    signal?: AbortSignal | null;
    log?: any;
    upstreamExtraHeaders?: Record<string, string> | null;
  }) {
    const endpoint = this.selectEndpoint(input.body);
    const url = `${this.upstreamBaseUrl}${endpoint}`;
    const shape = endpoint === "/v1/messages" ? "anthropic" : "openai";
    const headers = this.buildHeaders(input.credentials, input.stream);
    const transformedBody = this.transformRequest(
      input.model,
      input.body,
      input.stream,
      input.credentials
    );
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders);

    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;

    input.log?.info?.("CPA", `CLIProxyAPI → ${url} (model: ${input.model}, shape: ${shape})`);

    // _toolNameMap is an in-memory channel to chatCore for response-side
    // tool name restoration; never send it over the wire.
    const wireBody =
      transformedBody && typeof transformedBody === "object"
        ? JSON.stringify(transformedBody, (key, value) =>
            key === "_toolNameMap" ? undefined : value
          )
        : JSON.stringify(transformedBody);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: wireBody,
      signal: combinedSignal,
    });

    if (response.status === HTTP_STATUS.RATE_LIMITED) {
      input.log?.warn?.("CPA", `CLIProxyAPI rate limited: ${response.status}`);
    }

    return { response, url, headers, transformedBody };
  }

  /**
   * Health check — verifies CLIProxyAPI is reachable.
   *
   * CPA 6.x doesn't expose a /health endpoint; previously we hit /health
   * and got 404, which made the dashboard report "CLIProxyAPI not
   * detected" even when the service was up and successfully serving
   * /v1/messages. Probe /v1/models instead (returns 200 with the
   * advertised model list), which is the closest thing CPA has to a
   * liveness probe and works on every CPA version we've tested.
   */
  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
    const start = Date.now();
    try {
      const res = await fetch(`${this.upstreamBaseUrl}/v1/models`, {
        signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS),
      });
      return {
        ok: res.ok,
        latencyMs: Date.now() - start,
        ...(!res.ok ? { error: `HTTP ${res.status}` } : {}),
      };
    } catch (err) {
      return {
        ok: false,
        latencyMs: Date.now() - start,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }
}

export default CliproxyapiExecutor;
