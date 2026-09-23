import { handleChatCore } from "../../../open-sse/handlers/chatCore.ts";
import { getExecutor } from "../../../open-sse/executors/index.ts";
import { getProviderCredentials } from "../../sse/services/auth";
import { checkPipelineGates } from "../../sse/handlers/chatHelpers";
import * as log from "../../sse/utils/logger";
import { getSettings } from "../db/settings";
import { getProviderConnectionById } from "../db/providers";
import { assertValidationSnapshot, type ValidationSnapshot } from "../db/validatedModels";
import { createValidationDispatchFence } from "./dispatchFence";
import { assertSelectedCredentialsCurrent } from "./credentials";
import { assertRequestPluginsIdle } from "../plugins/executionGuard";
import { isConnectionUnavailableToAuxiliaryActivity } from "../exclusiveLeaseIsolation";
import { ModelValidationError, type ValidationInput } from "./http";
import { abortable, readProof, proofFailed, deadline } from "./proofs";

async function selectStrictCredentials(
  input: ValidationInput,
  selectCredentials: typeof getProviderCredentials
) {
  if (await checkPipelineGates(input.provider, input.modelId)) {
    throw new ModelValidationError(
      409,
      "VALIDATION_CONNECTION_UNAVAILABLE",
      "Selected provider is unavailable"
    );
  }
  const credentials = await selectCredentials(
    input.provider,
    null,
    [input.connectionId],
    input.modelId
  );
  if (
    !credentials ||
    !("connectionId" in credentials) ||
    !("provider" in credentials) ||
    (!("apiKey" in credentials) && !("accessToken" in credentials)) ||
    credentials.connectionId !== input.connectionId ||
    credentials.provider !== input.provider
  )
    proofFailed();
  const apiKey = "apiKey" in credentials ? credentials.apiKey : undefined;
  const accessToken = "accessToken" in credentials ? credentials.accessToken : undefined;
  if (![apiKey, accessToken].some((token) => typeof token === "string" && token.trim()))
    proofFailed();
  if (await isConnectionUnavailableToAuxiliaryActivity(input.connectionId)) {
    throw new ModelValidationError(
      409,
      "VALIDATION_CONNECTION_UNAVAILABLE",
      "Selected connection is unavailable"
    );
  }
  const stored = await getProviderConnectionById(input.connectionId);
  if (!stored) proofFailed();
  await assertSelectedCredentialsCurrent(input.provider, credentials, stored);
  return credentials;
}

function credentialsChanged(): never {
  throw new ModelValidationError(
    409,
    "VALIDATION_CONFIG_CHANGED",
    "Credentials changed during validation"
  );
}

/** Internal envelope boundary: a raw pipeline Response is never a completed proof. */
export function requireProofResponse(result: Awaited<ReturnType<typeof handleChatCore>>): Response {
  if (result instanceof Response || !result.success || !result.response) proofFailed();
  return result.response;
}

export async function createProofRunner(
  input: ValidationInput,
  snapshot: ValidationSnapshot,
  signal: AbortSignal,
  // Internal provider-selection boundary for deterministic cancellation tests.
  // Never supplied by the route, request body, headers or CLI.
  selectCredentials: typeof getProviderCredentials = getProviderCredentials
) {
  const settings = await getSettings();
  const expectedExecutor = await getExecutor(input.provider);
  return async (
    messages: Array<Record<string, unknown>>,
    stream: boolean,
    extra: Record<string, unknown> = {}
  ) => {
    const stage = deadline(signal, 20_000);
    const stageSignal = stage.signal;
    try {
      assertValidationSnapshot(snapshot);
      const credentials = await abortable(
        selectStrictCredentials(input, selectCredentials),
        stageSignal
      );
      const fence = createValidationDispatchFence({
        ...input,
        signal: stageSignal,
        expectedExecutor,
        expectedCredentials: credentials,
        assertFresh: () => {
          assertRequestPluginsIdle();
          assertValidationSnapshot(snapshot);
        },
      });
      const body = {
        model: input.modelId,
        messages: structuredClone(messages),
        stream,
        max_tokens: 128,
        ...extra,
      };
      const result = await abortable(
        handleChatCore({
          body,
          modelInfo: { provider: input.provider, model: input.modelId, apiFormat: input.apiFormat },
          credentials,
          log,
          connectionId: input.connectionId,
          clientRawRequest: {
            body,
            headers: {},
            signal: stageSignal,
            endpoint: "/v1/chat/completions",
          },
          userAgent: "OmniRoute-Model-Validation/1",
          cachedSettings: { ...settings, semanticCacheEnabled: false },
          modelPinned: true,
          skipUpstreamRetry: true,
          validationExecutorFence: fence.wrap,
          onCredentialsRefreshed: credentialsChanged,
          onRequestSuccess: undefined,
          onStreamFailure: undefined,
          onDisconnect: undefined,
          comboName: undefined,
        }),
        stageSignal
      );
      fence.assertDispatched();
      const proof = await readProof(requireProofResponse(result), stageSignal, stream);
      fence.assertDispatched();
      return proof;
    } finally {
      stage.clear();
    }
  };
}

export type ProofRunner = Awaited<ReturnType<typeof createProofRunner>>;
