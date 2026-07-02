/**
 * Microsoft 365 Copilot (individual / Substrate BizChat) connection helpers.
 *
 * Pure URL / credential / prompt builders for the #4042 individual M365 path.
 * Kept transport-free (no BaseExecutor import — only a type import) so they can
 * be unit-tested without the executor's heavy runtime dependency chain. The
 * access_token rides in the WS query string per the protocol, so any logging of
 * the URL MUST go through redactWsUrl().
 */

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
  const accessToken =
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
  return { host, chathubPath, accessToken, variants };
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
    licenseType: M365_INDIVIDUAL_DEFAULTS.licenseType,
    isEdu: "false",
    agent: M365_INDIVIDUAL_DEFAULTS.agent,
    scenario: M365_INDIVIDUAL_DEFAULTS.scenario,
  });
  return `wss://${params.host}/m365Copilot/Chathub/${params.chathubPath}?${query.toString()}`;
}

/** Strip the access_token from a WS URL so it is safe to log. */
export function redactWsUrl(wsUrl: string): string {
  return wsUrl.replace(/access_token=[^&]*/i, "access_token=REDACTED");
}

/** Flatten OpenAI messages into a single prompt (system instructions prepended). */
export function buildPrompt(body: JsonRecord | undefined): string {
  const messages = (body?.messages as Array<JsonRecord>) || [];
  const systemMsgs = messages.filter((m) => m.role === "system");
  const userMsg = messages.filter((m) => m.role === "user").pop();
  const userText =
    typeof userMsg?.content === "string" ? userMsg.content : JSON.stringify(userMsg?.content ?? "");
  let prompt = "";
  if (systemMsgs.length > 0) {
    const sysText = systemMsgs
      .map((m) => (typeof m.content === "string" ? m.content : ""))
      .filter(Boolean)
      .join("\n");
    if (sysText) prompt += `[System Instructions]\n${sysText}\n\n`;
  }
  prompt += userText;
  return prompt;
}
