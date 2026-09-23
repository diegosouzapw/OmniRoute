/**
 * Operator-listed hostnames that provider-node routing treats like loopback (#14635).
 *
 * A reranker, TEI/Infinity box or other sidecar on the same Docker network is normally
 * addressed by its Compose/Docker service name (`http://reranker:8080/v1`). The built-in
 * loopback class (`./loopbackNodeHost.ts`) only recognises `localhost`, `127.0.0.1` and
 * 172.16.0.0/12 literals, so such a node had to be configured with a container IP — one
 * that Docker's IPAM can hand to a different container after a restart.
 *
 * `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS` lists hostnames (comma or whitespace separated)
 * that are treated exactly like a Docker-bridge IP literal would be: always eligible for
 * the rerank/audio provider-node routes and the local health check, and sent direct
 * instead of through HTTP(S)_PROXY. Unset (the default) changes nothing.
 *
 * IP literals and cloud-metadata names are never accepted from the list. IPs already have
 * their own classification, and the list must not become a way to route to an IMDS endpoint.
 * Rejected entries are reported once per distinct value with a `console.warn`, so a typo
 * (`reranker:8080`, `http://reranker`) does not fail silently.
 *
 * Like `./loopbackNodeHost.ts` this module is pure: no `node:*` import and no `@/` alias,
 * because the audio registry that reaches it is part of a browser bundle (#11122).
 */

import { isLoopbackNodeHost } from "./loopbackNodeHost";
import { isCloudMetadataHost } from "./outboundUrlGuard";
import { ipVersion, normalizeHost } from "./privateHost";

export const LOCAL_PROVIDER_NODE_HOSTS_ENV = "OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS";

// Short cloud-metadata names that resolve through a cloud VM's DNS search path (GCE
// documents `http://metadata/`; EC2 has served `instance-data`). The fully qualified names
// and IPs come from the shared `isCloudMetadataHost()` guard.
const SHORT_METADATA_HOSTNAMES = new Set(["metadata", "instance-data"]);

// DNS labels as Docker/Compose/Kubernetes produce them. Docker also allows `_` in names.
const HOSTNAME_RE = /^[a-z0-9_](?:[a-z0-9_-]{0,62})(?:\.[a-z0-9_](?:[a-z0-9_-]{0,62}))*$/;

let cachedRaw: string | undefined;
let cachedHosts: ReadonlySet<string> = new Set();

function readEnv(): string | undefined {
  if (typeof process === "undefined" || !process.env) return undefined;
  return process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV];
}

// Numeric spellings of an IPv4 address that WHATWG URL parsing would turn into a dotted
// literal (`2852039166`, `0xa9fea9fe`, `0177.0.0.1`): a label that is all digits or a hex
// literal. Real Docker/Compose/Kubernetes service names never look like this.
const NUMERIC_LABEL_RE = /^(?:\d+|0x[0-9a-f]*)$/;

function isAcceptableEntry(host: string): boolean {
  if (!HOSTNAME_RE.test(host)) return false;
  if (ipVersion(host) !== 0) return false;
  if (host.split(".").some((label) => NUMERIC_LABEL_RE.test(label))) return false;
  return !isCloudMetadataHost(host) && !SHORT_METADATA_HOSTNAMES.has(host);
}

function warnIgnored(entries: string[]): void {
  if (entries.length === 0 || typeof console === "undefined") return;
  console.warn(
    `[${LOCAL_PROVIDER_NODE_HOSTS_ENV}] ignoring ${entries.length} entr${entries.length === 1 ? "y" : "ies"} ` +
      `(expected bare hostnames; IP literals and cloud-metadata names are not allowed): ` +
      entries.join(", ")
  );
}

/** Parsed `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`; re-read whenever the env value changes. */
export function getConfiguredLocalNodeHosts(): ReadonlySet<string> {
  const raw = readEnv() ?? "";
  if (raw === cachedRaw) return cachedHosts;
  const hosts = new Set<string>();
  const ignored: string[] = [];
  for (const entry of raw.split(/[\s,]+/)) {
    const host = normalizeHost(entry);
    if (!host) continue;
    if (isAcceptableEntry(host)) hosts.add(host);
    else ignored.push(entry);
  }
  cachedRaw = raw;
  cachedHosts = hosts;
  warnIgnored(ignored);
  return hosts;
}

/** Whether a bare hostname is in the operator's local-host list. */
export function isConfiguredLocalNodeHostname(hostname: string): boolean {
  const hosts = getConfiguredLocalNodeHosts();
  if (hosts.size === 0) return false;
  return hosts.has(normalizeHost(hostname));
}

/**
 * Local-class check for provider-node base URLs: the built-in loopback class plus the
 * operator-listed hostnames. URLs carrying credentials are rejected, as in the loopback check.
 */
export function isLocalProviderNodeHost(baseUrl: string): boolean {
  if (isLoopbackNodeHost(baseUrl)) return true;
  try {
    const u = new URL(baseUrl);
    if (u.username || u.password) return false;
    return isConfiguredLocalNodeHostname(u.hostname);
  } catch {
    return false;
  }
}
