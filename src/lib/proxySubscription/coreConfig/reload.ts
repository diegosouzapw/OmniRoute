/**
 * Reload the local proxy core after a verified config replacement.
 *
 * Triggering is doubly conditioned by the caller (the sync service): only a
 * `replaced` apply outcome with a changed member digest reaches `reloadCore`.
 * This module never touches the disk or the database — the secret is passed
 * in by the service on every run (including deferred runs, re-read through
 * an async provider at the deadline), and process execution is injectable
 * for tests. It never throws toward the sync path: internal errors map to
 * `{ kind: "failed" }` so the sync stays `ok` with a warning.
 *
 * Declaration order (first match wins):
 * 1. Control API — when a control URL is set AND the active core offers an
 *    API reload. Clash-compatible cores expose
 *    `PUT <controlUrl>/configs?force=true` with body `{"path": "<file>"}`
 *    (source: Metacubex wiki "Clash RESTful API" / "mihomo docs — APIs",
 *    consulted 2026-09-30). sing-box offers no config-reload endpoint on its
 *    `experimental/clash_api` surface (source: sing-box docs
 *    `experimental/clash_api`, consulted 2026-09-30 — no reload route;
 *    reload happens via signal SIGHUP / `ExecReload=/bin/kill -HUP $MAINPID`
 *    per the official systemd units and SagerNet/sing-box#23), so sing-box
 *    only reloads through the declared command below.
 * 2. Declared command — `OMNIROUTE_PROXY_CORE_RELOAD_COMMAND`, a JSON
 *    argument array run with `execFile(argv[0], argv.slice(1),
 *    { shell: false, timeout: 30_000 })`. Never a shell string.
 * 3. External observer — the variable set to exactly `external`: nothing to
 *    run, reported as success.
 * Otherwise the outcome is `undeclared` and the caller warns.
 *
 * `none` is intentionally NOT a `ReloadOutcome`: it is the sync-side
 * no-call path (adopted file not replaced, or member digest identical), so
 * `reloadCore` is never invoked for it.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { SELECTOR_CONTROL_TIMEOUT_MS, joinUrl } from "../selectorClient";
import { isSelectorControlUrlAllowedAtFetchTime } from "../selectorGuard";
import { DEFAULT_CORE, RENDERERS } from "./renderers";

/**
 * Outcome of one reload attempt. `reason` values are stable English tokens
 * for logs and tests (`exit-code`, `timeout`, `guard-blocked`,
 * `http-error`, `network-error`, `auth-failed`, `invalid-command`,
 * `undeclared`); they are never shown in the UI, which only sees the
 * localized warning codes.
 */
export type ReloadOutcomeKind = "api" | "command" | "external" | "undeclared" | "failed";

export interface ReloadOutcome {
  kind: ReloadOutcomeKind;
  /** Stable internal token, see the kind JSDoc above. */
  reason?: string;
}

/** Reload mode shown on the subscription record (computed, never stored). */
export type CoreReloadMode = "api" | "command" | "external" | "undeclared";

export interface ResolveModeInput {
  controlUrl: string | null;
  apiCapable: boolean;
  commandDecl: CommandDecl;
}

export function resolveCoreReloadMode(input: ResolveModeInput): CoreReloadMode {
  if (input.controlUrl && input.apiCapable) return "api";
  if (input.commandDecl.kind === "command") return "command";
  if (input.commandDecl.kind === "external") return "external";
  return "undeclared";
}

export type CommandDecl =
  { kind: "command"; argv: string[] } | { kind: "external" } | { kind: "absent" };

const RELOAD_COMMAND_ENV = "OMNIROUTE_PROXY_CORE_RELOAD_COMMAND";
const RELOAD_WINDOW_MS = 60_000;
const EXEC_TIMEOUT_MS = 30_000;

export type ExecFn = (
  file: string,
  args: string[],
  opts: { shell: false; timeout: number }
) => Promise<{ code: number }>;

export type FetchFn = (
  url: string,
  init: Record<string, unknown>
) => Promise<{ status: number; text?: () => Promise<string> }>;

export type SecretProvider = () => Promise<string | null>;

export interface ReloadInput {
  subscriptionId: string;
  controlUrl: string | null;
  secret: string | null;
  configPath: string;
  /** Overrides the env declaration (tests, service wiring). */
  command?: string | string[] | null;
  fetchFn?: FetchFn;
  execFn?: ExecFn;
  nowFn?: () => number;
  scheduleFn?: (ms: number, fn: () => void) => () => void;
  /** Re-reads the secret when a deferred reload fires. Never the secret itself. */
  secretProvider?: SecretProvider;
}

interface CadenceEntry {
  at: number;
  cancel: (() => void) | null;
}

const lastReloadAt = new Map<string, number>();
const pendingDeferred = new Map<string, CadenceEntry>();
const lastMembersDigest = new Map<string, string>();

let invalidCommandWarned = false;

/** Test-only reset for the process-global invalid-command warning. */
export function __resetCoreReloadTestState(): void {
  lastReloadAt.clear();
  pendingDeferred.clear();
  lastMembersDigest.clear();
  invalidCommandWarned = false;
}

/** Test-only introspection: number of subscriptions with tracked state. */
export function __coreReloadStateSize(): number {
  return new Set([...lastReloadAt.keys(), ...pendingDeferred.keys(), ...lastMembersDigest.keys()])
    .size;
}

/** Reload mode for one mapped subscription row (control URL from the row, env declaration). */
export function resolveRecordReloadMode(r: Record<string, unknown>): CoreReloadMode {
  const url = r.control_url;
  return resolveCoreReloadMode({
    controlUrl: typeof url === "string" ? url : null,
    apiCapable: RENDERERS[DEFAULT_CORE]?.apiReload === true,
    commandDecl: readReloadCommandEnv(),
  });
}

/** Last rendered member digest for one subscription (undefined = no seed yet). */
export function getLastMembersDigest(subscriptionId: string): string | undefined {
  return lastMembersDigest.get(subscriptionId);
}

/** Remember the rendered member digest for one subscription. */
export function setLastMembersDigest(subscriptionId: string, digest: string): void {
  lastMembersDigest.set(subscriptionId, digest);
}

/** Forget cadence + digest state for one subscription; cancels a deferred reload. */
export function clearCoreReloadState(subscriptionId: string): void {
  pendingDeferred.get(subscriptionId)?.cancel?.();
  pendingDeferred.delete(subscriptionId);
  lastReloadAt.delete(subscriptionId);
  lastMembersDigest.delete(subscriptionId);
}

function warnOnceInvalidCommand(detail: string): void {
  if (invalidCommandWarned) return;
  invalidCommandWarned = true;
  console.warn(`[ProxySubscription] core reload command ignored (${detail})`);
}

/** Parse a raw declaration: JSON argument array, `external`, or absent. */
export function parseReloadCommand(raw: string | string[] | null | undefined): CommandDecl {
  if (raw === null || raw === undefined) return { kind: "absent" };
  if (Array.isArray(raw)) return checkArgv(raw);
  const text = raw.trim();
  if (!text) return { kind: "absent" };
  if (text === "external") return { kind: "external" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    warnOnceInvalidCommand("not-json");
    return { kind: "absent" };
  }
  if (!Array.isArray(parsed)) {
    warnOnceInvalidCommand("not-array");
    return { kind: "absent" };
  }
  return checkArgv(parsed);
}

function checkArgv(argv: unknown[]): CommandDecl {
  const ok =
    argv.length > 0 &&
    argv.every((a) => typeof a === "string" && a.length > 0) &&
    (argv[0] as string).startsWith("/");
  if (!ok) {
    warnOnceInvalidCommand("invalid-argv");
    return { kind: "absent" };
  }
  return { kind: "command", argv: argv as string[] };
}

/** Read the operator declaration from the environment (env only, never DB/API). */
export function readReloadCommandEnv(
  env: Record<string, string | undefined> = process.env
): CommandDecl {
  const raw = env[RELOAD_COMMAND_ENV] ?? process.env.OMNIROUTE_PROXY_CORE_RELOAD_COMMAND;
  return parseReloadCommand(raw);
}

function isApiCapable(): boolean {
  try {
    return RENDERERS[DEFAULT_CORE]?.apiReload === true;
  } catch {
    return false;
  }
}

const execFileAsync = promisify(execFile);

async function defaultExecFn(
  file: string,
  args: string[],
  opts: { shell: false; timeout: number }
): Promise<{ code: number }> {
  try {
    await execFileAsync(file, args, { shell: false, timeout: opts.timeout });
    return { code: 0 };
  } catch (error) {
    const err = error as { code?: unknown; killed?: boolean };
    if (err?.killed) {
      const timeoutError = new Error("reload command timed out") as Error & { code: string };
      timeoutError.code = "ETIMEDOUT";
      throw timeoutError;
    }
    if (typeof err?.code === "number") return { code: err.code };
    throw error;
  }
}

function isTimeoutError(error: unknown): boolean {
  const err = error as { code?: unknown; message?: unknown };
  if (err?.code === "ETIMEDOUT" || err?.code === "TIMEOUT") return true;
  return /timeout|timed out|abort/i.test(typeof err?.message === "string" ? err.message : "");
}

async function runApiReload(
  controlUrl: string,
  secret: string | null,
  configPath: string,
  fetchFn: FetchFn
): Promise<ReloadOutcome> {
  let guard: { allowed: boolean; reason?: string };
  try {
    guard = await isSelectorControlUrlAllowedAtFetchTime(controlUrl);
  } catch {
    return { kind: "failed", reason: "guard-blocked" };
  }
  if (!guard.allowed) return { kind: "failed", reason: "guard-blocked" };
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (secret) headers.Authorization = `Bearer ${secret}`;
  try {
    const res = await fetchFn(joinUrl(controlUrl, "/configs?force=true"), {
      method: "PUT",
      headers,
      body: JSON.stringify({ path: configPath }),
      timeoutMs: SELECTOR_CONTROL_TIMEOUT_MS,
    });
    if (res.status === 401 || res.status === 403) return { kind: "failed", reason: "auth-failed" };
    if (res.status < 200 || res.status >= 300) return { kind: "failed", reason: "http-error" };
    return { kind: "api" };
  } catch (error) {
    return { kind: "failed", reason: isTimeoutError(error) ? "timeout" : "network-error" };
  }
}

async function runCommandReload(argv: string[], execFn: ExecFn): Promise<ReloadOutcome> {
  try {
    const result = await execFn(argv[0], argv.slice(1), { shell: false, timeout: EXEC_TIMEOUT_MS });
    if (result.code !== 0) return { kind: "failed", reason: "exit-code" };
    return { kind: "command" };
  } catch (error) {
    return { kind: "failed", reason: isTimeoutError(error) ? "timeout" : "exit-code" };
  }
}

async function executeReload(input: ReloadInput, decl: CommandDecl): Promise<ReloadOutcome> {
  const fetchFn = input.fetchFn ?? defaultFetchFn;
  const execFn = input.execFn ?? defaultExecFn;
  const controlUrl = (input.controlUrl ?? "").trim();
  if (controlUrl && isApiCapable()) {
    const apiOutcome = await runApiReload(controlUrl, input.secret, input.configPath, fetchFn);
    // A guard-blocked control URL falls back to the declared command below;
    // other API failures are terminal for this attempt.
    if (apiOutcome.kind !== "failed" || apiOutcome.reason !== "guard-blocked") return apiOutcome;
  }
  const command =
    decl.kind === "absent" && input.command !== undefined
      ? parseReloadCommand(input.command)
      : decl;
  if (command.kind === "command") return runCommandReload(command.argv, execFn);
  if (command.kind === "external") return { kind: "external" };
  return { kind: "undeclared", reason: "undeclared" };
}

async function defaultFetchFn(
  url: string,
  init: Record<string, unknown>
): Promise<{ status: number }> {
  const res = await fetch(url, init as RequestInit);
  return { status: res.status };
}

/**
 * Reload the core after a verified replacement. Applies a per-subscription
 * 60s cadence: a second call inside the window defers one rerun to the
 * deadline (merged, secret re-read then), instead of running immediately.
 */
export async function reloadCore(input: ReloadInput): Promise<ReloadOutcome> {
  const nowFn = input.nowFn ?? Date.now;
  const scheduleFn =
    input.scheduleFn ??
    ((ms: number, fn: () => void) => {
      const timer = setTimeout(fn, ms);
      return () => clearTimeout(timer);
    });
  const decl =
    input.command !== undefined ? parseReloadCommand(input.command) : readReloadCommandEnv();
  const now = nowFn();
  const last = lastReloadAt.get(input.subscriptionId) ?? -Infinity;
  if (now - last < RELOAD_WINDOW_MS) {
    if (pendingDeferred.has(input.subscriptionId)) return { kind: "command" };
    const delay = RELOAD_WINDOW_MS - (now - last);
    const provider = input.secretProvider;
    let cancelled = false;
    const cancel = scheduleFn(delay, () => {
      if (cancelled) return;
      pendingDeferred.delete(input.subscriptionId);
      void (async () => {
        let secret = input.secret;
        if (provider) {
          try {
            secret = await provider();
          } catch {
            secret = null;
          }
        }
        lastReloadAt.set(input.subscriptionId, nowFn());
        await executeReload({ ...input, secret }, decl);
      })();
    });
    pendingDeferred.set(input.subscriptionId, {
      at: now + delay,
      cancel: () => {
        cancelled = true;
        cancel();
      },
    });
    return { kind: "command" };
  }
  lastReloadAt.set(input.subscriptionId, now);
  return executeReload(input, decl);
}
