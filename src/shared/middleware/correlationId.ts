/**
 * Correlation ID Middleware — FASE-04 Observability
 *
 * Generates and propagates correlation IDs (X-Request-Id) across
 * requests and responses for distributed tracing. Uses AsyncLocalStorage
 * to make the correlation ID available in any downstream code.
 *
 * @module middleware/correlationId
 */

import { AsyncLocalStorage } from "node:async_hooks";
import crypto from "node:crypto";

const correlationStore = new AsyncLocalStorage();

/**
 * Generate a unique correlation ID.
 * @returns {string} UUID-like correlation ID
 */
function generateCorrelationId() {
  return crypto.randomUUID();
}

/**
 * Get the current correlation ID from async context.
 * @returns {string|undefined}
 */
export function getCorrelationId() {
  return correlationStore.getStore();
}

/**
 * Run a function within a correlation context.
 * If a correlationId is provided, it is used; otherwise a new one is generated.
 *
 * @param {string|null} correlationId - Optional existing correlation ID
 * @param {Function} fn - Function to run in context
 * @returns {*} Result of fn()
 */
export function runWithCorrelation(correlationId, fn) {
  const id = correlationId || generateCorrelationId();
  return correlationStore.run(id, fn);
}

/**
 * Express/Next.js middleware that injects correlation IDs.
 *
 * Usage:
 *   // In Next.js middleware or Express app
 *   import { correlationMiddleware } from './correlationId.js';
 *   app.use(correlationMiddleware);
 *
 * @param {Request} request
 * @param {Function} next
 * @returns {Promise<Response>}
 */
export function correlationMiddleware(request, next) {
  const requestId =
    request.headers.get("x-request-id") ||
    request.headers.get("x-correlation-id") ||
    generateCorrelationId();

  return runWithCorrelation(requestId, async () => {
    const response = await next();

    // Attach correlation ID to response
    if (response && response.headers) {
      response.headers.set("x-request-id", requestId);
    }

    return response;
  });
}

/**
 * Create a logger wrapper that automatically includes correlation IDs.
 *
 * @param {Object} baseLogger - Base logger with info/warn/error methods
 * @returns {Object} Wrapped logger
 */
export function createCorrelatedLogger(baseLogger) {
  const withCorrelation = (level, ...args) => {
    const correlationId = getCorrelationId();
    if (correlationId) {
      const meta = typeof args[args.length - 1] === "object" ? args.pop() : {};
      meta.correlationId = correlationId;
      args.push(meta);
    }
    baseLogger[level](...args);
  };

  return {
    info: (...args) => withCorrelation("info", ...args),
    warn: (...args) => withCorrelation("warn", ...args),
    error: (...args) => withCorrelation("error", ...args),
    debug: (...args) => withCorrelation("debug", ...args),
  };
}
