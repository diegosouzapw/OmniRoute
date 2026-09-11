/**
 * Node.js-only instrumentation logic.
 *
 * Separated from instrumentation.ts so that Turbopack's Edge bundler
 * does not trace into Node.js-only modules (fs, path, os, better-sqlite3, etc.)
 * and emit spurious "not supported in Edge Runtime" warnings.
 */

import { markServerReady, markServerStarting } from "@/lib/serverLifecycle";
import { normalizeBootError } from "@/lib/instrumentationBootError";

function getRandomBytes(byteLength: number): Uint8Array {
  const bytes = new Uint8Array(byteLength);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}

function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCodePoint(...bytes));
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Rename a Node process title so OmniRoute is identifiable in `ps`/`htop`
 * instead of the generic Next.js standalone server name.
 *
 * Only rewrites titles that start with "next-server", preserving any
 * trailing suffix (e.g. " (v16.2.9)"). Every other title — including one
 * that has already been renamed, or one that merely contains
 * "next-server" elsewhere — passes through unchanged. Empty/undefined-safe.
 */
export function renameProcessTitle(currentTitle: string): string {
  if (!currentTitle) return currentTitle;
  if (!currentTitle.startsWith("next-server")) return currentTitle;
  return `omniroute${currentTitle.slice("next-server".length)}`;
}

// `normalizeBootError` now lives in `@/lib/instrumentationBootError` (imported
// above) — shared, dependency-free, and reused by `src/instrumentation.ts`'s
// outermost boot boundary (#10171) so both boot-failure logging sites agree
// on the same normalization instead of maintaining two copies of the same
// one-liner. Re-exported here so existing callers/tests importing it from
// this module keep working unchanged.
export { normalizeBootError };

// Matches sql.js's raw `throw "Database closed"` (and similarly-worded
// variants) thrown when a query runs against an already-closed WASM handle —
// typically a stale globalThis-cached adapter left over by a prior
// close/reload racing with this boot (#6560).
const TRANSIENT_DB_CLOSED_RE = /database\s*(connection\s*)?(is\s*)?closed/i;

/**
 * Initialize the SQLite singleton for boot, tolerating one transient
 * "database closed" failure (#6560) by retrying once — the driverFactory
 * cache-eviction fix (`preInitSqlJs`) makes the retry create a fresh adapter
 * instead of reusing the dead one. Any other failure (or a second consecutive
 * "database closed") is re-thrown as a real `Error` via `normalizeBootError`
 * so it can never crash instrumentation with a masking TypeError — the caller
 * (`registerNodejs`) still surfaces it as a real boot failure.
 *
 * `ensureDbInitializedFn` is only for tests to inject a fake without
 * module-mocking (`node:test` does not support `mock.module` reliably here).
 */
export async function ensureDbReadyForBoot(
  ensureDbInitializedFn?: () => Promise<void>
): Promise<void> {
  const ensureDbInitialized =
    ensureDbInitializedFn ?? (await import("@/lib/db/core")).ensureDbInitialized;

  try {
    await ensureDbInitialized();
  } catch (err: unknown) {
    const normalized = normalizeBootError(err);
    if (!TRANSIENT_DB_CLOSED_RE.test(normalized.message)) {
      // Fatal, non-transient boot-time DB init failure (e.g. the entire
      // better-sqlite3 -> node:sqlite -> sql.js driver cascade failed, as on
      // Termux/Android when no SQLite driver is usable). This runs BEFORE
      // initConsoleInterceptor() is wired up, so this is the only chance to
      // get the real root cause into stdout/app.log — without it, the
      // process keeps its HTTP listener up while every DB-touching route
      // 500s forever with a permanently empty log (#7773).
      console.error("[STARTUP] Fatal: Database driver initialization failed:", normalized.message);
      throw normalized;
    }
    console.warn(
      "[STARTUP] Database was closed by a prior reload/shutdown — retrying with a fresh connection (#6560):",
      normalized.message
    );
    try {
      await ensureDbInitialized();
    } catch (retryErr: unknown) {
      const normalizedRetryErr = normalizeBootError(retryErr);
      console.error(
        "[STARTUP] Fatal: Database driver initialization failed after retry:",
        normalizedRetryErr.message
      );
      throw normalizedRetryErr;
    }
  }
}

function isBackgroundServicesDisabled(): boolean {
  const raw = process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  if (!raw) return false;
  return new Set(["1", "true", "yes", "on"]).has(raw.trim().toLowerCase());
}

async function ensureSecrets(): Promise<void> {
  let getPersistedSecret = (_key: string): string | null => null;
  let persistSecret = (_key: string, _value: string): void => {};

  try {
    ({ getPersistedSecret, persistSecret } = await import("@/lib/db/secrets"));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(
      "[STARTUP] Secret persistence unavailable; falling back to process-local secrets:",
      msg
    );
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === "") {
    const persisted = getPersistedSecret("jwtSecret");
    if (persisted) {
      process.env.JWT_SECRET = persisted;
      console.log("[STARTUP] JWT_SECRET restored from persistent store");
    } else {
      const generated = toBase64(getRandomBytes(48));
      process.env.JWT_SECRET = generated;
      persistSecret("jwtSecret", generated);
      console.log("[STARTUP] JWT_SECRET auto-generated and persisted (random 64-char secret)");
    }
  }

  if (!process.env.API_KEY_SECRET || process.env.API_KEY_SECRET.trim() === "") {
    const persisted = getPersistedSecret("apiKeySecret");
    if (persisted) {
      process.env.API_KEY_SECRET = persisted;
    } else {
      const generated = toHex(getRandomBytes(32));
      process.env.API_KEY_SECRET = generated;
      persistSecret("apiKeySecret", generated);
      console.log(
        "[STARTUP] API_KEY_SECRET auto-generated and persisted (random 64-char hex secret)"
      );
    }
  }
}

/**
 * Warm the model catalog's durable, apiKey-independent sub-caches at startup
 * so real /v1/models traffic (any client, any API key) avoids paying their
 * cold-build cost on first use. Fire-and-forget from the caller, non-fatal.
 *
 * getUnifiedModelsResponse()'s own top-level Response cache (`catalogCache`
 * in catalog.ts) is keyed by prefix/isCodex/apiKey AND has only a 1.5s TTL
 * (CATALOG_CACHE_TTL_MS — a burst-dedup window added for #6408 to coalesce
 * concurrent SDK/dashboard requests, not a startup-warm cache). Warming that
 * cache with an unauthenticated dummy request has essentially no lasting
 * effect: real traffic almost never arrives within 1.5s of this warmup
 * completing, regardless of whether its cache key happens to match a real
 * client's apiKey. The one genuinely durable, apiKey-independent cost in the
 * catalog build is getOpenRouterCatalog()'s 24h disk-cached network fetch
 * (src/lib/catalog/openrouterCatalog.ts) — buildUnifiedModelsResponseCore()
 * calls it unconditionally whenever an OpenRouter connection is configured,
 * decoupled from the per-key Response cache entirely, so warming it directly
 * here benefits every subsequent /v1/models request regardless of that
 * request's own apiKey. Only fetched when an OpenRouter connection actually
 * exists, so deployments that never use OpenRouter don't pay an unconditional
 * third-party network call at every boot.
 *
 * Exported (rather than left inline in registerNodejs()) so it can be unit
 * tested directly without exercising the rest of the startup sequence.
 */
export async function warmModelCatalogCache(): Promise<void> {
  try {
    const { getUnifiedModelsResponse } = await import("@/app/api/v1/models/catalog");
    await getUnifiedModelsResponse(new Request("http://127.0.0.1/v1/models"));
    console.log("[STARTUP] Model catalog cache warmed");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[STARTUP] Model catalog warmup failed (non-fatal):", msg);
  }
  try {
    const [{ getProviderConnections }, { getOpenRouterCatalog }] = await Promise.all([
      import("@/lib/db/providers"),
      import("@/lib/catalog/openrouterCatalog"),
    ]);
    const openrouterConnections = await getProviderConnections({
      provider: "openrouter",
      isActive: true,
    });
    if (openrouterConnections.length > 0) {
      await getOpenRouterCatalog();
      console.log("[STARTUP] OpenRouter model catalog cache warmed");
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[STARTUP] OpenRouter catalog warmup failed (non-fatal):", msg);
  }
}

/**
 * #8530: enumerate existing combos whose name shadows a real model id and
 * log a startup warning. Never rejects/throws — #6940 documents a combo
 * named after a bare model id as the supported mechanism for per-model
 * provider fallback, so a collision here is expected in some deployments;
 * this only gives operators who hit it accidentally a signal.
 *
 * Exported (rather than left inline in registerNodejs()) so it can be unit
 * tested directly without exercising the rest of the startup sequence.
 */
export async function scanComboModelNameCollisionsAtBoot(): Promise<void> {
  try {
    const [{ getCombos }, { scanCombosForModelCollisions }] = await Promise.all([
      import("@/lib/db/combos"),
      import("@/lib/combos/modelNameCollision"),
    ]);
    const collisions = scanCombosForModelCollisions(await getCombos());
    if (collisions.length > 0) {
      console.warn(
        `[STARTUP] ${collisions.length} combo(s) share a name with a real model id (#8530) — ` +
          "intentional per #6940 bare-model-id fallback, but confirm each is expected: " +
          collisions.map((c) => `${c.comboName}→${c.providerId}/${c.modelId}`).join(", ")
      );
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[STARTUP] Could not scan combos for model-name collisions (non-fatal):", msg);
  }
}

/**
 * #9654 U7: fold a dashboard DB toggle for the adaptive virtual-lanes flag into
 * the process-global admission runtime's env at boot. Env-wins: no-op when the
 * operator's OMNIROUTE_CHAT_VIRTUAL_LANES env var is set (the lazy runtime
 * already reads process.env correctly). The runtime reads env only at
 * construction, so this must run before the first request touches it — hence
 * awaited here, after ensureDbReadyForBoot(). Non-fatal.
 *
 * Exported (rather than inline in registerNodejs()) so it can be unit tested
 * directly without exercising the rest of the startup sequence.
 */
export async function warmAdaptiveVirtualLanesIntoRuntime(): Promise<void> {
  try {
    const { warmAdaptiveVirtualLanesIntoRuntime: warm } =
      await import("@/lib/admissionVirtualLanes");
    const materialized = await warm();
    if (materialized) {
      console.log(
        "[STARTUP] Adaptive virtual lanes flag materialized from dashboard override (#9654)"
      );
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[STARTUP] Could not warm adaptive virtual lanes flag (non-fatal):", msg);
  }
}

/**
 * Register bespoke + generic quota fetchers once at Node.js boot. The legacy
 * `src/sse/handlers/chat.ts` path registered these at module load, but the
 * Next.js App Router production entry (`registerNodejs`) never did, leaving
 * `quotaFetcherRegistry` empty for generic providers (antigravity, claude,
 * etc.) and causing reset-aware scoring to fall back to the 0.5 dead score.
 *
 * Each registration call is idempotent; bespoke fetchers are registered first
 * so the generic registrar skips providers that already have a dedicated
 * fetcher.
 */
export async function registerQuotaFetchers(): Promise<void> {
  // Side-effect registrations for agentrouter, freeModel, grokCli, xaiOauth,
  // firecrawl (same ordering as the legacy chat.ts path).
  await import("@omniroute/open-sse/services/quotaTrackersBatch.ts");

  const [
    { registerCodexQuotaFetcher },
    { registerBailianCodingPlanQuotaFetcher },
    { registerQwenTokenPlanQuotaFetcher },
    { registerCrofUsageFetcher },
    { registerDeepseekQuotaFetcher },
    { registerMoonshotQuotaFetcher, registerMoonshotFetchersForNodes },
    { registerOpenrouterQuotaFetcher },
    { registerOpencodeQuotaFetcher },
    { registerGrokWebQuotaFetcher },
    { registerGenericQuotaFetchers },
  ] = await Promise.all([
    import("@omniroute/open-sse/services/codexQuotaFetcher"),
    import("@omniroute/open-sse/services/bailianQuotaFetcher"),
    import("@omniroute/open-sse/services/qwenTokenPlanQuotaFetcher"),
    import("@omniroute/open-sse/services/crofUsageFetcher"),
    import("@omniroute/open-sse/services/deepseekQuotaFetcher"),
    import("@omniroute/open-sse/services/moonshotQuotaFetcher"),
    import("@omniroute/open-sse/services/openrouterQuotaFetcher"),
    import("@omniroute/open-sse/services/opencodeQuotaFetcher"),
    import("@omniroute/open-sse/services/grokQuotaFetcher"),
    import("@omniroute/open-sse/services/genericQuotaFetcher"),
  ]);

  registerCodexQuotaFetcher();
  registerBailianCodingPlanQuotaFetcher();
  registerQwenTokenPlanQuotaFetcher();
  registerCrofUsageFetcher();
  registerDeepseekQuotaFetcher();
  registerMoonshotQuotaFetcher();
  try {
    const { getProviderNodes } = await import("@/lib/db/providers");
    const nodes = await getProviderNodes();
    registerMoonshotFetchersForNodes(
      (Array.isArray(nodes) ? nodes : []).map((node) => ({
        id: typeof node.id === "string" ? node.id : null,
        prefix: typeof node.prefix === "string" ? node.prefix : null,
        baseUrl: typeof node.baseUrl === "string" ? node.baseUrl : null,
      })),
    );
  } catch (error) {
    console.warn("[STARTUP] Moonshot custom-node fetcher scan skipped:", error);
  }
  registerOpenrouterQuotaFetcher();
  registerOpencodeQuotaFetcher();
  registerGrokWebQuotaFetcher();
  registerGenericQuotaFetchers();

  console.log("[STARTUP] Quota fetchers registered");
}

export async function registerNodejs(): Promise<void> {
  markServerStarting();

  // Rename the process title so OmniRoute is identifiable in ps/htop instead
  // of the generic "next-server" standalone server name.
  process.title = renameProcessTitle(process.title);

  // Initialize proxy fetch patch FIRST (before any HTTP requests)
  await import("@omniroute/open-sse/utils/proxyFetch.ts");
  console.log("[STARTUP] Global fetch proxy patch initialized");

  // Register quota fetchers early so combo routing can use real quota-aware
  // scoring for generic providers in the App Router production runtime.
  await registerQuotaFetchers();

  // Guarantee the SQLite singleton — including a sql.js WASM pre-init when
  // both synchronous drivers (better-sqlite3, node:sqlite) are unavailable —
  // is ready before ANY other startup step reaches getDbInstance(). This
  // MUST run before ensureSecrets, clearStaleCrashCooldowns,
  // getSettings, initAuditLog below: those all reach getDbInstance()
  // transitively, and used to run ahead of this call (previously at the end
  // of this function), throwing the misleading "sql.js WASM ainda não foi
  // pré-inicializado" error for an existing DB file when both sync drivers
  // failed (#7288 / #7494). ensureDbInitialized() itself is idempotent and
  // caches the singleton, so every later getDbInstance() call below is a
  // free no-op re-read of the same connection — no double-init cost.
  await ensureDbReadyForBoot();

  await ensureSecrets();
  await Promise.all([
    import("@/lib/env/runtimeEnv").then(({ enforceWebRuntimeEnv }) => enforceWebRuntimeEnv()),
    import("@/lib/usage/migrations"),
    import("@/lib/consoleInterceptor").then(({ initConsoleInterceptor }) =>
      initConsoleInterceptor()
    ),
  ]);

  // Clear stale transient connection cooldowns persisted from an unclean crash.
  // A crash mid-burst can leave far-future `rate_limited_until` values in the DB
  // that cause every connection to be skipped by getProviderCredentials(), making
  // all subsequent requests time out at Bottleneck's maxWaitMs (120 s default).
  // Terminal states (banned / expired / credits_exhausted) are intentionally kept.
  // See: https://github.com/diegosouzapw/OmniRoute/issues/3625 (Part A)
  try {
    const { clearStaleCrashCooldowns } = await import("@/lib/db/providers");
    const { cleared } = clearStaleCrashCooldowns();
    if (cleared > 0) {
      console.log(
        `[STARTUP] Cleared ${cleared} stale transient connection cooldown(s) from prior crash (#3625)`
      );
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[STARTUP] Could not clear stale crash cooldowns (non-fatal):", msg);
  }

  await scanComboModelNameCollisionsAtBoot();
  await warmAdaptiveVirtualLanesIntoRuntime();

  const [
    { initGracefulShutdown },
    { initApiBridgeServer },
    { startBackgroundRefresh },
    { ensureCloudSyncInitialized },
    { startProviderLimitsSyncScheduler },
    { getSettings },
    { applyRuntimeSettings },
    { startRuntimeConfigHotReload },
    { startSpendBatchWriter },
    { startCleanupScheduler },
    { registerDefaultGuardrails },
    { ensurePersistentManagementPasswordHash },
    { skillExecutor },
    { registerBuiltinSkills },
  ] = await Promise.all([
    import("@/lib/gracefulShutdown"),
    import("@/lib/apiBridgeServer"),
    import("@/domain/quotaCache"),
    import("@/lib/initCloudSync"),
    import("@/shared/services/providerLimitsSyncScheduler"),
    import("@/lib/db/settings"),
    import("@/lib/config/runtimeSettings"),
    import("@/lib/config/hotReload"),
    import("@/lib/spend/batchWriter"),
    import("@/lib/db/cleanup"),
    import("@/lib/guardrails"),
    import("@/lib/auth/managementPassword"),
    import("@/lib/skills/executor"),
    import("@/lib/skills/builtins"),
  ]);

  // Proxy health scheduler (auto-removes dead proxies on interval)
  await import("@/lib/proxyHealth/scheduler");

  // Free-proxy auto-sync scheduler (re-fetches free-proxy sources on interval, #7079)
  await import("@/lib/freeProxyProviders/scheduler");

  initGracefulShutdown();
  initApiBridgeServer();
  startSpendBatchWriter();
  registerDefaultGuardrails();
  registerBuiltinSkills(skillExecutor);
  console.log("[STARTUP] Spend batch writer started");
  console.log("[STARTUP] Guardrail registry initialized");
  console.log("[STARTUP] Builtin skill handlers registered");
  if (!isBackgroundServicesDisabled()) {
    startBackgroundRefresh();
    console.log("[STARTUP] Quota cache background refresh started");
    startProviderLimitsSyncScheduler();
    console.log("[STARTUP] Provider limits sync scheduler started");
    const { startQuotaAutoPing } = await import("@/lib/services/quotaAutoPing");
    startQuotaAutoPing();
    console.log("[STARTUP] Quota auto-ping scheduler started (opt-in, no-op until enabled)");
    const cloudSyncInitialized = await ensureCloudSyncInitialized();
    console.log(
      `[STARTUP] Cloud/model sync background bootstrap ${cloudSyncInitialized ? "initialized" : "skipped"}`
    );
    const { initBatchProcessor } = await import("@omniroute/open-sse/services/batchProcessor");
    initBatchProcessor();
    console.log("[STARTUP] Batch processor started");
  }

  try {
    const [
      { migrateCodexConnectionDefaultsFromLegacySettings },
      { startSessionAccountAffinityCleanup },
      { seedDefaultModelAliases },
    ] = await Promise.all([
      import("@/lib/providers/codexConnectionDefaults"),
      import("@/lib/db/sessionAccountAffinity"),
      import("@/lib/modelAliasSeed"),
    ]);
    let settings = await getSettings();
    const passwordState = await ensurePersistentManagementPasswordHash({
      logger: console,
      settings,
      source: "startup",
    });
    settings = passwordState.settings;
    const runtimeChanges = await applyRuntimeSettings(settings, { force: true, source: "startup" });
    if (runtimeChanges.length > 0) {
      console.log(
        `[STARTUP] Runtime settings hydrated: ${runtimeChanges
          .map((entry) => entry.section)
          .join(", ")}`
      );
    }

    // Restore Global System Prompt into in-memory config (#2468/#2470)
    if (settings.systemPrompt) {
      const { setSystemPromptConfig } =
        await import("@omniroute/open-sse/services/systemPrompt.ts");
      setSystemPromptConfig(settings.systemPrompt);
      console.log("[STARTUP] Global System Prompt restored from settings");
    }

    // Restore the proxy-level Thinking-Budget config (#5312 RC-A). It lives in
    // `settings.thinkingBudget` and is NOT covered by applyRuntimeSettings, so
    // without this the dashboard mode (auto/custom/adaptive) silently reverts to
    // the passthrough default on every restart. Previously this was only wired into
    // the unused `server-init.ts`, so it never ran in production.
    const { hydrateThinkingBudgetConfig } =
      await import("@omniroute/open-sse/services/thinkingBudget.ts");
    if (hydrateThinkingBudgetConfig(settings)) {
      console.log("[STARTUP] Thinking-Budget config restored from settings");
    }

    // Restore the Task-Aware Smart Routing config (#8601). It lives in
    // `settings.taskRouting` (written as a JSON string by PUT /api/settings/task-routing)
    // and is NOT covered by applyRuntimeSettings, so without this the feature silently
    // reverts to disabled + the default model map on every restart. Same shape as the
    // Thinking-Budget restore above; must live here, not in the unused server-init.ts.
    const { hydrateTaskRoutingConfig } =
      await import("@omniroute/open-sse/services/taskAwareRouter.ts");
    if (hydrateTaskRoutingConfig(settings)) {
      console.log("[STARTUP] Task-Aware Routing config restored from settings");
    }

    const seededModelAliases = await seedDefaultModelAliases();
    console.log(
      `[STARTUP] Model alias seed: applied=${seededModelAliases.applied.length}, skipped=${seededModelAliases.skipped.length}, removed=${seededModelAliases.removed.length}, failed=${seededModelAliases.failed.length}`
    );
    startSessionAccountAffinityCleanup();

    const migration = await migrateCodexConnectionDefaultsFromLegacySettings();
    if (migration.migrated) {
      console.log(
        `[STARTUP] Migrated Codex connection defaults for ${migration.updatedConnectionIds.length} connection(s)`
      );
      if (settings.cloudEnabled === true) {
        const [{ syncToCloud }, { getConsistentMachineId }] = await Promise.all([
          import("@/lib/cloudSync"),
          import("@/shared/utils/machineId"),
        ]);
        const machineId = await getConsistentMachineId();
        await syncToCloud(machineId);
        console.log("[STARTUP] Synced migrated Codex connection defaults to cloud");
      }
    }

    startRuntimeConfigHotReload();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[STARTUP] Could not restore runtime settings:", msg);
  }

  // Proactively start the credential-health sweep at boot so stale web-session
  // connections (cookies that expired overnight) get re-probed and recovered on
  // startup — instead of staying red until the first real request lazily imports
  // the on-demand credentialGate. Idempotent; self-disables via
  // OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK and its cadence is tunable via
  // CREDENTIAL_HEALTH_CHECK_INTERVAL. NOTE: this MUST live here (the real Next.js
  // instrumentation startup), NOT in the unused src/server-init.ts.
  try {
    const { initCredentialHealthCheck } = await import("@/lib/credentialHealth/scheduler");
    const started = initCredentialHealthCheck();
    console.log(
      started
        ? "[STARTUP] Credential health scheduler started"
        : "[STARTUP] Credential health scheduler disabled"
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[STARTUP] Could not start credential health scheduler:", msg);
  }

  try {
    const { initAuditLog, cleanupExpiredLogs } = await import("@/lib/compliance/index");
    initAuditLog();
    console.log("[COMPLIANCE] Audit log table initialized");

    const cleanup = await cleanupExpiredLogs();
    if (
      cleanup.deletedUsage ||
      cleanup.deletedCallLogs ||
      cleanup.deletedProxyLogs ||
      cleanup.deletedRequestDetailLogs ||
      cleanup.deletedAuditLogs ||
      cleanup.deletedMcpAuditLogs
    ) {
      console.log("[COMPLIANCE] Expired log cleanup:", cleanup);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[COMPLIANCE] Could not initialize audit log:", msg);
  }

  // Storage-configured scheduled VACUUM (#4437): registers the timer from
  // Settings > System & Storage and persists lastVacuumAt for the UI.
  try {
    const { initVacuumScheduler } = await import("@/lib/db/vacuumScheduler");
    initVacuumScheduler();
    console.log("[STARTUP] Scheduled VACUUM initialized (#4437)");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[STARTUP] Could not initialize vacuum scheduler (non-fatal):", msg);
  }

  // Retention cleanup scheduler (#4691/#6988, #9624): runs the general retention
  // cleanup once after startup and then every 6 hours. Previously this was only
  // wired into the unused src/server-init.ts, so telemetry tables grew unboundedly
  // even with retention.autoCleanupEnabled=true. Idempotent (guarded internally).
  try {
    startCleanupScheduler();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[STARTUP] Could not start cleanup scheduler (non-fatal):", msg);
  }

  // Warm the model catalog's durable, apiKey-independent sub-caches at
  // startup — see warmModelCatalogCache() for why the top-level Response
  // cache alone doesn't deliver this. Fire-and-forget, non-fatal.
  void warmModelCatalogCache();

  if (!isBackgroundServicesDisabled()) {
    // All services are independent — run in parallel for faster cold start.
    await Promise.allSettled([
      import("@/lib/services/bootstrap")
        .then(async (m) => {
          await m.bootstrapEmbeddedServices();
          console.log("[STARTUP] Embedded services bootstrap complete");
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] Embedded services bootstrap failed (non-fatal):", msg);
        }),

      import("@/lib/services/embedWsProxy")
        .then((m) => m.initEmbedWsProxy())
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] Embed WS proxy failed to start (non-fatal):", msg);
        }),

      import("@omniroute/open-sse/services/autoRefreshDaemon")
        .then((m) => m.autoRefreshDaemon.start())
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] Auto-refresh daemon failed to start (non-fatal):", msg);
        }),

      // Conductor bridge (PRD Conductor RF1): mirrors OmniConductor hub tasks into the
      // A2A TaskManager via the hub SSE. Opt-in — self-gated on CONDUCTOR_HUB_URL.
      import("@/lib/conductor/boot").then((m) => {
        if (m.initConductorBridge()) console.log("[STARTUP] Conductor bridge started");
      }).catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn("[STARTUP] Conductor bridge failed to start (non-fatal):", msg);
      }),

      // Proactive connection-cooldown recovery (#8): re-validate connections whose
      // transient `rate_limited_until` window has elapsed OUTSIDE the request hot path,
      // so the first request after a cooldown does not pay the probe latency.
      import("@/lib/quota/connectionRecovery")
        .then((m) => m.initConnectionRecoveryScheduler())
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] Connection recovery scheduler failed to start (non-fatal):", msg);
        }),

      // Arena ELO sync: model intelligence from the Arena AI leaderboard, powering the
      // Free Provider Rankings page. On by default; non-blocking, never fatal.
      import("@/lib/arenaEloSync")
        .then(async (m) => {
          const started = await m.initArenaEloSync();
          if (started) console.log("[STARTUP] Arena ELO sync initialized");
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] Arena ELO sync failed to start (non-fatal):", msg);
        }),

      // Radar daily feed sync: only arms itself when RADAR_ENABLED AND the user
      // opt-in are already on (flag-off boot stays timer-free — Radar inertia
      // contract). Non-blocking, never fatal.
      import("@/lib/radar/scheduler")
        .then((m) => {
          const started = m.initRadarSyncScheduler();
          if (started) console.log("[STARTUP] Radar sync scheduler initialized");
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] Radar sync scheduler failed to start (non-fatal):", msg);
        }),

      // Pricing sync: opt-in external pricing data (self-gated by PRICING_SYNC_ENABLED inside
      // initPricingSync). Non-blocking, never fatal.
      import("@/lib/pricingSync")
        .then((m) => m.initPricingSync())
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] Pricing sync failed to start (non-fatal):", msg);
        }),

      // OpenRouter provider stats sync: provider directory + popularity enrichment
      // for the dashboard Providers page. On by default; opt out with
      // OPENROUTER_PROVIDER_STATS_ENABLED=false. Non-blocking, never fatal.
      import("@/lib/catalog/openrouterProviderStats")
        .then((m) => {
          const started = m.initOpenRouterProviderStatsSync();
          if (started) console.log("[STARTUP] OpenRouter provider stats sync initialized");
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn(
            "[STARTUP] OpenRouter provider stats sync failed to start (non-fatal):",
            msg
          );
        }),

      // models.dev capability sync: opt-in via Settings > AI (self-gated by
      // settings.modelsDevSyncEnabled inside initModelsDevSync). Non-blocking, never fatal.
      import("@/lib/modelsDevSync")
        .then((m) => m.initModelsDevSync())
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] models.dev sync failed to start (non-fatal):", msg);
        }),

      // Context-window self-correction (5004): periodically reconcile provider-declared
      // windows (from /models discovery) into auto:discovery overrides. Never fatal.
      import("@/lib/contextWindowResolver")
        .then((m) => m.startContextWindowReconcile())
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] context-window reconcile failed to start (non-fatal):", msg);
        }),

      // TV6 typed memory decay: optional periodic sweep of decayed episodic memories.
      // Doubly opt-in (no-op unless MEMORY_TYPED_DECAY_ENABLED=true AND
      // MEMORY_TYPED_DECAY_SWEEP_INTERVAL>0). Never deletes by default. Never fatal.
      import("@/lib/memory/typedDecay")
        .then((m) => m.startMemoryDecaySweep())
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] memory decay sweep failed to start (non-fatal):", msg);
        }),

      // MemoryBackend provider pattern (PR #8752): initialize configured memory
      // backends from settings (sqlite, obsidian, notion, custom HTTP, etc.).
      // Reads the DB settings synchronously (non-blocking, never fatal). Must
      // run after the DB is ready AND after getSettings/applyRuntimeSettings so
      // memory backend config is hydrated.
      import("@/lib/memory/index")
        .then((m) => m.initMemoryBackends())
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] memory backend initialization failed (non-fatal):", msg);
        }),

      // Backup schedule (#8513): execute `backup-schedule.json` cron server-side.
      // Reads the schedule written by `omniroute backup auto enable` and fires
      // `runBackupCommand` when the cron expression matches. Self-gated: no-op
      // when no schedule file exists or the schedule is disabled. Never fatal.
      import("@/lib/jobs/backupScheduleJob")
        .then((m) => m.startBackupScheduleJob())
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[STARTUP] backup schedule job failed to start (non-fatal):", msg);
        }),

      // Real-time dashboard WebSocket daemon (port 20132): powers Combo Studio Live,
      // the Home live-pulse, and Live Compression. Side-effect import triggers the
      // flag-gated auto-start (OMNIROUTE_ENABLE_LIVE_WS, default ON).
      import("@/server/ws/liveServer")
        .then(() => {
          console.log("[STARTUP] Live dashboard WebSocket daemon bootstrap invoked");
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn(
            "[STARTUP] Live dashboard WebSocket daemon failed to start (non-fatal):",
            msg
          );
        }),
    ]);
  }

  markServerReady();
}
