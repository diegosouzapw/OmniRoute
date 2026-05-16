export type UsageTranslationValues = Record<string, string | number | boolean | Date>;

export type UsageTranslator = {
  (key: string, values?: UsageTranslationValues): string;
  has?: (key: string) => boolean;
};

export function translateUsageOrFallback(
  t: UsageTranslator,
  key: string,
  fallback: string,
  values?: UsageTranslationValues
): string {
  try {
    if (typeof t.has === "function" && !t.has(key)) {
      return fallback;
    }
    const translated = values ? t(key, values) : t(key);
    if (!translated || translated === key || translated === `usage.${key}`) {
      return fallback;
    }
    return translated;
  } catch {
    return fallback;
  }
}
