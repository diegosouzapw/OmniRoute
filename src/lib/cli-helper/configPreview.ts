import { parse as parseJsonc, type ParseError } from "jsonc-parser";
import { parse as parseToml, stringify as stringifyToml } from "smol-toml";
import { load as parseYaml, dump as stringifyYaml } from "js-yaml";

function redactFields(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactFields);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      /api[-_]?key|token|password|secret|authorization|credentials?|bearer/i.test(key)
        ? "[redacted]"
        : redactFields(entry),
    ])
  );
}

/** Preview projection only. The original serialized config is written unchanged. */
export function redactGeneratedConfig(content: string, secrets: string[]): string {
  let redacted = String(content || "");
  // Merged profiles may contain credentials other than the caller's current key.
  // Project parsed configuration so escaped values and unrelated provider keys
  // cannot escape the preview boundary. Never mutate the on-disk configuration.
  try {
    const errors: ParseError[] = [];
    const json = parseJsonc(redacted, errors);
    if (!errors.length && json && typeof json === "object") {
      redacted = JSON.stringify(redactFields(json), null, 2);
    } else {
      try {
        const toml = parseToml(redacted);
        redacted = stringifyToml(redactFields(toml) as Record<string, unknown>);
      } catch {
        const yaml = parseYaml(redacted);
        if (yaml && typeof yaml === "object")
          redacted = stringifyYaml(redactFields(yaml), { lineWidth: -1 });
      }
    }
  } catch {
    // Non-config strings (e.g. diagnostics) still require literal redaction below.
  }
  for (const secret of secrets) {
    if (typeof secret !== "string" || !secret) continue;
    const variants = new Set([
      secret,
      JSON.stringify(secret).slice(1, -1),
      secret.replaceAll("'", "''"),
      secret.replaceAll("\\", "\\\\").replaceAll("'", "\\'"),
    ]);
    for (const variant of [...variants].filter(Boolean).sort((a, b) => b.length - a.length)) {
      redacted = redacted.split(variant).join("[redacted]");
    }
  }
  return redacted;
}
