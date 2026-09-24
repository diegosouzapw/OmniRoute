// Repro/regression test for issue #14298 (findings 1-3).
//
// `omniroute oauth start --provider copilot` never completed on a healthy
// server:
//   1. The CLI's BACKEND_OAUTH_KEY alias map had no `copilot` entry, so the
//      device-code request went to /api/oauth/copilot/device-code. The server
//      registers the GitHub device flow under the key `github`
//      (src/lib/oauth/providers/index.ts), so the request failed.
//   2. runDeviceFlow then polled GET /api/providers/{key}/auth/status and
//      POST /api/providers/{key}/auth/apply — routes that do not exist on the
//      server (404), so the CLI looped until its timeout even after the user
//      authorized. The real poll route is POST /api/oauth/{key}/poll with
//      {"deviceCode": ...} (same one the dashboard uses, see
//      src/shared/components/OAuthModal.tsx::pollDeviceCodeOnce).
//   3. The old poll keyed on `start.state`, but GET /api/oauth/{key}/device-code
//      never returns a `state` field, so the query could never match a pending
//      flow even if the route existed.
//
// These tests drive runOAuthStart against a fake HTTP server that only mounts
// the routes the real server actually exposes, and assert the fixed behavior:
// the alias resolves to `github`, the flow polls /api/oauth/github/poll with
// the device code, and a fatal poll error surfaces instead of looping.
import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const repoRoot = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "..");

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14298-"));
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

test("#14298: copilot device flow resolves to the github backend key and polls /api/oauth/github/poll", async () => {
  let pollCount = 0;
  const { server, requests, baseUrl } = await startFakeServer((req, res) => {
    if (req.method === "GET" && req.url === "/api/oauth/github/device-code") {
      return respondJson(res, 200, {
        device_code: "device-code-1",
        user_code: "USER-CODE",
        verification_uri: "https://example.test/device",
        expires_in: 60,
        interval: 0,
        codeVerifier: "verifier-1",
      });
    }
    if (req.method === "POST" && req.url === "/api/oauth/github/poll") {
      pollCount += 1;
      if (pollCount < 2) {
        return respondJson(res, 200, {
          success: false,
          error: "authorization_pending",
          pending: true,
        });
      }
      return respondJson(res, 200, {
        success: true,
        connection: { id: "conn-1", provider: "github" },
      });
    }
    // Anything else mirrors the real server: unknown provider/action routes 404.
    respondJson(res, 404, { error: "Unknown provider" });
  });

  try {
    const exitCode = await runStartCatchingExit({
      provider: "copilot",
      browser: false,
      baseUrl,
      timeout: 15000,
    });
    assert.equal(
      exitCode,
      null,
      `copilot device flow must complete without exiting (got ${exitCode})`
    );

    const deviceCodeReq = requests.find((r) => r.url === "/api/oauth/github/device-code");
    assert.ok(deviceCodeReq, "device-code must be requested on the resolved backend key github");

    const copilotReqs = requests.filter((r) => r.url.includes("/copilot/"));
    assert.deepEqual(copilotReqs, [], "no request may target the unregistered copilot backend key");

    const providerStatusReqs = requests.filter((r) => r.url.startsWith("/api/providers/"));
    assert.deepEqual(
      providerStatusReqs,
      [],
      "the device flow must not poll the non-existent /api/providers/{key}/auth/status route"
    );

    const pollReqs = requests.filter(
      (r) => r.method === "POST" && r.url === "/api/oauth/github/poll"
    );
    assert.ok(pollReqs.length >= 2, "poll must be called until the server reports success");
    assert.equal(pollReqs[0].body.deviceCode, "device-code-1", "poll must carry the device code");
    assert.equal(
      pollReqs[0].body.codeVerifier,
      "verifier-1",
      "poll must carry the PKCE verifier when present"
    );
  } finally {
    server.close();
  }
});

test("#14298: a fatal poll error ends the flow instead of looping until timeout", async () => {
  const { server, requests, baseUrl } = await startFakeServer((req, res) => {
    if (req.method === "GET" && req.url === "/api/oauth/github/device-code") {
      return respondJson(res, 200, {
        device_code: "device-code-2",
        user_code: "USER-CODE",
        verification_uri: "https://example.test/device",
        expires_in: 60,
        interval: 0,
      });
    }
    if (req.method === "POST" && req.url === "/api/oauth/github/poll") {
      return respondJson(res, 200, {
        success: false,
        error: "access_denied",
        errorDescription: "The user refused authorization",
        pending: false,
      });
    }
    respondJson(res, 404, { error: "Unknown provider" });
  });

  const stderrChunks = [];
  const realWrite = process.stderr.write;
  process.stderr.write = (chunk) => {
    stderrChunks.push(String(chunk));
    return true;
  };
  let exitCode;
  try {
    const started = Date.now();
    exitCode = await runStartCatchingExit({
      provider: "copilot",
      browser: false,
      baseUrl,
      timeout: 60000,
    });
    assert.ok(Date.now() - started < 30000, "a fatal poll error must not burn the full timeout");
  } finally {
    process.stderr.write = realWrite;
    server.close();
  }

  assert.equal(exitCode, 1, "a fatal poll error must exit(1)");
  const stderr = stderrChunks.join("");
  assert.match(
    stderr,
    /access_denied|refused authorization/i,
    "the failure reason must be reported"
  );
  const pollReqs = requests.filter(
    (r) => r.method === "POST" && r.url === "/api/oauth/github/poll"
  );
  assert.equal(pollReqs.length, 1, "the flow must stop after a fatal (non-pending) poll error");
});
