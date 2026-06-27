/**
 * tests/integration/combo-live/_liveHarness.ts
 *
 * Gated live-smoke harness. Exercises the REAL chat pipeline against REAL
 * providers using a read-only snapshot of the production VPS database.
 *
 * GATE: set RUN_COMBO_LIVE=1 to enable. Without it, every import is a no-op
 * (no ssh, no scp, no DB open) and the returned object carries only
 * { LIVE_ENABLED: false }.
 *
 * SAFETY:
 *  - VPS access is READ-ONLY: one `grep` of the .env file + `scp` of the DB.
 *    No writes, no deletes, nothing else touches 192.168.0.15.
 *  - The snapshot file holds real production credentials. It lives only under
 *    the OS temp dir created here, is never written into the repo, and is
 *    deleted in cleanup().
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ---------------------------------------------------------------------------
// Gate
// ---------------------------------------------------------------------------

export const LIVE_ENABLED = process.env.RUN_COMBO_LIVE === "1";

// In-scope provider ids (from the task spec).
const IN_SCOPE_PROVIDERS = new Set([
  "claude",
  "glm",
  "minimax",
  "kimi-coding-apikey",
  "ollama-cloud",
  "opencode-go",
  // bonus apikey providers
  "gemini",
  "deepseek",
  "groq",
  "cerebras",
  "openrouter",
  "together",
]);

// Provider → sensible default model (fallback when default_model is null).
const PROVIDER_DEFAULT_MODELS: Record<string, string> = {
  "claude": "claude-3-5-haiku-20241022",
  "glm": "glm-4-flash",
  "minimax": "minimax-text-01",
  "kimi-coding-apikey": "moonshot-v1-8k",
  "ollama-cloud": "llama3.2:3b",
  "opencode-go": "gpt-4o-mini",
  "gemini": "gemini-2.0-flash-lite",
  "deepseek": "deepseek-chat",
  "groq": "llama-3.1-8b-instant",
  "cerebras": "llama-3.1-8b",
  "openrouter": "openai/gpt-4o-mini",
  "together": "meta-llama/Llama-3-8b-chat-hf",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LiveConnection = {
  id: string;
  provider: string;
  model: string | undefined;
  authType: string;
};

export type ComboModelEntry = {
  id: string;
  kind: "model";
  providerId: string;
  model: string;
  connectionId: string;
};

export type LiveHarness = {
  LIVE_ENABLED: false;
} | LiveHarnessEnabled;

export type LiveHarnessEnabled = {
  LIVE_ENABLED: true;
  BaseExecutor: any;
  handleChat: any;
  combosDb: any;
  originalRetryDelayMs: number;
  buildRequest: (opts?: {
    url?: string;
    body?: any;
    authKey?: string | null;
    headers?: Record<string, string>;
    signal?: AbortSignal;
  }) => Request;
  liveBody: (model: string, overrides?: Record<string, unknown>) => Record<string, unknown>;
  listLiveConnections: () => Promise<LiveConnection[]>;
  comboModelFor: (conn: LiveConnection) => ComboModelEntry;
  servedProvider: (response: Response) => string | undefined;
  servedProviderFromBody: (response: Response) => Promise<string | undefined>;
  readCompletionText: (response: Response) => Promise<string>;
  resetCachesForTest: () => void;
  cleanup: () => Promise<void>;
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export async function createLiveHarness(prefix: string): Promise<LiveHarness> {
  if (!LIVE_ENABLED) {
    return { LIVE_ENABLED: false };
  }

  // -------------------------------------------------------------------------
  // 1. Create a temp dir to hold the snapshot (treat as sensitive).
  // -------------------------------------------------------------------------
  const snapshotDir = fs.mkdtempSync(path.join(os.tmpdir(), `omniroute-live-${prefix}-`));

  // -------------------------------------------------------------------------
  // 2. Fetch VPS secrets (read-only: one grep over .env).
  //    Using execFileSync with a string[] argv — no shell interpolation.
  // -------------------------------------------------------------------------
  let storageEncryptionKey = "";
  let apiKeySecret = "";

  try {
    const output = execFileSync(
      "ssh",
      [
        "root@192.168.0.15",
        'grep -E "^(STORAGE_ENCRYPTION_KEY|API_KEY_SECRET)=" ~/.omniroute/.env',
      ],
      { encoding: "utf8", timeout: 15_000 }
    );

    for (const line of output.split("\n")) {
      const trimmed = line.trim();
      if (trimmed.startsWith("STORAGE_ENCRYPTION_KEY=")) {
        storageEncryptionKey = trimmed.slice("STORAGE_ENCRYPTION_KEY=".length);
      } else if (trimmed.startsWith("API_KEY_SECRET=")) {
        apiKeySecret = trimmed.slice("API_KEY_SECRET=".length);
      }
    }
  } catch (err: any) {
    fs.rmSync(snapshotDir, { recursive: true, force: true });
    throw new Error(`[liveHarness] Failed to fetch VPS secrets via ssh: ${err.message}`);
  }

  if (!storageEncryptionKey || !apiKeySecret) {
    fs.rmSync(snapshotDir, { recursive: true, force: true });
    throw new Error(
      "[liveHarness] Could not parse STORAGE_ENCRYPTION_KEY or API_KEY_SECRET from VPS .env"
    );
  }

  // -------------------------------------------------------------------------
  // 3. Set env vars BEFORE any src/lib/db import.
  //    Mirror the _chatPipelineHarness pattern for auth bypass.
  // -------------------------------------------------------------------------
  process.env.DATA_DIR = snapshotDir;
  process.env.STORAGE_ENCRYPTION_KEY = storageEncryptionKey;
  process.env.API_KEY_SECRET = apiKeySecret;
  process.env.REQUIRE_API_KEY = "false";
  process.env.DASHBOARD_PASSWORD = "";
  process.env.INITIAL_PASSWORD = "";
  delete process.env.JWT_SECRET;

  // -------------------------------------------------------------------------
  // 4. scp the production DB into snapshotDir (read-only: no VPS write).
  //    execFileSync with string[] argv — no shell interpolation.
  // -------------------------------------------------------------------------
  const snapshotDbPath = path.join(snapshotDir, "storage.sqlite");

  try {
    execFileSync(
      "scp",
      ["root@192.168.0.15:/root/.omniroute/storage.sqlite", snapshotDbPath],
      { timeout: 60_000 }
    );
  } catch (err: any) {
    fs.rmSync(snapshotDir, { recursive: true, force: true });
    throw new Error(`[liveHarness] Failed to scp production DB: ${err.message}`);
  }

  // -------------------------------------------------------------------------
  // 5. Dynamic imports AFTER env is set (mirrors _chatPipelineHarness order).
  //    Real fetch is left untouched — live calls reach real upstreams.
  // -------------------------------------------------------------------------
  const core = await import("../../../src/lib/db/core.ts");
  const providersDb = await import("../../../src/lib/db/providers.ts");
  const combosDb = await import("../../../src/lib/db/combos.ts");
  const settingsDb = await import("../../../src/lib/db/settings.ts");
  const { handleChat } = await import("../../../src/sse/handlers/chat.ts");
  const { initTranslators } = await import("../../../open-sse/translator/index.ts");
  const { BaseExecutor } = await import("../../../open-sse/executors/base.ts");
  const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");
  const { clearInflight } = await import("../../../open-sse/services/requestDedup.ts");
  const semanticCacheModule = await import("../../../src/lib/semanticCache.ts");
  const { clearIdempotency } = await import("../../../src/lib/idempotencyLayer.ts");
  const { invalidateDbCache } = await import("../../../src/lib/db/readCache.ts");

  const originalRetryDelayMs = BaseExecutor.RETRY_CONFIG.delayMs;

  // -------------------------------------------------------------------------
  // 5a. Disable semantic cache + dedup for the test process.
  //     The production DB snapshot may have cached responses for temperature=0
  //     "ping" messages — disable so every call really hits upstream.
  // -------------------------------------------------------------------------
  await settingsDb.updateSettings({ semanticCacheEnabled: false });
  // Clear any in-memory semantic cache entries that were loaded with the snapshot.
  semanticCacheModule.clearCache();
  // Bust the settings read-cache so chatCore reads the updated setting immediately.
  invalidateDbCache("settings");

  initTranslators();

  // -------------------------------------------------------------------------
  // 6. Internal connection-id → provider map (built lazily).
  // -------------------------------------------------------------------------
  let _connMap: Map<string, string> | null = null;

  async function _getConnMap(): Promise<Map<string, string>> {
    if (_connMap) return _connMap;
    const conns = await providersDb.getProviderConnections({ isActive: true });
    _connMap = new Map(conns.map((c: any) => [c.id as string, c.provider as string]));
    return _connMap;
  }

  // -------------------------------------------------------------------------
  // Exposed API
  // -------------------------------------------------------------------------

  function buildRequest({
    url = "http://localhost/v1/chat/completions",
    body,
    authKey = null,
    headers = {},
    signal,
  }: {
    url?: string;
    body?: any;
    authKey?: string | null;
    headers?: Record<string, string>;
    signal?: AbortSignal;
  } = {}) {
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };
    if (authKey) {
      requestHeaders.Authorization = `Bearer ${authKey}`;
    }
    return new Request(url, {
      method: "POST",
      headers: requestHeaders,
      body: typeof body === "string" ? body : JSON.stringify(body),
      signal,
    });
  }

  function liveBody(model: string, overrides: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      model,
      stream: false,
      max_tokens: 16,
      temperature: 0,
      messages: [{ role: "user", content: "ping" }],
      ...overrides,
    };
  }

  async function listLiveConnections(): Promise<LiveConnection[]> {
    const conns = await providersDb.getProviderConnections({ isActive: true });
    return conns
      .filter((c: any) => IN_SCOPE_PROVIDERS.has(c.provider))
      .map((c: any) => ({
        id: c.id as string,
        provider: c.provider as string,
        model: (c.defaultModel as string | null | undefined) || undefined,
        authType: c.authType as string,
      }));
  }

  function comboModelFor(conn: LiveConnection): ComboModelEntry {
    const model =
      conn.model || PROVIDER_DEFAULT_MODELS[conn.provider] || `${conn.provider}/default`;
    return {
      id: `live-${conn.provider}`,
      kind: "model",
      providerId: conn.provider,
      model,
      connectionId: conn.id,
    };
  }

  /**
   * Extract the serving provider id from the response.
   *
   * ## Signal source
   * `withSelectedConnectionHeader` in `src/sse/handlers/chatHelpers.ts` sets
   * `X-OmniRoute-Selected-Connection-Id` on the response, but only on the
   * **non-success return paths** in `src/sse/handlers/chat.ts` (error recovery,
   * fallback, timeout paths). On a clean first-attempt 200 success the handler
   * returns `result.response` directly at line 1239 without calling
   * `withSelectedConnectionHeader`, so the header is absent.
   *
   * ## What this means for tests
   * - **Error / fallback paths** (404, 429, 5xx with a second connection that
   *   succeeds): header IS present → `servedProvider` returns the provider id.
   * - **Clean 200 success on first attempt**: header is absent → returns
   *   `undefined`. Ordering assertions must fall back to "valid completion
   *   received" (i.e. `response.status === 200 && text !== ""`).
   *
   * For direct-model calls (e.g. `model: "groq/llama-3.1-8b-instant"`) the
   * caller already knows the target provider from the model string; use
   * `servedProviderFromBody(response)` which parses the `model` field of the
   * OpenAI-shape response body as an additional signal.
   */
  function servedProvider(response: Response): string | undefined {
    const connectionId = response.headers.get("X-OmniRoute-Selected-Connection-Id");
    if (!connectionId) return undefined;
    // Sync read from the already-built map (populated eagerly at harness init).
    if (!_connMap) return undefined;
    return _connMap.get(connectionId);
  }

  /**
   * Variant that awaits the map build then resolves the provider.
   * Use this when you want a resolved value after the first listLiveConnections call.
   */
  async function servedProviderAsync(response: Response): Promise<string | undefined> {
    const connectionId = response.headers.get("X-OmniRoute-Selected-Connection-Id");
    if (!connectionId) return undefined;
    const map = await _getConnMap();
    return map.get(connectionId);
  }

  /**
   * Alternative served-provider signal: parse the `model` field from the
   * OpenAI-shape response body and extract the provider prefix.
   *
   * Many providers include their own model name in the response (e.g.
   * `"model": "llama-3.1-8b-instant"` from groq). This is unreliable for
   * distinguishing providers that share model names, but is useful as a
   * secondary check when the header signal is absent on clean 200 paths.
   *
   * Returns `undefined` if the body cannot be parsed or no provider prefix
   * is found. Consumes a clone of the response — does not affect the original.
   */
  async function servedProviderFromBody(response: Response): Promise<string | undefined> {
    try {
      const cloned = response.clone();
      const json = await cloned.json();
      const modelField: string | undefined = json?.model;
      if (!modelField) return undefined;
      // If the model string starts with a known provider prefix (e.g. "groq/...")
      const slashIdx = modelField.indexOf("/");
      if (slashIdx > 0) {
        const prefix = modelField.slice(0, slashIdx);
        if (IN_SCOPE_PROVIDERS.has(prefix)) return prefix;
      }
      return undefined;
    } catch {
      return undefined;
    }
  }

  async function readCompletionText(response: Response): Promise<string> {
    const cloned = response.clone();
    const json = await cloned.json();
    return (json?.choices?.[0]?.message?.content as string) ?? "";
  }

  /**
   * Clear all in-memory caches between tests so each call hits the real upstream.
   * Call in beforeEach. Does NOT touch the DB snapshot or the snapshotDir.
   *
   * Clears:
   *  - Semantic cache in-memory LRU (semantic_cache SQLite table is not pre-populated
   *    with ping responses; LRU is what would accumulate across tests in a run).
   *  - Idempotency dedup store.
   *  - Inflight request-dedup map (concurrent-only, but belt-and-suspenders).
   *  - Settings read-cache so each call re-reads semanticCacheEnabled=false.
   */
  function resetCachesForTest(): void {
    semanticCacheModule.clearCache();
    clearIdempotency();
    clearInflight();
    invalidateDbCache("settings");
  }

  async function cleanup(): Promise<void> {
    BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelayMs;
    clearInflight();
    clearIdempotency();
    resetAllCircuitBreakers();
    core.resetDbInstance();
    // Destroy the snapshot — targets only the temp dir, NEVER /root/.omniroute.
    fs.rmSync(snapshotDir, { recursive: true, force: true });
  }

  // Populate the map eagerly so servedProvider (sync) works right after
  // listLiveConnections() is called.
  await _getConnMap();

  return {
    LIVE_ENABLED: true,
    BaseExecutor,
    handleChat,
    combosDb,
    originalRetryDelayMs,
    buildRequest,
    liveBody,
    listLiveConnections,
    comboModelFor,
    servedProvider,
    servedProviderFromBody,
    readCompletionText,
    resetCachesForTest,
    cleanup,
    // internal helpers exposed for advanced test use
    _servedProviderAsync: servedProviderAsync,
    _snapshotDir: snapshotDir,
  } as unknown as LiveHarnessEnabled;
}
