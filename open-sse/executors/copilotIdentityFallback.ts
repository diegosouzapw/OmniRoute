import { HTTP_STATUS } from "../config/constants.ts";
import {
  GITHUB_COPILOT_CLI_INTEGRATION_ID,
  GITHUB_COPILOT_CHAT_INTEGRATION_ID,
  resolveCopilotIntegrationIdOverride,
} from "../config/providerHeaderProfiles.ts";
import type { ExecutorLog } from "./base.ts";

export function readHeaderCaseInsensitive(
  headers: Record<string, string> | null | undefined,
  name: string
): string | null {
  if (!headers) return null;
  const target = name.toLowerCase();
  const direct = headers[name] ?? headers[target];
  if (typeof direct === "string") return direct;
  for (const key in headers) {
    if (key.toLowerCase() === target && typeof headers[key] === "string") {
      return headers[key];
    }
  }
  return null;
}

export type CopilotIdentityFallbackArgs = {
  response: Response;
  url: string;
  fetchOptions: RequestInit;
  clientHeaders?: Record<string, string> | null;
  fetchWithStartTimeout: (requestUrl: string, requestOptions: RequestInit) => Promise<Response>;
};

export type CopilotIdentityFallbackResult = {
  response: Response;
  finalHeaders: Record<string, string>;
};

/**
 * GitHub Copilot 403 identity fallback: business/org accounts may reject the CLI
 * identity (copilot-developer-cli) while allowing copilot-chat. Returns a bound
 * per-`execute()`-call helper (provider + log fixed, retry state kept in the
 * closure) so at most one identity retry happens across every fallback URL,
 * gated strictly to standard github (not ghe-copilot), and only when identity
 * was not explicitly pinned by the client or the operator.
 */
export function createCopilotIdentityFallback(provider: string, log?: ExecutorLog | null) {
  let retried = false;

  return async function applyCopilotIdentityFallback(
    args: CopilotIdentityFallbackArgs
  ): Promise<CopilotIdentityFallbackResult> {
    const { response, url, fetchOptions, clientHeaders, fetchWithStartTimeout } = args;
    const finalHeaders = fetchOptions.headers as Record<string, string>;

    if (
      retried ||
      provider !== "github" ||
      response.status !== HTTP_STATUS.FORBIDDEN ||
      resolveCopilotIntegrationIdOverride() ||
      process.env.COPILOT_INTEGRATION_ID?.trim() ||
      readHeaderCaseInsensitive(clientHeaders, "copilot-integration-id")?.trim()
    ) {
      return { response, finalHeaders };
    }

    const currentIntegrationId = readHeaderCaseInsensitive(finalHeaders, "copilot-integration-id");
    if (currentIntegrationId !== GITHUB_COPILOT_CLI_INTEGRATION_ID) {
      return { response, finalHeaders };
    }

    const errText = await response
      .clone()
      .text()
      .catch(() => "");
    const isQuotaError = /quota|rate[_-]?limit|exceeded|insufficient_quota/i.test(errText);
    const hasIdentityEvidence =
      !isQuotaError &&
      (/access denied/i.test(errText) ||
        (/copilot/i.test(errText) && /403/.test(errText)) ||
        /integration[_-]?id/i.test(errText) ||
        /not (?:permitted|allowed|authorized)/i.test(errText));

    if (!hasIdentityEvidence) {
      return { response, finalHeaders };
    }

    await response.text().catch(() => "");
    log?.warn?.(
      "COPILOT_IDENTITY",
      `Standard GitHub Copilot identity ${GITHUB_COPILOT_CLI_INTEGRATION_ID} denied (403) — retrying once with ${GITHUB_COPILOT_CHAT_INTEGRATION_ID}`
    );
    const retryHeaders: Record<string, string> = {
      ...finalHeaders,
      "copilot-integration-id": GITHUB_COPILOT_CHAT_INTEGRATION_ID,
    };
    for (const key of Object.keys(retryHeaders)) {
      if (key.toLowerCase() === "copilot-integration-id" && key !== "copilot-integration-id") {
        delete retryHeaders[key];
      }
    }
    retried = true;
    const retryResponse = await fetchWithStartTimeout(url, {
      ...fetchOptions,
      headers: retryHeaders,
    });

    return { response: retryResponse, finalHeaders: retryHeaders };
  };
}
