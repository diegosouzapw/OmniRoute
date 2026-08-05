import { randomBytes } from "node:crypto";

import { inspectBrowserLoginCapabilities } from "@omniroute/open-sse/vendor/codex-chatgpt-web/browser-login.ts";
import { decodeChatGptWebCodexSecrets } from "@omniroute/open-sse/executors/chatgpt-web-codex/credentials.ts";
import { detectChromeExecutable } from "@omniroute/open-sse/executors/chatgpt-web-codex.ts";
import {
  connectionRuntimePaths,
  ensureConnectionStorageState,
} from "@omniroute/open-sse/executors/chatgpt-web-codex/storageState.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export async function validateChatGptWebCodexProvider({
  apiKey,
  providerSpecificData = {},
}: {
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}) {
  try {
    const secrets = decodeChatGptWebCodexSecrets(String(apiKey || ""));
    if (!secrets.cookie) {
      return {
        valid: false,
        error: "Für die Browserprüfung ist ein frischer vollständiger ChatGPT-Cookie erforderlich.",
      };
    }
    const runtimeKey =
      typeof providerSpecificData.runtimeKey === "string"
        ? providerSpecificData.runtimeKey.trim()
        : secrets.runtimeKey || process.env.CHATGPT_WEB_CODEX_RUNTIME_KEY?.trim();
    const tunnelId =
      typeof providerSpecificData.tunnelId === "string"
        ? providerSpecificData.tunnelId.trim()
        : process.env.CHATGPT_WEB_CODEX_TUNNEL_ID?.trim() || "";
    const connectorName =
      typeof providerSpecificData.connectorName === "string"
        ? providerSpecificData.connectorName.trim()
        : process.env.CHATGPT_WEB_CODEX_CONNECTOR_NAME?.trim() || "";
    if (!connectorName) {
      return {
        valid: false,
        error: "Der ChatGPT-Custom-Connector ist erforderlich.",
      };
    }
    const tunnelConfigured = Boolean(runtimeKey || tunnelId);
    if (tunnelConfigured && (!runtimeKey || !/^tunnel_[a-f0-9]{32}$/.test(tunnelId))) {
      return {
        valid: false,
        error: "Tunnel-ID und Runtime-Key müssen gemeinsam gültig konfiguriert werden.",
      };
    }
    const cdpEndpoint = process.env.CHATGPT_WEB_CODEX_CDP_URL?.trim();
    const chromeExecutablePath = detectChromeExecutable(
      typeof providerSpecificData.chromeExecutablePath === "string"
        ? providerSpecificData.chromeExecutablePath
        : undefined
    );
    if (!chromeExecutablePath && !cdpEndpoint) {
      return {
        valid: false,
        error:
          "Kein unterstütztes Chrome oder Chromium gefunden. Installiere Chromium oder konfiguriere den Browserpfad.",
      };
    }
    const validationId = `validation-${randomBytes(12).toString("hex")}`;
    const paths = connectionRuntimePaths(validationId);
    ensureConnectionStorageState(validationId, secrets.cookie);
    const capabilities = await inspectBrowserLoginCapabilities({
      mode: "browser-only",
      appName: "OmniRoute Codex",
      ...(chromeExecutablePath ? { chromeExecutablePath } : {}),
      ...(cdpEndpoint ? { cdpEndpoint } : {}),
      storageStatePath: paths.storageStatePath,
      brokerSocketPath: paths.brokerSocketPath,
      headed: false,
      proAvailable: false,
      autoApproveToolCalls: false,
    });
    return {
      valid: true,
      error: null,
      method: "headless-browser",
      capabilities: {
        browser: "ready",
        storageState: "verified",
        login: "authenticated",
        temporaryChats: "ready",
        proAvailable: capabilities.proAvailable,
      },
      providerSpecificData: {
        proAvailable: capabilities.proAvailable,
        browserVerified: true,
        ...(chromeExecutablePath ? { chromeExecutablePath } : {}),
        ...(typeof providerSpecificData.tunnelId === "string" &&
        providerSpecificData.tunnelId.trim()
          ? { tunnelId: providerSpecificData.tunnelId.trim() }
          : {}),
        ...(typeof providerSpecificData.connectorName === "string" &&
        providerSpecificData.connectorName.trim()
          ? { connectorName: providerSpecificData.connectorName.trim() }
          : {}),
        validationId,
      },
    };
  } catch (error) {
    return {
      valid: false,
      error: sanitizeErrorMessage(error instanceof Error ? error.message : error),
    };
  }
}
