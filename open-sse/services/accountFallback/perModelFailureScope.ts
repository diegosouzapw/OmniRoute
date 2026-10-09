/**
 * accountFallback/perModelFailureScope.ts — whether a NON-QUOTA failure should lock
 * one model instead of cooling the whole connection.
 *
 * Extracted from services/accountFallback.ts (file-size gate, #12334). A Claude
 * OAuth connection multiplexes Fable 5, Opus, Sonnet and Haiku behind one
 * credential, so a 404/5xx names one model. Quota is a separate question:
 * hasPerModelQuota("claude") is false and a 429 stays account-wide.
 */
import { resolveProviderId } from "../../../src/shared/constants/providers";
import { hasPerModelQuota } from "../accountFallback.ts";

// Bounded quantifiers keep this ReDoS-safe.
const MODEL_NOT_FOUND_404_REGEX =
  /model_not_found|model[^\n]{0,120}(?:does not exist|not found|is not available|do not have access)/i;

/**
 * #15633: a 404 whose body names a missing MODEL (e.g. Groq `model_not_found`) is
 * model-scoped for every provider — lock that model only, never the connection.
 * A bare endpoint/URL 404 carries no model wording and keeps the connection cooldown.
 */
export function isModelNotFound404(status: number | undefined, errorText: unknown): boolean {
  if (status !== 404) return false;
  const text = typeof errorText === "string" ? errorText : JSON.stringify(errorText ?? "");
  return MODEL_NOT_FOUND_404_REGEX.test(text);
}

function namesExactModel(
  text: string,
  marker: string,
  model: string,
  allowUrlSuffix = false
): boolean {
  const token = `${marker}${model}`;
  const index = text.indexOf(token);
  if (index < 0) return false;
  const following = text[index + token.length];
  return (
    following === undefined ||
    /[\s,;)]/.test(following) ||
    (allowUrlSuffix && /[?#]/.test(following))
  );
}

/** Only explicit attribution to the current model can narrow a 413/504 failure. */
export function isExplicitModelCapacityFailure(
  status: number | undefined,
  errorText: unknown,
  model: string | null | undefined
): boolean {
  if (!model || (status !== 413 && status !== 504)) return false;
  const text = (typeof errorText === "string" ? errorText : JSON.stringify(errorText ?? ""))
    .replace(/[`"']/g, "")
    .toLowerCase();
  const id = model.toLowerCase();
  if (status === 413) {
    return namesExactModel(text, "request too large for model ", id);
  }
  if (!/timeout|timed out/i.test(text)) return false;
  return (
    namesExactModel(text, `/models/${id}:`, "streamgeneratecontent", true) ||
    namesExactModel(text, `/models/${id}:`, "generatecontent", true) ||
    namesExactModel(text, "model ", id)
  );
}

/**
 * @param status - When 429, only per-model *quota* providers qualify. Omit for
 *   the non-quota question (404/5xx), which also includes Claude.
 */
export function hasPerModelFailureScope(
  provider: string | null | undefined,
  model: string | null | undefined = null,
  connectionPassthroughModels?: boolean,
  status?: number,
  errorText?: unknown
): boolean {
  if (
    isModelNotFound404(status, errorText) ||
    isExplicitModelCapacityFailure(status, errorText, model)
  )
    return true;
  if (status === 429) return hasPerModelQuota(provider, model, connectionPassthroughModels);
  if (hasPerModelQuota(provider, model, connectionPassthroughModels)) return true;
  if (typeof connectionPassthroughModels === "boolean") return connectionPassthroughModels;
  if (!provider) return false;
  return resolveProviderId(provider) === "claude";
}
