// Shared normalization for observed egress addresses: a whole IPv4 address
// (`203.0.113.7`), an IPv4-mapped IPv6 form demapped to IPv4
// (`::ffff:203.0.113.7`), or an IPv6 /64 prefix (`v6:2001:db8:1:0`) — members
// behind one shared /64 consume one quota. Anything else (zone ids
// `fe80::1%eth0`, unparseable input) gives null so the caller falls back to
// today's order instead of guessing.
//
// Pure-JS, no `node:*` import: `proxyOperatorEgress.ts` (server) and
// `proxies/rotation.ts` (bundled near the provider registry) both use it, and
// the browser bundle cannot resolve `node:net` (#11122). Classification parity
// with `node:net#isIP` comes from `ipVersion` in `./privateHost.ts`.
import { ipVersion, isPrivateHost } from "./privateHost";

// Expand an IPv6 literal to its eight 16-bit groups, or null when malformed.
// `::` supplies the missing zero groups; anything else must list all eight.
function expandIpv6ToGroups(text: string): number[] | null {
  const halves = text.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves[1] ? halves[1].split(":") : [];
  if (halves.length === 1 && head.length !== 8) return null;
  if (halves.length === 2 && head.length + tail.length > 7) return null;
  if ([...head, ...tail].some((part) => !/^[0-9a-f]{1,4}$/.test(part))) return null;
  const groups = [
    ...head.map((part) => parseInt(part, 16)),
    ...new Array(halves.length === 2 ? 8 - head.length - tail.length : 0).fill(0),
    ...tail.map((part) => parseInt(part, 16)),
  ];
  if (groups.length !== 8 || groups.some((group) => !Number.isInteger(group))) return null;
  return groups;
}

/**
 * Normalize an observed egress address for pool ranking. `null` means the
 * input is unusable — the caller keeps today's behavior instead of guessing.
 */
export function normalizeEgressAddress(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const text = input.trim().toLowerCase();
  if (!text || text.includes("%")) return null;
  const mapped = text.startsWith("::ffff:") ? text.slice("::ffff:".length) : text;
  if (ipVersion(mapped) === 4) return mapped;
  if (ipVersion(text) !== 6) return null;
  const groups = expandIpv6ToGroups(text);
  if (groups === null) return null;
  return `v6:${groups
    .slice(0, 4)
    .map((group) => group.toString(16))
    .join(":")}`;
}

/**
 * Whether an observed egress address is usable: an IP literal that is
 * routable (not loopback, link-local, private/non-routable, or unspecified).
 * Pure helper — `node:net` stays server-side, so this uses the shared pure-JS
 * classifier (`isPrivateHost` covers loopback, private, link-local, multicast,
 * and reserved forms verdict-for-verdict with `isIP`). Hostnames
 * (non-literals) and `%zone` forms are refused: an observed address is an IP,
 * never a name.
 */
export function isRoutableEgressAddress(input: unknown): boolean {
  if (typeof input !== "string") return false;
  const text = input.trim();
  if (!text || text.includes("%")) return false;
  const lower = text.toLowerCase();
  const demapped = lower.startsWith("::ffff:") ? lower.slice("::ffff:".length) : lower;
  // Hostname, not a literal: refused.
  if (ipVersion(lower) === 0 && ipVersion(demapped) === 0) return false;
  return !isPrivateHost(lower);
}
