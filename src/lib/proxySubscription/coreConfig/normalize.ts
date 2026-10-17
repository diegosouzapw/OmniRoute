/**
 * Core-agnostic translation of one subscription node source.
 *
 * The canonical form carries server, port, transport, security and
 * credentials only. Any field that would change connection behavior outside
 * the supported set rejects the whole node instead of guessing, proven
 * decorative fields render with their names journaled, and unknown fields
 * reject by default with their name. A field that is present but unreadable
 * (a TLS flag of the wrong type, a Reality block without its public key, a
 * cipher outside the supported list) rejects too: nothing silently falls
 * back to a weaker setting. Never throws: sources are operator-supplied feed
 * data.
 */
import type { NodeSource } from "../parse";
import {
  auditDecodedVmess,
  auditObjectParams,
  auditUriParams,
  clashCipherDetail,
} from "./paramPolicy";

/** Core-agnostic translation of one node source. Memory-only, never persisted. */
export interface CanonicalNode {
  type: string;
  server: string;
  serverPort: number;
  transport: { kind: "tcp" | "ws" | "grpc"; path?: string; host?: string; service?: string };
  security: {
    kind: "none" | "tls" | "reality";
    serverName?: string;
    insecure?: boolean;
    publicKey?: string;
    shortId?: string;
    fingerprint?: string;
  };
  credentials: { kind: "uuid" | "password" | "method-password"; secret: string; method?: string };
  flow?: string;
}

/** Result of translating one node source into the canonical form. */
export type NormalizeOk = { ok: true; node: CanonicalNode; dropped: string[] };
export type NormalizeFail = {
  ok: false;
  reason: "converter_unsupported" | "source_not_singbox_shape";
  detail?: string;
};
export type NormalizeResult = NormalizeOk | NormalizeFail;

const CANONICAL_TYPE_BY_SCHEME: Record<string, string> = {
  vless: "vless",
  trojan: "trojan",
  ss: "shadowsocks",
  shadowsocks: "shadowsocks",
  vmess: "vmess",
  hysteria2: "hysteria2",
  hy2: "hysteria2",
};

const SUPPORTED_TRANSPORTS: ReadonlySet<string> = new Set(["tcp", "raw", "ws", "grpc"]);
const SUPPORTED_FLOWS: ReadonlySet<string> = new Set(["xtls-rprx-vision"]);

/** Protocols that always run over TLS on the wire, whatever the source says. */
const TLS_REQUIRED_TYPES: ReadonlySet<string> = new Set(["trojan", "hysteria2"]);

/** Shadowsocks ciphers sing-box and Mihomo both accept. */
const SHADOWSOCKS_METHODS: ReadonlySet<string> = new Set([
  "none",
  "aes-128-gcm",
  "aes-192-gcm",
  "aes-256-gcm",
  "chacha20-ietf-poly1305",
  "xchacha20-ietf-poly1305",
  "2022-blake3-aes-128-gcm",
  "2022-blake3-aes-256-gcm",
  "2022-blake3-chacha20-poly1305",
]);

type Security = CanonicalNode["security"];
type Transport = CanonicalNode["transport"];
type Credentials = CanonicalNode["credentials"];

function unsupported(reason: NormalizeFail["reason"], detail?: string): NormalizeFail {
  return detail ? { ok: false, reason, detail } : { ok: false, reason };
}

function rejected(detail: string): NormalizeFail {
  return unsupported("converter_unsupported", detail);
}

function textField(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function portField(value: unknown): number {
  const port = typeof value === "number" ? value : Number(value);
  return Number.isSafeInteger(port) && port > 0 && port <= 65535 ? port : 0;
}

/** Host without the brackets WHATWG URL keeps around IPv6 literals. */
function bareHost(raw: string): string {
  return raw.trim().replace(/^\[(.*)\]$/, "$1");
}

function decodedOnce(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function looksEncoded(value: string): boolean {
  return value.includes("%") && decodedOnce(value) !== value;
}

/**
 * Bounded credential decoding: one application pass after the URL decoding.
 * `new URL` keeps username/password percent-encoded and decodes
 * searchParams once, so this guard sees the second layer: a value that still
 * looks encoded after this pass is rejected instead of decoded again, so a
 * double-encoded secret can never silently become another credential.
 */
function decodedCredential(value: string): string | null {
  const once = decodedOnce(value);
  if (looksEncoded(once)) return null;
  return once;
}

function hasControlChars(value: string): boolean {
  return /[\u0000-\u001f\u007f]/.test(value);
}

function isTruthyFlag(value: unknown): boolean {
  if (value === true || value === 1) return true;
  const text = textField(value).toLowerCase().trim();
  return text === "1" || text === "true";
}

// ── URI sources ──────────────────────────────────────────────────────────

function userinfoCredential(url: URL): string | null {
  const raw = url.username
    ? `${url.username}${url.password ? `:${url.password}` : ""}`
    : url.password;
  if (!raw) return null;
  return decodedCredential(raw);
}

function wsTransport(params: URLSearchParams): Transport | null {
  const path = decodedCredential(params.get("path") ?? "/");
  const host = decodedCredential(params.get("host") ?? "");
  if (path === null || host === null) return null;
  return { kind: "ws", path: path || "/", ...(host ? { host } : {}) };
}

function grpcTransport(params: URLSearchParams): Transport | null {
  const service = decodedCredential(params.get("serviceName") ?? params.get("service") ?? "");
  if (service === null) return null;
  return { kind: "grpc", ...(service ? { service } : {}) };
}

function transportFromParams(type: string, params: URLSearchParams): Transport | null {
  const kind = (params.get("type") ?? "tcp").toLowerCase().trim() || "tcp";
  if (!SUPPORTED_TRANSPORTS.has(kind)) return null;
  // hysteria2 runs over QUIC: a stream transport on it has no projection.
  if (type === "hysteria2" && kind !== "tcp" && kind !== "raw") return null;
  if (kind === "ws") return wsTransport(params);
  if (kind === "grpc") return grpcTransport(params);
  return { kind: "tcp" };
}

/** TLS details shared by `tls` and `reality`; a string is a rejection detail. */
function tlsFromParams(
  params: URLSearchParams,
  kind: "tls" | "reality",
  server: string
): Security | string {
  const sni = decodedCredential(params.get("sni") ?? params.get("serverName") ?? "");
  const fingerprint = decodedCredential(params.get("fp") ?? "");
  if (sni === null) return "wire-param:sni";
  if (fingerprint === null) return "wire-param:fp";
  const security: Security = { kind, serverName: sni || server };
  if (isTruthyFlag(params.get("allowInsecure")) || isTruthyFlag(params.get("insecure"))) {
    security.insecure = true;
  }
  if (fingerprint) security.fingerprint = fingerprint;
  return kind === "reality" ? withRealityParams(params, security) : security;
}

/** Reality keys from a query string; the public key is required. */
function withRealityParams(params: URLSearchParams, security: Security): Security | string {
  const publicKey = decodedCredential(params.get("pbk") ?? "");
  const shortId = decodedCredential(params.get("sid") ?? "");
  if (!publicKey) return "wire-param:pbk";
  if (shortId === null) return "wire-param:sid";
  security.publicKey = publicKey;
  if (shortId) security.shortId = shortId;
  return security;
}

function securityFromParams(
  type: string,
  params: URLSearchParams,
  server: string
): Security | string {
  const fallback = TLS_REQUIRED_TYPES.has(type) ? "tls" : "none";
  const raw = (params.get("security") ?? fallback).toLowerCase().trim() || fallback;
  if (raw !== "none" && raw !== "tls" && raw !== "reality") return "wire-param:security";
  // trojan and hysteria2 can't run in the clear; hysteria2 has no Reality mode.
  if (TLS_REQUIRED_TYPES.has(type) && raw === "none") return "wire-param:security";
  if (type === "hysteria2" && raw === "reality") return "wire-param:security";
  if (raw === "none") return { kind: "none" };
  return tlsFromParams(params, raw, server);
}

function flowFromParams(params: URLSearchParams): { flow?: string; detail?: string } {
  const flow = params.get("flow");
  if (flow === null || flow === "") return {};
  if (!SUPPORTED_FLOWS.has(flow)) return { detail: "wire-param:flow" };
  return { flow };
}

function uriCredentialed(type: string, url: URL): NormalizeResult {
  const credential = userinfoCredential(url);
  const server = bareHost(url.hostname);
  const port = portField(url.port);
  if (!credential || !server || !port) return unsupported("converter_unsupported");
  const params = url.searchParams;
  const audit = auditUriParams(params);
  if (audit.detail) return rejected(audit.detail);
  const transport = transportFromParams(type, params);
  if (!transport) return rejected("wire-param:type");
  const security = securityFromParams(type, params, server);
  if (typeof security === "string") return rejected(security);
  const flowed = flowFromParams(params);
  if (flowed.detail) return rejected(flowed.detail);
  return {
    ok: true,
    node: {
      type,
      server,
      serverPort: port,
      transport,
      security,
      credentials:
        type === "vless"
          ? { kind: "uuid", secret: credential }
          : { kind: "password", secret: credential },
      ...(flowed.flow ? { flow: flowed.flow } : {}),
    },
    dropped: audit.dropped,
  };
}

/** `method:password`, validated against the supported cipher list. */
function methodPassword(
  method: string,
  secret: string
): { method: string; secret: string } | string {
  if (!method || !secret || hasControlChars(method) || hasControlChars(secret)) return "";
  if (!SHADOWSOCKS_METHODS.has(method.toLowerCase())) return "wire-param:method";
  return { method: method.toLowerCase(), secret };
}

/**
 * SIP002 userinfo: plain `method:password` (percent-encoded) or one
 * base64/base64url blob. The blob reaches us percent-encoded by the URL
 * parser (`=` padding becomes `%3D`), so it's decoded once before the
 * base64 step; anything outside the base64 alphabet after that is rejected.
 * Returns the credentials, a rejection detail, or "" for a malformed value.
 */
function sip002Credentials(url: URL): { method: string; secret: string } | string {
  if (url.password) {
    const method = decodedCredential(url.username);
    const secret = decodedCredential(url.password);
    if (method === null || secret === null) return "";
    return methodPassword(method, secret);
  }
  const blob = decodedOnce(url.username);
  if (!blob || !/^[A-Za-z0-9+/_-]+={0,2}$/.test(blob)) return "";
  let padded = blob.replace(/=+$/, "").replace(/-/g, "+").replace(/_/g, "/");
  padded += "=".repeat((4 - (padded.length % 4)) % 4);
  const decoded = Buffer.from(padded, "base64").toString("utf-8");
  const colon = decoded.indexOf(":");
  if (colon <= 0) return "";
  const method = decoded.slice(0, colon);
  const secret = decoded.slice(colon + 1);
  if (looksEncoded(method) || looksEncoded(secret)) return "";
  return methodPassword(method, secret);
}

function uriShadowsocks(url: URL): NormalizeResult {
  const credentials = sip002Credentials(url);
  const server = bareHost(url.hostname);
  const port = portField(url.port);
  if (typeof credentials === "string") {
    return credentials ? rejected(credentials) : unsupported("converter_unsupported");
  }
  if (!server || !port) return unsupported("converter_unsupported");
  const audit = auditUriParams(url.searchParams);
  if (audit.detail) return rejected(audit.detail);
  return {
    ok: true,
    node: {
      type: "shadowsocks",
      server,
      serverPort: port,
      transport: { kind: "tcp" },
      security: { kind: "none" },
      credentials: {
        kind: "method-password",
        secret: credentials.secret,
        method: credentials.method,
      },
    },
    dropped: audit.dropped,
  };
}

function vmessPayload(raw: string): Record<string, unknown> | null {
  const payload = raw.startsWith("vmess://") ? raw.slice("vmess://".length).split("#")[0] : "";
  const bare = payload.replace(/^\/*/, "");
  if (!bare) return null;
  const padded = bare + "=".repeat((4 - (bare.length % 4)) % 4);
  try {
    const parsed: unknown = JSON.parse(
      Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8")
    );
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function vmessTransport(payload: Record<string, unknown>): Transport | null {
  const net = textField(payload.net).toLowerCase().trim() || "tcp";
  if (!SUPPORTED_TRANSPORTS.has(net)) return null;
  const path = textField(payload.path);
  const host = textField(payload.host);
  if (net === "ws") return { kind: "ws", path: path || "/", ...(host ? { host } : {}) };
  if (net === "grpc") return { kind: "grpc", ...(path ? { service: path } : {}) };
  return { kind: "tcp" };
}

function vmessSecurity(payload: Record<string, unknown>, server: string): Security | string {
  const tls = payload.tls;
  const text = textField(tls).toLowerCase().trim();
  if (tls === undefined || tls === null || tls === false || text === "" || text === "none") {
    return { kind: "none" };
  }
  if (tls !== true && text !== "tls") return "wire-param:tls";
  return { kind: "tls", serverName: textField(payload.sni) || textField(payload.host) || server };
}

/** `vmess://base64(json)`: the parameter audit runs on the decoded blob itself. */
function uriVmess(raw: string): NormalizeResult {
  const payload = vmessPayload(raw);
  if (!payload) return unsupported("converter_unsupported");
  const audit = auditDecodedVmess(payload);
  if (audit.detail) return rejected(audit.detail);
  const secret = textField(payload.id) || textField(payload.uuid);
  const server = bareHost(textField(payload.add));
  const port = portField(payload.port);
  if (!secret || !server || !port) return unsupported("converter_unsupported");
  const transport = vmessTransport(payload);
  if (!transport) return rejected("wire-param:net");
  const security = vmessSecurity(payload, server);
  if (typeof security === "string") return rejected(security);
  return {
    ok: true,
    node: {
      type: "vmess",
      server,
      serverPort: port,
      transport,
      security,
      credentials: { kind: "uuid", secret },
    },
    dropped: audit.dropped,
  };
}

function normalizeUriSource(raw: string): NormalizeResult {
  if (!raw) return unsupported("source_not_singbox_shape");
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return unsupported("source_not_singbox_shape");
  }
  const scheme = url.protocol.replace(/:$/, "").toLowerCase();
  const type = CANONICAL_TYPE_BY_SCHEME[scheme];
  if (!type) return unsupported("source_not_singbox_shape");
  if (type === "vmess") return uriVmess(raw);
  if (type === "shadowsocks") return uriShadowsocks(url);
  return uriCredentialed(type, url);
}

// ── Clash objects ────────────────────────────────────────────────────────

function nested(value: Record<string, unknown>, key: string): Record<string, unknown> {
  const inner = value[key];
  return inner && typeof inner === "object" && !Array.isArray(inner)
    ? (inner as Record<string, unknown>)
    : {};
}

function objectEndpoint(value: Record<string, unknown>): { server: string; port: number } | null {
  const server = bareHost(textField(value.server));
  const port = portField(value.port) || portField(value.server_port);
  if (!server || !port) return null;
  return { server, port };
}

function transportFromObject(type: string, value: Record<string, unknown>): Transport | null {
  const raw = (textField(value.network) || textField(value.transport) || "tcp")
    .toLowerCase()
    .trim();
  const kind = raw === "raw" || raw === "" ? "tcp" : raw;
  if (!SUPPORTED_TRANSPORTS.has(kind)) return null;
  if (type === "hysteria2" && kind !== "tcp") return null;
  if (kind === "ws") return wsFromObject(value);
  if (kind === "grpc") return grpcFromObject(value);
  return { kind: "tcp" };
}

/** Clash `ws-opts` first, then the flat spellings. */
function wsFromObject(value: Record<string, unknown>): Transport {
  const opts = nested(value, "ws-opts");
  const headers = nested(opts, "headers");
  const path = textField(opts.path) || textField(value.path) || textField(value["ws-path"]) || "/";
  const host = textField(headers.Host) || textField(headers.host) || textField(value.host);
  return { kind: "ws", path, ...(host ? { host } : {}) };
}

/** Clash `grpc-opts` first, then the flat spellings. */
function grpcFromObject(value: Record<string, unknown>): Transport {
  const opts = nested(value, "grpc-opts");
  const service =
    textField(opts["grpc-service-name"]) ||
    textField(value.serviceName) ||
    textField(value["service-name"]);
  return { kind: "grpc", ...(service ? { service } : {}) };
}

/**
 * Clash writes `tls: true`; other objects write `security`/`tls` as a
 * string. A flag of any other type is unreadable and rejects (null).
 */
function flagSecurityKind(value: Record<string, unknown>): Security["kind"] | null {
  const tls = value.tls;
  if (tls === true) return "tls";
  if (tls === false) return "none";
  if (tls !== undefined && tls !== null && typeof tls !== "string") return null;
  const text = (textField(value.security) || textField(tls)).toLowerCase().trim();
  if (text === "tls" || text === "reality") return text;
  return text === "" || text === "none" ? "none" : null;
}

function objectSecurityKind(type: string, value: Record<string, unknown>): Security["kind"] | null {
  const kind = value["reality-opts"] !== undefined ? "reality" : flagSecurityKind(value);
  if (kind === null || !TLS_REQUIRED_TYPES.has(type)) return kind;
  // trojan and hysteria2 always negotiate TLS (Clash omits the flag for
  // them); hysteria2 has no Reality mode.
  if (type === "hysteria2" && kind === "reality") return null;
  return kind === "none" ? "tls" : kind;
}

function objectSecurity(
  type: string,
  value: Record<string, unknown>,
  server: string
): Security | string {
  const kind = objectSecurityKind(type, value);
  if (kind === null) return "wire-param:tls";
  if (kind === "none") return { kind: "none" };
  const security: Security = {
    kind,
    serverName:
      textField(value.sni) || textField(value.servername) || textField(value.serverName) || server,
  };
  if (isTruthyFlag(value["skip-cert-verify"]) || isTruthyFlag(value.insecure)) {
    security.insecure = true;
  }
  const fingerprint = textField(value["client-fingerprint"]);
  if (fingerprint) security.fingerprint = fingerprint;
  if (kind === "reality") {
    const opts = nested(value, "reality-opts");
    const publicKey = textField(opts["public-key"]);
    const shortId = textField(opts["short-id"]);
    if (!publicKey) return "wire-param:reality-opts.public-key";
    security.publicKey = publicKey;
    if (shortId) security.shortId = shortId;
  }
  return security;
}

function objectCredentials(type: string, value: Record<string, unknown>): Credentials | string {
  if (type === "shadowsocks") {
    const checked = methodPassword(
      textField(value.cipher) || textField(value.method),
      textField(value.password)
    );
    if (typeof checked === "string") return checked;
    return { kind: "method-password", secret: checked.secret, method: checked.method };
  }
  const secret =
    type === "vless" || type === "vmess" ? textField(value.uuid) : textField(value.password);
  if (!secret) return "";
  return type === "vless" || type === "vmess"
    ? { kind: "uuid", secret }
    : { kind: "password", secret };
}

function normalizeObjectSource(value: Record<string, unknown>): NormalizeResult {
  const scheme = textField(value.type).toLowerCase().trim();
  const type = CANONICAL_TYPE_BY_SCHEME[scheme];
  if (!type) return unsupported("source_not_singbox_shape");
  const audit = auditObjectParams(value);
  if (audit.detail) return rejected(audit.detail);
  if (type === "vmess") {
    const cipher = clashCipherDetail(value.cipher);
    if (cipher) return rejected(cipher);
  }
  const endpoint = objectEndpoint(value);
  if (!endpoint) return unsupported("converter_unsupported");
  const transport = transportFromObject(type, value);
  if (!transport) return rejected("wire-param:network");
  const security = objectSecurity(type, value, endpoint.server);
  if (typeof security === "string") return rejected(security);
  const flow = textField(value.flow).trim();
  if (flow && !SUPPORTED_FLOWS.has(flow)) return rejected("wire-param:flow");
  const credentials = objectCredentials(type, value);
  if (typeof credentials === "string") {
    return credentials ? rejected(credentials) : unsupported("converter_unsupported");
  }
  return {
    ok: true,
    node: {
      type,
      server: endpoint.server,
      serverPort: endpoint.port,
      transport,
      security,
      credentials,
      ...(flow ? { flow } : {}),
    },
    dropped: audit.dropped,
  };
}

// ── Entry points ─────────────────────────────────────────────────────────

export function isSingBoxLike(value: Record<string, unknown>): boolean {
  // Single shape predicate shared with the renderer: an object carrying the
  // triplet passes through verbatim without touching the normalizer.
  return (
    typeof value.type === "string" &&
    typeof value.server === "string" &&
    typeof value.server_port === "number"
  );
}

/**
 * Translate one node source into the core-agnostic canonical form.
 *
 * Schemes outside the supported table keep the historical
 * `source_not_singbox_shape` reason; supported schemes that cannot be
 * translated whole report `converter_unsupported`, with the offending key in
 * `detail` when there is one. Never throws.
 */
export function normalizeSource(source: NodeSource): NormalizeResult {
  try {
    if (!source) return unsupported("source_not_singbox_shape");
    if (source.kind === "uri") {
      if (typeof source.value !== "string") return unsupported("source_not_singbox_shape");
      return normalizeUriSource(source.value);
    }
    if (source.kind === "object") {
      if (!source.value || typeof source.value !== "object") {
        return unsupported("source_not_singbox_shape");
      }
      return normalizeObjectSource(source.value as Record<string, unknown>);
    }
    return unsupported("source_not_singbox_shape");
  } catch {
    return unsupported("source_not_singbox_shape");
  }
}
