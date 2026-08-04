/**
 * CLIProxyAPI model-mapping application (#6876).
 *
 * The dashboard persists `cliproxyapiModelMapping` per provider
 * (`upstream_proxy_config.cliproxyapi_model_mapping`) but nothing at
 * request-dispatch time ever consulted it — the configured alias was
 * silently dropped and the original model was forwarded verbatim to
 * CLIProxyAPI. This module applies the mapping exactly once, at the
 * executor boundary, so it only affects requests that actually reach
 * CLIProxyAPI (the `cliproxyapi` passthrough leg and the CLIProxyAPI retry
 * leg of `fallback` mode) and never the native leg of `fallback` mode.
 */

type ExecutorInput = {
  model: string;
  body: unknown;
  [key: string]: unknown;
};

type ExecutorLike = {
  execute: (input: ExecutorInput) => Promise<unknown>;
  [key: string]: unknown;
};

export type CliproxyapiModelMapping = Record<string, unknown> | null | undefined;

function resolveMappedModel(model: string, mapping: CliproxyapiModelMapping): string | null {
  if (!mapping || typeof mapping !== "object") return null;
  const mapped = (mapping as Record<string, unknown>)[model];
  return typeof mapped === "string" && mapped.trim() ? mapped : null;
}

/**
 * Rewrites `input.model` (and `input.body.model` when body is a plain
 * object) to the mapped model, if one is configured for `input.model`.
 * Returns the original input unchanged when no mapping applies.
 */
export function applyCliproxyapiModelMapping(
  input: ExecutorInput,
  mapping: CliproxyapiModelMapping
): ExecutorInput {
  const mappedModel = resolveMappedModel(input.model, mapping);
  if (!mappedModel) return input;

  const body =
    input.body && typeof input.body === "object" && !Array.isArray(input.body)
      ? { ...(input.body as Record<string, unknown>), model: mappedModel }
      : input.body;

  return { ...input, model: mappedModel, body };
}

/**
 * Wraps an executor so every `execute()` call has the CLIProxyAPI model
 * mapping applied first. Returns the executor unchanged when no mapping is
 * configured (empty/absent mapping is a no-op, matching prior behavior).
 */
export function wrapExecutorWithCliproxyapiModelMapping<T extends ExecutorLike>(
  executor: T,
  mapping: CliproxyapiModelMapping
): T {
  if (!mapping || typeof mapping !== "object" || Object.keys(mapping).length === 0) {
    return executor;
  }
  const wrapped = Object.create(executor) as T;
  wrapped.execute = (input: ExecutorInput) =>
    executor.execute(applyCliproxyapiModelMapping(input, mapping));
  return wrapped;
}
