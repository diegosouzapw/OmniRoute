/**
 * Output PII Sanitization — L-3
 *
 * Scans LLM response text for PII patterns and optionally redacts them.
 * This is the OUTPUT-side counterpart to the input sanitizer.
 * Configurable via environment variables:
 *
 *   PII_RESPONSE_SANITIZATION=true|false  (default: false)
 *   PII_RESPONSE_SANITIZATION_MODE=redact|warn|block  (default: redact)
 *
 * @module lib/piiSanitizer
 */

// ── Configuration ──

const isEnabled = () => process.env.PII_RESPONSE_SANITIZATION === "true";
const getMode = (): "redact" | "warn" | "block" =>
  (process.env.PII_RESPONSE_SANITIZATION_MODE as "redact" | "warn" | "block") || "redact";

// ── PII Patterns ──

interface PIIPattern {
  name: string;
  regex: RegExp;
  replacement: string;
  severity: "high" | "medium" | "low";
}

const PII_PATTERNS: PIIPattern[] = [
  {
    name: "email",
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: "[EMAIL_REDACTED]",
    severity: "medium",
  },
  {
    name: "ssn",
    regex: /\b\d{3}-\d{2}-\d{4}\b/g,
    replacement: "[SSN_REDACTED]",
    severity: "high",
  },
  {
    name: "credit_card",
    regex: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    replacement: "[CC_REDACTED]",
    severity: "high",
  },
  {
    name: "phone_us",
    regex: /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    replacement: "[PHONE_REDACTED]",
    severity: "medium",
  },
  {
    name: "phone_br",
    regex: /\b(?:\+?55[-.\s]?)?\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}\b/g,
    replacement: "[PHONE_REDACTED]",
    severity: "medium",
  },
  {
    name: "cpf",
    regex: /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g,
    replacement: "[CPF_REDACTED]",
    severity: "high",
  },
  {
    name: "cnpj",
    regex: /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g,
    replacement: "[CNPJ_REDACTED]",
    severity: "high",
  },
  {
    name: "ip_address",
    regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
    replacement: "[IP_REDACTED]",
    severity: "low",
  },
  {
    name: "aws_key",
    regex: /\bAKIA[0-9A-Z]{16}\b/g,
    replacement: "[AWS_KEY_REDACTED]",
    severity: "high",
  },
  {
    name: "api_key_generic",
    regex: /\b(?:sk|pk|api|key|token)[_-][a-zA-Z0-9]{20,}\b/gi,
    replacement: "[API_KEY_REDACTED]",
    severity: "high",
  },
];

// ── Public API ──

export interface SanitizeResult {
  text: string;
  detections: Array<{
    pattern: string;
    count: number;
    severity: string;
  }>;
  redacted: boolean;
}

/**
 * Scan and optionally redact PII from LLM response text.
 */
export function sanitizePII(text: string): SanitizeResult {
  if (!isEnabled() || !text || typeof text !== "string") {
    return { text, detections: [], redacted: false };
  }

  const mode = getMode();
  const detections: SanitizeResult["detections"] = [];
  let sanitized = text;

  for (const pattern of PII_PATTERNS) {
    // Reset lastIndex for global regexes
    pattern.regex.lastIndex = 0;
    const matches = text.match(pattern.regex);
    if (matches && matches.length > 0) {
      detections.push({
        pattern: pattern.name,
        count: matches.length,
        severity: pattern.severity,
      });

      if (mode === "redact") {
        pattern.regex.lastIndex = 0;
        sanitized = sanitized.replace(pattern.regex, pattern.replacement);
      }
    }
  }

  if (detections.length > 0 && mode === "warn") {
    console.warn(
      `[PII] Detected PII in response: ${detections.map((d) => `${d.pattern}(${d.count})`).join(", ")}`
    );
  }

  return {
    text: mode === "redact" ? sanitized : text,
    detections,
    redacted: mode === "redact" && detections.length > 0,
  };
}

/**
 * Sanitize a streaming chunk (text content only).
 */
export function sanitizePIIChunk(chunk: string): string {
  if (!isEnabled()) return chunk;
  const { text } = sanitizePII(chunk);
  return text;
}

/**
 * Sanitize PII in a full response object (OpenAI-compatible format).
 */
export function sanitizePIIResponse(response: any): any {
  if (!isEnabled() || !response) return response;

  try {
    const choices = response.choices || [];
    for (const choice of choices) {
      if (choice.message?.content) {
        const result = sanitizePII(choice.message.content);
        choice.message.content = result.text;
      }
      if (choice.delta?.content) {
        const result = sanitizePII(choice.delta.content);
        choice.delta.content = result.text;
      }
    }
  } catch {
    // Fail open — don't break the response
  }

  return response;
}
