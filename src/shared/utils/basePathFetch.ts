/**
 * Install a same-origin fetch + EventSource rewrite for Next.js basePath deploys.
 *
 * Pattern mirrors `installDashboardCsrfFetch` (ref-counted global wrap).
 * Only activates when `NEXT_PUBLIC_OMNIROUTE_BASE_PATH` / `OMNIROUTE_BASE_PATH` is set.
 */

import { getDeployBasePath, withBasePath } from "./basePath";

let originalFetch: typeof fetch | null = null;
let originalEventSource: typeof EventSource | null = null;
let installCount = 0;

export function __resetBasePathFetchForTests(): void {
  if (originalFetch) {
    globalThis.fetch = originalFetch;
    originalFetch = null;
  }
  if (originalEventSource && typeof window !== "undefined") {
    window.EventSource = originalEventSource;
    originalEventSource = null;
  }
  installCount = 0;
}

function rewriteInput(input: RequestInfo | URL, basePath: string): RequestInfo | URL {
  if (typeof input === "string") {
    return withBasePath(input, basePath);
  }
  if (typeof URL !== "undefined" && input instanceof URL) {
    return new URL(withBasePath(input.href, basePath));
  }
  if (typeof Request !== "undefined" && input instanceof Request) {
    const rewritten = withBasePath(input.url, basePath);
    if (rewritten === input.url) return input;
    return new Request(rewritten, input);
  }
  return input;
}

/**
 * Wrap `globalThis.fetch` (and `EventSource` in the browser) so absolute
 * same-origin app paths receive the Next.js basePath prefix.
 *
 * No-op when basePath is empty (root deploys). Safe to call multiple times;
 * uninstall when the last consumer unmounts.
 */
export function installBasePathFetch(
  basePath: string = getDeployBasePath()
): () => void {
  if (!basePath) return () => {};
  if (typeof globalThis.fetch !== "function") return () => {};

  if (installCount === 0) {
    originalFetch = globalThis.fetch.bind(globalThis);

    globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
      if (!originalFetch) return fetch(input, init);
      return originalFetch(rewriteInput(input, basePath), init);
    }) as typeof fetch;

    if (typeof window !== "undefined" && typeof window.EventSource === "function") {
      originalEventSource = window.EventSource;
      const BaseES = originalEventSource;

      // Subclass so `instanceof EventSource` and prototype methods keep working.
      class BasePathEventSource extends BaseES {
        constructor(url: string | URL, eventSourceInitDict?: EventSourceInit) {
          const raw = typeof url === "string" ? url : url.toString();
          super(withBasePath(raw, basePath), eventSourceInitDict);
        }
      }

      window.EventSource = BasePathEventSource as typeof EventSource;
    }
  }

  installCount++;
  let active = true;

  return () => {
    if (!active) return;
    active = false;
    installCount = Math.max(0, installCount - 1);
    if (installCount === 0) {
      if (originalFetch) {
        globalThis.fetch = originalFetch;
        originalFetch = null;
      }
      if (originalEventSource && typeof window !== "undefined") {
        window.EventSource = originalEventSource;
        originalEventSource = null;
      }
    }
  };
}
