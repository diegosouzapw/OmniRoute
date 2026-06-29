import fs from "node:fs/promises";
import path from "node:path";
import { wildcardMatch } from "./wildcardRouter.ts";

type JsonRecord = Record<string, unknown>;

export type PayloadRuleModelSpec = {
  name: string;
  protocol?: string;
};

export type PayloadMutationRule = {
  models: PayloadRuleModelSpec[];
  params: Record<string, unknown>;
};

export type PayloadFilterRule = {
  models: PayloadRuleModelSpec[];
  params: string[];
};

export type PayloadRulesConfig = {
  default: PayloadMutationRule[];
  override: PayloadMutationRule[];
  filter: PayloadFilterRule[];
  defaultRaw: PayloadMutationRule[];
};

export type AppliedPayloadRule = {
  type: "default" | "override" | "filter" | "default-raw";
  path: string;
  value?: unknown;
};

const DEFAULT_PAYLOAD_RULES_CONFIG: PayloadRulesConfig = {
  default: [],
  override: [],
  filter: [],
  defaultRaw: [],
};

const MIN_FILE_CHECK_INTERVAL_MS = 1_000;
const DEFAULT_FILE_CHECK_INTERVAL_MS = 5_000;

let runtimeOverride: PayloadRulesConfig | null = null;
let cachedFileConfig = clonePayloadRulesConfig(DEFAULT_PAYLOAD_RULES_CONFIG);
let cachedFilePath = "";
let cachedFileMtimeMs = -1;
let lastFileCheckAt = 0;
let fileLoadPromise: Promise<void> | null = null;
let lastFileErrorSignature = "";

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function cloneValue<T>(value: T): T {
  return structuredClone(value);
}

function clonePayloadRulesConfig(config: PayloadRulesConfig): PayloadRulesConfig {
  return {
    default: config.default.map((rule) => ({
      models: rule.models.map((model) => ({ ...model })),
      params: cloneValue(rule.params),
    })),
    override: config.override.map((rule) => ({
      models: rule.models.map((model) => ({ ...model })),
      params: cloneValue(rule.params),
    })),
    filter: config.filter.map((rule) => ({
      models: rule.models.map((model) => ({ ...model })),
      params: [...rule.params],
    })),
    defaultRaw: config.defaultRaw.map((rule) => ({
      models: rule.models.map((model) => ({ ...model })),
      params: cloneValue(rule.params),
    })),
  };
}

function normalizeModelSpecs(value: unknown): PayloadRuleModelSpec[] {
  return toArray<JsonRecord>(value)
    .map((item) => {
      const name = typeof item?.name === "string" ? item.name.trim() : "";
      const protocol = typeof item?.protocol === "string" ? item.protocol.trim() : "";
      if (!name) return null;
      return protocol ? { name, protocol } : { name };
    })
    .filter((item): item is PayloadRuleModelSpec => !!item);
}

function normalizeMutationRules(value: unknown): PayloadMutationRule[] {
  return toArray<JsonRecord>(value)
    .map((item) => {
      const models = normalizeModelSpecs(item?.models);
      const params = toRecord(item?.params);
      if (models.length === 0 || Object.keys(params).length === 0) return null;
      return { models, params };
    })
    .filter((item): item is PayloadMutationRule => !!item);
}

function normalizeFilterRules(value: unknown): PayloadFilterRule[] {
  return toArray<JsonRecord>(value)
    .map((item) => {
      const models = normalizeModelSpecs(item?.models);
      const params = toArray<unknown>(item?.params)
        .map((pathValue) => (typeof pathValue === "string" ? pathValue.trim() : ""))
        .filter(Boolean);
      if (models.length === 0 || params.length === 0) return null;
      return { models, params };
    })
    .filter((item): item is PayloadFilterRule => !!item);
}

export function normalizePayloadRulesConfig(value: unknown): PayloadRulesConfig {
  const record = toRecord(value);
  const defaultRawLegacy = toArray<JsonRecord>(record["default-raw"]);
  const defaultRaw = [...toArray<JsonRecord>(record.defaultRaw), ...defaultRawLegacy];

  return {
    default: normalizeMutationRules(record.default),
    override: normalizeMutationRules(record.override),
    filter: normalizeFilterRules(record.filter),
    defaultRaw: normalizeMutationRules(defaultRaw),
  };
}

function getPayloadRulesPath() {
  return (
    process.env.OMNIROUTE_PAYLOAD_RULES_PATH ||
    process.env.PAYLOAD_RULES_PATH ||
    path.join(/* turbopackIgnore: true */ process.cwd(), "config", "payloadRules.json")
  );
}

function getPayloadRulesReloadIntervalMs() {
  const parsed = Number.parseInt(process.env.OMNIROUTE_PAYLOAD_RULES_RELOAD_MS || "", 10);
  if (!Number.isFinite(parsed) || parsed < MIN_FILE_CHECK_INTERVAL_MS) {
    return DEFAULT_FILE_CHECK_INTERVAL_MS;
  }
  return parsed;
}

function clearCachedFileConfig() {
  cachedFileConfig = clonePayloadRulesConfig(DEFAULT_PAYLOAD_RULES_CONFIG);
  cachedFileMtimeMs = -1;
}

async function refreshPayloadRulesFileCache(force = false) {
  const filePath = getPayloadRulesPath();
  const now = Date.now();

  if (
    !force &&
    filePath === cachedFilePath &&
    now - lastFileCheckAt < getPayloadRulesReloadIntervalMs()
  ) {
    return;
  }

  if (fileLoadPromise) {
    await fileLoadPromise;
    return;
  }

  fileLoadPromise = (async () => {
    lastFileCheckAt = now;
    cachedFilePath = filePath;

    try {
      const stat = await fs.stat(filePath);
      if (!force && cachedFileMtimeMs === stat.mtimeMs) {
        return;
      }

      const content = await fs.readFile(filePath, "utf-8");
      const parsed = JSON.parse(content);
      cachedFileConfig = normalizePayloadRulesConfig(parsed);
      cachedFileMtimeMs = stat.mtimeMs;
      lastFileErrorSignature = "";
    } catch (error) {
      if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
        clearCachedFileConfig();
        lastFileErrorSignature = "";
        return;
      }

      const message = error instanceof Error ? error.message : String(error);
      const errorSignature = `${filePath}:${message}`;
      if (errorSignature !== lastFileErrorSignature) {
        console.warn(`[PAYLOAD_RULES] Failed to load ${filePath}: ${message}`);
        lastFileErrorSignature = errorSignature;
      }
    }
  })();

  try {
    await fileLoadPromise;
  } finally {
    fileLoadPromise = null;
  }
}

export function setPayloadRulesConfig(config: unknown) {
  runtimeOverride = normalizePayloadRulesConfig(config);
}

export function clearPayloadRulesConfigOverride() {
  runtimeOverride = null;
}

// #2986: Read the DB-persisted payload rules (the source of truth, written by
// the Settings UI via updateSettings). Used as the fallback when no in-memory
// runtimeOverride is set — e.g. a fresh process before the startup
// applyRuntimeSettings hook ran, or a separate module instance in the
// standalone Next.js build — so saved rules survive a server restart instead of
// silently reverting to the (usually empty) file config.
async function loadPayloadRulesFromSettings(): Promise<PayloadRulesConfig | null> {
  try {
    const { getCachedSettings } = await import("@/lib/localDb");
    const settings = (await getCachedSettings()) as { payloadRules?: unknown };
    const raw = settings?.payloadRules;
    if (raw === null || raw === undefined) return null;
    return normalizePayloadRulesConfig(raw);
  } catch {
    return null;
  }
}

export async function getPayloadRulesConfig(options: { forceRefresh?: boolean } = {}) {
  if (runtimeOverride) {
    return clonePayloadRulesConfig(runtimeOverride);
  }

  // #2986: prefer the DB-persisted rules over the file config so a saved
  // configuration survives a restart even when the in-memory override is absent.
  const dbConfig = await loadPayloadRulesFromSettings();
  if (dbConfig) {
    return clonePayloadRulesConfig(dbConfig);
  }

  await refreshPayloadRulesFileCache(options.forceRefresh === true);
  return clonePayloadRulesConfig(cachedFileConfig);
}

function getPathSegments(pathValue: string) {
  return pathValue
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function isIndexSegment(segment: string) {
  return /^\d+$/.test(segment);
}

function getValueAtPath(payload: unknown, pathValue: string) {
  const segments = getPathSegments(pathValue);
  let cursor: unknown = payload;

  for (const segment of segments) {
    if (cursor == null) return undefined;
    if (Array.isArray(cursor)) {
      if (!isIndexSegment(segment)) return undefined;
      cursor = cursor[Number(segment)];
      continue;
    }
    if (typeof cursor !== "object") return undefined;
    cursor = (cursor as JsonRecord)[segment];
  }

  return cursor;
}

function setValueAtPath(payload: JsonRecord, pathValue: string, value: unknown) {
  const segments = getPathSegments(pathValue);
  if (segments.length === 0) return;

  let cursor: unknown = payload;
  for (let index = 0; index < segments.length - 1; index++) {
    const segment = segments[index];
    const nextSegment = segments[index + 1];
    const nextIsIndex = isIndexSegment(nextSegment);

    if (Array.isArray(cursor)) {
      const arrayIndex = Number(segment);
      if (!Number.isInteger(arrayIndex)) return;
      if (cursor[arrayIndex] == null || typeof cursor[arrayIndex] !== "object") {
        cursor[arrayIndex] = nextIsIndex ? [] : {};
      }
      cursor = cursor[arrayIndex];
      continue;
    }

    if (!cursor || typeof cursor !== "object") return;

    const recordCursor = cursor as JsonRecord;
    if (
      recordCursor[segment] == null ||
      typeof recordCursor[segment] !== "object" ||
      (Array.isArray(recordCursor[segment]) && !nextIsIndex) ||
      (!Array.isArray(recordCursor[segment]) && nextIsIndex)
    ) {
      recordCursor[segment] = nextIsIndex ? [] : {};
    }

    cursor = recordCursor[segment];
  }

  const lastSegment = segments.at(-1)!;
  if (Array.isArray(cursor)) {
    const arrayIndex = Number(lastSegment);
    if (!Number.isInteger(arrayIndex)) return;
    cursor[arrayIndex] = cloneValue(value);
    return;
  }

  if (!cursor || typeof cursor !== "object") return;
  (cursor as JsonRecord)[lastSegment] = cloneValue(value);
}

function unsetValueAtPath(payload: JsonRecord, pathValue: string) {
  const segments = getPathSegments(pathValue);
  if (segments.length === 0) return false;

  let cursor: unknown = payload;
  for (let index = 0; index < segments.length - 1; index++) {
    const segment = segments[index];
    if (Array.isArray(cursor)) {
      if (!isIndexSegment(segment)) return false;
      cursor = cursor[Number(segment)];
      continue;
    }
    if (!cursor || typeof cursor !== "object") return false;
    cursor = (cursor as JsonRecord)[segment];
  }

  const lastSegment = segments.at(-1)!;
  if (Array.isArray(cursor)) {
    if (!isIndexSegment(lastSegment)) return false;
    const arrayIndex = Number(lastSegment);
    if (arrayIndex < 0 || arrayIndex >= cursor.length) return false;
    cursor.splice(arrayIndex, 1);
    return true;
  }

  if (!cursor || typeof cursor !== "object") return false;
  if (!Object.hasOwn(cursor, lastSegment)) return false;
  delete (cursor as JsonRecord)[lastSegment];
  return true;
}

function parseDefaultRawValue(value: unknown) {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function matchesProtocol(specProtocol: string | undefined, protocols: string[]) {
  if (!specProtocol) return true;
  const normalizedProtocol = specProtocol.trim().toLowerCase();
  return protocols.some((protocol) => protocol.trim().toLowerCase() === normalizedProtocol);
}

function matchesModelSpec(model: string, protocols: string[], spec: PayloadRuleModelSpec) {
  return matchesProtocol(spec.protocol, protocols) && wildcardMatch(model, spec.name);
}

function matchesRule(model: string, protocols: string[], specs: PayloadRuleModelSpec[]) {
  return specs.some((spec) => matchesModelSpec(model, protocols, spec));
}

function toPayloadRuleProtocols(value: string | string[]) {
  const protocols = Array.isArray(value) ? value : [value];
  return [...new Set(protocols.map((protocol) => protocol.trim()).filter(Boolean))];
}

export function resolvePayloadRuleProtocols({
  provider,
  targetFormat,
}: {
  provider?: string | null;
  targetFormat?: string | null;
}) {
  const protocols = new Set<string>();

  if (provider) protocols.add(provider);
  if (targetFormat) protocols.add(targetFormat);
  if (targetFormat === "openai-responses" || targetFormat === "openai-response") {
    protocols.add("openai");
  }
  if (targetFormat === "antigravity") {
    protocols.add("gemini");
  }

  return [...protocols];
}

export function applyPayloadRules(
  payload: JsonRecord,
  model: string,
  protocol: string | string[],
  rules: PayloadRulesConfig
) {
  const normalizedPayload = cloneValue(payload);
  const protocols = toPayloadRuleProtocols(protocol);
  const applied: AppliedPayloadRule[] = [];

  for (const rule of rules.default) {
    if (!matchesRule(model, protocols, rule.models)) continue;
    for (const [pathValue, rawValue] of Object.entries(rule.params)) {
      if (getValueAtPath(normalizedPayload, pathValue) !== undefined) continue;
      setValueAtPath(normalizedPayload, pathValue, rawValue);
      applied.push({ type: "default", path: pathValue, value: cloneValue(rawValue) });
    }
  }

  for (const rule of rules.defaultRaw) {
    if (!matchesRule(model, protocols, rule.models)) continue;
    for (const [pathValue, rawValue] of Object.entries(rule.params)) {
      if (getValueAtPath(normalizedPayload, pathValue) !== undefined) continue;
      const parsedValue = parseDefaultRawValue(rawValue);
      setValueAtPath(normalizedPayload, pathValue, parsedValue);
      applied.push({ type: "default-raw", path: pathValue, value: cloneValue(parsedValue) });
    }
  }

  for (const rule of rules.override) {
    if (!matchesRule(model, protocols, rule.models)) continue;
    for (const [pathValue, rawValue] of Object.entries(rule.params)) {
      setValueAtPath(normalizedPayload, pathValue, rawValue);
      applied.push({ type: "override", path: pathValue, value: cloneValue(rawValue) });
    }
  }

  for (const rule of rules.filter) {
    if (!matchesRule(model, protocols, rule.models)) continue;
    for (const pathValue of rule.params) {
      if (!unsetValueAtPath(normalizedPayload, pathValue)) continue;
      applied.push({ type: "filter", path: pathValue });
    }
  }

  return { payload: normalizedPayload, applied };
}

export async function applyConfiguredPayloadRules(
  payload: JsonRecord,
  model: string,
  protocol: string | string[]
) {
  const rules = await getPayloadRulesConfig();
  return applyPayloadRules(payload, model, protocol, rules);
}

export function resetPayloadRulesConfigForTests() {
  runtimeOverride = null;
  cachedFilePath = "";
  cachedFileMtimeMs = -1;
  lastFileCheckAt = 0;
  fileLoadPromise = null;
  lastFileErrorSignature = "";
  cachedFileConfig = clonePayloadRulesConfig(DEFAULT_PAYLOAD_RULES_CONFIG);
}
