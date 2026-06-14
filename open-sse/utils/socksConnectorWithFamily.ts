import { Agent, buildConnector, type Dispatcher } from "undici";
import { SocksClient, type SocksProxy } from "socks";

/** The net.connect family options pinned for the SOCKS proxy hop. */
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}

function resolvePort(protocol: string, port: string): number {
  return port ? Number.parseInt(port, 10) : protocol === "http:" ? 80 : 443;
}

/**
 * Undici connector that tunnels through a single SOCKS5 proxy, pinning the family
 * of the TCP connection to the proxy host when `family` is set. Mirrors fetch-socks'
 * socksConnector but threads `socket_options` (which fetch-socks does not expose)
 * into SocksClient so Happy Eyeballs cannot pick IPv4 for an IPv6-only egress policy.
 */
function socksConnectorWithFamily(
  proxy: SocksProxy,
  family: 4 | 6 | null,
  tlsOpts: buildConnector.BuildOptions = {}
): buildConnector.connector {
  const undiciConnect = buildConnector(tlsOpts);
  const socketOptions = buildSocksFamilySocketOptions(family);
  return async (options, callback) => {
    const { protocol, hostname, port, httpSocket } = options as unknown as {
      protocol: string;
      hostname: string;
      port: string;
      httpSocket?: unknown;
    };
    try {
      const r = await SocksClient.createConnection({
        command: "connect",
        proxy,
        timeout: 10_000,
        destination: { host: hostname, port: resolvePort(protocol, port) },
        existing_socket: httpSocket as never,
        socket_options: socketOptions as never,
      });
      const sock = r.socket;
      if (protocol !== "https:") {
        return callback(null, (sock as { setNoDelay: () => unknown }).setNoDelay() as never);
      }
      return undiciConnect({ ...options, httpSocket: sock } as never, callback);
    } catch (error) {
      return callback(error as Error, null);
    }
  };
}

/** Build an undici Agent dispatcher that SOCKS5-tunnels with a pinned proxy-hop family. */
export function createSocksDispatcherWithFamily(
  proxy: SocksProxy,
  family: 4 | 6 | null,
  agentOptions: Agent.Options = {}
): Dispatcher {
  const { connect, ...rest } = agentOptions as Agent.Options & {
    connect?: buildConnector.BuildOptions;
  };
  return new Agent({
    ...rest,
    connect: socksConnectorWithFamily(proxy, family, connect),
  });
}
