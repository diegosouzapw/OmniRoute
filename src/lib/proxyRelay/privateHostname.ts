/**
 * Shared private/loopback host guard for the three proxy-relay workers
 * (Cloudflare, Deno Deploy, Vercel Edge).
 *
 * The three generators each carried a byte-identical copy of this policy inlined
 * as a string, so a gap had to be found and fixed three times. It is now written
 * once and embedded verbatim via `Function#toString`, the same mechanism
 * `resolveRelayTarget` already uses — the edge runtimes cannot import Node
 * helpers, so the source has to travel as text.
 *
 * Pure (only `String`/`RegExp`, no Node or Deno globals) so the SAME source runs
 * in every worker and is unit-testable directly in Node.
 *
 * Callers pass `new URL(target).hostname`, which is already WHATWG-normalized:
 * `2130706433` arrives as `127.0.0.1`, and `::ffff:127.0.0.1` arrives as
 * `[::ffff:7f00:1]`. The brackets are stripped here.
 */
export function isPrivateRelayHostname(h: string): boolean {
  if (!h) return true;
  let host = String(h)
    .trim()
    .toLowerCase()
    .replace(/^\[|\]$/g, "");
  // Drop the FQDN root dot. `localhost.` resolves exactly like `localhost`, and
  // a trailing dot otherwise slips past every exact and suffix test below —
  // including `.internal`, so `svc.internal.` would have been allowed.
  if (host.length > 1 && host.endsWith(".")) host = host.slice(0, -1);
  if (!host) return true;

  if (
    host === "localhost" ||
    host === "0.0.0.0" ||
    host === "127.0.0.1" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return true;
  }

  // Everything in ::/96 — the unspecified address, IPv6 loopback, IPv4-mapped
  // (`::ffff:7f00:1`) and the deprecated IPv4-compatible form (`::7f00:1`).
  // None of them is a legitimate public relay target, and `http://[::]/` reaches
  // a service bound to the IPv6 loopback.
  if (host.startsWith("::")) return true;

  const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const a = Number(v4[1]);
    const b = Number(v4[2]);
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true; // link-local IPv4
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    return false;
  }

  if (host.includes(":")) {
    if (host.startsWith("fc") || host.startsWith("fd")) return true; // ULA fc00::/7
    // Link-local is fe80::/10 — fe80 through febf, not only the `fe80:` spelling.
    if (/^fe[89ab]/.test(host)) return true;
    return false;
  }

  return false;
}
