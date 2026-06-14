/**
 * In-memory ring buffer for intercepted traffic.
 *
 * Stores up to `INSPECTOR_BUFFER_SIZE` (default 1000) entries; rotates
 * oldest-first when capacity is reached. Auto-applies kind detection and
 * context-key fingerprinting on push, and broadcasts mutations to all
 * subscribers (WebSocket consumers).
 *
 * Body sizes are clamped to `INSPECTOR_MAX_BODY_KB` (default 1024 KiB) and
 * marked with a truncation suffix so the UI does not have to guess.
 *
 * See `_orchestration/master-plan-group-A.md` §3.6 and
 * `12-traffic-inspector.plan.md` §4.1.
 */

import { computeContextKey } from "./contextKey.ts";
import { detectKind } from "./kindDetector.ts";
import type { InterceptedRequest, ListFilters, WsEvent } from "./types.ts";

const TRUNCATION_MARKER = "\n…(truncated for performance)";

function parseEnvNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function getMaxBodyBytes(): number {
  const kb = parseEnvNumber(process.env.INSPECTOR_MAX_BODY_KB, 1024);
  return Math.max(1, Math.floor(kb)) * 1024;
}

function capBody(body: string | null, maxBytes: number): string | null {
  if (body == null) return body;
  if (body.length <= maxBytes) return body;
  return body.slice(0, maxBytes) + TRUNCATION_MARKER;
}

function statusBucket(status: InterceptedRequest["status"]): string {
  if (status === "error") return "error";
  if (status === "in-flight") return "in-flight";
  if (typeof status !== "number") return "unknown";
  if (status >= 200 && status < 300) return "2xx";
  if (status >= 300 && status < 400) return "3xx";
  if (status >= 400 && status < 500) return "4xx";
  if (status >= 500 && status < 600) return "5xx";
  return "unknown";
}

function matchesFilters(req: InterceptedRequest, filters?: ListFilters): boolean {
  if (!filters) return true;

  if (filters.profile && filters.profile !== "all") {
    if (filters.profile === "llm" && req.detectedKind !== "llm") return false;
    if (filters.profile === "custom" && req.source !== "custom-host") return false;
  }

  if (filters.host && req.host !== filters.host) return false;
  if (filters.agent && req.agent !== filters.agent) return false;
  if (filters.source && req.source !== filters.source) return false;
  if (filters.sessionId && req.sessionId !== filters.sessionId) return false;

  if (filters.status) {
    const bucket = statusBucket(req.status);
    if (bucket !== filters.status) return false;
  }

  return true;
}

/**
 * Ring buffer with broadcast support.
 *
 * Designed to be process-singleton (`globalTrafficBuffer`); tests can
 * instantiate isolated buffers when needed.
 */
export class TrafficBuffer {
  private buffer: InterceptedRequest[] = [];
  private subscribers = new Set<(ev: WsEvent) => void>();
  private maxSize: number;
  private maxBodyBytes: number;

  constructor(
    maxSize: number = parseEnvNumber(process.env.INSPECTOR_BUFFER_SIZE, 1000),
    maxBodyBytes: number = getMaxBodyBytes()
  ) {
    this.maxSize = Math.max(1, Math.floor(maxSize));
    this.maxBodyBytes = Math.max(1, Math.floor(maxBodyBytes));
  }

  /**
   * Append a new intercepted request. Applies kind detection and
   * context-key fingerprinting if missing, and clamps body sizes.
   * Broadcasts a `new` event to all subscribers.
   */
  push(req: InterceptedRequest): void {
    if (!req.detectedKind) {
      req.detectedKind = detectKind(req);
    }
    if (!req.contextKey && req.detectedKind === "llm") {
      const key = computeContextKey(req);
      if (key) req.contextKey = key;
    }

    req.requestBody = capBody(req.requestBody, this.maxBodyBytes);
    req.responseBody = capBody(req.responseBody, this.maxBodyBytes);

    this.buffer.push(req);
    while (this.buffer.length > this.maxSize) {
      this.buffer.shift();
    }

    this.broadcast({ type: "new", data: req });
  }

  /**
   * Update an existing entry in place by id. No-op if the id is unknown
   * (e.g. already rotated out). Broadcasts an `update` event on success.
   */
  update(id: string, req: InterceptedRequest): void {
    const idx = this.buffer.findIndex((r) => r.id === id);
    if (idx < 0) return;

    req.requestBody = capBody(req.requestBody, this.maxBodyBytes);
    req.responseBody = capBody(req.responseBody, this.maxBodyBytes);

    this.buffer[idx] = req;
    this.broadcast({ type: "update", data: req });
  }

  /**
   * Lookup by id (linear scan — buffer is bounded to ~1000 entries).
   */
  get(id: string): InterceptedRequest | null {
    return this.buffer.find((r) => r.id === id) ?? null;
  }

  /**
   * Return a filtered snapshot of the buffer. Filtering is in-memory and
   * cheap (~O(maxSize)). A new array is returned each call.
   */
  list(filters?: ListFilters): InterceptedRequest[] {
    if (!filters) return [...this.buffer];
    return this.buffer.filter((r) => matchesFilters(r, filters));
  }

  /**
   * Empty the buffer and notify subscribers. Subscriber count is preserved.
   */
  clear(): void {
    this.buffer = [];
    this.broadcast({ type: "clear" });
  }

  /**
   * Register a listener. Immediately receives a `snapshot` event with the
   * current buffer state. Returns an `unsubscribe` function.
   */
  subscribe(fn: (ev: WsEvent) => void): () => void {
    this.subscribers.add(fn);
    try {
      fn({ type: "snapshot", data: [...this.buffer] });
    } catch {
      // a subscriber's snapshot handler failure must not break subscription
    }
    return () => {
      this.subscribers.delete(fn);
    };
  }

  /**
   * Current subscriber count — exposed for tests / diagnostics.
   */
  subscriberCount(): number {
    return this.subscribers.size;
  }

  /**
   * Current entry count — exposed for tests / diagnostics.
   */
  size(): number {
    return this.buffer.length;
  }

  private broadcast(ev: WsEvent): void {
    for (const fn of this.subscribers) {
      try {
        fn(ev);
      } catch {
        // one subscriber's failure must not block others
      }
    }
  }
}

/**
 * Process-wide singleton consumed by `agentBridgeHook`, `httpProxyServer`,
 * REST/WS routes, and tests.
 */
export const globalTrafficBuffer = new TrafficBuffer();
