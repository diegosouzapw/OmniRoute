import { define, type PluginContext } from "@opencode-ai/plugin/v2/promise";
import {
  optionalTierFingerprint,
  catalogContentFingerprint,
  createLogger,
  defaultOmniRouteAutoCombosFetcher,
  defaultOmniRouteCombosFetcher,
  defaultOmniRouteEnrichmentFetcher,
  defaultOmniRouteModelsFetcher,
  defaultOmniRouteProvidersFetcher,
  type OmniRouteEnrichmentMap,
  type OmniRouteProviderConnection,
} from "./shared/index.js";
import type {
  OmniRouteRawAutoCombo,
  OmniRouteRawCombo,
  OmniRouteRawModelEntry,
} from "./shared/index.js";
import type { ResolvedOptions } from "./catalog.js";
import { publishCatalog } from "./catalog.js";
import {
  DEFAULT_MODEL_CACHE_TTL_MS,
  UNREACHABLE_COOLDOWN_MS,
  memoryCacheKey,
  readDiskSnapshot,
  snapshotIdentityFingerprint,
  writeDiskSnapshot,
  type CatalogSnapshot,
} from "./cache.js";
import { assertContext } from "./compat.js";
import { type ApiKeyOrigin, resolveApiKey, warnIfMissing } from "./credentials.js";
import { createSourceErrorReporter } from "./enrichment-report.js";
import { sanitizeToolSchemasFor } from "./gemini-language.js";
import { PLUGIN_ID, parsePluginOptions, resolveTimeouts, type PluginOptions } from "./options.js";

/**
 * A fetch result that says whether it succeeded. Returning a bare `[]` on
 * failure makes an outage indistinguishable from a gateway that legitimately
 * has no combos — and the difference decides whether the last known value
 * should be kept or dropped.
 */
type SourceResult<T> = { ok: true; value: T } | { ok: false };

interface RefreshState {
  entries: Map<string, CatalogSnapshot>;
  inFlight: Map<string, Promise<CatalogSnapshot>>;
  fingerprint: string | undefined;
  /** Digest of the optional tier, so a reload only follows a real change. */
  optionalFingerprint: string | undefined;
  /**
   * When the last refresh found the gateway unreachable, skip the network
   * until this timestamp and serve last-known-good instead. Without it every
   * transform past TTL re-fires the full fetch suite against a gateway that
   * just proved it cannot answer — a self-inflicted retry storm.
   */
  unreachableUntil: number;
}

function toResolvedOptions(parsed: PluginOptions): ResolvedOptions {
  return {
    providerId: parsed.providerId,
    baseURL: parsed.baseURL,
    apiKey: parsed.apiKey ?? process.env.OMNIROUTE_API_KEY ?? "",
    managementReadToken: parsed.managementReadToken,
    timeoutMs: parsed.timeoutMs,
    timeouts: parsed.timeouts,
    logLevel: parsed.logLevel,
    startupDebug: parsed.startupDebug,
    providerTag: parsed.providerTag,
    modelCacheTtlMs:
      typeof parsed.modelCacheTtlMs === "number" && parsed.modelCacheTtlMs > 0
        ? parsed.modelCacheTtlMs
        : DEFAULT_MODEL_CACHE_TTL_MS,
    displayName: parsed.displayName,
    apiFormat: parsed.apiFormat,
    visibleModels: parsed.visibleModels,
    hiddenModels: parsed.hiddenModels,
    usableOnly: parsed.usableOnly,
    enrichment: parsed.enrichment,
  };
}

export default define({
  id: PLUGIN_ID,
  setup: async (ctx: PluginContext) => {
    assertContext(ctx);
    const parsed = parsePluginOptions(ctx.options);
    const X = parsed.providerId;
    const resolved = toResolvedOptions(parsed);
    const timeouts = resolveTimeouts(parsed);
    const log = createLogger(parsed.startupDebug ? "debug" : (parsed.logLevel ?? "warn"));
    resolved.logger = log;
    resolved.logLevel = parsed.logLevel;
    resolved.startupDebug = parsed.startupDebug;
    log.info(`[omniroute-v2] init providerId=${X}`);

    // v1 parity port: in-memory TTL + disk snapshot. The memory key
    // `baseURL::sha256(creds)` isolates credential tuples (prod vs
    // staging); the TTL is checked in the transform before any fetch;
    // concurrent calls share the refresh promise in the setup closure keyed
    // by (providerId, baseURL); the disk snapshot feeds warm-startup and
    // the offline fallback. The existing in-memory keep-last-good is kept.
    const state: RefreshState = {
      entries: new Map(),
      inFlight: new Map(),
      fingerprint: undefined,
      optionalFingerprint: undefined,
      unreachableUntil: 0,
    };

    // The credential the host holds wins over one written in config, so a
    // user who connected the integration from the UI never has to paste a
    // key into `opencode.json`. Reading it is async and the transforms must
    // register synchronously, so the lookup happens on the first publish;
    // until then the option/env key resolved above stands in.
    const credentialsOf = (): { cacheKey: string; identityFingerprint: string } => ({
      cacheKey: memoryCacheKey(
        resolved.baseURL,
        `${resolved.apiKey}\0${resolved.managementReadToken ?? resolved.apiKey}`
      ),
      identityFingerprint: snapshotIdentityFingerprint(
        resolved.baseURL,
        resolved.apiKey,
        resolved.managementReadToken ?? resolved.apiKey
      ),
    });
    let { cacheKey, identityFingerprint } = credentialsOf();

    // Both keys are derived from the credential: two credentials must never
    // share a snapshot, so they are recomputed whenever the key moves.
    let credentialChecked = false;
    let apiKeyOrigin: ApiKeyOrigin = resolved.apiKey.length > 0 ? "option" : "missing";
    const ensureCredential = async (): Promise<void> => {
      // Settled once a key is in hand: re-reading on every refresh would let
      // a mid-session change silently repoint the snapshot keys.
      if (credentialChecked && apiKeyOrigin !== "missing") return;
      const next = await resolveApiKey(ctx, X, parsed.apiKey, log);
      const moved = next.key !== resolved.apiKey;
      resolved.apiKey = next.key;
      apiKeyOrigin = next.origin;
      if (moved) ({ cacheKey, identityFingerprint } = credentialsOf());
      if (!credentialChecked) warnIfMissing(next, X, log);
      else if (moved) log.info(`[omniroute-v2] API key picked up from the ${next.origin} source`);
      credentialChecked = true;
    };

    const fetchModelsSafe = async (): Promise<OmniRouteRawModelEntry[]> => {
      try {
        return await defaultOmniRouteModelsFetcher(
          resolved.baseURL,
          resolved.apiKey,
          timeouts.models
        );
      } catch (err) {
        log.warn(
          `[omniroute-v2] models fetch failed, publishing empty catalog: ${err instanceof Error ? err.message : String(err)}`
        );
        return [];
      }
    };
    // Failures are reported once per endpoint (with the management-token hint
    // when the inference key stands in), so a gated `/api/*` degrades loudly
    // rather than silently. Declared before the wrappers that use it.
    const reportSourceError = createSourceErrorReporter(
      log,
      resolved.managementReadToken === undefined
    );
    const fetchCombosSafe = async (): Promise<SourceResult<OmniRouteRawCombo[]>> => {
      try {
        return {
          ok: true,
          value: await defaultOmniRouteCombosFetcher(
            resolved.baseURL,
            resolved.managementReadToken ?? resolved.apiKey,
            timeouts.combos
          ),
        };
      } catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        reportSourceError("/api/combos", reason);
        log.warn(`[omniroute-v2] combos fetch failed, keeping the last known combos: ${reason}`);
        return { ok: false };
      }
    };
    // Providers connections follow the same rule: gated on usableOnly (no
    // request when false, v1 parity), soft-fail to [] so the filter degrades
    // to keep-all instead of hiding the catalog.
    const fetchProvidersSafe = async (): Promise<SourceResult<OmniRouteProviderConnection[]>> => {
      if (!resolved.usableOnly) return { ok: true, value: [] };
      try {
        return {
          ok: true,
          value: await defaultOmniRouteProvidersFetcher(
            resolved.baseURL,
            resolved.managementReadToken ?? resolved.apiKey,
            timeouts.models,
            reportSourceError
          ),
        };
      } catch (err) {
        log.warn(
          `[omniroute-v2] providers fetch failed, keeping the last known provider list: ${err instanceof Error ? err.message : String(err)}`
        );
        return { ok: false };
      }
    };
    // Enrichment follows the same rule: gated on the option (default on,
    // v1 parity), soft-fail to an empty map so names/pricing degrade to
    // mapper defaults instead of hiding the catalog.
    const fetchEnrichmentSafe = async (): Promise<SourceResult<OmniRouteEnrichmentMap>> => {
      if (resolved.enrichment === false) return { ok: true, value: new Map() };
      try {
        return {
          ok: true,
          value: await defaultOmniRouteEnrichmentFetcher(
            resolved.baseURL,
            resolved.managementReadToken ?? resolved.apiKey,
            timeouts.enrichment,
            reportSourceError
          ),
        };
      } catch (err) {
        log.warn(
          `[omniroute-v2] enrichment fetch failed, keeping the last known names/pricing: ${err instanceof Error ? err.message : String(err)}`
        );
        return { ok: false };
      }
    };
    const fetchAutoCombosSafe = async (): Promise<SourceResult<OmniRouteRawAutoCombo[]>> => {
      try {
        return {
          ok: true,
          value: await defaultOmniRouteAutoCombosFetcher(
            resolved.baseURL,
            resolved.managementReadToken ?? resolved.apiKey,
            timeouts.autoCombos,
            log,
            reportSourceError
          ),
        };
      } catch (err) {
        // The default fetcher reports the refusal itself (with the
        // management-token hint); this warn is the fallback for injected
        // stubs that throw without reporting.
        const reason = err instanceof Error ? err.message : String(err);
        log.warn(`[omniroute-v2] auto combos fetch failed, keeping the last known ones: ${reason}`);
        return { ok: false };
      }
    };

    /**
     * Fetch in two tiers. Models are what a catalog *is*: without them there
     * is nothing to publish. Everything else — combos, auto-combos, the
     * provider list, the enrichment overlay — improves an already usable
     * catalog, so awaiting any of them before publishing makes the catalog
     * hostage to the slowest source: a gateway that accepts the connection
     * and never answers one endpoint kept everything unpublished until that
     * fetch's own timeout fired, which is longer than some hosts stay alive.
     *
     * The optional tier therefore keeps running after the publish and upgrades
     * the stored snapshot when it lands, so the next transform serves the
     * complete catalog.
     */
    async function refreshSnapshot(): Promise<CatalogSnapshot> {
      // Models are what a catalog *is*; everything else improves one that
      // already works. Combos used to sit here too, so a gateway slow to
      // answer /api/combos held the whole picker back — the very thing the
      // staged publish exists to prevent.
      const essential = fetchModelsSafe();
      const optional = Promise.all([
        fetchCombosSafe(),
        fetchAutoCombosSafe(),
        fetchProvidersSafe(),
        fetchEnrichmentSafe(),
      ]);
      const models = await essential;
      const previous = state.entries.get(cacheKey);
      // A gateway that just failed everything gets a short breather: serving
      // last-known-good for a few seconds beats hammering it on every
      // transform while it is down. Arms whenever the models fetch comes back
      // empty — with or without a prior entry to serve — so a totally dead
      // gateway stops getting hit every window. Partial degradation (models
      // healthy, an optional tier failed) still retries normally next window.
      if (models.length === 0) {
        state.unreachableUntil = Date.now() + UNREACHABLE_COOLDOWN_MS;
      }
      // Carry every source forward until its replacement lands, and keep the
      // old value when a fetch FAILED — but honour a gateway that legitimately
      // returns nothing, which is a different answer from "I could not ask".
      const snapshot: CatalogSnapshot = {
        models,
        combos: previous?.combos ?? [],
        autoCombos: previous?.autoCombos ?? [],
        providers: previous?.providers ?? [],
        enrichment: previous?.enrichment ?? new Map(),
        fetchedAt: Date.now(),
      };
      if (models.length > 0) {
        state.entries.set(cacheKey, snapshot);
        await writeDiskSnapshot(X, snapshot, identityFingerprint);
      }
      void optional.then(
        (parts) => upgradeWithOptional(snapshot, parts),
        (err) => {
          // The wrappers never reject; a throw here would be a bug in them, and
          // an unhandled rejection is a worse way to learn about it.
          log.warn(
            `[omniroute-v2] optional catalog sources failed unexpectedly: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      );
      return snapshot;
    }

    /**
     * Fold late optional data into the snapshot that was published without it.
     * Skipped when a newer refresh has already replaced that snapshot, so a
     * slow tier can never resurrect a stale catalog.
     */
    async function upgradeWithOptional(
      base: CatalogSnapshot,
      [combos, autoCombos, providers, enrichment]: [
        SourceResult<OmniRouteRawCombo[]>,
        SourceResult<OmniRouteRawAutoCombo[]>,
        SourceResult<OmniRouteProviderConnection[]>,
        SourceResult<OmniRouteEnrichmentMap>,
      ]
    ): Promise<void> {
      if (state.entries.get(cacheKey) !== base) return;
      // Per source: a success replaces (even with an empty answer — that is
      // the gateway's answer), a failure keeps what we had.
      const upgraded: CatalogSnapshot = {
        ...base,
        combos: combos.ok ? combos.value : base.combos,
        autoCombos: autoCombos.ok ? autoCombos.value : base.autoCombos,
        providers: providers.ok ? providers.value : base.providers,
        enrichment: enrichment.ok ? enrichment.value : base.enrichment,
      };
      const unchanged =
        upgraded.combos === base.combos &&
        upgraded.autoCombos === base.autoCombos &&
        upgraded.providers === base.providers &&
        upgraded.enrichment === base.enrichment;
      if (unchanged) return;
      state.entries.set(cacheKey, upgraded);
      if (upgraded.models.length > 0) {
        await writeDiskSnapshot(X, upgraded, identityFingerprint);
      }
      // Reload only when the optional tier actually moved: the catalog
      // fingerprint covers ids alone, so without this the host would rebuild
      // its catalog once per TTL window for an identical result.
      const optionalFingerprint = optionalTierFingerprint(
        upgraded.autoCombos ?? [],
        upgraded.providers ?? [],
        upgraded.enrichment,
        upgraded.combos
      );
      const optionalChanged = state.optionalFingerprint !== optionalFingerprint;
      state.optionalFingerprint = optionalFingerprint;
      if (optionalChanged && typeof ctx.catalog.reload === "function") {
        try {
          await ctx.catalog.reload();
        } catch (err) {
          log.warn(
            `[omniroute-v2] catalog reload after late sources failed, keeping current catalog: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      }
    }

    function loadSnapshot(): Promise<CatalogSnapshot> {
      const now = Date.now();
      const hit = state.entries.get(cacheKey);
      if (hit && hit.fetchedAt + resolved.modelCacheTtlMs > now) return Promise.resolve(hit);
      // Cooldown after a total models failure: skip the network until it
      // lapses. Serves last-known-good when one exists; otherwise the refresh
      // below still runs (nothing to serve, no point pretending).
      if (now < state.unreachableUntil && hit) return Promise.resolve(hit);
      if (now >= state.unreachableUntil) state.unreachableUntil = 0;
      const inflight = state.inFlight.get(cacheKey);
      if (inflight) return inflight;
      const snapshot = refreshSnapshot();
      state.inFlight.set(cacheKey, snapshot);
      const clear = () => {
        if (state.inFlight.get(cacheKey) === snapshot) state.inFlight.delete(cacheKey);
      };
      snapshot.then(clear, clear);
      return snapshot;
    }

    // Warm-startup: the disk snapshot is read at boot (without blocking
    // the synchronous transform registration) to publish the last-known
    // catalog before the first successful fetch.
    /**
     * Warm start: publish the last known catalog from disk before the first
     * fetch returns. Deliberately read *after* the credential is resolved —
     * the snapshot is keyed by the credential tuple, and resolving the host
     * credential changes that key, so reading at setup time would look up the
     * wrong identity and reject a perfectly good snapshot.
     */
    let warmLoadedFor: string | undefined;
    const ensureWarmSnapshot = async (): Promise<void> => {
      if (warmLoadedFor === identityFingerprint) return;
      warmLoadedFor = identityFingerprint;
      const warm = await readDiskSnapshot(X, identityFingerprint, log);
      if (warm && !state.entries.has(cacheKey)) state.entries.set(cacheKey, warm);
    };

    // Fail-closed models (keep-last-good, validated): an empty models fetch
    // (transient 500/timeout) must not wipe a known catalog. The latest
    // non-empty entry (fresh fetch or warm disk snapshot) is replayed
    // instead of publishing the empty set. `refreshSnapshot` never overwrites
    // the memory entry on failure, so `entries` stays the last-known-good
    // source — including cross-setup via the disk snapshot.
    // Fail-open one level down, in the wrappers (never reject) and the
    // `publishCatalog` catches — so no try/catch here.
    const catalogRegistration = ctx.catalog.transform(async (draft) => {
      await ensureCredential();
      await ensureWarmSnapshot();
      const snapshot = await loadSnapshot();
      let effective = snapshot;
      if (snapshot.models.length === 0) {
        const stale = state.entries.get(cacheKey);
        if (stale !== undefined && stale.models.length > 0) {
          log.warn(
            `[omniroute-v2] models fetch returned empty, keeping last-known catalog (${stale.models.length} models, ${stale.combos.length} combos)`
          );
          effective = stale;
        }
      }
      const counts = await (async (): Promise<{
        models: number;
        combos: number;
        autoCombos: number;
      }> => {
        // fetcher-level fail-open covers fetches; this guard covers mapper/draft throws.
        try {
          return await publishCatalog(draft, resolved, {
            onSourceError: reportSourceError,
            models: async () => effective.models,
            combos: async () => effective.combos,
            autoCombos: async () => effective.autoCombos,
            providers: async () => effective.providers ?? [],
            enrichment: async () => effective.enrichment ?? new Map(),
          });
        } catch (err) {
          log.warn(
            `[omniroute-v2] catalog publish failed, keeping current catalog: ${err instanceof Error ? err.message : String(err)}`
          );
          return { models: 0, combos: 0, autoCombos: 0 };
        }
      })();
      void counts;
      const fingerprint = catalogContentFingerprint(
        effective.models,
        effective.combos,
        effective.autoCombos
      );
      const changed = state.fingerprint !== undefined && state.fingerprint !== fingerprint;
      state.fingerprint = fingerprint;
      if (changed && typeof ctx.catalog.reload === "function") {
        await Promise.resolve();
        try {
          await ctx.catalog.reload();
        } catch (err) {
          log.warn(
            `[omniroute-v2] catalog reload failed, keeping current catalog: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      }
    });
    const integrationHook = (ctx.integration as Partial<PluginContext["integration"]> | undefined)
      ?.transform;
    // A host that exposes the hook but throws while registering it must cost
    // the plugin nothing but the connect action: the throw happens OUTSIDE
    // any await, so only a call-site guard catches it (an await-guard alone
    // would let a synchronous throw escape setup and kill the catalog).
    let integrationRegistration: unknown;
    if (typeof integrationHook === "function") {
      try {
        integrationRegistration = integrationHook((draft) => {
          draft.update(X, (integration) => {
            integration.name = parsed.displayName ?? "OmniRoute";
          });
          draft.method.update({ integrationID: X, method: { type: "key", label: "API key" } });
          draft.method.update({
            integrationID: X,
            method: { type: "env", names: ["OMNIROUTE_API_KEY"] },
          });
        });
      } catch (err) {
        log.warn(
          `[omniroute-v2] host refused the integration hook, the connect action will be missing: ${err instanceof Error ? err.message : String(err)}`
        );
        integrationRegistration = undefined;
      }
    }
    /**
     * `aisdk.language` is newer than the catalog domain, so a host may not
     * expose it; the plugin must stay loadable there, minus the sanitising.
     */
    const languageHook = (ctx.aisdk as Partial<PluginContext["aisdk"]> | undefined)?.language;
    // A host that rejects this registration must cost the catalog nothing: the
    // plugin is a catalog first, and tool-schema cleaning is an extra.
    let languageRegistration: Promise<{ dispose: () => Promise<void> }> | undefined;
    if (parsed.geminiSanitization !== false && typeof languageHook === "function") {
      try {
        languageRegistration = languageHook((input) => {
          if (input.model.providerID !== X) return;
          input.language = sanitizeToolSchemasFor(input.language, input.model.id, log);
        });
      } catch (err) {
        log.warn(
          `[omniroute-v2] host refused the language-model hook, Gemini tool schemas will not be cleaned: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }

    await catalogRegistration;
    if (integrationRegistration !== undefined) {
      try {
        await integrationRegistration;
      } catch (err) {
        log.warn(
          `[omniroute-v2] host refused the integration hook, the connect action will be missing: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
    if (languageRegistration !== undefined) {
      try {
        await languageRegistration;
      } catch (err) {
        log.warn(
          `[omniroute-v2] language-model hook registration failed, Gemini tool schemas will not be cleaned: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }
  },
});
