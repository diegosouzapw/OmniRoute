/**
 * Pipeline combo strategy — sequential chain.
 *
 * A pipeline combo runs its targets IN ORDER: step N's output is fed into step
 * N+1 as input, each step carries its own optional `prompt` (instruction), and
 * only the FINAL step's response is returned to the client. This is the sequential
 * counterpart to `fusion` (parallel fan-out + judge synthesis).
 *
 * ── Per-step config shape ─────────────────────────────────────────────────────
 * The ordered step list IS `combo.models` — we reuse the existing target order
 * rather than introducing a parallel `pipelineSteps` array that could drift out of
 * sync with the models. Each step's optional instruction is read from a `prompt`
 * field on the target object (`comboModelStepInputSchema.prompt`); a plain-string
 * model entry is simply a step with no prompt. The field is optional and ignored by
 * every other strategy, so this is fully backward-compatible.
 *
 * ── Prompt injection ──────────────────────────────────────────────────────────
 * The engine passes prompts through the request's message array (OpenAI `messages`,
 * Responses `input`, or Gemini `contents`). Each step's `prompt` is injected as a
 * leading system instruction in whichever format the request uses:
 *   - step 1 keeps the client's original conversation and (if set) prepends its
 *     prompt as an extra system turn, so the first model sees the real user request;
 *   - steps 2..N are transforms — the conversation is replaced with the previous
 *     step's output as the user turn, plus this step's prompt as the system turn.
 *
 * Intermediate steps are forced non-streaming with tools stripped (we need the
 * complete text to thread forward). The FINAL step keeps the client's original
 * `stream` flag + tools, so streaming and downstream tool use still work.
 *
 * A step failure fails the whole pipeline EXPLICITLY (never silently swallowed):
 * a non-OK intermediate response, an unparseable body, or an intermediate step that
 * yields no text short-circuits with a sanitized error response.
 *
 * ── Transient retry ──────────────────────────────────────────────────────────
 * Intermediate steps that fail with a transient HTTP status (429, 502, 503, 504)
 * are retried up to `maxRetries` times with `retryDelayMs` delay between attempts.
 * This mirrors the retry behaviour already used by the priority/weighted strategies
 * and respects the same `combo.config.maxRetries` / `combo.config.retryDelayMs`
 * fields. Non-transient errors (400, 401, 403, 404, …) fail immediately — retrying
 * a bad-request or auth error wastes quota and will never succeed.
 */
import { errorResponse } from "../utils/error.ts";
import type { ComboLogger, HandleSingleModel } from "./combo/types.ts";
// extractPanelText is a generic assistant-text extractor (OpenAI chat / Claude /
// Gemini / Responses) — reused here to read each step's output, not fusion-specific.
import { extractPanelText } from "./fusion.ts";

type Body = Record<string, unknown>;

export type PipelineStep = { model: string; prompt?: string | null };

/**
 * Prepend a system instruction to the client's original conversation (format-aware),
 * so step 1 sees the real user request plus its own step prompt. No-op when the
 * step has no prompt.
 */
export function prependSystemInstruction(body: Body, prompt: string | null | undefined): Body {
  const sys = typeof prompt === "string" && prompt.trim() ? prompt.trim() : null;
  const next: Body = { ...body };
  if (!sys) return next;
  if (Array.isArray(body.input)) {
    next.input = [{ role: "system", content: sys }, ...(body.input as unknown[])];
  } else if (Array.isArray(body.contents)) {
    // Gemini contents have no system role — a leading user turn is the closest analog.
    next.contents = [{ role: "user", parts: [{ text: sys }] }, ...(body.contents as unknown[])];
  } else if (Array.isArray(body.messages)) {
    next.messages = [{ role: "system", content: sys }, ...(body.messages as unknown[])];
  } else {
    next.messages = [{ role: "system", content: sys }];
  }
  return next;
}

/**
 * Replace the request's conversation with a fresh transform turn set (the previous
 * step's output as the user turn + this step's prompt as the system turn),
 * preserving whichever message-array shape the request format uses. Non-message
 * fields are carried over; the caller overrides the model per step.
 */
export function buildTransformBody(
  body: Body,
  prompt: string | null | undefined,
  input: string
): Body {
  const next: Body = { ...body };
  const sys = typeof prompt === "string" && prompt.trim() ? prompt.trim() : null;
  if (Array.isArray(body.input)) {
    const turns: unknown[] = [];
    if (sys) turns.push({ role: "system", content: sys });
    turns.push({ role: "user", content: input });
    next.input = turns;
    delete next.messages;
    delete next.contents;
  } else if (Array.isArray(body.contents)) {
    // Gemini contents have no system role — fold the instruction into the user turn.
    const text = sys ? `${sys}\n\n${input}` : input;
    next.contents = [{ role: "user", parts: [{ text }] }];
    delete next.messages;
    delete next.input;
  } else {
    const turns: unknown[] = [];
    if (sys) turns.push({ role: "system", content: sys });
    turns.push({ role: "user", content: input });
    next.messages = turns;
  }
  return next;
}

/** Force non-streaming and strip tools so an intermediate step yields complete prose. */
function stripStreaming(body: Body): Body {
  const { tools: _tools, tool_choice: _tc, ...rest } = body;
  void _tools;
  void _tc;
  return { ...rest, stream: false };
}

export type HandlePipelineChatOptions = {
  body: Body;
  steps: PipelineStep[];
  handleSingleModel: HandleSingleModel;
  log: ComboLogger;
  comboName?: string;
  /** Max retry attempts on transient errors (429/502/503/504). Default: 0 (no retry). */
  maxRetries?: number;
  /** Delay between retries in milliseconds. Default: 1000. */
  retryDelayMs?: number;
};

/** HTTP statuses that are worth retrying (transient / capacity / rate-limit). */
const TRANSIENT_STATUS = new Set([429, 502, 503, 504]);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Handle a pipeline combo: run the steps in order, threading each step's output
 * into the next step's input, and return only the final step's response.
 */
export async function handlePipelineChat({
  body,
  steps,
  handleSingleModel,
  log,
  comboName,
  maxRetries = 0,
  retryDelayMs = 1000,
}: HandlePipelineChatOptions): Promise<Response> {
  const chain = (Array.isArray(steps) ? steps : []).filter((s) => s && s.model);
  if (chain.length === 0) {
    return errorResponse(400, "Pipeline combo has no models");
  }
  log.info(
    "PIPELINE",
    `Combo "${comboName ?? ""}" | steps=${chain.length} [${chain.map((s) => s.model).join(" -> ")}]`
  );

  // Single-step pipeline: nothing to chain — run it directly (streams to client).
  if (chain.length === 1) {
    return handleSingleModel(prependSystemInstruction(body, chain[0].prompt), chain[0].model);
  }

  let prevOutput = "";
  for (let i = 0; i < chain.length; i++) {
    const step = chain[i];
    const isFinal = i === chain.length - 1;
    const isFirst = i === 0;

    let stepBody: Body = isFirst
      ? prependSystemInstruction(body, step.prompt)
      : buildTransformBody(body, step.prompt, prevOutput);
    // Intermediate steps: complete prose only (no stream, no tools). The final step
    // keeps the client's original stream flag + tools.
    if (!isFinal) stepBody = stripStreaming(stepBody);

    const t0 = Date.now();
    let res = await handleSingleModel(stepBody, step.model);

    if (isFinal) {
      log.info("PIPELINE", `Final step ${step.model} responded (${Date.now() - t0}ms)`);
      return res;
    }

    // Transient retry: if the intermediate step failed with a retryable status
    // (429/502/503/504), retry the same step up to maxRetries times before
    // giving up. Non-transient errors (400/401/403/404) fail immediately.
    for (let attempt = 0; attempt < maxRetries && !res.ok && TRANSIENT_STATUS.has(res.status); attempt++) {
      log.warn(
        "PIPELINE",
        `Step ${i + 1} (${step.model}) transient ${res.status}, retrying ${attempt + 1}/${maxRetries} in ${retryDelayMs}ms`
      );
      await sleep(retryDelayMs);
      res = await handleSingleModel(stepBody, step.model);
    }

    // An intermediate step must succeed with usable text — otherwise fail the whole
    // pipeline (never silently swallow; the client gets a clear, sanitized error).
    if (!res.ok) {
      log.warn("PIPELINE", `Step ${i + 1} (${step.model}) failed`, { status: res.status });
      const status = res.status >= 400 && res.status <= 599 ? res.status : 502;
      return errorResponse(status, `Pipeline step ${i + 1} (${step.model}) failed`);
    }
    try {
      const json = await res.clone().json();
      prevOutput = extractPanelText(json);
    } catch {
      log.warn("PIPELINE", `Step ${i + 1} (${step.model}) returned an unparseable body`);
      return errorResponse(502, `Pipeline step ${i + 1} (${step.model}) returned an unparseable body`);
    }
    if (!prevOutput.trim()) {
      log.warn("PIPELINE", `Step ${i + 1} (${step.model}) returned empty output`);
      return errorResponse(502, `Pipeline step ${i + 1} (${step.model}) returned empty output`);
    }
    log.info(
      "PIPELINE",
      `Step ${i + 1} ${step.model} ok (${prevOutput.length} chars, ${Date.now() - t0}ms)`
    );
  }

  // Unreachable — the final step returns inside the loop.
  return errorResponse(500, "Pipeline produced no final response");
}
