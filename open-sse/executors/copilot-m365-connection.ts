/**
 * Microsoft 365 Copilot (individual / Substrate BizChat) connection helpers.
 *
 * Pure URL / credential / prompt builders for the #4042 individual M365 path.
 * Kept transport-free (no BaseExecutor import — only a type import) so they can
 * be unit-tested without the executor's heavy runtime dependency chain. The
 * access_token rides in the WS query string per the protocol, so any logging of
 * the URL MUST go through redactWsUrl().
 */

import { resolvePublicCred } from "../utils/publicCreds.ts";
import { randomUUID, randomBytes } from "node:crypto";
import type { ProviderCredentials } from "./base.ts";

type JsonRecord = Record<string, unknown>;

/** Individual-tier defaults observed in @skyzea1's #4042 capture. */
export const M365_INDIVIDUAL_DEFAULTS = {
  host: "substrate.office.com",
  source: "officeweb",
  product: "Office",
  agentHost: "Bizchat.FullScreen",
  licenseType: "Starter",
  agent: "web",
  scenario: "OfficeWebPaidConsumerCopilot",
} as const;

/**
 * Education "Starter / OfficeWebIncludedCopilot" tier overrides, captured from the
 * official UI in #6210. Differs from the individual tier only by scenario + isEdu;
 * opt-in via `providerSpecificData.tier="edu"` so the individual path is unchanged.
 */
export const M365_EDU_OVERRIDES = {
  scenario: "OfficeWebIncludedCopilot",
  isEdu: "true",
  licenseType: "Starter",
} as const;

/**
 * Enterprise / "work" (Microsoft 365 Copilot for work) tier overrides (#6334). Enterprise
 * tenants ride the `agent="work"` BizChat surface with the `officeweb` scenario and a
 * Premium license. Opt-in via `providerSpecificData.tier="enterprise"` (alias `"work"`) so
 * the individual and EDU paths are unchanged. A raw `providerSpecificData.agent` override is
 * also honored for tenants that need a different agent value.
 */
export const M365_ENTERPRISE_OVERRIDES = {
  agent: "work",
  scenario: "officeweb",
  licenseType: "Premium",
} as const;

export const M365_DEFAULT_VARIANTS = [
  "EnableMcpServerWidgets",
  "feature.EnableMcpServerWidgets",
  "feature.EnableLuForChatCIQ",
  "feature.enableChatCIQPlugin",
  "EnableRequestPlugins",
  "feature.EnableSensitivityLabels",
  "EnableUnsupportedUrlDetector",
  "feature.IsCustomEngineCopilotEnabled",
  "feature.bizchatfluxv3",
  "feature.enablechatpages",
  "feature.enableCodeCanvas",
  "feature.turnOnDARecommendation",
  "feature.IsStreamingModeInChatRequestEnabled",
  "IncludeSourceAttributionsConcise",
  "SkipPublishEmptyMessage",
  "feature.EnableDeduplicatingSourceAttributions",
  "Enable3PActionProgressMessages",
  "feature.enableClientWebRtc",
  "feature.EnableMeetingRecapOfSeriesMeetingWithCiq",
  "feature.cwcfluxv3fe",
  "feature.cwcfluxv3fem",
  "feature.EnableReferencesListCompleteSignal",
  "feature.StorageMessageSplitDisabled",
  "feature.EnableCuaTakeControlApi",
  "SingletonEnvOn",
  "EnableComposeWidget",
  "feature.cwcallowedos",
  "feature.EnableMergingPureDeltas",
  "feature.disabledisallowedmsgs",
  "feature.enableCitationsForSynthesisData",
  "feature.EnableConversationShareApis",
  "feature.enableGenerateGraphicArtOptionsSet",
  "cdximagen",
  "feature.EnableUpdatedUXForConfirmationDialog",
  "feature.EnableContentApiandDocTypeHtmlInRichAnswers",
  "cdxgrounding_api_v2_rich_web_answers_reference_bottom_force",
  "cdxenablerenderforisocomp",
  "feature.EnableClientFileURLSupportForOfficeWebPaidCopilot",
  "feature.EnableDesignEditorImageGrounding",
  "feature.EnableDesignerEditor",
  "feature.EnableSkipRehydrationForSpeCIdImages",
  "feature.EnablePersonalizationForMSA",
  "agt_bizchat_enableRichResponses",
  "feature.EnableBase64DataInMessageAnnotations",
  "feature.EnableSkipEmittingMessageOnFlush",
  "feature.EnableRemoveEmptySourceAttributions",
  "feature.EnableRemoveStreamingMode",
] as const;

export interface M365ConnectionParams {
  host: string;
  chathubPath: string; // "<user-oid>@<tenant-id>"
  accessToken: string;
  variants?: string;
  /** Tier overrides — when unset, buildWsUrl falls back to the individual defaults. */
  scenario?: string;
  isEdu?: string;
  licenseType?: string;
  agent?: string;
  /** Resolved tier name (#7870) — threads into the chat invocation payload, not just the URL. */
  tier?: "edu" | "enterprise";
}

/** A new 32-hex chat session id (== XRoutingParameterSessionKey == clientrequestid). */
export function newChatSessionId(): string {
  return randomBytes(16).toString("hex");
}

function parsePastedCredential(
  raw: string
): Partial<Pick<M365ConnectionParams, "accessToken" | "chathubPath">> {
  const value = raw.trim();
  const parts: Record<string, string> = {};

  for (const segment of value.split(/[;\n]/)) {
    const separator = segment.indexOf("=");
    if (separator <= 0) continue;
    const key = segment.slice(0, separator).trim();
    const partValue = segment.slice(separator + 1).trim();
    if (key && partValue) parts[key] = partValue;
  }

  if (/^wss:\/\/substrate\.office\.com\/m365Copilot\/Chathub\//i.test(value)) {
    try {
      const url = new URL(value);
      parts.access_token ||= url.searchParams.get("access_token") || "";
      parts.chathubPath ||= decodeURIComponent(
        url.pathname.split("/m365Copilot/Chathub/")[1] || ""
      );
    } catch {
      // Keep any key/value fields already parsed from the pasted text.
    }
  }

  return {
    accessToken: parts.access_token || parts.accessToken,
    chathubPath: parts.chathubPath || parts.userTenant,
  };
}

/**
 * Read the pasted credential bits. The individual access_token is opaque (JWE),
 * so it is consumed verbatim. The Chathub path (`user@tenant`) is pasted
 * alongside it because it is not derivable from the opaque token.
 */
export function resolveConnectionParams(
  credentials: ProviderCredentials | undefined
): M365ConnectionParams | { error: string } {
  const psd = (credentials?.providerSpecificData ?? {}) as JsonRecord;
  const parsedApiKey =
    typeof credentials?.apiKey === "string" ? parsePastedCredential(credentials.apiKey) : {};
  // A JWT in credentials.accessToken (3 dot-separated parts — the individual-tier
  // token is an opaque JWE with 5) is the freshest copy: the executor refreshes it
  // in place before resolving params, and the framework mutates it after a refresh.
  const credentialsJwt =
    typeof credentials?.accessToken === "string" && credentials.accessToken.split(".").length === 3
      ? credentials.accessToken
      : "";
  const accessToken =
    credentialsJwt ||
    parsedApiKey.accessToken ||
    (typeof credentials?.apiKey === "string" &&
      credentials.apiKey &&
      !credentials.apiKey.includes("access_token=") &&
      credentials.apiKey) ||
    (typeof psd.accessToken === "string" && psd.accessToken) ||
    (typeof psd.access_token === "string" && psd.access_token) ||
    "";
  if (!accessToken) {
    return { error: "Missing M365 Copilot access_token. Paste it as the provider credential." };
  }
  const chathubPath =
    parsedApiKey.chathubPath ||
    (typeof psd.chathubPath === "string" && psd.chathubPath) ||
    (typeof psd.userTenant === "string" && psd.userTenant) ||
    "";
  if (!chathubPath || !chathubPath.includes("@")) {
    return {
      error:
        "Missing M365 Chathub path. Paste the '<user-oid>@<tenant-id>' segment from the WebSocket URL.",
    };
  }
  const host = (typeof psd.host === "string" && psd.host) || M365_INDIVIDUAL_DEFAULTS.host;
  const variants = typeof psd.variants === "string" && psd.variants ? psd.variants : undefined;

  return { host, chathubPath, accessToken, variants, ...resolveTierOverrides(psd) };
}

/**
 * Resolve tier overrides (opt-in). `tier="edu"|"included"` applies the EDU overrides and
 * `tier="enterprise"|"work"` applies the enterprise/work overrides; individual fields
 * (`scenario`/`isEdu`/`licenseType`/`agent`) can also be overridden directly via
 * providerSpecificData. Unset fields fall back to the individual defaults in buildWsUrl.
 * (#6210, #6334)
 */
function resolveTierOverrides(
  psd: JsonRecord
): Pick<M365ConnectionParams, "scenario" | "isEdu" | "licenseType" | "agent" | "tier"> {
  const tier = typeof psd.tier === "string" ? psd.tier.toLowerCase() : "";
  const isEduTier = tier === "edu" || tier === "included";
  const isEnterpriseTier = tier === "enterprise" || tier === "work";
  const psdIsEdu =
    (typeof psd.isEdu === "string" && psd.isEdu) ||
    (typeof psd.isEdu === "boolean" && String(psd.isEdu)) ||
    undefined;
  return {
    scenario:
      (typeof psd.scenario === "string" && psd.scenario) ||
      (isEduTier ? M365_EDU_OVERRIDES.scenario : undefined) ||
      (isEnterpriseTier ? M365_ENTERPRISE_OVERRIDES.scenario : undefined),
    isEdu: psdIsEdu || (isEduTier ? M365_EDU_OVERRIDES.isEdu : undefined),
    licenseType:
      (typeof psd.licenseType === "string" && psd.licenseType) ||
      (isEduTier ? M365_EDU_OVERRIDES.licenseType : undefined) ||
      (isEnterpriseTier ? M365_ENTERPRISE_OVERRIDES.licenseType : undefined),
    agent:
      (typeof psd.agent === "string" && psd.agent) ||
      (isEnterpriseTier ? M365_ENTERPRISE_OVERRIDES.agent : undefined),
    tier: isEduTier ? "edu" : isEnterpriseTier ? "enterprise" : undefined,
  };
}

/**
 * Build the BizChat WebSocket URL. The access_token rides in the query string
 * (per the protocol), so callers must never log the returned URL verbatim — use
 * redactWsUrl() for any logging.
 */
export function buildWsUrl(params: M365ConnectionParams): string {
  const sessionKey = newChatSessionId();
  const query = new URLSearchParams({
    chatsessionid: sessionKey,
    XRoutingParameterSessionKey: sessionKey,
    clientrequestid: sessionKey,
    "X-SessionId": randomUUID(),
    ConversationId: randomUUID(),
    access_token: params.accessToken,
    variants: params.variants ?? M365_DEFAULT_VARIANTS.join(","),
    source: M365_INDIVIDUAL_DEFAULTS.source,
    product: M365_INDIVIDUAL_DEFAULTS.product,
    agentHost: M365_INDIVIDUAL_DEFAULTS.agentHost,
    licenseType: params.licenseType ?? M365_INDIVIDUAL_DEFAULTS.licenseType,
    isEdu: params.isEdu ?? "false",
    agent: params.agent ?? M365_INDIVIDUAL_DEFAULTS.agent,
    scenario: params.scenario ?? M365_INDIVIDUAL_DEFAULTS.scenario,
  });
  return `wss://${params.host}/m365Copilot/Chathub/${params.chathubPath}?${query.toString()}`;
}

/** Strip the access_token from a WS URL so it is safe to log. */
export function redactWsUrl(wsUrl: string): string {
  return wsUrl.replace(/access_token=[^&]*/i, "access_token=REDACTED");
}

// ── OAuth refresh support (#10718 — client ids observed in the browser token
// and M365-Copilot2API) ────────────────────────────────────────────────────
//
// The browser-issued access_token lives ~75 minutes. These helpers redeem a
// stored refresh_token at the Microsoft identity platform (same public client
// the m365.cloud.microsoft web app uses) so the connection self-heals instead
// of requiring a fresh DevTools capture after every expiry.

/** Public client id observed in both the browser token and M365-Copilot2API. */
export const M365_OAUTH_CLIENT_ID = resolvePublicCred("m365_oauth_client_id");

export const M365_OAUTH_SCOPE =
  "openid profile offline_access https://substrate.office.com/sydney/M365Chat.Read " +
  "https://substrate.office.com/sydney/sydney.readwrite";

/** Refresh lead time — refresh when the current token has less than this left. */
export const M365_REFRESH_LEAD_MS = 5 * 60 * 1000;

type MinimalLog = {
  info?: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
};

/** Decode a JWT payload WITHOUT verification — exp/tid are routing hints, never authz. */
export function decodeJwtClaims(
  token: string
): { exp?: number; tid?: string; oid?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    return payload && typeof payload === "object" ? payload : null;
  } catch {
    return null;
  }
}

/** True when the token is unreadable, already expired, or inside the refresh lead window. */
export function tokenNeedsRefresh(token: string, leadMs = M365_REFRESH_LEAD_MS): boolean {
  const claims = decodeJwtClaims(token);
  if (!claims?.exp) return true;
  return claims.exp * 1000 <= Date.now() + leadMs;
}

/** The freshest readable access token for a connection (JWT column → apiKey → psd). */
export function currentM365AccessToken(credentials: ProviderCredentials | undefined): string {
  if (
    typeof credentials?.accessToken === "string" &&
    credentials.accessToken.split(".").length === 3
  ) {
    return credentials.accessToken;
  }
  if (typeof credentials?.apiKey === "string") {
    const parsed = parsePastedCredential(credentials.apiKey);
    if (parsed.accessToken && parsed.accessToken.split(".").length === 3) return parsed.accessToken;
    // Opaque (JWE) individual-tier token — still a usable credential, just not refreshable.
    return parsed.accessToken || "";
  }
  const psd = (credentials?.providerSpecificData ?? {}) as JsonRecord;
  if (typeof psd.accessToken === "string") return psd.accessToken;
  if (typeof psd.access_token === "string") return psd.access_token;
  return "";
}

/** The chathub path (`<user-oid>@<tenant-id>`) from wherever it is stored. */
export function currentM365ChathubPath(credentials: ProviderCredentials | undefined): string {
  const psd = (credentials?.providerSpecificData ?? {}) as JsonRecord;
  return (
    (typeof credentials?.apiKey === "string"
      ? parsePastedCredential(credentials.apiKey).chathubPath
      : "") ||
    (typeof psd.chathubPath === "string" && psd.chathubPath) ||
    (typeof psd.userTenant === "string" && psd.userTenant) ||
    ""
  );
}

export interface M365RefreshResult {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

/**
 * Redeem the refresh_token (public client — no secret). MS may rotate the
 * refresh_token; callers MUST persist the returned one when present or the
 * token family dies after the first refresh.
 */
export async function refreshM365AccessToken(
  refreshToken: string,
  tid: string,
  log?: MinimalLog
): Promise<M365RefreshResult | { error: string }> {
  const endpoint = `https://login.microsoftonline.com/${tid || "common"}/oauth2/v2.0/token`;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: M365_OAUTH_CLIENT_ID,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        scope: M365_OAUTH_SCOPE,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok || typeof data.access_token !== "string") {
      const error = typeof data.error === "string" ? data.error : `HTTP ${res.status}`;
      log?.warn?.("M365_TOKEN", `refresh_token grant failed: ${error}`);
      return { error };
    }
    log?.info?.("M365_TOKEN", "access token refreshed via refresh_token grant");
    return {
      accessToken: data.access_token,
      refreshToken: typeof data.refresh_token === "string" ? data.refresh_token : undefined,
      expiresIn: typeof data.expires_in === "number" ? data.expires_in : undefined,
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    log?.warn?.("M365_TOKEN", `refresh request failed: ${error}`);
    return { error };
  }
}

/** A client-declared tool, normalized from the OpenAI `tools[]` entry. */
export interface M365ToolSpec {
  name: string;
  description: string;
  parameters: JsonRecord | null;
}

/**
 * Extract `tools` / `tool_choice` from an OpenAI chat-completion body, normalizing
 * function tools into {@link M365ToolSpec}. Non-function tools and entries without
 * a name are dropped (they cannot be expressed in the M365 protocol).
 */
export function extractToolSpec(body: JsonRecord | undefined): {
  tools: M365ToolSpec[];
  toolChoice: unknown;
} {
  const raw = Array.isArray(body?.tools) ? (body!.tools as JsonRecord[]) : [];
  const tools: M365ToolSpec[] = [];
  for (const t of raw) {
    if (t?.type !== "function") continue;
    const fn = (t.function ?? {}) as JsonRecord;
    const name = typeof fn.name === "string" ? fn.name : "";
    if (!name) continue;
    tools.push({
      name,
      description: typeof fn.description === "string" ? fn.description : "",
      parameters:
        fn.parameters && typeof fn.parameters === "object" ? (fn.parameters as JsonRecord) : null,
    });
  }
  return { tools, toolChoice: body?.tool_choice ?? null };
}

/** Compact a tool result before it is folded into the flattened prompt. */
function compactToolResult(text: string, maxChars = 4000): string {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n…[truncated ${text.length - maxChars} chars]`;
}

function messageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    // Multimodal content parts: keep text parts, skip image parts (unsupported here).
    return content
      .map((p) =>
        p && typeof p === "object" && typeof (p as JsonRecord).text === "string"
          ? (p as JsonRecord).text
          : ""
      )
      .filter(Boolean)
      .join("\n");
  }
  return content == null ? "" : JSON.stringify(content);
}

/**
 * Flatten the FULL OpenAI message history into a single bracketed prompt — earlier
 * turns, assistant replies (including `tool_calls`), and tool results, so multi-turn
 * agent loops keep their context. Tool results are compacted via
 * {@link compactToolResult} to keep a long loop from exhausting the turn budget.
 */
export function flattenMessages(body: JsonRecord | undefined): string {
  const messages = (body?.messages as Array<JsonRecord>) || [];
  const parts: string[] = [];
  for (const m of messages) {
    const role = typeof m.role === "string" ? m.role.toLowerCase().trim() : "user";
    const text = messageText(m.content).trim();
    if (Array.isArray(m.tool_calls) && m.tool_calls.length > 0) {
      if (text) parts.push(`[${role}]\n${text}`);
      parts.push(`[${role} tool_calls]\n${JSON.stringify(m.tool_calls)}`);
      continue;
    }
    if (role === "tool") {
      const id = typeof m.tool_call_id === "string" ? m.tool_call_id : "";
      parts.push(`[tool result id=${id}]\n${compactToolResult(text)}`);
      continue;
    }
    if (!text) continue;
    parts.push(`[${role}]\n${text}`);
  }
  return parts.join("\n\n").trim();
}

/**
 * Wrap the flattened prompt in the community M365 tool-calling protocol: definitions
 * inside a `<tools>` block, and the model answering with fenced blocks whose info
 * string is the exact tool name and whose body is a JSON object of arguments.
 * `tool_choice: "none"` keeps the plain prompt (no tool use requested this turn).
 */
function toolProtocolPrompt(text: string, tools: M365ToolSpec[], toolChoice: unknown): string {
  if (tools.length === 0 || toolChoice === "none") {
    return `Please answer the following request in full. Do not truncate or abbreviate your response.\n\n${text}`;
  }
  const defs = tools.map((t) => {
    const params = t.parameters ? JSON.stringify(t.parameters, null, 2) : "{}";
    return `${t.name} — ${t.description}\n\`\`\`${t.name}\n${params}\n\`\`\``;
  });
  return (
    `You are an execution agent operating on behalf of the application that sent this ` +
    `request. The tools below are real, active, and callable right now — they were ` +
    `registered by that application for this conversation. Do not analyze whether tools ` +
    `are registered, available, or permitted: they are. Never state that a tool is ` +
    `unavailable or that you cannot call tools.\n` +
    `When the user's request requires a tool, call it by emitting one or more fenced code ` +
    `blocks. Each block's info string is the exact tool name and its body is a single JSON ` +
    `object of arguments. For independent operations, emit multiple blocks in one response. ` +
    `Do not wrap tool calls in any other structure, and wait for the tool result before ` +
    `claiming completion.\n\n<tools>\n${defs.join("\n\n")}\n</tools>\n\n${text}`
  );
}

/**
 * Flatten OpenAI messages into a single prompt (full history), and — when the
 * client declared `tools` — wrap it in the M365 fenced-block tool protocol so the
 * model's tool calls can be parsed back into OpenAI `tool_calls` downstream.
 */
export function buildPrompt(body: JsonRecord | undefined): string {
  const { tools, toolChoice } = extractToolSpec(body);
  return toolProtocolPrompt(flattenMessages(body), tools, toolChoice);
}

/**
 * Build the ROUTER-planning prompt — the strategy the substrate model actually
 * complies with. Asking it to "use" a client tool gets refused ("not available in
 * this chat environment") because it checks its own plugin registry; asking it to
 * act as a tool-SELECTION assistant that prints a routing decision as plain text
 * (`CALL_TOOL: name({...})` / `NO_TOOL_NEEDED`) bypasses that refusal entirely.
 */
export function buildRouterPrompt(
  text: string,
  tools: M365ToolSpec[],
  toolChoice: unknown
): string {
  const defs = JSON.stringify(
    tools.map((t) => ({
      type: "function",
      function: { name: t.name, description: t.description, parameters: t.parameters ?? {} },
    }))
  );
  const choice =
    typeof toolChoice === "string" && toolChoice !== "auto" && toolChoice !== "none"
      ? toolChoice
      : toolChoice && typeof toolChoice === "object"
        ? (((toolChoice as JsonRecord).function as JsonRecord | undefined)?.name ?? "auto")
        : "auto";
  let rules =
    `- If a tool is needed, respond with: CALL_TOOL: tool_name({"arg1":"value1"})\n` +
    `- If multiple independent tools are needed, output one CALL_TOOL line per tool\n` +
    `- If no tool is needed, respond with: NO_TOOL_NEEDED\n` +
    `- Only use tools from the available list above\n` +
    `- Validate all arguments against the tool's schema\n` +
    `- Do not invent tools that are not in the list`;
  // Multi-turn: completed tool evidence in the history was already acted upon —
  // re-invoking those tools would duplicate work.
  if (text.includes("[tool result id=") || text.includes("[assistant tool_calls]")) {
    rules +=
      `\n- Completed evidence must not be repeated: prior tool_calls/tool results are ` +
      `already delivered, never re-invoke them\n` +
      `- Only start a new tool call when fresh unfinished work remains on the current request`;
  }
  return (
    `You are a tool selection assistant. Based on the user request, decide which tool to call next.\n\n` +
    `Available tools: ${defs}\n\nMODE: ${choice}\n\nRules:\n${rules}\n\n` +
    `User request and evidence:\n${text}`
  );
}
