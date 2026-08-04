import {
  executeWithAnthropicThinkingSignatureRecovery,
  isAnthropicThinkingSignatureError,
} from "./passthroughHelpers.ts";

type ProviderExecution = {
  response: Response;
  url?: string;
  headers?: Headers | Record<string, string>;
  transformedBody?: unknown;
};

type ParsedError = {
  statusCode: number;
  message: string;
  retryAfterMs: number | null;
  responseBody: unknown;
  errorCode?: unknown;
  errorType?: unknown;
};

export type ThinkingSignatureRecoveryResult = {
  attempted: boolean;
  succeeded: boolean;
  execution: ProviderExecution | null;
  error: ParsedError | null;
  recoveryBody: unknown | null;
};

/**
 * Retry exactly once after Anthropic's explicit thinking-signature validation
 * error. The caller keeps all connection/provider resilience state untouched
 * until this request-scoped recovery has finished.
 */
export async function recoverAnthropicThinkingSignature(args: {
  provider?: string | null;
  statusCode: number;
  message: string;
  body: unknown;
  execute: (body: unknown) => Promise<ProviderExecution>;
  parseError: (response: Response) => Promise<ParsedError>;
}): Promise<ThinkingSignatureRecoveryResult> {
  if (
    !isAnthropicThinkingSignatureError({
      provider: args.provider,
      status: args.statusCode,
      message: args.message,
    })
  ) {
    return {
      attempted: false,
      succeeded: false,
      execution: null,
      error: null,
      recoveryBody: null,
    };
  }

  const firstFailure = {
    response: new Response(null, { status: args.statusCode }),
    status: args.statusCode,
    message: args.message,
  };
  const recovery = await executeWithAnthropicThinkingSignatureRecovery({
    provider: args.provider,
    body: args.body,
    execute: async (requestBody) => {
      if (requestBody === args.body) return firstFailure;
      return args.execute(requestBody);
    },
    getError: async (result) => {
      if (result === firstFailure) return { status: result.status, message: result.message };
      if (result.response.ok) return null;
      const details = await args.parseError(result.response.clone());
      return { status: details.statusCode, message: details.message };
    },
  });

  if (!recovery.retried) {
    return {
      attempted: false,
      succeeded: false,
      execution: null,
      error: null,
      recoveryBody: null,
    };
  }

  const execution = recovery.result as ProviderExecution;
  return {
    attempted: true,
    succeeded: execution.response.ok,
    execution,
    error: execution.response.ok ? null : await args.parseError(execution.response),
    recoveryBody: recovery.recoveryBody,
  };
}
