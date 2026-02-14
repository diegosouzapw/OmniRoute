/**
 * Input Sanitizer — FASE-01 Security Hardening
 *
 * Detects prompt injection patterns and redacts PII from LLM requests.
 * Configurable via environment variables or dashboard settings.
 *
 * @module inputSanitizer
 */

// ─── Prompt Injection Patterns ───────────────────────────────────────

/** @type {Array<{name: string, pattern: RegExp, severity: string}>} */
const INJECTION_PATTERNS = [
  {
    name: "system_override",
    pattern: /\b(ignore|disregard|forget)\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?|context)/i,
    severity: "high",
  },
  {
    name: "role_hijack",
    pattern: /\b(you\s+are\s+now|act\s+as\s+if|pretend\s+(to\s+be|you\s+are)|from\s+now\s+on\s+you\s+are)\b/i,
    severity: "medium",
  },
  {
    name: "system_prompt_leak",
    pattern: /\b(reveal|show|display|print|output|repeat)\s+(your\s+)?(system\s+prompt|instructions?|initial\s+prompt|hidden\s+prompt)/i,
    severity: "high",
  },
  {
    name: "delimiter_injection",
    pattern: /(\[SYSTEM\]|\[INST\]|<<SYS>>|<\|im_start\|>|<\|system\|>|<\|user\|>)/i,
    severity: "high",
  },
  {
    name: "jailbreak_dan",
    pattern: /\b(DAN|do\s+anything\s+now|jailbreak|developer\s+mode|enable\s+developer)\b/i,
    severity: "medium",
  },
  {
    name: "encoding_evasion",
    pattern: /\b(base64\s+decode|rot13|hex\s+decode|unicode\s+escape)\b.*\b(instruction|prompt|command)\b/i,
    severity: "medium",
  },
];

// ─── PII Patterns ────────────────────────────────────────────────────

/** @type {Array<{name: string, pattern: RegExp, replacement: string}>} */
const PII_PATTERNS = [
  {
    name: "email",
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: "[EMAIL_REDACTED]",
  },
  {
    name: "cpf",
    pattern: /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g,
    replacement: "[CPF_REDACTED]",
  },
  {
    name: "cnpj",
    pattern: /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g,
    replacement: "[CNPJ_REDACTED]",
  },
  {
    name: "credit_card",
    pattern: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    replacement: "[CARD_REDACTED]",
  },
  {
    name: "phone_br",
    pattern: /\b\(?\d{2}\)?\s?\d{4,5}-?\d{4}\b/g,
    replacement: "[PHONE_REDACTED]",
  },
  {
    name: "ssn_us",
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    replacement: "[SSN_REDACTED]",
  },
];

// ─── Configuration ────────────────────────────────────────────────────

/**
 * Get sanitizer configuration from environment.
 * @returns {{ enabled: boolean, mode: string, piiRedaction: boolean }}
 */
function getConfig() {
  return {
    enabled: process.env.INPUT_SANITIZER_ENABLED !== "false",
    mode: process.env.INPUT_SANITIZER_MODE || "warn", // "warn" | "block" | "redact"
    piiRedaction: process.env.PII_REDACTION_ENABLED === "true",
  };
}

// ─── Core Functions ───────────────────────────────────────────────────

/**
 * @typedef {Object} SanitizeResult
 * @property {boolean} blocked - Whether the request should be blocked
 * @property {boolean} modified - Whether the content was modified (PII redacted)
 * @property {Array<{pattern: string, severity: string, match: string}>} detections
 * @property {Array<{type: string, count: number}>} piiDetections
 * @property {Object} [sanitizedBody] - Modified body (if PII redaction active)
 */

/**
 * Extract all message content strings from a chat body.
 * Supports both `messages[]` (OpenAI/Claude) and `input[]` (Responses API).
 * @param {Object} body
 * @returns {string[]}
 */
function extractMessageContents(body) {
  const contents = [];

  const messages = body.messages || body.input || [];
  for (const msg of messages) {
    if (typeof msg === "string") {
      contents.push(msg);
    } else if (typeof msg.content === "string") {
      contents.push(msg.content);
    } else if (Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (typeof part === "string") {
          contents.push(part);
        } else if (part.text) {
          contents.push(part.text);
        }
      }
    }
  }

  // Also check system prompt
  if (typeof body.system === "string") {
    contents.push(body.system);
  } else if (Array.isArray(body.system)) {
    for (const s of body.system) {
      if (typeof s === "string") contents.push(s);
      else if (s.text) contents.push(s.text);
    }
  }

  return contents;
}

/**
 * Scan content for prompt injection patterns.
 * @param {string} text
 * @returns {Array<{pattern: string, severity: string, match: string}>}
 */
function detectInjection(text) {
  const detections = [];
  for (const rule of INJECTION_PATTERNS) {
    const match = text.match(rule.pattern);
    if (match) {
      detections.push({
        pattern: rule.name,
        severity: rule.severity,
        match: match[0].slice(0, 50), // truncate for logging
      });
    }
  }
  return detections;
}

/**
 * Scan and optionally redact PII from text.
 * @param {string} text
 * @param {boolean} redact - If true, replaces PII with placeholders
 * @returns {{ text: string, detections: Array<{type: string, count: number}> }}
 */
function processPII(text, redact = false) {
  const detections = [];
  let processed = text;

  for (const rule of PII_PATTERNS) {
    const matches = text.match(rule.pattern);
    if (matches && matches.length > 0) {
      detections.push({ type: rule.name, count: matches.length });
      if (redact) {
        processed = processed.replace(rule.pattern, rule.replacement);
      }
    }
  }

  return { text: processed, detections };
}

/**
 * Sanitize a chat request body.
 *
 * @param {Object} body - The chat completion request body
 * @param {Object} [logger] - Logger instance (defaults to console)
 * @returns {SanitizeResult}
 */
export function sanitizeRequest(body, logger = console) {
  const config = getConfig();

  const result = {
    blocked: false,
    modified: false,
    detections: [],
    piiDetections: [],
    sanitizedBody: null,
  };

  if (!config.enabled) return result;

  const contents = extractMessageContents(body);
  const fullText = contents.join("\n");

  // ── Prompt Injection Detection ──
  const injections = detectInjection(fullText);
  if (injections.length > 0) {
    result.detections = injections;

    const highSeverity = injections.filter((d) => d.severity === "high");
    const logLevel = highSeverity.length > 0 ? "warn" : "info";

    if (logger[logLevel]) {
      logger[logLevel](
        `[SANITIZER] Prompt injection detected: ${injections.map((d) => d.pattern).join(", ")}`
      );
    }

    if (config.mode === "block" && highSeverity.length > 0) {
      result.blocked = true;
      return result;
    }
  }

  // ── PII Detection / Redaction ──
  if (config.piiRedaction) {
    const piiResult = processPII(fullText, config.mode === "redact");
    result.piiDetections = piiResult.detections;

    if (piiResult.detections.length > 0) {
      logger.warn?.(
        `[SANITIZER] PII detected: ${piiResult.detections.map((d) => `${d.type}(${d.count})`).join(", ")}`
      );

      if (config.mode === "redact") {
        // Deep clone and replace message contents with redacted versions
        result.sanitizedBody = redactBody(body);
        result.modified = true;
      }
    }
  }

  return result;
}

/**
 * Deep clone body and replace message contents with PII-redacted versions.
 * @param {Object} body
 * @returns {Object}
 */
function redactBody(body) {
  const clone = JSON.parse(JSON.stringify(body));
  const messages = clone.messages || clone.input || [];

  for (const msg of messages) {
    if (typeof msg.content === "string") {
      msg.content = processPII(msg.content, true).text;
    } else if (Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (typeof part === "string") {
          const idx = msg.content.indexOf(part);
          msg.content[idx] = processPII(part, true).text;
        } else if (part.text) {
          part.text = processPII(part.text, true).text;
        }
      }
    }
  }

  if (typeof clone.system === "string") {
    clone.system = processPII(clone.system, true).text;
  }

  return clone;
}

// ─── Exports for Testing ──────────────────────────────────────────────

export { detectInjection, processPII, extractMessageContents, INJECTION_PATTERNS, PII_PATTERNS };
