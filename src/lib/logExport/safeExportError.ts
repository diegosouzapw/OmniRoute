import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import { exportProxySecretValues } from "./childEnvironment";

/** Include embedded JSON credentials and multiline fragments, not only the outer blob. */
export function exportSecretValues(
  config: Record<string, unknown>,
  keys: readonly string[]
): string[] {
  const values = new Set<string>();
  const collect = (value: unknown) => {
    if (typeof value === "string" && value) {
      values.add(value);
      for (const line of value.split(/\r?\n/)) if (line) values.add(line);
    } else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === "object") Object.values(value).forEach(collect);
  };
  for (const key of keys) {
    const value = config[key];
    collect(value);
    if (typeof value === "string") {
      try {
        collect(JSON.parse(value));
      } catch {
        /* Most destination secrets are opaque strings, not JSON credentials. */
      }
    }
  }
  return [...values].sort((a, b) => b.length - a.length);
}

/** Redact declared secret values as well as the shared stack/path/token patterns. */
export function safeExportError(value: unknown, secrets: readonly string[] = []): string {
  let message = value instanceof Error ? value.message : String(value);
  for (const secret of [...secrets, ...exportProxySecretValues()].sort(
    (a, b) => b.length - a.length
  )) {
    if (secret) message = message.split(secret).join("[REDACTED]");
  }
  return sanitizeErrorMessage(message).slice(0, 4000);
}
