const https = require("https");
const net = require("net");
const fs = require("fs");
const path = require("path");
const dns = require("dns");
const { promisify } = require("util");
const os = require("os");

// Resolve data directory — mirrors src/lib/dataPaths.ts logic.
// This file runs as a standalone CommonJS process and cannot import the ES module.
function getDataDir() {
  if (process.env.DATA_DIR) return path.resolve(process.env.DATA_DIR.trim());
  return path.join(os.homedir(), ".omniroute");
}

// Configuration
// Keep in sync with src/mitm/targets/antigravity.ts. Antigravity hosts are the
// historical baseline — they remain hard-coded so the proxy keeps working even
// if targets.json is missing or unreadable.
// T-A-F3: baseline set extended at runtime via loadDynamicTargets() below.
const TARGET_HOSTS = new Set([
  "daily-cloudcode-pa.sandbox.googleapis.com",
  "daily-cloudcode-pa.googleapis.com",
  "cloudcode-pa.googleapis.com",
  "autopush-cloudcode-pa.sandbox.googleapis.com",
]);

// T-A-F3: track which agent each host belongs to (for logging only).
const TARGET_HOST_AGENT = new Map();
for (const h of TARGET_HOSTS) TARGET_HOST_AGENT.set(h, "antigravity");

const parsedLocalPort = Number.parseInt(process.env.MITM_LOCAL_PORT || "443", 10);
const LOCAL_PORT =
  Number.isInteger(parsedLocalPort) && parsedLocalPort > 0 && parsedLocalPort <= 65535
    ? parsedLocalPort
    : 443;
// Idle timeout for sockets/tunnels. Mirrors ProxyBridge's 60s relay timeout so
// hung/half-open connections cannot accumulate and exhaust fds. (Gap 10.)
const parsedIdleTimeout = Number.parseInt(process.env.MITM_IDLE_TIMEOUT_MS || "60000", 10);
const MITM_IDLE_TIMEOUT_MS =
  Number.isInteger(parsedIdleTimeout) && parsedIdleTimeout > 0 ? parsedIdleTimeout : 60000;
const ROUTER_BASE_URL = (
  process.env.OMNIROUTE_BASE_URL ||
  process.env.BASE_URL ||
  "http://localhost:20128"
)
  .trim()
  .replace(/\/+$/, "");
const ROUTER_URL = `${ROUTER_BASE_URL}/v1/chat/completions`;
const API_KEY = process.env.ROUTER_API_KEY;
const DATA_DIR = getDataDir();
const DB_FILE = path.join(DATA_DIR, "db.json");
const SQLITE_FILE = path.join(DATA_DIR, "storage.sqlite");

// T-A-F3: dynamic-targets file written by manager.writeTargetsJson() (F3).
// Schema: { targets: Array<{ id, hosts: string[] }> }. Missing/invalid file
// is non-fatal — we keep the baseline antigravity hosts so existing installs
// continue to function while AgentBridge targets roll out.
const TARGETS_JSON_FILE = path.join(DATA_DIR, "mitm", "targets.json");
function loadDynamicTargets() {
  try {
    if (!fs.existsSync(TARGETS_JSON_FILE)) return 0;
    const raw = fs.readFileSync(TARGETS_JSON_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.targets)) return 0;
    let added = 0;
    for (const t of parsed.targets) {
      if (!t || typeof t !== "object") continue;
      const id = typeof t.id === "string" ? t.id : "unknown";
      const hosts = Array.isArray(t.hosts) ? t.hosts : [];
      for (const host of hosts) {
        if (typeof host !== "string" || !host) continue;
        const lower = host.toLowerCase();
        if (!TARGET_HOSTS.has(lower)) {
          TARGET_HOSTS.add(lower);
          TARGET_HOST_AGENT.set(lower, id);
          added++;
        }
      }
    }
    return added;
  } catch (err) {
    console.error(`[MITM] Failed to load targets.json: ${err.message}`);
    return 0;
  }
}
// T-A-F3: load dynamic targets at startup; antigravity baseline remains intact.
const _dynamicAdded = loadDynamicTargets();
if (_dynamicAdded > 0) {
  console.log(`[MITM] Loaded ${_dynamicAdded} additional host(s) from targets.json`);
}

// =========================================================================
// Minimal CJS port of `sanitizeErrorMessage` from open-sse/utils/error.ts.
// Hard Rule #12: HTTP / SSE error bodies must never expose raw err.stack /
// err.message. The CJS proxy cannot import the TS ESM module, so we mirror
// the linear (ReDoS-safe) tokenizer here.
// =========================================================================
const SANITIZE_MAX_LEN = 4096;
const SANITIZE_SOURCE_EXT = ["ts", "tsx", "js", "jsx", "mjs", "cjs"];
function looksLikeAbsolutePath(tok) {
  if (tok.length < 4 || tok.length > 2048) return false;
  const isPosix = tok.charCodeAt(0) === 0x2f;
  const isWindows =
    tok.length > 2 && tok.charCodeAt(1) === 0x3a && /[A-Za-z]/.test(tok[0]);
  if (!isPosix && !isWindows) return false;
  const dot = tok.lastIndexOf(".");
  if (dot <= 0 || dot === tok.length - 1) return false;
  const ext = tok.slice(dot + 1).split(":", 1)[0].toLowerCase();
  return SANITIZE_SOURCE_EXT.includes(ext);
}
function sanitizeErrorMessage(message) {
  let str =
    typeof message === "string" ? message : String(message == null ? "" : message);
  if (str.length > SANITIZE_MAX_LEN) str = str.slice(0, SANITIZE_MAX_LEN);
  const nl = str.indexOf("\n");
  const firstLine = nl >= 0 ? str.slice(0, nl) : str;
  const parts = firstLine.split(/(\s+)/);
  for (let i = 0; i < parts.length; i++) {
    if (looksLikeAbsolutePath(parts[i])) parts[i] = "<path>";
  }
  return parts.join("");
}

// =========================================================================
// C1 — Passthrough / Bypass routing (plan 11 §4.6, master plan §3.5/§12 #16).
//
// The CJS proxy mirrors the routing logic of `src/mitm/passthrough.ts` and
// `src/mitm/targets/index.ts::routeConnection` so CONNECT tunnels for hosts
// that aren't AgentBridge targets and aren't on the user bypass list still
// get a transparent TCP forward (no TLS decrypt). Defaults live in the
// `_internal/bypass.cjs` shim (also used by unit tests). The user list lives
// in <DATA_DIR>/mitm/bypass.json written by `manager.writeBypassJson()`.
// =========================================================================

const bypassShim = require("./_internal/bypass.cjs");
const ingestShim = require("./_internal/ingest.cjs");
const forwardShim = require("./_internal/forwardTarget.cjs");

// Inspector capture (D4 fallback). The standalone proxy intercepts AgentBridge
// traffic inline (no MitmHandlerBase / agentBridgeHook), so it posts captured
// entries to the local-only ingest endpoint to make them visible in the Traffic
// Inspector. The token is injected by manager.ts (same value the OmniRoute
// process uses); absent token → capture is silently skipped.
const INGEST_TOKEN = process.env.INSPECTOR_INTERNAL_INGEST_TOKEN || "";
// Cap captured bodies to keep proxy memory bounded (the buffer truncates again).
const INGEST_MAX_BODY = 65536;

// Flatten Node http headers (plain object, values string|string[]) or a fetch
// Headers instance into a Record<string,string> for the inspector entry.
function headersToObject(headers) {
  const out = {};
  if (!headers) return out;
  if (typeof headers.forEach === "function") {
    // fetch Headers instance: forEach(value, key)
    headers.forEach((value, key) => {
      out[String(key)] = String(value);
    });
    return out;
  }
  for (const key of Object.keys(headers)) {
    const v = headers[key];
    if (v == null) continue;
    out[key] = Array.isArray(v) ? v.join(", ") : String(v);
  }
  return out;
}

// Routing-decision log verbosity (Gap 15). MITM_VERBOSE=0 silences the
// per-request decision lines; default 1 preserves the previous behavior.
const VERBOSE = bypassShim.parseVerboseLevel(process.env.MITM_VERBOSE);
function vlog(level, msg) {
  if (VERBOSE >= level) console.log(msg);
}

const BYPASS_JSON_FILE = path.join(DATA_DIR, "mitm", "bypass.json");
let _userBypassPatterns = []; // array of glob strings, lowercased

function loadUserBypassPatterns() {
  try {
    if (!fs.existsSync(BYPASS_JSON_FILE)) {
      _userBypassPatterns = [];
      return 0;
    }
    const raw = fs.readFileSync(BYPASS_JSON_FILE, "utf-8");
    _userBypassPatterns = bypassShim.parseBypassJson(raw);
    return _userBypassPatterns.length;
  } catch (err) {
    console.error(`[MITM] Failed to load bypass.json: ${err.message}`);
    _userBypassPatterns = [];
    return 0;
  }
}

function routeBypass(hostname) {
  return bypassShim.routeBypass(hostname, TARGET_HOSTS, _userBypassPatterns);
}

const _bypassLoaded = loadUserBypassPatterns();
if (_bypassLoaded > 0) {
  console.log(
    `[MITM] Loaded ${_bypassLoaded} user bypass pattern(s) from bypass.json`
  );
}

let _sqliteDb = null;

// Toggle logging (set true to enable file logging for debugging)
const ENABLE_FILE_LOG = false;

if (!API_KEY) {
  console.error("❌ ROUTER_API_KEY required");
  process.exit(1);
}

// Load SSL certificates
const certDir = path.join(DATA_DIR, "mitm");
const STATS_FILE = path.join(certDir, "stats.json");
const stats = {
  startedAt: null,
  totalRequests: 0,
  interceptedRequests: 0,
  activeConnections: 0,
  lastRequestAt: null,
  lastInterceptAt: null,
};

function writeStats() {
  try {
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  } catch {
    // Stats are best-effort and should not affect proxy traffic.
  }
}

const sslOptions = {
  key: fs.readFileSync(path.join(certDir, "server.key")),
  cert: fs.readFileSync(path.join(certDir, "server.crt")),
};

// Chat endpoints that should be intercepted
const CHAT_URL_PATTERNS = [":generateContent", ":streamGenerateContent"];

// Log directory for request/response dumps
const LOG_DIR = path.join(__dirname, "../../logs/mitm");
if (ENABLE_FILE_LOG && !fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

// Safe log filename: only alphanumeric + hyphens, anchored inside LOG_DIR
function safeLogPath(name) {
  const safe = name.replace(/[^a-zA-Z0-9_\-]/g, "_").substring(0, 80);
  const resolved = path.resolve(LOG_DIR, safe);
  if (!resolved.startsWith(path.resolve(LOG_DIR) + path.sep)) {
    throw new Error("Path traversal attempt detected in log filename");
  }
  return resolved;
}

function saveRequestLog(url, bodyBuffer) {
  if (!ENABLE_FILE_LOG) return;
  try {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const urlSlug = url.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 60);
    const filePath = safeLogPath(`${ts}_${urlSlug}.json`);
    const body = JSON.parse(bodyBuffer.toString());
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
    console.log(`💾 Saved request: ${filePath}`);
  } catch {
    // Ignore
  }
}

function saveResponseLog(url, data) {
  if (!ENABLE_FILE_LOG) return;
  try {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const urlSlug = url.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 60);
    const filePath = safeLogPath(`${ts}_${urlSlug}_response.txt`);
    fs.writeFileSync(filePath, data);
    console.log(`💾 Saved response: ${filePath}`);
  } catch {
    // Ignore
  }
}

// Resolve real IP of target host (bypass /etc/hosts)
const cachedTargetIPs = new Map();
function getTargetHost(req) {
  const host = String(req.headers.host || "")
    .split(":")[0]
    .toLowerCase();
  return TARGET_HOSTS.has(host) ? host : "daily-cloudcode-pa.sandbox.googleapis.com";
}

async function resolveTargetIP(targetHost) {
  if (cachedTargetIPs.has(targetHost)) return cachedTargetIPs.get(targetHost);
  const resolver = new dns.Resolver();
  resolver.setServers(["8.8.8.8"]);
  const resolve4 = promisify(resolver.resolve4.bind(resolver));
  const addresses = await resolve4(targetHost);
  const targetIP = addresses[0];
  cachedTargetIPs.set(targetHost, targetIP);
  return targetIP;
}

function collectBodyRaw(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function extractModel(body) {
  try {
    return JSON.parse(body.toString()).model || null;
  } catch {
    return null;
  }
}

/**
 * Get a lazy SQLite connection for reading MITM aliases.
 * Falls back to null if better-sqlite3 is unavailable.
 */
function getSqliteDb() {
  if (_sqliteDb) return _sqliteDb;
  try {
    const Database = require("better-sqlite3");
    if (fs.existsSync(SQLITE_FILE)) {
      _sqliteDb = new Database(SQLITE_FILE, { readonly: true });
      return _sqliteDb;
    }
  } catch {
    // better-sqlite3 not available in this process
  }
  return null;
}

function getMappedModel(model) {
  if (!model) return null;

  // Primary: read from SQLite key_value table
  try {
    const db = getSqliteDb();
    if (db) {
      const row = db
        .prepare(
          "SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = 'antigravity'"
        )
        .get();
      if (row) {
        const mappings = JSON.parse(row.value);
        return mappings[model] || null;
      }
    }
  } catch {
    // Fall through to JSON fallback
  }

  // Fallback: read from db.json (legacy installs not yet migrated)
  try {
    if (fs.existsSync(DB_FILE)) {
      const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
      return db.mitmAlias?.antigravity?.[model] || null;
    }
  } catch {
    // Ignore
  }

  return null;
}

async function passthrough(req, res, bodyBuffer) {
  const targetHost = getTargetHost(req);
  const targetIP = await resolveTargetIP(targetHost);

  // Defense-in-depth loop guard (Gap 14). The x-omniroute-source header is the
  // primary guard; this is a structural backstop for when it is stripped: if
  // the upstream resolves to ourselves (loopback on our own listen port),
  // forwarding would re-enter this server forever. Refuse instead of looping.
  if (bypassShim.isSelfLoopDestination(targetIP, 443, LOCAL_PORT)) {
    console.error(
      `❌ Loop guard: ${targetHost} resolves to self (${targetIP}:${LOCAL_PORT}) — refusing to forward`
    );
    if (!res.headersSent) res.writeHead(508);
    res.end("Loop Detected");
    return;
  }

  // TLS validation is enabled by default. Set MITM_DISABLE_TLS_VERIFY=1 only
  // in controlled local environments where the target uses a self-signed cert.
  const rejectUnauthorized = process.env.MITM_DISABLE_TLS_VERIFY !== "1";

  const forwardReq = https.request(
    {
      hostname: targetIP,
      port: 443,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: targetHost },
      servername: targetHost,
      rejectUnauthorized,
    },
    (forwardRes) => {
      res.writeHead(forwardRes.statusCode, forwardRes.headers);
      forwardRes.pipe(res);
    }
  );

  forwardReq.on("error", (err) => {
    console.error(`❌ Passthrough error: ${err.message}`);
    if (!res.headersSent) res.writeHead(502);
    res.end("Bad Gateway");
  });

  if (bodyBuffer.length > 0) forwardReq.write(bodyBuffer);
  forwardReq.end();
}

// Build + fire-and-forget the inspector capture entry. NEVER throws — capture
// must not be able to break proxy traffic. Bodies/headers are sent raw over the
// token-gated loopback ingest endpoint, which masks secrets server-side.
function captureToInspector(o) {
  if (!INGEST_TOKEN) return; // capture disabled (no token wired by manager)
  try {
    const entry = ingestShim.buildIngestEntry({
      method: o.req.method,
      host: o.req.headers.host || "",
      path: o.req.url || "/",
      agentId: o.agentId,
      sourceModel: o.sourceModel != null ? o.sourceModel : null,
      mappedModel: o.mappedModel,
      requestHeaders: headersToObject(o.req.headers),
      requestBody:
        o.bodyBuffer && o.bodyBuffer.length > 0
          ? o.bodyBuffer.toString("utf8").slice(0, INGEST_MAX_BODY)
          : null,
      requestSize: o.bodyBuffer ? o.bodyBuffer.length : 0,
      status: o.status,
      responseHeaders: o.respHeaders || {},
      responseBody: o.respBody ? o.respBody : null,
      responseSize: o.respSize || 0,
      error: o.error,
      proxyLatencyMs: o.proxyLatencyMs,
      upstreamLatencyMs: o.upstreamLatencyMs,
    });
    void ingestShim.postIngestEntry(ROUTER_BASE_URL, INGEST_TOKEN, entry);
  } catch {
    // capture is best-effort — never break proxy traffic
  }
}

async function intercept(req, res, bodyBuffer, mappedModel, sourceModel) {
  // C2 — Inject AgentBridge correlation headers per master plan §3.5.
  // The OmniRoute router uses these to distinguish AgentBridge traffic from
  // other inbound clients and to record the originating IDE agent id.
  // Resolve agent id from the Host header against the target map; defensive
  // fallback to "unknown" when the host is somehow not in the map.
  const reqHost = String(req.headers.host || "").split(":")[0].toLowerCase();
  const agentId = TARGET_HOST_AGENT.get(reqHost) || "unknown";
  const startedAt = Date.now();
  let upstreamStartedAt = startedAt;
  let captureStatus = "error";
  let respHeaders = {};
  let respBody = "";
  let respSize = 0;
  let captureError;

  try {
    const body = JSON.parse(bodyBuffer.toString());
    body.model = mappedModel;

    // Gap B — the Antigravity IDE speaks cloudcode (the Gemini payload wrapped
    // under `request`) and expects a cloudcode reply. Forward such envelopes to
    // the antigravity-compatible endpoint (which translates both directions) so
    // the IDE gets its own format back; plain OpenAI bodies still go to
    // chat/completions. Without this, cloudcode hits chat/completions and 400s
    // on the missing `messages` field.
    const forward = forwardShim.resolveForwardTarget(ROUTER_BASE_URL, body);
    vlog(1, `[MITM] → forward ${forward.format} ${forward.url}`);

    upstreamStartedAt = Date.now();
    const response = await fetch(forward.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "x-omniroute-source": "agent-bridge",
        "x-omniroute-agent": agentId,
      },
      body: JSON.stringify(body),
    });

    captureStatus = response.status;
    respHeaders = headersToObject(response.headers);

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      respBody = errText.slice(0, INGEST_MAX_BODY);
      respSize = Buffer.byteLength(errText);
      throw new Error(`OmniRoute ${response.status}: ${errText}`);
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        break;
      }
      const text = decoder.decode(value, { stream: true });
      if (respBody.length < INGEST_MAX_BODY) respBody += text;
      respSize += value ? value.length : 0;
      res.write(text);
    }
  } catch (error) {
    // Log the raw message locally (server console only) but never expose it
    // in the response body. Hard Rule #12 — sanitize before sending.
    captureError = sanitizeErrorMessage(error && error.message);
    console.error(`❌ ${error.message}`);
    if (!res.headersSent) res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: {
          message: captureError,
          type: "mitm_error",
        },
      })
    );
  } finally {
    // D4 — make the intercepted (decrypted) request visible in the Traffic
    // Inspector. Fire-and-forget; failures here never affect the client.
    captureToInspector({
      req,
      bodyBuffer,
      agentId,
      sourceModel,
      mappedModel,
      status: captureStatus,
      respHeaders,
      respBody,
      respSize,
      error: captureError,
      proxyLatencyMs: Math.max(0, upstreamStartedAt - startedAt),
      upstreamLatencyMs: Math.max(0, Date.now() - upstreamStartedAt),
    });
  }
}

const server = https.createServer(sslOptions, async (req, res) => {
  stats.totalRequests++;
  stats.lastRequestAt = new Date().toISOString();
  writeStats();

  const bodyBuffer = await collectBodyRaw(req);
  const host = String(req.headers.host || "").split(":")[0].toLowerCase();
  const model = bodyBuffer.length > 0 ? extractModel(bodyBuffer) : null;

  vlog(1, `[MITM] ${req.method} ${host}${req.url} | body: ${bodyBuffer.length}B | model: ${model || "N/A"}`);

  if (bodyBuffer.length > 0) saveRequestLog(req.url, bodyBuffer);

  if (req.headers["x-omniroute-source"] === "omniroute") {
    vlog(1, `[MITM] → PASSTHROUGH (OmniRoute source loop)`);
    return passthrough(req, res, bodyBuffer);
  }

  if (!TARGET_HOSTS.has(host)) {
    vlog(1, `[MITM] → PASSTHROUGH (host ${host} not in target list)`);
    return passthrough(req, res, bodyBuffer);
  }

  const isChatRequest = CHAT_URL_PATTERNS.some((p) => req.url.includes(p));

  if (!isChatRequest) {
    vlog(1, `[MITM] → PASSTHROUGH (URL ${req.url} does not match chat patterns)`);
    return passthrough(req, res, bodyBuffer);
  }

  const mappedModel = getMappedModel(model);

  if (!mappedModel) {
    vlog(1, `[MITM] → PASSTHROUGH (model "${model}" has no MITM alias mapping)`);
    return passthrough(req, res, bodyBuffer);
  }

  stats.interceptedRequests++;
  stats.lastInterceptAt = new Date().toISOString();
  writeStats();

  vlog(1, `[MITM] INTERCEPTED ${model} → ${mappedModel}`);
  return intercept(req, res, bodyBuffer, mappedModel, model);
});

// =========================================================================
// C1 — CONNECT handler: bypass + passthrough TCP support (plan 11 §4.6).
//
// Clients (browsers, IDE agents acting as HTTP proxy clients) send a
// CONNECT request before opening a TLS tunnel. The original `https.Server`
// has no built-in CONNECT handler because it expects connections to come
// pre-routed (typically via /etc/hosts DNS spoofing). For AgentBridge we
// also accept clients configured with HTTPS_PROXY/HTTP_PROXY, where every
// HTTPS request arrives as CONNECT. For those:
//
//   - bypass hostname → raw TCP pipe upstream, NO TLS decrypt, NO log of
//     body or headers. Privacy contract: bypass = "never see content".
//   - passthrough (host not in TARGET_HOSTS, no bypass match) → raw TCP
//     pipe upstream so the user's system never loses internet for hosts
//     outside our scope. Acceptance criterion §12 #16.
//   - target hostname → write 200 Connection Established and pipe the
//     client socket into the local TLS-terminating port so the existing
//     https.createServer can decrypt and route via the normal flow.
//
// Note: in the DNS-spoof mode (IDE points at 127.0.0.1 via /etc/hosts),
// IDEs reach the server directly without CONNECT; the existing
// `https.createServer` request handler still applies for those. The
// CONNECT handler only fires for clients that explicitly speak proxy.
// =========================================================================

function parseConnectAuthority(authority) {
  // CONNECT host[:port]
  const idx = authority.lastIndexOf(":");
  if (idx === -1) return { host: authority.toLowerCase(), port: 443 };
  const host = authority.slice(0, idx).toLowerCase();
  const port = Number.parseInt(authority.slice(idx + 1), 10);
  return {
    host,
    port: Number.isInteger(port) && port > 0 && port <= 65535 ? port : 443,
  };
}

function rawTcpForward(clientSocket, head, host, port, label) {
  const targetSocket = net.connect(port, host, () => {
    clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    if (head && head.length > 0) targetSocket.write(head);
    targetSocket.pipe(clientSocket);
    clientSocket.pipe(targetSocket);
    // Reap a half-open/hung tunnel after the idle timeout so neither side leaks
    // an fd when the upstream never sends FIN/RST (Gap 10).
    const destroyBoth = () => {
      clientSocket.destroy();
      targetSocket.destroy();
    };
    clientSocket.setTimeout(MITM_IDLE_TIMEOUT_MS, destroyBoth);
    targetSocket.setTimeout(MITM_IDLE_TIMEOUT_MS, destroyBoth);
  });

  // Best-effort cleanup; never crash the proxy on tunnel errors.
  const onErr = (label2) => (err) => {
    console.error(`[MITM] ${label} TCP forward ${label2} error: ${err.message}`);
    try {
      clientSocket.destroy();
    } catch {
      // ignore
    }
    try {
      targetSocket.destroy();
    } catch {
      // ignore
    }
  };
  targetSocket.on("error", onErr("upstream"));
  clientSocket.on("error", onErr("client"));
  clientSocket.on("close", () => {
    try {
      targetSocket.destroy();
    } catch {
      // ignore
    }
  });
  targetSocket.on("close", () => {
    try {
      clientSocket.destroy();
    } catch {
      // ignore
    }
  });
}

// CONNECT handler — scope note (plan 11 §4.6):
//
// This fires ONLY when a client uses this server as an explicit HTTPS proxy and
// sends a `CONNECT host:port` line *inside* an already-established TLS session
// (HTTPS-proxy-tunneled-in-TLS). The primary "no config required" AgentBridge
// flow does NOT use it: there the IDE is pointed at 127.0.0.1 via /etc/hosts DNS
// spoofing and opens TLS DIRECTLY, so requests are routed by the decrypted Host
// header in the request handler above (target → intercept, otherwise passthrough).
// Likewise, bypass/passthrough for *unmapped* hosts in the DNS-spoof model is
// handled by DNS scoping (only spoofed hosts ever resolve to 127.0.0.1), and the
// System-wide proxy mode (plan 12 §2.5.4) routes through httpProxyServer.ts (:8080),
// which has its own CONNECT handling. This handler is retained for the explicit-
// proxy edge case and to honor the routeBypass precedence (bypass > target >
// passthrough); true on-wire bypass-without-decrypt at :443 under direct TLS would
// require SNI sniffing on the raw 'connection' event, which is intentionally out
// of scope for this release.
server.on("connect", (req, clientSocket, head) => {
  const authority = String(req.url || "");
  const { host: connectHost, port: connectPort } = parseConnectAuthority(authority);

  const decision = routeBypass(connectHost);

  if (decision === "bypass") {
    // Privacy: bypass hosts are never logged with body/headers and never
    // TLS-decrypted. Only the hostname appears in console output.
    vlog(1, `[MITM] CONNECT ${connectHost}:${connectPort} → BYPASS (TCP tunnel)`);
    rawTcpForward(clientSocket, head, connectHost, connectPort, "bypass");
    return;
  }

  if (decision === "target") {
    // Hand the tunnel off to the local TLS-terminating server so the existing
    // https.createServer request handler can decrypt and route. We write the
    // 200 response ourselves and then `emit("connection")` so the TLS layer
    // picks the socket up.
    vlog(
      1,
      `[MITM] CONNECT ${connectHost}:${connectPort} → TARGET (TLS terminate locally)`
    );
    clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    if (head && head.length > 0) clientSocket.unshift(head);
    server.emit("connection", clientSocket);
    return;
  }

  // decision === "passthrough"
  vlog(
    1,
    `[MITM] CONNECT ${connectHost}:${connectPort} → PASSTHROUGH (TCP tunnel)`
  );
  rawTcpForward(clientSocket, head, connectHost, connectPort, "passthrough");
});

// Bound full-request / header / keep-alive lifetimes so a slow or hung client
// cannot pin a connection indefinitely (Gap 10).
server.requestTimeout = MITM_IDLE_TIMEOUT_MS * 5; // hard cap on a full request
server.headersTimeout = MITM_IDLE_TIMEOUT_MS; // time allowed to send headers
server.keepAliveTimeout = MITM_IDLE_TIMEOUT_MS; // idle keep-alive window

server.listen(LOCAL_PORT, () => {
  stats.startedAt = new Date().toISOString();
  writeStats();
  console.log(`🚀 MITM ready on :${LOCAL_PORT} → ${ROUTER_URL}`);
});

server.on("connection", (socket) => {
  // Guard against double-counting: a CONNECT "target" tunnel re-emits an
  // already-counted socket into the TLS layer via emit("connection") above.
  if (socket.__mitmCounted) return;
  socket.__mitmCounted = true;
  // Reap idle sockets so hung connections cannot exhaust fds (Gap 10).
  socket.setTimeout(MITM_IDLE_TIMEOUT_MS, () => socket.destroy());
  stats.activeConnections++;
  writeStats();
  socket.on("close", () => {
    stats.activeConnections = Math.max(0, stats.activeConnections - 1);
    writeStats();
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${LOCAL_PORT} already in use`);
  } else if (error.code === "EACCES") {
    console.error(`❌ Permission denied for port ${LOCAL_PORT}`);
  } else {
    console.error(`❌ ${error.message}`);
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});
