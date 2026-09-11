import { randomBytes } from "node:crypto";
import { rmSync } from "node:fs";

import { CHATGPT_WEB_CODEX_CONNECTOR_NAME } from "@/shared/constants/chatgptWebCodex";
import { inspectBrowserLoginCapabilities } from "@omniroute/open-sse/vendor/codex-chatgpt-web/browser-login.ts";
import { decodeChatGptWebCodexSecrets } from "@omniroute/open-sse/executors/chatgpt-web-codex/credentials.ts";
import {
  connectionRuntimePaths,
  ensureConnectionStorageState,
  ensureConnectionStorageStateFromCredential,
} from "@omniroute/open-sse/executors/chatgpt-web-codex/storageState.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

// detectChromeExecutable (executors/chatgpt-web-codex.ts) is imported
// dynamically below, not statically here: this module is re-exported through
// the shared `@/lib/providers/validation` barrel that every provider
// validator's callers pull in, and executors/chatgpt-web-codex.ts's own
// import chain (its vendor browser adapter -> token-estimate.ts -> tiktoken's
// WASM tokenizer) fails to bundle under Turbopack dev mode even with
// `tiktoken` server-externalized -- turning validation of an unrelated
// provider into a route-wide crash for anyone who merely imports the barrel.
// A static import here evaluates that whole chain unconditionally.

export async function validateChatGptWebCodexProvider({
  apiKey,
  providerSpecificData = {},
}: {
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}) {
  try {
    const secrets = decodeChatGptWebCodexSecrets(String(apiKey || ""));
    if (!secrets.cookie && !secrets.storageState) {
      return {
        valid: false,
        error:
          "Für die Browserprüfung ist ein frischer ChatGPT-Cookie oder ein gespeicherter Browserzustand erforderlich.",
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
        : process.env.CHATGPT_WEB_CODEX_CONNECTOR_NAME?.trim() || CHATGPT_WEB_CODEX_CONNECTOR_NAME;
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
    const { detectChromeExecutable } =
      await import("@omniroute/open-sse/executors/chatgpt-web-codex.ts");
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
    const freshCookie = Boolean(secrets.cookie);
    if (secrets.cookie) ensureConnectionStorageState(validationId, secrets.cookie);
    else ensureConnectionStorageStateFromCredential(validationId, secrets);
    let capabilities;
    try {
      capabilities = await inspectBrowserLoginCapabilities({
        appName: connectorName,
        ...(chromeExecutablePath ? { chromeExecutablePath } : {}),
        ...(cdpEndpoint ? { cdpEndpoint } : {}),
        storageStatePath: paths.storageStatePath,
        headed: false,
        proAvailable: false,
        autoApproveToolCalls: false,
      });
    } catch (error) {
      rmSync(paths.root, { recursive: true, force: true });
      throw error;
    }
    if (!freshCookie) rmSync(paths.root, { recursive: true, force: true });
    return {
      valid: true,
      error: null,
      method: "headless-browser",
      capabilities: {
        browser: "ready",
        storageState: "verified",
        login: "authenticated",
        temporaryChats: "ready",
        solAvailable: capabilities.solAvailable,
        proAvailable: capabilities.proAvailable,
      },
      providerSpecificData: {
        solAvailable: capabilities.solAvailable,
        proAvailable: capabilities.proAvailable,
        browserVerified: true,
        connectorName,
        ...(chromeExecutablePath ? { chromeExecutablePath } : {}),
        ...(typeof providerSpecificData.tunnelId === "string" &&
        providerSpecificData.tunnelId.trim()
          ? { tunnelId: providerSpecificData.tunnelId.trim() }
          : {}),
        ...(freshCookie ? { validationId } : {}),
      },
    };
  } catch (error) {
    return {
      valid: false,
      error: sanitizeErrorMessage(error instanceof Error ? error.message : error),
    };
  }
}
