/**
 * Proxy subscription parser.
 *
 * Turns a subscription body (base64-wrapped list, Clash/Clash.Meta YAML,
 * V2Ray/Clash JSON, or a plain list of URIs) into a normalized node model.
 *
 * OmniRoute's request dispatcher (open-sse/utils/proxyDispatcher) only speaks
 * http / https / socks5 (+ edge relay). Subscriptions whose nodes are
 * Shadowsocks / VMess / VLESS / Trojan / TUIC / Hysteria / WireGuard cannot be
 * used directly — they require a local proxy core (sing-box / clash) that
 * exposes a SOCKS5/HTTP endpoint. Those nodes are reported separately as
 * `needsCore` so the caller can either bind the operator-supplied
 * `local_core_endpoint` or surface a clear "needs a local core" error.
 *
 * Source: operator-supplied subscription feature (Karing-style proxy).
 */
import * as yaml from "js-yaml";

export type DirectProxyType = "http" | "https" | "socks5";
export type RawProxyProtocol =
  | DirectProxyType
  | "ss"
  | "ssr"
  | "vmess"
  | "vless"
  | "trojan"
  | "tuic"
  | "hysteria"
  | "hysteria2"
  | "wireguard"
  | "snell"
  | "unknown";

const DIRECT_TYPES: ReadonlySet<string> = new Set<DirectProxyType>(["http", "https", "socks5"]);
const NEEDS_CORE_PROTOCOLS: ReadonlySet<RawProxyProtocol> = new Set<RawProxyProtocol>([
  "ss",
  "ssr",
  "vmess",
  "vless",
  "trojan",
  "tuic",
  "hysteria",
  "hysteria2",
  "wireguard",
  "snell",
]);

export interface SubscriptionNode {
  name: string;
  type: DirectProxyType;
  host: string;
  port: number;
  username?: string;
  password?: string;
  rawProtocol: RawProxyProtocol;
}

export interface NeedsCoreNode {
  name: string;
  rawProtocol: RawProxyProtocol;
  host?: string;
  port?: number;
  detail: string;
}

export interface ParsedSubscription {
  nodes: SubscriptionNode[];
  needsCore: NeedsCoreNode[];
  format:
    | "clash-yaml"
    | "clash-json"
    | "v2ray-json"
    | "lines"
    | "base64-lines"
    | "empty"
    | "unknown";
}

function looksLikeBase64(s: string): boolean {
  // Require length >= 16 and only base64 alphabet (allow trailing =), no spaces.
  if (s.length < 16) return false;
  if (/\s/.test(s)) return false;
  return /^[A-Za-z0-9+/]+={0,2}$/.test(s);
}

function tryDecodeBase64(s: string): string | null {
  if (!looksLikeBase64(s)) return null;
  try {
    const buf = Buffer.from(s, "base64");
    // Reject if it doesn't round-trip (i.e. not actually base64 text).
    // Strip padding from BOTH sides: original may have `=` stripped by the
    // caller, while Node's base64 encoding always emits canonical padding.
    const reencoded = buf.toString("base64").replace(/=+$/, "");
    if (reencoded !== s.replace(/=+$/, "")) return null;
    const text = buf.toString("utf-8");
    if (!text || /[\x00-\x08\x0e-\x1f]/.test(text)) return null;
    return text;
  } catch {
    return null;
  }
}

function asProtocol(raw: unknown): RawProxyProtocol {
  if (typeof raw !== "string") return "unknown";
  const t = raw.toLowerCase().trim();
  if (DIRECT_TYPES.has(t)) return t as DirectProxyType;
  if (NEEDS_CORE_PROTOCOLS.has(t as RawProxyProtocol)) return t as RawProxyProtocol;
  return "unknown";
}

function nodeFromClashObject(obj: Record<string, unknown>): SubscriptionNode | NeedsCoreNode | null {
  if (!obj || typeof obj !== "object") return null;
  const name = typeof obj.name === "string" ? obj.name : "";
  const type = asProtocol(obj.type);
  const host = typeof obj.server === "string" ? obj.server : "";
  const port = Number(obj.port) || 0;
  if (!name || !host || !port) return null;
  if (DIRECT_TYPES.has(type)) {
    return {
      name,
      type: type as DirectProxyType,
      host,
      port,
      username: typeof obj.username === "string" && obj.username ? obj.username : undefined,
      password: typeof obj.password === "string" && obj.password ? obj.password : undefined,
      rawProtocol: type as RawProxyProtocol,
    };
  }
  if (NEEDS_CORE_PROTOCOLS.has(type)) {
    return {
      name,
      rawProtocol: type as RawProxyProtocol,
      host,
      port,
      detail: `${type}://${host}:${port}`,
    };
  }
  return null;
}

function nodeFromUri(uri: string): SubscriptionNode | NeedsCoreNode | null {
  let parsed: URL;
  try {
    parsed = new URL(uri);
  } catch {
    return null;
  }
  const scheme = parsed.protocol.replace(":", "").toLowerCase();

  // vmess:// is special: the URL carries a base64(JSON) blob in place of
  // host:port (`vmess://eyJhZGQiOi...`). Handle it BEFORE the host/port check.
  if (scheme === "vmess") {
    const b64 = (parsed.pathname || "").replace(/^\//, "");
    const tag = decodeURIComponent((parsed.hash || "").replace(/^#/, ""));
    const name = tag || `vmess-${(parsed.hostname || "").slice(0, 8) || "node"}`;
    let host = parsed.hostname || undefined;
    let port = parsed.port ? Number(parsed.port) : undefined;
    try {
      if (b64) {
        const json = JSON.parse(Buffer.from(b64, "base64").toString("utf-8"));
        if (json && typeof json.add === "string") {
          host = json.add;
          port = Number(json.port) || port;
        }
      }
    } catch {
      // keep generic
    }
    const detail = host && port ? `vmess://${host}:${port}` : `vmess://${(b64 || "").slice(0, 16)}`;
    return {
      name,
      rawProtocol: "vmess",
      host,
      port,
      detail,
    };
  }

  const name = decodeURIComponent(parsed.hash.replace(/^#/, "")) || parsed.hostname;
  const host = parsed.hostname;
  const port = Number(parsed.port);
  if (!host || !port) return null;

  if (DIRECT_TYPES.has(scheme)) {
    return {
      name,
      type: scheme as DirectProxyType,
      host,
      port,
      username: parsed.username ? decodeURIComponent(parsed.username) : undefined,
      password: parsed.password ? decodeURIComponent(parsed.password) : undefined,
      rawProtocol: scheme as RawProxyProtocol,
    };
  }

  if (scheme === "ss") {
    // SIP002: ss://base64(user:pass)@host:port  OR  ss://method:pass@host:port
    // We only need host/port for direct usability; SS itself needs a core, so
    // report as needsCore but carry the host/port for the operator's reference.
    return {
      name,
      rawProtocol: "ss",
      host,
      port,
      detail: `ss://${host}:${port}`,
    };
  }

  if (NEEDS_CORE_PROTOCOLS.has(scheme as RawProxyProtocol)) {
    return {
      name,
      rawProtocol: scheme as RawProxyProtocol,
      host,
      port,
      detail: `${scheme}://${host}:${port}`,
    };
  }

  return null;
}

function collectFromArray(items: unknown[], format: ParsedSubscription["format"]): ParsedSubscription {
  const nodes: SubscriptionNode[] = [];
  const needsCore: NeedsCoreNode[] = [];
  for (const item of items) {
    if (typeof item === "string") {
      const n = nodeFromUri(item.trim());
      if (n) (isDirect(n) ? nodes : needsCore).push(n);
      continue;
    }
    if (item && typeof item === "object") {
      const n = nodeFromClashObject(item as Record<string, unknown>);
      if (n) (isDirect(n) ? nodes : needsCore).push(n);
    }
  }
  return { nodes, needsCore, format };
}

function isDirect(n: SubscriptionNode | NeedsCoreNode): n is SubscriptionNode {
  return (n as SubscriptionNode).type !== undefined;
}

function parseClashYaml(content: string): ParsedSubscription {
  try {
    const doc = yaml.load(content) as Record<string, unknown> | null;
    if (doc && Array.isArray(doc.proxies)) {
      return collectFromArray(doc.proxies, "clash-yaml");
    }
    if (doc && Array.isArray((doc as Record<string, unknown>).outbounds)) {
      return collectFromArray((doc as Record<string, unknown>).outbounds as unknown[], "clash-yaml");
    }
  } catch {
    // fall through to unknown
  }
  return { nodes: [], needsCore: [], format: "unknown" };
}

function parseLineList(lines: string[]): ParsedSubscription {
  const nodes: SubscriptionNode[] = [];
  const needsCore: NeedsCoreNode[] = [];
  for (const line of lines) {
    const n = nodeFromUri(line);
    if (n) (isDirect(n) ? nodes : needsCore).push(n);
  }
  return { nodes, needsCore, format: "lines" };
}

/** Parse a subscription body into a normalized node model. */
export function parseSubscription(body: string): ParsedSubscription {
  const text = (body || "").trim();
  if (!text) return { nodes: [], needsCore: [], format: "empty" };

  const decoded = tryDecodeBase64(text);
  const base64Used = decoded !== null && decoded !== text;
  const content = decoded ?? text;

  if (
    /^\s*proxies\s*:/m.test(content) ||
    /^\s*proxy-providers\s*:/m.test(content) ||
    /^\s*outbounds\s*:/m.test(content)
  ) {
    const res = parseClashYaml(content);
    return base64Used ? { ...res, format: "base64-lines" } : res;
  }

  if (content.startsWith("{") || content.startsWith("[")) {
    try {
      const json = JSON.parse(content);
      if (Array.isArray(json)) return collectFromArray(json, "v2ray-json");
      if (json && Array.isArray(json.proxies)) return collectFromArray(json.proxies, "clash-json");
      if (json && Array.isArray(json.outbounds)) return collectFromArray(json.outbounds, "v2ray-json");
    } catch {
      // fall through
    }
  }

  const lines = content.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  if (lines.length > 0 && lines.some((l) => /^[a-zA-Z][a-zA-Z0-9+.\-]*:\/\//.test(l))) {
    const res = parseLineList(lines);
    return base64Used ? { ...res, format: "base64-lines" } : res;
  }

  return { nodes: [], needsCore: [], format: "unknown" };
}

/** Redacted node summary for storage/display (no secrets). */
export function redactedNodeSummary(parsed: ParsedSubscription): Array<
  Record<string, unknown>
> {
  const direct = parsed.nodes.map((n) => ({
    name: n.name,
    type: n.type,
    host: n.host,
    port: n.port,
    rawProtocol: n.rawProtocol,
    hasAuth: Boolean(n.username || n.password),
  }));
  const core = parsed.needsCore.map((n) => ({
    name: n.name,
    rawProtocol: n.rawProtocol,
    host: n.host,
    port: n.port,
    detail: n.detail,
  }));
  return [...direct, ...core];
}
