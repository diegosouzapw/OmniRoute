/**
 * MiMoCode Executor — Free-tier Xiaomi MiMo models via bootstrap JWT auth.
 *
 * Implements the auth flow from the official MiMo-Code repository:
 *   https://github.com/XiaomiMiMo/MiMo-Code/blob/main/packages/opencode/src/plugin/mimo-free.ts
 *
 *   1. Generate device fingerprint from hostname + OS + arch + CPU + username
 *   2. POST /api/free-ai/bootstrap with fingerprint → JWT
 *   3. Use JWT as Bearer token for chat requests
 *   4. Custom endpoint: /api/free-ai/openai/chat (not /v1/chat/completions)
 *   5. Custom header: X-Mimo-Source: mimocode-cli-free
 *
 * Only the "mimo-auto" model is supported (1M context, 128K output).
 * Supports multiple accounts: N fingerprints → N JWTs → round-robin with cooldown.
 * On 429, account enters cooldown (exponential backoff). On 401/403, JWT is re-bootstrapped.
 */

import * as crypto from "node:crypto";
import * as os from "node:os";
import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { runWithProxyContext } from "../utils/proxyFetch.ts";

const BOOTSTRAP_PATH = "/api/free-ai/bootstrap";
const CHAT_PATH = "/api/free-ai/openai/chat";
const JWT_REFRESH_BUFFER_MS = 5 * 60 * 1000;
const BOOTSTRAP_TIMEOUT_MS = 15_000;
const COOLDOWN_BASE_MS = 5_000;
const COOLDOWN_MAX_MS = 60_000;

const MIMO_SOURCE = "mimocode-cli-free";

/**
 * Anti-abuse gate marker required by the Xiaomi free endpoint.
 *
 * `/api/free-ai/openai/chat` returns `403 "Illegal access"` unless the request body
 * contains a recognized MiMoCode prompt signature as a substring inside a `system`-role
 * message (verified empirically — headers, fingerprint, and JWT are not what is checked).
 * This is the canonical MiMoCode agent opener the official CLI sends, and it is on the
 * upstream allowlist. We inject it as a leading system message so user requests pass the
 * gate. The string MUST stay byte-for-byte identical — the check is case-sensitive and
 * truncations are rejected.
 */
export const MIMO_SYSTEM_MARKER =
  "You are MiMoCode, an interactive CLI tool that helps users with software engineering tasks.";

/**
 * Ensure the outgoing body carries the MiMoCode anti-abuse marker in a system message.
 * Idempotent: if any system message already contains the marker, the body is returned
 * unchanged. Bodies without a `messages` array are left untouched.
 */
function injectSystemMarker(body: Record<string, unknown>): Record<string, unknown> {
  const messages = body.messages;
  if (!Array.isArray(messages)) return body;

  const hasMarker = messages.some(
    (m) =>
      m != null &&
      typeof m === "object" &&
      (m as { role?: unknown }).role === "system" &&
      typeof (m as { content?: unknown }).content === "string" &&
      (m as { content: string }).content.includes(MIMO_SYSTEM_MARKER)
  );
  if (hasMarker) return body;

  return { ...body, messages: [{ role: "system", content: MIMO_SYSTEM_MARKER }, ...messages] };
}

const USER_AGENTS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
];

// ── Account State ──────────────────────────────────────────────────────────

/** Per-account proxy configuration, passed through providerSpecificData.accountProxies. */
export interface AccountProxyConfig {
  fingerprint: string;
  proxy: {
    type: string;
    host: string;
    port: number;
    username?: string;
    password?: string;
  } | null;
}

interface AccountState {
  fingerprint: string;
  jwt: string;
  expiresAt: number;
  cooldownUntil: number;
  consecutiveFails: number;
  /** Resolved proxy config for this account (null = direct). */
  proxy: AccountProxyConfig["proxy"];
}

function parseJwtExp(jwt: string): number {
  try {
    const parts = jwt.split(".");
    if (parts.length < 2) return Date.now() + 50 * 60 * 1000;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
    return (payload.exp ?? Math.floor(Date.now() / 1000) + 3000) * 1000;
  } catch {
    return Date.now() + 50 * 60 * 1000;
  }
}

function isAccountReady(account: AccountState): boolean {
  if (account.cooldownUntil > Date.now()) return false;
  if (account.jwt && account.expiresAt - Date.now() > JWT_REFRESH_BUFFER_MS) return true;
  return false;
}

// ── Fingerprint Generation ─────────────────────────────────────────────────

function getCpuModel(): string {
  try {
    const cpus = os.cpus();
    if (cpus.length > 0 && cpus[0].model) return cpus[0].model.trim();
  } catch {
    /* ignore */
  }
  return "unknown-cpu";
}

export function generateFingerprint(seed?: string): string {
  if (seed) return crypto.createHash("sha256").update(seed).digest("hex");
  const hostname = os.hostname();
  const platform = os.platform();
  const arch = os.arch();
  const cpu = getCpuModel();
  let username = "unknown-user";
  try {
    username = os.userInfo().username;
  } catch {
    /* ignore */
  }
  return crypto
    .createHash("sha256")
    .update(`${hostname}|${platform}|${arch}|${cpu}|${username}`)
    .digest("hex");
}

// ── Bootstrap ──────────────────────────────────────────────────────────────

const bootstrapInflight = new Map<string, Promise<{ jwt: string; expiresAt: number }>>();

async function bootstrapJwt(
  baseUrl: string,
  fingerprint: string,
  signal?: AbortSignal | null
): Promise<{ jwt: string; expiresAt: number }> {
  const existing = bootstrapInflight.get(fingerprint);
  if (existing) return existing;

  const url = `${baseUrl}${BOOTSTRAP_PATH}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BOOTSTRAP_TIMEOUT_MS);
  const onSignal = signal ? () => controller.abort(signal.reason) : null;
  if (signal && onSignal) signal.addEventListener("abort", onSignal, { once: true });

  const promise = (async () => {
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client: fingerprint }),
        signal: controller.signal,
      });
      if (!resp.ok) {
        const body = await resp.text().catch(() => "");
        throw new Error(`Bootstrap failed: ${resp.status} ${body.slice(0, 200)}`);
      }
      const data = (await resp.json()) as { jwt?: string };
      if (!data.jwt) throw new Error("Bootstrap response missing jwt field");
      return { jwt: data.jwt, expiresAt: parseJwtExp(data.jwt) };
    } finally {
      clearTimeout(timer);
      if (signal && onSignal) signal.removeEventListener("abort", onSignal);
      bootstrapInflight.delete(fingerprint);
    }
  })();

  bootstrapInflight.set(fingerprint, promise);
  return promise;
}

// ── Model Rewriting ────────────────────────────────────────────────────────

function rewriteModelName(model: string): string {
  const idx = model.lastIndexOf("/");
  return idx >= 0 ? model.slice(idx + 1) : model;
}

// ── Executor ───────────────────────────────────────────────────────────────

export class MimocodeExecutor extends BaseExecutor {
  private accounts: AccountState[] = [];
  private nextAccountIdx = 0;
  private baseUrl: string;
  private static encoder = new TextEncoder();

  constructor() {
    super("mimocode", { format: "openai" });
    this.baseUrl = this.getBaseUrls()[0] || "https://api.xiaomimimo.com";
    this.accounts.push({
      fingerprint: generateFingerprint(),
      jwt: "",
      expiresAt: 0,
      cooldownUntil: 0,
      consecutiveFails: 0,
      proxy: null,
    });
  }

  private syncAccountsFromCredentials(credentials: ProviderCredentials): void {
    const fingerprints = credentials?.providerSpecificData?.fingerprints;
    if (Array.isArray(fingerprints)) {
      const existing = new Set(this.accounts.map((a) => a.fingerprint));
      for (const fp of fingerprints) {
        if (typeof fp === "string" && !existing.has(fp)) {
          this.accounts.push({
            fingerprint: fp,
            jwt: "",
            expiresAt: 0,
            cooldownUntil: 0,
            consecutiveFails: 0,
            proxy: null,
          });
          existing.add(fp);
        }
      }
    }

    const accountProxies = credentials?.providerSpecificData?.accountProxies as
      | AccountProxyConfig[]
      | undefined;
    const proxyMap = Array.isArray(accountProxies)
      ? new Map(accountProxies.map((ap) => [ap.fingerprint, ap.proxy] as const))
      : null;

    for (const acct of this.accounts) {
      if (proxyMap) {
        const entry = proxyMap.get(acct.fingerprint);
        acct.proxy = entry !== undefined ? (entry ?? null) : null;
      } else {
        acct.proxy = null;
      }
    }
  }

  private async getJwtForAccount(
    account: AccountState,
    signal?: AbortSignal | null
  ): Promise<string> {
    if (isAccountReady(account)) return account.jwt;
    const proxy = account.proxy;
    const result = await runWithProxyContext(proxy, () =>
      bootstrapJwt(this.baseUrl, account.fingerprint, signal)
    );
    account.jwt = result.jwt;
    account.expiresAt = result.expiresAt;
    return account.jwt;
  }

  private pickAccount(): AccountState {
    for (let i = 0; i < this.accounts.length; i++) {
      const idx = (this.nextAccountIdx + i) % this.accounts.length;
      const acct = this.accounts[idx];
      if (isAccountReady(acct)) {
        this.nextAccountIdx = (idx + 1) % this.accounts.length;
        return acct;
      }
    }
    const fallbackIdx = this.nextAccountIdx % this.accounts.length;
    this.nextAccountIdx = (this.nextAccountIdx + 1) % this.accounts.length;
    return this.accounts[fallbackIdx];
  }

  private markCooldown(account: AccountState): void {
    account.consecutiveFails++;
    const backoff = Math.min(
      COOLDOWN_BASE_MS * Math.pow(2, account.consecutiveFails - 1),
      COOLDOWN_MAX_MS
    );
    account.cooldownUntil = Date.now() + backoff + Math.random() * 1000;
  }

  private markSuccess(account: AccountState): void {
    account.consecutiveFails = 0;
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    _credentials?: ProviderCredentials | null
  ): string {
    return `${this.baseUrl.replace(/\/$/, "")}${CHAT_PATH}`;
  }

  buildHeaders(
    _credentials: ProviderCredentials,
    stream = true,
    _clientHeaders?: Record<string, string> | null,
    _model?: string
  ): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Mimo-Source": MIMO_SOURCE,
      "User-Agent": USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
    };
    if (stream) headers["Accept"] = "text/event-stream, application/json";
    return headers;
  }

  transformRequest(
    model: string,
    body: unknown,
    _stream: boolean,
    _credentials?: ProviderCredentials | null
  ): unknown {
    if (typeof body === "object" && body !== null) {
      const withModel = { ...(body as Record<string, unknown>), model: rewriteModelName(model) };
      return injectSystemMarker(withModel);
    }
    return body;
  }

  async testConnection(
    _credentials: ProviderCredentials,
    _signal?: AbortSignal | null,
    log?: ExecuteInput["log"]
  ): Promise<boolean> {
    try {
      this.syncAccountsFromCredentials(_credentials);
      const account = this.accounts[0];
      const jwt = await this.getJwtForAccount(account, _signal);
      const proxy = account.proxy;
      const resp = await runWithProxyContext(proxy, () =>
        fetch(this.buildUrl("mimo-auto", false), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
            "X-Mimo-Source": MIMO_SOURCE,
          },
          body: JSON.stringify(
            injectSystemMarker({
              model: "mimo-auto",
              messages: [{ role: "user", content: "ping" }],
              stream: false,
            })
          ),
          signal: _signal ?? undefined,
        })
      );
      return resp.status === 200;
    } catch {
      log?.warn?.("MIMOCODE", "testConnection network error");
      return false;
    }
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const { model, stream, body, signal, log } = input;
    const encoder = MimocodeExecutor.encoder;

    if (signal?.aborted) {
      return {
        response: new Response(
          encoder.encode(
            JSON.stringify({
              error: { message: "Request aborted", type: "abort", code: "ABORTED" },
            })
          ),
          { status: 499, headers: { "Content-Type": "application/json" } }
        ),
        url: this.buildUrl(model, stream),
        headers: this.buildHeaders(input.credentials, stream),
        transformedBody: body,
      };
    }

    const url = this.buildUrl(model, stream);
    const reqBody = this.transformRequest(model, body, stream, input.credentials);

    this.syncAccountsFromCredentials(input.credentials);

    // Try each account, skip cooldown ones
    for (let attempt = 0; attempt < this.accounts.length; attempt++) {
      const account = this.pickAccount();
      try {
        const jwt = await this.getJwtForAccount(account, signal);
        const headers = this.buildHeaders(input.credentials, stream);
        headers["Authorization"] = `Bearer ${jwt}`;
        const proxy = account.proxy;

        let resp = await runWithProxyContext(proxy, () =>
          fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(reqBody),
            signal: signal ?? undefined,
          })
        );

        // On auth failure, re-bootstrap this account and retry once
        if (resp.status === 401 || resp.status === 403) {
          log?.warn?.(
            "MIMOCODE",
            `Auth failed (${resp.status}) on account ${account.fingerprint.slice(0, 8)}…`
          );
          account.jwt = "";
          account.expiresAt = 0;
          account.consecutiveFails = 0;
          const freshJwt = await this.getJwtForAccount(account, signal);
          headers["Authorization"] = `Bearer ${freshJwt}`;
          resp = await runWithProxyContext(proxy, () =>
            fetch(url, {
              method: "POST",
              headers,
              body: JSON.stringify(reqBody),
              signal: signal ?? undefined,
            })
          );
        }

        if (resp.status === 429) {
          this.markCooldown(account);
          log?.warn?.(
            "MIMOCODE",
            `Rate limited on account ${account.fingerprint.slice(0, 8)}, trying next…`
          );
          continue;
        }

        this.markSuccess(account);
        const respHeaders: Record<string, string> = {};
        resp.headers.forEach((v, k) => {
          respHeaders[k] = v;
        });
        return {
          response: resp as unknown as Response,
          url,
          headers: respHeaders,
          transformedBody: reqBody,
        };
      } catch (err) {
        this.markCooldown(account);
        if (attempt === this.accounts.length - 1) {
          const msg = err instanceof Error ? err.message : String(err);
          log?.error?.("MIMOCODE", `Executor error: ${msg}`);
          return {
            response: new Response(
              encoder.encode(
                JSON.stringify({
                  error: { message: msg, type: "upstream_error", code: "EXECUTOR_ERROR" },
                })
              ),
              { status: 502, headers: { "Content-Type": "application/json" } }
            ),
            url,
            headers: this.buildHeaders(input.credentials, stream),
            transformedBody: body,
          };
        }
      }
    }

    return {
      response: new Response(
        encoder.encode(
          JSON.stringify({
            error: {
              message: "All accounts exhausted",
              type: "upstream_error",
              code: "NO_ACCOUNTS",
            },
          })
        ),
        { status: 502, headers: { "Content-Type": "application/json" } }
      ),
      url,
      headers: this.buildHeaders(input.credentials, stream),
      transformedBody: body,
    };
  }
}

export default MimocodeExecutor;
