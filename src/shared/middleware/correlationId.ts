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
import crypto from "crypto";

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
