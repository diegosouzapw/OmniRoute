import { setImmediate as yieldToEventLoop } from "node:timers/promises";

export const COST_MATCH_BATCH_SIZE = 256;

export interface RecordedCostRow {
  rowId: number;
  apiKeyId: string;
  timestamp: number;
  cost: number;
}

/**
 * Nearest unused cost in timestamp/row-id order. A Fenwick tree indexes which
 * rows remain available, avoiding rescans of consumed prefixes or dense windows.
 * Construction is O(C); each match/removal is O(log C), including duplicate times.
 */
export class RecordedCostMatcher {
  private readonly available: Uint32Array;
  private remaining: number;

  private constructor(private readonly rows: readonly RecordedCostRow[]) {
    this.available = new Uint32Array(rows.length + 1);
    this.remaining = rows.length;
  }

  /** Input must already be sorted by timestamp, then row ID (the DB query order). */
  static async create(rows: readonly RecordedCostRow[]): Promise<RecordedCostMatcher> {
    const matcher = new RecordedCostMatcher(rows);
    for (let i = 1; i <= rows.length; i++) {
      // Every row starts available: each Fenwick bucket contains its low bit.
      matcher.available[i] = i & -i;
      if (i % COST_MATCH_BATCH_SIZE === 0) await yieldToEventLoop();
    }
    return matcher;
  }

  private lowerBound(timestamp: number): number {
    let lo = 0;
    let hi = this.rows.length;
    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (this.rows[mid].timestamp < timestamp) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  /** Count available rows strictly before this zero-based index. */
  private countBefore(index: number): number {
    let count = 0;
    for (let i = index; i > 0; i -= i & -i) count += this.available[i];
    return count;
  }

  /** Zero-based index of an available row's one-based rank. */
  private indexAtRank(rank: number): number {
    let index = 0;
    for (let step = 2 ** Math.floor(Math.log2(this.rows.length)); step >= 1; step /= 2) {
      const next = index + step;
      if (next < this.available.length && this.available[next] < rank) {
        rank -= this.available[next];
        index = next;
      }
    }
    return index;
  }

  takeClosest(timestamp: number, toleranceMs: number): RecordedCostRow | null {
    if (!this.remaining || !Number.isFinite(timestamp)) return null;
    const before = this.countBefore(this.lowerBound(timestamp));
    let bestIndex = -1;
    if (before > 0) {
      const previous = this.indexAtRank(before);
      // The predecessor rank is the LAST row at that time. Preserve the old
      // scan's tie rule by choosing the FIRST still-unused row at the same time.
      const firstAtTime = this.lowerBound(this.rows[previous].timestamp);
      bestIndex = this.indexAtRank(this.countBefore(firstAtTime) + 1);
    }
    if (before < this.remaining) {
      const next = this.indexAtRank(before + 1);
      if (
        bestIndex < 0 ||
        Math.abs(this.rows[next].timestamp - timestamp) <
          Math.abs(this.rows[bestIndex].timestamp - timestamp)
      )
        bestIndex = next;
    }
    const best = this.rows[bestIndex];
    if (!best || Math.abs(best.timestamp - timestamp) > toleranceMs) return null;
    for (let i = bestIndex + 1; i < this.available.length; i += i & -i) this.available[i]--;
    this.remaining--;
    return best;
  }
}
