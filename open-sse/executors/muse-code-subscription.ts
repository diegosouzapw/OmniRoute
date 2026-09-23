import { DefaultExecutor } from "./default.ts";
import type {
  ExecuteInput,
  ExecutorExecuteResult,
  ProviderCredentials,
} from "./base.ts";
import { buildErrorBody } from "../utils/error.ts";
import {
  MUSE_SUBSCRIPTION_PROVIDER,
  MUSE_SUBSCRIPTION_RESPONSES_URL,
  MuseSubscriptionError,
  museSubscriptionHeaders,
  normalizeMuseResponsesRequest,
} from "../services/museCodeSubscription.ts";

/** Native Responses transport, not an invocation of the Muse coding agent. */
export class MuseCodeSubscriptionExecutor extends DefaultExecutor {
  constructor() {
    super(MUSE_SUBSCRIPTION_PROVIDER);
  }

  buildUrl() {
    // Never follow a per-connection URL or an alternate format onto API billing.
    return MUSE_SUBSCRIPTION_RESPONSES_URL;
  }

  buildHeaders(credentials: ProviderCredentials) {
    return museSubscriptionHeaders(credentials);
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ) {
    return normalizeMuseResponsesRequest(
      model,
      super.transformRequest(model, body, stream, credentials)
    );
  }

  async refreshCredentials() {
    // DCA expiry is NOT minted-key expiry. No OAuth refresh grant is established;
    // ask for a fresh device login on 401 instead of guessing an endpoint.
    return null;
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    try {
      museSubscriptionHeaders(input.credentials);
      const extraKeys = input.credentials.providerSpecificData?.extraApiKeys;
      if (Array.isArray(extraKeys) ? extraKeys.length > 0 : Boolean(extraKeys)) {
        throw new MuseSubscriptionError("Extra API keys are not supported for Muse subscriptions.", 400);
      }
      const result = await super.execute({
        ...input,
        stream: true,
        // This provider has one credential source and a fixed protocol. Do not
        // allow caller-supplied identity/auth overrides or generic key rotation.
        upstreamExtraHeaders: undefined,
        clientHeaders: undefined,
      });
      const response = result instanceof Response ? result : result.response;
      if (response.status === 401) {
        await response.body?.cancel();
        throw new MuseSubscriptionError("Muse Code login expired. Sign in again in Providers.", 401);
      }
      // Preserve 403/429/5xx and Retry-After for the existing account/routing logic.
      return result;
    } catch (error) {
      if (!(error instanceof MuseSubscriptionError)) throw error;
      return {
        response: Response.json(buildErrorBody(error.status, error.message), { status: error.status }),
        url: MUSE_SUBSCRIPTION_RESPONSES_URL,
        headers: {},
      };
    }
  }
}
