import {
  BaseExecutor,
  type ExecuteInput,
  type ExecutorExecuteResult,
  type ExecutorLog,
  type ProviderConfig,
  type ProviderCredentials,
} from "./base.ts";
import { errorResponse } from "../utils/error.ts";
import { resolveFactoryApiBase, resolveFactoryModelContract } from "../config/factory.ts";
import { buildFactoryHeaders, FactoryError, transformFactoryRequest } from "./factory/request.ts";
import { normalizeFactoryCompletionResponse } from "./factory/completionResponse.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";

export class FactoryExecutor extends BaseExecutor {
  constructor(provider = "factory", config?: ProviderConfig) {
    super(
      provider,
      config || {
        id: "factory",
        format: "openai",
        baseUrl: "https://api.factory.ai",
      }
    );
  }

  override buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ): string {
    void stream;
    void urlIndex;
    const contract = resolveFactoryModelContract(model);
    if (!contract) {
      throw new FactoryError(
        400,
        `Unsupported model for Factory provider: ${model}`,
        "invalid_request_error",
        "model_not_found"
      );
    }
    const base = resolveFactoryApiBase(credentials?.providerSpecificData);
    return `${base}${contract.path}`;
  }

  override buildHeaders(
    credentials: ProviderCredentials,
    stream = true,
    clientHeaders?: Record<string, string> | null,
    model?: string,
    health?: unknown,
    body?: unknown
  ): Record<string, string> {
    void health;
    void body;
    const effectiveModel = model || "";
    const contract = resolveFactoryModelContract(effectiveModel);
    return buildFactoryHeaders(
      credentials as Record<string, unknown>,
      stream,
      clientHeaders,
      contract,
      this.config.headers
    );
  }

  override transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const contract = resolveFactoryModelContract(model);
    if (!contract) {
      throw new FactoryError(
        400,
        `Unsupported model for Factory provider: ${model}`,
        "invalid_request_error",
        "model_not_found"
      );
    }
    return transformFactoryRequest(
      model,
      body,
      stream,
      credentials as Record<string, unknown>,
      contract
    );
  }

  override async refreshCredentials(
    credentials: ProviderCredentials,
    log: ExecutorLog | null
  ): Promise<Partial<ProviderCredentials> | null> {
    if (!credentials?.refreshToken) {
      log?.warn?.(
        "TOKEN_REFRESH",
        "Factory: no refresh token available, re-authentication required"
      );
      return null;
    }

    try {
      const refreshed = await getAccessToken(
        "factory",
        credentials as Record<string, unknown>,
        log
      );
      if (!refreshed) return null;
      return refreshed as Partial<ProviderCredentials>;
    } catch (error) {
      log?.error?.(
        "TOKEN_REFRESH",
        `Factory credential refresh failed: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    }
  }

  override needsRefresh(credentials?: ProviderCredentials | null): boolean {
    if (!credentials?.accessToken && credentials?.refreshToken) {
      return true;
    }
    return super.needsRefresh(credentials);
  }

  override async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const contract = resolveFactoryModelContract(input.model);
    if (!contract) {
      return errorResponse(400, `Unsupported model for Factory provider: ${input.model}`, {
        type: "invalid_request_error",
        code: "model_not_found",
      });
    }

    try {
      const result = await super.execute(input);

      // Override execute only to repair Factory Chat after super.execute; keep result metadata; other families unchanged.
      if (contract.targetFormat === "openai") {
        const tools = (input.body as Record<string, unknown> | null)?.tools;
        if (result instanceof Response) {
          return await normalizeFactoryCompletionResponse(result, input.model, tools, input.signal);
        }
        if (result && typeof result === "object" && "response" in result) {
          const repairedResponse = await normalizeFactoryCompletionResponse(
            result.response,
            input.model,
            tools,
            input.signal
          );
          return {
            ...result,
            response: repairedResponse,
          };
        }
      }

      return result;
    } catch (error) {
      if (
        error instanceof FactoryError ||
        ((error as Record<string, unknown>)?.status === 400 &&
          (error as Record<string, unknown>)?.type === "invalid_request_error")
      ) {
        const err = error as FactoryError;
        return errorResponse(err.status || 400, err.message, {
          type: err.type || "invalid_request_error",
          code: err.code || "bad_request",
        });
      }
      throw error;
    }
  }
}

export default FactoryExecutor;
