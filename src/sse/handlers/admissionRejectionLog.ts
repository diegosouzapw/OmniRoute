/**
 * Best-effort `call_logs` row for an admission rejection (413/503/499).
 *
 * Admission rejections return before dispatch, so without this call they leave
 * no server-side trace. The rejection response is returned untouched — the
 * reason is read from a `clone()` and every failure is swallowed, so logging
 * can never turn a rejection into a second failure. Fire-and-forget on
 * purpose: awaiting disk I/O here would hold the admission decision path.
 */
import { saveCallLog } from "@/lib/usageDb";
import { cloneLogPayload } from "@/lib/logPayloads";

export interface AdmissionRejectionLogEntry {
  path: string;
  model: string;
  requestBody: unknown;
  apiKeyId: string | null;
  apiKeyName: string | null;
  correlationId: string | null;
}

const FALLBACK_REASON = "unknown: admission_rejected";

export async function extractAdmissionRejectionReason(response: Response): Promise<string> {
  try {
    const rejectionBody = await response.clone().json();
    const code = rejectionBody?.error?.code;
    const message = rejectionBody?.error?.message;
    if (code || message) return `${code ?? "unknown"}: ${message ?? "admission_rejected"}`;
  } catch {}
  return FALLBACK_REASON;
}

export async function logAdmissionRejection(
  rejection: Response,
  entry: AdmissionRejectionLogEntry
): Promise<void> {
  try {
    const admissionError = await extractAdmissionRejectionReason(rejection);
    await saveCallLog({
      method: "POST",
      path: entry.path,
      status: rejection.status,
      model: entry.model,
      requestedModel: entry.model,
      provider: "-",
      duration: 0,
      error: admissionError,
      requestBody: cloneLogPayload(entry.requestBody) ?? null,
      apiKeyId: entry.apiKeyId,
      apiKeyName: entry.apiKeyName,
      correlationId: entry.correlationId,
      sessionTag: null,
    });
  } catch {}
}
