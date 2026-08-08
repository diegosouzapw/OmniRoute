/**
 * db/ccDiscoveryAliases.ts — Claude Code discovery-alias gate.
 *
 * Gates `claude/<provider>/<model>` mirror ids on the /v1/models catalog so
 * the Claude Code gateway's model discovery can list non-Claude models. This
 * module only owns the gate (global flag + per-provider/per-model overrides
 * + precedence resolver) — the catalog wiring itself lives elsewhere.
 *
 * Storage: `key_value` table, namespace `ccDiscoveryAliases`, following the
 * established key_value pattern (see `db/models.ts::setModelAlias` /
 * `db/paramFilters.ts`). Keys:
 *   - `provider:<providerId>`              -> "on" | "off"
 *   - `model:<providerId>/<modelId>`       -> "on" | "off"
 * A missing key means "inherit" (null).
 *
 * Global enablement precedence (see `getCcAliasGlobalState`):
 *   env EXPOSE_CC_DISCOVERY_ALIASES ("1"|"true") > DB flag override > default
 * (env wins over the dashboard DB override, matching the brief — this is the
 * opposite precedence from the generic `resolveFeatureFlag` helper, which is
 * why this module resolves the flag directly instead of reusing it).
 */

import { getFeatureFlagOverride } from "./featureFlags";
import { getDbInstance } from "./core";
import { finishModelCatalogWriteWithoutBackup } from "./models/modelCatalogWriteSignals";

const NAMESPACE = "ccDiscoveryAliases";
const FLAG_KEY = "EXPOSE_CC_DISCOVERY_ALIASES";

export type CcAliasSetting = "on" | "off" | null;

function providerKey(providerId: string): string {
  return `provider:${providerId}`;
}

function modelKey(providerId: string, modelId: string): string {
  return `model:${providerId}/${modelId}`;
}

function parseSetting(value: string | undefined): CcAliasSetting {
  if (value === "on" || value === "off") return value;
  return null;
}

/**
 * Pure precedence resolver: model setting wins over provider setting, which
 * wins over the global flag. `null`/`undefined` means "inherit" from the
 * next level down.
 */
export function resolveCcAliasEnabled(opts: {
  model?: CcAliasSetting;
  provider?: CcAliasSetting;
  global: boolean;
}): boolean {
  if (opts.model === "on") return true;
  if (opts.model === "off") return false;
  if (opts.provider === "on") return true;
  if (opts.provider === "off") return false;
  return opts.global;
}

export function getCcAliasProviderSetting(providerId: string): CcAliasSetting {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, providerKey(providerId)) as { value: string } | undefined;
  return parseSetting(row?.value);
}

export function setCcAliasProviderSetting(providerId: string, v: CcAliasSetting): void {
  const db = getDbInstance();
  const key = providerKey(providerId);
  if (v === null) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, key);
    finishModelCatalogWriteWithoutBackup();
    return;
  }
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    key,
    v,
  );
  finishModelCatalogWriteWithoutBackup();
}

export function getCcAliasModelSetting(providerId: string, modelId: string): CcAliasSetting {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, modelKey(providerId, modelId)) as { value: string } | undefined;
  return parseSetting(row?.value);
}

export function setCcAliasModelSetting(
  providerId: string,
  modelId: string,
  v: CcAliasSetting,
): void {
  const db = getDbInstance();
  const key = modelKey(providerId, modelId);
  if (v === null) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NAMESPACE, key);
    finishModelCatalogWriteWithoutBackup();
    return;
  }
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    key,
    v,
  );
  finishModelCatalogWriteWithoutBackup();
}

/**
 * Loads every provider/model override in a single query — intended for the
 * catalog builder, which needs the full set rather than per-row lookups.
 */
export function getCcAliasSettingsBulk(): {
  providers: Map<string, "on" | "off">;
  models: Map<string, "on" | "off">;
} {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(NAMESPACE) as Array<{ key: string; value: string }>;

  const providers = new Map<string, "on" | "off">();
  const models = new Map<string, "on" | "off">();

  for (const row of rows) {
    const setting = parseSetting(row.value);
    if (setting === null) continue;
    if (row.key.startsWith("provider:")) {
      providers.set(row.key.slice("provider:".length), setting);
    } else if (row.key.startsWith("model:")) {
      models.set(row.key.slice("model:".length), setting);
    }
  }

  return { providers, models };
}

function envForcesGlobalOn(): boolean {
  const raw = process.env[FLAG_KEY];
  return raw === "1" || raw === "true";
}

/**
 * Resolves the effective global state, and where it came from.
 * Precedence: env forces on > DB override > definition default.
 */
export function getCcAliasGlobalState(): { enabled: boolean; source: "env" | "db" | "default" } {
  if (envForcesGlobalOn()) {
    return { enabled: true, source: "env" };
  }

  const dbOverride = getFeatureFlagOverride(FLAG_KEY);
  if (dbOverride !== undefined) {
    return { enabled: dbOverride === "true" || dbOverride === "1", source: "db" };
  }

  return { enabled: false, source: "default" };
}

export function isCcAliasGlobalEnabled(): boolean {
  return getCcAliasGlobalState().enabled;
}
