import { existsSync, readFileSync } from "node:fs";

import { browserLoginStateExists } from "../../vendor/codex-chatgpt-web/browser-login.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { detectChromeExecutable } from "../chatgpt-web-codex.ts";
import { decodeChatGptWebCodexSecrets } from "./credentials.ts";
import { getChatGptWebCodexRuntimeCounts } from "./runtime.ts";
import {
  connectionRuntimePaths,
  ensureConnectionStorageStateFromCredential,
} from "./storageState.ts";
import {
  getTunnelRuntimeStatus,
  tunnelClientPaths,
  tunnelSupervisorLeaseStatus,
} from "./tunnelClient.ts";

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export async function getChatGptWebCodexDoctorStatus(connection: {
  id?: unknown;
  apiKey?: unknown;
  providerSpecificData?: unknown;
  lastError?: unknown;
}) {
  const connectionId = typeof connection.id === "string" ? connection.id : "";
  const data = record(connection.providerSpecificData);
  const paths = connectionRuntimePaths(connectionId);
  const tunnelPaths = tunnelClientPaths();
  const cdpConfigured = Boolean(process.env.CHATGPT_WEB_CODEX_CDP_URL?.trim());
  const chrome = detectChromeExecutable(
    typeof data.chromeExecutablePath === "string" ? data.chromeExecutablePath : undefined
  );
  let storageState = false;
  let login = false;
  let solAvailable = data.solAvailable !== false;
  let proAvailable = data.proAvailable === true;
  let credential = false;
  try {
    const secrets = decodeChatGptWebCodexSecrets(String(connection.apiKey || ""));
    credential = Boolean(secrets.storageState);
    if (credential) ensureConnectionStorageStateFromCredential(connectionId, secrets);
    storageState = existsSync(paths.storageStatePath);
    login = browserLoginStateExists({ storageStatePath: paths.storageStatePath });
    if (login) {
      try {
        const marker = JSON.parse(
          readFileSync(`${paths.storageStatePath}.verified.json`, "utf8")
        ) as Record<string, unknown>;
        if (typeof marker.solAvailable === "boolean") solAvailable = marker.solAvailable;
        if (typeof marker.proAvailable === "boolean") proAvailable = marker.proAvailable;
      } catch {
        // Marker detail is optional.
      }
    }
  } catch {
    credential = false;
  }

  let tunnel = {
    ok: false,
    processRunning: false,
    healthy: false,
    ready: false,
    detail: "not checked",
  };
  try {
    if (existsSync(tunnelPaths.binary)) tunnel = await getTunnelRuntimeStatus({});
  } catch (error) {
    tunnel.detail = sanitizeErrorMessage(error instanceof Error ? error.message : error);
  }

  const runtime = getChatGptWebCodexRuntimeCounts();
  const lease = tunnelSupervisorLeaseStatus();
  return {
    browser: {
      ready: Boolean(chrome || cdpConfigured),
      mode: cdpConfigured ? "internal-cdp" : chrome ? "local-chromium" : "unavailable",
    },
    storageState: { ready: storageState && credential },
    login: { ready: login },
    temporaryChats: { ready: login },
    tunnelBinary: { ready: existsSync(tunnelPaths.binary) },
    tunnel: {
      ready: tunnel.ok,
      processRunning: tunnel.processRunning,
      healthy: tunnel.healthy,
      detail: tunnel.detail,
    },
    connector: {
      ready: typeof data.connectorName === "string" && data.connectorName.trim().length > 0,
    },
    toolRoundtrip: { ready: tunnel.ok && runtime.brokers > 0 },
    runtime,
    lease,
    solAvailable,
    proAvailable,
    recovery: {
      interactiveLoginRequired: storageState && !login,
    },
    lastError:
      typeof connection.lastError === "string" && connection.lastError.trim()
        ? sanitizeErrorMessage(connection.lastError)
        : null,
  };
}
