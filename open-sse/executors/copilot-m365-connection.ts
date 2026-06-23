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

export interface M365ConnectionParams {
  host: string;
  chathubPath: string; // "<user-oid>@<tenant-id>"
  accessToken: string;
}

/** A new 32-hex chat session id (== XRoutingParameterSessionKey == clientrequestid). */
export function newChatSessionId(): string {
  return randomBytes(16).toString("hex");
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
  const accessToken =
    (typeof credentials?.apiKey === "string" && credentials.apiKey) ||
    (typeof psd.accessToken === "string" && psd.accessToken) ||
    (typeof psd.access_token === "string" && psd.access_token) ||
    "";
  if (!accessToken) {
    return { error: "Missing M365 Copilot access_token. Paste it as the provider credential." };
  }
  const chathubPath =
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
  return { host, chathubPath, accessToken };
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
