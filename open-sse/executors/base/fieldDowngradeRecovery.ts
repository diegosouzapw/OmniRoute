// Reactive 400 field-downgrade (and auto-learn) retry, extracted verbatim in
// behavior from BaseExecutor.execute() (base.ts) to keep that file under its
// frozen size cap. On an upstream 400 that names an offending request field,
// the field is deleted from the live body and the SAME url is retried once per
// field; "Unsupported parameter" errors are optionally persisted to the
// provider's param blocklist (#6625).
import {
  getParamFilterConfig,
  addParamToBlocklist,
  isAutoLearnGloballyEnabled,
} from "@/lib/db/paramFilters";
import { HTTP_STATUS } from "../../config/constants.ts";
import { findOffendingField, detectUnsupportedParam } from "../../config/providerFieldStrips.ts";

type FieldDowngradeLog = {
  debug?: (tag: string, message: string) => void;
  info?: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
} | null;

export interface FieldDowngradeParams {
  response: Response;
  url: string;
  provider: string;
  model: string | undefined;
  /** Live request body; the offending field is deleted from it in place. */
  body: unknown;
  fetchOptions: RequestInit;
  fetchFn: (url: string, options: RequestInit) => Promise<Response>;
  /** Serializes (and, for Claude Code protocol, signs) the body before retrying. */
  serializeBody: (body: unknown) => string | Promise<string>;
  /** Fields already stripped in this execute() call (mutated). */
  strippedFields: Set<string>;
  log?: FieldDowngradeLog;
}

/** Auto-learn "Unsupported parameter" errors; null when no retry was issued. */
async function applyAutoLearnRecovery(
  params: FieldDowngradeParams,
  record: Record<string, unknown>,
  errText: string
): Promise<Response | null> {
  const { url, provider, model, body, fetchOptions, fetchFn, serializeBody, strippedFields, log } =
    params;
  let response: Response | null = null;
  const autoLearned = detectUnsupportedParam(errText);
  if (autoLearned && !strippedFields.has(autoLearned) && record[autoLearned] !== undefined) {
    try {
      const config = getParamFilterConfig(provider);
      const shouldAutoLearn = isAutoLearnGloballyEnabled() || config?.autoLearn === true;
      if (shouldAutoLearn) {
        strippedFields.add(autoLearned);
        addParamToBlocklist(provider, autoLearned, model);
        delete record[autoLearned];
        const retryBody = await serializeBody(body);
        log?.info?.(
          "AUTO_LEARN",
          `Auto-learned "${autoLearned}" for provider ${provider} (model: ${model}) from 400 on ${url} — retrying`
        );
        response = await fetchFn(url, { ...fetchOptions, body: retryBody });
      }
    } catch (learnError) {
      log?.warn?.(
        "AUTO_LEARN",
        `Failed to persist auto-learned param "${autoLearned}" for ${provider}: ${String(learnError)}`
      );
    }
  }
  return response;
}

/** Returns the response to use going forward (the retry's when one was issued). */
export async function applyFieldDowngradeRecovery(params: FieldDowngradeParams): Promise<Response> {
  const { url, fetchOptions, fetchFn, serializeBody, strippedFields, log } = params;
  const { response } = params;
  const body = params.body;
  if (response.status !== HTTP_STATUS.BAD_REQUEST || !body || typeof body !== "object") {
    return response;
  }
  const record = body as Record<string, unknown>;
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  const offending = findOffendingField(errText);
  if (offending && !strippedFields.has(offending) && record[offending] !== undefined) {
    strippedFields.add(offending);
    delete record[offending];
    const retryBody = await serializeBody(body);
    log?.debug?.("FIELD_400", `Upstream 400 rejected ${offending} on ${url} — retrying without it`);
    return fetchFn(url, { ...fetchOptions, body: retryBody });
  }
  return (await applyAutoLearnRecovery(params, record, errText)) ?? response;
}
