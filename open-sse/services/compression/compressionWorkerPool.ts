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
      notifyCompressionFailOpen("compression pool broken (worker spawn failed)");
      return Promise.resolve(unchanged(body));
    }
    return new Promise((resolve) => {
      this.queue.push({
        id: this.nextId++,
        body,
        mode,
        options,
        originalBody: body,
        resolve,
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
    await Promise.all([...this.workers].map((slot) => this.remove(slot, true)));
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
      // path, …) must fail-open the queue before its request bodies are retained.
      const structural = isStructuralSpawnFailure(error);
      // A structural failure is only pool-wide when no worker was ever created.
      // Existing workers remain usable even if an attempt to add capacity fails.
      this.broken = structural && this.workers.size === 0;
      notifyCompressionFailOpen(
        `worker spawn failed — pool failing open${this.broken ? " permanently" : " for this wave"}: ${errorText(error)}`
      );
      for (const job of this.queue.splice(0)) job.resolve(unchanged(job.originalBody));
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
      slot.timeout = setTimeout(() => this.fail(slot!, "worker job timeout"), this.timeoutMs);
      slot.timeout.unref();
      const { originalBody: _body, resolve: _resolve, onEngineStep: _step, ...wireJob } = job;
      try {
        slot.worker.postMessage(wireJob);
      } catch (error) {
        // Non-cloneable payloads (DataCloneError) must not reject the pool's
        // never-reject run() contract nor strand the slot until its timeout.
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
    this.finish(slot, message.type === "result" ? message.result : unchanged(job.originalBody));
  }
  private finish(slot: PoolWorker, result: CompressionResult): void {
    const job = slot.job;
    if (!job) return;
    if (slot.timeout) clearTimeout(slot.timeout);
    slot.timeout = null;
    slot.job = null;
    job.resolve(result);
    slot.idle = setTimeout(() => void this.remove(slot, false), this.idleMs);
    slot.idle.unref();
    this.dispatch();
  }
  private fail(slot: PoolWorker, reason: string): void {
    // Every runtime failure path (worker error/exit, job timeout, postMessage
    // throw) resolves fail-open but was previously invisible — the exact
    // zero-log condition that let issue #2 run for hours.
    notifyCompressionFailOpen(`compression worker job failed open (${reason})`);
    const job = slot.job;
    if (job) job.resolve(unchanged(job.originalBody));
    slot.job = null;
    void this.remove(slot, true).finally(() => this.dispatch());
  }
  private async remove(slot: PoolWorker, terminate: boolean): Promise<void> {
    if (!this.workers.delete(slot)) return;
    if (slot.timeout) clearTimeout(slot.timeout);
    if (slot.idle) clearTimeout(slot.idle);
    if (terminate) await slot.worker.terminate().catch(() => undefined);
  }
}

let pool: CompressionWorkerPool | null = null;
export function runCompressionInWorker(
  body: Record<string, unknown>,
  mode: CompressionWorkerJob["mode"],
  options?: CompressionWorkerOptions,
  onEngineStep?: (step: StackedCompressionStep) => void
): Promise<CompressionResult> {
  pool ??= new CompressionWorkerPool();
  return pool.run(body, mode, options, onEngineStep);
}
export async function closeCompressionWorkerPoolForTests(): Promise<void> {
  const active = pool;
  pool = null;
  await active?.close();
}
