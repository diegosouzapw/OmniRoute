import { getOneproxyProxyForRotation, markOneproxyProxyFailed } from "./db/oneproxy";
import type { OneproxyProxyRecord } from "./db/oneproxy";

let sequentialIndex = 0;

export async function rotateOneproxyProxy(options?: {
  strategy?: "random" | "quality" | "sequential";
}): Promise<OneproxyProxyRecord | null> {
  const strategy = options?.strategy || "quality";
  return getOneproxyProxyForRotation({ strategy });
}

export async function failOneproxyProxy(host: string, port: number): Promise<boolean> {
  return markOneproxyProxyFailed(host, port);
}

export function resetSequentialIndex(): void {
  sequentialIndex = 0;
}
