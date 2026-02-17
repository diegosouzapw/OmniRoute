// @ts-check
/**
 * Stream Tracker — Unified SSE stream monitoring
 *
 * Tracks token counts, latency, and errors during streaming responses.
 * Emits periodic progress callbacks for real-time monitoring.
 *
 * @module shared/utils/streamTracker
 */

/**
 * @typedef {Object} StreamMetrics
 * @property {number} startTime - Timestamp when stream started
 * @property {number} firstTokenTime - Time to first token (ms)
 * @property {number} totalTokens - Total tokens received
 * @property {number} totalChunks - Total SSE chunks received
 * @property {number} elapsedMs - Total elapsed time (ms)
 * @property {number} tokensPerSecond - Current throughput
 * @property {boolean} complete - Whether stream is complete
 * @property {string|null} error - Error message if any
 * @property {string|null} finishReason - Stop reason from provider
 */

export class StreamTracker {
  /** @param {{ onProgress?: (metrics: StreamMetrics) => void, progressIntervalMs?: number }} [options={}] */
  constructor(options = {}) {
    this._onProgress = options.onProgress || null;
    this._progressIntervalMs = options.progressIntervalMs || 500;

    this._startTime = Date.now();
    this._firstTokenTime = 0;
    this._totalTokens = 0;
    this._totalChunks = 0;
    this._complete = false;
    this._error = null;
    this._finishReason = null;
    this._lastProgressAt = 0;
    this._buffer = "";
  }

  /**
   * Record an incoming SSE chunk.
   * @param {string|Object} chunk - Raw SSE text or parsed data
   */
  onChunk(chunk) {
    this._totalChunks++;

    if (this._totalChunks === 1) {
      this._firstTokenTime = Date.now() - this._startTime;
    }

    // Try to extract token count from chunk
    let data = chunk;
    if (typeof chunk === "string") {
      // Parse SSE if formatted
      if (chunk.startsWith("data: ")) {
        const payload = chunk.slice(6).trim();
        if (payload === "[DONE]") {
          this._complete = true;
          this._emitProgress();
          return;
        }
        try {
          data = JSON.parse(payload);
        } catch {
          data = null;
        }
      }
    }

    if (data && typeof data === "object") {
      // OpenAI format: choices[0].delta.content
      const content = data.choices?.[0]?.delta?.content;
      if (content) {
        // Rough token estimate (~4 chars per token)
        this._totalTokens += Math.ceil(content.length / 4);
      }

      // Check for finish reason
      const reason = data.choices?.[0]?.finish_reason;
      if (reason) {
        this._finishReason = reason;
      }

      // Usage in final chunk (OpenAI includes this)
      if (data.usage?.completion_tokens) {
        this._totalTokens = data.usage.completion_tokens;
      }
    }

    this._maybeEmitProgress();
  }

  /**
   * Mark stream as errored.
   * @param {string|Error} error
   */
  onError(error) {
    this._error = typeof error === "string" ? error : error.message;
    this._complete = true;
    this._emitProgress();
  }

  /** Mark stream as complete. */
  onComplete() {
    this._complete = true;
    this._emitProgress();
  }

  /** @returns {StreamMetrics} Current metrics */
  getMetrics() {
    const elapsedMs = Date.now() - this._startTime;
    const tokensPerSecond = elapsedMs > 0 ? this._totalTokens / (elapsedMs / 1000) : 0;

    return {
      startTime: this._startTime,
      firstTokenTime: this._firstTokenTime,
      totalTokens: this._totalTokens,
      totalChunks: this._totalChunks,
      elapsedMs,
      tokensPerSecond: Math.round(tokensPerSecond * 10) / 10,
      complete: this._complete,
      error: this._error,
      finishReason: this._finishReason,
    };
  }

  /** @private */
  _maybeEmitProgress() {
    const now = Date.now();
    if (now - this._lastProgressAt >= this._progressIntervalMs) {
      this._emitProgress();
    }
  }

  /** @private */
  _emitProgress() {
    this._lastProgressAt = Date.now();
    if (this._onProgress) {
      this._onProgress(this.getMetrics());
    }
  }
}

/**
 * Create a TransformStream that tracks SSE progress.
 *
 * @param {{ onProgress?: (metrics: StreamMetrics) => void }} [options={}]
 * @returns {{ stream: TransformStream, tracker: StreamTracker }}
 */
export function createStreamTracker(options = {}) {
  const tracker = new StreamTracker(options);

  const stream = new TransformStream({
    transform(chunk, controller) {
      const text = typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk);
      const lines = text.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          tracker.onChunk(line);
        }
      }

      controller.enqueue(chunk);
    },
    flush() {
      tracker.onComplete();
    },
  });

  return { stream, tracker };
}
