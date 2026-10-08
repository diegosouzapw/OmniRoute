import { embeddedIpv4Host, isPrivateHost, isSameIpv6Address, normalizeHost } from "./privateHost";

// #11122: the host classification lives in `./privateHost.ts` because
// `open-sse/config/providerRegistry.ts` imports it from a module reachable by a browser
// bundle, and `node:net` cannot be resolved there. Re-exported so every existing caller of
// `isPrivateHost` from this module keeps working unchanged.
export { isPrivateHost };

export const PROVIDER_URL_BLOCKED_MESSAGE = "Blocked private or local provider URL";
export const CLOUD_METADATA_BLOCKED_MESSAGE = "Blocked cloud-metadata endpoint";

// "block-metadata": allow private/LAN hosts but still reject cloud-metadata / link-local
// endpoints (the SSRF→IAM-credential pivot). Used by the provider-validation path under the
// local-first default; never relaxes the metadata block.
export type OutboundUrlGuardMode = "none" | "public-only" | "block-metadata";
export type OutboundUrlGuardErrorCode = "OUTBOUND_URL_GUARD_BLOCKED" | "OUTBOUND_URL_INVALID";

type OutboundUrlGuardErrorInit = {
  code: OutboundUrlGuardErrorCode;
  url: string;
  hostname?: string | null;
};

export class OutboundUrlGuardError extends Error {
  code: OutboundUrlGuardErrorCode;
  url: string;
  hostname?: string | null;

  constructor(message: string, init: OutboundUrlGuardErrorInit) {
    super(message);
    this.name = "OutboundUrlGuardError";
    this.code = init.code;
    this.url = init.url;
    this.hostname = init.hostname ?? null;
  }
}

// WHATWG URL serialises an IPv4-mapped IPv6 address as hextets, so
// `http://[::ffff:169.254.169.254]/` reaches these helpers as `::ffff:a9fe:a9fe`.
// Matching the dotted spelling alone therefore misses every mapped address that
// arrives through a parsed URL. Fold the embedded IPv4 back out before deciding.
export function mappedIpv4Host(hostname: string): string | null {
  return embeddedIpv4Host(hostname, true);
}

const CLOUD_METADATA_HOSTNAMES = new Set([
  "169.254.169.254", // AWS / GCP / Azure / Oracle IMDS
  "metadata.google.internal", // GCP
  "metadata.goog", // GCP
  "100.100.100.200", // Alibaba Cloud
  "168.63.129.16", // Azure host fabric (WireServer)
  "192.0.0.192", // Oracle Cloud secondary IMDS
]);

const AWS_IPV6_IMDS = "fd00:ec2::254";

function isCloudMetadataIpv4(host: string): boolean {
  if (CLOUD_METADATA_HOSTNAMES.has(host)) return true;
  return host.startsWith("169.254."); // IPv4 link-local /16
}

/**
 * Cloud-metadata and IPv4 link-local (169.254.0.0/16) endpoints are the classic
 * SSRF→IAM-credential pivot and have no legitimate webhook/automation use case. They are
 * blocked UNCONDITIONALLY — even when private targets are explicitly opted in. (#3269)
 */
export function isCloudMetadataHost(hostname: string): boolean {
  const host = normalizeHost(hostname);
  if (!host) return false;
  if (isCloudMetadataIpv4(host)) return true;
  // The AWS IPv6 IMDS address is compared as an address: `fd00:ec2:0:0:0:0:0:254` is the same one.
  if (isSameIpv6Address(host, AWS_IPV6_IMDS)) return true;
  // An IPv6 literal that carries an IPv4 address (mapped, compatible, NAT64, 6to4) routes to
  // the embedded address, so the same verdict has to apply to it, or this block would depend
  // on how the address is spelled.
  const embedded = embeddedIpv4Host(host);
  return embedded !== null && isCloudMetadataIpv4(embedded);
}

export function parseOutboundUrl(input: string | URL) {
  let url: URL;
  try {
    url = input instanceof URL ? input : new URL(String(input));
  } catch {
    throw new OutboundUrlGuardError(`Invalid outbound URL: ${String(input)}`, {
      code: "OUTBOUND_URL_INVALID",
      url: String(input),
    });
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new OutboundUrlGuardError(`Invalid outbound URL protocol for ${url.toString()}`, {
      code: "OUTBOUND_URL_INVALID",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }

  if (url.username || url.password) {
    throw new OutboundUrlGuardError("Blocked outbound URL with embedded credentials", {
      code: "OUTBOUND_URL_GUARD_BLOCKED",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }

  return url;
}

export function parseAndValidatePublicUrl(input: string | URL) {
  const url = parseOutboundUrl(input);

  if (isPrivateHost(url.hostname)) {
    throw new OutboundUrlGuardError(PROVIDER_URL_BLOCKED_MESSAGE, {
      code: "OUTBOUND_URL_GUARD_BLOCKED",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }

  return url;
}

/**
 * #5066: provider-validation variant. Allows private/LAN hosts (so a local OpenAI-compatible
 * provider at 127.0.0.1 validates) but ALWAYS rejects cloud-metadata / link-local endpoints —
 * the classic SSRF→IAM-credential pivot, which is never a legitimate provider endpoint.
 * Protocol and embedded-credential checks from {@link parseOutboundUrl} still apply.
 */
export function parseAndValidateNonMetadataUrl(input: string | URL) {
  const url = parseOutboundUrl(input);

  if (isCloudMetadataHost(url.hostname)) {
    throw new OutboundUrlGuardError(CLOUD_METADATA_BLOCKED_MESSAGE, {
      code: "OUTBOUND_URL_GUARD_BLOCKED",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }

  return url;
}

// NOTE (#7682): `arePrivateProviderUrlsAllowed`, `areLocalProviderUrlsAllowed`,
// `getProviderOutboundGuard`, `getProviderValidationGuard`, and `parseAndValidateWebhookUrl`
// live in the sibling `./outboundUrlGuardPolicy.ts` module, NOT here. Those helpers need
// `@/shared/utils/featureFlags` (which transitively pulls in the DB layer), and this file is
// loaded by the packaged CLI (`omniroute setup-opencode` → cli-helper/config-generator/
// opencode.ts) where no `tsconfig.json` is present to resolve the `@/*` path alias. Keeping
// this module free of ANY `@/`-aliased import is what makes it safe to load from the CLI.
// Do not add a `@/`-aliased import here — see docs/security/… (packaging) and #7682.
// The same rule binds `./privateHost.ts`, which this module re-exports from.
