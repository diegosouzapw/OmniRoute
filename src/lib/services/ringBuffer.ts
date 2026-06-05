/** In-memory ring buffer for service log lines with optional file flush. */

import fs from "node:fs";
import type { LogLine } from "./types";

const DEFAULT_MAX_BYTES = 5_242_880; // 5 MB
const FLUSH_DEBOUNCE_MS = 60_000; // 1 min

export class RingBuffer {
  private entries: LogLine[] = [];
  private currentBytes = 0;
  private readonly maxBytes: number;
  private subscribers: Set<(line: LogLine) => void> = new Set();
  private flushTimer: ReturnType<typeof setTimeout> | null = null;
  private flushPath: string | null = null;
  private flushWarnedOnce = false;

  constructor(maxBytes: number = DEFAULT_MAX_BYTES) {
    this.maxBytes = maxBytes;
  }

  setFlushPath(filePath: string): void {
    this.flushPath = filePath;
  }

  push(line: LogLine): void {
    const entryBytes = Buffer.byteLength(line.line, "utf8") + 40;

    while (this.entries.length > 0 && this.currentBytes + entryBytes > this.maxBytes) {
      const evicted = this.entries.shift();
      if (evicted) {
        this.currentBytes -= Buffer.byteLength(evicted.line, "utf8") + 40;
        if (this.currentBytes < 0) this.currentBytes = 0;
      }
    }

    this.entries.push(line);
    this.currentBytes += entryBytes;

    for (const cb of this.subscribers) {
      try {
        cb(line);
      } catch {
        // subscriber errors must not crash the supervisor
      }
    }

    this.scheduleFlush();
  }

  snapshot(): LogLine[] {
    return this.entries.slice();
  }

  subscribe(cb: (line: LogLine) => void): () => void {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  private scheduleFlush(): void {
    if (!this.flushPath) return;
    if (this.flushTimer) return;
    this.flushTimer = setTimeout(() => {
      this.flushTimer = null;
      this.flushToDisk();
    }, FLUSH_DEBOUNCE_MS);
  }

  private flushToDisk(): void {
    if (!this.flushPath) return;
    try {
      const content = this.entries.map((e) => `${e.ts} [${e.stream}] ${e.line}`).join("\n");
      fs.writeFileSync(this.flushPath, content, "utf8");
    } catch (err: unknown) {
      if (!this.flushWarnedOnce) {
        this.flushWarnedOnce = true;
        const msg = err instanceof Error ? err.message : String(err);
        // Non-fatal — log once and stop trying
        console.warn(`[RingBuffer] flush to ${this.flushPath} failed: ${msg}`);
      }
    }
  }

  dispose(): void {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    this.subscribers.clear();
  }
}
