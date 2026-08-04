export type CodexQuotaScope = "codex" | "spark";

export const CODEX_SPARK_MODEL_ID = "gpt-5.3-codex-spark";
export const CODEX_SPARK_DISPLAY_NAME = "GPT-5.3-Codex-Spark";
export const CODEX_SPARK_METERED_FEATURE = "gpt_5_3_codex_spark";
export const CODEX_SPARK_QUOTA_SESSION = `${CODEX_SPARK_METERED_FEATURE}_session`;
export const CODEX_SPARK_QUOTA_WEEKLY = `${CODEX_SPARK_METERED_FEATURE}_weekly`;

const CODEX_SCOPE_PATTERNS: Array<{ pattern: string; scope: CodexQuotaScope }> = [
  { pattern: "codex-spark", scope: "spark" },
  { pattern: "spark", scope: "spark" },
  { pattern: "bengalfox", scope: "spark" },
  { pattern: "codex", scope: "codex" },
  { pattern: "gpt-5", scope: "codex" },
];

export function getCodexModelScope(model: string | null | undefined): CodexQuotaScope {
  const lower = String(model || "").toLowerCase();
  for (const { pattern, scope } of CODEX_SCOPE_PATTERNS) {
    if (lower.includes(pattern)) return scope;
  }
  return "codex";
}

export function getCodexRateLimitKey(accountId: string, model: string): string {
  return `${accountId}:${getCodexModelScope(model)}`;
}

export function isCodexSparkQuotaKey(key: string | null | undefined): boolean {
  const normalized = String(key || "")
    .trim()
    .toLowerCase();
  if (!normalized) return false;
  return (
    normalized === CODEX_SPARK_QUOTA_SESSION ||
    normalized === CODEX_SPARK_QUOTA_WEEKLY ||
    normalized === "codex-spark" ||
    normalized === "codex-spark-weekly" ||
    normalized.includes("codex-spark") ||
    normalized.includes("codex_spark") ||
    normalized.includes(CODEX_SPARK_METERED_FEATURE)
  );
}

export function isCodexSparkLimitDescriptor(...values: unknown[]): boolean {
  return values.some((value) => {
    if (typeof value !== "string") return false;
    const normalized = value.trim().toLowerCase();
    return (
      normalized.includes("spark") ||
      normalized.includes("bengalfox") ||
      normalized.includes(CODEX_SPARK_METERED_FEATURE)
    );
  });
}

export function getCodexQuotaWindowFilterForModel(
  model: string | null | undefined
): ((windowName: string) => boolean) | undefined {
  if (!model) return undefined;
  const scope = getCodexModelScope(model);
  return (windowName: string) => {
    const isSpark = isCodexSparkQuotaKey(windowName);
    return scope === "spark" ? isSpark : !isSpark;
  };
}

export function toCodexScopedQuotaWindowName(
  baseWindowName: string,
  model: string | null | undefined
): string {
  if (!model || getCodexModelScope(model) !== "spark") return baseWindowName;
  const normalized = baseWindowName.trim().toLowerCase();
  if (normalized === "session") return CODEX_SPARK_QUOTA_SESSION;
  if (normalized === "weekly") return CODEX_SPARK_QUOTA_WEEKLY;
  return baseWindowName;
}

export function toCodexBaseQuotaWindowName(windowName: string | null): string | null {
  if (!windowName) return windowName;
  const normalized = windowName.trim().toLowerCase();
  if (normalized === CODEX_SPARK_QUOTA_SESSION || normalized === "codex-spark") return "session";
  if (normalized === CODEX_SPARK_QUOTA_WEEKLY || normalized === "codex-spark-weekly") {
    return "weekly";
  }
  return windowName;
}
