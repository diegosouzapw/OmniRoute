/**
 * CLIProxyAPI dedicated-credential resolution (#7645).
 *
 * CLIProxyAPI requires its own separately-configured `api-keys:` credential
 * and rejects any other token with 401. Before this fix, both the direct
 * `mode: "cliproxyapi"` passthrough leg and the `mode: "fallback"` retry leg
 * (`open-sse/handlers/chatCore/executorProxy.ts::resolveExecutorWithProxy`)
 * reused the resolved connection's own credentials — the native provider's
 * key — as the Authorization header sent to CLIProxyAPI, making the fallback
 * path a permanent no-op for every provider configured this way.
 *
 * This module resolves and applies the dedicated `cliproxyapi_api_key`
 * setting at the executor boundary, so `CliproxyapiExecutor` itself stays
 * credential-source-agnostic (it just uses whatever `credentials` it's
 * handed — see `buildHeaders()`).
 */

import type { ProviderCredentials } from "../../executors/base.ts";

type ExecutorInput = {
  credentials: ProviderCredentials;
  [key: string]: unknown;
};

type ExecutorLike = {
  execute: (input: ExecutorInput) => Promise<unknown>;
  [key: string]: unknown;
};

/**
 * Reads the dedicated CLIProxyAPI key out of a settings blob (as returned by
 * `getCachedSettings()`), trimmed and normalized to `null` when absent/blank.
 */
export function resolveDedicatedCliproxyapiApiKey(
  settings: Record<string, unknown> | null | undefined
): string | null {
  const raw = settings?.cliproxyapi_api_key;
  return typeof raw === "string" && raw.trim() ? raw.trim() : null;
}

/**
 * Builds the credentials to use for a CLIProxyAPI-bound request. When a
 * dedicated key is configured it always wins — CLIProxyAPI is a single
 * shared instance serving every provider, so the resolved connection's own
 * (provider-specific, and possibly already-failed) credential is never the
 * right token for it. Falls back to the connection's own credentials only
 * when no dedicated key is configured, preserving the pre-existing behavior
 * for operators who previously worked around this by pasting a valid
 * CLIProxyAPI key into the connection's own `apiKey` field.
 */
export function resolveCliproxyapiCredentials(
  connectionCredentials: ProviderCredentials,
  dedicatedApiKey: string | null
): ProviderCredentials {
  if (!dedicatedApiKey) return connectionCredentials;
  return { ...connectionCredentials, apiKey: dedicatedApiKey, accessToken: undefined };
}

/**
 * Wraps an executor so every `execute()` call is routed with the dedicated
 * CLIProxyAPI credential substituted in when one is configured. No-op
 * wrapper when no dedicated key is set (returns the executor unchanged).
 */
export function wrapExecutorWithCliproxyapiCredentials<T extends ExecutorLike>(
  executor: T,
  dedicatedApiKey: string | null
): T {
  if (!dedicatedApiKey) return executor;
  const wrapped = Object.create(executor) as T;
  wrapped.execute = (input: ExecutorInput) =>
    executor.execute({
      ...input,
      credentials: resolveCliproxyapiCredentials(input.credentials, dedicatedApiKey),
    });
  return wrapped;
}
