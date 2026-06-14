/**
 * Codex (OpenAI) browser-driven device authorization flow.
 *
 * Runs ENTIRELY in the user's browser. `auth.openai.com` blocks datacenter IPs
 * (Cloudflare) but allows CORS, so the device flow MUST originate from the
 * user's browser — never from the OmniRoute server. The final tokens are handed
 * to the backend for persistence (see the OAuth route's persistence path).
 *
 * Wire contract (from OpenAI Codex CLI — codex-rs/login/src/device_code_auth.rs,
 * cross-checked against tumf/opencode-openai-device-auth). This is NOT the
 * RFC 8628 device grant; it is OpenAI's custom "deviceauth" flow:
 *
 *   1. POST {BASE}/api/accounts/deviceauth/usercode   (JSON)  { client_id }
 *        -> 200 { device_auth_id, user_code|usercode, interval }
 *        -> 404 device code login disabled for this account/workspace (admin gating)
 *   2. POST {BASE}/api/accounts/deviceauth/token      (JSON)  { device_auth_id, user_code }
 *        -> 200 { authorization_code, code_verifier }   (PKCE is generated server-side!)
 *        -> 403 | 404 authorization still pending → keep polling
 *   3. POST {BASE}/oauth/token                         (form) authorization_code grant
 *        with code + code_verifier (from step 2) + redirect_uri = {BASE}/deviceauth/callback
 *        -> 200 { access_token, refresh_token, id_token, expires_in }
 *
 *   Verification: the user opens {BASE}/codex/device and types the user_code.
 *
 * NOTE: this module must stay free of server-only imports (e.g. CODEX_CONFIG,
 * open-sse) so it can be bundled for the browser. The client_id below is the
 * public Codex CLI client identifier (same value as CODEX_CONFIG.clientId);
 * it relies on PKCE, not secrecy (RFC 8252). The server-side copies were moved to
 * resolvePublicCred() in #3493 (Rule #11); this browser-bundled copy stays a literal
 * by necessity — it cannot import open-sse's publicCreds without pulling server code
 * into the browser bundle.
 */

const BASE_URL = "https://auth.openai.com";
const API_BASE_URL = `${BASE_URL}/api/accounts`;
const DEFAULT_CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann";
const VERIFICATION_URI = `${BASE_URL}/codex/device`;
const REDIRECT_URI = `${BASE_URL}/deviceauth/callback`;

/** Total time the user has to authorize before we give up (OpenAI expires the code in 15 min). */
const DEFAULT_TIMEOUT_MS = 15 * 60 * 1000;
const DEFAULT_INTERVAL_SEC = 5;

export type CodexDeviceFlowErrorCode =
  | "device_disabled"
  | "usercode_failed"
  | "exchange_failed"
  | "timeout"
  | "aborted"
  | "network";

export class CodexDeviceFlowError extends Error {
  code: CodexDeviceFlowErrorCode;
  status?: number;

  constructor(code: CodexDeviceFlowErrorCode, message: string, status?: number) {
    super(message);
    this.name = "CodexDeviceFlowError";
    this.code = code;
    this.status = status;
  }
}

export interface CodexUserCode {
  /** Opaque handle returned by the usercode endpoint; required to poll. */
  deviceAuthId: string;
  /** One-time code the user types at the verification URL. */
  userCode: string;
  /** Server-suggested poll interval, in seconds. */
  intervalSec: number;
  /** URL the user opens to enter the code. */
  verificationUri: string;
}

export interface CodexDeviceTokens {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
}

interface RunOptions {
  /** Public Codex CLI client id; defaults to the embedded public value. */
  clientId?: string;
  /** Called once the user code is obtained, so the UI can display / copy / open it. */
  onUserCode?: (userCode: CodexUserCode) => void;
  /** Abort the flow (e.g. modal closed). */
  signal?: AbortSignal;
  /** Override the overall timeout (defaults to 15 minutes). */
  timeoutMs?: number;
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new CodexDeviceFlowError("aborted", "Device flow aborted");
  }
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);
    const onAbort = () => {
      cleanup();
      reject(new CodexDeviceFlowError("aborted", "Device flow aborted"));
    };
    function cleanup() {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
    }
    if (signal) {
      if (signal.aborted) {
        onAbort();
        return;
      }
      signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}

function normalizeInterval(raw: unknown): number {
  const n = typeof raw === "string" ? parseInt(raw, 10) : typeof raw === "number" ? raw : NaN;
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_INTERVAL_SEC;
}

/**
 * Step 1 — request a one-time user code + device_auth_id.
 * A 404 here means device code login is disabled for this account/workspace.
 */
export async function requestUserCode(
  clientId: string = DEFAULT_CLIENT_ID,
  signal?: AbortSignal
): Promise<CodexUserCode> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}/deviceauth/usercode`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: clientId }),
      signal,
    });
  } catch (e: any) {
    if (e?.name === "AbortError") throw new CodexDeviceFlowError("aborted", "Device flow aborted");
    throw new CodexDeviceFlowError("network", `Failed to reach OpenAI: ${e?.message || e}`);
  }

  if (res.status === 404) {
    throw new CodexDeviceFlowError(
      "device_disabled",
      "Device code login is not enabled for this account. Enable it in ChatGPT security settings (or ask your workspace admin), or use the localhost 'Adicionar' flow.",
      404
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new CodexDeviceFlowError(
      "usercode_failed",
      `Failed to request device code (${res.status}): ${text}`,
      res.status
    );
  }

  const data: any = await res.json();
  const userCode = data.user_code || data.usercode;
  if (!data.device_auth_id || !userCode) {
    throw new CodexDeviceFlowError(
      "usercode_failed",
      "Device code response missing device_auth_id or user_code"
    );
  }

  return {
    deviceAuthId: data.device_auth_id,
    userCode,
    intervalSec: normalizeInterval(data.interval),
    verificationUri: VERIFICATION_URI,
  };
}

/**
 * Step 2 — poll until the user authorizes. Returns the authorization_code and the
 * server-generated code_verifier needed for the token exchange.
 */
export async function pollForAuthorization(
  deviceAuthId: string,
  userCode: string,
  intervalSec: number,
  opts: { signal?: AbortSignal; timeoutMs?: number } = {}
): Promise<{ authorizationCode: string; codeVerifier: string }> {
  const { signal, timeoutMs = DEFAULT_TIMEOUT_MS } = opts;
  const deadline = startMonotonic() + timeoutMs;

  while (true) {
    throwIfAborted(signal);
    await delay(intervalSec * 1000, signal);

    if (startMonotonic() >= deadline) {
      throw new CodexDeviceFlowError("timeout", "Authorization timed out. Start a new session.");
    }

    let res: Response;
    try {
      res = await fetch(`${API_BASE_URL}/deviceauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ device_auth_id: deviceAuthId, user_code: userCode }),
        signal,
      });
    } catch (e: any) {
      if (e?.name === "AbortError")
        throw new CodexDeviceFlowError("aborted", "Device flow aborted");
      // Transient network error — keep polling until the deadline.
      continue;
    }

    if (res.ok) {
      const data: any = await res.json();
      if (!data.authorization_code || !data.code_verifier) {
        throw new CodexDeviceFlowError(
          "usercode_failed",
          "Authorization response missing authorization_code or code_verifier"
        );
      }
      return { authorizationCode: data.authorization_code, codeVerifier: data.code_verifier };
    }

    // 403 / 404 → still pending; anything else is a hard failure.
    if (res.status === 403 || res.status === 404) continue;

    const text = await res.text().catch(() => "");
    throw new CodexDeviceFlowError(
      "usercode_failed",
      `Polling failed (${res.status}): ${text}`,
      res.status
    );
  }
}

/** Step 3 — exchange the authorization_code (+ server code_verifier) for tokens. */
export async function exchangeCodeForTokens(
  authorizationCode: string,
  codeVerifier: string,
  clientId: string = DEFAULT_CLIENT_ID,
  signal?: AbortSignal
): Promise<CodexDeviceTokens> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        code: authorizationCode,
        code_verifier: codeVerifier,
        redirect_uri: REDIRECT_URI,
      }).toString(),
      signal,
    });
  } catch (e: any) {
    if (e?.name === "AbortError") throw new CodexDeviceFlowError("aborted", "Device flow aborted");
    throw new CodexDeviceFlowError("network", `Token exchange failed: ${e?.message || e}`);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new CodexDeviceFlowError(
      "exchange_failed",
      `Token exchange failed (${res.status}): ${text}`,
      res.status
    );
  }

  const data: any = await res.json();
  if (!data.access_token) {
    throw new CodexDeviceFlowError("exchange_failed", "Token exchange returned no access_token");
  }
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    id_token: data.id_token,
    expires_in: data.expires_in,
  };
}

/**
 * High-level orchestrator: request the user code (firing `onUserCode` so the UI can
 * show it), poll until authorized, then exchange for tokens. The caller then ships
 * the returned tokens to the backend for persistence.
 */
export async function runCodexDeviceFlow(opts: RunOptions = {}): Promise<CodexDeviceTokens> {
  const clientId = opts.clientId || DEFAULT_CLIENT_ID;
  throwIfAborted(opts.signal);

  const userCode = await requestUserCode(clientId, opts.signal);
  opts.onUserCode?.(userCode);

  const { authorizationCode, codeVerifier } = await pollForAuthorization(
    userCode.deviceAuthId,
    userCode.userCode,
    userCode.intervalSec,
    { signal: opts.signal, timeoutMs: opts.timeoutMs }
  );

  return exchangeCodeForTokens(authorizationCode, codeVerifier, clientId, opts.signal);
}

/** Monotonic-ish clock that tolerates environments where performance is unavailable. */
function startMonotonic(): number {
  return typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();
}
