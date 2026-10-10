import test from "node:test";
import assert from "node:assert/strict";
import {
  isEmailAllowed,
  isGithubLoginAllowed,
  getGoogleOAuthConfig,
  getGitHubOAuthConfig,
  getRequestOrigin,
  timingSafeCompare,
  createDashboardSessionJwt,
} from "../../src/lib/auth/socialOAuth.ts";
import { verifyDashboardSessionToken } from "../../src/shared/utils/dashboardSessionToken.ts";

test("timingSafeCompare properly checks string equality in constant time", () => {
  assert.equal(timingSafeCompare("abcdef123", "abcdef123"), true);
  assert.equal(timingSafeCompare("abcdef123", "abcdef124"), false);
  assert.equal(timingSafeCompare("abcdef123", "abcdef"), false);
  assert.equal(timingSafeCompare("", ""), true);
  assert.equal(timingSafeCompare(null, null), true);
  assert.equal(timingSafeCompare("a", null), false);
  assert.equal(timingSafeCompare(undefined, "b"), false);
});

test("isEmailAllowed validates emails against configured allowlists", () => {
  // Deny-by-default (#15153): an empty/undefined allowlist — or a bare "*" — never admits anyone,
  // otherwise any Google/GitHub account on the planet would receive a 30-day admin session.
  const savedEnv = process.env.AUTH_ALLOWED_EMAILS;
  delete process.env.AUTH_ALLOWED_EMAILS;
  assert.equal(isEmailAllowed("developer@example.com", []), false);
  assert.equal(isEmailAllowed("developer@example.com", undefined), false);
  assert.equal(isEmailAllowed("developer@example.com", "*"), false);
  assert.equal(isEmailAllowed("developer@example.com", ["*"]), false);
  assert.equal(isEmailAllowed("developer@example.com", ["  ", ""]), false);
  if (savedEnv !== undefined) process.env.AUTH_ALLOWED_EMAILS = savedEnv;

  // Exact matching with case insensitivity
  const allowedList = ["admin@company.com", "CTO@Company.com", "DevOps@CLOUD.io"];
  assert.equal(isEmailAllowed("admin@company.com", allowedList), true);
  assert.equal(isEmailAllowed("ADMIN@COMPANY.COM", allowedList), true);
  assert.equal(isEmailAllowed("cto@company.com", allowedList), true);
  assert.equal(isEmailAllowed("devops@cloud.io", allowedList), true);
  assert.equal(isEmailAllowed("stranger@company.com", allowedList), false);

  // Comma-separated string format
  const csvAllowed = "admin@example.com, test@example.com";
  assert.equal(isEmailAllowed("admin@example.com", csvAllowed), true);
  assert.equal(isEmailAllowed("test@example.com", csvAllowed), true);
  assert.equal(isEmailAllowed("other@example.com", csvAllowed), false);

  // Wildcard domain matching: *@domain.com or @domain.com
  const domainAllowed = ["*@trusted.org", "@corp.local"];
  assert.equal(isEmailAllowed("alice@trusted.org", domainAllowed), true);
  assert.equal(isEmailAllowed("bob@trusted.org", domainAllowed), true);
  assert.equal(isEmailAllowed("charlie@corp.local", domainAllowed), true);
  assert.equal(isEmailAllowed("hacker@untrusted.org", domainAllowed), false);

  // Invalid inputs
  assert.equal(isEmailAllowed("", allowedList), false);
  assert.equal(isEmailAllowed(null, allowedList), false);
  assert.equal(isEmailAllowed(undefined, allowedList), false);
});

test("getGoogleOAuthConfig resolves credentials from settings and env", () => {
  // From settings
  const settings = {
    googleAuthEnabled: true,
    authAllowedEmails: ["admin@company.com"],
    googleClientId: "g-client-123",
    googleClientSecret: "g-secret-456",
    googleRedirectPath: "/custom/callback",
  };
  const config = getGoogleOAuthConfig(settings);
  assert.equal(config.enabled, true);
  assert.equal(config.clientId, "g-client-123");
  assert.equal(config.clientSecret, "g-secret-456");
  assert.equal(config.redirectPath, "/custom/callback");

  // Fallback to env
  process.env.AUTH_GOOGLE_CLIENT_ID = "env-g-client";
  process.env.AUTH_GOOGLE_CLIENT_SECRET = "env-g-secret";
  const envConfig = getGoogleOAuthConfig({ authAllowedEmails: ["admin@company.com"] });
  assert.equal(envConfig.enabled, true);
  assert.equal(envConfig.clientId, "env-g-client");
  assert.equal(envConfig.clientSecret, "env-g-secret");
  assert.equal(envConfig.redirectPath, "/api/auth/google/callback");
  delete process.env.AUTH_GOOGLE_CLIENT_ID;
  delete process.env.AUTH_GOOGLE_CLIENT_SECRET;
});

test("getGitHubOAuthConfig resolves credentials from settings and env", () => {
  // From settings
  const settings = {
    githubAuthEnabled: true,
    authAllowedEmails: ["admin@company.com"],
    githubClientId: "gh-client-123",
    githubClientSecret: "gh-secret-456",
  };
  const config = getGitHubOAuthConfig(settings);
  assert.equal(config.enabled, true);
  assert.equal(config.clientId, "gh-client-123");
  assert.equal(config.clientSecret, "gh-secret-456");
  assert.equal(config.redirectPath, "/api/auth/github/callback");

  // Fallback to env
  process.env.AUTH_GITHUB_CLIENT_ID = "env-gh-client";
  process.env.AUTH_GITHUB_CLIENT_SECRET = "env-gh-secret";
  const envConfig = getGitHubOAuthConfig({ authAllowedEmails: ["admin@company.com"] });
  assert.equal(envConfig.enabled, true);
  assert.equal(envConfig.clientId, "env-gh-client");
  assert.equal(envConfig.clientSecret, "env-gh-secret");
  delete process.env.AUTH_GITHUB_CLIENT_ID;
  delete process.env.AUTH_GITHUB_CLIENT_SECRET;
});

test("getRequestOrigin honours forwarded proto and Host, never X-Forwarded-Host", () => {
  const req = new Request("http://internal-docker:3000/api/auth/google/login", {
    headers: {
      "x-forwarded-proto": "https",
      host: "omniroute.example.com",
      "x-forwarded-host": "evil.example.net",
    },
  });
  const origin = getRequestOrigin(req);
  assert.equal(origin, "https://omniroute.example.com");

  const localReq = new Request("http://localhost:20128/api/auth/github/login");
  assert.equal(getRequestOrigin(localReq), "http://localhost:20128");
});

test("createDashboardSessionJwt mints a valid session token that passes verifyDashboardSessionToken", async () => {
  const testSecret = new TextEncoder().encode("super-secure-test-jwt-secret-at-least-32-chars");
  const jwt = await createDashboardSessionJwt(testSecret);

  assert.ok(jwt && typeof jwt === "string", "JWT must be a non-empty string");

  // Verifier requires matching secret and authenticated: true claim
  const payload = await verifyDashboardSessionToken(jwt, testSecret);
  assert.ok(payload !== null, "Session token must verify successfully");
  assert.equal(payload.authenticated, true, "Payload must carry authenticated: true");

  // Wrong secret must reject
  const wrongSecret = new TextEncoder().encode("wrong-secret-key-32-characters-long!!");
  const invalidPayload = await verifyDashboardSessionToken(jwt, wrongSecret);
  assert.equal(invalidPayload, null, "Wrong secret must fail verification");
});

test("provider is disabled until an allowlist is configured (#15153)", () => {
  const savedEnv = process.env.AUTH_ALLOWED_EMAILS;
  delete process.env.AUTH_ALLOWED_EMAILS;
  try {
    const creds = {
      googleClientId: "g-id",
      googleClientSecret: "g-secret",
      githubClientId: "gh-id",
      githubClientSecret: "gh-secret",
    };
    assert.equal(getGoogleOAuthConfig(creds).enabled, false);
    assert.equal(getGitHubOAuthConfig(creds).enabled, false);
    assert.equal(getGoogleOAuthConfig({ ...creds, authAllowedEmails: ["*"] }).enabled, false);
    assert.equal(getGoogleOAuthConfig({ ...creds, authAllowedEmails: ["a@b.co"] }).enabled, true);
    assert.equal(getGitHubOAuthConfig({ ...creds, authAllowedEmails: ["a@b.co"] }).enabled, true);

    process.env.AUTH_ALLOWED_EMAILS = "ops@company.com";
    assert.equal(getGoogleOAuthConfig(creds).enabled, true);
  } finally {
    if (savedEnv === undefined) delete process.env.AUTH_ALLOWED_EMAILS;
    else process.env.AUTH_ALLOWED_EMAILS = savedEnv;
  }
});

test("generic GOOGLE_CLIENT_ID / GITHUB_CLIENT_ID env vars are NOT used as login credentials", () => {
  const saved = {
    gid: process.env.GOOGLE_CLIENT_ID,
    gsecret: process.env.GOOGLE_CLIENT_SECRET,
    hid: process.env.GITHUB_CLIENT_ID,
    hsecret: process.env.GITHUB_CLIENT_SECRET,
  };
  process.env.GOOGLE_CLIENT_ID = "generic-g";
  process.env.GOOGLE_CLIENT_SECRET = "generic-g-secret";
  process.env.GITHUB_CLIENT_ID = "generic-gh";
  process.env.GITHUB_CLIENT_SECRET = "generic-gh-secret";
  try {
    const settings = { authAllowedEmails: ["admin@company.com"] };
    const google = getGoogleOAuthConfig(settings);
    const github = getGitHubOAuthConfig(settings);
    assert.equal(google.enabled, false);
    assert.equal(google.clientId, "");
    assert.equal(github.enabled, false);
    assert.equal(github.clientId, "");
  } finally {
    for (const [key, value] of [
      ["GOOGLE_CLIENT_ID", saved.gid],
      ["GOOGLE_CLIENT_SECRET", saved.gsecret],
      ["GITHUB_CLIENT_ID", saved.hid],
      ["GITHUB_CLIENT_SECRET", saved.hsecret],
    ] as const) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("isGithubLoginAllowed only matches bare username entries, never email/domain entries", () => {
  const list = ["octocat", "@corp.local", "*@trusted.org", "admin@company.com"];
  assert.equal(isGithubLoginAllowed("octocat", list), true);
  assert.equal(isGithubLoginAllowed("OctoCat", list), true);
  assert.equal(isGithubLoginAllowed("corp.local", list), false);
  assert.equal(isGithubLoginAllowed("trusted.org", list), false);
  assert.equal(isGithubLoginAllowed("admin", list), false);
  assert.equal(isGithubLoginAllowed("someone-else", list), false);
  assert.equal(isGithubLoginAllowed("", list), false);
  assert.equal(isGithubLoginAllowed("octocat", []), false);
  assert.equal(isGithubLoginAllowed("octocat", ["*"]), false);
});

test("redirect path from settings must be a same-origin absolute path (no open redirect_uri)", () => {
  const base = {
    authAllowedEmails: ["a@b.co"],
    googleClientId: "id",
    googleClientSecret: "secret",
    githubClientId: "id",
    githubClientSecret: "secret",
  };
  for (const bad of [
    "//evil.example.net/cb",
    "@evil.example.net",
    "https://evil.example.net/cb",
    "cb",
  ]) {
    assert.equal(
      getGoogleOAuthConfig({ ...base, googleRedirectPath: bad }).redirectPath,
      "/api/auth/google/callback",
      bad
    );
    assert.equal(
      getGitHubOAuthConfig({ ...base, githubRedirectPath: bad }).redirectPath,
      "/api/auth/github/callback",
      bad
    );
  }
  assert.equal(
    getGoogleOAuthConfig({ ...base, googleRedirectPath: "/custom/callback" }).redirectPath,
    "/custom/callback"
  );
});
