import { setTimeout as sleep } from "node:timers/promises";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

const PROVIDERS_WITH_OAUTH = [
  { id: "gemini", name: "Google Gemini", flow: "browser" },
  { id: "antigravity", name: "Antigravity", flow: "browser" },
  { id: "cursor", name: "Cursor", flow: "import" },
  { id: "zed", name: "Zed", flow: "import" },
  { id: "kiro", name: "Amazon Kiro", flow: "social" },
  { id: "claude-code", name: "Claude Code (OAuth)", flow: "browser" },
  // codex is authorization_code_pkce on the server (src/lib/oauth/providers/codex.ts),
  // NOT a device-code provider: the device-code action rejects it, so the old
  // `flow: "device"` label made `oauth start --provider codex` fail with
  // "Failed to start device flow: 404" (issue #14298 finding 5). The dashboard
  // drives codex through the server-hosted callback flow
  // (start-callback-server + poll-callback); mirror that here.
  { id: "codex", name: "OpenAI Codex (OAuth)", flow: "callback" },
  { id: "copilot", name: "GitHub Copilot", flow: "device" },
];

// The user-facing provider id (the one shown by `omniroute oauth providers`)
// is NOT always the backend OAuth provider key the server's /api/oauth/[provider]/...
// route expects. `claude-code` is the CLI-facing alias for Anthropic's Claude
// OAuth, which the server registers under the key `claude` (see
// src/lib/oauth/providers/index.ts). Routing `claude-code` to the unrelated
// `command-code` (CommandCode.ai) provider — as the previous code did — sent
// the device-flow request to /api/providers/command-code/auth/start, which is
// gated by requireManagementAuth and returned 401 for a fresh CLI context
// (issue #9474). Map the alias to the real backend key instead.
//
// `copilot` has the same mismatch (#14298): the GitHub Copilot device flow is
// registered under the backend key `github`, so posting to
// /api/oauth/copilot/device-code failed for an unknown provider.
const BACKEND_OAUTH_KEY = {
  "claude-code": "claude",
  copilot: "github",
};

function resolveBackendKey(id) {
  return BACKEND_OAUTH_KEY[id] ?? id;
}

const oauthProviderSchema = [
  { key: "id", header: "Provider ID", width: 16 },
  { key: "name", header: "Name", width: 28 },
  { key: "flow", header: "Flow", width: 10 },
];

const connectionSchema = [
  { key: "id", header: "Connection ID", width: 22 },
  { key: "provider", header: "Provider", width: 16 },
  { key: "name", header: "Name", width: 24 },
  { key: "isActive", header: "Active", formatter: (v) => (v ? "✓" : "✗") },
  { key: "testStatus", header: "Status", width: 12 },
];

async function openBrowser(url) {
  try {
    const { default: open } = await import("open");
    await open(url);
  } catch {
    // open package not available, ignore silently
  }
}

// Mirrors src/lib/oauth/providers.ts::isLoopbackHostname — used here to detect
// when the redirect_uri the server resolved (and the authorize URL now
// advertises) points at a loopback address the CLI never binds a listener on
// (issue #12413). Returns false on an unparseable URI rather than throwing.
function isLoopbackHost(uri) {
  try {
    return /^(localhost|127\.0\.0\.1|\[::1\]|::1)$/i.test(new URL(uri).hostname);
  } catch {
    return false;
  }
}

function printLoopbackRedirectWarning(providerId, redirectUri) {
  process.stdout.write(
    `Note: the authorize URL below advertises ${redirectUri}, but this CLI does not\n` +
      "listen on that port. Right after you approve, the browser is expected to\n" +
      'show a connection error (e.g. "This site can\'t be reached" / \n' +
      "ERR_CONNECTION_REFUSED) — that is normal, not a failure. Copy the full URL\n" +
      "from the address bar anyway and paste it below.\n"
  );
  if (providerId === "antigravity") {
    process.stdout.write(
      "Tip: `omniroute login antigravity` captures the code automatically and\n" +
        "avoids that error page entirely.\n"
    );
  }
}

function targetApiOptions(opts = {}) {
  return {
    baseUrl: opts.baseUrl,
    context: opts.context,
    apiKey: opts.apiKey,
    timeout: opts.timeout,
  };
}

async function pollStatus(endpoint, timeoutMs, opts = {}) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    await sleep(2000);
    const res = await apiFetch(endpoint, targetApiOptions(opts));
    if (!res.ok) continue;
    const data = await res.json();
    if (data.status === "complete" || data.status === "completed") return data;
    if (data.status === "error" || data.status === "failed") {
      process.stderr.write(`OAuth failed: ${data.error ?? data.message ?? "unknown"}\n`);
      process.exit(1);
    }
  }
  process.stderr.write("Timeout waiting for OAuth callback\n");
  process.exit(124);
}

async function runBrowserFlow(def, opts) {
  // The user-facing id (`def.id`, e.g. "claude-code") must be translated to the
  // backend OAuth provider key the server's /api/oauth/[provider]/... route
  // expects (e.g. "claude"). The previous implementation called a non-existent
  // `/api/oauth/${def.id}/start` action — no such action exists on the server
  // (src/app/api/oauth/[provider]/[action]/route.ts), so the browser flow was
  // broken for every browser-flow provider. Use the real `authorize` action and
  // complete the PKCE (authorization_code / authorization_code_pkce) flow with a
  // manual code paste, mirroring the dashboard's manual "input" step.
  const backendKey = resolveBackendKey(def.id);
  const redirectUri = opts.redirectUri ?? null;
  const authorizeUrl = `/api/oauth/${backendKey}/authorize${
    redirectUri ? `?redirect_uri=${encodeURIComponent(redirectUri)}` : ""
  }`;
  const startRes = await apiFetch(authorizeUrl, { ...targetApiOptions(opts), method: "GET" });
  if (!startRes.ok) {
    const detail = await safeErrorBody(startRes);
    process.stderr.write(`Failed to start OAuth for ${def.id}: ${startRes.status}${detail}\n`);
    process.exit(1);
  }
  const start = await startRes.json();
  const url = start.authUrl ?? start.authorizeUrl ?? start.url;
  if (!url) {
    const hint = start.error ?? "no authUrl returned by the server";
    process.stderr.write(`OAuth unavailable for ${def.id}: ${hint}\n`);
    process.exit(1);
  }
  const { codeVerifier, state, redirectUri: returnedRedirectUri } = start;
  const finalRedirectUri = returnedRedirectUri || redirectUri;

  if (finalRedirectUri && isLoopbackHost(finalRedirectUri)) {
    printLoopbackRedirectWarning(def.id, finalRedirectUri);
  }

  process.stdout.write(`\nOpen this URL to authorize:\n  ${url}\n\n`);
  if (opts.browser !== false) await openBrowser(url);
  process.stdout.write(
    "After authorizing, paste the callback URL (or the Authentication Code\n" +
      "shown on the confirmation page) here:\n"
  );

  const { createPrompt } = await import("../io.mjs");
  const prompt = createPrompt();
  const input = await prompt.ask("Callback URL or code");
  prompt.close();

  const trimmed = input.trim();
  if (!trimmed) {
    process.stderr.write("No authorization code provided.\n");
    process.exit(1);
  }

  // The Anthropic Claude confirmation page (platform.claude.com/oauth/code/callback)
  // shows a raw "Authentication Code" like `code#state` rather than a full URL.
  // The dashboard's manual submit (src/shared/components/OAuthModal.tsx) parses
  // both forms; mirror that here.
  let code = null;
  let codeState = state || null;
  try {
    const cbUrl = new URL(trimmed);
    code = cbUrl.searchParams.get("code");
    const stateParam = cbUrl.searchParams.get("state") || cbUrl.hash.replace(/^#/, "");
    if (stateParam) codeState = stateParam;
  } catch {
    const [rawCode, rawState] = trimmed.split("#", 2);
    code = rawCode || null;
    if (rawState) codeState = rawState;
  }
  if (!code) {
    process.stderr.write(
      "No authorization code found. Paste the callback URL or the Authentication Code.\n"
    );
    process.exit(1);
  }

  const exchangeRes = await apiFetch(`/api/oauth/${backendKey}/exchange`, {
    ...targetApiOptions(opts),
    method: "POST",
    body: {
      code,
      redirectUri: finalRedirectUri,
      codeVerifier,
      ...(codeState ? { state: codeState } : {}),
    },
  });
  if (!exchangeRes.ok) {
    const detail = await safeErrorBody(exchangeRes);
    process.stderr.write(`Token exchange failed: ${exchangeRes.status}${detail}\n`);
    process.exit(1);
  }
  const result = await exchangeRes.json();
  const conn = result.connection ?? {};
  process.stdout.write(`Authorized: ${conn.email ?? conn.displayName ?? conn.id ?? "connected"}\n`);
}

async function safeErrorBody(res) {
  try {
    const data = await res.json();
    if (data?.error) {
      const msg = typeof data.error === "string" ? data.error : data.error?.message;
      if (msg) return `: ${msg}`;
    }
    if (data?.message) return `: ${data.message}`;
  } catch {
    /* ignore */
  }
  return "";
}

// A poll response only keeps the loop alive when it carries pending /
// slow_down semantics; the server also honours these on non-200 bodies, so
// the check runs before any terminal-error exit.
function isPendingPollBody(body) {
  return (
    body?.pending === true ||
    body?.error === "slow_down" ||
    body?.error === "authorization_pending"
  );
}

// Render a failed poll response as "<status>: <error|message|raw body>" so
// the real server-side reason is surfaced instead of a bare timeout.
function describePollError(status, body) {
  const detail =
    typeof body?.error === "string"
      ? body.error
      : (body?.error?.message ?? body?.message ?? JSON.stringify(body ?? {}));
  return `${status}${detail ? `: ${detail}` : ""}`;
}

async function runImportFlow(def, opts) {
  const endpoint = opts.importFromSystem
    ? `/api/oauth/${def.id}/auto-import`
    : `/api/oauth/${def.id}/import`;
  const res = await apiFetch(endpoint, { ...targetApiOptions(opts), method: "POST" });
  if (!res.ok) {
    process.stderr.write(`Import failed: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  process.stdout.write(`Imported ${data.count ?? 0} connection(s) from ${def.name}\n`);
}

async function runSocialFlow(def, opts) {
  let social = opts.social;
  if (!social) {
    process.stderr.write("--social <google|github> required for kiro\n");
    process.exit(2);
  }
  if (!["google", "github"].includes(social)) {
    process.stderr.write("--social must be google or github\n");
    process.exit(2);
  }
  // The real routes are GET /api/oauth/kiro/social-authorize and POST
  // /api/oauth/kiro/social-exchange (src/app/api/oauth/kiro/social-*/route.ts).
  // The previous implementation POSTed social-authorize and then GET-polled
  // social-exchange with a `state` the response never carries, so the flow
  // failed with 405 before any authorization could happen (issue #14298).
  // Mirror the dashboard's KiroSocialOAuthModal: GET the authorize URL +
  // device code, then POST-poll with {deviceCode, provider}.
  const backendKey = resolveBackendKey(def.id);
  const startRes = await apiFetch(
    `/api/oauth/${backendKey}/social-authorize?provider=${encodeURIComponent(social)}`,
    targetApiOptions(opts)
  );
  if (!startRes.ok) {
    const detail = await safeErrorBody(startRes);
    process.stderr.write(`Failed: ${startRes.status}${detail}\n`);
    process.exit(1);
  }
  const start = await startRes.json();
  const deviceCode = start.deviceCode ?? "";
  if (!deviceCode) {
    process.stderr.write("Server did not return a device code; cannot poll for authorization.\n");
    process.exit(1);
  }
  const url = start.authUrl ?? start.authorizeUrl ?? start.url;
  if (start.userCode) {
    process.stdout.write(`\nDevice code: ${start.userCode}\nVisit: ${url}\n\n`);
  } else {
    process.stdout.write(`\nOpen this URL:\n  ${url}\n\n`);
  }
  if (opts.browser !== false && url) await openBrowser(url);
  process.stderr.write("Waiting for social authorization...\n");
  const deadline = Date.now() + (opts.timeout ?? 300000);
  const baseIntervalMs = Math.max(1, Number(start.interval) || 5) * 1000;
  let intervalMs = baseIntervalMs;
  while (Date.now() < deadline) {
    await sleep(intervalMs);
    const pollRes = await apiFetch(`/api/oauth/${backendKey}/social-exchange`, {
      ...targetApiOptions(opts),
      method: "POST",
      body: { deviceCode, provider: social },
    });
    if (!pollRes.ok) {
      // The real route returns terminal errors (expired_token,
      // authorization_failed, 400/401 validation/auth failures) with a non-200
      // status and pending:false; 200 bodies carry only pending or success.
      // Fail fast with the status and body instead of looping to the timeout
      // (PR #14350 review finding 1).
      const errBody = await pollRes.json().catch(() => null);
      if (!isPendingPollBody(errBody)) {
        process.stderr.write(
          `Social authorization failed: ${describePollError(pollRes.status, errBody)}\n`
        );
        process.exit(1);
      }
      continue;
    }
    let poll;
    try {
      poll = await pollRes.json();
    } catch {
      continue;
    }
    if (poll.success) {
      const conn = poll.connection ?? {};
      process.stdout.write(
        `Authorized: ${conn.email ?? conn.displayName ?? conn.id ?? "connected"}\n`
      );
      return;
    }
    if (poll.error === "slow_down") {
      // RFC 8628: retain the increase across later polls (same rule as the
      // dashboard's getNextKiroSocialPollInterval).
      intervalMs += 5000;
      continue;
    }
    if (poll.error && !poll.pending) {
      process.stderr.write(`Social authorization failed: ${poll.error}\n`);
      process.exit(1);
    }
  }
  process.stderr.write("Timeout\n");
  process.exit(124);
}

async function runCallbackFlow(def, opts) {
  // Server-hosted loopback callback flow for PKCE providers that pin a fixed
  // native-app port (codex -> localhost:1455). The server starts the callback
  // listener (GET start-callback-server), the CLI opens the auth URL, and the
  // server exchanges the code itself once the browser lands; the CLI just
  // polls POST poll-callback. This is exactly the dashboard path for codex
  // (OAuthModal PKCE_CALLBACK_SERVER_PROVIDERS). The previous code labeled
  // codex as a device flow and hit GET device-code, which the server rejects
  // for authorization_code_pkce providers ("Failed to start device flow: 404",
  // issue #14298 finding 5).
  const backendKey = resolveBackendKey(def.id);
  const startRes = await apiFetch(
    `/api/oauth/${backendKey}/start-callback-server`,
    targetApiOptions(opts)
  );
  if (!startRes.ok) {
    // Same fallback as the dashboard: no callback server -> manual browser
    // PKCE flow (authorize URL + pasted callback code).
    process.stderr.write(
      `Callback server unavailable (${startRes.status}); falling back to the manual browser flow.\n`
    );
    return runBrowserFlow(def, opts);
  }
  const start = await startRes.json();
  const url = start.authUrl;
  if (!url) {
    process.stderr.write("Server did not return an authUrl for the callback flow.\n");
    process.exit(1);
  }
  if (start.remoteHost && start.message) {
    // The server sees a non-loopback Host: the browser redirect will land on
    // the operator's own localhost, not the server. Surface the tunnel hint
    // (#7523) instead of letting the poll hang silently.
    process.stdout.write(`\n${start.message}\n`);
    if (start.tunnelCommand) process.stdout.write(`  ${start.tunnelCommand}\n`);
  }
  process.stdout.write(`\nOpen this URL to authorize:\n  ${url}\n\n`);
  process.stdout.write(
    "The browser is redirected to a local callback the server listens on;\n" +
      "nothing needs to be pasted here.\n\n"
  );
  if (opts.browser !== false) await openBrowser(url);
  process.stderr.write("Waiting for authorization...\n");
  const deadline = Date.now() + (opts.timeout ?? 300000);
  while (Date.now() < deadline) {
    await sleep(2000);
    const pollRes = await apiFetch(`/api/oauth/${backendKey}/poll-callback`, {
      ...targetApiOptions(opts),
      method: "POST",
      body: {},
    });
    if (!pollRes.ok) {
      // poll-callback returns terminal errors with non-200 statuses too —
      // token-exchange failures come back as HTTP 500 with
      // {success:false, error:"Internal server error"}. Only pending /
      // slow_down semantics retry; everything else fails fast with the
      // status and body instead of looping to the timeout
      // (PR #14350 review finding 1).
      const errBody = await pollRes.json().catch(() => null);
      if (!isPendingPollBody(errBody)) {
        process.stderr.write(
          `Authorization failed: ${describePollError(pollRes.status, errBody)}\n`
        );
        process.exit(1);
      }
      continue;
    }
    let poll;
    try {
      poll = await pollRes.json();
    } catch {
      continue;
    }
    if (poll.success) {
      const conn = poll.connection ?? {};
      process.stdout.write(
        `Authorized: ${conn.email ?? conn.displayName ?? conn.id ?? "connected"}\n`
      );
      return;
    }
    if (poll.error && !poll.pending) {
      process.stderr.write(`Authorization failed: ${poll.errorDescription ?? poll.error}\n`);
      process.exit(1);
    }
  }
  process.stderr.write("Timeout\n");
  process.exit(124);
}

async function runDeviceFlow(def, opts) {
  const providerKey = resolveBackendKey(def.id);
  let startRes = await apiFetch(`/api/oauth/${providerKey}/device-code`, targetApiOptions(opts));
  if (!startRes.ok) {
    startRes = await apiFetch(`/api/providers/${providerKey}/auth/start`, {
      ...targetApiOptions(opts),
      method: "POST",
    });
  }
  if (!startRes.ok) {
    process.stderr.write(`Failed to start device flow: ${startRes.status}\n`);
    process.exit(1);
  }
  const start = await startRes.json();
  const userCode = start.userCode ?? start.user_code ?? "";
  const verificationUri =
    start.verificationUriComplete ??
    start.verification_uri_complete ??
    start.verificationUri ??
    start.verification_uri ??
    start.authUrl ??
    start.url ??
    "";

  if (userCode) {
    process.stdout.write(`\nDevice code: ${userCode}\nVisit: ${verificationUri}\n\n`);
  } else if (verificationUri) {
    process.stdout.write(`\nVisit: ${verificationUri}\n\n`);
  } else {
    process.stdout.write(`\nAuthorization URL not available\n\n`);
  }

  if (opts.browser !== false && verificationUri) await openBrowser(verificationUri);
  process.stderr.write("Waiting for device authorization...\n");
  // Poll the real device-flow route: POST /api/oauth/{key}/poll with the device
  // code (#14298). The previous implementation polled
  // GET /api/providers/{key}/auth/status?state=… and then POST …/auth/apply,
  // but neither route exists on the server, and the device-code response has no
  // `state` field at all — so the CLI looped until its timeout even after the
  // user authorized. /api/oauth/{key}/poll is the same route the dashboard
  // polls (src/shared/components/OAuthModal.tsx::pollDeviceCodeOnce) and it
  // persists the connection server-side on success, so no separate apply step
  // is needed.
  const deviceCode = start.deviceCode ?? start.device_code ?? "";
  if (!deviceCode) {
    process.stderr.write("Server did not return a device code; cannot poll for authorization.\n");
    process.exit(1);
  }
  const codeVerifier = start.codeVerifier ?? undefined;
  const deadline = Date.now() + (opts.timeout ?? 300000);
  let intervalMs = (start.intervalMs ?? start.interval ?? 5) * 1000;
  while (Date.now() < deadline) {
    await sleep(intervalMs);
    const pollRes = await apiFetch(`/api/oauth/${providerKey}/poll`, {
      ...targetApiOptions(opts),
      method: "POST",
      body: { deviceCode, ...(codeVerifier ? { codeVerifier } : {}) },
    });
    if (!pollRes.ok) continue;
    let poll;
    try {
      poll = await pollRes.json();
    } catch {
      continue;
    }
    if (poll.success) {
      const conn = poll.connection ?? {};
      process.stdout.write(
        `Authorized: ${conn.email ?? conn.displayName ?? conn.id ?? "connected"}\n`
      );
      return;
    }
    if (poll.error === "slow_down") {
      // OAuth device-flow spec: back off by 5s on slow_down.
      intervalMs += 5000;
      continue;
    }
    if (poll.error && !poll.pending) {
      process.stderr.write(`Device auth failed: ${poll.errorDescription ?? poll.error}\n`);
      process.exit(1);
    }
  }
  process.stderr.write("Timeout\n");
  process.exit(124);
}

export async function runOAuthStart(opts, cmd) {
  opts = { ...(cmd?.optsWithGlobals ? cmd.optsWithGlobals() : {}), ...opts };
  const def = PROVIDERS_WITH_OAUTH.find((p) => p.id === opts.provider);
  if (!def) {
    process.stderr.write(
      `Unknown OAuth provider: ${opts.provider}\nRun: omniroute oauth providers\n`
    );
    process.exit(2);
  }
  switch (def.flow) {
    case "browser":
      return runBrowserFlow(def, opts);
    case "callback":
      return runCallbackFlow(def, opts);
    case "import":
      return runImportFlow(def, opts);
    case "social":
      return runSocialFlow(def, opts);
    case "device":
      return runDeviceFlow(def, opts);
  }
}

export async function runOAuthStatus(opts, cmd) {
  const globalOpts = { ...(cmd?.optsWithGlobals ? cmd.optsWithGlobals() : {}), ...opts };
  const params = new URLSearchParams();
  if (opts.provider) params.set("provider", opts.provider);
  const res = await apiFetch(`/api/providers?${params}`, targetApiOptions(globalOpts));
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  const payload = data?.connections ?? data?.providers ?? data?.items ?? data;
  // #11236 (bug 5 residual): a 200 whose body is out of contract (no
  // connections/providers/items array — e.g. `{"status":"ok"}`) used to fall
  // through to `.filter` on a non-array and crash with a bare TypeError plus a
  // libuv teardown assertion on Windows. Coerce to an empty list with a
  // sanitized one-line warning instead of dumping a stack trace.
  if (!Array.isArray(payload)) {
    process.stderr.write(
      "Warning: unexpected response shape from /api/providers; showing no connections.\n"
    );
  }
  const connections = (Array.isArray(payload) ? payload : []).filter(
    (c) => c.authType === "oauth" || c.authType === "oauth2"
  );
  emit(connections, globalOpts, connectionSchema);
}

export async function runOAuthRevoke(opts, cmd) {
  opts = { ...(cmd?.optsWithGlobals ? cmd.optsWithGlobals() : {}), ...opts };
  if (!opts.yes) {
    process.stdout.write(
      `Revoke OAuth for ${opts.provider}${opts.connectionId ? ` (${opts.connectionId})` : ""}? (yes/no) `
    );
    const answer = await new Promise((resolve) => {
      process.stdin.setEncoding("utf8");
      process.stdin.once("data", (c) => resolve(c.toString().trim().toLowerCase()));
    });
    if (!answer.startsWith("y")) process.exit(0);
  }
  const id = opts.connectionId;
  const res = id
    ? await apiFetch(`/api/providers/${id}`, { ...targetApiOptions(opts), method: "DELETE" })
    : await apiFetch(`/api/oauth/${opts.provider}/revoke`, {
        ...targetApiOptions(opts),
        method: "POST",
      });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  process.stdout.write(`Revoked\n`);
}

export function registerOAuth(program) {
  const oauth = program.command("oauth").description(t("oauth.description"));

  oauth
    .command("providers")
    .description(t("oauth.providers.description"))
    .action(async (opts, cmd) => {
      emit(PROVIDERS_WITH_OAUTH, cmd.optsWithGlobals(), oauthProviderSchema);
    });

  oauth
    .command("start")
    .description(t("oauth.start.description"))
    .requiredOption("--provider <id>", t("oauth.start.provider"))
    .option("--no-browser", t("oauth.start.no_browser"))
    .option("--import-from-system", t("oauth.start.import_system"))
    .option("--social <s>", t("oauth.start.social"))
    .option("--timeout <ms>", t("oauth.start.timeout"), parseInt, 300000)
    .action(runOAuthStart);

  oauth
    .command("status")
    .description(t("oauth.status.description"))
    .option("--provider <id>", t("oauth.status.provider"))
    .action(runOAuthStatus);

  oauth
    .command("revoke")
    .description(t("oauth.revoke.description"))
    .requiredOption("--provider <id>", t("oauth.revoke.provider"))
    .option("--connection-id <id>", t("oauth.revoke.connection_id"))
    .option("--yes", t("oauth.revoke.yes"))
    .action(runOAuthRevoke);
}
