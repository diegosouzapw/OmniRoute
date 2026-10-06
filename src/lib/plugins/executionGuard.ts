import { AsyncLocalStorage } from "node:async_hooks";

interface PluginExecutionGuard {
  assertIdle(): void;
  reject(): never;
}

const requestGuard = new AsyncLocalStorage<PluginExecutionGuard>();

/** Internal request capability; never derived from request headers or JSON fields. */
export function withPluginExecutionGuard<T>(guard: PluginExecutionGuard, operation: () => T): T {
  return requestGuard.run(guard, operation);
}

/** Strict requests may proceed only with no configured/runtime plugin to initialize. */
export function canInitializeRequestPlugins(): boolean {
  const guard = requestGuard.getStore();
  if (!guard) return true;
  guard.assertIdle();
  return false;
}

/** Call immediately before a real handler, outside catches that normally ignore plugin errors. */
export function assertPluginHandlerAllowed(): void {
  requestGuard.getStore()?.reject();
}

/** Re-check the latched policy at each dispatch and before receipt persistence. */
export function assertRequestPluginsIdle(): void {
  requestGuard.getStore()?.assertIdle();
}
