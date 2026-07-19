import { createHash } from "crypto";
import {
  getApiKeys,
  getCombos,
  getModelAliases,
  getProviderConnections,
  getCachedProviderNodes,
  getSettings,
  getReasoningRoutingRules,
} from "@/lib/localDb";

type JsonRecord = Record<string, unknown>;

export interface ConfigSyncBundle {
  settings: JsonRecord;
  providerConnections: JsonRecord[];
  providerNodes: JsonRecord[];
  modelAliases: JsonRecord;
  combos: JsonRecord[];
  apiKeys: JsonRecord[];
  reasoningRoutingRules: JsonRecord[];
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
    "allowedCombos",
    "allowedConnections",
    "noLog",
    "autoResolve",
    "isActive",
    "accessSchedule",
    "maxRequestsPerDay",
    "maxRequestsPerMinute",
    "throttleDelayMs",
    "maxSessions",
  ]);
}

function sanitizeReasoningRuleForSync(rule: unknown): JsonRecord {
  const record = asRecord(rule);
  return pickDefined(record, [
    "id",
    "name",
    "description",
    "scope",
    "apiKeyId",
    "comboId",
    "connectionId",
    "modelPattern",
    "sourceEffort",
    "requestTags",
    "tagMatchMode",
    "effortMode",
    "targetEffort",
    "targetKind",
    "targetModel",
    "targetComboId",
    "budgetAction",
    "budgetTokens",
    "priority",
    "enabled",
    "createdAt",
    "updatedAt",
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
  const [
    settings,
    providerConnections,
    providerNodes,
    modelAliases,
    combos,
    apiKeys,
    reasoningRoutingRules,
  ] = await Promise.all([
    getSettings(),
    getProviderConnections(),
    getCachedProviderNodes(),
    getModelAliases(),
    getCombos(),
    getApiKeys(),
    getReasoningRoutingRules(),
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
    reasoningRoutingRules: sortByStringKeys(
      reasoningRoutingRules.map((rule) => sanitizeReasoningRuleForSync(rule)),
      ["scope", "priority", "createdAt", "id"]
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
    reasoningRoutingRules: bundle.reasoningRoutingRules,
  };
}

export function reconcileReasoningRulesForSync(
  rules: JsonRecord[],
  references: {
    apiKeyIds: Iterable<string>;
    comboIds: Iterable<string>;
    connectionIds: Iterable<string>;
  }
): { rules: JsonRecord[]; conflicts: Array<{ ruleId: string; missing: string[] }> } {
  const apiKeyIds = new Set(references.apiKeyIds);
  const comboIds = new Set(references.comboIds);
  const connectionIds = new Set(references.connectionIds);
  const conflicts: Array<{ ruleId: string; missing: string[] }> = [];
  const reconciled = rules.map((rule) => {
    const missing: string[] = [];
    if (rule.scope === "apiKey" && !apiKeyIds.has(String(rule.apiKeyId || ""))) {
      missing.push("apiKeyId");
    }
    if (rule.scope === "combo" && !comboIds.has(String(rule.comboId || ""))) {
      missing.push("comboId");
    }
    if (rule.scope === "connection" && !connectionIds.has(String(rule.connectionId || ""))) {
      missing.push("connectionId");
    }
    if (rule.targetKind === "combo" && !comboIds.has(String(rule.targetComboId || ""))) {
      missing.push("targetComboId");
    }
    if (missing.length === 0) return { ...rule };
    const ruleId = String(rule.id || "unknown");
    conflicts.push({ ruleId, missing });
    return { ...rule, enabled: false };
  });
  return { rules: reconciled, conflicts };
}
