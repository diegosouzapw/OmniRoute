#!/usr/bin/env node
/**
 * Entra ID sign-in helper for Claude Code → OmniRoute.
 *
 * Dependency-free on purpose: this file is handed to people who use Claude Code
 * but never install the omniroute CLI, so it must run from a single copy with
 * nothing but Node 18+.
 *
 *   omniroute-sso.mjs login     browser sign-in, stores a refresh token
 *   omniroute-sso.mjs token     prints the access token (the apiKeyHelper target)
 *   omniroute-sso.mjs install   writes the apiKeyHelper block into Claude Code
 *   omniroute-sso.mjs logout    forgets the stored tokens
 *
 * See docs/security/ENTRA_SSO.md.
 */

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const DEFAULT_AUTHORITY = "https://login.microsoftonline.com";

/** The server publishes its authority so sovereign-cloud tenants work unchanged. */
function authorityOf(config) {
  return typeof config?.authorityHost === "string" && config.authorityHost
    ? config.authorityHost.replace(/\/+$/, "")
    : DEFAULT_AUTHORITY;
}
const CACHE_DIR = path.join(os.homedir(), ".omniroute-sso");
const CLAUDE_SETTINGS = path.join(os.homedir(), ".claude", "settings.json");
const DEFAULT_HELPER_TTL_MS = 900000;
const EXPIRY_SKEW_SECONDS = 300;

/** stderr, never stdout: `token` output must contain the credential alone. */
function note(message) {
  process.stderr.write(`${message}\n`);
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

export function base64url(buffer) {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function createPkcePair() {
  const verifier = base64url(randomBytes(32));
  const challenge = base64url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

export function buildAuthUrl(config, { redirectUri, state, challenge }) {
  const url = new URL(`${authorityOf(config)}/${config.tenantId}/oauth2/v2.0/authorize`);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_mode", "query");
  url.searchParams.set("scope", `openid profile offline_access ${config.scope}`);
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  return url.toString();
}

/** A token within EXPIRY_SKEW_SECONDS of expiring is treated as already stale. */
export function isTokenFresh(cache, nowMs = Date.now()) {
  if (!cache || typeof cache.accessToken !== "string" || cache.accessToken === "") return false;
  if (typeof cache.expiresAt !== "number") return false;
  return cache.expiresAt - EXPIRY_SKEW_SECONDS * 1000 > nowMs;
}

export function mergeClaudeSettings(existing, { baseUrl, helperCommand, ttlMs }) {
  const merged = { ...(existing && typeof existing === "object" ? existing : {}) };
  merged.apiKeyHelper = helperCommand;
  merged.env = {
    ...(merged.env && typeof merged.env === "object" ? merged.env : {}),
    ANTHROPIC_BASE_URL: baseUrl,
    CLAUDE_CODE_API_KEY_HELPER_TTL_MS: String(ttlMs),
  };
  return merged;
}

function cachePathFor(baseUrl) {
  const host = new URL(baseUrl).host.replace(/[^a-zA-Z0-9._-]/g, "_");
  return path.join(CACHE_DIR, `${host}.json`);
}

function readCache(baseUrl) {
  try {
    return JSON.parse(fs.readFileSync(cachePathFor(baseUrl), "utf8"));
  } catch {
    return null;
  }
}

function writeCache(baseUrl, data) {
  fs.mkdirSync(CACHE_DIR, { recursive: true, mode: 0o700 });
  const file = cachePathFor(baseUrl);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), { mode: 0o600 });
  fs.chmodSync(file, 0o600);
}

function resolveBaseUrl(argv) {
  const flagIndex = argv.indexOf("--url");
  const raw =
    (flagIndex >= 0 ? argv[flagIndex + 1] : null) ||
    process.env.OMNIROUTE_URL ||
    readCache("http://localhost")?.baseUrl;
  if (!raw) {
    fail("Set OMNIROUTE_URL (or pass --url <https://omniroute.example>) first.");
  }
  return raw.replace(/\/+$/, "");
}

async function fetchSsoConfig(baseUrl) {
  let response;
  try {
    response = await fetch(`${baseUrl}/api/auth/sso/config`, {
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    fail(`Could not reach ${baseUrl}. Check the URL and your network.`);
  }
  if (!response.ok) fail(`${baseUrl} returned ${response.status} for the SSO config.`);

  const config = await response.json();
  if (!config?.enabled) {
    fail(`SSO is not enabled on ${baseUrl}. Ask your administrator to configure Entra ID.`);
  }
  return config;
}

function openBrowser(url) {
  const command =
    process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  try {
    const child = spawn(command, [url], {
      stdio: "ignore",
      detached: true,
      shell: process.platform === "win32",
    });
    // spawn reports a missing binary through an async 'error' event, not a
    // throw. Without this listener Node raises it as uncaught and kills the
    // login — on exactly the headless boxes where there is no opener anyway.
    child.on("error", () => {});
    child.unref();
  } catch {
    // The URL was already printed for manual use.
  }
}

/** Binds 127.0.0.1 only — the callback must never be reachable from the LAN. */
function startLoopbackServer() {
  return new Promise((resolve, reject) => {
    let resolveCallback;
    const callback = new Promise((r) => {
      resolveCallback = r;
    });

    const server = createServer((req, res) => {
      const url = new URL(req.url, "http://127.0.0.1");
      if (url.pathname !== "/callback") {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        "<!doctype html><meta charset=utf-8><title>OmniRoute</title>" +
          '<body style="font-family:system-ui;padding:2rem">' +
          "<h2>Signed in</h2><p>Return to your terminal — you can close this tab.</p></body>"
      );
      resolveCallback(Object.fromEntries(url.searchParams.entries()));
    });

    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      resolve({
        port: server.address().port,
        callback,
        close: () => server.close(),
      });
    });
  });
}

async function exchangeToken(config, body) {
  const response = await fetch(`${authorityOf(config)}/${config.tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString(),
    signal: AbortSignal.timeout(20000),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const detail = data?.error_description || data?.error || `HTTP ${response.status}`;
    return { ok: false, error: String(detail).split("\n")[0] };
  }
  if (!data?.access_token) return { ok: false, error: "Entra returned no access token" };

  return {
    ok: true,
    tokens: {
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? null,
      expiresAt: Date.now() + (Number(data.expires_in) || 3600) * 1000,
    },
  };
}

async function commandLogin(argv) {
  const baseUrl = resolveBaseUrl(argv);
  const config = await fetchSsoConfig(baseUrl);

  const server = await startLoopbackServer();
  const redirectUri = `http://localhost:${server.port}/callback`;
  const state = randomUUID();
  const { verifier, challenge } = createPkcePair();
  const authUrl = buildAuthUrl(config, { redirectUri, state, challenge });

  note(`\nOpening your browser to sign in:\n\n  ${authUrl}\n`);
  openBrowser(authUrl);
  note("Waiting for the redirect back to this machine...");

  let params;
  let timeout;
  try {
    // The timer must be cleared on success: an uncleared setTimeout keeps the
    // event loop alive, so the process would sit for the full five minutes
    // after printing "Signed in" and look hung.
    params = await Promise.race([
      server.callback,
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(new Error("Timed out after 5 minutes")), 300000);
      }),
    ]);
  } catch (error) {
    clearTimeout(timeout);
    server.close();
    fail(`Sign-in failed: ${error.message}`);
  }
  clearTimeout(timeout);
  server.close();

  if (params.error) {
    fail(`Entra returned an error: ${params.error_description || params.error}`);
  }
  if (params.state !== state) {
    fail("State mismatch — the redirect did not come from the request we started.");
  }

  const exchanged = await exchangeToken(config, {
    grant_type: "authorization_code",
    client_id: config.clientId,
    code: params.code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
    scope: `openid profile offline_access ${config.scope}`,
  });
  if (!exchanged.ok) fail(`Token exchange failed: ${exchanged.error}`);

  if (!exchanged.tokens.refreshToken) {
    note("Warning: Entra issued no refresh token — you will have to sign in again each hour.");
    note("Ask your administrator to include `offline_access` in the app registration scopes.");
  }

  writeCache(baseUrl, { baseUrl, ...exchanged.tokens });
  note(`\nSigned in. Tokens stored in ${cachePathFor(baseUrl)} (0600).`);
  note(`Next: ${process.argv[1]} install`);
}

async function commandToken(argv) {
  const baseUrl = resolveBaseUrl(argv);
  const cache = readCache(baseUrl);

  if (!cache) fail(`Not signed in. Run: ${process.argv[1]} login`);

  if (isTokenFresh(cache)) {
    process.stdout.write(cache.accessToken);
    return;
  }

  if (!cache.refreshToken) fail(`Session expired. Run: ${process.argv[1]} login`);

  const config = await fetchSsoConfig(baseUrl);
  const refreshed = await exchangeToken(config, {
    grant_type: "refresh_token",
    client_id: config.clientId,
    refresh_token: cache.refreshToken,
    scope: `openid profile offline_access ${config.scope}`,
  });

  if (!refreshed.ok) {
    fail(`Could not refresh your session (${refreshed.error}). Run: ${process.argv[1]} login`);
  }

  writeCache(baseUrl, {
    baseUrl,
    ...refreshed.tokens,
    refreshToken: refreshed.tokens.refreshToken ?? cache.refreshToken,
  });
  process.stdout.write(refreshed.tokens.accessToken);
}

function commandInstall(argv) {
  const baseUrl = resolveBaseUrl(argv);
  const ttlIndex = argv.indexOf("--ttl-ms");
  const ttlMs = ttlIndex >= 0 ? Number(argv[ttlIndex + 1]) : DEFAULT_HELPER_TTL_MS;
  if (!Number.isFinite(ttlMs) || ttlMs <= 0) fail("--ttl-ms must be a positive number.");

  const scriptPath = path.resolve(process.argv[1]);
  const helperCommand = `node ${JSON.stringify(scriptPath)} token --url ${baseUrl}`;

  let existing = {};
  if (fs.existsSync(CLAUDE_SETTINGS)) {
    try {
      existing = JSON.parse(fs.readFileSync(CLAUDE_SETTINGS, "utf8"));
    } catch {
      fail(`${CLAUDE_SETTINGS} is not valid JSON. Fix or move it, then re-run install.`);
    }
  }

  const merged = mergeClaudeSettings(existing, { baseUrl, helperCommand, ttlMs });
  fs.mkdirSync(path.dirname(CLAUDE_SETTINGS), { recursive: true });
  fs.writeFileSync(CLAUDE_SETTINGS, `${JSON.stringify(merged, null, 2)}\n`);

  note(`Updated ${CLAUDE_SETTINGS}:`);
  note(`  apiKeyHelper                      ${helperCommand}`);
  note(`  ANTHROPIC_BASE_URL                ${baseUrl}`);
  note(`  CLAUDE_CODE_API_KEY_HELPER_TTL_MS ${ttlMs}`);
  note("\nStart Claude Code and run /status to confirm the helper is active.");
}

function commandLogout(argv) {
  const baseUrl = resolveBaseUrl(argv);
  try {
    fs.rmSync(cachePathFor(baseUrl));
    note(`Removed stored tokens for ${baseUrl}.`);
  } catch {
    note(`No stored tokens for ${baseUrl}.`);
  }
}

const COMMANDS = {
  login: commandLogin,
  token: commandToken,
  install: commandInstall,
  logout: commandLogout,
};

async function main() {
  const [command, ...argv] = process.argv.slice(2);
  const handler = COMMANDS[command];
  if (!handler) {
    note("Usage: omniroute-sso.mjs <login|token|install|logout> [--url <base>] [--ttl-ms <ms>]");
    process.exit(command ? 1 : 0);
  }
  await handler(argv);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => fail(`Unexpected error: ${error.message}`));
}
