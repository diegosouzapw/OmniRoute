import { existsSync } from "node:fs";
import path from "node:path";
import { Worker } from "node:worker_threads";

import { findDeepSeekPowNonce, MAX_DEEPSEEK_POW_DIFFICULTY } from "./deepseek-pow-hash.js";

const DEEPSEEK_POW_ALGORITHM = "DeepSeekHashV1";
const SHA3_256_HEX_PATTERN = /^[a-f0-9]{64}$/i;
const MAX_DIFFICULTY = MAX_DEEPSEEK_POW_DIFFICULTY;
const MAX_SALT_LENGTH = 1_024;
const MAX_CONCURRENT_WORKERS = 2;
const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_TIMEOUT_MS = 30_000;

let activeWorkerCount = 0;

export interface SolveDeepSeekPowOptions {
  signal?: AbortSignal | null;
  timeoutMs?: number;
}

interface ValidatedChallenge {
  challenge: string;
  prefix: string;
  difficulty: number;
}

function createAbortError(): Error {
  const error = new Error("DeepSeek PoW computation aborted");
  error.name = "AbortError";
  return error;
}

function validateChallenge(
  algorithm: string,
  challenge: string,
  salt: string,
  difficulty: number,
  expireAt: number
): ValidatedChallenge {
  if (algorithm !== DEEPSEEK_POW_ALGORITHM) {
    throw new Error(`Unsupported DeepSeek PoW algorithm: ${algorithm}`);
  }
  if (!SHA3_256_HEX_PATTERN.test(challenge)) {
    throw new Error("DeepSeek PoW challenge must be a 64-character SHA3-256 hex digest");
  }
  if (typeof salt !== "string" || salt.length === 0 || salt.length > MAX_SALT_LENGTH) {
    throw new Error(`DeepSeek PoW salt must contain 1-${MAX_SALT_LENGTH} characters`);
  }
  if (!Number.isSafeInteger(difficulty) || difficulty < 1 || difficulty > MAX_DIFFICULTY) {
    throw new Error(`DeepSeek PoW difficulty must be an integer from 1 to ${MAX_DIFFICULTY}`);
  }
  if (!Number.isSafeInteger(expireAt) || expireAt < 0) {
    throw new Error("DeepSeek PoW expiry must be a non-negative safe integer");
  }

  return {
    challenge: challenge.toLowerCase(),
    prefix: `${salt}_${expireAt}_`,
    difficulty,
  };
}

function resolveTimeoutMs(timeoutMs: number | undefined): number {
  if (timeoutMs === undefined) return DEFAULT_TIMEOUT_MS;
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > MAX_TIMEOUT_MS) {
    throw new Error(`DeepSeek PoW timeout must be an integer from 1 to ${MAX_TIMEOUT_MS}ms`);
  }
  return timeoutMs;
}

function solveSynchronously({ challenge, prefix, difficulty }: ValidatedChallenge): number {
  return findDeepSeekPowNonce(prefix, challenge, difficulty);
}

// Anchored on process.cwd(), never import.meta.url: the production standalone bundle
// freezes import.meta.url to the build-machine path (same app-wide gotcha documented on
// GATE_DEP_REL in open-sse/services/compression/engines/llmlingua/worker.ts), so an
// import.meta.url-relative fallback here was silently dead in production. It also gave
// this function two return branches, one of which contained a `new URL(literal,
// import.meta.url)` construct -- Turbopack's dev-mode static worker-chunk detector
// partially resolves that pattern independent of which branch actually runs, producing
// an inconsistent module-graph node and crashing turbo-tasks on startup (bisected to
// 657d3a484). A single non-branching path resolution avoids both problems.
function resolveWorkerPath(): string {
  const workerPath = path.join(process.cwd(), "open-sse/lib/deepseek-pow-worker.mjs");
  if (!existsSync(workerPath)) {
    throw new Error(`DeepSeek PoW worker script not found at ${workerPath}`);
  }
  return workerPath;
}

function solveInWorker(
  validated: ValidatedChallenge,
  options: SolveDeepSeekPowOptions
): Promise<number> {
  const { signal } = options;
  if (signal?.aborted) return Promise.reject(createAbortError());
  if (activeWorkerCount >= MAX_CONCURRENT_WORKERS) {
    return Promise.reject(
      new Error(`DeepSeek PoW worker capacity reached (${MAX_CONCURRENT_WORKERS})`)
    );
  }

  const timeoutMs = resolveTimeoutMs(options.timeoutMs);
  activeWorkerCount += 1;

  return new Promise<number>((resolve, reject) => {
    // The slot is taken before this executor runs, so anything that throws here
    // -- a missing worker script, a spawn failure -- has to hand it back. Without
    // this, MAX_CONCURRENT_WORKERS spawn failures wedge the solver permanently
    // and every later call reports "capacity reached" instead of the real cause.
    let worker: Worker;
    try {
      worker = new Worker(resolveWorkerPath(), { workerData: validated });
    } catch (error) {
      activeWorkerCount = Math.max(0, activeWorkerCount - 1);
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    let settled = false;

    const cleanup = () => {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", onAbort);
      activeWorkerCount = Math.max(0, activeWorkerCount - 1);
    };
    const finish = (callback: () => void, terminate: boolean) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (terminate) void worker.terminate();
      callback();
    };
    const onAbort = () => {
      finish(() => reject(createAbortError()), true);
    };
    const timeout = setTimeout(() => {
      finish(() => reject(new Error(`DeepSeek PoW computation exceeded ${timeoutMs}ms`)), true);
    }, timeoutMs);

    signal?.addEventListener("abort", onAbort, { once: true });
    worker.once("message", (answer: unknown) => {
      if (!Number.isSafeInteger(answer) || (answer as number) < -1) {
        finish(() => reject(new Error("DeepSeek PoW worker returned an invalid answer")), true);
        return;
      }
      finish(() => resolve(answer as number), false);
    });
    worker.once("error", (error) => {
      finish(() => reject(error), true);
    });
    worker.once("exit", (code) => {
      if (code !== 0) {
        finish(() => reject(new Error(`DeepSeek PoW worker exited with code ${code}`)), false);
      } else {
        finish(() => reject(new Error("DeepSeek PoW worker exited without an answer")), false);
      }
    });
  });
}

export async function solveDeepSeekPowAsync(
  algorithm: string,
  challenge: string,
  salt: string,
  difficulty: number,
  expireAt: number,
  options: SolveDeepSeekPowOptions = {}
): Promise<number> {
  const validated = validateChallenge(algorithm, challenge, salt, difficulty, expireAt);
  return solveInWorker(validated, options);
}

export function solveDeepSeekPow(
  algorithm: string,
  challenge: string,
  salt: string,
  difficulty: number,
  expireAt: number
): number {
  // Compatibility-only synchronous API. The validated 250k ceiling bounds CPU
  // use; request handling must use solveDeepSeekPowAsync() so hashing stays off
  // the event loop and remains abortable.
  const validated = validateChallenge(algorithm, challenge, salt, difficulty, expireAt);
  return solveSynchronously(validated);
}
