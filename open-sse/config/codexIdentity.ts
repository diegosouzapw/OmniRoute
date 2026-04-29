import { createHash, randomUUID } from "node:crypto";

import { normalizeCodexSessionId } from "./codexClient.ts";

const CODEX_INSTALLATION_SALT = "omniroute-codex-installation";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type CodexClientIdentity = {
  sessionId: string;
  turnId: string;
  windowId: string;
  installationId: string;
};

function normalizeUuid(value: unknown): string | null {
  return typeof value === "string" && UUID_PATTERN.test(value.trim()) ? value.trim() : null;
}

function uuidFromStableValue(value: string): string {
  const hash = createHash("sha256").update(value).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

export function getCodexInstallationId(
  providerSpecificData?: Record<string, unknown> | null
): string {
  const explicit = normalizeUuid(providerSpecificData?.codexInstallationId);
  if (explicit) return explicit;

  const stableSource =
    typeof providerSpecificData?.workspaceId === "string" && providerSpecificData.workspaceId.trim()
      ? providerSpecificData.workspaceId.trim()
      : typeof providerSpecificData?.accountId === "string" && providerSpecificData.accountId.trim()
        ? providerSpecificData.accountId.trim()
        : typeof providerSpecificData?.email === "string" && providerSpecificData.email.trim()
          ? providerSpecificData.email.trim()
          : "default";

  return uuidFromStableValue(`${CODEX_INSTALLATION_SALT}:${stableSource}`);
}

export function createCodexClientIdentity(
  sessionId: string | null,
  providerSpecificData?: Record<string, unknown> | null
): CodexClientIdentity | null {
  const normalizedSessionId = normalizeCodexSessionId(sessionId);
  if (!normalizedSessionId) return null;
  return {
    sessionId: normalizedSessionId,
    turnId: randomUUID(),
    windowId: `${normalizedSessionId}:0`,
    installationId: getCodexInstallationId(providerSpecificData),
  };
}

export function applyCodexClientIdentityHeaders(
  headers: Record<string, string>,
  identity?: CodexClientIdentity | null
): void {
  if (!identity) return;
  headers["session_id"] = identity.sessionId;
  headers["x-client-request-id"] = identity.sessionId;
  headers["x-codex-window-id"] = identity.windowId;
  headers["x-codex-turn-metadata"] = JSON.stringify({
    session_id: identity.sessionId,
    thread_source: "user",
    turn_id: identity.turnId,
    sandbox: "none",
  });
}

export function applyCodexClientMetadata(
  body: Record<string, unknown>,
  identity?: CodexClientIdentity | null
): void {
  if (!identity) return;
  const existing =
    body.client_metadata &&
    typeof body.client_metadata === "object" &&
    !Array.isArray(body.client_metadata)
      ? (body.client_metadata as Record<string, unknown>)
      : {};
  body.client_metadata = {
    ...existing,
    "x-codex-installation-id": identity.installationId,
  };
}
