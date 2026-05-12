type EnvSource = Record<string, string | undefined>;
type TimeoutLogger = (message: string) => void;

type ReadTimeoutOptions = {
  allowZero?: boolean;
  logger?: TimeoutLogger;
};

export const DEFAULT_FETCH_TIMEOUT_MS = 600_000;
export const DEFAULT_STREAM_IDLE_TIMEOUT_MS = 600_000;
export const DEFAULT_STREAM_READINESS_TIMEOUT_MS = 30_000;
export const DEFAULT_FETCH_CONNECT_TIMEOUT_MS = 30_000;
export const DEFAULT_FETCH_KEEPALIVE_TIMEOUT_MS = 4_000;
export const DEFAULT_API_BRIDGE_PROXY_TIMEOUT_MS = 600_000;
export const DEFAULT_API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS = 300_000;
export const DEFAULT_API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS = 60_000;
export const DEFAULT_API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS = 5_000;
export const DEFAULT_API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS = 0;

function hasEnvValue(env: EnvSource, name: string): boolean {
  const raw = env[name];
  return raw != null && raw.trim() !== "";
}

export type UpstreamTimeoutConfig = {
  fetchTimeoutMs: number;
  streamIdleTimeoutMs: number;
  streamReadinessTimeoutMs: number;
  fetchHeadersTimeoutMs: number;
  fetchBodyTimeoutMs: number;
  fetchConnectTimeoutMs: number;
  fetchKeepAliveTimeoutMs: number;
};

export type TlsClientTimeoutConfig = {
  timeoutMs: number;
};

export type ApiBridgeTimeoutConfig = {
  proxyTimeoutMs: number;
  serverRequestTimeoutMs: number;
  serverHeadersTimeoutMs: number;
  serverKeepAliveTimeoutMs: number;
  serverSocketTimeoutMs: number;
};

function readTimeoutMs(
  env: EnvSource,
  name: string,
  defaultValue: number,
  options: ReadTimeoutOptions = {}
): number {
  const raw = env[name];
  if (raw == null || raw.trim() === "") return defaultValue;

  const parsed = Number(raw);
  const isValid = Number.isFinite(parsed) && (options.allowZero ? parsed >= 0 : parsed > 0);
  if (!isValid) {
    options.logger?.(`Invalid ${name}="${raw}". Using default ${defaultValue}ms.`);
    return defaultValue;
  }

  return Math.floor(parsed);
}

export function getUpstreamTimeoutConfig(
  env: EnvSource = process.env,
  logger?: TimeoutLogger
): UpstreamTimeoutConfig {
  const sharedRequestTimeoutMs = hasEnvValue(env, "REQUEST_TIMEOUT_MS")
    ? readTimeoutMs(env, "REQUEST_TIMEOUT_MS", DEFAULT_FETCH_TIMEOUT_MS, {
        allowZero: true,
        logger,
      })
    : undefined;
  const fetchTimeoutMs = readTimeoutMs(
    env,
    "FETCH_TIMEOUT_MS",
    sharedRequestTimeoutMs ?? DEFAULT_FETCH_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );
  const streamIdleTimeoutMs = readTimeoutMs(
    env,
    "STREAM_IDLE_TIMEOUT_MS",
    sharedRequestTimeoutMs ?? DEFAULT_STREAM_IDLE_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );
  const streamReadinessTimeoutMs = readTimeoutMs(
    env,
    "STREAM_READINESS_TIMEOUT_MS",
    DEFAULT_STREAM_READINESS_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );

  return {
    fetchTimeoutMs,
    streamIdleTimeoutMs,
    streamReadinessTimeoutMs,
    fetchHeadersTimeoutMs: readTimeoutMs(env, "FETCH_HEADERS_TIMEOUT_MS", fetchTimeoutMs, {
      allowZero: true,
      logger,
    }),
    fetchBodyTimeoutMs: readTimeoutMs(env, "FETCH_BODY_TIMEOUT_MS", fetchTimeoutMs, {
      allowZero: true,
      logger,
    }),
    fetchConnectTimeoutMs: readTimeoutMs(
      env,
      "FETCH_CONNECT_TIMEOUT_MS",
      DEFAULT_FETCH_CONNECT_TIMEOUT_MS,
      {
        allowZero: true,
        logger,
      }
    ),
    fetchKeepAliveTimeoutMs: readTimeoutMs(
      env,
      "FETCH_KEEPALIVE_TIMEOUT_MS",
      DEFAULT_FETCH_KEEPALIVE_TIMEOUT_MS,
      {
        logger,
      }
    ),
  };
}

export function getStainlessTimeoutSeconds(
  env: EnvSource = process.env,
  logger?: TimeoutLogger
): number {
  const { fetchTimeoutMs } = getUpstreamTimeoutConfig(env, logger);
  return Math.max(1, Math.ceil(fetchTimeoutMs / 1_000));
}

export function getTlsClientTimeoutConfig(
  env: EnvSource = process.env,
  logger?: TimeoutLogger
): TlsClientTimeoutConfig {
  const upstream = getUpstreamTimeoutConfig(env, logger);

  return {
    timeoutMs: readTimeoutMs(env, "TLS_CLIENT_TIMEOUT_MS", upstream.fetchTimeoutMs, {
      allowZero: true,
      logger,
    }),
  };
}

export function getApiBridgeTimeoutConfig(
  env: EnvSource = process.env,
  logger?: TimeoutLogger
): ApiBridgeTimeoutConfig {
  const sharedRequestTimeoutMs = hasEnvValue(env, "REQUEST_TIMEOUT_MS")
    ? readTimeoutMs(env, "REQUEST_TIMEOUT_MS", DEFAULT_FETCH_TIMEOUT_MS, {
        allowZero: true,
        logger,
      })
    : undefined;
  const proxyTimeoutMs = readTimeoutMs(
    env,
    "API_BRIDGE_PROXY_TIMEOUT_MS",
    sharedRequestTimeoutMs ?? DEFAULT_API_BRIDGE_PROXY_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );
  const derivedRequestTimeoutMs =
    proxyTimeoutMs > 0
      ? Math.max(proxyTimeoutMs, DEFAULT_API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS)
      : DEFAULT_API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS;
  const serverKeepAliveTimeoutMs = readTimeoutMs(
    env,
    "API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS",
    DEFAULT_API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );
  const serverHeadersTimeoutMs = readTimeoutMs(
    env,
    "API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS",
    DEFAULT_API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );

  return {
    proxyTimeoutMs,
    serverRequestTimeoutMs: readTimeoutMs(
      env,
      "API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS",
      sharedRequestTimeoutMs
        ? Math.max(sharedRequestTimeoutMs, derivedRequestTimeoutMs)
        : derivedRequestTimeoutMs,
      {
        allowZero: true,
        logger,
      }
    ),
    serverHeadersTimeoutMs:
      serverHeadersTimeoutMs > 0 && serverKeepAliveTimeoutMs > 0
        ? Math.max(serverHeadersTimeoutMs, serverKeepAliveTimeoutMs + 1_000)
        : serverHeadersTimeoutMs,
    serverKeepAliveTimeoutMs,
    serverSocketTimeoutMs: readTimeoutMs(
      env,
      "API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS",
      DEFAULT_API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS,
      {
        allowZero: true,
        logger,
      }
    ),
  };
}
