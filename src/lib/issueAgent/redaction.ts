export const REDACTION_TEXT = "[REDACTED]";

const SECRET_PATTERNS: RegExp[] = [
  /\bBearer\s+[A-Za-z0-9._~+/=-]+/gi,
  /\b(api[_-]?key|x-api-key|access[_-]?token|token)\s*[:=]\s*["']?[^"',\s}]+["']?/gi,
  /\b(password|passwd|pwd)\s*[:=]\s*["']?[^"',\s}]+["']?/gi,
  /"(api[_-]?key|x-api-key|access[_-]?token|token|password|passwd|pwd)"\s*:\s*"[^"]*"/gi,
];

export function redactSecrets(value: string): string {
  return SECRET_PATTERNS.reduce(
    (redacted, pattern) =>
      redacted.replace(pattern, (match, key: string | undefined) => {
        if (match.toLowerCase().startsWith("bearer ")) {
          return `Bearer ${REDACTION_TEXT}`;
        }

        if (match.includes(":") && match.trim().startsWith('"')) {
          return `"${key}":"${REDACTION_TEXT}"`;
        }

        const separator = match.includes("=") ? "=" : ":";
        const label = match.slice(0, match.indexOf(separator)).trim();
        return `${label}${separator}${REDACTION_TEXT}`;
      }),
    value
  );
}
