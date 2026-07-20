/**
 * Chaos Engine — parallel multi-model dispatch for the `auto/chaos` auto-model.
 *
 * Goal: pick the N most *stable* connected models, fan the same prompt out to
 * all of them in parallel, then return a single merged SSE stream so an IDE that
 * can only issue ONE request / hold ONE agent still receives all N model answers
 * at once.
 *
 * Design notes:
 *   - Selection is done by the caller (virtualFactory → createVirtualAutoCombo)
 *     which already scores candidates with the `chaos-mode` weight pack (health +
 *     stability dominant), so `models` here is already the proven-stable set.
 *   - Dispatch is fully parallel. A slow/hung model is bounded by
 *     `panelHardTimeoutMs` and, crucially, its underlying request is *aborted* on
 *     timeout (not merely resolved-to-fallback) so the connection is released.
 *   - Broadcast is PROGRESSIVE: each panel model's answer is enqueued onto the
 *     SSE stream the moment that model lands — the client does not wait for the
 *     whole panel to finish before receiving the first part. Each part is wrapped
 *     in an SSE `omni-chaos-part` event carrying its own model id. IDEs that
 *     understand the protocol can render several panels; IDEs that don't just see
 *     the canonical final block (the highest-scoring model's answer is used as the
 *     final response chunk).
 *   - Unlike fusion, chaos does NOT run a separate judge synthesis call — it
 *     surfaces raw per-model outputs.
 */

import { errorResponse } from "../../utils/error.ts";
import type { ComboLogger, HandleSingleModel } from "../combo/types.ts";

export const CHAOS_DEFAULTS = {
  /** Absolute cap on wall time for the whole panel. */
  panelHardTimeoutMs: 120_000,
  /** If fewer than this many succeed, fall back to a plain single-model answer. */
  minPanel: 1,
} as const;

export type ChaosTuning = {
  panelHardTimeoutMs?: number;
  minPanel?: number;
};

type Body = Record<string, unknown>;

export type ChaosPart = {
  model: string;
  index: number;
  ok: boolean;
  text: string;
  error?: string;
};

/**
 * Build the SSE comment/event wrapper for one chaos panel part.
 * We emit a custom event name `omni-chaos-part` so a protocol-aware IDE can
 * split it out; non-aware clients reading OpenAI-style SSE will simply ignore
 * the unknown event and use the final `data:` chunk below.
 */
export function serializeChaosPart(part: ChaosPart, isFinal: boolean): string {
  const meta = {
    type: "omni-chaos-part",
    model: part.model,
    index: part.index,
    ok: part.ok,
    final: isFinal,
    error: part.error,
  };
  // Comment line (ignored by standard SSE parsers) + explicit event envelope.
  return (
    `: chaos ${part.index} ${part.ok ? "ok" : "fail"} ${part.model}\n` +
    `event: omni-chaos-part\n` +
    `data: ${JSON.stringify(meta)}\n\n`
  );
}

/**
 * Promise that resolves to `fallback` after `ms`, calling `onTimeout` (e.g. to
 * abort the underlying request) so a slow/hung model releases its connection
 * instead of leaking a dangling fetch.
 */
function withTimeout<T>(
  p: Promise<T>,
  ms: number,
  fallback: T,
  onTimeout?: () => void
): Promise<T> {
  return new Promise((resolve) => {
    const t = setTimeout(() => {
      try {
        onTimeout?.();
      } catch {
        /* ignore abort errors */
      }
      resolve(fallback);
    }, ms);
    Promise.resolve(p)
      .then((v) => {
        clearTimeout(t);
        resolve(v);
      })
      .catch(() => {
        clearTimeout(t);
        resolve(fallback);
      });
  });
}

/**
 * Run the chaos panel. Returns the ordered parts plus a recommended "primary"
 * part (highest index of a successful model, or the first success) that callers
 * can use as the canonical response body for non-aware clients.
 *
 * Each panel call gets its own AbortController; `withTimeout` aborts it on
 * timeout so the underlying request is cancelled, not merely superseded.
 */
export async function runChaosPanel(opts: {
  body: Body;
  models: string[];
  handleSingleModel: HandleSingleModel;
  log?: { info?: (...a: unknown[]) => void; warn?: (...a: unknown[]) => void };
  tuning?: ChaosTuning | null;
}): Promise<{ parts: ChaosPart[]; primary: ChaosPart | null }> {
  const { body, models, handleSingleModel, log, tuning } = opts;
  const panel = Array.isArray(models) ? models.filter(Boolean) : [];
  const hardTimeout = tuning?.panelHardTimeoutMs ?? CHAOS_DEFAULTS.panelHardTimeoutMs;

  if (panel.length === 0) {
    return { parts: [], primary: null };
  }

  const calls = panel.map((model, index) => {
    const ctrl = new AbortController();
    return withTimeout(
      (async (): Promise<ChaosPart> => {
        try {
          const res = await handleSingleModel(body, model, {
            modelAbortSignal: ctrl.signal,
          });
          const text = await extractText(res);
          log?.info?.(
            `CHAOS panel ${index} (${model}) ok=${res.ok} status=${res.status} textLen=${text.length}`
          );
          return { model, index, ok: true, text };
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          log?.warn?.(`CHAOS panel ${index} (${model}) failed:`, msg);
          return { model, index, ok: false, text: "", error: msg };
        }
      })(),
      hardTimeout,
      // Timed-out model → treated as a failed part, not a hang.
      {
        model,
        index,
        ok: false,
        text: "",
        error: "chaos-panel-timeout",
      } as ChaosPart,
      // Abort the underlying fetch so the connection is released on timeout.
      () => ctrl.abort()
    );
  });

  const parts = await Promise.all(calls);
  const successes = parts.filter((p) => p.ok);
  const primary = successes.length > 0 ? successes[successes.length - 1] : null;

  log?.info?.(`CHAOS panel complete: ${successes.length}/${parts.length} succeeded`);
  return { parts, primary };
}

/**
 * Pull assistant text out of an OpenAI-style OR Anthropic-style Response body.
 * Clones the response first (body is single-consume; fusion.ts does the same),
 * then tries JSON first and falls back to SSE concat — content-type headers are
 * not reliable here because OmniRoute may force a streaming envelope internally.
 */
async function extractText(res: Response): Promise<string> {
  let raw: string;
  try {
    raw = await res.clone().text();
  } catch {
    return "";
  }
  // Try JSON first (non-streaming completion).
  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      const fromJson = firstTextFromOpenAI(parsed);
      if (fromJson) return fromJson;
      // Anthropic non-streaming also arrives as `{...}` with top-level `content`.
      if (typeof (parsed as Record<string, unknown>)?.content === "string") {
        return (parsed as Record<string, unknown>).content as string;
      }
    } catch {
      /* fall through to SSE / raw */
    }
  }
  // SSE or wrapped stream → concat data: content deltas (OpenAI + Anthropic).
  const sse = concatSseText(raw);
  if (sse) return sse;
  // Last resort: maybe the body itself is plain prose.
  return trimmed.length > 0 && !trimmed.startsWith("data:") ? trimmed : "";
}

function firstTextFromOpenAI(obj: unknown): string {
  if (!obj || typeof obj !== "object") return "";
  const o = obj as Record<string, unknown>;
  const choices = o.choices as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(choices) && choices.length > 0) {
    const msg = choices[0]?.message as Record<string, unknown> | undefined;
    if (msg && typeof msg.content === "string") return msg.content;
    const delta = choices[0]?.delta as Record<string, unknown> | undefined;
    if (delta && typeof delta.content === "string") return delta.content;
  }
  if (typeof o.content === "string") return o.content;
  return "";
}

/**
 * Concatenate assistant text out of an SSE byte stream.
 *
 * Supports BOTH wire formats OmniRoute may emit:
 *   - OpenAI: `data: {"choices":[{"delta":{"content":"..."}}]}`
 *   - Anthropic: `data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"..."}}`
 *     (also accepts the older `delta:{"content":"..."}` proxy shape and a
 *     top-level `content` token).
 */
function concatSseText(sse: string): string {
  const out: string[] = [];
  for (const line of sse.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const json = JSON.parse(payload);
      const choices = json?.choices as Array<Record<string, unknown>> | undefined;
      if (Array.isArray(choices) && choices.length > 0) {
        const delta = choices[0]?.delta as Record<string, unknown> | undefined;
        if (delta?.content) {
          out.push(String(delta.content));
          continue;
        }
        const message = choices[0]?.message as Record<string, unknown> | undefined;
        if (message?.content) {
          out.push(String(message.content));
          continue;
        }
      }
      // Anthropic Messages streaming delta shapes.
      const delta = json?.delta as Record<string, unknown> | undefined;
      if (delta && typeof delta.text === "string") {
        // content_block_delta: { delta: { type: "text_delta", text: "..." } }
        out.push(String(delta.text));
      } else if (delta && typeof delta.content === "string") {
        // proxy shape: { delta: { content: "..." } }
        out.push(String(delta.content));
      } else if (typeof json?.content === "string") {
        // top-level content token (rare, non-standard)
        out.push(String(json.content));
      }
    } catch {
      /* ignore non-JSON lines */
    }
  }
  return out.join("");
}

/**
 * Top-level chaos dispatch entrypoint used by `handleComboChat` when a combo's
 * `config.chaos.enabled` flag is set (the `auto/chaos` virtual combo).
 *
 * Returns a single Response whose body is an SSE stream:
 *   - one `omni-chaos-part` event per panel model, enqueued PROGRESSIVELY as
 *     each model lands (so the client starts receiving answers immediately,
 *     without waiting for the whole panel to finish)
 *   - a final `data:` OpenAI-style chunk carrying the primary model's answer
 *     (so non-aware clients / IDEs still get a usable completion)
 *   - a terminating `data: [DONE]`
 *
 * If no panel model succeeds, the stream still terminates cleanly with a
 * `x-omniroute-chaos-error` header and an error final chunk (status stays 200
 * so the SSE envelope is well-formed; non-aware clients see the error text).
 */
export async function handleChaosChat(opts: {
  body: Body;
  models: string[];
  handleSingleModel: HandleSingleModel;
  log?: { info?: (...a: unknown[]) => void; warn?: (...a: unknown[]) => void };
  comboName?: string;
  primaryModel?: string | null;
  tuning?: ChaosTuning | null;
}): Promise<Response> {
  const { body, models, handleSingleModel, log, comboName, primaryModel, tuning } = opts;
  const panel = Array.isArray(models) ? models.filter(Boolean) : [];
  const hardTimeout = tuning?.panelHardTimeoutMs ?? CHAOS_DEFAULTS.panelHardTimeoutMs;
  if (panel.length === 0) {
    return errorResponse(400, "Chaos combo has no models");
  }

  // Single-model chaos degrades to a direct answer.
  if (panel.length === 1) {
    return handleSingleModel(body, panel[0]);
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const enc = new TextEncoder();
      let closed = false;
      // Serialize enqueues: ReadableStream controllers must not be enqueued
      // concurrently. A committed promise chain gives us ordered, race-free writes.
      let enqueueChain: Promise<void> = Promise.resolve();
      const safeEnqueue = (s: string): Promise<void> => {
        enqueueChain = enqueueChain.then(() => {
          if (closed) return;
          try {
            controller.enqueue(enc.encode(s));
          } catch {
            /* stream already errored/closed */
          }
        });
        return enqueueChain;
      };

      const modelPromises = panel.map((model, index) => {
        const ctrl = new AbortController();
        return withTimeout(
          (async (): Promise<ChaosPart> => {
            try {
              const res = await handleSingleModel(body, model, {
                modelAbortSignal: ctrl.signal,
              });
              const text = await extractText(res);
              const part: ChaosPart = { model, index, ok: true, text };
              // Progressive: emit this part the instant its model lands.
              await safeEnqueue(serializeChaosPart(part, false));
              return part;
            } catch (err) {
              const msg = err instanceof Error ? err.message : String(err);
              const part: ChaosPart = { model, index, ok: false, text: "", error: msg };
              await safeEnqueue(serializeChaosPart(part, false));
              return part;
            }
          })(),
          hardTimeout,
          { model, index, ok: false, text: "", error: "chaos-panel-timeout" } as ChaosPart,
          () => ctrl.abort()
        );
      });

      const allParts = await Promise.all(modelPromises);
      const successes = allParts.filter((p) => p.ok);

      if (successes.length === 0) {
        // No panel model answered — terminate with an error final chunk.
        const errText = "All chaos panel models failed";
        await safeEnqueue(
          `data: ${JSON.stringify({
            id: `chaos-${comboName ?? "panel"}`,
            object: "chat.completion.chunk",
            model: panel[0],
            choices: [
              {
                index: 0,
                delta: { role: "assistant", content: errText },
                finish_reason: "stop",
              },
            ],
          })}\n\n`
        );
        await safeEnqueue("data: [DONE]\n\n");
        await enqueueChain;
        closed = true;
        controller.close();
        return;
      }

      // Choose the primary: explicit primaryModel if it succeeded, else the last
      // successful part (by construction that's the top-scored stable model).
      const primaryPart =
        (primaryModel && allParts.find((p) => p.model === primaryModel && p.ok)) ||
        allParts.filter((p) => p.ok).slice(-1)[0] ||
        successes[0];

      // Final canonical answer (non-aware clients consume this).
      const finalText = primaryPart?.text ?? "";
      await safeEnqueue(
        `data: ${JSON.stringify({
          id: `chaos-${comboName ?? "panel"}`,
          object: "chat.completion.chunk",
          model: primaryPart?.model ?? panel[0],
          choices: [
            {
              index: 0,
              delta: { role: "assistant", content: finalText },
              finish_reason: "stop",
            },
          ],
        })}\n\n`
      );
      await safeEnqueue("data: [DONE]\n\n");
      await enqueueChain;
      closed = true;
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-OmniRoute-Chaos": "true",
      "X-OmniRoute-Chaos-Panel": String(panel.length),
      "X-OmniRoute-Chaos-Primary": "",
    },
  });
}

/**
 * Detect + dispatch chaos mode from `handleComboChat`'s combo config, mirroring
 * the fusion-strategy short-circuit right above it. Detected via
 * `combo.config.chaos.enabled` (set by the auto/chaos virtual combo). Unlike
 * fusion, chaos surfaces each model's raw answer (no judge synthesis) so a
 * single-turn IDE request still receives N model outputs at once.
 *
 * Returns `null` when the combo is not a chaos combo (caller falls through to
 * its normal strategy handling); otherwise returns the chaos dispatch promise.
 */
export function dispatchChaosFromCombo(args: {
  cfg: Record<string, unknown>;
  comboModels: unknown[];
  comboName: string;
  body: Body;
  handleSingleModel: HandleSingleModel;
  log: ComboLogger;
}): Promise<Response> | null {
  const { cfg, comboModels, comboName, body, handleSingleModel, log } = args;
  if (
    !cfg.chaos ||
    typeof cfg.chaos !== "object" ||
    !(cfg.chaos as Record<string, unknown>).enabled
  ) {
    return null;
  }
  const chaosCfg = cfg.chaos as { panelSize?: number; judgeModel?: string };
  const chaosModels = (comboModels || [])
    .map((m) => {
      if (typeof m === "string") return m;
      if (m && typeof m === "object") {
        const obj = m as Record<string, unknown>;
        if (typeof obj.model === "string") return obj.model;
      }
      return null;
    })
    .filter((m): m is string => Boolean(m));
  log.info("CHAOS", `dispatching parallel panel of ${chaosModels.length} stable models`);
  return handleChaosChat({
    body,
    models: chaosModels,
    handleSingleModel,
    log,
    comboName,
    primaryModel: chaosCfg.judgeModel,
  });
}
