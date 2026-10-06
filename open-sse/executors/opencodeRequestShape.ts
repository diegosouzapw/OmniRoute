/**
 * Which tool shape a gated request must carry, learned from the upstream's refusals.
 *
 * The upstream accepts a request whose instructions say "Never use tools" only with no tools,
 * and any other request only with tools (measured 2026-09-18, both surfaces). The request
 * contract used to fill an empty `tools` array unconditionally, so the first kind was refused.
 * Rather than match a prompt, the executor replays a refused request once in the other shape
 * and remembers which one worked (see `withRequestShapeRetry`).
 *
 * State lives here, keyed by the identity of the request body the executor was handed
 * (`WeakMap`), never on the executor: it is a shared instance and requests overlap.
 */
import { createHash } from "node:crypto";
import { isOpencodeFreeTierRefusal } from "./opencodeGeoBlock.ts";
import type { ExecuteInput, ExecutorExecuteResult } from "./base.ts";

export type RequestShape = "tools" | "bare";

/** What `prepareFreeTierRequest` decided for one request, kept until its outcome is known. */
export interface InjectionContext {
  readonly shape: RequestShape;
  /** The prompt class this request belongs to (see `shapeKeyOf`). */
  readonly key: string;
  /** False when a refusal is final for this request: its outcome is noted as it happens. */
  readonly probe: boolean;
  /** Replays the outcome note that was deferred while a replay was still possible. */
  readonly replayNote: () => void;
}

/** Prompt classes that the upstream accepts bare. Bounded; least recently confirmed goes first. */
const MAX_CLASSES = 64;
const bareClasses = new Set<string>();

/** Both shapes were refused: no replay for this class until the stamp passes. */
const PAUSE_MS = 60_000;
const pausedUntil = new Map<string, number>();
let now: () => number = () => Date.now();

const forced = new WeakMap<object, RequestShape>();
const contexts = new WeakMap<object, InjectionContext>();
/** What the contract decided for a request, kept until the request is over (see `forget`). */
const attempts = new WeakMap<object, object>();

const isObject = (value: unknown): value is object => typeof value === "object" && value !== null;

function textOf(content: unknown): string {
  if (typeof content === "string") return content;
  if (content === null || content === undefined) return "";
  if (Array.isArray(content)) {
    const text = content
      .map((part) => (part as { text?: unknown } | null)?.text)
      .filter((t): t is string => typeof t === "string")
      .join("");
    if (text) return text;
  }
  // Not plain text: hash its structure, so it is a class of its own rather than "no prompt".
  try {
    return JSON.stringify(content);
  } catch {
    return String(content);
  }
}

/**
 * The class a request belongs to: provider, model and a digest of its prompt.
 *
 * Responses bodies carry the prompt as `instructions`, Chat Completions bodies as the first
 * system or developer message. A request with no prompt hashes the empty string: it is a class
 * like any other, so a remembered shape and the replay bookkeeping apply to it too.
 */
export function shapeKeyOf(provider: string, model: string, body: unknown): string {
  const record = isObject(body) ? (body as Record<string, unknown>) : {};
  let prompt = typeof record.instructions === "string" ? record.instructions : "";
  if (!prompt && Array.isArray(record.messages)) {
    const first = (record.messages as Array<Record<string, unknown>>).find(
      (m) => m && (m.role === "system" || m.role === "developer")
    );
    prompt = textOf(first?.content);
  }
  const digest = createHash("sha1").update(prompt).digest("hex");
  return `${provider}|${model}|${digest}`;
}

/** Which shape this request goes out in, and whether a refusal may still be replayed. */
export function planShape(origin: object, key: string): { shape: RequestShape; probe: boolean } {
  const imposed = forced.get(origin);
  if (imposed) return { shape: imposed, probe: false };
  return { shape: bareClasses.has(key) ? "bare" : "tools", probe: !isPaused(key) };
}

function isPaused(key: string): boolean {
  const until = pausedUntil.get(key);
  if (until === undefined) return false;
  if (until > now()) return true;
  pausedUntil.delete(key);
  return false;
}

function pause(key: string): void {
  pausedUntil.delete(key);
  pausedUntil.set(key, now() + PAUSE_MS);
  while (pausedUntil.size > MAX_CLASSES) {
    const oldest = pausedUntil.keys().next();
    if (oldest.done) break;
    pausedUntil.delete(oldest.value);
  }
}

function rememberBare(key: string): void {
  bareClasses.delete(key);
  bareClasses.add(key);
  while (bareClasses.size > MAX_CLASSES) {
    const oldest = bareClasses.values().next();
    if (oldest.done) break;
    bareClasses.delete(oldest.value);
  }
}

export function rememberAttempt(origin: object, attempt: object): void {
  attempts.set(origin, attempt);
}

export function recallAttempt<T extends object>(origin: unknown): T | null {
  return isObject(origin) ? ((attempts.get(origin) as T | undefined) ?? null) : null;
}

export function forgetAttempt(origin: object): void {
  attempts.delete(origin);
}

export function recordInjection(origin: object, ctx: InjectionContext): void {
  contexts.set(origin, ctx);
}

function responseOf(result: ExecutorExecuteResult): Response | null {
  if (result instanceof Response) return result;
  return result && "response" in result && result.response ? result.response : null;
}

async function isShapeRefusal(response: Response, log: ExecuteInput["log"]): Promise<boolean> {
  if (response.status !== 403 && response.status !== 451) return false;
  try {
    return isOpencodeFreeTierRefusal(response.status, await response.clone().text());
  } catch {
    // Unreadable body: treated as "not a shape refusal", so the response is returned as-is.
    log?.debug?.("OPENCODE", "refusal body unreadable, no replay");
    return false;
  }
}

/**
 * Run one execution and, when the upstream refuses a request whose tool shape we chose,
 * replay it once in the other shape.
 *
 * Only a refusal of the request itself counts: a 429, a 5xx or a network error says nothing about the
 * shape. A request whose tools the client declared is never touched (no context recorded).
 */
/** What a replay taught: the shape that worked is remembered, two refusals pause the class. */
function learnFromReplay(ctx: InjectionContext, accepted: boolean): void {
  if (!accepted) {
    pause(ctx.key);
    ctx.replayNote();
  } else if (ctx.shape === "tools") {
    rememberBare(ctx.key);
  } else {
    bareClasses.delete(ctx.key);
  }
}

/** Release the refused response, send the request again in the other shape, learn from it. */
async function replayInOtherShape(
  input: ExecuteInput,
  run: (i: ExecuteInput) => Promise<ExecutorExecuteResult>,
  ctx: InjectionContext,
  refused: Response,
  origin: object
): Promise<ExecutorExecuteResult> {
  await refused.body?.cancel().catch(() => undefined);
  forced.set(origin, ctx.shape === "bare" ? "tools" : "bare");
  let second: ExecutorExecuteResult;
  try {
    second = await run(input);
  } catch (error) {
    ctx.replayNote();
    throw error;
  }
  learnFromReplay(ctx, responseOf(second)?.ok === true);
  return second;
}

function forget(origin: unknown): void {
  if (!isObject(origin)) return;
  forced.delete(origin);
  contexts.delete(origin);
  attempts.delete(origin);
}

export async function withRequestShapeRetry(
  input: ExecuteInput,
  run: (i: ExecuteInput) => Promise<ExecutorExecuteResult>
): Promise<ExecutorExecuteResult> {
  const origin = input.body;
  try {
    const first = await run(input);
    const ctx = isObject(origin) ? contexts.get(origin) : undefined;
    const response = responseOf(first);
    if (!ctx || !isObject(origin) || !response || response.ok || !ctx.probe) return first;
    if (input.signal?.aborted || !(await isShapeRefusal(response, input.log))) {
      ctx.replayNote();
      return first;
    }
    return await replayInOtherShape(input, run, ctx, response, origin);
  } finally {
    forget(origin);
  }
}

export function _resetShapeMemoForTests(): void {
  bareClasses.clear();
  pausedUntil.clear();
}

export function _setShapeClockForTests(clock: () => number): void {
  now = clock;
}
