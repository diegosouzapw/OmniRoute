import { Agent, Dispatcher, setGlobalDispatcher } from "undici";
import { createProxyDispatcher } from "@omniroute/open-sse/utils/proxyDispatcher.ts";
import { isDirectBypassHost } from "@omniroute/open-sse/utils/proxyDirectBypass.ts";
import { resolveEnvProxyUrl } from "@omniroute/open-sse/utils/proxyEnv.ts";

/** No proxyFetch import: its feature-flag graph initializes the server DB. */
class ExportProxyDispatcher extends Dispatcher {
  private readonly direct = new Agent();

  dispatch(options: Dispatcher.DispatchOptions, handler: Dispatcher.DispatchHandler): boolean {
    const origin = new URL(String(options.origin));
    const proxyUrl = isDirectBypassHost(origin.hostname) ? null : resolveEnvProxyUrl(origin.href);
    return (proxyUrl ? createProxyDispatcher(proxyUrl) : this.direct).dispatch(options, handler);
  }
}

/** Undici installs its native-fetch compatibility wrapper as well as its library dispatcher. */
export function installExportProxyDispatcher(): void {
  setGlobalDispatcher(new ExportProxyDispatcher());
}
