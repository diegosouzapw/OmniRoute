import { DefaultExecutor } from "./default.ts";

const defaultExecutorCache = new Map<string, DefaultExecutor>();

/** Resolve the shared fallback executor without initializing the specialized executor registry. */
export function getDefaultExecutor(provider: string): DefaultExecutor {
  let executor = defaultExecutorCache.get(provider);
  if (!executor) {
    executor = new DefaultExecutor(provider);
    defaultExecutorCache.set(provider, executor);
  }
  return executor;
}
