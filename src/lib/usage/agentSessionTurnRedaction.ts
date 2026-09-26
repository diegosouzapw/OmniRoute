/**
 * Applies to a stored agent session turn the same redaction the upstream and the client saw, so
 * GET /v1/me/sessions/{id}/messages never serves text the live traffic masked.
 *
 * - User text: the request PII masker (PII_REDACTION_ENABLED, processPII) and credential
 *   redaction, which the pre-call guardrails apply before the request leaves OmniRoute.
 * - Assistant text: response PII sanitization (PII_RESPONSE_SANITIZATION and its mode, the
 *   sanitizePII pass used by the post-call masker and the streaming transform) and credential
 *   redaction.
 *
 * Opt-in like the live paths (Hard Rule #20): with every flag off the turn is returned as is.
 */
import type { AgentSessionTurn } from "@omniroute/open-sse/handlers/chatCore/agentSessionTurn.ts";
import { isCredentialRedactionEnabled, redactCredentials } from "@/lib/guardrails/credentialMasker";
import { isRequestPiiMaskingEnabled } from "@/lib/guardrails/piiMasker";
import { sanitizePII } from "@/lib/piiSanitizer";
import { processPII } from "@/shared/utils/inputSanitizer";

type Redact = (text: string) => string;

function redactText(text: string | null, steps: Redact[]): string | null {
  return text ? steps.reduce((current, step) => step(current), text) : text;
}

export async function redactSessionTurn(
  turn: AgentSessionTurn | null | undefined
): Promise<AgentSessionTurn | null> {
  if (!turn) return null;
  const credentials: Redact[] = (await isCredentialRedactionEnabled())
    ? [(text) => redactCredentials(text).text]
    : [];
  const userSteps: Redact[] = isRequestPiiMaskingEnabled()
    ? [(text) => processPII(text, true).text, ...credentials]
    : credentials;
  const assistantSteps: Redact[] = [(text) => sanitizePII(text).text, ...credentials];
  return {
    ...turn,
    userText: redactText(turn.userText, userSteps),
    assistantText: redactText(turn.assistantText, assistantSteps),
  };
}
