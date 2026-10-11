import { MockAgent, setGlobalDispatcher } from "undici";
import { Socket } from "node:net";

// Test-only network guard: no application imports, credentials, sockets or DNS.
// The global fetch seam catches catalog refreshes; MockAgent also blocks the
// native fetch captured by other modules before they install their wrappers.
const networkGuard = new MockAgent();
networkGuard.disableNetConnect();
setGlobalDispatcher(networkGuard);

export const unexpectedCatalogNetworkRequests: string[] = [];

// These handler-level regressions need no sockets, including loopback. This also
// catches transports with an explicit dispatcher that bypass MockAgent.
Socket.prototype.connect = function () {
  unexpectedCatalogNetworkRequests.push("node:net socket connection");
  throw new Error("#13389 regression forbids socket connections");
};

globalThis.fetch = async (input) => {
  const url = new URL(input instanceof Request ? input.url : String(input));
  unexpectedCatalogNetworkRequests.push(`${url.origin}${url.pathname}`);
  throw new Error("#13389 regression forbids external network requests");
};
