import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

/**
 * `omniroute login antigravity` — local OAuth helper for remote installs.
 *
 * Why this exists: Google's `firstparty/nativeapp` consent for the embedded
 * Antigravity desktop client only releases the authorization code when the
 * loopback redirect (127.0.0.1:<port>) is REACHABLE. On a remote VPS install the
 * loopback is unreachable, so the consent hangs forever and never emits a code —
 * the dashboard's "paste the callback URL" fallback has nothing to paste. (The
 * same flow works locally and over an SSH tunnel, where the loopback IS reachable.)
 *
 * This command runs the OAuth on the user's OWN machine — where 127.0.0.1 works —
 * captures the code on a local loopback server, exchanges it for tokens, and
 * prints a single-line credential blob. The user pastes that blob into the remote
 * dashboard (Antigravity → "Paste credentials"), which decodes it, finalizes the
 * onboarding server-side, and persists the connection.
 *
 * It talks ONLY to Google (no OmniRoute server needed locally), so it works even
 * if the remote VPS is firewalled from the user's machine.
 *
 * Push mode: when an active remote context exists (`omniroute connect <host>`), the
 * blob is POSTed straight to that install instead of being printed for a manual
 * copy-paste — every piece was already in place:
 *
 *   - the context carries an admin-scoped token, and `apiFetch()` injects it;
 *   - `/api/oauth` requires admin scope (src/server/authz/accessScopes.ts) and stays
 *     remote-reachable — routeGuard.ts loopback-gates only `/api/oauth/cursor/auto-import`;
 *   - `/api/oauth/<provider>/paste-credentials` already decodes the blob and persists.
 *
 * The push NEVER becomes a hard requirement: this helper exists precisely because it
 * needs no route to the VPS, so a failed push falls back to printing the blob rather
 * than losing an authorization the operator just completed in their browser.
 */

const PROVIDER = "antigravity";

/** Open the system browser; no-op if the optional `open` dependency is missing. */
async function defaultOpenBrowser(url) {
  try {
    const { default: open } = await import("open");
    await open(url);
  } catch {
    // `open` not available — the caller already printed the URL to paste manually.
  }
}

/**
 * Start a loopback HTTP server bound to 127.0.0.1 (NOT 0.0.0.0 — we never want to
 * expose the callback to the LAN). Resolves to { port, waitForCallback, close }.
 */
function defaultStartServer(preferredPort) {
  return new Promise((resolve, reject) => {
    let resolveCallback;
    const callbackPromise = new Promise((r) => {
      resolveCallback = r;
    });

    const server = createServer((req, res) => {
      const url = new URL(req.url, "http://127.0.0.1");
      if (url.pathname !== "/callback" && url.pathname !== "/auth/callback") {
        res.writeHead(404).end();
        return;
      }
      const params = Object.fromEntries(url.searchParams.entries());
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        "<!doctype html><meta charset=utf-8><title>OmniRoute</title>" +
          '<body style="font-family:system-ui;padding:2rem">' +
          "<h2>✅ Authorization received</h2>" +
          "<p>Return to your terminal — you can close this tab.</p></body>"
      );
      resolveCallback(params);
    });

    server.on("error", reject);
    server.listen(preferredPort || 0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({
        port,
        waitForCallback: () => callbackPromise,
        close: () => new Promise((r) => server.close(() => r())),
      });
    });
  });
}

/**
 * Is this context pointing at another machine? Loopback (and an unresolvable value)
 * counts as local, so we never auto-push somewhere we cannot reason about.
 */
export function isRemoteBaseUrl(baseUrl) {
  if (!baseUrl) return false;
  try {
    const { hostname } = new URL(baseUrl);
    const host = hostname.replace(/^\[|\]$/g, ""); // strip IPv6 brackets
    return host !== "localhost" && host !== "127.0.0.1" && host !== "::1";
  } catch {
    return false;
  }
}

/**
 * POST a credential blob to the active context's install. Never throws: the caller
 * decides whether a failure is fatal (it is not — it falls back to printing).
 */
export async function pushCredentialBlob(provider, blob, deps = {}) {
  try {
    const fetchImpl = deps.fetchImpl ?? (await import("../api.mjs")).apiFetch;
    const res = await fetchImpl(`/api/oauth/${provider}/paste-credentials`, {
      method: "POST",
      body: { blob },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.success === false) {
      const message =
        (typeof data?.error === "string" ? data.error : data?.error?.message) ||
        `HTTP ${res.status}`;
      return { ok: false, error: message };
    }
    return { ok: true, connectionId: data?.connection?.id };
  } catch (err) {
    return { ok: false, error: err?.message || String(err) };
  }
}

/** Read the active CLI context (baseUrl + scoped token) written by `omniroute connect`. */
async function defaultResolveContext(overrideName) {
  const { resolveActiveContext } = await import("../contexts.mjs");
  return resolveActiveContext(overrideName);
}

/** Lazy-load the antigravity provider + blob codec (TS source via tsx). */
async function loadDeps() {
  const { antigravity } = await import("../../../src/lib/oauth/providers/antigravity.ts");
  const { encodeCredentialBlob } = await import("../../../src/lib/oauth/credentialBlob.ts");
  return { antigravity, encodeCredentialBlob };
}

/**
 * Build the Google authorization request for a given loopback port. Uses a plain
 * authorization_code grant (NO PKCE code_challenge) — matching the working flow:
 * a code_challenge here would force the exchange to require a code_verifier.
 */
export async function buildAntigravityAuthRequest(port, makeState = randomUUID) {
  const { antigravity } = await loadDeps();
  const redirectUri = `http://127.0.0.1:${port}/callback`;
  const state = makeState();
  const authUrl = antigravity.buildAuthUrl(antigravity.config, redirectUri, state);
  return { redirectUri, state, authUrl };
}

/** Exchange the captured code for raw Google tokens (no code_verifier — no PKCE). */
export async function exchangeAntigravityCode(code, redirectUri) {
  const { antigravity } = await loadDeps();
  return antigravity.exchangeToken(antigravity.config, code, redirectUri);
}

/**
 * Orchestrate the local login. Dependencies are injectable for testing; the real
 * path uses a 127.0.0.1 loopback server, the system browser, and a live token
 * exchange against Google. Returns the credential blob string.
 */
export async function runAntigravityLogin(opts = {}, deps = {}) {
  const startServer = deps.startServer ?? defaultStartServer;
  const openBrowser = deps.openBrowser ?? defaultOpenBrowser;
  const exchange = deps.exchange ?? exchangeAntigravityCode;
  const makeState = deps.makeState ?? randomUUID;
  const print = deps.print ?? ((s) => process.stdout.write(s));
  const log = deps.log ?? ((s) => process.stderr.write(s));
  const { encodeCredentialBlob } = await loadDeps();

  const server = await startServer(opts.port);
  const { redirectUri, state, authUrl } = await buildAntigravityAuthRequest(server.port, makeState);

  log(`\nOpen this URL to authorize Antigravity (it will open automatically):\n\n  ${authUrl}\n\n`);
  if (opts.browser !== false) await openBrowser(authUrl);
  log("Waiting for Google to redirect back to the local loopback...\n");

  const timeoutMs = opts.timeout ?? 300000;
  let timer;
  let params;
  try {
    params = await Promise.race([
      server.waitForCallback(),
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error("Timed out waiting for the OAuth callback")),
          timeoutMs
        );
        // Don't keep the event loop alive solely for this timer.
        if (typeof timer.unref === "function") timer.unref();
      }),
    ]);
  } finally {
    clearTimeout(timer);
    await server.close();
  }

  if (params.error) {
    throw new Error(`Authorization failed: ${params.error_description || params.error}`);
  }
  if (params.state !== state) {
    throw new Error("State mismatch — aborting (possible CSRF). Please retry the login.");
  }
  if (!params.code) {
    throw new Error("No authorization code returned by Google.");
  }

  const tokens = await exchange(params.code, redirectUri);
  const blob = encodeCredentialBlob({ provider: PROVIDER, tokens });

  // Push when the operator explicitly asked, or when the active context already points
  // at another machine — that is exactly the situation this helper was built for.
  const resolveContext = deps.resolveContext ?? defaultResolveContext;
  const push = deps.push ?? pushCredentialBlob;
  let context = null;
  try {
    context = await resolveContext(opts.context);
  } catch {
    // No usable context store — fall through to printing.
  }
  const wantsPush =
    opts.push === true || (opts.push !== false && isRemoteBaseUrl(context?.baseUrl));

  if (wantsPush) {
    log(`\nSending the credential to ${context?.baseUrl || "the active context"}...\n`);
    const result = await push(PROVIDER, blob, { context });
    if (result?.ok) {
      log(
        `Antigravity connected on ${context?.baseUrl || "the remote install"}` +
          `${result.connectionId ? ` (connection ${result.connectionId})` : ""}.\n` +
          "Nothing to paste — you can close this terminal.\n"
      );
      // Deliberately NOT printed: the blob wraps a refresh token and it already landed.
      return blob;
    }
    log(
      `\nCould not deliver the credential automatically: ${result?.error || "unknown error"}\n` +
        "Falling back to manual paste — the authorization itself is still valid.\n"
    );
  }

  print(
    "\n" +
      "Antigravity authorized. Copy the line below and paste it into your remote\n" +
      'OmniRoute dashboard: Providers → Antigravity → Connect → "Paste credentials".\n' +
      "(This contains a refresh token — treat it like a password.)\n\n" +
      blob +
      "\n\n"
  );
  return blob;
}

async function runLoginAntigravity(opts) {
  try {
    await runAntigravityLogin({
      browser: opts.browser,
      timeout: opts.timeout,
      port: opts.port,
      push: opts.push,
      context: opts.context,
    });
  } catch (err) {
    process.stderr.write(`\nLogin failed: ${err?.message || err}\n`);
    process.exit(1);
  }
}

export function registerLogin(program) {
  const login = program
    .command("login")
    .description("Local OAuth helpers for remote OmniRoute installs (run on your own machine)");

  login
    .command("antigravity")
    .description("Authorize Antigravity locally and print a credential blob to paste remotely")
    .option("--no-browser", "Do not auto-open the browser; print the URL instead")
    .option("--port <n>", "Fixed loopback port (default: OS-assigned)", (v) => parseInt(v, 10))
    .option("--timeout <ms>", "How long to wait for the callback", (v) => parseInt(v, 10), 300000)
    .option(
      "--push",
      "Send the credential to the active context instead of printing it (default when that context is remote)"
    )
    .option("--no-push", "Always print the blob, never contact the server")
    .option("--context <name>", "Push to this context instead of the active one")
    .action(runLoginAntigravity);
}
