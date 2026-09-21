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
  { id: "codex", name: "OpenAI Codex (OAuth)", flow: "device" },
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
const BACKEND_OAUTH_KEY = {
  "claude-code": "claude",
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
      "show a connection error (e.g. \"This site can't be reached\" / \n" +
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
  const startRes = await apiFetch(`/api/oauth/${def.id}/social-authorize`, {
    ...targetApiOptions(opts),
    method: "POST",
    body: { social },
  });
  if (!startRes.ok) {
    process.stderr.write(`Failed: ${startRes.status}\n`);
    process.exit(1);
  }
  const start = await startRes.json();
  const url = start.authorizeUrl ?? start.url;
  process.stdout.write(`\nOpen this URL:\n  ${url}\n\n`);
  if (opts.browser !== false) await openBrowser(url);
  process.stderr.write("Waiting for social authorization...\n");
  const result = await pollStatus(
    `/api/oauth/${def.id}/social-exchange?state=${encodeURIComponent(start.state ?? "")}`,
    opts.timeout ?? 300000,
    opts
  );
  process.stdout.write(`Authorized: ${result.email ?? result.userId ?? "connected"}\n`);
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
  const deadline = Date.now() + (opts.timeout ?? 300000);
  const intervalMs = (start.intervalMs ?? start.interval ?? 5) * 1000;
  while (Date.now() < deadline) {
    await sleep(intervalMs);
    const statusRes = await apiFetch(
      `/api/providers/${providerKey}/auth/status?state=${encodeURIComponent(start.state ?? "")}`,
      targetApiOptions(opts)
    );
    if (!statusRes.ok) continue;
    const status = await statusRes.json();
    if (status.status === "complete" || status.status === "authorized") {
      await apiFetch(`/api/providers/${providerKey}/auth/apply`, {
        ...targetApiOptions(opts),
        method: "POST",
        body: { state: start.state },
      });
      process.stdout.write(`Authorized: ${status.account ?? status.email ?? "connected"}\n`);
      return;
    }
    if (status.status === "error") {
      process.stderr.write(`Device auth failed: ${status.error}\n`);
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
