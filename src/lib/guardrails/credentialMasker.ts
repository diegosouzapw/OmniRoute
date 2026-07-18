import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "./base";

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
  { name: "anthropic", regex: /sk-ant-api[0-9]?-[A-Za-z0-9_-]{20,}/g, replacement: "[REDACTED:anthropic]" },
  { name: "anthropic_alt", regex: /sk-ant-[A-Za-z0-9_-]{20,}/g, replacement: "[REDACTED:anthropic]" },
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
  { name: "discord", regex: /\b[MN][A-Za-z0-9]{23}\.[A-Za-z0-9]{6}\.[A-Za-z0-9]{27}\b/g, replacement: "[REDACTED:discord]" },
  // ── Payments ───────────────────────────────────────────────────────────
  { name: "stripe", regex: /(?:sk|rk)_(?:live|test)_[0-9a-zA-Z]{24,}/g, replacement: "[REDACTED:stripe]" },
  { name: "square", regex: /sq0(?:atp-[0-9A-Za-z_-]{22}|csp-[0-9A-Za-z_-]{43})/g, replacement: "[REDACTED:square]" },
  // ── Cloud / infra ──────────────────────────────────────────────────────
  { name: "aws_access_key", regex: /AKIA[0-9A-Z]{16}/g, replacement: "[REDACTED:aws]" },
  { name: "twilio", regex: /\bSK[0-9a-fA-F]{32}\b/g, replacement: "[REDACTED:twilio]" },
  { name: "sendgrid", regex: /SG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}/g, replacement: "[REDACTED:sendgrid]" },
  { name: "mailgun", regex: /key-[a-f0-9]{32}/g, replacement: "[REDACTED:mailgun]" },
  // ── Crypto / identity ──────────────────────────────────────────────────
  { name: "private_key", regex: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/g, replacement: "[REDACTED:private_key]" },
  { name: "jwt", regex: /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, replacement: "[REDACTED:jwt]" },
  // ── Connection strings (creds embedded in URI) ─────────────────────────
  { name: "connection_string", regex: /(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis|amqp):\/\/[^:/@\s"']+:[^:/@\s"']+@/g, replacement: "[REDACTED:connection_string]" },
  // ── Header-style secrets ───────────────────────────────────────────────
  { name: "auth_header", regex: /(?:Authorization|x-api-key):\s*(?:Bearer\s+)?[A-Za-z0-9._-]{20,}/gi, replacement: "[REDACTED:auth_header]" },
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

function isEnabled(): boolean {
  return process.env.CREDENTIAL_REDACTION_ENABLED === "true";
}

/** Recursively redact credential strings inside any value (string/array/object). */
function walkValue(value: unknown, detections: Array<{ type: string; count: number }>): { modified: boolean; value: unknown } {
  if (typeof value === "string") {
    const r = redactCredentials(value);
    if (r.detections.length) detections.push(...r.detections);
    return { modified: r.modified, value: r.text };
  }
  if (Array.isArray(value)) {
    let modified = false;
    const next = value.map((entry) => {
      const r = walkValue(entry, detections);
      if (r.modified) modified = true;
      return r.value;
    });
    return { modified, value: next };
  }
  if (value && typeof value === "object") {
    let modified = false;
    const next: JsonRecord = {};
    for (const [k, v] of Object.entries(value as JsonRecord)) {
      const r = walkValue(v, detections);
      if (r.modified) modified = true;
      next[k] = r.value;
    }
    return { modified, value: next };
  }
  return { modified: false, value };
}

/** Walk an OpenAI-style chat payload (messages/input/prompt) and redact credentials. */
function redactPayload(payload: unknown, detections: Array<{ type: string; count: number }>): { modified: boolean; payload: unknown } {
  if (!payload || typeof payload !== "object") return { modified: false, payload };
  const clone = JSON.parse(JSON.stringify(payload)) as JsonRecord;
  let modified = false;
  if (Array.isArray(clone.messages)) {
    const r = walkValue(clone.messages, detections);
    if (r.modified) { modified = true; clone.messages = r.value; }
  }
  if (Array.isArray(clone.input)) {
    const r = walkValue(clone.input, detections);
    if (r.modified) { modified = true; clone.input = r.value; }
  }
  for (const k of ["prompt", "query", "text", "input_text"] as const) {
    if (typeof clone[k] === "string") {
      const r = redactCredentials(clone[k] as string);
      if (r.modified) { modified = true; clone[k] = r.text; detections.push(...r.detections); }
    }
  }
  return { modified, payload: clone };
}

/** Walk a provider response and redact credentials. */
function redactResponse(response: unknown, detections: Array<{ type: string; count: number }>): { modified: boolean; response: unknown } {
  if (!response || typeof response !== "object") return { modified: false, response };
  const clone = JSON.parse(JSON.stringify(response)) as JsonRecord;
  const r = walkValue(clone, detections);
  return { modified: r.modified, response: r.value };
}

export class CredentialMaskerGuardrail extends BaseGuardrail {
  constructor(options: { enabled?: boolean; priority?: number } = {}) {
    super("credential-masker", { enabled: options.enabled ?? isEnabled(), priority: options.priority ?? 95 });
  }

  async preCall(payload: unknown, _context: GuardrailContext): Promise<GuardrailResult<unknown> | void> {
    if (!this.enabled) return { block: false };
    const detections: Array<{ type: string; count: number }> = [];
    const { modified, payload: next } = redactPayload(payload, detections);
    if (!modified) return { block: false };
    return {
      block: false,
      modifiedPayload: next,
      meta: { credentialsRedacted: detections, count: detections.reduce((n, d) => n + d.count, 0) },
    };
  }

  async postCall(response: unknown, _context: GuardrailContext): Promise<GuardrailResult<unknown> | void> {
    if (!this.enabled) return { block: false };
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
