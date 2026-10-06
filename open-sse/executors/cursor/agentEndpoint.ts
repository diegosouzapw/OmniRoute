import { createHmac } from "node:crypto";

import { mergeAbortSignals, type ProviderCredentials } from "../base.ts";
import { stripCursorOAuthTokenPrefix } from "../../services/cursorApiKeyAuth.ts";
import {
  formatCursorAgentClientVersion,
  getCursorAgentCliVersion,
} from "../../utils/cursorAgentCliVersion.ts";
import { decodeFields } from "../../utils/cursorAgentProtobuf/wire.ts";

const CURSOR_API_URL = "https://api2.cursor.sh";
const CURSOR_SERVER_CONFIG_PATH = "/aiserver.v1.ServerConfigService/GetServerConfig";
const CURSOR_AGENT_PATH = "/agent.v1.AgentService/Run";
const CURSOR_SERVER_CONFIG_TIMEOUT_MS = 10_000;
const CURSOR_AGENT_URL_CACHE_TTL_MS = 60 * 60 * 1000;
const CURSOR_AGENT_URL_CACHE_LIMIT = 1_000;

type CursorAgentUrls = { agentUrl: string; agentnUrl: string };
type CursorAgentUrlCacheEntry = CursorAgentUrls & { expiresAt: number };
const cursorAgentUrlCache = new Map<string, CursorAgentUrlCacheEntry>();

/** Reports an HTTP error from Cursor server-config discovery. */
export class CursorServerConfigError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

function validateCursorAgentUrl(value: string): string {
  const url = new URL(value);
  const isCursorAgentHost =
    url.hostname === "api5.cursor.sh" || url.hostname.endsWith(".api5.cursor.sh");
  if (
    url.protocol !== "https:" ||
    !isCursorAgentHost ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error("Cursor server config included an invalid Agent URL");
  }
  return url.origin;
}

function parseCursorAgentUrls(payload: Buffer): CursorAgentUrls {
  const agentUrlConfig = decodeFields(payload).find(
    (field) => field.fieldNumber === 27 && field.wireType === 2
  );
  if (!agentUrlConfig || agentUrlConfig.wireType !== 2) {
    throw new Error("Cursor server config did not include Agent URLs");
  }
  const fields = decodeFields(agentUrlConfig.bytes);
  const agentUrl = fields.find((field) => field.fieldNumber === 1 && field.wireType === 2);
  const agentnUrl = fields.find((field) => field.fieldNumber === 2 && field.wireType === 2);
  if (!agentUrl || agentUrl.wireType !== 2 || !agentnUrl || agentnUrl.wireType !== 2) {
    throw new Error("Cursor server config included incomplete Agent URLs");
  }
  return {
    agentUrl: validateCursorAgentUrl(agentUrl.bytes.toString("utf8")),
    agentnUrl: validateCursorAgentUrl(agentnUrl.bytes.toString("utf8")),
  };
}

async function fetchCursorAgentUrls(
  accessToken: string,
  signal?: AbortSignal | null
): Promise<CursorAgentUrls> {
  const timeoutSignal = AbortSignal.timeout(CURSOR_SERVER_CONFIG_TIMEOUT_MS);
  const response = await fetch(`${CURSOR_API_URL}${CURSOR_SERVER_CONFIG_PATH}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "connect-protocol-version": "1",
      "content-type": "application/proto",
      "user-agent": "connect-es/1.6.1",
      "x-cursor-client-type": "cli",
      "x-cursor-client-version": formatCursorAgentClientVersion(getCursorAgentCliVersion()),
    },
    body: Buffer.alloc(0),
    signal: signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal,
  });
  if (!response.ok) {
    throw new CursorServerConfigError(
      `Cursor server config request failed with status ${response.status}`,
      response.status
    );
  }
  return parseCursorAgentUrls(Buffer.from(await response.arrayBuffer()));
}

/** Resolve the Agent RPC URL that Cursor assigned to this connection. */
export async function resolveCursorAgentUrl(
  credentials: ProviderCredentials,
  signal?: AbortSignal | null
): Promise<string> {
  const accessToken = stripCursorOAuthTokenPrefix(credentials.accessToken || "");
  if (!accessToken) throw new Error("Cursor access token is required");
  const cacheKey =
    `${credentials.connectionId || "anonymous"}:` +
    createHmac("sha256", "omniroute-cursor-agent-url-cache-v1").update(accessToken).digest("hex");
  const now = Date.now();
  let urls = cursorAgentUrlCache.get(cacheKey);
  if (!urls || urls.expiresAt <= now) {
    const fetched = await fetchCursorAgentUrls(accessToken, signal);
    urls = { ...fetched, expiresAt: now + CURSOR_AGENT_URL_CACHE_TTL_MS };
    if (
      !cursorAgentUrlCache.has(cacheKey) &&
      cursorAgentUrlCache.size >= CURSOR_AGENT_URL_CACHE_LIMIT
    ) {
      const oldestKey = cursorAgentUrlCache.keys().next().value as string | undefined;
      if (oldestKey !== undefined) cursorAgentUrlCache.delete(oldestKey);
    }
    cursorAgentUrlCache.set(cacheKey, urls);
  }
  const ghostMode = credentials.providerSpecificData?.ghostMode !== false;
  return `${ghostMode ? urls.agentUrl : urls.agentnUrl}${CURSOR_AGENT_PATH}`;
}
