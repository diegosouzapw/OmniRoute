export type ChaosTranslator = ((
  key: string,
  values?: Record<string, string | number>
) => string) & {
  has?: (key: string) => boolean;
};

export function chaosText(
  t: ChaosTranslator,
  key: string,
  fallback: string,
  values?: Record<string, string | number>
): string {
  if (typeof t.has !== "function" || !t.has(key)) return fallback;
  return values ? t(key, values) : t(key);
}
