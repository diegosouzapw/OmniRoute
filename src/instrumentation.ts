/**
 * Next.js Instrumentation Hook
 *
 * Called once when the server starts (both dev and production).
 * Used to initialize graceful shutdown handlers, console log capture,
 * and compliance features (audit log table, expired log cleanup).
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

function getRandomBytes(byteLength: number): Uint8Array {
  const bytes = new Uint8Array(byteLength);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}

function toBase64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function ensureSecrets(): Promise<void> {
  let getPersistedSecret = (_key: string): string | null => null;
  let persistSecret = (_key: string, _value: string): void => {};

  try {
    ({ getPersistedSecret, persistSecret } = await import("@/lib/db/secrets"));
  } catch {
    // Non-fatal: fall back to process-local secrets if DB helpers are unavailable.
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

export async function register() {
  // Only run on the server (not during build or in Edge runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await ensureSecrets();
    // Console log file capture (must be first — before any logging occurs)
    const { initConsoleInterceptor } = await import("@/lib/consoleInterceptor");
    initConsoleInterceptor();

    const { initGracefulShutdown } = await import("@/lib/gracefulShutdown");
    initGracefulShutdown();

    const { initApiBridgeServer } = await import("@/lib/apiBridgeServer");
    initApiBridgeServer();

    // Quota cache: start background refresh for quota-aware account selection
    // Dynamic import required — quotaCache depends on better-sqlite3 (Node-only),
    // and instrumentation.ts is bundled for all runtimes including Edge.
    const { startBackgroundRefresh } = await import("@/domain/quotaCache");
    startBackgroundRefresh();
    console.log("[STARTUP] Quota cache background refresh started");

    // Model aliases: restore persisted custom aliases into in-memory state (#316)
    // Custom aliases are saved to settings.modelAliases on PUT /api/settings/model-aliases
    // but the in-memory _customAliases resets to {} on every restart — load them here.
    try {
      const { getSettings } = await import("@/lib/db/settings");
      const { setCustomAliases } = await import("@omniroute/open-sse/services/modelDeprecation.ts");
      const { setDefaultFastServiceTierEnabled } =
        await import("@omniroute/open-sse/executors/codex.ts");
      const settings = await getSettings();

      if (settings.modelAliases) {
        const aliases =
          typeof settings.modelAliases === "string"
            ? JSON.parse(settings.modelAliases)
            : settings.modelAliases;
        if (aliases && typeof aliases === "object") {
          setCustomAliases(aliases);
          console.log(
            `[STARTUP] Restored ${Object.keys(aliases).length} custom model alias(es) from settings`
          );
        }
      }

      const persisted =
        typeof settings.codexServiceTier === "string"
          ? JSON.parse(settings.codexServiceTier)
          : settings.codexServiceTier;

      if (typeof persisted?.enabled === "boolean") {
        setDefaultFastServiceTierEnabled(persisted.enabled);
        console.log(
          `[STARTUP] Restored Codex fast service tier: ${persisted.enabled ? "on" : "off"}`
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("[STARTUP] Could not restore runtime settings:", msg);
    }

    // Compliance: Initialize audit_log table + cleanup expired logs
    try {
      const { initAuditLog, cleanupExpiredLogs } = await import("@/lib/compliance/index");
      initAuditLog();
      console.log("[COMPLIANCE] Audit log table initialized");

      const cleanup = cleanupExpiredLogs();
      if (cleanup.deletedUsage || cleanup.deletedCallLogs || cleanup.deletedAuditLogs) {
        console.log("[COMPLIANCE] Expired log cleanup:", cleanup);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("[COMPLIANCE] Could not initialize audit log:", msg);
    }
  }
}
