import type { EvalResult, EvalTargetType } from "./types";

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "";
}

export function getResultExpectedValue(result: EvalResult): string {
  if (result.details?.expected) return String(result.details.expected);
  if (result.details?.searchTerm) return String(result.details.searchTerm);
  if (result.details?.pattern) return String(result.details.pattern);
  return "—";
}

export function getResultActualValue(result: EvalResult, output?: string): string {
  const actual = output || result.details?.actual || result.details?.actualSnippet || "";
  return typeof actual === "string" && actual.trim().length > 0 ? actual : "—";
}

export function getTargetLabel(
  target: { type: EvalTargetType; id: string | null },
  t: (key: string, values?: Record<string, unknown>) => string
): string {
  if (target.type === "combo") {
    return `${t("targetTypeCombo")}: ${target.id || "—"}`;
  }

  if (target.type === "model") {
    return `${t("targetTypeModel")}: ${target.id || "—"}`;
  }

  return t("targetSuiteDefaults");
}

export function parseTargetKey(value: string): { type: EvalTargetType; id: string | null } {
  const [rawType, ...rawId] = value.split(":");
  const idValue = rawId.join(":");

  if (rawType === "combo") {
    return { type: "combo", id: idValue || null };
  }

  if (rawType === "model") {
    return { type: "model", id: idValue || null };
  }

  return { type: "suite-default", id: null };
}

export function formatTimestamp(value: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function getResultDetails(
  result: EvalResult,
  t: (key: string, values?: Record<string, unknown>) => string
): string {
  if (result.error) {
    return `${t("resultErrorLabel")}: ${result.error}`;
  }

  if (result.details?.searchTerm) {
    return t("detailsContains", { term: result.details.searchTerm });
  }

  if (result.details?.pattern) {
    return t("detailsRegex", { pattern: result.details.pattern });
  }

  if (result.details?.expected) {
    return t("detailsExpected", {
      expected: String(result.details.expected).slice(0, 60),
    });
  }

  if (result.details?.actualSnippet) {
    return t("actualOutputLabel", {
      value: String(result.details.actualSnippet).slice(0, 60),
    });
  }

  return "—";
}
