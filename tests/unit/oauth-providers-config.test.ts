import test from "node:test";
import assert from "node:assert/strict";

const originalEnv = { ...process.env };
Object.assign(process.env, {
  CLAUDE_OAUTH_CLIENT_ID: "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
  CODEX_OAUTH_CLIENT_ID: "app_EMoamEEZ73f0CkXaXp7hrann",
  GEMINI_OAUTH_CLIENT_ID:
    "681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com",
  GEMINI_OAUTH_CLIENT_SECRET: "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",
  GEMINI_CLI_OAUTH_CLIENT_ID:
    "681255809395-oo8ft2oprdrnp9e3aqf6av3hmdib135j.apps.googleusercontent.com",
  GEMINI_CLI_OAUTH_CLIENT_SECRET: "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",
  QWEN_OAUTH_CLIENT_ID: "f0304373b74a44d2b584a3fb70ca9e56",
  KIMI_CODING_OAUTH_CLIENT_ID: "17e5f671-d194-4dfb-9706-5516cb48c098",
  ANTIGRAVITY_OAUTH_CLIENT_ID:
    "1071006060591-tmhssin2h21lcre235vtolojh4g403ep.apps.googleusercontent.com",
  ANTIGRAVITY_OAUTH_CLIENT_SECRET: "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",
  GITHUB_OAUTH_CLIENT_ID: "Iv1.b507a08c87ecfe98",
  GITLAB_OAUTH_CLIENT_ID: "gitlab-test-client-id",
  GITLAB_OAUTH_CLIENT_SECRET: "gitlab-test-client-secret",
  GITLAB_OAUTH_BASE_URL: "https://gitlab.com",
  NOUS_RESEARCH_OAUTH_CLIENT_ID: "hermes-cli",
});

const providersModule = await import("../../src/lib/oauth/providers/index.ts");
const oauthModule = await import("../../src/lib/oauth/constants/oauth.ts");
const oauthHelpersModule = await import("../../src/lib/oauth/providers.ts");
const registryModule = await import("../../open-sse/config/providerRegistry.ts");

const PROVIDERS = providersModule.default;
const {
  ANTIGRAVITY_CONFIG,
  CLAUDE_CONFIG,
  CLINE_CONFIG,
  CODEX_CONFIG,
  CURSOR_CONFIG,
  GEMINI_CONFIG,
  GITHUB_CONFIG,
  GITLAB_DUO_CONFIG,
  KILOCODE_CONFIG,
  KIMI_CODING_CONFIG,
  KIRO_CONFIG,
  AMAZON_Q_CONFIG,
  NOUS_RESEARCH_CONFIG,
  OAUTH_TIMEOUT,
  PROVIDERS: OAUTH_PROVIDER_IDS,
  QODER_CONFIG,
  QWEN_CONFIG,
  ZED_CONFIG,
  TRAE_CONFIG,
} = oauthModule;
const { generateAuthData } = oauthHelpersModule;
const { REGISTRY } = registryModule;

const originalFetch = globalThis.fetch;

const EXPECTED_PROVIDER_KEYS = [
  "claude",
  "codex",
  "gemini-cli",
  "antigravity",
  "qoder",
  "qwen",
  "kimi-coding",
  "github",
  "kiro",
  "amazon-q",
  "nous-research",
  "cursor",
  "kilocode",
  "cline",
  "zed",
  "trae",
  "gitlab-duo-oauth",
];

const EXPECTED_CONFIG_BY_PROVIDER = {
  claude: CLAUDE_CONFIG,
  codex: CODEX_CONFIG,
  "gemini-cli": GEMINI_CONFIG,
  antigravity: ANTIGRAVITY_CONFIG,
  qoder: QODER_CONFIG,
  qwen: QWEN_CONFIG,
  "kimi-coding": KIMI_CODING_CONFIG,
  github: GITHUB_CONFIG,
  kiro: KIRO_CONFIG,
  "amazon-q": AMAZON_Q_CONFIG,
  "nous-research": NOUS_RESEARCH_CONFIG,
  cursor: CURSOR_CONFIG,
  kilocode: KILOCODE_CONFIG,
  cline: CLINE_CONFIG,
  zed: ZED_CONFIG,
  trae: TRAE_CONFIG,
  "gitlab-duo-oauth": GITLAB_DUO_CONFIG,
};

const REQUIRED_FIELDS_BY_PROVIDER = {
  claude: ["authorizeUrl", "tokenUrl", "redirectUri", "scopes", "clientId"],
  codex: ["authorizeUrl", "tokenUrl", "scope", "clientId"],
  "gemini-cli": ["authorizeUrl", "tokenUrl", "userInfoUrl", "scopes", "clientId"],
  antigravity: ["authorizeUrl", "tokenUrl", "userInfoUrl", "scopes", "clientId"],
  qoder: ["extraParams"],
  qwen: ["deviceCodeUrl", "tokenUrl", "scope", "clientId"],
  "kimi-coding": ["deviceCodeUrl", "tokenUrl", "clientId"],
  github: ["deviceCodeUrl", "tokenUrl", "userInfoUrl", "copilotTokenUrl", "clientId"],
  kiro: [
    "registerClientUrl",
    "deviceAuthUrl",
    "tokenUrl",
    "socialAuthEndpoint",
    "socialLoginUrl",
    "socialTokenUrl",
    "socialRefreshUrl",
    "authMethods",
  ],
  "amazon-q": [
    "registerClientUrl",
    "deviceAuthUrl",
    "tokenUrl",
    "socialAuthEndpoint",
    "socialLoginUrl",
    "socialTokenUrl",
    "socialRefreshUrl",
    "authMethods",
  ],
  "nous-research": [
    "deviceCodeUrl",
    "tokenUrl",
    "agentKeyUrl",
    "portalBaseUrl",
    "inferenceBaseUrl",
    "scope",
    "clientId",
  ],
  cursor: ["apiEndpoint", "api3Endpoint", "agentEndpoint", "agentNonPrivacyEndpoint", "dbKeys"],
  kilocode: ["apiBaseUrl", "initiateUrl", "pollUrlBase"],
  cline: ["appBaseUrl", "apiBaseUrl", "authorizeUrl", "tokenExchangeUrl", "refreshUrl"],
  zed: ["signInUrl", "cloudBaseUrl", "aiBaseUrl"],
  trae: [
    "loginGuidanceUrls",
    "defaultLoginHost",
    "defaultApiOrigin",
    "suggestedChatBaseUrl",
    "requiresExplicitChatBaseUrl",
    "tokenUrl",
    "exchangeTokenPath",
    "userInfoPath",
  ],
  "gitlab-duo-oauth": ["authorizeUrl", "tokenUrl", "scope", "clientId", "baseUrl"],
};

function getByPath(object, path) {
  return path.split(".").reduce((value, segment) => value?.[segment], object);
}

function collectHttpsUrls(value, path = "config") {
  const results = [];

  if (typeof value === "string") {
    if (/^https?:\/\//.test(value)) {
      results.push({ path, value });
    }
    return results;
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return results;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    results.push(...collectHttpsUrls(nestedValue, `${path}.${key}`));
  }

  return results;
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function textResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
}

function createJwt(payload) {
  const encode = (value) =>
    Buffer.from(JSON.stringify(value)).toString("base64url").replace(/=/g, "");

  return `${encode({ alg: "none", typ: "JWT" })}.${encode(payload)}.signature`;
}

function useFetchSequence(sequence) {
  let index = 0;
  globalThis.fetch = async (...args) => {
    const next = sequence[index++];
    if (!next) {
      throw new Error(`Unexpected fetch call #${index}`);
    }
    return typeof next === "function" ? next(...args) : next;
  };
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) {
      delete process.env[key];
    }
  }
  Object.assign(process.env, originalEnv);
});

test("OAuth provider registry exposes every expected provider exactly once", () => {
  assert.deepEqual(Object.keys(PROVIDERS), EXPECTED_PROVIDER_KEYS);
  assert.equal(new Set(Object.keys(PROVIDERS)).size, EXPECTED_PROVIDER_KEYS.length);
});

test("OAuth constants include all provider ids and use a sane timeout", () => {
  const constantIds = Object.values(OAUTH_PROVIDER_IDS);
  const registryIds = Object.keys(PROVIDERS);

  assert.ok(Number.isInteger(OAUTH_TIMEOUT));
  assert.ok(OAUTH_TIMEOUT > 0);
  assert.equal(new Set(constantIds).size, constantIds.length);

  for (const providerId of registryIds) {
    assert.ok(
      constantIds.includes(providerId),
      `Expected oauth constants to include provider id ${providerId}`
    );
  }
});

test("Amazon Q OAuth alias reuses the Kiro device flow implementation", () => {
  assert.equal(PROVIDERS["amazon-q"], PROVIDERS.kiro);
  assert.equal(PROVIDERS["amazon-q"].config, KIRO_CONFIG);
  assert.equal(PROVIDERS["amazon-q"].flowType, "device_code");
});

test("import-token providers expose no browser auth URL", () => {
  const zedAuth = generateAuthData("zed", "http://localhost:8080/callback");
  const traeAuth = generateAuthData("trae", "http://localhost:8080/callback");

  assert.equal(zedAuth.authUrl, null);
  assert.equal(traeAuth.authUrl, null);
  assert.equal(zedAuth.flowType, "import_token");
  assert.equal(traeAuth.flowType, "import_token");
});

test("every registered OAuth provider has a valid config object, flow type and token mapper", () => {
  const allowedFlowTypes = new Set([
    "authorization_code",
    "authorization_code_pkce",
    "device_code",
    "import_token",
  ]);

  for (const [providerId, provider] of Object.entries(PROVIDERS)) {
    assert.equal(provider.config, EXPECTED_CONFIG_BY_PROVIDER[providerId]);
    assert.ok(allowedFlowTypes.has(provider.flowType), `${providerId} has unsupported flowType`);
    assert.equal(typeof provider.mapTokens, "function", `${providerId} must expose mapTokens`);

    const mapped = provider.mapTokens({});
    assert.ok(
      mapped && typeof mapped === "object",
      `${providerId} mapTokens must return an object`
    );
  }
});

test("every required provider config field is present when the provider is enabled for that flow", () => {
  for (const [providerId, fields] of Object.entries(REQUIRED_FIELDS_BY_PROVIDER)) {
    const provider = PROVIDERS[providerId];
    const config = provider.config;

    for (const field of fields) {
      const value = getByPath(config, field);

      if (
        providerId === "qoder" &&
        !config.enabled &&
        ["authorizeUrl", "tokenUrl", "userInfoUrl", "clientId"].includes(field)
      ) {
        continue;
      }

      assert.notEqual(value, undefined, `${providerId} missing config field ${field}`);

      if (Array.isArray(value)) {
        assert.ok(value.length > 0, `${providerId}.${field} must not be empty`);
      } else if (typeof value === "string") {
        assert.ok(value.length > 0, `${providerId}.${field} must not be empty`);
      } else if (typeof value === "object") {
        assert.ok(
          value && Object.keys(value).length > 0,
          `${providerId}.${field} must not be empty`
        );
      }
    }
  }
});

test("all provider endpoint URLs use HTTPS when a URL is configured", () => {
  for (const [providerId, provider] of Object.entries(PROVIDERS)) {
    const httpsUrls = collectHttpsUrls(provider.config);

    for (const entry of httpsUrls) {
      const parsed = new URL(entry.value);
      assert.equal(parsed.protocol, "https:", `${providerId} ${entry.path} must use HTTPS`);
    }
  }
});

test("browser-based providers expose buildAuthUrl and return provider-specific auth URLs", () => {
  const redirectUri = "http://localhost:43121/callback";
  const state = "state-123";
  const codeChallenge = "challenge-456";

  const claudeUrl = new URL(
    PROVIDERS.claude.buildAuthUrl(CLAUDE_CONFIG, redirectUri, state, codeChallenge)
  );
  const codexUrl = new URL(
    PROVIDERS.codex.buildAuthUrl(CODEX_CONFIG, redirectUri, state, codeChallenge)
  );
  const geminiUrl = new URL(
    PROVIDERS["gemini-cli"].buildAuthUrl(GEMINI_CONFIG, redirectUri, state)
  );
  const antigravityUrl = new URL(
    PROVIDERS.antigravity.buildAuthUrl(ANTIGRAVITY_CONFIG, redirectUri, state)
  );
  const clineUrl = new URL(PROVIDERS.cline.buildAuthUrl(CLINE_CONFIG, redirectUri));
  const gitlabUrl = new URL(
    PROVIDERS["gitlab-duo-oauth"].buildAuthUrl(GITLAB_DUO_CONFIG, redirectUri, state, codeChallenge)
  );

  assert.equal(claudeUrl.origin, "https://claude.ai");
  assert.equal(claudeUrl.searchParams.get("client_id"), CLAUDE_CONFIG.clientId);
  assert.equal(codexUrl.origin, "https://auth.openai.com");
  assert.equal(codexUrl.searchParams.get("code_challenge"), codeChallenge);
  assert.equal(geminiUrl.origin, "https://accounts.google.com");
  assert.equal(geminiUrl.searchParams.get("redirect_uri"), redirectUri);
  assert.equal(antigravityUrl.origin, "https://accounts.google.com");
  assert.equal(clineUrl.origin, "https://api.cline.bot");
  assert.equal(gitlabUrl.origin, "https://gitlab.com");
  assert.equal(gitlabUrl.searchParams.get("scope"), "api read_user");
  assert.equal(gitlabUrl.searchParams.get("code_challenge"), codeChallenge);
});

test("device and import-token providers expose the flow-specific fields expected by their configs", () => {
  const deviceProviders = ["qwen", "kimi-coding", "github", "kiro", "nous-research", "kilocode"];

  for (const providerId of deviceProviders) {
    const provider = PROVIDERS[providerId];
    assert.equal(provider.flowType, "device_code");
    assert.equal(typeof provider.requestDeviceCode, "function");
    assert.equal(typeof provider.pollToken, "function");
  }

  assert.equal(PROVIDERS.cursor.flowType, "import_token");
  assert.equal(CURSOR_CONFIG.dbKeys.accessToken, "cursorAuth/accessToken");
  assert.equal(CURSOR_CONFIG.dbKeys.machineId, "storage.serviceMachineId");
  assert.ok(Array.isArray(KIRO_CONFIG.authMethods));
  assert.ok(KIRO_CONFIG.authMethods.includes("builder-id"));
});

test("provider-specific config shapes remain valid for special cases", () => {
  assert.ok(Array.isArray(CLAUDE_CONFIG.scopes) && CLAUDE_CONFIG.scopes.length > 0);
  assert.ok(Array.isArray(GEMINI_CONFIG.scopes) && GEMINI_CONFIG.scopes.length > 0);
  assert.ok(Array.isArray(ANTIGRAVITY_CONFIG.scopes) && ANTIGRAVITY_CONFIG.scopes.length > 0);
  assert.equal(typeof CODEX_CONFIG.extraParams.originator, "string");
  assert.equal(typeof QODER_CONFIG.extraParams.loginMethod, "string");
  assert.ok(Array.isArray(KIRO_CONFIG.grantTypes) && KIRO_CONFIG.grantTypes.length > 0);
  assert.equal(typeof KILOCODE_CONFIG.pollUrlBase, "string");
});

test("Gemini OAuth defaults use common Gemini CLI client secret as fallback", () => {
  assert.equal(
    GEMINI_CONFIG.clientSecret,
    process.env.GEMINI_CLI_OAUTH_CLIENT_SECRET || process.env.GEMINI_OAUTH_CLIENT_SECRET || ""
  );
  assert.equal(REGISTRY.gemini.oauth.clientSecretDefault, "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");
  assert.equal(
    REGISTRY["gemini-cli"].oauth.clientSecretDefault,
    "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"
  );
});

test("Qoder remains a safe special case when browser OAuth is disabled", () => {
  if (!QODER_CONFIG.enabled) {
    assert.equal(
      PROVIDERS.qoder.buildAuthUrl(QODER_CONFIG, "http://localhost/callback", "state"),
      null
    );
    return;
  }

  const authUrl = PROVIDERS.qoder.buildAuthUrl(
    QODER_CONFIG,
    "http://localhost/callback",
    "state-123"
  );
  assert.equal(typeof authUrl, "string");
  assert.ok(authUrl.startsWith("https://"));
});

test("Codex parses id_token metadata and prefers a team workspace when the JWT only marks the personal plan", async () => {
  const idToken = createJwt({
    email: "dev@example.com",
    "https://api.openai.com/auth": {
      chatgpt_account_id: "personal-workspace",
      chatgpt_plan_type: "free",
      chatgpt_user_id: "user-123",
      organizations: [
        {
          id: "team-workspace",
          is_default: false,
          role: "member",
          title: "Platform Team",
        },
      ],
    },
  });

  const extra = await PROVIDERS.codex.postExchange({ id_token: idToken });
  const mapped = PROVIDERS.codex.mapTokens(
    {
      access_token: "access-token",
      refresh_token: "refresh-token",
      id_token: idToken,
      expires_in: 3600,
    },
    extra
  );

  assert.equal(extra.authInfo.chatgpt_account_id, "personal-workspace");
  assert.equal(mapped.email, "dev@example.com");
  assert.equal(mapped.providerSpecificData.workspaceId, "team-workspace");
  assert.equal(mapped.providerSpecificData.workspacePlanType, "team");
});

test("Cline decodes embedded callback payloads without using the network", async () => {
  const encodedCode = Buffer.from(
    JSON.stringify({
      accessToken: "cline-access",
      refreshToken: "cline-refresh",
      email: "cline@example.com",
      firstName: "Cline",
      lastName: "Bot",
      expiresAt: "2030-01-01T00:00:00.000Z",
    })
  ).toString("base64");

  const tokens = await PROVIDERS.cline.exchangeToken(CLINE_CONFIG, encodedCode, "http://localhost");
  const mapped = PROVIDERS.cline.mapTokens(tokens);

  assert.equal(tokens.access_token, "cline-access");
  assert.equal(mapped.accessToken, "cline-access");
  assert.equal(mapped.email, "cline@example.com");
  assert.equal(mapped.name, "Cline Bot");
});

test("Gemini and Antigravity run mocked browser OAuth exchanges and post-exchange enrichment", async () => {
  const geminiConfig = { ...GEMINI_CONFIG, clientSecret: "gemini-secret" };
  useFetchSequence([
    jsonResponse({
      access_token: "gemini-access",
      refresh_token: "gemini-refresh",
      expires_in: 3600,
    }),
    jsonResponse({ email: "gemini@example.com" }),
    jsonResponse({ cloudaicompanionProject: { id: "gemini-project" } }),
    jsonResponse({ access_token: "anti-access", refresh_token: "anti-refresh", expires_in: 7200 }),
    jsonResponse({ email: "anti@example.com" }),
    (_url, init = {}) => {
      assert.equal(init.method, "POST");
      assert.equal(init.headers.Authorization, "Bearer anti-access");
      assert.equal(init.headers["User-Agent"], "google-api-nodejs-client/9.15.1");
      assert.equal(
        init.headers["X-Goog-Api-Client"],
        "google-cloud-sdk vscode_cloudshelleditor/0.1"
      );
      assert.equal(
        init.headers["Client-Metadata"],
        JSON.stringify({
          ideType: "IDE_UNSPECIFIED",
          platform: "PLATFORM_UNSPECIFIED",
          pluginType: "GEMINI",
        })
      );
      return jsonResponse({
        cloudaicompanionProject: { id: "anti-project" },
        allowedTiers: [{ id: "tier-default", isDefault: true }],
      });
    },
    (_url, init = {}) => {
      assert.equal(init.method, "POST");
      assert.equal(init.headers.Authorization, "Bearer anti-access");
      assert.equal(init.headers["User-Agent"], "google-api-nodejs-client/9.15.1");
      assert.equal(
        init.headers["X-Goog-Api-Client"],
        "google-cloud-sdk vscode_cloudshelleditor/0.1"
      );
      return jsonResponse({
        done: true,
        response: { cloudaicompanionProject: { id: "anti-project-final" } },
      });
    },
  ]);

  const geminiTokens = await PROVIDERS["gemini-cli"].exchangeToken(
    geminiConfig,
    "code-1",
    "http://localhost/callback"
  );
  const geminiExtra = await PROVIDERS["gemini-cli"].postExchange(geminiTokens);
  const geminiMapped = PROVIDERS["gemini-cli"].mapTokens(geminiTokens, geminiExtra);

  const antigravityTokens = await PROVIDERS.antigravity.exchangeToken(
    ANTIGRAVITY_CONFIG,
    "code-2",
    "http://localhost/callback"
  );
  const antigravityExtra = await PROVIDERS.antigravity.postExchange(antigravityTokens);
  const antigravityMapped = PROVIDERS.antigravity.mapTokens(antigravityTokens, antigravityExtra);

  assert.equal(geminiMapped.email, "gemini@example.com");
  assert.equal(geminiMapped.projectId, "gemini-project");
  assert.equal(antigravityMapped.email, "anti@example.com");
  assert.equal(antigravityMapped.projectId, "anti-project-final");
});

test("GitLab Duo OAuth exchanges tokens and loads user metadata through mocked endpoints", async () => {
  useFetchSequence([
    jsonResponse({
      access_token: "gitlab-access",
      refresh_token: "gitlab-refresh",
      expires_in: 3600,
      scope: "api read_user",
    }),
    jsonResponse({
      id: 42,
      username: "gitlab-dev",
      name: "GitLab Dev",
      email: "gitlab@example.com",
    }),
  ]);

  const tokens = await PROVIDERS["gitlab-duo-oauth"].exchangeToken(
    GITLAB_DUO_CONFIG,
    "gitlab-code",
    "http://localhost/callback",
    "gitlab-verifier"
  );
  const extra = await PROVIDERS["gitlab-duo-oauth"].postExchange(tokens);
  const mapped = PROVIDERS["gitlab-duo-oauth"].mapTokens(tokens, extra);

  assert.equal(tokens.access_token, "gitlab-access");
  assert.equal(extra.user.username, "gitlab-dev");
  assert.equal(mapped.accessToken, "gitlab-access");
  assert.equal(mapped.refreshToken, "gitlab-refresh");
  assert.equal(mapped.email, "gitlab@example.com");
  assert.equal(mapped.displayName, "GitLab Dev");
  assert.equal(mapped.providerSpecificData.baseUrl, "https://gitlab.com");
  assert.equal(mapped.providerSpecificData.gitlabUsername, "gitlab-dev");
});

test("Qoder enabled mode exchanges tokens and loads profile metadata through mocked endpoints", async () => {
  const originalQoderConfig = structuredClone(QODER_CONFIG);
  const qoderConfig = Object.assign(QODER_CONFIG, {
    enabled: true,
    clientId: "qoder-client",
    clientSecret: "qoder-secret",
    authorizeUrl: "https://auth.qoder.dev/authorize",
    tokenUrl: "https://auth.qoder.dev/token",
    userInfoUrl: "https://auth.qoder.dev/user",
    extraParams: {
      loginMethod: "phone",
      type: "phone",
    },
  });

  try {
    useFetchSequence([
      jsonResponse({
        access_token: "qoder-access",
        refresh_token: "qoder-refresh",
        expires_in: 1800,
      }),
      jsonResponse({
        success: true,
        data: {
          apiKey: "qoder-api-key",
          email: "qoder@example.com",
          nickname: "Qoder User",
        },
      }),
    ]);

    const authUrl = PROVIDERS.qoder.buildAuthUrl(
      qoderConfig,
      "http://localhost/callback",
      "state-123"
    );
    const tokens = await PROVIDERS.qoder.exchangeToken(
      qoderConfig,
      "browser-code",
      "http://localhost/callback"
    );
    const extra = await PROVIDERS.qoder.postExchange(tokens);
    const mapped = PROVIDERS.qoder.mapTokens(tokens, extra);

    assert.ok(authUrl.startsWith("https://auth.qoder.dev/authorize?"));
    assert.equal(mapped.apiKey, "qoder-api-key");
    assert.equal(mapped.email, "qoder@example.com");
    assert.equal(mapped.displayName, "Qoder User");
  } finally {
    Object.assign(QODER_CONFIG, originalQoderConfig);
  }
});

test("Qwen and Kimi Coding execute mocked device-code flows and token mapping", async () => {
  const qwenIdToken = createJwt({
    email: "qwen@example.com",
    name: "Qwen User",
  });

  useFetchSequence([
    jsonResponse({
      device_code: "qwen-device",
      user_code: "QWEN123",
      verification_uri: "https://chat.qwen.ai/activate",
      expires_in: 300,
      interval: 5,
    }),
    jsonResponse({
      access_token: createJwt({ sub: "qwen-subject" }),
      refresh_token: "qwen-refresh",
      expires_in: 3600,
      id_token: qwenIdToken,
      resource_url: "https://chat.qwen.ai/resource",
    }),
    jsonResponse({
      device_code: "kimi-device",
      user_code: "KIMI123",
      verification_uri: "https://auth.kimi.com/activate",
      expires_in: 600,
      interval: 4,
    }),
    jsonResponse({
      access_token: "kimi-access",
      refresh_token: "kimi-refresh",
      expires_in: 7200,
      token_type: "Bearer",
      scope: "profile",
    }),
  ]);

  const qwenDevice = await PROVIDERS.qwen.requestDeviceCode(QWEN_CONFIG, "challenge-123");
  const qwenPoll = await PROVIDERS.qwen.pollToken(QWEN_CONFIG, qwenDevice.device_code, "verifier");
  const qwenMapped = PROVIDERS.qwen.mapTokens(qwenPoll.data);

  const kimiDevice = await PROVIDERS["kimi-coding"].requestDeviceCode(KIMI_CODING_CONFIG);
  const kimiPoll = await PROVIDERS["kimi-coding"].pollToken(
    KIMI_CODING_CONFIG,
    kimiDevice.device_code
  );
  const kimiMapped = PROVIDERS["kimi-coding"].mapTokens(kimiPoll.data);

  assert.equal(qwenMapped.email, "qwen@example.com");
  assert.equal(qwenMapped.displayName, "Qwen User");
  assert.equal(qwenMapped.providerSpecificData.resourceUrl, "https://chat.qwen.ai/resource");
  assert.equal(kimiMapped.accessToken, "kimi-access");
  assert.equal(kimiMapped.tokenType, "Bearer");
});

test("GitHub executes mocked device-code and profile enrichment flows", async () => {
  useFetchSequence([
    jsonResponse({
      device_code: "github-device",
      user_code: "GH123",
      verification_uri: "https://github.com/login/device",
      expires_in: 900,
      interval: 5,
    }),
    jsonResponse({
      access_token: "github-access",
      refresh_token: "github-refresh",
      expires_in: 3600,
    }),
    jsonResponse({ token: "copilot-token", expires_at: "2030-01-01T00:00:00.000Z" }),
    jsonResponse({
      id: 42,
      login: "octocat",
      name: "Octo Cat",
      email: "octo@example.com",
    }),
  ]);

  const device = await PROVIDERS.github.requestDeviceCode(GITHUB_CONFIG);
  const poll = await PROVIDERS.github.pollToken(GITHUB_CONFIG, device.device_code);
  const extra = await PROVIDERS.github.postExchange(poll.data);
  const mapped = PROVIDERS.github.mapTokens(poll.data, extra);

  assert.equal(poll.ok, true);
  assert.equal(mapped.providerSpecificData.copilotToken, "copilot-token");
  assert.equal(mapped.providerSpecificData.githubLogin, "octocat");
  assert.equal(mapped.providerSpecificData.githubEmail, "octo@example.com");
});

test("Nous Research executes the Hermes-style device flow and opportunistically mints an agent key", async () => {
  useFetchSequence([
    (_url, init = {}) => {
      const body = String(init.body || "");
      assert.match(body, /client_id=hermes-cli/);
      assert.match(body, /scope=inference%3Amint_agent_key/);
      return jsonResponse({
        device_code: "nous-device",
        user_code: "NOUS1234",
        verification_uri: "https://portal.nousresearch.com/manage-subscription",
        verification_uri_complete:
          "https://portal.nousresearch.com/manage-subscription?user_code=NOUS1234",
        expires_in: 600,
        interval: 1,
      });
    },
    (_url, init = {}) => {
      const body = String(init.body || "");
      assert.match(body, /grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code/);
      assert.match(body, /client_id=hermes-cli/);
      assert.match(body, /device_code=nous-device/);
      return jsonResponse({
        access_token: "nous-access-token",
        refresh_token: "nous-refresh-token",
        expires_in: 3600,
        token_type: "Bearer",
        scope: "inference:mint_agent_key",
      });
    },
    (_url, init = {}) => {
      assert.equal(init.method, "POST");
      assert.equal(init.headers.Authorization, "Bearer nous-access-token");
      assert.equal(init.headers["Content-Type"], "application/json");
      return jsonResponse({
        api_key: "nous-agent-key",
        key_id: "nous-key-1",
        expires_at: "2030-01-01T00:00:00.000Z",
        expires_in: 1800,
        reused: false,
      });
    },
  ]);

  const device = await PROVIDERS["nous-research"].requestDeviceCode(NOUS_RESEARCH_CONFIG);
  const poll = await PROVIDERS["nous-research"].pollToken(NOUS_RESEARCH_CONFIG, device.device_code);
  const extra = await PROVIDERS["nous-research"].postExchange(poll.data);
  const mapped = PROVIDERS["nous-research"].mapTokens(poll.data, extra);

  assert.equal(poll.ok, true);
  assert.equal(mapped.accessToken, "nous-access-token");
  assert.equal(mapped.refreshToken, "nous-refresh-token");
  assert.equal(mapped.apiKey, "nous-agent-key");
  assert.equal(mapped.providerSpecificData.agentKey, "nous-agent-key");
  assert.equal(mapped.providerSpecificData.portalBaseUrl, "https://portal.nousresearch.com");
  assert.equal(
    mapped.providerSpecificData.inferenceBaseUrl,
    "https://inference-api.nousresearch.com/v1"
  );
});

test("Kiro and KiloCode execute mocked device-code flows across their custom endpoints", async () => {
  useFetchSequence([
    jsonResponse({ clientId: "kiro-client", clientSecret: "kiro-secret" }),
    jsonResponse({
      deviceCode: "kiro-device",
      userCode: "KIRO123",
      verificationUri: "https://device.kiro.dev/verify",
      verificationUriComplete: "https://device.kiro.dev/verify?code=KIRO123",
      expiresIn: 600,
      interval: 5,
    }),
    jsonResponse({
      accessToken: "kiro-access",
      refreshToken: "kiro-refresh",
      expiresIn: 3600,
    }),
    jsonResponse({
      code: "kilo-code",
      verificationUrl: "https://api.kilo.ai/device-auth/kilo-code",
      expiresIn: 300,
    }),
    jsonResponse({ status: "approved", token: "kilo-access", userEmail: "kilo@example.com" }),
    textResponse("", 202),
    textResponse("", 403),
    textResponse("", 410),
  ]);

  const kiroDevice = await PROVIDERS.kiro.requestDeviceCode(KIRO_CONFIG);
  const kiroPoll = await PROVIDERS.kiro.pollToken(
    KIRO_CONFIG,
    kiroDevice.device_code,
    undefined,
    kiroDevice
  );
  const kiroMapped = PROVIDERS.kiro.mapTokens(kiroPoll.data);

  const kiloDevice = await PROVIDERS.kilocode.requestDeviceCode(KILOCODE_CONFIG);
  const kiloApproved = await PROVIDERS.kilocode.pollToken(KILOCODE_CONFIG, kiloDevice.device_code);
  const kiloPending = await PROVIDERS.kilocode.pollToken(KILOCODE_CONFIG, kiloDevice.device_code);
  const kiloDenied = await PROVIDERS.kilocode.pollToken(KILOCODE_CONFIG, kiloDevice.device_code);
  const kiloExpired = await PROVIDERS.kilocode.pollToken(KILOCODE_CONFIG, kiloDevice.device_code);
  const kiloMapped = PROVIDERS.kilocode.mapTokens(kiloApproved.data);

  assert.equal(kiroMapped.accessToken, "kiro-access");
  assert.equal(kiroMapped.providerSpecificData.clientId, "kiro-client");
  assert.equal(kiloApproved.ok, true);
  assert.equal(kiloPending.data.error, "authorization_pending");
  assert.equal(kiloDenied.data.error, "access_denied");
  assert.equal(kiloExpired.data.error, "expired_token");
  assert.equal(kiloMapped.email, "kilo@example.com");
});
