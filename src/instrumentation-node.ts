/**
 * Node.js-only instrumentation logic.
 *
 * Separated from instrumentation.ts so that Turbopack's Edge bundler
 * does not trace into Node.js-only modules (fs, path, os, better-sqlite3, etc.)
 * and emit spurious "not supported in Edge Runtime" warnings.
 */

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

export async function registerNodejs(): Promise<void> {
  // Initialize proxy fetch patch FIRST (before any HTTP requests)
  await import("@omniroute/open-sse/index.ts");
  console.log("[STARTUP] Global fetch proxy patch initialized");

  await ensureSecrets();
  const { enforceWebRuntimeEnv } = await import("@/lib/env/runtimeEnv");
  enforceWebRuntimeEnv();

  // Trigger request-log layout migration during startup, before any request hits usageDb.
  await import("@/lib/usage/migrations");

  const { initConsoleInterceptor } = await import("@/lib/consoleInterceptor");
  initConsoleInterceptor();

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
    import("@/lib/guardrails"),
    import("@/lib/auth/managementPassword"),
    import("@/lib/skills/executor"),
    import("@/lib/skills/builtins"),
  ]);

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

    const seededModelAliases = await seedDefaultModelAliases();
    console.log(
      `[STARTUP] Model alias seed: applied=${seededModelAliases.applied.length}, skipped=${seededModelAliases.skipped.length}, failed=${seededModelAliases.failed.length}`
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

  await import("@/lib/db/core").then(({ ensureDbInitialized }) => ensureDbInitialized());

  if (!isBackgroundServicesDisabled()) {
    try {
      const { bootstrapEmbeddedServices } = await import("@/lib/services/bootstrap");
      await bootstrapEmbeddedServices();
      console.log("[STARTUP] Embedded services bootstrap complete");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("[STARTUP] Embedded services bootstrap failed (non-fatal):", msg);
    }

    try {
      const { initEmbedWsProxy } = await import("@/lib/services/embedWsProxy");
      initEmbedWsProxy();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("[STARTUP] Embed WS proxy failed to start (non-fatal):", msg);
    }

    try {
      const { autoRefreshDaemon } = await import("@omniroute/open-sse/services/autoRefreshDaemon");
      autoRefreshDaemon.start();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("[STARTUP] Auto-refresh daemon failed to start (non-fatal):", msg);
    }

    // Arena ELO sync: model intelligence from the Arena AI leaderboard, powering the
    // Free Provider Rankings page. On by default (opt out with ARENA_ELO_SYNC_ENABLED=false).
    // Non-blocking — the initial sync is fire-and-forget and never fatal.
    if (process.env.ARENA_ELO_SYNC_ENABLED !== "false") {
      try {
        const { initArenaEloSync } = await import("@/lib/arenaEloSync");
        await initArenaEloSync();
        console.log("[STARTUP] Arena ELO sync initialized");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn("[STARTUP] Arena ELO sync failed to start (non-fatal):", msg);
      }
    }

    // Pricing sync: opt-in external pricing data (self-gated by PRICING_SYNC_ENABLED inside
    // initPricingSync). Was only wired into the unused server-init.ts, so it never ran in the
    // standalone runtime even when enabled. Non-blocking, never fatal.
    try {
      const { initPricingSync } = await import("@/lib/pricingSync");
      await initPricingSync();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("[STARTUP] Pricing sync failed to start (non-fatal):", msg);
    }

    // models.dev capability sync: opt-in via Settings > AI (self-gated by
    // settings.modelsDevSyncEnabled inside initModelsDevSync). Previously had no caller at all,
    // so the toggle was inert. Non-blocking, never fatal.
    try {
      const { initModelsDevSync } = await import("@/lib/modelsDevSync");
      await initModelsDevSync();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("[STARTUP] models.dev sync failed to start (non-fatal):", msg);
    }
  }
}
