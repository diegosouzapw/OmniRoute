import type { PressureSeverity } from "@omniroute/open-sse/utils/resourcePressure.ts";

import type { IngestBudgetSource } from "./admissionBudget";

export interface IngestByteLease {
  readonly released: boolean;
  release(): void;
}

export function composeAdmissionLease(...leases: IngestByteLease[]): IngestByteLease {
  let released = false;
  return {
    get released() {
      return released;
    },
    release: () => {
      if (released) return;
      released = true;
      for (const lease of leases) lease.release();
    },
  };
}

export type IngestBudgetAcquireResult =
  | { status: "acquired"; lease: IngestByteLease }
  | { status: "body_exceeds_budget" }
  | { status: "unavailable" };

export interface IngestByteAdmissionOptions {
  maxInflightBytes?: number;
  budgetSource?: IngestBudgetSource;
  checkPressureSeverity?: () => PressureSeverity;
  onShed: (reason: "body_exceeds_budget" | "inflight_bytes_budget", lane: string) => void;
}

interface BudgetWaiter {
  resolve: () => void;
}

export class IngestByteAdmissionController {
  #inflightBytes = 0;
  readonly maxInflightBytes: number;
  readonly budgetSource: IngestBudgetSource;
  readonly #checkPressureSeverity: () => PressureSeverity;
  readonly #onShed: IngestByteAdmissionOptions["onShed"];
  #queues = new Map<string, BudgetWaiter[]>();
  #fairKeys: string[] = [];
  #fairCursor = 0;

  constructor(options: IngestByteAdmissionOptions) {
    this.maxInflightBytes = options.maxInflightBytes ?? Number.MAX_SAFE_INTEGER;
    this.budgetSource = options.budgetSource ?? "v8_heap";
    this.#checkPressureSeverity = options.checkPressureSeverity ?? (() => "normal");
    this.#onShed = options.onShed;
  }

  get inflightBytes(): number {
    return this.#inflightBytes;
  }

  pressureSeverity(): PressureSeverity {
    return this.#checkPressureSeverity();
  }

  canFit(bytes: number): boolean {
    return normalizeCharge(bytes) <= this.maxInflightBytes;
  }

  tryAcquire(bytes: number): IngestByteLease | null {
    const charge = normalizeCharge(bytes);
    if (this.#inflightBytes + charge > this.maxInflightBytes) return null;
    this.#inflightBytes += charge;
    let released = false;
    return {
      get released() {
        return released;
      },
      release: () => {
        if (released) return;
        released = true;
        this.#inflightBytes = Math.max(0, this.#inflightBytes - charge);
        this.#dispatchFair();
      },
    };
  }

  async acquireWithin(
    bytes: number,
    timeoutMs: number,
    signal?: AbortSignal,
    sessionKey = "default"
  ): Promise<IngestBudgetAcquireResult> {
    if (!this.canFit(bytes)) {
      this.#onShed("body_exceeds_budget", sessionKey);
      return { status: "body_exceeds_budget" };
    }
    const deadline = Date.now() + Math.max(0, Math.floor(timeoutMs));
    for (;;) {
      if (signal?.aborted) return { status: "unavailable" };
      const lease = this.tryAcquire(bytes);
      if (lease) return { status: "acquired", lease };
      const remaining = deadline - Date.now();
      if (remaining <= 0) return this.#timeout(sessionKey);

      let queue = this.#queues.get(sessionKey);
      if (!queue) {
        queue = [];
        this.#queues.set(sessionKey, queue);
        this.#fairKeys.push(sessionKey);
      }
      let resolveParked: (() => void) | null = null;
      const waiter = { resolve: () => resolveParked?.() };
      const parked = new Promise<void>((resolve) => {
        resolveParked = resolve;
        queue.push(waiter);
      });
      let timer: ReturnType<typeof setTimeout> | null = null;
      const races: Array<Promise<boolean>> = [
        parked.then(() => false),
        new Promise<boolean>((resolve) => {
          timer = setTimeout(() => resolve(true), remaining);
        }),
      ];
      let onAbort: (() => void) | null = null;
      if (signal) {
        races.push(
          new Promise<boolean>((resolve) => {
            onAbort = () => resolve(true);
            signal.addEventListener("abort", onAbort, { once: true });
            if (signal.aborted) resolve(true);
          })
        );
      }
      const timedOut = await Promise.race(races);
      this.#removeWaiter(sessionKey, waiter);
      if (timer) clearTimeout(timer);
      if (onAbort) signal?.removeEventListener("abort", onAbort);
      if (timedOut) {
        if (signal?.aborted) return { status: "unavailable" };
        return this.#timeout(sessionKey);
      }
    }
  }

  #timeout(sessionKey: string): IngestBudgetAcquireResult {
    this.#onShed("inflight_bytes_budget", sessionKey);
    return { status: "unavailable" };
  }

  #removeWaiter(key: string, waiter: BudgetWaiter): void {
    const queue = this.#queues.get(key);
    if (!queue) return;
    const index = queue.indexOf(waiter);
    if (index >= 0) queue.splice(index, 1);
    if (queue.length === 0) this.#removeFairKey(key);
  }

  #removeFairKey(key: string): void {
    this.#queues.delete(key);
    const index = this.#fairKeys.indexOf(key);
    if (index < 0) return;
    this.#fairKeys.splice(index, 1);
    if (index < this.#fairCursor) this.#fairCursor -= 1;
    if (this.#fairKeys.length === 0) this.#fairCursor = 0;
  }

  #dispatchFair(): void {
    if (this.#fairKeys.length === 0) return;
    for (let i = 0; i < this.#fairKeys.length; i++) {
      const key = this.#fairKeys[this.#fairCursor % this.#fairKeys.length];
      this.#fairCursor += 1;
      const queue = this.#queues.get(key);
      if (!queue || queue.length === 0) continue;
      const waiter = queue.shift() as BudgetWaiter;
      if (queue.length === 0) this.#removeFairKey(key);
      waiter.resolve();
      return;
    }
  }
}

function normalizeCharge(bytes: number): number {
  return Math.max(0, Math.floor(bytes));
}
