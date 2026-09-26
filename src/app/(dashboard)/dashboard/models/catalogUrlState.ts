import type { ComboCatalogFilters } from "./comboCatalogUtils";
import type { CatalogFilters } from "./modelCatalogUtils";

export type CatalogTab = "models" | "combos";

export const DEFAULT_MODEL_FILTERS: CatalogFilters = {
  query: "",
  providerId: "all",
  type: "all",
  subtype: "all",
  capability: "all",
  pricing: "all",
  providerHealth: "all",
  testResult: "all",
  minContextLength: undefined,
  minMaxOutputTokens: undefined,
};

export const DEFAULT_COMBO_FILTERS: ComboCatalogFilters = {
  query: "",
  strategy: "all",
  status: "all",
  testResult: "all",
  minMembers: undefined,
  maxMembers: undefined,
};

const PRICING_VALUES = new Set(["free", "paid"]);
const HEALTH_VALUES = new Set(["healthy", "degraded", "down"]);
const TEST_RESULT_VALUES = new Set(["untested", "ok", "slow", "error"]);
const COMBO_STATUS_VALUES = new Set(["active", "paused"]);

/** Whole numbers ≥ 0 only; anything else (empty, NaN, negative, fractional) means "no filter". */
export function parseNonNegativeInt(raw: string | null | undefined): number | undefined {
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) return undefined;
  const value = Number(trimmed);
  return Number.isSafeInteger(value) ? value : undefined;
}

function pickAllowed(raw: string | null, allowed: Set<string>): string {
  return raw !== null && allowed.has(raw) ? raw : "all";
}

export function parseCatalogTab(params: URLSearchParams): CatalogTab {
  return params.get("tab") === "combos" ? "combos" : "models";
}

export function parseModelFilters(params: URLSearchParams): CatalogFilters {
  return {
    query: params.get("query") || "",
    providerId: params.get("provider") || "all",
    type: params.get("type") || "all",
    subtype: params.get("subtype") || "all",
    capability: params.get("capability") || "all",
    pricing: pickAllowed(params.get("pricing"), PRICING_VALUES),
    providerHealth: pickAllowed(params.get("health"), HEALTH_VALUES),
    testResult: pickAllowed(params.get("testResult"), TEST_RESULT_VALUES),
    minContextLength: parseNonNegativeInt(params.get("minContext")),
    minMaxOutputTokens: parseNonNegativeInt(params.get("minOutput")),
  };
}

export function parseComboFilters(params: URLSearchParams): ComboCatalogFilters {
  // The combos tab writes the shared `query`/`testResult` names; `cQuery`/`cTestResult`
  // stay readable for links that carry both tabs' filters.
  const onCombosTab = parseCatalogTab(params) === "combos";
  return {
    query: params.get("cQuery") || (onCombosTab ? params.get("query") || "" : ""),
    strategy: params.get("strategy") || "all",
    status: pickAllowed(params.get("status"), COMBO_STATUS_VALUES),
    testResult: pickAllowed(
      params.get("cTestResult") ?? (onCombosTab ? params.get("testResult") : null),
      TEST_RESULT_VALUES
    ),
    minMembers: parseNonNegativeInt(params.get("minMembers")),
    maxMembers: parseNonNegativeInt(params.get("maxMembers")),
  };
}

function setIfActive(params: URLSearchParams, key: string, value: string | undefined) {
  if (value && value !== "all") params.set(key, value);
}

function setIfNumber(params: URLSearchParams, key: string, value: number | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) params.set(key, String(value));
}

/** Only the active tab's filters are written, so a shared link reproduces exactly that view. */
export function buildCatalogSearchParams(
  tab: CatalogTab,
  modelFilters: CatalogFilters,
  comboFilters: ComboCatalogFilters
): URLSearchParams {
  const params = new URLSearchParams();
  if (tab === "models") {
    setIfActive(params, "query", modelFilters.query);
    setIfActive(params, "provider", modelFilters.providerId);
    setIfActive(params, "type", modelFilters.type);
    setIfActive(params, "subtype", modelFilters.subtype);
    setIfActive(params, "capability", modelFilters.capability);
    setIfActive(params, "pricing", modelFilters.pricing);
    setIfActive(params, "health", modelFilters.providerHealth);
    setIfActive(params, "testResult", modelFilters.testResult);
    setIfNumber(params, "minContext", modelFilters.minContextLength);
    setIfNumber(params, "minOutput", modelFilters.minMaxOutputTokens);
    return params;
  }

  params.set("tab", "combos");
  setIfActive(params, "query", comboFilters.query);
  setIfActive(params, "strategy", comboFilters.strategy);
  setIfActive(params, "status", comboFilters.status);
  setIfActive(params, "testResult", comboFilters.testResult);
  setIfNumber(params, "minMembers", comboFilters.minMembers);
  setIfNumber(params, "maxMembers", comboFilters.maxMembers);
  return params;
}

export function hasActiveModelFilters(filters: CatalogFilters): boolean {
  return (
    filters.query !== "" ||
    filters.providerId !== "all" ||
    filters.type !== "all" ||
    Boolean(filters.subtype && filters.subtype !== "all") ||
    Boolean(filters.capability && filters.capability !== "all") ||
    Boolean(filters.pricing && filters.pricing !== "all") ||
    Boolean(filters.providerHealth && filters.providerHealth !== "all") ||
    Boolean(filters.testResult && filters.testResult !== "all") ||
    typeof filters.minContextLength === "number" ||
    typeof filters.minMaxOutputTokens === "number"
  );
}

export function hasActiveComboFilters(filters: ComboCatalogFilters): boolean {
  return (
    filters.query !== "" ||
    filters.strategy !== "all" ||
    filters.status !== "all" ||
    filters.testResult !== "all" ||
    typeof filters.minMembers === "number" ||
    typeof filters.maxMembers === "number"
  );
}
