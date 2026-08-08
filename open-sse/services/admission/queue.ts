/**
 * Bounded multi-tenant fair queue (round-robin across tenant buckets).
 * Count + total cost caps; no unbounded arrays of timers beyond one per entry.
 */

/**
 * After this many pass-overs while unfittable, reserve capacity for the aged head
 * instead of indefinitely admitting smaller work from other tenants.
 */
const MAX_UNFITTABLE_SKIPS = 2;

export interface QueueEntry<T> {
  id: string;
  tenantKey: string;
  cost: number;
  enqueuedAtMs: number;
  deadlineMs: number;
  payload: T;
  timerId?: unknown;
  /** Times this head was skipped because it did not fit available cost. */
  skipCount?: number;
}

export interface FairQueueSnapshot {
  count: number;
  cost: number;
}

export class FairCostQueue<T> {
  private readonly buckets = new Map<string, QueueEntry<T>[]>();
  private readonly order: string[] = [];
  private cursor = 0;
  private count = 0;
  private cost = 0;

  constructor(
    readonly maxCount: number,
    readonly maxCost: number
  ) {}

  get size(): number {
    return this.count;
  }

  get totalCost(): number {
    return this.cost;
  }

  snapshot(): FairQueueSnapshot {
    return { count: this.count, cost: this.cost };
  }

  canAccept(entryCost: number): boolean {
    if (!Number.isSafeInteger(entryCost) || entryCost <= 0) return false;
    if (this.count >= this.maxCount) return false;
    if (entryCost > this.maxCost - this.cost) return false;
    return true;
  }

  enqueue(entry: QueueEntry<T>): boolean {
    if (!this.canAccept(entry.cost)) return false;
    let bucket = this.buckets.get(entry.tenantKey);
    if (!bucket) {
      bucket = [];
      this.buckets.set(entry.tenantKey, bucket);
      this.order.push(entry.tenantKey);
    }
    bucket.push(entry);
    this.count += 1;
    this.cost += entry.cost;
    return true;
  }

  /**
   * Round-robin dequeue, optionally skipping tenant heads that do not fit available cost.
   * After MAX_UNFITTABLE_SKIPS actual pass-overs, an unfittable head reserves capacity:
   * smaller work is not admitted ahead of it until it fits, is removed, or capacity rises.
   */
  dequeue(maxCost = Number.MAX_SAFE_INTEGER): QueueEntry<T> | undefined {
    if (this.count === 0) return undefined;
    const n = this.order.length;

    // Bounded anti-starvation: prefer the oldest aged unfittable head once reserved.
    let reserved: { idx: number; entry: QueueEntry<T> } | undefined;
    for (let i = 0; i < n; i++) {
      const idx = (this.cursor + i) % n;
      const tenant = this.order[idx];
      const entry = this.buckets.get(tenant)?.[0];
      if (!entry) continue;
      if ((entry.skipCount ?? 0) >= MAX_UNFITTABLE_SKIPS) {
        if (!reserved || entry.enqueuedAtMs < reserved.entry.enqueuedAtMs) {
          reserved = { idx, entry };
        }
      }
    }
    if (reserved) {
      if (reserved.entry.cost > maxCost) return undefined;
      return this.takeAt(reserved.idx);
    }

    const bypassed: QueueEntry<T>[] = [];
    for (let i = 0; i < n; i++) {
      const idx = (this.cursor + i) % n;
      const tenant = this.order[idx];
      const bucket = this.buckets.get(tenant);
      const entry = bucket?.[0];
      if (!entry) continue;
      if (entry.cost > maxCost) {
        bypassed.push(entry);
        continue;
      }
      // Only an actual smaller admission counts as a pass-over. Merely polling
      // with no available capacity must not age a head into reservation.
      for (const skipped of bypassed) {
        skipped.skipCount = (skipped.skipCount ?? 0) + 1;
      }
      return this.takeAt(idx);
    }
    return undefined;
  }

  private takeAt(idx: number): QueueEntry<T> | undefined {
    const tenant = this.order[idx];
    const bucket = this.buckets.get(tenant);
    const entry = bucket?.[0];
    if (!entry) return undefined;
    bucket!.shift();
    this.count -= 1;
    this.cost -= entry.cost;
    entry.skipCount = 0;
    if (bucket!.length === 0) {
      this.buckets.delete(tenant);
      this.order.splice(idx, 1);
      this.cursor = this.order.length === 0 ? 0 : idx % this.order.length;
    } else {
      this.cursor = (idx + 1) % this.order.length;
    }
    return entry;
  }

  /** Peek next without removing (for oversized-vs-limit checks). */
  peek(): QueueEntry<T> | undefined {
    if (this.count === 0) return undefined;
    const n = this.order.length;
    for (let i = 0; i < n; i++) {
      const idx = (this.cursor + i) % n;
      const tenant = this.order[idx];
      const bucket = this.buckets.get(tenant);
      if (bucket && bucket.length > 0) return bucket[0];
    }
    return undefined;
  }

  removeById(id: string): QueueEntry<T> | undefined {
    for (let ti = 0; ti < this.order.length; ti++) {
      const tenant = this.order[ti];
      const bucket = this.buckets.get(tenant);
      if (!bucket) continue;
      const idx = bucket.findIndex((e) => e.id === id);
      if (idx < 0) continue;
      const [entry] = bucket.splice(idx, 1);
      this.count -= 1;
      this.cost -= entry.cost;
      if (bucket.length === 0) {
        this.buckets.delete(tenant);
        this.order.splice(ti, 1);
        if (this.order.length === 0) {
          this.cursor = 0;
        } else if (ti < this.cursor) {
          // Removing a prior bucket shifts the successor into cursor - 1.
          this.cursor -= 1;
        } else if (this.cursor >= this.order.length) {
          // Removed the final bucket at the cursor; wrap to the head.
          this.cursor = 0;
        }
        // ti === cursor: leave cursor so it now points at the logical successor.
        // ti > cursor: cursor is unaffected.
      }
      return entry;
    }
    return undefined;
  }

  drain(): QueueEntry<T>[] {
    const out: QueueEntry<T>[] = [];
    while (true) {
      const e = this.dequeue();
      if (!e) break;
      out.push(e);
    }
    this.cursor = 0;
    return out;
  }
}
