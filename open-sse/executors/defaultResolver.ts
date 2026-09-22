import { DefaultExecutor } from "./default.ts";
import { MuseCodeExecutor } from "./muse-code.ts";

const defaultExecutorCache = new Map<string, DefaultExecutor>();

/** Resolve the shared fallback executor without initializing the specialized executor registry. */
export function getDefaultExecutor(provider: string): DefaultExecutor {
  let executor = defaultExecutorCache.get(provider);
  if (!executor) {
    executor = provider === "muse-code" ? new MuseCodeExecutor() : new DefaultExecutor(provider);
    defaultExecutorCache.set(provider, executor);
  }
  return executor;
}
