import { readFileSync } from "node:fs";

/**
 * Resolved connection config for the Codex app-server WS transport.
 *
 * The app-server is a locally-running `codex app-server` process reachable over a
 * single WebSocket speaking JSON-RPC 2.0. It self-manages OpenAI auth + model
 * routing; the ONLY credential OmniRoute presents is the capability token, sent as
 * `Authorization: Bearer <hex>` on the WS handshake.
 */
export interface CodexAppServerConfig {
  /** ws:// or wss:// URL of the app-server (e.g. "ws://ts-egress:1456"). */
  url: string;
  /** Capability token (hex string) sent as `Authorization: Bearer <token>`. */
  token: string;
  /** Working directory passed to `thread/start { cwd }` inside the codex container. */
  cwd: string;
  /**
   * Optional codex approval policy override (AskForApproval). Defaults to "never"
   * in the executor so codex runs non-interactively and never blocks the turn on
   * its own approval — the harness that consumes OmniRoute owns execution policy.
   */
  approvalPolicy?: string;
  /**
   * Optional codex sandbox override (SandboxMode). Defaults to "workspace-write"
   * in the executor (hardened after the #11205 security review; WAS
   * "danger-full-access") so codex's own command/file execution is confined to
   * the turn's cwd tree. Widen per connection via providerSpecificData or env.
   */
  sandbox?: string;
}

type ProviderSpecificData = Record<string, unknown> | null | undefined;

/** Where a resolved value came from — the SSRF binding below keys off this. */
type ConfigSource = "psd" | "env";

function firstString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return null;
}

function firstStringWithSource(
  psdValue: unknown,
  envValue: unknown
): { value: string; source: ConfigSource } | null {
  if (typeof psdValue === "string" && psdValue.trim().length > 0) {
    return { value: psdValue.trim(), source: "psd" };
  }
  if (typeof envValue === "string" && envValue.trim().length > 0) {
    return { value: envValue.trim(), source: "env" };
  }
  return null;
}

/**
 * Read the capability token, preferring an inline token, then a token FILE path.
 * The token file (produced by `codex app-server --ws-token-file <path>`) holds the
 * same hex string that is presented as the bearer token. The source of the value
 * (psd vs env) is tracked for the credential/URL binding rule.
 */
function resolveTokenWithSource(
  psd: ProviderSpecificData
): { value: string; source: ConfigSource } | null {
  const inlinePsd = firstString(psd?.codexAppServerToken);
  if (inlinePsd) return { value: inlinePsd, source: "psd" };
  const inlineEnv = firstString(process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN);
  if (inlineEnv) return { value: inlineEnv, source: "env" };

  const filePsd = firstString(psd?.codexAppServerTokenFile);
  if (filePsd) {
    const contents = readTokenFile(filePsd);
    if (contents) return { value: contents, source: "psd" };
  }
  const fileEnv = firstString(process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE);
  if (fileEnv) {
    const contents = readTokenFile(fileEnv);
    if (contents) return { value: contents, source: "env" };
  }
  return null;
}

function readTokenFile(tokenFile: string): string | null {
  try {
    const contents = readFileSync(tokenFile, "utf8").trim();
    return contents.length > 0 ? contents : null;
  } catch {
    return null;
  }
}

function isWebSocketUrl(url: string): boolean {
  return url.startsWith("ws://") || url.startsWith("wss://");
}

function urlHostname(url: string): string | null {
  try {
    return new URL(url).hostname || null;
  } catch {
    return null;
  }
}

/**
 * Is this hostname inside the operator's own network? Used by the
 * credential/URL binding rule: an ENV-sourced capability token (the operator's
 * shared secret, not visible to whoever wrote a connection's
 * providerSpecificData) may only be sent to env-configured URLs or to
 * operator-local hosts. Literal addresses only — no DNS resolution, so a
 * public hostname can never smuggle an env token out via DNS. Single-label
 * names (`ts-egress`) resolve via the operator's own hosts/mDNS and count as
 * local; dotted names must carry a known-local suffix.
 */
export function isLocalAppServerHost(hostname: string): boolean {
  const h = hostname
    .trim()
    .toLowerCase()
    .replace(/^\[|\]$/g, "");
  if (!h) return false;
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h.endsWith(".local") || h.endsWith(".ts.net") || h.endsWith(".internal")) return true;
  if (h.includes(":")) {
    // IPv6: loopback, ULA (fc00::/7), link-local (fe80::/10)
    if (h === "::1") return true;
    return /^f[cd]/.test(h) || /^fe[89ab]/.test(h);
  }
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(h);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a === 10 || a === 127) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
    return false;
  }
  // single-label hostname (no dots): LAN/hosts-file/mDNS name
  if (!h.includes(".")) return true;
  return false;
}

/**
 * Resolve the app-server connection config from providerSpecificData with env
 * fallbacks. Returns `null` when not fully configured (URL + token both required)
 * so the gating predicate `isCodexAppServerRequired` stays false and Codex falls
 * back to its other transports.
 *
 * CREDENTIAL/URL BINDING (hardening after the #11205 security review): an
 * env-sourced token is the operator's shared secret. It is only ever paired
 * with (a) an env-sourced URL, or (b) an operator-local host
 * (isLocalAppServerHost). A providerSpecificData URL pointing at an outside
 * host combined with an env token is refused (returns null) — otherwise anyone
 * able to write a connection could exfiltrate the env credential. A
 * psd-sourced token may go anywhere: whoever wrote the psd already knows it.
 */
export function resolveAppServerConfig(psd: ProviderSpecificData): CodexAppServerConfig | null {
  const urlRes = firstStringWithSource(psd?.codexAppServerUrl, process.env.OMNIROUTE_CODEX_APPSERVER_WS);
  if (!urlRes || !isWebSocketUrl(urlRes.value)) return null;

  const tokenRes = resolveTokenWithSource(psd);
  if (!tokenRes) return null;

  if (tokenRes.source === "env" && urlRes.source === "psd") {
    const host = urlHostname(urlRes.value);
    if (!host || !isLocalAppServerHost(host)) return null;
  }

  const url = urlRes.value;
  const token = tokenRes.value;

  const cwd =
    firstString(psd?.codexAppServerCwd, process.env.OMNIROUTE_CODEX_APPSERVER_CWD) ?? "/tmp";

  const approvalPolicy =
    firstString(psd?.codexAppServerApprovalPolicy, process.env.OMNIROUTE_CODEX_APPSERVER_APPROVAL) ??
    undefined;
  const sandbox =
    firstString(psd?.codexAppServerSandbox, process.env.OMNIROUTE_CODEX_APPSERVER_SANDBOX) ??
    undefined;

  return { url, token, cwd, ...(approvalPolicy ? { approvalPolicy } : {}), ...(sandbox ? { sandbox } : {}) };
}

/**
 * The turn/start policy triple for a resolved config (hardening after the
 * #11205 security review):
 * - approvalPolicy defaults to "never": codex must not block a router turn on
 *   its own interactive approval (unchanged).
 * - sandbox defaults to "workspace-write" (WAS "danger-full-access"): codex's
 *   own command/file execution is confined to the turn's cwd tree unless the
 *   operator explicitly widens it (providerSpecificData.codexAppServerSandbox /
 *   OMNIROUTE_CODEX_APPSERVER_SANDBOX). With "never" + a permissive sandbox,
 *   codex would run model-decided commands on the host with no gate at all.
 * - autoApprove defaults to false: server→client approval prompts are answered
 *   "denied" unless the operator opts in via
 *   providerSpecificData.codexAppServerAutoApprove ("true"/"1"/"yes") or
 *   OMNIROUTE_CODEX_APPSERVER_AUTO_APPROVE. Harness tool calls are unaffected —
 *   they travel the separate item/tool/call passthrough.
 */
export function resolveThreadStartPolicy(
  config: CodexAppServerConfig,
  psd: ProviderSpecificData
): { approvalPolicy: string; sandbox: string; autoApprove: boolean } {
  const raw = firstString(
    psd?.codexAppServerAutoApprove,
    process.env.OMNIROUTE_CODEX_APPSERVER_AUTO_APPROVE
  );
  const autoApprove = raw === "true" || raw === "1" || raw === "yes";
  return {
    approvalPolicy: config.approvalPolicy ?? "never",
    sandbox: config.sandbox ?? "workspace-write",
    autoApprove,
  };
}
