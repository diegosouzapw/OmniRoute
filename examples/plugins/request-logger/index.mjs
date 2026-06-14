/**
 * Request Logger Plugin — logs API requests and responses with timing.
 *
 * @module request-logger
 */

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

function shouldLog(configLevel, messageLevel) {
  return (LEVELS[messageLevel] ?? 1) >= (LEVELS[configLevel] ?? 1);
}

function truncate(str, max) {
  if (typeof str !== "string") return str;
  return str.length > max ? str.slice(0, max) + "..." : str;
}

function formatBody(body, maxLen) {
  if (body === undefined || body === null) return undefined;
  try {
    const json = JSON.stringify(body);
    return truncate(json, maxLen);
  } catch {
    return truncate(String(body), maxLen);
  }
}

/**
 * onRequest hook — records request start time and logs request details.
 */
export function onRequest(ctx) {
  const config = ctx?.config || {};
  const level = config.logLevel || "info";

  if (ctx?.metadata) {
    ctx.metadata.__requestStart = Date.now();
  }

  if (shouldLog(level, "info")) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      requestId: ctx.requestId,
      model: ctx.model,
      provider: ctx.provider,
      method: ctx.method || "POST",
    };

    if (config.includeBody) {
      logEntry.body = formatBody(ctx.body, config.maxBodyLength || 500);
    }

    console.log("[request-logger] REQUEST:", JSON.stringify(logEntry));
  }
}

/**
 * onResponse hook — logs response with timing.
 */
export function onResponse(ctx, response) {
  const config = ctx?.config || {};
  const level = config.logLevel || "info";
  const startTime = ctx?.metadata?.__requestStart || Date.now();
  const duration = Date.now() - startTime;

  if (shouldLog(level, "info")) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      requestId: ctx.requestId,
      model: ctx.model,
      durationMs: duration,
      status: response?.status || 200,
    };

    if (config.includeBody && response?.data) {
      logEntry.response = formatBody(response.data, config.maxBodyLength || 500);
    }

    console.log("[request-logger] RESPONSE:", JSON.stringify(logEntry));
  }

  return response;
}

/**
 * onError hook — logs errors with context.
 */
export function onError(ctx, error) {
  const config = ctx?.config || {};
  const level = config.logLevel || "info";
  const startTime = ctx?.metadata?.__requestStart || Date.now();
  const duration = Date.now() - startTime;

  if (shouldLog(level, "error")) {
    console.error("[request-logger] ERROR:", JSON.stringify({
      timestamp: new Date().toISOString(),
      requestId: ctx.requestId,
      model: ctx.model,
      durationMs: duration,
      error: error?.message || String(error),
    }));
  }
}