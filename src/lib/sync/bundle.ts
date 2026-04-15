import { createHash } from "crypto";
import {
  getApiKeys,
  getCombos,
  getModelAliases,
  getProviderConnections,
  getProviderNodes,
  getSettings,
} from "@/lib/localDb";

type JsonRecord = Record<string, unknown>;

export interface ConfigSyncBundle {
  settings: JsonRecord;
  providerConnections: JsonRecord[];
  providerNodes: JsonRecord[];
  modelAliases: JsonRecord;
  combos: JsonRecord[];
  apiKeys: JsonRecord[];
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function sanitizeSettingsForSync(settings: unknown): JsonRecord {
  const record = asRecord(settings);
  const {
    password: _password,
    requireLogin: _requireLogin,
    cloudEnabled: _cloudEnabled,
    ...safeSettings
  } = record;
  return safeSettings;
}

function sortByStringKeys<T extends JsonRecord>(items: T[], keys: string[]) {
  return [...items].sort((a, b) => {
    for (const key of keys) {
      const leftRaw = a[key];
      const rightRaw = b[key];

      if (typeof leftRaw === "number" || typeof rightRaw === "number") {
        const left = typeof leftRaw === "number" ? leftRaw : Number.MAX_SAFE_INTEGER;
        const right = typeof rightRaw === "number" ? rightRaw : Number.MAX_SAFE_INTEGER;
        if (left !== right) return left - right;
        continue;
      }

      const left = typeof leftRaw === "string" ? String(leftRaw) : "";
      const right = typeof rightRaw === "string" ? String(rightRaw) : "";
      const comparison = left.localeCompare(right, undefined, { numeric: true });
      if (comparison !== 0) return comparison;
    }
    return 0;
  });
}

function pickDefined(record: JsonRecord, keys: string[]) {
  return Object.fromEntries(
    keys.filter((key) => record[key] !== undefined).map((key) => [key, record[key]])
  );
}

function sanitizeProviderConnectionForSync(connection: unknown): JsonRecord {
  const record = asRecord(connection);
  return pickDefined(record, [
    "id",
    "provider",
    "authType",
    "name",
    "displayName",
    "email",
    "priority",
    "globalPriority",
    "defaultModel",
    "isActive",
    "accessToken",
    "refreshToken",
    "expiresAt",
    "expiresIn",
    "tokenType",
    "scope",
    "idToken",
    "projectId",
    "apiKey",
    "providerSpecificData",
    "group",
  ]);
}

function sanitizeProviderNodeForSync(node: unknown): JsonRecord {
  const record = asRecord(node);
  return pickDefined(record, [
    "id",
    "type",
    "name",
    "prefix",
    "apiType",
    "baseUrl",
    "chatPath",
    "modelsPath",
  ]);
}

function sanitizeComboForSync(combo: unknown): JsonRecord {
  const record = asRecord(combo);
  const { createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = record;
  return rest;
}

function sanitizeApiKeyForSync(apiKey: unknown): JsonRecord {
  const record = asRecord(apiKey);
  return pickDefined(record, [
    "id",
    "name",
    "key",
    "machineId",
    "allowedModels",
    "allowedConnections",
    "noLog",
    "autoResolve",
    "isActive",
    "accessSchedule",
    "maxRequestsPerDay",
    "maxRequestsPerMinute",
    "maxSessions",
  ]);
}

function canonicalizeJson(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => canonicalizeJson(entry));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value as JsonRecord)
        .sort((a, b) => a.localeCompare(b))
        .map((key) => [key, canonicalizeJson((value as JsonRecord)[key])])
    );
  }

  return value;
}

export function serializeStableJson(value: unknown) {
  return JSON.stringify(canonicalizeJson(value));
}

export function computeConfigSyncVersion(bundle: ConfigSyncBundle) {
  return createHash("sha256").update(serializeStableJson(bundle)).digest("hex");
}

export async function buildConfigSyncBundle(): Promise<ConfigSyncBundle> {
  const [settings, providerConnections, providerNodes, modelAliases, combos, apiKeys] =
    await Promise.all([
      getSettings(),
      getProviderConnections(),
      getProviderNodes(),
      getModelAliases(),
      getCombos(),
      getApiKeys(),
    ]);

  return {
    settings: sanitizeSettingsForSync(settings),
    providerConnections: sortByStringKeys(
      providerConnections.map((connection) => sanitizeProviderConnectionForSync(connection)),
      ["provider", "name", "id"]
    ),
    providerNodes: sortByStringKeys(
      providerNodes.map((node) => sanitizeProviderNodeForSync(node)),
      ["type", "name", "id"]
    ),
    modelAliases: asRecord(modelAliases),
    combos: sortByStringKeys(
      combos.map((combo) => sanitizeComboForSync(combo)),
      ["sortOrder", "name", "id"]
    ),
    apiKeys: sortByStringKeys(
      apiKeys.map((apiKey) => sanitizeApiKeyForSync(apiKey)),
      ["name", "id"]
    ),
  };
}

export async function buildConfigSyncEnvelope() {
  const bundle = await buildConfigSyncBundle();
  const version = computeConfigSyncVersion(bundle);
  return {
    version,
    bundle,
  };
}

export function toLegacyCloudSyncPayload(bundle: ConfigSyncBundle) {
  return {
    providers: bundle.providerConnections,
    providerNodes: bundle.providerNodes,
    modelAliases: bundle.modelAliases,
    combos: bundle.combos,
    apiKeys: bundle.apiKeys,
    settings: bundle.settings,
  };
}
