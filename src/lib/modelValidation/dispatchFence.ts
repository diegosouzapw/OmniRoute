import {
  BaseExecutor,
  type ExecuteInput,
  type ExecutorExecuteResult,
  type StrictValidationDispatch,
} from "../../../open-sse/executors/base.ts";
import { DefaultExecutor } from "../../../open-sse/executors/default.ts";
import { isCompatibleProviderConnectionId } from "../../shared/utils/compatibleProviderId";
import { ModelValidationError } from "./http";

interface ValidationExecutor {
  provider: string;
  execute: (input: ExecuteInput) => Promise<ExecutorExecuteResult>;
}

interface DispatchFenceOptions<T extends ValidationExecutor> {
  provider: string;
  modelId: string;
  connectionId: string;
  signal: AbortSignal;
  assertFresh: () => void;
  expectedExecutor: T;
  expectedCredentials?: ExecuteInput["credentials"];
}

function assertChosenCredentials(
  credentials: ExecuteInput["credentials"],
  options: Pick<DispatchFenceOptions<ValidationExecutor>, "connectionId" | "expectedCredentials">,
  reject: () => never
) {
  if (credentials?.connectionId !== options.connectionId) reject();
  for (const key of ["apiKey", "accessToken", "refreshToken"] as const) {
    if (
      options.expectedCredentials &&
      (credentials[key] ?? null) !== (options.expectedCredentials[key] ?? null)
    )
      reject();
  }
}

function matchesModel(body: unknown, modelId: string): boolean {
  if (typeof body !== "string") return false;
  try {
    const parsed: unknown = JSON.parse(body);
    return !!parsed && typeof parsed === "object" && "model" in parsed && parsed.model === modelId;
  } catch {
    return false;
  }
}

function matchesBearer(headers: HeadersInit | undefined, credentials: ExecuteInput["credentials"]) {
  const actual = new Headers(headers);
  const token = credentials?.apiKey || credentials?.accessToken;
  return (
    !!token &&
    actual.get("authorization") === `Bearer ${token}` &&
    !actual.has("x-api-key") &&
    !actual.has("api-key")
  );
}

function assertAuditedExecutor(executor: ValidationExecutor): void {
  const execute = executor.execute;
  const prototype = Object.getPrototypeOf(executor);
  const providerSupported =
    executor.provider === "openai" ||
    (executor.provider.startsWith("openai-compatible-") &&
      isCompatibleProviderConnectionId(executor.provider));
  const audited =
    providerSupported &&
    ((executor.constructor === BaseExecutor &&
      prototype === BaseExecutor.prototype &&
      execute === BaseExecutor.prototype.execute) ||
      (executor.constructor === DefaultExecutor &&
        prototype === DefaultExecutor.prototype &&
        execute === DefaultExecutor.prototype.execute));
  if (!audited)
    throw new ModelValidationError(
      422,
      "VALIDATION_EXECUTOR_UNSUPPORTED",
      "This executor does not support strict model validation"
    );
}

/** Trusted, in-process capability: never constructed from a body/header field. */
export function createValidationDispatchFence<T extends ValidationExecutor>(
  options: DispatchFenceOptions<T>
) {
  let dispatched = 0;
  let entered = false;
  let violated = false;
  function reject(): never {
    violated = true;
    throw new ModelValidationError(
      409,
      "VALIDATION_DISPATCH_MISMATCH",
      "Strict validation dispatch could not be verified"
    );
  }
  const validationDispatch: StrictValidationDispatch = {
    reject,
    beforeFetch(details) {
      if (
        violated ||
        dispatched !== 0 ||
        details.provider !== options.provider ||
        details.model !== options.modelId
      )
        reject();
      options.signal.throwIfAborted();
      options.assertFresh();
      assertChosenCredentials(details.credentials, options, reject);
      if (
        !matchesBearer(details.headers, options.expectedCredentials) ||
        !matchesModel(details.body, options.modelId)
      )
        reject();
      dispatched++;
    },
  };
  return {
    wrap(executor: T): T {
      if (executor !== options.expectedExecutor || executor.provider !== options.provider) reject();
      assertAuditedExecutor(executor);
      return new Proxy(executor, {
        get(target, property) {
          if (property === "refreshCredentials") return async () => reject();
          if (property === "execute")
            return async (input: ExecuteInput) => {
              if (
                violated ||
                entered ||
                input.model !== options.modelId ||
                input.credentials?.connectionId !== options.connectionId
              )
                reject();
              options.signal.throwIfAborted();
              options.assertFresh();
              assertChosenCredentials(input.credentials, options, reject);
              entered = true;
              return target.execute({
                ...input,
                validationDispatch,
                skipUpstreamRetry: true,
                signal: input.signal
                  ? AbortSignal.any([input.signal, options.signal])
                  : options.signal,
              });
            };
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
    assertDispatched() {
      if (violated || dispatched !== 1) reject();
      options.signal.throwIfAborted();
      options.assertFresh();
    },
  };
}
