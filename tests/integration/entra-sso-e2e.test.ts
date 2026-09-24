/**
 * End-to-end Entra SSO: the real sign-in helper, driven as a subprocess against
 * a stub authority, and the token it produces fed to the real auth policy.
 *
 * The unit suites cover the server verification path and the helper's pure
 * functions. What is only exercised here is the wiring between them — the PKCE
 * round trip over real HTTP, the loopback callback, the code exchange, the
 * token cache on disk, the refresh grant, and the fact that stdout carries the
 * credential and nothing else.
 *
 * A stub authority stands in for a tenant. That does not replace a live-tenant
 * run (Hard Rule #18 still wants one for the OAuth upstream), but it does catch
 * everything that is our code rather than Microsoft's.
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import { createServer, type Server } from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { exportJWK, generateKeyPair, SignJWT, type CryptoKey } from "jose";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const execFileAsync = promisify(execFile);

const TEST_HOME = fs.mkdtempSync(path.join(os.tmpdir(), "entra-e2e-home-"));
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "entra-e2e-data-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "entra-e2e-secret";

const TENANT_ID = "e2e-tenant";
const CLIENT_ID = "e2e-client";
const AUDIENCE = "api://omniroute-e2e";
const KID = "e2e-key";
const SCRIPT = path.resolve("scripts/cli/omniroute-sso.mjs");

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { createKeyGroup } = await import("../../src/lib/db/apiKeyGroups.ts");
const { clientApiPolicy } = await import("../../src/server/authz/policies/clientApi.ts");
const { resetSsoResolutionCache } = await import("../../src/server/authz/entra/evaluate.ts");
const { resetEntraJwksCache } = await import("../../src/server/authz/entra/verifyToken.ts");

let privateKey: CryptoKey;
let publicJwk: Record<string, unknown>;
let authority: Server;
let authorityUrl: string;
let gateway: Server;
let gatewayUrl: string;
let keyGroupId: string;

/** code -> the PKCE challenge the authorize step was given. */
const issuedCodes = new Map<string, string>();
const issuedRefreshTokens = new Set<string>();

async function mintAccessToken(lifetimeSeconds = 3600): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({
    tid: TENANT_ID,
    oid: "e2e-user-oid",
    preferred_username: "e2e@corp.example",
    name: "E2E User",
    groups: ["e2e-entra-group"],
  })
    .setProtectedHeader({ alg: "RS256", kid: KID })
    .setIssuedAt(now)
    .setIssuer(`${authorityUrl}/${TENANT_ID}/v2.0`)
    .setAudience(AUDIENCE)
    .setExpirationTime(now + lifetimeSeconds)
    .sign(privateKey);
}

function readBody(req: import("node:http").IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });
}

function startAuthority(): Promise<void> {
  return new Promise((resolve) => {
    authority = createServer(async (req, res) => {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");

      if (url.pathname === `/${TENANT_ID}/discovery/v2.0/keys`) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ keys: [publicJwk] }));
        return;
      }

      if (url.pathname === `/${TENANT_ID}/oauth2/v2.0/authorize`) {
        const redirectUri = url.searchParams.get("redirect_uri") ?? "";
        const state = url.searchParams.get("state") ?? "";
        const challenge = url.searchParams.get("code_challenge") ?? "";
        const code = `code-${Math.random().toString(36).slice(2)}`;
        issuedCodes.set(code, challenge);
        const target = new URL(redirectUri);
        target.searchParams.set("code", code);
        target.searchParams.set("state", state);
        res.writeHead(302, { Location: target.toString() });
        res.end();
        return;
      }

      if (url.pathname === `/${TENANT_ID}/oauth2/v2.0/token`) {
        const params = new URLSearchParams(await readBody(req));
        const grant = params.get("grant_type");

        if (grant === "authorization_code") {
          const code = params.get("code") ?? "";
          const verifier = params.get("code_verifier") ?? "";
          const expected = issuedCodes.get(code);
          issuedCodes.delete(code);

          // Verify PKCE exactly as a real authority does — this is what proves
          // the helper's challenge derivation is correct end to end.
          const { createHash } = await import("node:crypto");
          const actual = createHash("sha256")
            .update(verifier)
            .digest("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

          if (!expected || expected !== actual) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "invalid_grant", error_description: "PKCE mismatch" }));
            return;
          }
        } else if (grant === "refresh_token") {
          if (!issuedRefreshTokens.has(params.get("refresh_token") ?? "")) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "invalid_grant" }));
            return;
          }
        }

        const refresh = `refresh-${Math.random().toString(36).slice(2)}`;
        issuedRefreshTokens.add(refresh);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            access_token: await mintAccessToken(),
            refresh_token: refresh,
            expires_in: 3600,
          })
        );
        return;
      }

      res.writeHead(404).end();
    });
    authority.listen(0, "127.0.0.1", () => {
      const address = authority.address();
      authorityUrl = `http://127.0.0.1:${typeof address === "object" && address ? address.port : 0}`;
      resolve();
    });
  });
}

/** Stands in for OmniRoute serving GET /api/auth/sso/config to the helper. */
function startGateway(): Promise<void> {
  return new Promise((resolve) => {
    gateway = createServer((req, res) => {
      if ((req.url ?? "").startsWith("/api/auth/sso/config")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            enabled: true,
            authorityHost: authorityUrl,
            tenantId: TENANT_ID,
            clientId: CLIENT_ID,
            audience: AUDIENCE,
            issuer: `${authorityUrl}/${TENANT_ID}/v2.0`,
            scope: `${AUDIENCE}/.default`,
          })
        );
        return;
      }
      res.writeHead(404).end();
    });
    gateway.listen(0, "127.0.0.1", () => {
      const address = gateway.address();
      gatewayUrl = `http://127.0.0.1:${typeof address === "object" && address ? address.port : 0}`;
      resolve();
    });
  });
}

function runHelper(args: string[]) {
  return execFileAsync(process.execPath, [SCRIPT, ...args], {
    env: {
      ...process.env,
      HOME: TEST_HOME,
      USERPROFILE: TEST_HOME,
      OMNIROUTE_URL: gatewayUrl,
    },
  });
}

/**
 * Run `login` and act as the browser: the helper prints the authorize URL to
 * stderr and blocks on its loopback port, so fetching that URL and following
 * the redirect completes the flow headlessly.
 */
function runLogin(): Promise<{ stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = execFile(
      process.execPath,
      [SCRIPT, "login"],
      {
        env: {
          ...process.env,
          HOME: TEST_HOME,
          USERPROFILE: TEST_HOME,
          OMNIROUTE_URL: gatewayUrl,
        },
      },
      (error, _stdout, stderr) => (error ? reject(error) : resolve({ stderr }))
    );

    let stderr = "";
    let visited = false;
    child.stderr?.on("data", async (chunk) => {
      stderr += String(chunk);
      const match = /(http:\/\/127\.0\.0\.1:\d+\/[^\s]*authorize[^\s]*)/.exec(stderr);
      if (match && !visited) {
        visited = true;
        try {
          await fetch(match[1], { redirect: "follow" });
        } catch (fetchError) {
          reject(fetchError);
        }
      }
    });
  });
}

before(async () => {
  const pair = await generateKeyPair("RS256", { extractable: true });
  privateKey = pair.privateKey;
  publicJwk = { ...(await exportJWK(pair.publicKey)), kid: KID, alg: "RS256", use: "sig" };

  await startAuthority();
  await startGateway();

  keyGroupId = createKeyGroup("E2E Engineering", "mapped from the stub tenant").id;
  await updateSettings({
    entraSsoEnabled: true,
    entraAuthorityHost: authorityUrl,
    entraTenantId: TENANT_ID,
    entraClientId: CLIENT_ID,
    entraApiAudience: AUDIENCE,
    entraGroupMappings: [{ groupId: "e2e-entra-group", keyGroupId }],
  });
  invalidateDbCache("settings");
  resetSsoResolutionCache();
  resetEntraJwksCache();
});

after(() => {
  authority?.close();
  gateway?.close();
  resetDbInstance();
  fs.rmSync(TEST_HOME, { recursive: true, force: true });
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe("Entra SSO end to end", () => {
  it("completes the PKCE login and stores tokens with 0600 permissions", async () => {
    const { stderr } = await runLogin();
    assert.match(stderr, /Signed in/);

    const cacheDir = path.join(TEST_HOME, ".omniroute-sso");
    const files = fs.readdirSync(cacheDir);
    assert.equal(files.length, 1, "exactly one host cache file");

    const cacheFile = path.join(cacheDir, files[0]);
    const mode = fs.statSync(cacheFile).mode & 0o777;
    assert.equal(mode, 0o600, "the refresh token must not be world-readable");

    const cached = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    assert.ok(cached.accessToken, "an access token was stored");
    assert.ok(cached.refreshToken, "a refresh token was stored");
  });

  it("prints the access token on stdout and nothing else", async () => {
    const { stdout } = await runHelper(["token"]);

    // apiKeyHelper fails on v2.1.227+ if anything accompanies the credential.
    assert.equal(stdout, stdout.trim(), "no leading or trailing whitespace");
    assert.equal(stdout.split(".").length, 3, "stdout is exactly one JWT");
    assert.ok(!stdout.includes("\n"), "no log line alongside the credential");
  });

  it("authenticates against the real auth policy and provisions the mapped key group", async () => {
    const { stdout: token } = await runHelper(["token"]);

    const outcome = await clientApiPolicy.evaluate({
      request: new Request("http://localhost/api/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      classification: {
        routeClass: "CLIENT_API" as const,
        reason: "client_api_v1" as const,
        normalizedPath: "/api/v1/chat/completions",
      },
      requestId: "e2e",
    });

    assert.equal(outcome.allow, true);
    if (!outcome.allow) return;
    assert.equal(outcome.subject.kind, "sso_user");
    assert.equal(outcome.subject.id, "e2e-user-oid");

    const { getSsoIdentity } = await import("../../src/lib/db/ssoIdentities.ts");
    const { getKeyGroupsForApiKey } = await import("../../src/lib/db/apiKeyGroups.ts");
    const identity = getSsoIdentity("e2e-user-oid");
    assert.ok(identity, "the shadow identity was provisioned");
    assert.deepEqual(
      getKeyGroupsForApiKey(identity.apiKeyId).map((g) => g.id),
      [keyGroupId]
    );
  });

  it("refreshes silently once the cached token goes stale", async () => {
    const cacheDir = path.join(TEST_HOME, ".omniroute-sso");
    const cacheFile = path.join(cacheDir, fs.readdirSync(cacheDir)[0]);
    const before = JSON.parse(fs.readFileSync(cacheFile, "utf8"));

    // Inside the 5-minute skew window, so the helper must treat it as stale and
    // use the refresh grant rather than serving it.
    fs.writeFileSync(cacheFile, JSON.stringify({ ...before, expiresAt: Date.now() + 60_000 }));

    const { stdout } = await runHelper(["token"]);
    assert.equal(stdout.split(".").length, 3);

    const after = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    assert.notEqual(after.refreshToken, before.refreshToken, "the refresh token rotated");
    assert.ok(after.expiresAt > Date.now() + 600_000, "a fresh lifetime was stored");
  });

  it("writes a usable apiKeyHelper block into the Claude Code settings file", async () => {
    fs.mkdirSync(path.join(TEST_HOME, ".claude"), { recursive: true });
    fs.writeFileSync(
      path.join(TEST_HOME, ".claude", "settings.json"),
      JSON.stringify({ model: "claude-opus-5", env: { HTTP_PROXY: "http://proxy:3128" } })
    );

    await runHelper(["install"]);

    const settings = JSON.parse(
      fs.readFileSync(path.join(TEST_HOME, ".claude", "settings.json"), "utf8")
    );
    assert.match(settings.apiKeyHelper, /omniroute-sso\.mjs" token --url/);
    assert.equal(settings.env.ANTHROPIC_BASE_URL, gatewayUrl);
    assert.equal(settings.env.CLAUDE_CODE_API_KEY_HELPER_TTL_MS, "900000");
    assert.equal(settings.model, "claude-opus-5", "unrelated settings survive");
    assert.equal(settings.env.HTTP_PROXY, "http://proxy:3128", "unrelated env survives");

    // The helper command must actually run as written.
    const { stdout } = await execFileAsync(
      process.execPath,
      [SCRIPT, "token", "--url", gatewayUrl],
      { env: { ...process.env, HOME: TEST_HOME, USERPROFILE: TEST_HOME } }
    );
    assert.equal(stdout.split(".").length, 3);
  });

  it("exits non-zero with guidance when the stored session is gone", async () => {
    fs.rmSync(path.join(TEST_HOME, ".omniroute-sso"), { recursive: true, force: true });

    await assert.rejects(
      () => runHelper(["token"]),
      (error: { code?: number; stderr?: string; stdout?: string }) => {
        assert.notEqual(error.code, 0, "a failing helper must exit non-zero");
        assert.match(error.stderr ?? "", /login/, "stderr tells the user how to recover");
        assert.equal(error.stdout, "", "nothing is printed to stdout on failure");
        return true;
      }
    );
  });
});
