import { batchSaveCostEntries } from "@/lib/db/domainState";

export interface BufferedCostEntry {
  apiKeyId: string;
  cost: number;
  timestamp: number;
}

interface SpendBatchWriterOptions {
  flushIntervalMs?: number;
  maxBufferSize?: number;
  persistEntries?: (entries: BufferedCostEntry[]) => Promise<void> | void;
  logger?: Pick<Console, "log" | "error">;
}

type FlushResult = {
  flushedEntries: number;
  uniqueKeys: number;
  requeued: boolean;
};

const DEFAULT_FLUSH_INTERVAL_MS = 60_000;
const DEFAULT_MAX_BUFFER_SIZE = 1_000;

function getFlushIntervalMs() {
  const parsed = Number.parseInt(process.env.OMNIROUTE_SPEND_FLUSH_INTERVAL_MS || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_FLUSH_INTERVAL_MS;
}

function getMaxBufferSize() {
  const parsed = Number.parseInt(process.env.OMNIROUTE_SPEND_MAX_BUFFER_SIZE || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_BUFFER_SIZE;
}

function normalizeEntry(entry: BufferedCostEntry): BufferedCostEntry | null {
  if (!entry?.apiKeyId || !Number.isFinite(entry.cost) || entry.cost <= 0) return null;
  return {
    apiKeyId: entry.apiKeyId,
    cost: entry.cost,
    timestamp: Number.isFinite(entry.timestamp) ? entry.timestamp : Date.now(),
  };
}

export class SpendBatchWriter {
  private buffer: BufferedCostEntry[] = [];
  private inFlightEntries: BufferedCostEntry[] = [];
  private discardedApiKeyIds = new Set<string>();
  private timer: NodeJS.Timeout | null = null;
  private started = false;
  private flushPromise: Promise<FlushResult> | null = null;
  private persistEntries: (entries: BufferedCostEntry[]) => Promise<void> | void;
  private logger: Pick<Console, "log" | "error">;
  private flushIntervalMs: number;
  private maxBufferSize: number;

  constructor(options: SpendBatchWriterOptions = {}) {
    this.persistEntries = options.persistEntries || batchSaveCostEntries;
    this.logger = options.logger || console;
    this.flushIntervalMs = options.flushIntervalMs ?? getFlushIntervalMs();
    this.maxBufferSize = options.maxBufferSize ?? getMaxBufferSize();
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.timer = setInterval(() => {
      void this.flush();
    }, this.flushIntervalMs);
    this.timer.unref?.();
  }

  increment(apiKeyId: string, cost: number, timestamp = Date.now()) {
    const entry = normalizeEntry({ apiKeyId, cost, timestamp });
    if (!entry) return;

    this.start();
    this.discardedApiKeyIds.delete(entry.apiKeyId);
    this.buffer.push(entry);

    if (this.buffer.length >= this.maxBufferSize) {
      void this.flush();
    }
  }

  getBufferedEntries(
    apiKeyId: string,
    sinceTimestamp = 0,
    untilTimestamp = Number.POSITIVE_INFINITY
  ) {
    const matchesWindow = (entry: BufferedCostEntry) =>
      entry.apiKeyId === apiKeyId &&
      entry.timestamp >= sinceTimestamp &&
      entry.timestamp < untilTimestamp;

    return [...this.inFlightEntries, ...this.buffer].filter(matchesWindow);
  }

  getPendingCostTotal(
    apiKeyId: string,
    sinceTimestamp = 0,
    untilTimestamp = Number.POSITIVE_INFINITY
  ) {
    return this.getBufferedEntries(apiKeyId, sinceTimestamp, untilTimestamp).reduce(
      (sum, entry) => sum + entry.cost,
      0
    );
  }

  discardEntries(apiKeyId: string) {
    this.discardedApiKeyIds.add(apiKeyId);
    this.buffer = this.buffer.filter((entry) => entry.apiKeyId !== apiKeyId);
    this.inFlightEntries = this.inFlightEntries.filter((entry) => entry.apiKeyId !== apiKeyId);
  }

  async flush(): Promise<FlushResult> {
    if (this.flushPromise) {
      return this.flushPromise;
    }

    if (this.buffer.length === 0) {
      return { flushedEntries: 0, uniqueKeys: 0, requeued: false };
    }

    const entriesToFlush = [...this.buffer];
    this.buffer = [];
    this.inFlightEntries = entriesToFlush;

    this.flushPromise = (async () => {
      const entriesToPersist = entriesToFlush.filter(
        (entry) => !this.discardedApiKeyIds.has(entry.apiKeyId)
      );
      const uniqueKeys = new Set(entriesToPersist.map((entry) => entry.apiKeyId)).size;

      try {
        if (entriesToPersist.length > 0) {
          await this.persistEntries(entriesToPersist);
        }
        this.logger.log(
          `[SpendWriter] Flushed ${entriesToPersist.length} cost entr${
            entriesToPersist.length === 1 ? "y" : "ies"
          } across ${uniqueKeys} key(s)`
        );
        return {
          flushedEntries: entriesToPersist.length,
          uniqueKeys,
          requeued: false,
        };
      } catch (error) {
        this.buffer = [...entriesToPersist, ...this.buffer];
        const message = error instanceof Error ? error.message : String(error);
        this.logger.error(`[SpendWriter] Flush error: ${message}`);
        return {
          flushedEntries: 0,
          uniqueKeys,
          requeued: true,
        };
      } finally {
        this.inFlightEntries = [];
        this.flushPromise = null;
      }
    })();

    return this.flushPromise;
  }

  async stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.started = false;
    return this.flush();
  }

  resetForTests() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.started = false;
    this.buffer = [];
    this.inFlightEntries = [];
    this.discardedApiKeyIds.clear();
    this.flushPromise = null;
  }
}

export const spendBatchWriter = new SpendBatchWriter();

export function startSpendBatchWriter() {
  spendBatchWriter.start();
}

export async function flushSpendBatchWriter() {
  return spendBatchWriter.flush();
}

export async function stopSpendBatchWriter() {
  return spendBatchWriter.stop();
}

export function resetSpendBatchWriterForTests() {
  spendBatchWriter.resetForTests();
}

export function discardSpendBatchEntries(apiKeyId: string) {
  spendBatchWriter.discardEntries(apiKeyId);
}
