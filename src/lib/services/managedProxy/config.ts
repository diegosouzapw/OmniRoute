export type ManagedCore = "singbox" | "xray";
type Json = Record<string, unknown>;
export type ManagedListener = { id: string; port: number; outbound: Json };

const URI_PROTOCOLS = new Set([
  "vless",
  "vmess",
  "trojan",
  "ss",
  "shadowsocks",
  "hy2",
  "hysteria2",
  "tuic",
  "anytls",
]);
const NATIVE_PROTOCOLS = {
  singbox: new Set([
    "socks",
    "http",
    "shadowsocks",
    "vmess",
    "trojan",
    "vless",
    "hysteria",
    "hysteria2",
    "tuic",
    "anytls",
    "snell",
    "shadowtls",
    "naive",
    "ssh",
    "tor",
    "tailcat",
  ]),
  xray: new Set([
    "socks",
    "http",
    "shadowsocks",
    "vmess",
    "vless",
    "trojan",
    "wireguard",
    "hysteria",
  ]),
};
const QUERY_KEYS = new Set([
  "security",
  "type",
  "sni",
  "serverName",
  "fp",
  "alpn",
  "pbk",
  "sid",
  "spx",
  "flow",
  "encryption",
  "path",
  "host",
  "serviceName",
  "service",
  "mode",
  "headerType",
  "allowInsecure",
  "insecure",
  "obfs",
  "obfs-password",
  "upmbps",
  "downmbps",
  "congestion_control",
  "udp_relay_mode",
  "udp_over_stream",
  "zero_rtt_handshake",
  "heartbeat",
  "tfo",
]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function object(value: unknown): value is Json {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function rejectUnsafe(value: unknown, depth = 0): void {
  if (depth > 20) throw new Error("Outbound configuration is too deeply nested");
  if (Array.isArray(value)) return value.forEach((v) => rejectUnsafe(v, depth + 1));
  if (!object(value)) return;
  for (const [key, item] of Object.entries(value)) {
    if (!/^[a-zA-Z0-9_-]{1,64}$/.test(key)) throw new Error("Unsupported outbound option name");
    if (key === "tls" && object(item) && item.enabled === false)
      throw new Error("TLS verification cannot be disabled");
    if (
      /^(insecure|allowInsecure|skip-cert-verify)$/i.test(key) &&
      ![false, "false", 0, "0"].includes(item as string | number | boolean)
    ) {
      throw new Error("TLS verification cannot be disabled");
    }
    if (
      /(_path|Path)$/.test(key) ||
      [
        "detour",
        "proxySettings",
        "dialerProxy",
        "interface",
        "bind_interface",
        "routing_mark",
        "plugin",
        "plugin_opts",
      ].includes(key)
    ) {
      throw new Error(`Unsupported local option: ${key}`);
    }
    rejectUnsafe(item, depth + 1);
  }
}

export function nativeOutbound(core: ManagedCore, value: unknown): Json {
  if (!object(value)) throw new Error("Native outbound must be an object");
  const protocol = core === "singbox" ? value.type : value.protocol;
  if (typeof protocol !== "string" || !NATIVE_PROTOCOLS[core].has(protocol)) {
    throw new Error(`Unsupported ${core} outbound protocol`);
  }
  rejectUnsafe(value);
  const result = structuredClone(value);
  delete result.tag;
  return result;
}

function decode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    throw new Error("Malformed source credential encoding");
  }
}

function decodeBase64(value: string): string {
  if (!/^[A-Za-z0-9+/_=-]+$/.test(value)) throw new Error("Malformed base64 source");
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}

function port(value: unknown): number {
  const result = Number(value);
  if (!Number.isSafeInteger(result) || result < 1 || result > 65535)
    throw new Error("Invalid upstream port");
  return result;
}

function auditQuery(p: URLSearchParams): void {
  for (const key of p.keys()) {
    if (!/^[a-zA-Z0-9_-]{1,64}$/.test(key)) throw new Error("Unsupported option name");
    if (!QUERY_KEYS.has(key)) throw new Error(`Unsupported option: ${key}`);
  }
  for (const key of ["insecure", "allowInsecure"]) {
    const v = p.get(key);
    if (v && !["0", "false"].includes(v.toLowerCase()))
      throw new Error("TLS verification cannot be disabled");
  }
}

function securityKind(p: URLSearchParams, defaultTls: boolean): string {
  const security = (p.get("security") || (defaultTls ? "tls" : "none")).toLowerCase();
  if (security !== "reality" && ["pbk", "sid", "spx"].some((key) => p.has(key)))
    throw new Error("REALITY options require REALITY security");
  if (!["none", "tls", "reality"].includes(security))
    throw new Error("Unsupported option: security");
  if (defaultTls && security === "none") throw new Error("TLS is required for this protocol");
  if (security === "none") {
    if (["sni", "serverName", "fp", "alpn", "pbk", "sid", "spx"].some((key) => p.has(key)))
      throw new Error("TLS options require TLS security");
  }
  return security;
}

function singboxTls(p: URLSearchParams, serverName: string, security: string): Json {
  const alpn = p.get("alpn")?.split(",");
  const fingerprint = p.get("fp");
  const result: Json = { enabled: true, server_name: serverName };
  if (alpn) result.alpn = alpn;
  if (fingerprint) result.utls = { enabled: true, fingerprint };
  if (security === "reality") {
    if (!p.get("pbk")) throw new Error("REALITY public key is required");
    if (p.has("spx")) throw new Error("Unsupported option: spx");
    result.reality = { enabled: true, public_key: p.get("pbk"), short_id: p.get("sid") || "" };
    if (!fingerprint) result.utls = { enabled: true, fingerprint: "chrome" };
  }
  return { tls: result };
}

function xrayTls(p: URLSearchParams, serverName: string, security: string): Json {
  const alpn = p.get("alpn")?.split(",");
  const fingerprint = p.get("fp");
  const settings: Json = { serverName };
  if (alpn) settings.alpn = alpn;
  if (fingerprint) settings.fingerprint = fingerprint;
  if (security === "reality") {
    if (!p.get("pbk")) throw new Error("REALITY public key is required");
    settings.password = p.get("pbk");
    settings.shortId = p.get("sid") || "";
    if (p.has("spx")) settings.spiderX = p.get("spx");
    settings.fingerprint ||= "chrome";
  }
  return { security, [security === "tls" ? "tlsSettings" : "realitySettings"]: settings };
}

function tls(core: ManagedCore, p: URLSearchParams, host: string, defaultTls: boolean): Json {
  auditQuery(p);
  const security = securityKind(p, defaultTls);
  if (security === "none") return core === "singbox" ? {} : { security: "none" };
  const serverName = p.get("sni") || p.get("serverName") || host;
  return core === "singbox"
    ? singboxTls(p, serverName, security)
    : xrayTls(p, serverName, security);
}

function httpTransport(core: ManagedCore, p: URLSearchParams, kind: string): Json {
  if (["service", "serviceName"].some((key) => p.has(key)))
    throw new Error("Service name requires gRPC transport");
  if (core === "singbox" && p.has("mode")) throw new Error("Unsupported option: mode");
  if (core === "singbox" && kind === "xhttp")
    throw new Error("sing-box does not support XHTTP; choose Xray");
  const path = p.get("path") || "/";
  const host = p.get("host");

  const settings: Json = {
    path,
    ...(host ? (kind === "ws" ? { headers: { Host: host } } : { host }) : {}),
  };
  if (core === "singbox") return { transport: { type: kind, ...settings } };
  if (p.has("mode")) {
    if (kind !== "xhttp") throw new Error("Unsupported option: mode");
    settings.mode = p.get("mode");
  }
  return { network: kind, [`${kind}Settings`]: settings };
}

function transport(core: ManagedCore, p: URLSearchParams): Json {
  const kind = (p.get("type") || "tcp").toLowerCase();
  if (!["tcp", "raw", "ws", "grpc", "httpupgrade", "xhttp"].includes(kind))
    throw new Error("Unsupported option: type");
  if (p.has("headerType") && p.get("headerType") !== "none")
    throw new Error("Unsupported option: headerType");
  if (kind === "tcp" || kind === "raw") {
    if (["path", "host", "serviceName", "service", "mode"].some((key) => p.has(key)))
      throw new Error("Transport options require an explicit transport");
    return core === "singbox" ? {} : { network: "raw" };
  }
  if (kind === "grpc") {
    if (["path", "host"].some((key) => p.has(key)))
      throw new Error("Unsupported gRPC transport option");
    if (p.has("mode")) throw new Error("Unsupported option: mode");
    const service = p.get("serviceName") || p.get("service") || "";
    return core === "singbox"
      ? { transport: { type: "grpc", service_name: service } }
      : { network: "grpc", grpcSettings: { serviceName: service } };
  }
  return httpTransport(core, p, kind);
}

type Projection = {
  core: ManagedCore;
  type: string;
  host: string;
  upstreamPort: number;
  secret: string;
  password: string;
  p: URLSearchParams;
  vmess?: Json;
};

function bandwidthOptions(p: URLSearchParams, result: Json): void {
  for (const key of ["upmbps", "downmbps"])
    if (p.has(key)) {
      const n = Number(p.get(key));
      if (!Number.isFinite(n) || n <= 0) throw new Error(`Invalid option: ${key}`);
      result[key === "upmbps" ? "up_mbps" : "down_mbps"] = n;
    }
}

function hysteriaOptions(p: URLSearchParams, result: Json): void {
  bandwidthOptions(p, result);
  if (p.has("obfs-password") && !p.has("obfs"))
    throw new Error("Unsupported option: obfs-password");
  if (p.has("obfs")) {
    if (p.get("obfs") !== "salamander" || !p.get("obfs-password"))
      throw new Error("Unsupported option: obfs");
    result.obfs = { type: "salamander", password: p.get("obfs-password") };
  }
  for (const key of [
    "congestion_control",
    "udp_relay_mode",
    "udp_over_stream",
    "zero_rtt_handshake",
    "heartbeat",
    "tfo",
  ])
    if (p.has(key)) throw new Error(`Unsupported option: ${key}`);
}

function tuicOptions(p: URLSearchParams, result: Json): void {
  for (const key of ["obfs", "obfs-password", "upmbps", "downmbps"])
    if (p.has(key)) throw new Error(`Unsupported option: ${key}`);
  for (const key of ["congestion_control", "udp_relay_mode", "heartbeat"])
    if (p.has(key)) result[key] = p.get(key);
  for (const key of ["udp_over_stream", "zero_rtt_handshake", "tfo"])
    if (p.has(key)) {
      const raw = p.get(key);
      if (!["0", "1", "true", "false"].includes(raw!)) throw new Error(`Invalid option: ${key}`);
      result[key === "tfo" ? "tcp_fast_open" : key] = ["1", "true"].includes(raw!);
    }
}

function singboxProjection(n: Projection, security: Json): Json {
  const { type, host, upstreamPort, secret, password, p, vmess } = n;
  const result: Json = { type, server: host, server_port: upstreamPort, ...security };
  if (["vless", "vmess", "tuic"].includes(type)) result.uuid = secret;
  else result.password = secret;
  if (type === "tuic") result.password = password;
  if (type === "shadowsocks") {
    result.method = secret;
    result.password = password;
  }
  if (p.get("flow")) result.flow = p.get("flow");
  if (vmess) {
    result.security = vmess.scy || "auto";
    result.alter_id = Number(vmess.aid || 0);
  }
  if (["vless", "vmess", "trojan"].includes(type)) Object.assign(result, transport(n.core, p));
  else if (
    ["type", "path", "host", "service", "serviceName", "mode", "headerType"].some((key) =>
      p.has(key)
    )
  )
    throw new Error("This protocol does not support V2Ray transports");
  if (type === "hysteria2") hysteriaOptions(p, result);
  if (type === "tuic") tuicOptions(p, result);
  return result;
}

function xrayProjection(n: Projection, security: Json): Json {
  const { type, host, upstreamPort, secret, password, p, vmess } = n;
  const flow = p.get("flow");
  const account: Json =
    type === "shadowsocks"
      ? { method: secret, password }
      : type === "trojan"
        ? { password: secret }
        : {
            id: secret,
            ...(type === "vless"
              ? { encryption: "none", ...(flow ? { flow } : {}) }
              : { security: vmess?.scy || "auto", alterId: Number(vmess?.aid || 0) }),
          };
  const endpoint: Json = { address: host, port: upstreamPort };
  const settings = ["vless", "vmess"].includes(type)
    ? { vnext: [{ ...endpoint, users: [account] }] }
    : { servers: [{ ...endpoint, ...account }] };
  if (type === "shadowsocks" && p.size)
    throw new Error("Shadowsocks URI options require native outbound import");
  return { protocol: type, settings, streamSettings: { ...security, ...transport(n.core, p) } };
}

function auditProtocol(n: Projection): void {
  const { core, type, secret, p } = n;
  if (core === "xray" && ["hysteria2", "tuic", "anytls"].includes(type))
    throw new Error(`Xray URI conversion does not support ${type}; choose sing-box`);
  if (["vless", "vmess", "tuic"].includes(type) && !UUID.test(secret))
    throw new Error("Invalid proxy UUID");
  if (p.has("flow") && (type !== "vless" || p.get("flow") !== "xtls-rprx-vision"))
    throw new Error("Unsupported option: flow");
  if (p.has("encryption") && (type !== "vless" || p.get("encryption") !== "none"))
    throw new Error("Unsupported option: encryption");
  const extra = [
    "obfs",
    "obfs-password",
    "upmbps",
    "downmbps",
    "congestion_control",
    "udp_relay_mode",
    "udp_over_stream",
    "zero_rtt_handshake",
    "heartbeat",
    "tfo",
  ];
  for (const key of extra) {
    if (p.has(key) && !["hysteria2", "tuic"].includes(type))
      throw new Error(`Unsupported option: ${key}`);
  }
}

function project(
  core: ManagedCore,
  protocol: string,
  host: string,
  upstreamPort: number,
  secret: string,
  password: string,
  p: URLSearchParams,
  vmess?: Json
): Json {
  const type = protocol === "ss" ? "shadowsocks" : protocol === "hy2" ? "hysteria2" : protocol;
  const tlsRequired = ["trojan", "hysteria2", "tuic", "anytls"].includes(type);
  const security = tls(core, p, host, tlsRequired);
  const n = { core, type, host, upstreamPort, secret, password, p, vmess };
  auditProtocol(n);
  return core === "singbox" ? singboxProjection(n, security) : xrayProjection(n, security);
}

function vmessSource(core: ManagedCore, source: string): Json {
  let value: unknown;
  try {
    value = JSON.parse(decodeBase64(source.slice(source.indexOf("://") + 3).split("#")[0]));
  } catch {
    throw new Error("Malformed VMess source");
  }
  if (!object(value)) throw new Error("Invalid VMess source");
  const keys = new Set([
    "v",
    "ps",
    "add",
    "port",
    "id",
    "aid",
    "scy",
    "net",
    "type",
    "host",
    "path",
    "tls",
    "sni",
    "alpn",
    "fp",
  ]);
  for (const key of Object.keys(value)) {
    if (!/^[a-zA-Z0-9_-]{1,64}$/.test(key)) throw new Error("Unsupported VMess option name");
    if (!keys.has(key)) throw new Error(`Unsupported VMess option: ${key}`);
  }
  if (value.type && value.type !== "none") throw new Error("Unsupported VMess option: type");
  const p = new URLSearchParams();
  if (value.net) p.set("type", String(value.net));
  for (const key of ["host", "path", "sni", "alpn", "fp"])
    if (value[key]) p.set(key, String(value[key]));
  p.set(
    "security",
    [true, 1, "1", "tls", "true"].includes(value.tls as string | number | boolean) ? "tls" : "none"
  );
  const host = String(value.add || "");
  if (!host) throw new Error("VMess upstream host is required");
  return project(core, "vmess", host, port(value.port), String(value.id || ""), "", p, value);
}

function uriCredentials(url: URL, scheme: string): { secret: string; password: string } {
  let secret = decode(url.username),
    password = decode(url.password);
  if (scheme === "ss" || scheme === "shadowsocks") {
    if (!password) {
      const credentials = decodeBase64(secret);
      const split = credentials.indexOf(":");
      if (split < 1) throw new Error("Invalid Shadowsocks credentials");
      secret = credentials.slice(0, split);
      password = credentials.slice(split + 1);
    }
    if (!password) throw new Error("Shadowsocks password is required");
  } else if (password && scheme !== "tuic") secret += `:${password}`;
  return { secret, password };
}

function urlSource(core: ManagedCore, source: string, scheme: string): Json {
  let url: URL;
  try {
    url = new URL(source);
  } catch {
    throw new Error("Malformed proxy source URL");
  }
  if (!url.hostname || !url.username)
    throw new Error("Proxy upstream host and credential are required");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  const { secret, password } = uriCredentials(url, scheme);
  const seen = new Set<string>();
  for (const key of url.searchParams.keys()) {
    if (seen.has(key)) throw new Error(`Duplicate option: ${key}`);
    seen.add(key);
  }
  return project(
    core,
    scheme === "shadowsocks" ? "ss" : scheme,
    host,
    port(url.port || (["hy2", "hysteria2"].includes(scheme) ? 443 : 0)),
    secret,
    password,
    url.searchParams
  );
}

export function sourceOutbound(core: ManagedCore, source: string): Json {
  if (source.length > 65536) throw new Error("Proxy source exceeds 64 KiB");
  if (source.trim().startsWith("{")) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(source);
    } catch {
      throw new Error("Malformed native outbound JSON");
    }
    return nativeOutbound(core, parsed);
  }
  const scheme = /^([a-z0-9]+):\/\//i.exec(source)?.[1].toLowerCase();
  if (!scheme || !URI_PROTOCOLS.has(scheme))
    throw new Error("Unsupported source protocol; import a native outbound for the selected core");
  return scheme === "vmess" ? vmessSource(core, source) : urlSource(core, source, scheme);
}

export function renderManagedConfig(core: ManagedCore, entries: ManagedListener[]): Json {
  if (entries.length === 0 || entries.length > 100)
    throw new Error("Managed core requires 1 to 100 listeners");
  const ports = new Set<number>();
  for (const entry of entries) {
    if (!/^[a-zA-Z0-9-]{1,64}$/.test(entry.id) || ports.has(port(entry.port)))
      throw new Error("Duplicate or invalid managed listener");
    ports.add(entry.port);
  }
  if (core === "singbox")
    return {
      log: { disabled: true },
      inbounds: entries.map((e) => ({
        type: "socks",
        tag: `in-${e.id}`,
        listen: "127.0.0.1",
        listen_port: e.port,
      })),
      outbounds: entries.map((e) => ({ ...e.outbound, tag: `out-${e.id}` })),
      route: { rules: entries.map((e) => ({ inbound: [`in-${e.id}`], outbound: `out-${e.id}` })) },
    };
  return {
    log: { loglevel: "none" },
    inbounds: entries.map((e) => ({
      protocol: "socks",
      tag: `in-${e.id}`,
      listen: "127.0.0.1",
      port: e.port,
      settings: { auth: "noauth", udp: true },
    })),
    outbounds: entries.map((e) => ({ ...e.outbound, tag: `out-${e.id}` })),
    routing: {
      rules: entries.map((e) => ({
        type: "field",
        inboundTag: [`in-${e.id}`],
        outboundTag: `out-${e.id}`,
      })),
    },
  };
}

export function nativeCheckArgs(core: ManagedCore, configPath: string): string[] {
  return core === "singbox" ? ["check", "-c", configPath] : ["run", "-test", "-c", configPath];
}
