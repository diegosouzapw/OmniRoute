/**
 * Stream State Machine — FASE-09 E2E Flow Hardening
 *
 * Explicit state tracking for SSE streams with transition logging
 * and lifecycle management.
 *
 * States: INITIALIZED → CONNECTING → STREAMING → COMPLETED | FAILED | CANCELLED
 *
 * @module sse/services/streamState
 */

export const STREAM_STATES = {
  INITIALIZED: "initialized",
  CONNECTING: "connecting",
  STREAMING: "streaming",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

type StreamState = (typeof STREAM_STATES)[keyof typeof STREAM_STATES];

interface StreamTransition {
  from: string;
  to: string;
  at: number;
  elapsed: number;
  [key: string]: unknown;
}

interface StreamMetadata {
  model?: string;
  provider?: string;
  [key: string]: unknown;
}

// Valid state transitions
const VALID_TRANSITIONS: Record<string, string[]> = {
  [STREAM_STATES.INITIALIZED]: [STREAM_STATES.CONNECTING, STREAM_STATES.CANCELLED],
  [STREAM_STATES.CONNECTING]: [
    STREAM_STATES.STREAMING,
    STREAM_STATES.FAILED,
    STREAM_STATES.CANCELLED,
  ],
  [STREAM_STATES.STREAMING]: [
    STREAM_STATES.COMPLETED,
    STREAM_STATES.FAILED,
    STREAM_STATES.CANCELLED,
  ],
  [STREAM_STATES.COMPLETED]: [],
  [STREAM_STATES.FAILED]: [],
  [STREAM_STATES.CANCELLED]: [],
};

/**
 * Tracks the lifecycle of a single SSE stream.
 */
export class StreamTracker {
  requestId: string;
  state: StreamState;
  metadata: StreamMetadata;
  transitions: StreamTransition[];
  startedAt: number;
  completedAt: number | null;
  firstChunkAt: number | null;
  chunkCount: number;
  totalBytes: number;
  error: string | null;

  constructor(requestId: string, metadata: StreamMetadata = {}) {
    this.requestId = requestId;
    this.state = STREAM_STATES.INITIALIZED;
    this.metadata = metadata;
    this.transitions = [];
    this.startedAt = Date.now();
    this.completedAt = null;
    this.firstChunkAt = null;
    this.chunkCount = 0;
    this.totalBytes = 0;
    this.error = null;
  }

  /**
   * Transition to a new state.
   *
   * @param {string} newState - Target state
   * @param {Object} [transitionMeta] - Metadata for this transition
   * @returns {boolean} Whether the transition was valid
   */
  transition(newState, transitionMeta = {}) {
    const allowed = VALID_TRANSITIONS[this.state] || [];
    if (!allowed.includes(newState)) {
      console.warn(
        `[StreamTracker] Invalid transition: ${this.state} → ${newState} (request: ${this.requestId})`
      );
      return false;
    }

    const now = Date.now();
    this.transitions.push({
      from: this.state,
      to: newState,
      at: now,
      elapsed: now - this.startedAt,
      ...transitionMeta,
    });

    this.state = newState;

    if (newState === STREAM_STATES.STREAMING && !this.firstChunkAt) {
      this.firstChunkAt = now;
    }

    if (
      newState === STREAM_STATES.COMPLETED ||
      newState === STREAM_STATES.FAILED ||
      newState === STREAM_STATES.CANCELLED
    ) {
      this.completedAt = now;
    }

    return true;
  }

  /**
   * Record a received chunk.
   * @param {number} bytes - Chunk size in bytes
   */
  recordChunk(bytes) {
    this.chunkCount++;
    this.totalBytes += bytes;
  }

  /**
   * Mark as failed with an error.
   * @param {Error|string} error
   */
  fail(error) {
    this.error = typeof error === "string" ? error : error.message;
    this.transition(STREAM_STATES.FAILED, { error: this.error });
  }

  /**
   * Get telemetry summary for this stream.
   * @returns {Object}
   */
  getSummary() {
    const endTime = this.completedAt || Date.now();
    return {
      requestId: this.requestId,
      state: this.state,
      model: this.metadata.model,
      provider: this.metadata.provider,
      duration: endTime - this.startedAt,
      ttfb: this.firstChunkAt ? this.firstChunkAt - this.startedAt : null,
      chunkCount: this.chunkCount,
      totalBytes: this.totalBytes,
      transitions: this.transitions.length,
      error: this.error,
    };
  }

  /**
   * Whether the stream is in a terminal state.
   * @returns {boolean}
   */
  isTerminal(): boolean {
    const terminalStates: string[] = [STREAM_STATES.COMPLETED, STREAM_STATES.FAILED, STREAM_STATES.CANCELLED];
    return terminalStates.includes(this.state);
  }
}

// ─── Active Stream Registry ─────────────────

const activeStreams = new Map<string, StreamTracker>();
const MAX_COMPLETED_HISTORY = parseInt(process.env.STREAM_HISTORY_MAX || "50", 10);
const completedStreams: ReturnType<StreamTracker["getSummary"]>[] = [];

/**
 * Create and register a new stream tracker.
 * @param {string} requestId
 * @param {Object} [metadata]
 * @returns {StreamTracker}
 */
export function createStreamTracker(requestId, metadata) {
  const tracker = new StreamTracker(requestId, metadata);
  activeStreams.set(requestId, tracker);
  return tracker;
}

/**
 * Complete (archive) a stream — moves from active to completed history.
 * @param {string} requestId
 */
export function archiveStream(requestId) {
  const tracker = activeStreams.get(requestId);
  if (!tracker) return;

  activeStreams.delete(requestId);
  completedStreams.push(tracker.getSummary());

  // Keep history bounded
  while (completedStreams.length > MAX_COMPLETED_HISTORY) {
    completedStreams.shift();
  }
}

/**
 * Get all active streams (for monitoring dashboard).
 * @returns {Array<Object>}
 */
export function getActiveStreams() {
  return Array.from(activeStreams.values()).map((t) => t.getSummary());
}

/**
 * Get recent completed streams.
 * @param {number} [limit=20]
 * @returns {Array<Object>}
 */
export function getRecentCompletedStreams(limit = 20) {
  return completedStreams.slice(-limit);
}
