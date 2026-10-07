// Advisor-result 400 recovery, extracted from BaseExecutor.execute() (base.ts)
// to keep that file under its frozen size cap. When upstream answers 400 because
// it could not decrypt advisor results carried in the request, those results are
// replaced with an "unavailable" marker and the SAME url is retried once.
import { HTTP_STATUS } from "../../config/constants.ts";
import {
  isAdvisorUndecryptableError,
  replaceRedactedAdvisorResults,
} from "../../config/providerFieldStrips.ts";

type AdvisorRecoveryLog = { info?: (tag: string, message: string) => void } | null;

export interface AdvisorRecoveryParams {
  response: Response;
  url: string;
  body: unknown;
  fetchOptions: RequestInit;
  fetchFn: (url: string, options: RequestInit) => Promise<Response>;
  /** Serializes (and, for Claude Code protocol, signs) the body before retrying. */
  serializeBody: (body: unknown) => string | Promise<string>;
  log?: AdvisorRecoveryLog;
}

export interface AdvisorRecoveryResult {
  response: Response;
  /** The (possibly rewritten) body — callers must keep using this one. */
  body: unknown;
  /** True when advisor results were replaced and a retry was issued. */
  replaced: boolean;
}

export async function applyAdvisorUndecryptableRecovery(
  params: AdvisorRecoveryParams
): Promise<AdvisorRecoveryResult> {
  const { response, url, body, fetchOptions, fetchFn, serializeBody, log } = params;
  const unchanged = { response, body, replaced: false };
  if (response.status !== HTTP_STATUS.BAD_REQUEST || !body || typeof body !== "object") {
    return unchanged;
  }
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (!isAdvisorUndecryptableError(errText)) return unchanged;
  const { body: replacedBody, replaced } = replaceRedactedAdvisorResults(body);
  if (replaced <= 0) return unchanged;
  const retryBody = await serializeBody(replacedBody);
  log?.info?.(
    "ADVISOR_UNDECRYPTABLE",
    `Upstream 400 could not decrypt ${replaced} advisor result(s) on ${url}, retrying with them marked unavailable`
  );
  return {
    response: await fetchFn(url, { ...fetchOptions, body: retryBody }),
    body: replacedBody,
    replaced: true,
  };
}
