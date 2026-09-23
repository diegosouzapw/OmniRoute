// Repro/regression test for issue #14298 (findings 4-5, CLI side).
//
// `omniroute oauth start --provider codex` failed with "Failed to start
// device flow: 404": the CLI labeled codex as a device flow and called
// GET /api/oauth/codex/device-code, but the server registers codex as
// authorization_code_pkce (src/lib/oauth/providers/codex.ts) and the
// device-code action rejects any non-device provider. The dashboard drives
// codex through the server-hosted callback flow instead:
// GET start-callback-server, then POST poll-callback until the browser
// redirect lands (src/shared/components/OAuthModal.tsx,
// PKCE_CALLBACK_SERVER_PROVIDERS).
//
// `omniroute oauth start --provider kiro --social google` failed with
// "Failed: 405": runSocialFlow POSTed /api/oauth/kiro/social-authorize and
// then GET-polled /api/oauth/kiro/social-exchange, but the routes are
// registered the other way around (social-authorize exports GET only,
// social-exchange exports POST only, see
// src/app/api/oauth/kiro/social-{authorize,exchange}/route.ts).
//
// These tests drive runOAuthStart against a fake HTTP server that mirrors
// the real routes' method registration, and assert the fixed behavior:
// codex uses start-callback-server + poll-callback, and kiro social uses
// GET social-authorize + POST social-exchange with the device code.
import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "..");

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14298f-"));
process.env.OMNIROUTE_API_KEY = "***";
process.env.NODE_ENV = "test";

const { runOAuthStart } = await import(path.join(repoRoot, "bin/cli/commands/oauth.mjs"));

function startFakeServer(handler) {
  const requests = [];
  const server = http.createServer((req, res) => {
    let rawBody = "";
    req.on("data", (c) => (rawBody += c));
    req.on("end", async () => {
      let body = null;
      try {
        body = rawBody ? JSON.parse(rawBody) : null;
      } catch {
        body = rawBody;
      }
      requests.push({ method: req.method, url: req.url, body });
      await handler(req, res, requests.length);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, requests, baseUrl: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

function respondJson(res, status, obj) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(obj));
}

// process.exit is called by the CLI on failure paths; capture the code and
// unwind so the test process survives.
async function runStartCatchingExit(opts) {
  const realExit = process.exit;
  let exitCode = null;
  process.exit = (code) => {
    exitCode = code ?? 0;
    throw new Error(`__process_exit_${exitCode}`);
  };
  let error = null;
  try {
    await runOAuthStart(opts, undefined);
  } catch (e) {
    if (!String(e && e.message).startsWith("__process_exit_")) error = e;
  } finally {
    process.exit = realExit;
  }
  if (error) throw error;
  return exitCode;
}

test("#14298: codex uses the server-hosted callback flow, not a device flow", async () => {
  let pollCount = 0;
  const { server, requests, baseUrl } = await startFakeServer((req, res) => {
    // Mirrors the real route: codex is authorization_code_pkce, so the
    // device-code action rejects it (route.ts returns 400 for non-device
    // providers, and no /api/providers/{key}/auth/start route exists at all).
    if (req.url === "/api/oauth/codex/device-code") {
      return respondJson(res, 400, { error: "Provider does not support device code flow" });
    }
    if (req.method === "GET" && req.url === "/api/oauth/codex/start-callback-server") {
      return respondJson(res, 200, {
        authUrl: "https://auth.openai.com/oauth/authorize?code_challenge=x",
        codeVerifier: "verifier-1",
        redirectUri: "http://localhost:1455/auth/callback",
        serverPort: 1455,
        remoteHost: false,
      });
    }
    if (req.method === "POST" && req.url === "/api/oauth/codex/poll-callback") {
      pollCount += 1;
      if (pollCount < 2) {
        return respondJson(res, 200, { success: false, pending: true });
      }
      return respondJson(res, 200, {
        success: true,
        connection: { id: "conn-codex", provider: "codex", email: "dev@example.com" },
      });
    }
    respondJson(res, 404, { error: "Unknown provider" });
  });

  try {
    const exitCode = await runStartCatchingExit({
      provider: "codex",
      browser: false,
      baseUrl,
      timeout: 15000,
    });
    assert.equal(exitCode, null, `codex flow must complete without exiting (got ${exitCode})`);

    const startReq = requests.find((r) => r.url === "/api/oauth/codex/start-callback-server");
    assert.ok(startReq, "codex must start the server-hosted callback flow");
    assert.equal(startReq.method, "GET");

    const deviceReqs = requests.filter((r) => r.url.includes("/device-code"));
    assert.deepEqual(deviceReqs, [], "codex must not call the device-code action");

    const providerStatusReqs = requests.filter((r) => r.url.startsWith("/api/providers/"));
    assert.deepEqual(providerStatusReqs, [], "codex must not poll /api/providers/* routes");

    const pollReqs = requests.filter(
      (r) => r.method === "POST" && r.url === "/api/oauth/codex/poll-callback"
    );
    assert.ok(pollReqs.length >= 2, "poll-callback must be called until the callback lands");
  } finally {
    server.close();
  }
});

// Capture process.stderr writes for the duration of an async fn so the
// failure-path messages can be asserted without polluting the test output.
// Resolves to { result, stderr }.
async function captureStderr(fn) {
  const realWrite = process.stderr.write;
  let out = "";
  process.stderr.write = (chunk) => {
    out += typeof chunk === "string" ? chunk : String(chunk);
    return true;
  };
  try {
    return { result: await fn(), stderr: out };
  } finally {
    process.stderr.write = realWrite;
  }
}

function fakeKiroSocialStart(userCode) {
  return {
    authUrl: `https://kiro.test/device?user_code=${userCode}`,
    deviceCode: `dc-${userCode}`,
    userCode,
    expiresIn: 60,
    interval: 1,
    provider: "google",
  };
}

test("#14298 + review: kiro social-exchange non-200 terminal error fails fast", async () => {
  const { server, requests, baseUrl } = await startFakeServer((req, res) => {
    const url = req.url.split("?")[0];
    if (url === "/api/oauth/kiro/social-authorize") {
      if (req.method !== "GET") {
        return respondJson(res, 405, { error: "Method Not Allowed" });
      }
      return respondJson(res, 200, fakeKiroSocialStart("UC-E"));
    }
    if (url === "/api/oauth/kiro/social-exchange") {
      if (req.method !== "POST") {
        return respondJson(res, 405, { error: "Method Not Allowed" });
      }
      // Mirror the real route's error branch (classifyKiroSocialPoll:
      // { status: poll.status }): terminal errors come back with a non-200
      // status and pending:false, never as HTTP 200.
      return respondJson(res, 400, {
        success: false,
        pending: false,
        error: "expired_token",
      });
    }
    respondJson(res, 404, { error: "Unknown provider" });
  });

  try {
    const { result: exitCode } = await captureStderr(() =>
      runStartCatchingExit({
        provider: "kiro",
        social: "google",
        browser: false,
        baseUrl,
        timeout: 15000,
      })
    );
    assert.equal(
      exitCode,
      1,
      `the terminal non-200 error must exit 1 immediately (got ${exitCode})`
    );

    const exchangeReqs = requests.filter((r) => r.url.includes("/social-exchange"));
    assert.equal(
      exchangeReqs.length,
      1,
      "a non-200 terminal error must stop the poll loop after the first exchange"
    );
  } finally {
    server.close();
  }
});

test("#14298 + review: the non-200 terminal error message carries status and error", async () => {
  const { server, baseUrl } = await startFakeServer((req, res) => {
    const url = req.url.split("?")[0];
    if (url === "/api/oauth/kiro/social-authorize") {
      return respondJson(res, 200, fakeKiroSocialStart("UC-M"));
    }
    if (url === "/api/oauth/kiro/social-exchange") {
      return respondJson(res, 400, {
        success: false,
        pending: false,
        error: "expired_token",
      });
    }
    respondJson(res, 404, { error: "Unknown provider" });
  });

  try {
    const { stderr } = await captureStderr(() =>
      runStartCatchingExit({
        provider: "kiro",
        social: "google",
        browser: false,
        baseUrl,
        timeout: 15000,
      })
    );
    assert.ok(
      stderr.includes("400") && stderr.includes("expired_token"),
      `stderr must carry the HTTP status and the server error code, got: ${stderr}`
    );
    assert.ok(
      !stderr.includes("Timeout"),
      `the CLI must fail fast instead of timing out, got: ${stderr}`
    );
  } finally {
    server.close();
  }
});

test("#14298 + review: non-200 slow_down on social-exchange keeps polling", async () => {
  let pollCount = 0;
  const { server, requests, baseUrl } = await startFakeServer((req, res) => {
    const url = req.url.split("?")[0];
    if (url === "/api/oauth/kiro/social-authorize") {
      return respondJson(res, 200, fakeKiroSocialStart("UC-S"));
    }
    if (url === "/api/oauth/kiro/social-exchange") {
      pollCount += 1;
      if (pollCount === 1) {
        // slow_down semantics keep the loop alive even on a non-200 status.
        return respondJson(res, 429, { success: false, pending: true, error: "slow_down" });
      }
      return respondJson(res, 200, {
        success: true,
        connection: { id: "conn-kiro", provider: "kiro", email: "dev@gmail.example" },
      });
    }
    respondJson(res, 404, { error: "Unknown provider" });
  });

  try {
    const exitCode = await runStartCatchingExit({
      provider: "kiro",
      social: "google",
      browser: false,
      baseUrl,
      timeout: 15000,
    });
    assert.equal(exitCode, null, `slow_down must keep the poll loop alive (got ${exitCode})`);

    const exchangeReqs = requests.filter((r) => r.url.includes("/social-exchange"));
    assert.ok(exchangeReqs.length >= 2, "the loop must retry after slow_down");
  } finally {
    server.close();
  }
});

test("#14298 + review: poll-callback 500 exchange failure fails fast", async () => {
  const { server, requests, baseUrl } = await startFakeServer((req, res) => {
    if (req.method === "GET" && req.url === "/api/oauth/codex/start-callback-server") {
      return respondJson(res, 200, {
        authUrl: "https://auth.openai.com/oauth/authorize?code_challenge=x",
        codeVerifier: "verifier-1",
        redirectUri: "http://localhost:1455/auth/callback",
        serverPort: 1455,
        remoteHost: false,
      });
    }
    if (req.method === "POST" && req.url === "/api/oauth/codex/poll-callback") {
      // Mirror the real route: the token-exchange failure path returns
      // HTTP 500 with {success:false, error:"Internal server error"}.
      return respondJson(res, 500, { success: false, error: "Internal server error" });
    }
    respondJson(res, 404, { error: "Unknown provider" });
  });

  try {
    const { result: exitCode, stderr } = await captureStderr(() =>
      runStartCatchingExit({
        provider: "codex",
        browser: false,
        baseUrl,
        timeout: 15000,
      })
    );
    assert.equal(
      exitCode,
      1,
      `the 500 exchange failure must exit 1 immediately (got ${exitCode})`
    );

    const pollReqs = requests.filter(
      (r) => r.method === "POST" && r.url === "/api/oauth/codex/poll-callback"
    );
    assert.equal(
      pollReqs.length,
      1,
      "a 500 exchange failure must stop the poll loop after the first poll"
    );
    assert.ok(
      stderr.includes("500") && stderr.includes("Internal server error"),
      `stderr must carry the HTTP status and the server error, got: ${stderr}`
    );
    assert.ok(
      !stderr.includes("Timeout"),
      `the CLI must fail fast instead of timing out, got: ${stderr}`
    );
  } finally {
    server.close();
  }
});

test("#14298: kiro social flow uses GET social-authorize and POST social-exchange", async () => {
  let pollCount = 0;
  const { server, requests, baseUrl } = await startFakeServer((req, res) => {
    const url = req.url.split("?")[0];
    const query = new URL(req.url, "http://local").searchParams;
    // Mirror the real route registration: social-authorize is GET-only,
    // social-exchange is POST-only. The wrong method gets 405.
    if (url === "/api/oauth/kiro/social-authorize") {
      if (req.method !== "GET") {
        return respondJson(res, 405, { error: "Method Not Allowed" });
      }
      assert.equal(query.get("provider"), "google", "social provider must be forwarded");
      return respondJson(res, 200, {
        authUrl: "https://kiro.test/device?user_code=UC-1",
        deviceCode: "dc-1",
        userCode: "UC-1",
        expiresIn: 60,
        interval: 1,
        provider: "google",
      });
    }
    if (url === "/api/oauth/kiro/social-exchange") {
      if (req.method !== "POST") {
        return respondJson(res, 405, { error: "Method Not Allowed" });
      }
      pollCount += 1;
      if (pollCount < 2) {
        return respondJson(res, 200, {
          success: false,
          pending: true,
          error: "authorization_pending",
        });
      }
      return respondJson(res, 200, {
        success: true,
        connection: { id: "conn-kiro", provider: "kiro", email: "dev@gmail.example" },
      });
    }
    respondJson(res, 404, { error: "Unknown provider" });
  });

  try {
    const exitCode = await runStartCatchingExit({
      provider: "kiro",
      social: "google",
      browser: false,
      baseUrl,
      timeout: 15000,
    });
    assert.equal(
      exitCode,
      null,
      `kiro social flow must complete without exiting (got ${exitCode})`
    );

    const authorizeReqs = requests.filter((r) => r.url.includes("/social-authorize"));
    assert.equal(authorizeReqs.length, 1, "social-authorize must be called exactly once");
    assert.equal(authorizeReqs[0].method, "GET", "social-authorize must be a GET request");

    const exchangeReqs = requests.filter((r) => r.url.includes("/social-exchange"));
    assert.ok(exchangeReqs.length >= 2, "social-exchange must be polled until success");
    assert.ok(
      exchangeReqs.every((r) => r.method === "POST"),
      "social-exchange must be a POST request"
    );
    assert.equal(
      exchangeReqs[0].body.deviceCode,
      "dc-1",
      "the poll must carry the device code from social-authorize"
    );
    assert.equal(
      exchangeReqs[0].body.provider,
      "google",
      "the poll must carry the social provider"
    );

    const stateReqs = requests.filter((r) => r.url.includes("state="));
    assert.deepEqual(
      stateReqs,
      [],
      "the social flow must not poll by state (the response has none)"
    );
  } finally {
    server.close();
  }
});
