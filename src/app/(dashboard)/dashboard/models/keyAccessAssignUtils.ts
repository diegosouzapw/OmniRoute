import { modelPatternMatches } from "@/shared/utils/modelPermissionPatterns";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
import { matchesSearch } from "@/shared/utils/turkishText";

export type AccessKind = "models" | "combos";
export type AssignAction = "add" | "remove";
export interface AccessKey {
  id: string;
  name: string;
  modelAccessMode: "all" | "restricted";
  allowedModels: string[];
  allowedCombos: string[];
  isActive?: boolean;
  isBanned?: boolean;
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
  status: "changed" | "unchanged" | "skipped" | "needs_switch" | "error";
  httpStatus?: number;
  message?: string;
  result?: AssignResult;
}
export interface AccessMatch {
  allowed: boolean;
  via?: "all" | "exact" | "pattern";
  pattern?: string;
}

function record(payload: unknown): payload is Record<string, unknown> {
  return typeof payload === "object" && payload !== null && !Array.isArray(payload);
}
function stringList(payload: unknown): string[] {
  return Array.isArray(payload)
    ? payload.filter((entry): entry is string => typeof entry === "string")
    : [];
}
function comboName(name: string): string {
  return name
    .trim()
    .replace(/^combo\//, "")
    .trim();
}

export function parseAccessKeysPage(payload: unknown): { keys: AccessKey[]; total: number | null } {
  if (!record(payload) || !Array.isArray(payload.keys)) return { keys: [], total: null };
  const keys = payload.keys.flatMap((entry): AccessKey[] => {
    if (!record(entry) || typeof entry.id !== "string" || !entry.id) return [];
    const allowedModels = stringList(entry.allowedModels);
    return [
      {
        id: entry.id,
        name: typeof entry.name === "string" ? entry.name : entry.id,
        modelAccessMode:
          entry.modelAccessMode === "restricted" ||
          (entry.modelAccessMode !== "all" && allowedModels.length > 0)
            ? "restricted"
            : "all",
        allowedModels,
        allowedCombos: Array.isArray(entry.allowedCombos)
          ? stringList(entry.allowedCombos)
          : [ALL_COMBOS_ACCESS_RULE],
        isActive: entry.isActive !== false,
        isBanned: entry.isBanned === true,
      },
    ];
  });
  return {
    keys,
    total:
      typeof payload.total === "number" && Number.isSafeInteger(payload.total) && payload.total >= 0
        ? payload.total
        : null,
  };
}

export function keyAllowsAll(key: AccessKey, kind: AccessKind): boolean {
  return kind === "models"
    ? key.modelAccessMode === "all"
    : key.allowedCombos.includes(ALL_COMBOS_ACCESS_RULE);
}
export function getModelAccess(key: AccessKey, id: string): AccessMatch {
  if (keyAllowsAll(key, "models")) return { allowed: true, via: "all" };
  if (key.allowedModels.includes(id)) return { allowed: true, via: "exact" };
  const pattern = key.allowedModels.find((rule) => modelPatternMatches(rule, [id]));
  return pattern ? { allowed: true, via: "pattern", pattern } : { allowed: false };
}
export function getComboAccess(key: AccessKey, name: string): AccessMatch {
  if (keyAllowsAll(key, "combos")) return { allowed: true, via: "all" };
  return key.allowedCombos.some((rule) => comboName(rule) === comboName(name))
    ? { allowed: true, via: "exact" }
    : { allowed: false };
}
export function isModelAllowed(key: AccessKey, id: string): boolean {
  return getModelAccess(key, id).allowed;
}
export function isComboAllowed(key: AccessKey, name: string): boolean {
  return getComboAccess(key, name).allowed;
}
export function countKeysAllowing(keys: AccessKey[], kind: AccessKind, id: string): number {
  return keys.filter((key) =>
    kind === "models" ? isModelAllowed(key, id) : isComboAllowed(key, id)
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
  const items = [...new Set(options.items.map((id) => id.trim()).filter(Boolean))];
  return {
    [options.action]: { [options.kind]: items },
    ...(options.action === "add" && options.switchToRestricted ? { switchToRestricted: true } : {}),
  };
}
export function planKeyAssignment(options: {
  key: AccessKey;
  kind: AccessKind;
  action: AssignAction;
  items: string[];
  switchOptIn: boolean;
}): { type: "skip" } | { type: "send"; body: AssignBody } {
  const all = keyAllowsAll(options.key, options.kind);
  if (all && options.action === "add" && !options.switchOptIn) return { type: "skip" };
  return {
    type: "send",
    body: buildAssignRequestBody({ ...options, switchToRestricted: all && options.switchOptIn }),
  };
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
export function summarizeOutcomes(outcomes: AssignOutcome[]) {
  return {
    total: outcomes.length,
    changed: outcomes.filter((outcome) => outcome.status === "changed").length,
    unchanged: outcomes.filter((outcome) => outcome.status === "unchanged").length,
    skipped: outcomes.filter((outcome) => outcome.status === "skipped").length,
    needsSwitch: outcomes.filter((outcome) => outcome.status === "needs_switch").length,
    failed: outcomes.filter((outcome) => outcome.status === "error").length,
  };
}
export function applyAssignResult(keys: AccessKey[], result: AssignResult): AccessKey[] {
  return keys.map((key) => (key.id === result.id ? { ...key, ...result } : key));
}
export function applyOptimisticAccess(
  key: AccessKey,
  kind: AccessKind,
  id: string,
  allowed: boolean
): AccessKey {
  const list = kind === "models" ? key.allowedModels : key.allowedCombos;
  const updated = allowed
    ? [...new Set([...list, id])]
    : list.filter((rule) => (kind === "models" ? rule !== id : comboName(rule) !== comboName(id)));
  return kind === "models"
    ? { ...key, modelAccessMode: "restricted", allowedModels: updated }
    : { ...key, allowedCombos: updated };
}
export function filterAccessKeys(keys: AccessKey[], query: string): AccessKey[] {
  return keys.filter((key) => matchesSearch(key.name, query));
}
