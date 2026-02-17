/**
 * Rate-Limit Semaphore
 *
 * Per-model concurrency limiter with FIFO queue for round-robin combo strategy.
 * When a model is at max concurrency, requests wait in a queue instead of failing.
 * When a model hits rate-limits, it's temporarily paused and queued requests wait.
 *
 * All state is in-memory — resets on server restart (by design, since rate-limit
 * windows are typically short-lived).
 */

/**
 * @typedef {Object} ModelGate
 * @property {number} running - Currently running requests
 * @property {number} max - Max concurrent requests
 * @property {Array<{resolve: Function, reject: Function, timer: NodeJS.Timeout}>} queue - FIFO wait queue
 * @property {number|null} rateLimitedUntil - Timestamp when rate-limit expires (null = not limited)
 */

/** @type {Map<string, ModelGate>} */
const gates = new Map();

/**
 * Get or create gate for a model
 * @param {string} modelStr
 * @param {number} maxConcurrency
 * @returns {ModelGate}
 */
function getGate(modelStr, maxConcurrency = 3) {
  if (!gates.has(modelStr)) {
    gates.set(modelStr, {
      running: 0,
      max: maxConcurrency,
      queue: [],
      rateLimitedUntil: null,
    });
  }
  const gate = gates.get(modelStr);
  // Update max if config changed
  gate.max = maxConcurrency;
  return gate;
}

/**
 * Check if a model is currently rate-limited
 * @param {ModelGate} gate
 * @returns {boolean}
 */
function isRateLimited(gate) {
  if (!gate.rateLimitedUntil) return false;
  if (Date.now() >= gate.rateLimitedUntil) {
    gate.rateLimitedUntil = null;
    return false;
  }
  return true;
}

/**
 * Try to drain queued requests when slots become available
 * @param {string} modelStr
 */
function drainQueue(modelStr) {
  const gate = gates.get(modelStr);
  if (!gate) return;

  while (gate.queue.length > 0 && gate.running < gate.max && !isRateLimited(gate)) {
    const next = gate.queue.shift();
    clearTimeout(next.timer);
    gate.running++;
    next.resolve(createReleaseFn(modelStr));
  }
}

/**
 * Create a release function for a slot
 * @param {string} modelStr
 * @returns {Function}
 */
function createReleaseFn(modelStr) {
  let released = false;
  return () => {
    if (released) return;
    released = true;
    const gate = gates.get(modelStr);
    if (gate && gate.running > 0) {
      gate.running--;
      drainQueue(modelStr);
    }
  };
}

/**
 * Acquire a concurrency slot for a model.
 * If slots are available and model is not rate-limited, resolves immediately.
 * Otherwise waits in a FIFO queue until a slot opens or timeout expires.
 *
 * @param {string} modelStr - The model identifier
 * @param {Object} [options]
 * @param {number} [options.maxConcurrency=3] - Max concurrent requests for this model
 * @param {number} [options.timeoutMs=30000] - Max wait time in queue
 * @returns {Promise<Function>} Release function — MUST be called when done
 * @throws {Error} If queue timeout expires ("SEMAPHORE_TIMEOUT")
 */
export function acquire(modelStr, { maxConcurrency = 3, timeoutMs = 30000 } = {}) {
  const gate = getGate(modelStr, maxConcurrency);

  // Fast path: slot available and not rate-limited
  if (gate.running < gate.max && !isRateLimited(gate)) {
    gate.running++;
    return Promise.resolve(createReleaseFn(modelStr));
  }

  // Slow path: enqueue and wait
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // Remove from queue on timeout
      const idx = gate.queue.findIndex((item) => item.timer === timer);
      if (idx !== -1) gate.queue.splice(idx, 1);
      const err = new Error(`Semaphore timeout after ${timeoutMs}ms for ${modelStr}`);
      (err as any).code = "SEMAPHORE_TIMEOUT";
      reject(err);
    }, timeoutMs);

    gate.queue.push({ resolve, reject, timer });
  });
}

/**
 * Mark a model as rate-limited for a given duration.
 * Existing running requests continue, but new acquisitions are blocked
 * until the cooldown expires. After expiry, the queue drains automatically.
 *
 * @param {string} modelStr - The model identifier
 * @param {number} cooldownMs - How long to block (milliseconds)
 */
export function markRateLimited(modelStr, cooldownMs) {
  const gate = getGate(modelStr);
  gate.rateLimitedUntil = Date.now() + cooldownMs;

  // Schedule drain after cooldown expires
  setTimeout(() => {
    if (gate.rateLimitedUntil && Date.now() >= gate.rateLimitedUntil) {
      gate.rateLimitedUntil = null;
      drainQueue(modelStr);
    }
  }, cooldownMs + 50); // +50ms buffer
}

/**
 * Get stats for all tracked models (for monitoring/UI)
 * @returns {Object} Map of modelStr → { running, queued, max, rateLimitedUntil }
 */
export function getStats() {
  const stats = {};
  for (const [model, gate] of gates) {
    stats[model] = {
      running: gate.running,
      queued: gate.queue.length,
      max: gate.max,
      rateLimitedUntil: gate.rateLimitedUntil
        ? new Date(gate.rateLimitedUntil).toISOString()
        : null,
    };
  }
  return stats;
}

/**
 * Reset all gates (for testing)
 */
export function resetAll() {
  for (const [, gate] of gates) {
    for (const item of gate.queue) {
      clearTimeout(item.timer);
      item.reject(new Error("Semaphore reset"));
    }
  }
  gates.clear();
}
