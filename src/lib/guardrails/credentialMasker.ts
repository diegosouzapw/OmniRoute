import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "./base";
import { getSettings } from "@/lib/db/settings";

/**
 * CredentialMaskerGuardrail — redacts well-known API-key / secret-token patterns
 * from the upstream payload (message content, tool-call arguments, tool results)
 * AND the provider response, so secrets are not leaked to providers or clients.
 *
 * Opt-in: enabled when CREDENTIAL_REDACTION_ENABLED=true (mirrors PII_REDACTION_ENABLED).
 * Patterns are provider-specific + conservative to avoid false positives.
 * Future: per-pipeline / per-provider scoping via GuardrailContext.
 */

export interface CredentialPattern {
  name: string;
  regex: RegExp;
  replacement: string;
}

export const CREDENTIAL_PATTERNS: CredentialPattern[] = [
  // ── LLM provider keys ──────────────────────────────────────────────────
  { name: "openai_proj", regex: /sk-proj-[A-Za-z0-9_-]{20,}/g, replacement: "[REDACTED:openai]" },
  { name: "openai", regex: /\bsk-[A-Za-z0-9]{48}\b/g, replacement: "[REDACTED:openai]" },
  {
    name: "anthropic",
    regex: /sk-ant-api[0-9]?-[A-Za-z0-9_-]{20,}/g,
    replacement: "[REDACTED:anthropic]",
  },
  {
    name: "anthropic_alt",
    regex: /sk-ant-[A-Za-z0-9_-]{20,}/g,
    replacement: "[REDACTED:anthropic]",
  },
  { name: "google", regex: /AIza[0-9A-Za-z_-]{35}/g, replacement: "[REDACTED:google]" },
  { name: "huggingface", regex: /hf_[A-Za-z0-9]{34}/g, replacement: "[REDACTED:hf]" },
  { name: "replicate", regex: /r8_[A-Za-z0-9]{37}/g, replacement: "[REDACTED:replicate]" },
  // ── VCS / SaaS tokens ──────────────────────────────────────────────────
  { name: "github", regex: /gh[pousr]_[A-Za-z0-9]{36,}/g, replacement: "[REDACTED:github]" },
  { name: "slack", regex: /xox[bpoa]-[A-Za-z0-9-]{10,}/g, replacement: "[REDACTED:slack]" },
  { name: "linear", regex: /lin_api_[A-Za-z0-9]{40}/g, replacement: "[REDACTED:linear]" },
  { name: "notion", regex: /secret_[A-Za-z0-9]{43}/g, replacement: "[REDACTED:notion]" },
  { name: "npm", regex: /npm_[A-Za-z0-9]{36}/g, replacement: "[REDACTED:npm]" },
  { name: "postman", regex: /PMAK-[a-f0-9]{8}-[a-f0-9]{32}/g, replacement: "[REDACTED:postman]" },
  {
    name: "discord",
    regex: /\b[MN][A-Za-z0-9]{23}\.[A-Za-z0-9]{6}\.[A-Za-z0-9]{27}\b/g,
    replacement: "[REDACTED:discord]",
  },
  // ── Payments ───────────────────────────────────────────────────────────
  {
    name: "stripe",
    regex: /(?:sk|rk)_(?:live|test)_[0-9a-zA-Z]{24,}/g,
    replacement: "[REDACTED:stripe]",
  },
  {
    name: "square",
    regex: /sq0(?:atp-[0-9A-Za-z_-]{22}|csp-[0-9A-Za-z_-]{43})/g,
    replacement: "[REDACTED:square]",
  },
  // ── Cloud / infra ──────────────────────────────────────────────────────
  { name: "aws_access_key", regex: /AKIA[0-9A-Z]{16}/g, replacement: "[REDACTED:aws]" },
  { name: "twilio", regex: /\bSK[0-9a-fA-F]{32}\b/g, replacement: "[REDACTED:twilio]" },
  {
    name: "sendgrid",
    regex: /SG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}/g,
    replacement: "[REDACTED:sendgrid]",
  },
  { name: "mailgun", regex: /key-[a-f0-9]{32}/g, replacement: "[REDACTED:mailgun]" },
  // ── Crypto / identity ──────────────────────────────────────────────────
  {
    name: "private_key",
    regex:
      /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/g,
    replacement: "[REDACTED:private_key]",
  },
  {
    name: "jwt",
    regex: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g,
    replacement: "[REDACTED:jwt]",
  },
  // ── Connection strings (creds embedded in URI) ─────────────────────────
  {
    name: "connection_string",
    regex: /(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis|amqp):\/\/[^:/@\s"']+:[^:/@\s"']+@/g,
    replacement: "[REDACTED:connection_string]",
  },
  // ── Header-style secrets ───────────────────────────────────────────────
  {
    name: "auth_header",
    regex:
      /((?:["\x27]?(?:Authorization|x-api-key|api-key|apikey)["\x27]?\s*[:=]\s*["\x27]?)(?:(?:Bearer|Basic|Token)\s+)?)[A-Za-z0-9._~+/=-]{10,}/gi,
    replacement: "$1[REDACTED:auth_header]",
  },
];

export interface CredentialRedactionResult {
  text: string;
  detections: Array<{ type: string; count: number }>;
  modified: boolean;
}

export function redactCredentials(text: string): CredentialRedactionResult {
  if (typeof text !== "string" || !text) return { text, detections: [], modified: false };
  let result = text;
  const detections: Array<{ type: string; count: number }> = [];
  for (const p of CREDENTIAL_PATTERNS) {
    p.regex.lastIndex = 0;
    const matches = result.match(p.regex);
    if (matches && matches.length > 0) {
      result = result.replace(p.regex, p.replacement);
      detections.push({ type: p.name, count: matches.length });
    }
  }
  return { text: result, detections, modified: result !== text };
}

type JsonRecord = Record<string, unknown>;

function isSensitiveHeaderKey(key: string): boolean {
  return ["authorization", "x-api-key", "api-key", "apikey"].includes(key.toLowerCase());
}

function redactHeaderValue(value: string): string {
  const schemePrefix = value.match(/^(\s*(?:(?:Bearer|Basic|Token)\s+)?)/i)?.[1] || "";
  return schemePrefix + "[REDACTED:auth_header]";
}

/** Redact values without cloning unchanged branches or non-plain objects. */
function walkValue(
  value: unknown,
  detections: Array<{ type: string; count: number }>,
  seen = new WeakSet<object>()
): { modified: boolean; value: unknown } {
  if (typeof value === "string") {
    const r = redactCredentials(value);
    if (r.detections.length) detections.push(...r.detections);
    return { modified: r.modified, value: r.text };
  }
  if (Array.isArray(value)) {
    if (seen.has(value)) return { modified: false, value };
    seen.add(value);
    let next: unknown[] | null = null;
    for (let index = 0; index < value.length; index++) {
      const r = walkValue(value[index], detections, seen);
      if (r.modified && !next) next = value.slice(0, index);
      if (next) next[index] = r.value;
    }
    seen.delete(value);
    return { modified: next !== null, value: next ?? value };
  }
  if (value && typeof value === "object") {
    if (seen.has(value)) return { modified: false, value };
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== null && prototype !== Object.prototype) return { modified: false, value };
    seen.add(value);
    const entries = Object.entries(value as JsonRecord);
    let next: JsonRecord | null = null;
    for (let index = 0; index < entries.length; index++) {
      const [key, entryValue] = entries[index];
      const structuredHeader = isSensitiveHeaderKey(key) && typeof entryValue === "string";
      const redactedHeader = structuredHeader ? redactHeaderValue(entryValue) : null;
      const r = structuredHeader
        ? { modified: redactedHeader !== entryValue, value: redactedHeader }
        : walkValue(entryValue, detections, seen);
      if (structuredHeader && r.modified) detections.push({ type: "auth_header", count: 1 });
      if (r.modified && !next) {
        next = Object.create(prototype) as JsonRecord;
        for (let previous = 0; previous < index; previous++) {
          const [previousKey, previousValue] = entries[previous];
          next[previousKey] = previousValue;
        }
      }
      if (next) next[key] = r.value;
    }
    seen.delete(value);
    return { modified: next !== null, value: next ?? value };
  }
  return { modified: false, value };
}

/** Walk request payloads without changing safe values. */
function redactPayload(
  payload: unknown,
  detections: Array<{ type: string; count: number }>
): { modified: boolean; payload: unknown } {
  const r = walkValue(payload, detections);
  return { modified: r.modified, payload: r.value };
}

/** Walk provider responses and redact credentials. */
function redactResponse(
  response: unknown,
  detections: Array<{ type: string; count: number }>
): { modified: boolean; response: unknown } {
  const r = walkValue(response, detections);
  return { modified: r.modified, response: r.value };
}
export class CredentialMaskerGuardrail extends BaseGuardrail {
  constructor(options: { enabled?: boolean; priority?: number } = {}) {
    super("credential-masker", { enabled: options.enabled, priority: options.priority ?? 95 });
  }

  async preCall(
    payload: unknown,
    _context: GuardrailContext
  ): Promise<GuardrailResult<unknown> | void> {
    const _s = await getSettings();
    if (!(
      _s.credentialRedactionEnabled === true || process.env.CREDENTIAL_REDACTION_ENABLED === "true"
    ))
      return { block: false };
    const detections: Array<{ type: string; count: number }> = [];
    const { modified, payload: next } = redactPayload(payload, detections);
    if (!modified) return { block: false };
    return {
      block: false,
      modifiedPayload: next,
      meta: { credentialsRedacted: detections, count: detections.reduce((n, d) => n + d.count, 0) },
    };
  }

  async postCall(
    response: unknown,
    _context: GuardrailContext
  ): Promise<GuardrailResult<unknown> | void> {
    const _s = await getSettings();
    if (!(
      _s.credentialRedactionEnabled === true || process.env.CREDENTIAL_REDACTION_ENABLED === "true"
    ))
      return { block: false };
    const detections: Array<{ type: string; count: number }> = [];
    const { modified, response: next } = redactResponse(response, detections);
    if (!modified) return { block: false };
    return {
      block: false,
      modifiedResponse: next,
      meta: { credentialsRedacted: detections, count: detections.reduce((n, d) => n + d.count, 0) },
    };
  }
}
