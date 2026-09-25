import type { ProxyItem } from "./proxyRegistryTypes";

export type UsageInfo = {
  count: number;
  assignments: Array<{ scope: string; scopeId: string | null }>;
};

export type HealthInfo = {
  proxyId: string;
  totalRequests: number;
  successRate: number | null;
  avgLatencyMs: number | null;
  lastSeenAt: string | null;
  transportRate: number | null;
  measured: boolean;
  transportOk: number;
  transportFailures: number;
  upstream4xx: number;
  upstream5xx: number;
  connectionTests: number;
  connectionTestSuccess: number;
};

export type TestResult = {
  success: boolean;
  publicIp?: string;
  latencyMs?: number;
  country?: string;
  error?: string;
};

export const EMPTY_FORM = {
  id: "",
  name: "",
  type: "http",
  host: "",
  port: "8080",
  username: "",
  password: "",
  region: "",
  notes: "",
  status: "active",
  family: "auto",
};

export const BULK_IMPORT_PLACEHOLDER = `# Proxy Bulk Import
# ─────────────────────────────────────────────────────────────────────────────
# FORMAT 1 — Pipe-delimited (full control):
#   NAME|HOST|PORT|USERNAME|PASSWORD|TYPE|REGION|STATUS|NOTES
#   Required: NAME, HOST, PORT
#   Optional: USERNAME, PASSWORD, TYPE (http|https|socks5, default: socks5), REGION, STATUS (active|inactive, default: active), NOTES
#
# FORMAT 2 — Shorthand (one proxy per line, no pipe needed):
#   ip:port                          → no auth, type defaults to socks5
#   ip:port:user:pass                → with auth
#   user:pass@ip:port                → with auth (@-style)
#   user:pass:ip:port                 → with auth (user-pass-first)
#   protocol://ip:port               → explicit protocol
#   protocol://user:pass@ip:port     → explicit protocol + auth
#
# FORMAT 3 — Protocol header mode:
#   Put a bare protocol (http, https, socks5) on its own line to set
#   the default type for all subsequent shorthand lines that don't
#   include an explicit protocol:// prefix.
#
# Lines starting with # are ignored. Existing proxies (same host+port) will be updated.
#
# ─────────────────────────────────────────────────────────────────────────────
# Pipe-delimited examples:
# proxy-us|138.99.147.218|50101|myuser|mypass|socks5|US-East|active|US production proxy
# proxy-eu|200.234.177.62|50101|myuser|mypass|socks5|EU-West
# http-proxy|10.0.0.50|8080|||http||active|Internal HTTP proxy
#
# Shorthand examples:
# 138.99.147.218:50101
# 138.99.147.218:50101:myuser:mypass
# myuser:mypass@138.99.147.218:50101
# myuser:mypass:138.99.147.218:50101
# http://10.0.0.50:8080
# https://admin:secret123@proxy.example.com:443
#
# Protocol header mode example:
# socks5
# 138.99.147.218:50101:myuser:mypass
# 200.234.177.62:50101:otheruser:otherpass
#`;

export type ProxyRegistryManagerProps = {
  onRedeployRelay?: (proxy: ProxyItem) => void;
  showVercelRelay?: boolean;
  showDenoRelay?: boolean;
  showCloudflareRelay?: boolean;
  onOpenVercelRelay?: () => void;
  onOpenDenoRelay?: () => void;
  onOpenCloudflareRelay?: () => void;
};
