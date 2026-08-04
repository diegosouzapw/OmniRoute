type EnvSource = Record<string, string | undefined>;
type TimeoutLogger = (message: string) => void;

type ReadTimeoutOptions = {
  allowZero?: boolean;
  logger?: TimeoutLogger;
};

export const DEFAULT_FETCH_TIMEOUT_MS = 600_000;
export const DEFAULT_STREAM_IDLE_TIMEOUT_MS = 600_000;
export const MAX_TIMER_TIMEOUT_MS = 2_147_483_647;
export const DEFAULT_SSE_HEARTBEAT_INTERVAL_MS = 15_000;
export const DEFAULT_STREAM_READINESS_TIMEOUT_MS = 80_000;
export const DEFAULT_STREAM_READINESS_MAX_TIMEOUT_MS = 180_000;
export const DEFAULT_FETCH_CONNECT_TIMEOUT_MS = 30_000;
export const DEFAULT_FETCH_KEEPALIVE_TIMEOUT_MS = 4_000;
export const DEFAULT_API_BRIDGE_PROXY_TIMEOUT_MS = 600_000;
export const DEFAULT_API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS = 300_000;
export const DEFAULT_API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS = 60_000;
export const DEFAULT_API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS = 5_000;
export const DEFAULT_API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS = 0;
// Node's http.Server default keepAliveTimeout is 5_000ms with no Keep-Alive
// response header hint. Pooled keep-alive clients that don't race that exact
// window (e.g. the JVM java.net.http.HttpClient used by JetBrains AI
// Assistant) can reuse a socket the server has already torn down, getting 0
// response bytes back (#7003). Raise both well above any realistic client
// idle-pool window, mirroring the API bridge server's pattern.
export const DEFAULT_MAIN_SERVER_KEEPALIVE_TIMEOUT_MS = 65_000;
export const DEFAULT_MAIN_SERVER_HEADERS_TIMEOUT_MS = 66_000;

function hasEnvValue(env: EnvSource, name: string): boolean {
  const raw = env[name];
  return raw != null && raw.trim() !== "";
}

export type UpstreamTimeoutConfig = {
  fetchTimeoutMs: number;
  streamIdleTimeoutMs: number;
  sseHeartbeatIntervalMs: number;
  streamReadinessTimeoutMs: number;
  streamReadinessMaxTimeoutMs: number;
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

export type MainServerTimeoutConfig = {
  keepAliveTimeoutMs: number;
  headersTimeoutMs: number;
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
    sharedRequestTimeoutMs ?? DEFAULT_STREAM_READINESS_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );
  const streamReadinessMaxTimeoutMs = readTimeoutMs(
    env,
    "STREAM_READINESS_MAX_TIMEOUT_MS",
    DEFAULT_STREAM_READINESS_MAX_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );
  const sseHeartbeatIntervalMs = readTimeoutMs(
    env,
    "SSE_HEARTBEAT_INTERVAL_MS",
    DEFAULT_SSE_HEARTBEAT_INTERVAL_MS,
    {
      allowZero: true,
      logger,
    }
  );

  return {
    fetchTimeoutMs,
    streamIdleTimeoutMs,
    streamReadinessTimeoutMs,
    streamReadinessMaxTimeoutMs,
    sseHeartbeatIntervalMs,
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
  const serverRequestDefaultMs =
    sharedRequestTimeoutMs !== undefined
      ? sharedRequestTimeoutMs > 0
        ? Math.max(sharedRequestTimeoutMs, derivedRequestTimeoutMs)
        : 0
      : derivedRequestTimeoutMs;
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
      serverRequestDefaultMs,
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

export function getMainServerTimeoutConfig(
  env: EnvSource = process.env,
  logger?: TimeoutLogger
): MainServerTimeoutConfig {
  const keepAliveTimeoutMs = readTimeoutMs(
    env,
    "MAIN_SERVER_KEEPALIVE_TIMEOUT_MS",
    DEFAULT_MAIN_SERVER_KEEPALIVE_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );
  const headersTimeoutMs = readTimeoutMs(
    env,
    "MAIN_SERVER_HEADERS_TIMEOUT_MS",
    DEFAULT_MAIN_SERVER_HEADERS_TIMEOUT_MS,
    {
      allowZero: true,
      logger,
    }
  );

  return {
    keepAliveTimeoutMs,
    // Node requires headersTimeout > keepAliveTimeout to avoid its internal
    // race-condition warning; keep both configurable but always coherent.
    headersTimeoutMs:
      headersTimeoutMs > 0 && keepAliveTimeoutMs > 0
        ? Math.max(headersTimeoutMs, keepAliveTimeoutMs + 1_000)
        : headersTimeoutMs,
  };
}
