/**
 * AuggieExecutor — routes completions through the local Augment CLI ("auggie")
 * binary via a one-shot stdin/stdout text pipe (no JSON-RPC / ACP protocol).
 *
 * Flow:
 *   1. Flatten the OpenAI-shaped `messages[]` into a single prompt string.
 *   2. Spawn `auggie --print --quiet --model <model>` and pipe the prompt on stdin.
 *   3. Relay stdout chunks as OpenAI-compatible SSE deltas (stream=true) or
 *      buffer them into a single chat.completion JSON body (stream=false).
 *   4. Kill the subprocess on abort / stream close.
 *
 * Authentication:
 *   None. Auggie delegates auth entirely to the user's local `auggie login`
 *   session — OmniRoute never sees or stores credentials for this provider.
 *   The connection is registered `noAuth: true` and `refreshCredentials()` is
 *   a no-op (nothing to refresh).
 *
 * Binary discovery:
 *   1. AUGGIE_BIN / CLI_AUGGIE_BIN env var (absolute path override)
 *   2. PATH lookup ("auggie" / "auggie.cmd")
 *   3. %LOCALAPPDATA%\auggie\bin\auggie.exe  (Windows installer)
 *   4. ~/.local/share/auggie/bin/auggie      (Linux installer)
 *   5. ~/.auggie/bin/auggie                  (alternate installer layout)
 */

import { spawn } from "node:child_process";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { buildErrorBody, errorResponse, sanitizeErrorMessage } from "../utils/error.ts";
import { auggieProvider } from "../config/providers/registry/auggie/index.ts";

const AUGGIE_URL = "auggie://cli/stdio";

// ─── Model allowlist (argument-injection defense) ─────────────────────────────
// The `model` value is forwarded straight into the `auggie` argv, so it is an
// untrusted-input sink. We only ever pass a model that is declared in the
// registry entry — this closes flag-smuggling (a `model` starting with "-" would
// otherwise be parsed by auggie as an option) and unknown-model passthrough.
//
// The static registry (shipped with the code) is checked first.  On first use
// the executor also spawns `auggie model list` at runtime and merges any IDs it
// finds — this lets the allowlist stay current when auggie adds or renames
// models without a code update.
const AUGGIE_MODEL_ALLOWLIST: ReadonlySet<string> = new Set(auggieProvider.models.map((m) => m.id));
const DEFAULT_AUGGIE_MODEL = auggieProvider.models[0]?.id ?? "claude-sonnet-4.6";
// ─── Model alias map (backward compat for saved combos) ─────────────────────
// Old model IDs from before the v0.32.0 registry update; each maps to the
// equivalent v0.32.0 ID so existing combos continue to work after the rename.
const AUGGIE_MODEL_ALIASES: ReadonlyMap<string, string> = new Map([
  // Claude
  ["claude-sonnet-4.6", "sonnet4.6"],
  ["claude-sonnet-4.6-thinking", "sonnet4.6"],
  ["claude-opus-4.6", "opus4.6"],
  ["claude-haiku-4.5", "haiku4.5"],
  // Gemini
  ["gemini-3.1-pro", "gemini-3.1-pro-preview"],
  ["gemini-3.0-flash", "gemini-3.1-pro-preview"],
  // GPT-5.x (high/medium split was synthetic — v0.32.0 has a single ID per version)
  ["gpt-5.5-high", "gpt5.5"],
  ["gpt-5.5-medium", "gpt5.5"],
  ["gpt-5.4-high", "gpt5.4"],
  ["gpt-5.4-medium", "gpt5.4"],
]);

/**
 * Live model cache populated by `initAuggieModels()`.
 * - `null`  = not yet attempted
 * - `Set`   = successfully fetched IDs (possibly empty)
 */
let liveModelSet: Set<string> | null = null;

/**
 * Spawn `auggie model list`, parse `[model-id]` entries, and merge them into
 * the live allowlist so the executor accepts models auggie recognises even
 * when the static registry has not been updated yet.
 *
 * Safe to call repeatedly: only the first call spawns the process; subsequent
 * calls are a no-op (including after a failed fetch — `liveModelSet` is set to
 * an empty set so we don't retry every request).
 */
export async function initAuggieModels(
  signal?: AbortSignal | null,
  timeoutMs = 8000
): Promise<void> {
  if (liveModelSet !== null) return;
  let bin: string;
  try {
    bin = resolveAuggieBin();
  } catch {
    liveModelSet = new Set();
    return;
  }
  const child = spawn(bin, ["model", "list"], {
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
    windowsHide: true,
  });
  const fragments: string[] = [];
  child.stdout.on("data", (d: Buffer) => fragments.push(d.toString("utf8")));
  let settled = false;
  const settle = (result: Set<string>) => {
    if (settled) return;
    settled = true;
    liveModelSet = result;
  };
  const timer = setTimeout(() => {
    if (!child.killed) child.kill("SIGKILL");
    settle(new Set());
  }, timeoutMs);
  const onAbort = () => {
    if (!child.killed) child.kill("SIGKILL");
    clearTimeout(timer);
    settle(new Set());
  };
  if (signal) {
    if (signal.aborted) {
      clearTimeout(timer);
      settle(new Set());
      return;
    }
    signal.addEventListener("abort", onAbort, { once: true });
  }
  try {
    const code = await new Promise<number | null>((resolve, reject) => {
      child.on("close", resolve);
      child.on("error", (e: Error) => reject(e));
    });
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
    if (code !== 0) {
      settle(new Set());
      return;
    }
    const ids = new Set<string>();
    for (const line of fragments.join("").split("\n")) {
      const m = line.match(/\[([^\]]+)\]/);
      if (m) ids.add(m[1]);
    }
    settle(ids.size > 0 ? ids : new Set());
  } catch {
    clearTimeout(timer);
    settle(new Set());
    signal?.removeEventListener("abort", onAbort);
  }
}

type AuggieModelResolution = { ok: true; model: string } | { ok: false; error: string };

/**
 * Validate + resolve the requested model against the registry allowlist.
 * Rejects flag-smuggling (leading "-") and any id not declared in the registry.
 * An empty/absent model resolves to the registry's first (default) model.
 *
 * Note: `initAuggieModels()` must be called at least once before this function
 * sees live-discovered models (the executor's `execute()` does this).
 */
export function resolveAuggieModel(model: unknown): AuggieModelResolution {
  const requested = typeof model === "string" ? model.trim() : "";
  if (!requested) return { ok: true, model: DEFAULT_AUGGIE_MODEL };
  if (requested.startsWith("-")) {
    return {
      ok: false,
      error: `Invalid Auggie model "${requested}": model must not start with "-".`,
    };
  }
  // Backward-compat alias: resolve old model IDs → v0.32.0 equivalents.
  // This lets saved combos referencing the old names keep working.
  const requestedAlias = AUGGIE_MODEL_ALIASES.get(requested);
  if (requestedAlias) return { ok: true, model: requestedAlias };
  // Static registry — always authoritative for the shipped set.
  if (AUGGIE_MODEL_ALLOWLIST.has(requested)) return { ok: true, model: requested };
  // Live-discovered models (if loaded) extend the static list.
  if (liveModelSet?.has(requested)) return { ok: true, model: requested };
  const known = [...AUGGIE_MODEL_ALLOWLIST];
  if (liveModelSet) known.push(...liveModelSet);
  return {
    ok: false,
    error: `Unknown Auggie model "${requested}". Supported models: ${known.join(", ")}.`,
  };
}

/**
 * Build the auggie argv. `model` MUST already be allowlist-validated via
 * resolveAuggieModel(). The trailing `--` marks the end of options so no
 * later positional value can be reinterpreted as a flag.
 */
function buildAuggieArgs(model: string): string[] {
  return ["--print", "--quiet", "--model", model, "--"];
}

/**
 * Spawn options shared by both auggie spawn sites.
 *
 * `shell: true` is required on win32: since Node's CVE-2024-27980 fix
 * (Node >=18.20.2/20.12.2/21.7.3), `spawn()` refuses to launch `.cmd`/`.bat`
 * targets (e.g. the global-npm `auggie.cmd` shim resolved by
 * resolveAuggieBin()'s PATH fallback) without shell interpretation, throwing
 * `spawn EINVAL`. The argv array (built by buildAuggieArgs()) is always a
 * fixed literal list plus an allowlist-validated `model` — never
 * interpolated into a shell string — so enabling `shell` here does not
 * reopen argument-injection: Node still passes argv as discrete array
 * elements to the shell, it does not concatenate them into a single
 * command line.
 */
export function buildAuggieSpawnOptions(stdio: ["pipe", "pipe", "pipe"]): {
  env: NodeJS.ProcessEnv;
  stdio: ["pipe", "pipe", "pipe"];
  shell: boolean;
} {
  return {
    env: process.env,
    stdio,
    shell: process.platform === "win32",
  };
}

// ─── Binary discovery ────────────────────────────────────────────────────────

export function resolveAuggieBin(): string {
  // 1. Explicit override
  const envBin = (process.env.AUGGIE_BIN || process.env.CLI_AUGGIE_BIN || "").trim();
  if (envBin) return envBin;

  const isWin = process.platform === "win32";

  // 2. Windows installer default: %LOCALAPPDATA%\auggie\bin\auggie.exe
  if (isWin) {
    const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local");
    const winPath = path.join(localAppData, "auggie", "bin", "auggie.exe");
    if (fs.existsSync(winPath)) return winPath;
  }

  // 3. Linux/macOS installer paths
  const home = os.homedir();
  for (const candidate of [
    path.join(home, ".local", "share", "auggie", "bin", "auggie"),
    path.join(home, ".auggie", "bin", "auggie"),
  ]) {
    if (fs.existsSync(candidate)) return candidate;
  }

  // Fallback — rely on PATH
  return isWin ? "auggie.cmd" : "auggie";
}

// ─── Multi-turn message → single prompt builder ───────────────────────────────

type OpenAIMsg = { role?: string; content?: unknown };

export function buildAuggiePrompt(messages: OpenAIMsg[]): string {
  const lines: string[] = [];
  for (const m of messages) {
    const role = String(m.role || "user");
    let text = "";
    if (typeof m.content === "string") {
      text = m.content;
    } else if (Array.isArray(m.content)) {
      for (const p of m.content) {
        if (p && typeof p === "object" && (p as Record<string, unknown>).type === "text") {
          text += String((p as Record<string, unknown>).text || "");
        }
      }
    }
    if (!text.trim()) continue;

    if (role === "system") {
      lines.push(`[System]\n${text}`);
    } else if (role === "assistant") {
      lines.push(`[Assistant]\n${text}`);
    } else {
      lines.push(`[User]\n${text}`);
    }
  }
  return lines.join("\n\n") || "(empty)";
}

function isEnoentLike(message: string): boolean {
  return message.includes("ENOENT") || message.includes("not found");
}

export type AuggieCliVersionCheck = { ok: boolean; version?: string; error?: string };

/**
 * Spawn `auggie --version` to confirm the local CLI is installed and runnable.
 * Used by the provider "Test Connection" flow — auggie has no API key, so this
 * is the only real signal we can give the operator before their first chat call.
 */
export function checkAuggieCliVersion(timeoutMs = 5000): Promise<AuggieCliVersionCheck> {
  const bin = resolveAuggieBin();
  return new Promise((resolve) => {
    let settled = false;
    const settle = (result: AuggieCliVersionCheck) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    let child: ReturnType<typeof spawn>;
    try {
      // No `shell` option — fixed argv, no cmd.exe interpretation.
      child = spawn(bin, ["--version"], {
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      settle({ ok: false, error: isEnoentLike(message) ? cliNotFoundMessage(bin) : message });
      return;
    }

    const timer = setTimeout(() => {
      if (!child.killed) child.kill("SIGKILL");
      settle({ ok: false, error: "Auggie CLI version check timed out" });
    }, timeoutMs);

    let stdout = "";
    child.stdout?.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf8");
    });
    child.on("error", (err: NodeJS.ErrnoException) => {
      clearTimeout(timer);
      const message = err?.message || String(err);
      settle({ ok: false, error: isEnoentLike(message) ? cliNotFoundMessage(bin) : message });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0 && stdout.trim()) {
        settle({ ok: true, version: stdout.trim().slice(0, 200) });
      } else {
        settle({ ok: false, error: `Auggie CLI exited with code ${code}` });
      }
    });
  });
}

function cliNotFoundMessage(bin: string): string {
  return sanitizeErrorMessage(
    `Auggie CLI not found: ${bin}. Install it and run "auggie login", or set AUGGIE_BIN to an absolute path.`
  );
}

// ─── AuggieExecutor ─────────────────────────────────────────────────────────

export class AuggieExecutor extends BaseExecutor {
  constructor() {
    super("auggie", { id: "auggie", baseUrl: "" });
  }

  buildUrl(): string {
    return AUGGIE_URL;
  }

  buildHeaders(): Record<string, string> {
    return {};
  }

  transformRequest(): unknown {
    return null;
  }

  /** No-op — auggie has no OmniRoute-managed credentials to refresh. */
  async refreshCredentials(
    _credentials: ProviderCredentials
  ): Promise<Partial<ProviderCredentials> | null> {
    return null;
  }
  async execute({ model, body, stream, signal, log }: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const b = (body ?? {}) as Record<string, unknown>;
    const messages: OpenAIMsg[] = Array.isArray(b.messages) ? (b.messages as OpenAIMsg[]) : [];
    const promptText = buildAuggiePrompt(messages);
    const auggieBin = resolveAuggieBin();
    const wantsStream = stream !== false;

    // On first execution, try to discover model IDs the local auggie recognises.
    // Best-effort: missing/inactive CLI falls through to the static list.
    await initAuggieModels(signal);
    // Argument-injection defense: never forward an unvalidated model into the argv.
    const modelResolution = resolveAuggieModel(model);
    if (!modelResolution.ok) {
      const response = wantsStream
        ? buildAuggieSseError(modelResolution.error)
        : errorResponse(400, modelResolution.error);
      return { response, url: AUGGIE_URL, headers: {}, transformedBody: { error: true } };
    }
    const safeModel = modelResolution.model;

    log?.info?.(
      "AUGGIE",
      `auggie --print → model=${safeModel}, bin=${auggieBin}, stream=${wantsStream}`
    );

    const response = wantsStream
      ? this.runStreaming(auggieBin, safeModel, promptText, signal, log)
      : await this.runNonStreaming(auggieBin, safeModel, promptText, signal, log);

    return {
      response,
      url: AUGGIE_URL,
      headers: {},
      transformedBody: { model: safeModel, promptLength: promptText.length },
    };
  }

  private spawnAuggie(auggieBin: string, model: string, promptText: string) {
    // `shell: true` on win32 only (see buildAuggieSpawnOptions() for why) — argv
    // stays a fixed literal array; `model` is already allowlist-validated by
    // resolveAuggieModel() before reaching here, so no argument-injection surface
    // is reopened by shell interpretation.
    const child = spawn(
      auggieBin,
      buildAuggieArgs(model),
      buildAuggieSpawnOptions(["pipe", "pipe", "pipe"])
    );
    // EPIPE from a fast-exiting CLI arrives ASYNCHRONOUSLY as an 'error' event on
    // stdin (not a sync throw), so the try/catch below cannot swallow it — without
    // this handler the unhandled stream error crashes the process instead of
    // letting the child's own 'error'/'close' handlers surface the failure.
    child.stdin.on("error", () => {});
    try {
      child.stdin.write(promptText);
      child.stdin.end();
    } catch {
      /* ignore write errors — 'error'/'close' handlers surface the failure */
    }
    return child;
  }

  private runStreaming(
    auggieBin: string,
    model: string,
    promptText: string,
    signal: AbortSignal | null | undefined,
    log: ExecuteInput["log"]
  ): Response {
    const responseId = `chatcmpl-auggie-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);

    const sseStream = new ReadableStream<Uint8Array>({
      start(controller) {
        const enc = new TextEncoder();
        const emit = (data: string) => controller.enqueue(enc.encode(data));
        let closed = false;
        let roleEmitted = false;
        let finished = false;

        const finish = () => {
          if (finished) return;
          finished = true;
          if (!closed) {
            closed = true;
            try {
              controller.close();
            } catch {
              /* already closed */
            }
          }
        };

        const emitDelta = (delta: string) => {
          if (!delta) return;
          if (!roleEmitted) {
            emit(
              `data: ${JSON.stringify({
                id: responseId,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [
                  { index: 0, delta: { role: "assistant", content: "" }, finish_reason: null },
                ],
              })}\n\n`
            );
            roleEmitted = true;
          }
          emit(
            `data: ${JSON.stringify({
              id: responseId,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { content: delta }, finish_reason: null }],
            })}\n\n`
          );
        };

        const emitError = (message: string) => {
          emit(`data: ${JSON.stringify(buildErrorBody(502, message))}\n\n`);
          emit("data: [DONE]\n\n");
          finish();
        };

        const emitStop = () => {
          emit(
            `data: ${JSON.stringify({
              id: responseId,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
            })}\n\n`
          );
          emit("data: [DONE]\n\n");
          finish();
        };

        let child: ReturnType<typeof spawn>;
        try {
          // `shell: true` on win32 only (see buildAuggieSpawnOptions() for why).
          // `model` is already allowlist-validated upstream, so shell interpretation
          // does not reopen argument-injection.
          child = spawn(
            auggieBin,
            buildAuggieArgs(model),
            buildAuggieSpawnOptions(["pipe", "pipe", "pipe"])
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          emitError(
            isEnoentLike(message) ? cliNotFoundMessage(auggieBin) : sanitizeErrorMessage(message)
          );
          return;
        }

        // Async EPIPE lands as an 'error' event on stdin, not a sync throw (see
        // spawnAuggie) — handle it so a fast-exiting CLI can't crash the stream.
        child.stdin.on("error", () => {});
        try {
          child.stdin.write(promptText);
          child.stdin.end();
        } catch {
          /* ignore — error/close handlers below surface failures */
        }

        if (signal) {
          signal.addEventListener("abort", () => {
            if (!child.killed) child.kill("SIGTERM");
            finish();
          });
        }

        child.on("error", (err: NodeJS.ErrnoException) => {
          const message = err?.message || String(err);
          emitError(
            isEnoentLike(message) ? cliNotFoundMessage(auggieBin) : sanitizeErrorMessage(message)
          );
        });

        let stderrTail = "";
        child.stdout?.on("data", (chunk: Buffer) => {
          emitDelta(chunk.toString("utf8"));
        });

        child.stderr?.on("data", (chunk: Buffer) => {
          stderrTail = (stderrTail + chunk.toString("utf8")).slice(-2000);
          log?.debug?.("AUGGIE", `stderr: ${chunk.toString("utf8").slice(0, 200)}`);
        });

        child.on("close", (code) => {
          if (finished) return;
          if (code !== 0) {
            emitError(
              sanitizeErrorMessage(
                `Auggie CLI exited with code ${code}${stderrTail ? `: ${stderrTail}` : ""}`
              )
            );
            return;
          }
          emitStop();
        });
      },
      cancel() {
        // Stream cancelled by the consumer — nothing extra to clean up here;
        // the abort-signal listener above (if provided) handles process kill.
      },
    });

    return new Response(sseStream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  private runNonStreaming(
    auggieBin: string,
    model: string,
    promptText: string,
    signal: AbortSignal | null | undefined,
    log: ExecuteInput["log"]
  ): Promise<Response> {
    return new Promise((resolve) => {
      let child: ReturnType<typeof spawn>;
      try {
        child = this.spawnAuggie(auggieBin, model, promptText);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        resolve(
          buildAuggieErrorResponse(
            isEnoentLike(message) ? cliNotFoundMessage(auggieBin) : sanitizeErrorMessage(message)
          )
        );
        return;
      }

      let stdout = "";
      let stderrTail = "";
      let settled = false;

      const settle = (response: Response) => {
        if (settled) return;
        settled = true;
        resolve(response);
      };

      if (signal) {
        signal.addEventListener("abort", () => {
          if (!child.killed) child.kill("SIGTERM");
          settle(buildAuggieErrorResponse(sanitizeErrorMessage("Auggie CLI request aborted")));
        });
      }

      child.stdout?.on("data", (chunk: Buffer) => {
        stdout += chunk.toString("utf8");
      });
      child.stderr?.on("data", (chunk: Buffer) => {
        stderrTail = (stderrTail + chunk.toString("utf8")).slice(-2000);
        log?.debug?.("AUGGIE", `stderr: ${chunk.toString("utf8").slice(0, 200)}`);
      });

      child.on("error", (err: NodeJS.ErrnoException) => {
        const message = err?.message || String(err);
        settle(
          buildAuggieErrorResponse(
            isEnoentLike(message) ? cliNotFoundMessage(auggieBin) : sanitizeErrorMessage(message)
          )
        );
      });

      child.on("close", (code) => {
        if (code !== 0) {
          settle(
            buildAuggieErrorResponse(
              sanitizeErrorMessage(
                `Auggie CLI exited with code ${code}${stderrTail ? `: ${stderrTail}` : ""}`
              )
            )
          );
          return;
        }
        settle(buildChatCompletionResponse(model, promptText, stdout));
      });
    });
  }
}

function buildChatCompletionResponse(model: string, promptText: string, content: string): Response {
  const trimmed = content.trim();
  const body = {
    id: `chatcmpl-auggie-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: trimmed },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: Math.ceil(promptText.length / 4),
      completion_tokens: Math.ceil(trimmed.length / 4),
      total_tokens: Math.ceil((promptText.length + trimmed.length) / 4),
      estimated: true,
    },
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function buildAuggieErrorResponse(message: string): Response {
  return errorResponse(502, message);
}

/**
 * Build a one-shot SSE error Response (single sanitized error event + [DONE]).
 * Used for pre-spawn rejections on the streaming path (e.g. an invalid model)
 * where no subprocess is ever started.
 */
function buildAuggieSseError(message: string): Response {
  const enc = new TextEncoder();
  const sseStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(enc.encode(`data: ${JSON.stringify(buildErrorBody(400, message))}\n\n`));
      controller.enqueue(enc.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(sseStream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// ─── Test helpers ──────────────────────────────────────────────────────────

/**
 * Reset the live model cache for testing.
 * Not exported from the package index.
 */
export function __resetAuggieModels(): void {
  liveModelSet = null;
}
