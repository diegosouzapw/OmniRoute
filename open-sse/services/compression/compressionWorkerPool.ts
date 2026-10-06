import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { Worker } from "node:worker_threads";
import { sanitizeErrorMessage } from "../../utils/errorSanitization.ts";
import { notifyCompressionFailOpen } from "./failOpenNotifier.ts";
import type { CompressionResult } from "./types.ts";
import type { StackedCompressionStep } from "./strategySelector.ts";
import type {
  CompressionWorkerJob,
  CompressionWorkerMessage,
  CompressionWorkerOptions,
} from "./compressionWorkerProtocol.ts";

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

/** Relative path (from an install root) to the compression worker. */
const WORKER_JS_REL = join("open-sse", "services", "compression", "compressionWorker.js");
const WORKER_TS_REL = join("open-sse", "services", "compression", "compressionWorker.ts");

const MAX_WALK_UP = 8;

/**
 * Walk up from each anchor directory (≤ MAX_WALK_UP levels) and return the first
 * ancestor that actually contains `relPath`, or null. Pure + exported for tests.
 *
 * This deliberately avoids `import.meta.url`/`__dirname` (both dead in the standalone
 * bundle) — see the LLMLingua worker comments in llmlingua/worker.ts.
 */
export function firstAncestorWith(anchors: string[], relPath: string): string | null {
  for (const anchor of anchors) {
    if (!anchor) continue;
    let dir = resolve(anchor);
    for (let i = 0; i <= MAX_WALK_UP; i++) {
      if (existsSync(join(dir, relPath))) return dir;
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

/**
 * Runtime install-root anchors that SURVIVE the standalone bundle:
 *  - `process.cwd()` — `dist/server.js` runs `process.chdir(__dirname)` → the dist root.
 *  - `dirname(process.argv[1])` — the entry script (server.js / bin), walked up.
 */
function runtimeAnchors(): string[] {
  const anchors = [process.cwd()];
  const argv1 = process.argv[1];
  if (typeof argv1 === "string" && argv1) anchors.push(dirname(argv1));
  return anchors;
}

/**
 * Resolve the worker entry file across dev and prod WITHOUT `import.meta.url`.
 *
 * Prod: the worker is likely a .js file under the install root
 * Dev: the same relative path resolves to the `.ts` source under the project
 * root (cwd) and runs via the default Node.js loader.
 *
 * First existing candidate wins. Exported for tests.
 */
export function resolveWorkerFile(): string {
  const anchors = runtimeAnchors();

  // Prod first: the .js under the install root.
  const jsRoot = firstAncestorWith(anchors, WORKER_JS_REL);
  if (jsRoot) return join(jsRoot, WORKER_JS_REL);

  // Dev: the .ts source.
  const tsRoot = firstAncestorWith(anchors, WORKER_TS_REL);
  if (tsRoot) return join(tsRoot, WORKER_TS_REL);

  // Nothing found — return a cwd-relative .js path; the spawn will fail-open.
  return join(process.cwd(), WORKER_JS_REL);
}

function unchanged(body: Record<string, unknown>): CompressionResult {
  return { body, compressed: false, stats: null };
}
/**
 * #13145: why a worker fault happened decides what the caller may do about it.
 *
 * `retryInProcess: false` marks a fault whose work is *provably expensive* — a dispatch
 * timeout means the worker already spent its whole budget without finishing, so re-running
 * the same CPU-bound pipeline on the main event loop would stall every other in-flight
 * request. Those degrade to the uncompressed body, as before, but are now reported instead
 * of being swallowed. Every other fault (thread error, exit, engine throw) fails fast
 * without doing the work, so retrying in-process is cheap and restores compression.
 */
export class CompressionWorkerError extends Error {
  readonly retryInProcess: boolean;
  constructor(message: string, retryInProcess: boolean) {
    super(message);
    this.name = "CompressionWorkerError";
    this.retryInProcess = retryInProcess;
  }
}

/** Sanitized, single-line error text for fail-open log details. */
function errorText(error: unknown): string {
  return sanitizeErrorMessage(error instanceof Error ? error.message : error);
}

/**
 * Only known path/module/configuration errors are structural. Unknown failures
 * (including ERR_WORKER_INIT_FAILED) can be transient resource exhaustion and
 * must be retried on the next wave rather than disabling compression forever.
 */
function isStructuralSpawnFailure(error: unknown): boolean {
  const code = (error as NodeJS.ErrnoException | undefined)?.code;
  return (
    code === "MODULE_NOT_FOUND" ||
    code === "ERR_MODULE_NOT_FOUND" ||
    code === "ERR_WORKER_PATH" ||
    code === "ERR_INVALID_ARG_TYPE" ||
    code === "ERR_INVALID_ARG_VALUE"
  );
}
interface PendingJob extends CompressionWorkerJob {
  originalBody: Record<string, unknown>;
  resolve: (result: CompressionResult) => void;
  // #13145: a worker failure must be reportable to the caller. Without a reject path the
  // pool could only degrade to `unchanged(...)`, which silently disabled compression for
  // the whole request while every layer above still believed the plan had been applied.
  reject: (error: Error) => void;
  onEngineStep?: (step: StackedCompressionStep) => void;
}
interface PoolWorker {
  worker: Worker;
  job: PendingJob | null;
  timeout: NodeJS.Timeout | null;
  idle: NodeJS.Timeout | null;
}

export class CompressionWorkerPool {
  private readonly queue: PendingJob[] = [];
  private readonly workers = new Set<PoolWorker>();
  private nextId = 1;
  private readonly size: number;
  private readonly timeoutMs: number;
  private readonly idleMs: number;
  private readonly spawnWorker: () => Worker;
  /**
   * Set when spawn() throws synchronously (e.g. Turbopack's moduleContext
   * MODULE_NOT_FOUND in the standalone build). A pool that cannot create a
   * single worker is structurally broken — every subsequent run() fail-opens
   * immediately instead of pushing jobs into a queue that can never drain
   * (unbounded main-isolate heap leak, one full request body per job).
   */
  private broken = false;

  constructor({
    size = positiveInteger(process.env.OMNI_COMPRESSION_WORKERS, 2),
    timeoutMs = positiveInteger(process.env.OMNI_COMPRESSION_WORKER_TIMEOUT_MS, 120_000),
    idleMs = positiveInteger(process.env.OMNI_COMPRESSION_WORKER_IDLE_MS, 60_000),
    workerFactory,
  }: {
    size?: number;
    timeoutMs?: number;
    idleMs?: number;
    /** Test seam: replaces `new Worker(resolveWorkerFile())`. */
    workerFactory?: () => Worker;
  } = {}) {
    this.size = Math.max(1, Math.floor(size));
    this.timeoutMs = Math.max(1, Math.floor(timeoutMs));
    this.idleMs = Math.max(1, Math.floor(idleMs));
    this.spawnWorker = workerFactory ?? (() => new Worker(resolveWorkerFile()));
  }

  run(
    body: Record<string, unknown>,
    mode: CompressionWorkerJob["mode"],
    options?: CompressionWorkerOptions,
    onEngineStep?: (step: StackedCompressionStep) => void
  ): Promise<CompressionResult> {
    if (this.broken) {
      // Without this the pool fails open silently forever after the one startup
      // warn — exactly the invisibility that let issue #2 leak for hours.
      const reason = "compression pool broken (worker spawn failed)";
      notifyCompressionFailOpen(reason);
      return Promise.reject(new CompressionWorkerError(reason, true));
    }
    return new Promise((resolve, reject) => {
      this.queue.push({
        id: this.nextId++,
        body,
        mode,
        options,
        originalBody: body,
        resolve,
        reject,
        onEngineStep,
      });
      this.dispatch();
    });
  }
  async close(): Promise<void> {
    for (const job of this.queue.splice(0)) job.resolve(unchanged(job.originalBody));
    for (const slot of this.workers) {
      const job = slot.job;
      if (job) job.resolve(unchanged(job.originalBody));
      slot.job = null;
    }
    await Promise.all([...this.workers].map((slot) => this.remove(slot)));
  }
  private spawn(): PoolWorker {
    const slot: PoolWorker = {
      worker: this.spawnWorker(),
      job: null,
      timeout: null,
      idle: null,
    };
    this.workers.add(slot);
    slot.worker.on("message", (message: CompressionWorkerMessage) =>
      this.handleMessage(slot, message)
    );
    slot.worker.on("error", (error) => this.fail(slot, `worker error: ${errorText(error)}`));
    slot.worker.on("exit", (code) => {
      if (this.workers.has(slot)) this.fail(slot, `worker exit code ${code}`);
    });
    return slot;
  }
  private spawnOrFailOpen(): PoolWorker | null {
    try {
      return this.spawn();
    } catch (error) {
      // A synchronous spawn failure (bundler module-context miss, bad worker
      // path, …) must never leave the queue stranded: nothing else would ever
      // call dispatch() again, so the jobs — and their full request bodies —
      // would be retained for the lifetime of the process.
      const structural = isStructuralSpawnFailure(error);
      // A structural failure is only pool-wide when no worker was ever created.
      // Existing workers remain usable even if an attempt to add capacity fails.
      const stranded = this.workers.size === 0;
      this.broken = structural && stranded;
      const reason = `worker spawn failed — pool failing open${this.broken ? " permanently" : " for this wave"}: ${errorText(error)}`;
      notifyCompressionFailOpen(reason);
      // Only a queue with no worker left to drain it is stranded. While any worker
      // survives it is busy by construction (dispatch() only spawns once no idle
      // slot exists), and its finish()/abort() re-enters dispatch() — so failing
      // the backlog open here would needlessly drop compression for jobs a healthy
      // worker is about to pick up. A spawn throw is a fast, pre-dispatch fault, so
      // reject as retryable and let the caller preserve compression in-process.
      if (stranded) {
        for (const job of this.queue.splice(0)) {
          job.reject(new CompressionWorkerError(reason, true));
        }
      }
      return null;
    }
  }
  private dispatch(): void {
    while (this.queue.length) {
      let slot = [...this.workers].find((candidate) => !candidate.job);
      if (!slot && this.workers.size < this.size) slot = this.spawnOrFailOpen() ?? undefined;
      if (!slot) return;
      if (slot.idle) clearTimeout(slot.idle);
      const job = this.queue.shift();
      if (!job) return;
      slot.job = job;
      slot.timeout = setTimeout(
        () => this.fail(slot!, `worker job timeout after ${this.timeoutMs}ms`, false),
        this.timeoutMs
      );
      slot.timeout.unref();
      // `reject` must be stripped alongside the other non-cloneable fields: postMessage
      // uses structured clone, and leaking any function into the wire job throws
      // DataCloneError before the worker ever sees it.
      const {
        originalBody: _body,
        resolve: _resolve,
        reject: _reject,
        onEngineStep: _step,
        ...wireJob
      } = job;
      try {
        slot.worker.postMessage(wireJob);
      } catch (error) {
        // A non-cloneable payload (DataCloneError) must not strand the slot until its
        // timeout. The work never reached a worker, so retrying in-process is cheap.
        this.fail(slot, `worker postMessage failed: ${errorText(error)}`);
        return;
      }
    }
  }
  private handleMessage(slot: PoolWorker, message: CompressionWorkerMessage): void {
    const job = slot.job;
    if (!job || job.id !== message.id) return;
    if (message.type === "step") {
      try {
        job.onEngineStep?.(message.step);
      } catch {
        // Telemetry is best-effort.
      }
      return;
    }
    if (message.type === "result") {
      this.finish(slot, message.result);
      return;
    }
    // #13145: the worker reported a thrown engine error. Surface it instead of quietly
    // handing back the uncompressed body — the caller falls back to in-process compression.
    this.abort(
      slot,
      new CompressionWorkerError(`compression worker error: ${message.error}`, true)
    );
  }
  private finish(slot: PoolWorker, result: CompressionResult): void {
    const job = slot.job;
    if (!job) return;
    if (slot.timeout) clearTimeout(slot.timeout);
    slot.timeout = null;
    slot.job = null;
    job.resolve(result);
    // Idle eviction MUST terminate. Dropping the slot from the set only releases our
    // reference - the thread, its MessagePort and its private heap outlive the pool
    // for the whole process lifetime, invisible to process.memoryUsage(). (#12812)
    slot.idle = setTimeout(() => void this.remove(slot), this.idleMs);
    slot.idle.unref();
    this.dispatch();
  }
  private fail(
    slot: PoolWorker,
    reason = "compression worker failed or timed out",
    retryInProcess = true
  ): void {
    this.abort(slot, new CompressionWorkerError(reason, retryInProcess));
  }
  /** #13145: release a slot and report the failure to the caller so it can fall back to
   *  in-process compression. Previously this resolved with the uncompressed body, which
   *  turned every worker fault into a silent, unlogged no-op — the exact zero-log
   *  condition that let issue #2 run for hours. The caller decides via
   *  `retryInProcess` whether recovery is cheap; the notifier keeps every fault
   *  visible either way. */
  private abort(slot: PoolWorker, error: CompressionWorkerError): void {
    notifyCompressionFailOpen(`compression worker job failed open (${error.message})`);
    const job = slot.job;
    if (slot.timeout) clearTimeout(slot.timeout);
    slot.timeout = null;
    slot.job = null;
    if (job) job.reject(error);
    void this.remove(slot).finally(() => this.dispatch());
  }
  /** Drop a slot and release its OS thread. Removal always terminates: a pooled worker
   *  has no other owner, so skipping terminate() strands the thread permanently. */
  private async remove(slot: PoolWorker): Promise<void> {
    if (!this.workers.delete(slot)) return;
    if (slot.timeout) clearTimeout(slot.timeout);
    if (slot.idle) clearTimeout(slot.idle);
    await slot.worker.terminate().catch(() => undefined);
  }
}

let pool: CompressionWorkerPool | null = null;
let workerFactoryOverride: (() => Worker) | undefined;
export function runCompressionInWorker(
  body: Record<string, unknown>,
  mode: CompressionWorkerJob["mode"],
  options?: CompressionWorkerOptions,
  onEngineStep?: (step: StackedCompressionStep) => void
): Promise<CompressionResult> {
  pool ??= new CompressionWorkerPool({ workerFactory: workerFactoryOverride });
  return pool.run(body, mode, options, onEngineStep);
}
/** Test seam: force the lazily created shared pool to use a factory that throws
 *  synchronously (Turbopack moduleContext MODULE_NOT_FOUND) or serves fake workers. */
export async function __setCompressionWorkerFactoryForTests(
  factory: (() => Worker) | null
): Promise<void> {
  await closeCompressionWorkerPoolForTests();
  workerFactoryOverride = factory ?? undefined;
}
export async function closeCompressionWorkerPoolForTests(): Promise<void> {
  const active = pool;
  pool = null;
  await active?.close();
}
