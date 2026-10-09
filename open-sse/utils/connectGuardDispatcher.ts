import dns from "node:dns";
import { Agent, type Dispatcher } from "undici";
import {
  isCloudMetadataHost,
  isPrivateHost,
  type OutboundUrlGuardMode,
} from "@/shared/network/outboundUrlGuard";
import { getDispatcherOptions } from "./proxyDispatcher.ts";

/**
 * Connect-time outbound guard (DNS-rebinding, GHSA-cmhj-wh2f-9cgx).
 *
 * The string-level URL guard judges a host NAME; the socket then resolves that name again, so an
 * attacker-controlled record can be public for the check and private/metadata for the connect.
 * The dispatcher built here validates the addresses of the very lookup the connection is made
 * with — there is no second lookup to race, and no address is remembered or pinned.
 */

export type ConnectGuardMode = Exclude<OutboundUrlGuardMode, "none">;

export const CONNECT_GUARD_BLOCKED_CODE = "ERR_OUTBOUND_HOST_BLOCKED";

type LookupAddress = { address: string; family: number };
type LookupCallback = (
  err: NodeJS.ErrnoException | null,
  address?: string | LookupAddress[],
  family?: number
) => void;
type LookupImpl = (
  hostname: string,
  options: dns.LookupAllOptions,
  callback: (err: NodeJS.ErrnoException | null, addresses: LookupAddress[]) => void
) => void;

function blockedAddress(guard: ConnectGuardMode, address: string): boolean {
  return guard === "public-only" ? isPrivateHost(address) : isCloudMetadataHost(address);
}

/**
 * `net.connect` `lookup` that refuses to connect when ANY resolved address is blocked by `guard`.
 * Node calls it in one of two shapes (`options.all` set with Happy Eyeballs, or the single-address
 * form); both are honored. `resolve` is injectable so tests need no real DNS.
 */
export function createGuardedLookup(
  guard: ConnectGuardMode,
  // Late-bound so a test that replaces `dns.lookup` after the shared dispatcher exists still wins.
  resolve: LookupImpl = (hostname, options, callback) => dns.lookup(hostname, options, callback)
) {
  return (hostname: string, options: dns.LookupOptions | undefined, callback: LookupCallback) => {
    resolve(hostname, { ...options, all: true }, (err, addresses) => {
      if (err) return callback(err);
      const blocked = addresses.find(({ address }) => blockedAddress(guard, address));
      if (blocked || addresses.length === 0) {
        const reason = blocked
          ? `resolves to a blocked ${guard === "public-only" ? "private" : "cloud-metadata"} address (DNS rebinding)`
          : "could not be resolved";
        return callback(
          Object.assign(new Error(`Outbound host ${reason}: ${hostname}`), {
            code: CONNECT_GUARD_BLOCKED_CODE,
          })
        );
      }
      if (options?.all) return callback(null, addresses);
      callback(null, addresses[0].address, addresses[0].family);
    });
  };
}

const guardedDispatchers = new Map<ConnectGuardMode, Dispatcher>();

/**
 * Shared direct-egress dispatcher whose connections are validated by {@link createGuardedLookup}.
 * One instance per guard mode (the validation is per connect, so hosts can share it). Sockets are
 * not kept alive: this dispatcher bypasses the patched fetch's stale-socket retry, and a socket
 * that is never reused cannot be stale.
 */
export function getGuardedDispatcher(guard: ConnectGuardMode): Dispatcher {
  let dispatcher = guardedDispatchers.get(guard);
  if (!dispatcher) {
    const options = getDispatcherOptions();
    dispatcher = new Agent({
      ...options,
      keepAliveTimeout: 1,
      keepAliveMaxTimeout: 1,
      pipelining: 0,
      connect: {
        ...(options.connect as object),
        lookup: createGuardedLookup(guard),
      } as never,
    });
    guardedDispatchers.set(guard, dispatcher);
  }
  return dispatcher;
}
