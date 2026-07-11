/**
 * Phase 4 — pluggable DLP pre-publish hook (fail-closed when configured to block).
 */

export type DlpVerdict = "allow" | "block" | "redact";

export interface DlpHookInput {
  title: string;
  body: string;
  projectId: string;
  departmentId?: string | null;
}

export interface DlpHookResult {
  verdict: DlpVerdict;
  title: string;
  body: string;
  reasons: string[];
}

export type DlpHook = (input: DlpHookInput) => DlpHookResult | Promise<DlpHookResult>;

let customHook: DlpHook | null = null;

/** Built-in DLP: block obvious private-key PEM blocks; otherwise allow. */
export function defaultDlpHook(input: DlpHookInput): DlpHookResult {
  const reasons: string[] = [];
  let title = input.title;
  let body = input.body;
  const pem = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;
  if (pem.test(title) || pem.test(body)) {
    return {
      verdict: "block",
      title,
      body,
      reasons: ["private_key_pem"],
    };
  }
  // Redact long hex secrets
  const hexSecret = /\b[a-f0-9]{64}\b/gi;
  if (hexSecret.test(body)) {
    body = body.replace(hexSecret, "[DLP_REDACTED]");
    reasons.push("hex_secret_redacted");
    return { verdict: "redact", title, body, reasons };
  }
  return { verdict: "allow", title, body, reasons };
}

export function setDlpHook(hook: DlpHook | null): void {
  customHook = hook;
}

export async function runDlpHook(input: DlpHookInput): Promise<DlpHookResult> {
  const hook = customHook ?? defaultDlpHook;
  return hook(input);
}
