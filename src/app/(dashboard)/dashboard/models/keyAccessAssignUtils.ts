import { modelPatternMatches } from "@/shared/utils/modelPermissionPatterns";
import {
  CLAUDE_CODE_PROVIDER_PREFIXES,
  addModelCandidate,
  addProviderAliasScopedCandidates,
  stripExtendedContextSuffix,
} from "@/shared/utils/modelPermissionCandidates";
import { getProviderAlias, resolveProviderId } from "@/shared/constants/providers";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
import { matchesSearch } from "@/shared/utils/turkishText";

export type AccessKind = "models" | "combos";
export type AssignAction = "add" | "remove";
export type KeyState = "active" | "inactive" | "banned" | "expired" | "revoked";
export interface AccessKey {
  id: string;
  name: string;
  modelAccessMode: "all" | "restricted";
  allowedModels: string[];
  blockedModels: string[];
  allowedCombos: string[];
  isActive?: boolean;
  isBanned?: boolean;
  revokedAt?: string | null;
  expiresAt?: string | null;
}
/** A catalog item to assign: a model id with its provider, or a combo name. */
export interface AssignItem {
  id: string;
  providerId?: string;
}
export interface AssignResult {
  id: string;
  modelAccessMode: "all" | "restricted";
  allowedModels: string[];
  allowedCombos: string[];
  changed: boolean;
}
export interface AssignBody {
  add?: { models?: string[]; combos?: string[] };
  remove?: { models?: string[]; combos?: string[] };
  switchToRestricted?: boolean;
}
export interface AssignOutcome {
  status: "changed" | "unchanged" | "skipped" | "would_empty" | "needs_switch" | "error";
  reason?: "pending";
  httpStatus?: number;
  message?: string;
  result?: AssignResult;
}
export interface AccessMatch {
  allowed: boolean;
  via?: "all" | "exact" | "pattern" | "blocked";
  pattern?: string;
}
export type AssignPlan =
  { type: "skip"; reason: "needs_opt_in" | "would_empty" } | { type: "send"; body: AssignBody };

function record(payload: unknown): payload is Record<string, unknown> {
  return typeof payload === "object" && payload !== null && !Array.isArray(payload);
}
function stringList(payload: unknown): string[] {
  return Array.isArray(payload)
    ? payload.filter((entry): entry is string => typeof entry === "string")
    : [];
}
function optionalString(payload: unknown): string | null {
  return typeof payload === "string" ? payload : null;
}
/** Same rule as the server's normalizeComboAccessName: `foo` equals `combo/foo`. */
function comboName(name: string): string {
  const trimmed = name.trim();
  return trimmed.startsWith("combo/") ? trimmed.slice(6).trim() || trimmed : trimmed;
}
function uniqueItems(items: string[]): string[] {
  return [...new Set(items.map((id) => id.trim()).filter(Boolean))];
}
function accessList(key: AccessKey, kind: AccessKind): string[] {
  return kind === "models" ? key.allowedModels : key.allowedCombos;
}
function withAccessList(key: AccessKey, kind: AccessKind, list: string[]): AccessKey {
  return kind === "models" ? { ...key, allowedModels: list } : { ...key, allowedCombos: list };
}
function matchesItem(kind: AccessKind, rule: string, id: string): boolean {
  return kind === "models" ? rule === id : comboName(rule) === comboName(id);
}

export function parseAccessKeysPage(payload: unknown): {
  keys: AccessKey[];
  total: number | null;
  rawCount: number;
} {
  if (!record(payload) || !Array.isArray(payload.keys))
    return { keys: [], total: null, rawCount: 0 };
  const keys = payload.keys.flatMap((entry): AccessKey[] => {
    if (!record(entry) || typeof entry.id !== "string" || !entry.id) return [];
    const hasModelList = Array.isArray(entry.allowedModels) && entry.allowedModels.length > 0;
    return [
      {
        id: entry.id,
        name: typeof entry.name === "string" ? entry.name : entry.id,
        // Mirrors the server's parseModelAccessMode: a non-empty list always restricts.
        modelAccessMode:
          hasModelList || entry.modelAccessMode === "restricted" ? "restricted" : "all",
        allowedModels: stringList(entry.allowedModels),
        blockedModels: stringList(entry.blockedModels),
        allowedCombos: Array.isArray(entry.allowedCombos)
          ? stringList(entry.allowedCombos)
          : [ALL_COMBOS_ACCESS_RULE],
        isActive: entry.isActive !== false,
        isBanned: entry.isBanned === true,
        revokedAt: optionalString(entry.revokedAt),
        expiresAt: optionalString(entry.expiresAt),
      },
    ];
  });
  return {
    keys,
    total:
      typeof payload.total === "number" && Number.isSafeInteger(payload.total) && payload.total >= 0
        ? payload.total
        : null,
    rawCount: payload.keys.length,
  };
}

export function getKeyState(key: AccessKey, now = Date.now()): KeyState {
  if (typeof key.revokedAt === "string" && key.revokedAt.trim() !== "") return "revoked";
  if (typeof key.expiresAt === "string" && key.expiresAt.trim() !== "") {
    const expiresMs = Date.parse(key.expiresAt);
    if (Number.isFinite(expiresMs) && expiresMs <= now) return "expired";
  }
  if (key.isBanned) return "banned";
  return key.isActive === false ? "inactive" : "active";
}
/** Revoked and expired keys can never authenticate again, so they are not assignment targets. */
export function isKeyUsable(key: AccessKey, now = Date.now()): boolean {
  const state = getKeyState(key, now);
  return state !== "revoked" && state !== "expired";
}
/** Combo and `auto/*` rows skip the model allow-list on the server, so they never go into it. */
export function isKeyAssignableModel(row: { id: string; providerId: string }): boolean {
  return row.providerId !== "combo" && !row.id.startsWith("auto/");
}

/**
 * The candidate ids the server checks for a model (getModelPermissionCandidates): the id, the id
 * without `[1m]`, and for provider-scoped ids the canonical provider and alias forms. The row's
 * own provider id is added for scoped ids. Bare ids are not widened, matching the server.
 */
export function modelAccessCandidates(id: string, providerId?: string): string[] {
  const candidates = new Set<string>();
  addModelCandidate(candidates, id);
  const clean = stripExtendedContextSuffix(id.trim());
  const slash = clean.indexOf("/");
  if (slash === -1) return [...candidates];
  const prefix = clean.slice(0, slash);
  const scoped = clean.slice(slash + 1);
  if (!scoped) return [...candidates];
  if (CLAUDE_CODE_PROVIDER_PREFIXES.has(prefix)) {
    for (const candidate of [scoped, `cc/${scoped}`, `claude/${scoped}`]) {
      addModelCandidate(candidates, candidate);
    }
  }
  addProviderAliasScopedCandidates(candidates, prefix, scoped, resolveProviderId, getProviderAlias);
  if (providerId && prefix && providerId !== prefix) {
    addModelCandidate(candidates, `${providerId}/${scoped}`);
  }
  return [...candidates];
}

export function keyAllowsAll(key: AccessKey, kind: AccessKind): boolean {
  return kind === "models"
    ? key.modelAccessMode === "all"
    : key.allowedCombos.includes(ALL_COMBOS_ACCESS_RULE);
}
export function getModelAccess(key: AccessKey, id: string, providerId?: string): AccessMatch {
  const candidates = modelAccessCandidates(id, providerId);
  const blocked = (key.blockedModels ?? []).find((rule) => modelPatternMatches(rule, candidates));
  if (blocked) return { allowed: false, via: "blocked", pattern: blocked };
  if (keyAllowsAll(key, "models")) return { allowed: true, via: "all" };
  if (key.allowedModels.includes(id)) return { allowed: true, via: "exact" };
  const pattern = key.allowedModels.find((rule) => modelPatternMatches(rule, candidates));
  return pattern ? { allowed: true, via: "pattern", pattern } : { allowed: false };
}
export function getComboAccess(key: AccessKey, name: string): AccessMatch {
  if (keyAllowsAll(key, "combos")) return { allowed: true, via: "all" };
  return key.allowedCombos.some((rule) => matchesItem("combos", rule, name))
    ? { allowed: true, via: "exact" }
    : { allowed: false };
}
export function isModelAllowed(key: AccessKey, id: string, providerId?: string): boolean {
  return getModelAccess(key, id, providerId).allowed;
}
export function isComboAllowed(key: AccessKey, name: string): boolean {
  return getComboAccess(key, name).allowed;
}
export function countKeysAllowing(
  keys: AccessKey[],
  kind: AccessKind,
  id: string,
  providerId?: string,
  now = Date.now()
): number {
  return keys.filter(
    (key) =>
      isKeyUsable(key, now) &&
      (kind === "models" ? isModelAllowed(key, id, providerId) : isComboAllowed(key, id))
  ).length;
}
export function summarizeKeyAccess(key: AccessKey) {
  const allModels = keyAllowsAll(key, "models");
  const allCombos = keyAllowsAll(key, "combos");
  return {
    allModels,
    modelCount: allModels ? 0 : key.allowedModels.length,
    allCombos,
    comboCount: allCombos ? 0 : key.allowedCombos.length,
  };
}
export function buildAssignRequestBody(options: {
  kind: AccessKind;
  action: AssignAction;
  items: string[];
  switchToRestricted?: boolean;
}): AssignBody {
  return {
    [options.action]: { [options.kind]: uniqueItems(options.items) },
    ...(options.action === "add" && options.switchToRestricted ? { switchToRestricted: true } : {}),
  };
}
export function planKeyAssignment(options: {
  key: AccessKey;
  kind: AccessKind;
  action: AssignAction;
  items: string[];
  switchOptIn: boolean;
}): AssignPlan {
  const all = keyAllowsAll(options.key, options.kind);
  if (all && options.action === "add" && !options.switchOptIn) {
    return { type: "skip", reason: "needs_opt_in" };
  }
  if (!all && options.action === "remove") {
    // The server writes whatever is left, so never let a removal empty a restricted list.
    const items = uniqueItems(options.items);
    const list = accessList(options.key, options.kind);
    const remaining = list.filter(
      (rule) => !items.some((id) => matchesItem(options.kind, rule, id))
    );
    if (list.length > 0 && remaining.length === 0) return { type: "skip", reason: "would_empty" };
  }
  return {
    type: "send",
    body: buildAssignRequestBody({ ...options, switchToRestricted: all && options.switchOptIn }),
  };
}
/** Wildcards that still allow a removed model, because removal only drops exact entries. */
export function findStillAllowedPatterns(key: AccessKey, items: AssignItem[]): string[] {
  if (keyAllowsAll(key, "models")) return [];
  const removed = new Set(uniqueItems(items.map((item) => item.id)));
  const remaining = key.allowedModels.filter((rule) => !removed.has(rule));
  const patterns = new Set<string>();
  for (const item of items) {
    const access = getModelAccess({ ...key, allowedModels: remaining }, item.id, item.providerId);
    if (access.via === "pattern" && access.pattern) patterns.add(access.pattern);
  }
  return [...patterns];
}
export function classifyAssignResponse(status: number, payload: unknown): AssignOutcome {
  const body = record(payload) ? payload : {};
  if (
    status === 200 &&
    typeof body.id === "string" &&
    (body.modelAccessMode === "all" || body.modelAccessMode === "restricted") &&
    Array.isArray(body.allowedModels) &&
    body.allowedModels.every((id) => typeof id === "string") &&
    Array.isArray(body.allowedCombos) &&
    body.allowedCombos.every((id) => typeof id === "string") &&
    typeof body.changed === "boolean"
  ) {
    return {
      status: body.changed ? "changed" : "unchanged",
      result: body as unknown as AssignResult,
    };
  }
  const error = body.error;
  const message =
    typeof error === "string"
      ? error
      : record(error) && typeof error.message === "string"
        ? error.message
        : undefined;
  return {
    status: status === 409 ? "needs_switch" : "error",
    httpStatus: status,
    ...(message ? { message } : {}),
  };
}
export function networkErrorOutcome(): AssignOutcome {
  return { status: "error" };
}
/** Toast for a finished run: error on any failure, success only if a key changed, else info. */
export function assignRunToastType(outcomes: AssignOutcome[]): "error" | "success" | "info" {
  if (outcomes.some((outcome) => outcome.status === "error" || outcome.status === "needs_switch")) {
    return "error";
  }
  return outcomes.some((outcome) => outcome.status === "changed") ? "success" : "info";
}
export function applyAssignResult(keys: AccessKey[], result: AssignResult): AccessKey[] {
  return keys.map((key) =>
    key.id === result.id
      ? {
          ...key,
          modelAccessMode: result.modelAccessMode,
          allowedModels: result.allowedModels,
          allowedCombos: result.allowedCombos,
        }
      : key
  );
}
export function applyOptimisticAccess(
  key: AccessKey,
  kind: AccessKind,
  id: string,
  allowed: boolean
): AccessKey {
  const list = accessList(key, kind);
  const updated = allowed
    ? [...new Set([...list, id])]
    : list.filter((rule) => !matchesItem(kind, rule, id));
  return kind === "models"
    ? { ...key, modelAccessMode: "restricted", allowedModels: updated }
    : { ...key, allowedCombos: updated };
}
/**
 * Undo one optimistic toggle on the current entry without touching newer data. `snapshot` is the
 * entry before the toggle. When newer data already dropped the optimistic change, nothing happens.
 */
export function revertOptimisticAccess(
  entry: AccessKey,
  snapshot: AccessKey,
  kind: AccessKind,
  id: string,
  allowed: boolean
): AccessKey {
  const current = accessList(entry, kind);
  const before = accessList(snapshot, kind);
  if (allowed) {
    if (before.includes(id) || !current.includes(id)) return entry;
    return withAccessList(
      entry,
      kind,
      current.filter((rule) => rule !== id)
    );
  }
  const removed = before.filter((rule) => matchesItem(kind, rule, id));
  if (removed.length === 0 || current.some((rule) => matchesItem(kind, rule, id))) return entry;
  return withAccessList(entry, kind, [...current, ...removed]);
}
export function filterAccessKeys(keys: AccessKey[], query: string): AccessKey[] {
  return keys.filter((key) => matchesSearch(key.name, query));
}
