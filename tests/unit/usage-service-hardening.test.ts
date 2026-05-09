import test from "node:test";
import assert from "node:assert/strict";

const usageService = await import("../../open-sse/services/usage.ts");
const { __testing } = usageService;

const originalFetch = globalThis.fetch;
const originalCreditsMode = process.env.ANTIGRAVITY_CREDITS;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalCreditsMode === undefined) {
    delete process.env.ANTIGRAVITY_CREDITS;
  } else {
    process.env.ANTIGRAVITY_CREDITS = originalCreditsMode;
  }
});

test("usage service covers GitHub free-plan parsing, auth denial and unsupported providers", async () => {
  const calls: any[] = [];
  globalThis.fetch = async (_url, init = {}) => {
    calls.push(init);
    return new Response(
      JSON.stringify({
        copilot_plan: "free",
        limited_user_reset_date: new Date(Date.now() + 60_000).toISOString(),
        monthly_quotas: {
          premium_interactions: 50,
          chat: 25,
          completions: 10,
        },
        limited_user_quotas: {
          premium_interactions: 70,
          chat: 5,
          completions: 2,
        },
      }),
      { status: 200 }
    );
  };

  const freeUsage: any = await usageService.getUsageForProvider({
    provider: "github",
    accessToken: "gho-free",
  });

  assert.equal(freeUsage.plan, "Copilot Free");
  assert.equal(freeUsage.quotas.premium_interactions.total, 50);
  assert.equal(freeUsage.quotas.premium_interactions.used, 50);
  assert.equal(freeUsage.quotas.chat.remaining, 20);
  assert.equal(freeUsage.quotas.completions.remainingPercentage, 80);
  assert.equal(calls[0].headers.Authorization, "token gho-free");
  assert.equal(calls[0].headers["User-Agent"], "GitHubCopilotChat/0.45.1");
  assert.equal(calls[0].headers["Editor-Version"], "vscode/1.117.0");
  assert.equal(calls[0].headers["Editor-Plugin-Version"], "copilot-chat/0.45.1");
  assert.equal(calls[0].headers["X-GitHub-Api-Version"], "2025-04-01");

  globalThis.fetch = async () => new Response("forbidden", { status: 403 });
  const forbidden: any = await usageService.getUsageForProvider({
    provider: "github",
    accessToken: "gho-expired",
  });
  assert.match(forbidden.message, /re-authenticate/i);

  const unsupported: any = await usageService.getUsageForProvider({
    provider: "unknown-provider",
    accessToken: "token",
  });
  assert.match(unsupported.message, /not implemented/i);
});

test("usage service covers GitHub paid snapshot edge cases, missing quota payloads and hard failures", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        copilot_plan: "student",
        quota_reset_date: new Date(Date.now() + 60_000).toISOString(),
        quota_snapshots: {
          premium_interactions: {
            percent_remaining: 30,
            total: 0,
          },
          chat: {
            used: 10,
            total: 40,
          },
          completions: {
            entitlement: 20,
            remaining: 5,
          },
        },
      }),
      { status: 200 }
    );

  const paidUsage: any = await usageService.getUsageForProvider({
    provider: "github",
    accessToken: "gho-paid",
  });
  assert.equal(paidUsage.plan, "Copilot Student");
  assert.equal(paidUsage.quotas.premium_interactions.total, 100);
  assert.equal(paidUsage.quotas.premium_interactions.used, 70);
  assert.equal(paidUsage.quotas.chat.remaining, 30);
  assert.equal(paidUsage.quotas.completions.used, 15);

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ access_type_sku: "odd_tier" }), { status: 200 });
  const missingQuotaPayload: any = await usageService.getUsageForProvider({
    provider: "github",
    accessToken: "gho-odd",
  });
  assert.match(missingQuotaPayload.message, /Unable to parse quota data/i);

  await assert.rejects(
    () =>
      usageService.getUsageForProvider({
        provider: "github",
        accessToken: "",
      }),
    /No GitHub access token available/i
  );

  globalThis.fetch = async () => new Response("server down", { status: 500 });
  await assert.rejects(
    () =>
      usageService.getUsageForProvider({
        provider: "github",
        accessToken: "gho-broken",
      }),
    /GitHub API error: server down/i
  );
});

test("usage service covers Gemini CLI access-token checks, cached subscription lookup and quota failures", async () => {
  const calls: any[] = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });

    if (String(url).includes("loadCodeAssist")) {
      return new Response(
        JSON.stringify({
          allowedTiers: [{ id: "tier_business", isDefault: true }],
          cloudaicompanionProject: "project-123",
        }),
        { status: 200 }
      );
    }

    if (String(url).includes("retrieveUserQuota")) {
      return new Response(
        JSON.stringify({
          buckets: [
            {
              modelId: "gemini-2.5-flash",
              remainingFraction: 0.25,
              resetTime: new Date(Date.now() + 60_000).toISOString(),
            },
            {
              modelId: "skip-no-fraction",
            },
          ],
        }),
        { status: 200 }
      );
    }

    throw new Error(`unexpected fetch: ${url}`);
  };

  const noToken: any = await usageService.getUsageForProvider({
    provider: "gemini-cli",
    accessToken: "",
  });
  assert.match(noToken.message, /not available/i);

  const first: any = await usageService.getUsageForProvider({
    provider: "gemini-cli",
    accessToken: "gem-token-cache",
  });
  const second: any = await usageService.getUsageForProvider({
    provider: "gemini-cli",
    accessToken: "gem-token-cache",
  });

  assert.equal(first.plan, "Business");
  assert.equal(first.quotas["gemini-2.5-flash"].used, 750);
  assert.equal(first.quotas["gemini-2.5-flash"].total, 1000);
  assert.equal(second.plan, "Business");
  assert.equal(calls.filter((call) => call.url.includes("loadCodeAssist")).length, 1);
  assert.equal(calls.filter((call) => call.url.includes("retrieveUserQuota")).length, 2);

  globalThis.fetch = async (url) => {
    if (String(url).includes("loadCodeAssist")) {
      return new Response(JSON.stringify({ currentTier: { upgradeSubscriptionType: "pro" } }), {
        status: 200,
      });
    }
    return new Response(JSON.stringify({ error: "down" }), { status: 503 });
  };

  const quotaFailure: any = await usageService.getUsageForProvider({
    provider: "gemini-cli",
    accessToken: "gem-token-failure",
    providerSpecificData: { projectId: "project-999" },
  });
  assert.equal(quotaFailure.plan, "Free");
  assert.match(quotaFailure.message, /quota error \(503\)/i);
});

test("usage service covers Gemini CLI tier-label fallbacks and fetch error handling", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        currentTier: { id: "tier_enterprise" },
      }),
      { status: 200 }
    );

  const enterprise: any = await usageService.getUsageForProvider({
    provider: "gemini-cli",
    accessToken: "gem-enterprise",
  });
  assert.equal(enterprise.plan, "Enterprise");
  assert.match(enterprise.message, /project ID not available/i);

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        subscriptionType: "ultra",
      }),
      { status: 200 }
    );
  const ultra: any = await usageService.getUsageForProvider({
    provider: "gemini-cli",
    accessToken: "gem-ultra",
  });
  assert.equal(ultra.plan, "Ultra");

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        currentTier: { name: "custom gold" },
      }),
      { status: 200 }
    );
  const customTier: any = await usageService.getUsageForProvider({
    provider: "gemini-cli",
    accessToken: "gem-custom-tier",
  });
  assert.equal(customTier.plan, "Custom gold");

  globalThis.fetch = async (_url, init = {}) => {
    if (String(_url).includes("loadCodeAssist")) {
      return new Response(JSON.stringify({ currentTier: { id: "tier_pro" } }), { status: 200 });
    }
    assert.ok(String((init as any).body).includes("project-throw"));
    throw new Error("quota endpoint offline");
  };
  const fetchError: any = await usageService.getUsageForProvider({
    provider: "gemini-cli",
    accessToken: "gem-throw",
    providerSpecificData: { projectId: "project-throw" },
  });
  assert.match(fetchError.message, /Gemini CLI error: quota endpoint offline/i);
});

test("usage service covers Antigravity quota parsing, exclusions and forbidden access", async () => {
  const calls: any[] = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });

    if (String(url).includes("loadCodeAssist")) {
      return new Response(
        JSON.stringify({
          allowedTiers: [{ id: "tier_ultra", isDefault: true }],
          cloudaicompanionProject: "ag-project",
        }),
        { status: 200 }
      );
    }

    if (String(url).includes("fetchAvailableModels")) {
      return new Response(
        JSON.stringify({
          models: {
            "claude-sonnet-4-6": {
              quotaInfo: {
                remainingFraction: 0.4,
                resetTime: new Date(Date.now() + 60_000).toISOString(),
              },
            },
            tab_flash_lite_preview: {
              quotaInfo: { remainingFraction: 0.1 },
            },
            "gemini-unlimited": {
              quotaInfo: {},
            },
            "gemini-3.1-pro-high": {
              quotaInfo: { remainingFraction: 1 },
            },
            "internal-model": {
              isInternal: true,
              quotaInfo: { remainingFraction: 0.1 },
            },
          },
        }),
        { status: 200 }
      );
    }

    throw new Error(`unexpected fetch: ${url}`);
  };

  const usage: any = await usageService.getUsageForProvider({
    provider: "antigravity",
    accessToken: "ag-token",
  });

  assert.equal(usage.plan, "Ultra");
  assert.deepEqual(Object.keys(usage.quotas).sort(), ["claude-sonnet-4-6", "gemini-3.1-pro-high"]);
  assert.equal(usage.quotas["claude-sonnet-4-6"].used, 600);
  assert.equal(usage.quotas["gemini-3.1-pro-high"].total, 0);
  assert.equal(usage.quotas["gemini-3.1-pro-high"].remainingPercentage, 100);
  const loadCodeAssistCall = calls.find((call) => call.url.includes("loadCodeAssist"));
  assert.match(loadCodeAssistCall?.url, /daily-cloudcode-pa\.sandbox\.googleapis\.com/);
  assert.match(loadCodeAssistCall?.init.headers["User-Agent"], /^vscode\/1\.X\.X \(Antigravity\//);
  assert.equal(loadCodeAssistCall?.init.headers["X-Goog-Api-Client"], undefined);
  assert.equal(loadCodeAssistCall?.init.headers["Client-Metadata"], undefined);
  assert.deepEqual(JSON.parse(loadCodeAssistCall?.init.body).metadata, {
    ideType: "ANTIGRAVITY",
  });

  globalThis.fetch = async (url) => {
    if (String(url).includes("loadCodeAssist")) {
      return new Response("{}", { status: 200 });
    }
    return new Response("forbidden", { status: 403 });
  };

  const forbidden: any = await usageService.getUsageForProvider({
    provider: "antigravity",
    accessToken: "ag-forbidden",
  });
  assert.match(forbidden.message, /forbidden/i);
});

test("usage service retries Antigravity fetchAvailableModels across the shared fallback order", async () => {
  const calls: any[] = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });

    if (String(url).includes("loadCodeAssist")) {
      return new Response(
        JSON.stringify({
          allowedTiers: [{ id: "tier_business", isDefault: true }],
          cloudaicompanionProject: "ag-project",
        }),
        { status: 200 }
      );
    }

    try {
      const parsedUrl = new URL(String(url));
      if (parsedUrl.hostname === "daily-cloudcode-pa.sandbox.googleapis.com") {
        return new Response("bad gateway", { status: 502 });
      }
      if (parsedUrl.hostname === "daily-cloudcode-pa.googleapis.com") {
        return new Response("bad gateway", { status: 502 });
      }
    } catch {
      // Ignore invalid URLs
    }

    return new Response(
      JSON.stringify({
        models: {
          "claude-sonnet-4-6": {
            quotaInfo: {
              remainingFraction: 0.5,
              resetTime: new Date(Date.now() + 60_000).toISOString(),
            },
          },
        },
      }),
      { status: 200 }
    );
  };

  const usage: any = await usageService.getUsageForProvider({
    provider: "antigravity",
    accessToken: "ag-fallback",
  });

  const quotaCalls = calls.filter((call) => call.url.includes("fetchAvailableModels"));
  assert.deepEqual(
    quotaCalls.map((call) => call.url),
    [
      "https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:fetchAvailableModels",
      "https://daily-cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels",
      "https://cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels",
    ]
  );
  assert.match(quotaCalls[2].init.headers["User-Agent"], /^Antigravity\//);
  assert.equal(usage.plan, "Business");
  assert.equal(usage.quotas["claude-sonnet-4-6"].used, 500);
});

test("usage service manual Antigravity refresh bypasses usage TTL caches", async () => {
  process.env.ANTIGRAVITY_CREDITS = "retry";
  let probeCalls = 0;
  let modelCalls = 0;

  globalThis.fetch = async (url) => {
    const urlStr = String(url);
    if (urlStr.includes("loadCodeAssist")) {
      return new Response(JSON.stringify({ cloudaicompanionProject: "ag-project" }), {
        status: 200,
      });
    }

    if (urlStr.includes("streamGenerateContent")) {
      probeCalls++;
      return new Response(
        `data: ${JSON.stringify({ remainingCredits: [{ creditType: "GOOGLE_ONE_AI", creditAmount: String(100 - probeCalls) }] })}\n\n`,
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      );
    }

    if (urlStr.includes("fetchAvailableModels")) {
      modelCalls++;
      return new Response(
        JSON.stringify({
          models: {
            "claude-sonnet-4-6": {
              quotaInfo: { remainingFraction: 1 },
            },
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    throw new Error(`unexpected fetch: ${url}`);
  };

  const connection = {
    id: "ag-manual-refresh-service-test",
    provider: "antigravity",
    accessToken: "ag-manual-service-token",
    projectId: "ag-project",
  };

  await usageService.getUsageForProvider(connection, { forceRefresh: true });
  await usageService.getUsageForProvider(connection, { forceRefresh: true });

  assert.equal(probeCalls, 2);
  assert.equal(modelCalls, 2);
});

test("usage service handles missing Antigravity access tokens without probing upstream", async () => {
  let fetchCalls = 0;

  globalThis.fetch = async () => {
    fetchCalls++;
    return new Response("unexpected", { status: 500 });
  };

  const usage: any = await usageService.getUsageForProvider({
    provider: "antigravity",
    accessToken: undefined,
  });

  assert.equal(fetchCalls, 0);
  assert.equal(usage.plan, "Free");
  assert.match(usage.message, /Antigravity access token not available/i);
});

test("usage service covers Antigravity tier fallbacks and non-403 upstream failures", async () => {
  globalThis.fetch = async (url) => {
    if (String(url).includes("loadCodeAssist")) {
      return new Response(
        JSON.stringify({
          currentTier: { displayName: "Standard" },
        }),
        { status: 200 }
      );
    }
    return new Response("upstream failed", { status: 500 });
  };

  const failedUsage: any = await usageService.getUsageForProvider({
    provider: "antigravity",
    accessToken: "ag-failed",
  });
  assert.match(failedUsage.message, /Antigravity error: Antigravity API error: 500/i);
});

test("usage service covers Claude OAuth success, legacy fallback and permissions message", async () => {
  globalThis.fetch = async (url) => {
    if (String(url).includes("/api/oauth/usage")) {
      return new Response(
        JSON.stringify({
          tier: "Claude Max",
          five_hour: { utilization: 90, resets_at: new Date(Date.now() + 60_000).toISOString() },
          seven_day: { utilization: 20, resets_at: new Date(Date.now() + 120_000).toISOString() },
          seven_day_sonnet: {
            utilization: 35,
            resets_at: new Date(Date.now() + 120_000).toISOString(),
          },
          extra_usage: { queued: true },
        }),
        { status: 200 }
      );
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  const oauthUsage: any = await usageService.getUsageForProvider({
    provider: "claude",
    accessToken: "claude-oauth",
  });
  assert.equal(oauthUsage.plan, "Claude Max");
  assert.equal(oauthUsage.quotas["session (5h)"].remaining, 10);
  assert.equal(oauthUsage.quotas["weekly (7d)"].remaining, 80);
  assert.equal(oauthUsage.quotas["weekly sonnet (7d)"].remaining, 65);
  assert.deepEqual(oauthUsage.extraUsage, { queued: true });

  globalThis.fetch = async (url) => {
    if (String(url).includes("/api/oauth/usage")) {
      return new Response("fallback", { status: 500 });
    }
    if (String(url).endsWith("/v1/settings")) {
      return new Response(
        JSON.stringify({
          organization_id: "org_123",
          organization_name: "Anthropic Org",
          plan: "team",
        }),
        { status: 200 }
      );
    }
    if (String(url).includes("/organizations/org_123/usage")) {
      return new Response(JSON.stringify({ weekly: { used: 10 } }), { status: 200 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  const legacyUsage: any = await usageService.getUsageForProvider({
    provider: "claude",
    accessToken: "claude-legacy",
  });
  assert.equal(legacyUsage.plan, "team");
  assert.equal(legacyUsage.organization, "Anthropic Org");
  assert.deepEqual(legacyUsage.quotas, { weekly: { used: 10 } });

  globalThis.fetch = async (url) => {
    if (String(url).includes("/api/oauth/usage")) {
      return new Response("fallback", { status: 500 });
    }
    return new Response("denied", { status: 403 });
  };

  const permissionsMessage: any = await usageService.getUsageForProvider({
    provider: "claude",
    accessToken: "claude-denied",
  });
  assert.match(permissionsMessage.message, /admin permissions/i);
});

test("usage service covers Claude default-plan fallback, legacy org denial and fetch failures", async () => {
  globalThis.fetch = async (url) => {
    if (String(url).includes("/api/oauth/usage")) {
      return new Response(
        JSON.stringify({
          five_hour: { utilization: 45, resets_at: new Date(Date.now() + 60_000).toISOString() },
        }),
        { status: 200 }
      );
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  const defaultPlan: any = await usageService.getUsageForProvider({
    provider: "claude",
    accessToken: "claude-default",
  });
  assert.equal(defaultPlan.plan, "Claude Code");
  assert.equal(defaultPlan.extraUsage, null);

  globalThis.fetch = async (url) => {
    if (String(url).includes("/api/oauth/usage")) {
      return new Response("fallback", { status: 500 });
    }
    if (String(url).endsWith("/v1/settings")) {
      return new Response(
        JSON.stringify({
          organization_id: "org_denied",
          organization_name: "Denied Org",
          plan: "enterprise",
        }),
        { status: 200 }
      );
    }
    return new Response("forbidden", { status: 403 });
  };

  const orgDenied: any = await usageService.getUsageForProvider({
    provider: "claude",
    accessToken: "claude-org-denied",
  });
  assert.equal(orgDenied.plan, "enterprise");
  assert.match(orgDenied.message, /admin access/i);

  globalThis.fetch = async () => {
    throw new Error("claude usage offline");
  };
  const fetchFailure: any = await usageService.getUsageForProvider({
    provider: "claude",
    accessToken: "claude-offline",
  });
  assert.match(fetchFailure.message, /Unable to fetch usage: claude usage offline/i);
});

test("usage service covers Codex, Kiro and Kimi usage parsing and error branches", async () => {
  globalThis.fetch = async (url, init = {}) => {
    if (String(url).includes("/backend-api/wham/usage")) {
      assert.equal((init as any).headers["chatgpt-account-id"], "workspace-123");
      return new Response(
        JSON.stringify({
          plan_type: "plus",
          rate_limit: {
            limit_reached: false,
            primary_window: {
              used_percent: 25,
              reset_after_seconds: 30,
            },
            secondary_window: {
              used_percent: 50,
              reset_at: Math.floor(Date.now() / 1000) + 120,
            },
          },
          code_review_rate_limit: {
            primary_window: {
              used_percent: 40,
              remaining_count: 6,
              reset_after_seconds: 45,
            },
          },
        }),
        { status: 200 }
      );
    }

    if (String(url) === "https://codewhisperer.us-east-1.amazonaws.com") {
      return new Response(
        JSON.stringify({
          subscriptionInfo: { subscriptionTitle: "Kiro Pro" },
          nextDateReset: new Date(Date.now() + 300_000).toISOString(),
          usageBreakdownList: [
            {
              resourceType: "AGENTIC_REQUEST",
              currentUsageWithPrecision: 12,
              usageLimitWithPrecision: 20,
              freeTrialInfo: {
                currentUsageWithPrecision: 2,
                usageLimitWithPrecision: 5,
              },
            },
          ],
        }),
        { status: 200 }
      );
    }

    if (String(url).includes("/coding/v1/usages")) {
      return new Response(
        JSON.stringify({
          user: { membership: { level: "LEVEL_ADVANCED" } },
          usage: {
            limit: "100",
            used: "92",
            remaining: "8",
            resetTime: new Date(Date.now() + 600_000).toISOString(),
          },
          limits: [
            {
              detail: {
                limit: "20",
                remaining: "3",
                reset_at: new Date(Date.now() + 30_000).toISOString(),
              },
            },
          ],
          five_hour: {
            utilization: 25,
            resets_at: new Date(Date.now() + 600_000).toISOString(),
          },
        }),
        { status: 200 }
      );
    }

    throw new Error(`unexpected fetch: ${url}`);
  };

  const codex: any = await usageService.getUsageForProvider({
    provider: "codex",
    accessToken: "codex-token",
    providerSpecificData: { workspaceId: "workspace-123" },
  });
  assert.equal(codex.plan, "plus");
  assert.equal(codex.quotas.session.remaining, 75);
  assert.equal(codex.quotas.weekly.remaining, 50);
  assert.equal(codex.quotas.code_review.remaining, 60);

  const kiroNoArn: any = await usageService.getUsageForProvider({
    provider: "kiro",
    accessToken: "kiro-token",
    providerSpecificData: {},
  });
  assert.match(kiroNoArn.message, /Profile ARN not available/i);

  const kiro: any = await usageService.getUsageForProvider({
    provider: "kiro",
    accessToken: "kiro-token",
    providerSpecificData: { profileArn: "arn:test:kiro" },
  });
  assert.equal(kiro.plan, "Kiro Pro");
  assert.equal(kiro.quotas.agentic_request.used, 12);
  assert.equal(kiro.quotas.agentic_request_freetrial.remaining, 3);

  const amazonQ: any = await usageService.getUsageForProvider({
    provider: "amazon-q",
    accessToken: "amazon-q-token",
    providerSpecificData: { profileArn: "arn:test:amazon-q" },
  });
  assert.equal(amazonQ.plan, "Kiro Pro");
  assert.equal(amazonQ.quotas.agentic_request.used, 12);
  assert.equal(amazonQ.quotas.agentic_request_freetrial.remaining, 3);

  const kimi: any = await usageService.getUsageForProvider({
    provider: "kimi-coding",
    accessToken: "kimi-token",
  });
  assert.equal(kimi.plan, "Allegro");
  assert.equal(kimi.quotas.Weekly.remaining, 8);
  assert.equal(kimi.quotas.Ratelimit.remaining, 3);
  assert.equal(kimi.quotas["session (5h)"].remaining, 25);

  globalThis.fetch = async (url) => {
    if (String(url).includes("/coding/v1/usages")) {
      return new Response("bad gateway", { status: 502 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  const kimiError: any = await usageService.getUsageForProvider({
    provider: "kimi-coding",
    accessToken: "kimi-error",
  });
  assert.match(kimiError.message, /API Error 502/i);

  globalThis.fetch = async (url) => {
    if (String(url).includes("/coding/v1/usages")) {
      return new Response("not-json", { status: 200 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  const kimiInvalidJson: any = await usageService.getUsageForProvider({
    provider: "kimi-coding",
    accessToken: "kimi-invalid-json",
  });
  assert.match(kimiInvalidJson.message, /Invalid JSON response/i);
});

test("usage service covers Codex auth failures, Kiro hard failures, Kimi no-quota fallbacks and Qwen catch branch", async () => {
  globalThis.fetch = async (url) => {
    if (String(url).includes("/backend-api/wham/usage")) {
      return new Response("nope", { status: 401 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };
  const codexDenied: any = await usageService.getUsageForProvider({
    provider: "codex",
    accessToken: "codex-denied",
  });
  assert.match(codexDenied.message, /re-authenticate/i);

  globalThis.fetch = async (url) => {
    if (String(url).includes("/backend-api/wham/usage")) {
      return new Response("boom", { status: 500 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };
  const codexBroken: any = await usageService.getUsageForProvider({
    provider: "codex",
    accessToken: "codex-broken",
  });
  assert.match(codexBroken.message, /Codex API error: 500/i);

  globalThis.fetch = async (url) => {
    if (String(url) === "https://codewhisperer.us-east-1.amazonaws.com") {
      return new Response("bad request", { status: 400 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };
  await assert.rejects(
    () =>
      usageService.getUsageForProvider({
        provider: "kiro",
        accessToken: "kiro-broken",
        providerSpecificData: { profileArn: "arn:test:broken" },
      }),
    /Failed to fetch Kiro usage: Kiro API error \(400\): bad request/
  );

  globalThis.fetch = async (url) => {
    if (String(url).includes("/coding/v1/usages")) {
      return new Response(
        JSON.stringify({
          user: { membership: { level: "LEVEL_EXPERIMENTAL" } },
        }),
        { status: 200 }
      );
    }
    throw new Error(`unexpected fetch: ${url}`);
  };
  const kimiNoQuota: any = await usageService.getUsageForProvider({
    provider: "kimi-coding",
    accessToken: "kimi-no-quota",
  });
  assert.equal(kimiNoQuota.plan, "experimental");
  assert.match(kimiNoQuota.message, /Usage tracked per request/i);

  globalThis.fetch = async () => {
    throw new Error("kimi offline");
  };
  const kimiOffline: any = await usageService.getUsageForProvider({
    provider: "kimi-coding",
    accessToken: "kimi-offline",
  });
  assert.match(kimiOffline.message, /Unable to fetch usage: kimi offline/i);

  const qwenCatch: any = await usageService.getUsageForProvider({
    provider: "qwen",
    accessToken: "qwen-catch",
    providerSpecificData: {
      get resourceUrl() {
        throw new Error("resource lookup failed");
      },
    },
  });
  assert.equal(qwenCatch.message, "Unable to fetch Qwen usage.");
});

test("usage service covers Qwen, Qoder, GLM, Z.AI and GLMT branches", async () => {
  const qwenMissingUrl: any = await usageService.getUsageForProvider({
    provider: "qwen",
    accessToken: "qwen-token",
    providerSpecificData: {},
  });
  assert.match(qwenMissingUrl.message, /No resource URL/i);

  const qwen: any = await usageService.getUsageForProvider({
    provider: "qwen",
    accessToken: "qwen-token",
    providerSpecificData: { resourceUrl: "https://example.com/resource" },
  });
  assert.match(qwen.message, /Usage tracked per request/i);

  const qoder: any = await usageService.getUsageForProvider({
    provider: "qoder",
    accessToken: "qoder-token",
  });
  assert.match(qoder.message, /Usage tracked per request/i);

  const glmMissingKey: any = await usageService.getUsageForProvider({
    provider: "glm",
    apiKey: "",
  });
  assert.equal(
    glmMissingKey.message,
    "API key not available. Add a coding plan API key to view usage."
  );

  globalThis.fetch = async (url, init = {}) => {
    if (String(url).includes("/api/monitor/usage/quota/limit")) {
      assert.equal((init as any).headers.Authorization, "Bearer glm-key");
      return new Response(
        JSON.stringify({
          data: {
            level: "pro",
            limits: [
              {
                type: "TIME_LIMIT",
                usage: 1000,
                currentValue: 12,
                remaining: 988,
                percentage: "1.2",
                nextResetTime: Date.now() + 30 * 24 * 60 * 60 * 1000,
                usageDetails: [
                  { modelCode: "search-prime", usage: 5 },
                  { modelCode: "web-reader", usage: 7 },
                  { modelCode: "zread", usage: 0 },
                ],
              },
              {
                type: "TOKENS_LIMIT",
                unit: 3,
                number: 5,
                percentage: "64",
                nextResetTime: Date.now() + 120_000,
              },
              {
                type: "TOKENS_LIMIT",
                unit: 4,
                number: 7,
                percentage: "25",
                nextResetTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
              },
              {
                type: "OTHER_LIMIT",
                percentage: "10",
              },
            ],
          },
        }),
        { status: 200 }
      );
    }

    throw new Error(`unexpected fetch: ${url}`);
  };

  const glm: any = await usageService.getUsageForProvider({
    provider: "glm",
    apiKey: "glm-key",
    providerSpecificData: { apiRegion: "invalid-region" },
  });
  assert.equal(glm.plan, "Pro");
  assert.equal(glm.quotas.session.used, 64);
  assert.equal(glm.quotas.session.remaining, 36);
  assert.equal(glm.quotas.weekly.used, 25);
  assert.equal(glm.quotas.weekly.remaining, 75);
  assert.equal(glm.quotas.mcp_monthly.used, 12);
  assert.equal(glm.quotas.mcp_monthly.remaining, 988);
  assert.equal(glm.quotas.mcp_monthly.remainingPercentage, 99);
  assert.equal(glm.quotas.mcp_monthly.displayName, "Monthly");
  assert.deepEqual(glm.quotas.mcp_monthly.details, [
    { name: "search-prime", used: 5 },
    { name: "web-reader", used: 7 },
    { name: "zread", used: 0 },
  ]);

  const glmt: any = await usageService.getUsageForProvider({
    provider: "glmt",
    apiKey: "glm-key",
    providerSpecificData: { apiRegion: "international" },
  });
  assert.equal(glmt.plan, "Pro");
  assert.equal(glmt.quotas["5 Hours Quota"].used, 15);
  assert.equal(glmt.quotas["Weekly Quota"].remaining, 36);

  let glmCnUrl = "";
  globalThis.fetch = async (url) => {
    glmCnUrl = String(url);
    return new Response(
      JSON.stringify({
        data: {
          planName: "Lite Plan",
          limits: [{ type: "TOKENS_LIMIT", percentage: "64" }],
        },
      }),
      { status: 200 }
    );
  };
  const glmCn: any = await usageService.getUsageForProvider({
    provider: "glm-cn",
    apiKey: "glm-cn-key",
    providerSpecificData: { apiRegion: "international" },
  });
  assert.match(glmCnUrl, /open\.bigmodel\.cn/);
  assert.equal(glmCn.plan, "Lite");
  assert.equal(glmCn.quotas.session.remaining, 36);

  globalThis.fetch = async () => new Response("nope", { status: 401 });
  await assert.rejects(
    () =>
      usageService.getUsageForProvider({
        provider: "glm",
        apiKey: "glm-bad",
      }),
    /Invalid API key/
  );
});

test("usage service covers MiniMax usage parsing, documented endpoint fallback and auth errors", async () => {
  const calls: any[] = [];
  const beforeCall = Date.now();

  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });

    if (String(url) === "https://www.minimax.io/v1/token_plan/remains") {
      return new Response("missing", { status: 404 });
    }

    if (String(url) === "https://api.minimax.io/v1/api/openplatform/coding_plan/remains") {
      assert.equal((init as any).headers.Authorization, "Bearer minimax-key");
      assert.equal((init as any).headers.Accept, "application/json");

      return new Response(
        JSON.stringify({
          base_resp: { status_code: 0, status_msg: "ok" },
          model_remains: [
            {
              model_name: "MiniMax-M2.7",
              remains_time: 300_000,
              current_interval_total_count: 1500,
              current_interval_usage_count: 1100,
              current_weekly_total_count: 15000,
              current_weekly_usage_count: 13800,
              weekly_remains_time: 1_800_000,
            },
            {
              model_name: "image-01",
              remains_time: 86_400_000,
              current_interval_total_count: 50,
              current_interval_usage_count: 45,
            },
          ],
        }),
        { status: 200 }
      );
    }

    if (String(url) === "https://www.minimaxi.com/v1/api/openplatform/coding_plan/remains") {
      return new Response(
        JSON.stringify({
          base_resp: {
            status_code: 1004,
            status_msg: "token plan api key invalid",
          },
        }),
        { status: 403 }
      );
    }

    throw new Error(`unexpected fetch: ${url}`);
  };

  const usage: any = await usageService.getUsageForProvider({
    provider: "minimax",
    apiKey: "minimax-key",
  });

  assert.deepEqual(
    calls.map((call) => call.url),
    [
      "https://www.minimax.io/v1/token_plan/remains",
      "https://api.minimax.io/v1/api/openplatform/coding_plan/remains",
    ]
  );
  assert.equal(usage.quotas["session (5h)"].used, 400);
  assert.equal(usage.quotas["session (5h)"].total, 1500);
  assert.equal(usage.quotas["session (5h)"].remaining, 1100);
  assert.equal(usage.quotas["weekly (7d)"].used, 1200);
  assert.equal(usage.quotas["weekly (7d)"].total, 15000);
  assert.equal(usage.quotas["weekly (7d)"].remainingPercentage, 92);
  assert.ok(Date.parse(usage.quotas["session (5h)"].resetAt) >= beforeCall + 240_000);

  const invalid: any = await usageService.getUsageForProvider({
    provider: "minimax-cn",
    apiKey: "bad-minimax-key",
  });
  assert.match(invalid.message, /Token Plan API key/i);
});

test("usage service treats MiniMax token-plan counts as used usage", async () => {
  const beforeCall = Date.now();

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://www.minimax.io/v1/token_plan/remains");
    assert.equal((init as any).headers.Authorization, "Bearer minimax-key");

    return new Response(
      JSON.stringify({
        base_resp: { status_code: 0, status_msg: "ok" },
        model_remains: [
          {
            model_name: "MiniMax-M2.7",
            remains_time: 300_000,
            current_interval_total_count: 15000,
            current_interval_usage_count: 13,
            current_weekly_total_count: 150000,
            current_weekly_usage_count: 66,
            weekly_remains_time: 604_800_000,
          },
        ],
      }),
      { status: 200 }
    );
  };

  const usage: any = await usageService.getUsageForProvider({
    provider: "minimax",
    apiKey: "minimax-key",
  });

  assert.equal(usage.quotas["session (5h)"].used, 13);
  assert.equal(usage.quotas["session (5h)"].remaining, 14987);
  assert.equal(usage.quotas["session (5h)"].remainingPercentage, 99.91333333333333);
  assert.equal(usage.quotas["weekly (7d)"].used, 66);
  assert.equal(usage.quotas["weekly (7d)"].remaining, 149934);
  assert.equal(usage.quotas["weekly (7d)"].remainingPercentage, 99.956);
  assert.ok(Date.parse(usage.quotas["session (5h)"].resetAt) >= beforeCall + 240_000);
});

test("usage service parses Cursor team quotas and clamps on-demand ratio", async () => {
  const calls: any[] = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });

    if (String(url).endsWith("/api/usage")) {
      return new Response(
        JSON.stringify({
          numRequestsTotal: 450,
          hard_limit: 100,
          teamMaxRequestUsage: 500,
          onDemand: {
            numRequests: 600,
          },
        }),
        { status: 200 }
      );
    }

    if (String(url).endsWith("/api/auth/me")) {
      return new Response(
        JSON.stringify({
          plan: "team",
          teamInfo: { id: "team-1", name: "Core Team" },
        }),
        { status: 200 }
      );
    }

    if (String(url).endsWith("/api/subscription")) {
      return new Response(
        JSON.stringify({
          teamMaxMonthlyRequests: 500,
        }),
        { status: 200 }
      );
    }

    throw new Error(`unexpected fetch: ${url}`);
  };

  const usage: any = await usageService.getUsageForProvider({
    provider: "cursor",
    accessToken: "cursor-token",
  });

  assert.equal(calls.length, 3);
  for (const call of calls) {
    assert.equal(call.init.headers.Authorization, "Bearer cursor-token");
    assert.equal(call.init.headers["User-Agent"], "Cursor/3.3");
    assert.equal(call.init.headers["x-cursor-client-version"], "3.3");
  }

  assert.equal(usage.plan, "Cursor Team");
  assert.equal(usage.quotas.requests.total, 500);
  assert.equal(usage.quotas.requests.used, 450);
  assert.equal(usage.quotas.requests.remainingPercentage, 10);
  assert.equal(usage.quotas.on_demand.total, 500);
  assert.equal(usage.quotas.on_demand.used, 500);
  assert.equal(usage.quotas.on_demand.remainingPercentage, 0);
});

test("usage helper branches cover reset parsing, GitHub quota math, and plan inference fallbacks", () => {
  const fixedDate = new Date("2026-01-02T03:04:05.000Z");

  assert.equal(__testing.parseResetTime(null), null);
  assert.equal(__testing.parseResetTime(0), null);
  assert.equal(__testing.parseResetTime(fixedDate), fixedDate.toISOString());
  assert.equal(__testing.parseResetTime(fixedDate.getTime()), fixedDate.toISOString());
  assert.equal(__testing.parseResetTime("not-a-date"), null);

  assert.equal(__testing.formatGitHubQuotaSnapshot({}), null);
  assert.deepEqual(
    __testing.formatGitHubQuotaSnapshot({ entitlement: 20, remaining: 5 }, fixedDate.toISOString()),
    {
      used: 15,
      total: 20,
      remaining: 5,
      remainingPercentage: 25,
      resetAt: fixedDate.toISOString(),
      unlimited: false,
    }
  );
  assert.deepEqual(__testing.formatGitHubQuotaSnapshot({ total: 10, used: 4 }), {
    used: 4,
    total: 10,
    remaining: 6,
    remainingPercentage: 60,
    resetAt: null,
    unlimited: false,
  });
  assert.deepEqual(__testing.formatGitHubQuotaSnapshot({ percent_remaining: 30 }), {
    used: 70,
    total: 100,
    remaining: 30,
    remainingPercentage: 30,
    resetAt: null,
    unlimited: false,
  });
  assert.deepEqual(__testing.formatGitHubQuotaSnapshot({ unlimited: true }), {
    used: 0,
    total: 0,
    remaining: undefined,
    remainingPercentage: undefined,
    resetAt: null,
    unlimited: true,
  });

  assert.equal(
    __testing.inferGitHubPlanName(
      { access_type_sku: "copilot_pro_plus" },
      { used: 0, total: 0, resetAt: null, unlimited: false }
    ),
    "Copilot Pro+"
  );
  assert.equal(
    __testing.inferGitHubPlanName(
      { copilot_plan: "enterprise" },
      { used: 0, total: 0, resetAt: null, unlimited: false }
    ),
    "Copilot Enterprise"
  );
  assert.equal(
    __testing.inferGitHubPlanName(
      {
        copilot_plan: "individual",
        monthly_quotas: { premium_interactions: 300 },
      },
      { used: 10, total: 300, resetAt: null, unlimited: false }
    ),
    "Copilot Pro"
  );
  assert.equal(
    __testing.inferGitHubPlanName(
      {
        monthly_quotas: { premium_interactions: 300 },
      },
      { used: 10, total: 300, resetAt: null, unlimited: false }
    ),
    "Copilot Business"
  );
  assert.equal(
    __testing.inferGitHubPlanName(
      {
        monthly_quotas: { chat: 50 },
      },
      null
    ),
    "Copilot Free"
  );
  assert.equal(
    __testing.inferGitHubPlanName(
      {
        access_type_sku: "student_seat",
      },
      null
    ),
    "Copilot Student"
  );
  assert.equal(__testing.inferGitHubPlanName({}, null), "GitHub Copilot");

  assert.deepEqual(__testing.buildCursorUsageHeaders("cursor-token"), {
    Authorization: "Bearer cursor-token",
    Accept: "application/json",
    "User-Agent": "Cursor/3.3",
    "x-cursor-client-version": "3.3",
    "x-cursor-user-agent": "Cursor/3.3",
  });
  assert.equal(
    __testing.getCursorMonthlyRequestLimit(
      { hard_limit: 100, teamMaxRequestUsage: 400 },
      { teamMaxMonthlyRequests: 500 }
    ),
    500
  );
  assert.equal(__testing.getCursorOnDemandLimit({ onDemand: { maxRequests: 120 } }, {}), 120);
  assert.deepEqual(__testing.formatCursorQuota(150, 100, null), {
    used: 100,
    total: 100,
    remaining: 0,
    remainingPercentage: 0,
    resetAt: null,
    unlimited: false,
  });
  assert.equal(__testing.inferCursorPlanName({ teamInfo: { id: "team-1" } }, {}), "Cursor Team");
  assert.equal(__testing.inferCursorPlanName({ plan: "pro" }, {}), "Cursor Pro");
});

test("usage helper branches cover Gemini CLI and Antigravity plan label fallbacks", () => {
  assert.equal(__testing.getGeminiCliPlanLabel(null), "Free");
  assert.equal(
    __testing.getGeminiCliPlanLabel({
      allowedTiers: [{ id: "tier_ultra", isDefault: true }],
    }),
    "Ultra"
  );
  assert.equal(
    __testing.getGeminiCliPlanLabel({
      currentTier: { id: "tier_business" },
    }),
    "Business"
  );
  assert.equal(
    __testing.getGeminiCliPlanLabel({
      subscriptionType: "enterprise",
    }),
    "Enterprise"
  );
  assert.equal(
    __testing.getGeminiCliPlanLabel({
      currentTier: { upgradeSubscriptionType: "tier_pro" },
    }),
    "Free"
  );
  assert.equal(
    __testing.getGeminiCliPlanLabel({
      currentTier: { name: "custom neon" },
    }),
    "Custom neon"
  );

  assert.equal(__testing.getAntigravityPlanLabel(null), "Free");
  assert.equal(
    __testing.getAntigravityPlanLabel({
      allowedTiers: [{ id: "tier_pro", isDefault: true }],
    }),
    "Pro"
  );
  assert.equal(
    __testing.getAntigravityPlanLabel({
      currentTier: { displayName: "Standard" },
    }),
    "Business"
  );
  assert.equal(
    __testing.getAntigravityPlanLabel({
      currentTier: { id: "tier_legacy" },
    }),
    "Free"
  );
  assert.equal(
    __testing.getAntigravityPlanLabel({
      currentTier: { name: "custom sky" },
    }),
    "Custom sky"
  );
});

test("usage service covers NanoGPT PRO weekly token quota, FREE plan, auth denial and fetch failures", async () => {
  const resetAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://nano-gpt.com/api/subscription/v1/usage");
    assert.equal((init as any).headers.Authorization, "Bearer nanogpt-pro-key");
    return new Response(
      JSON.stringify({
        active: true,
        limits: {
          weeklyInputTokens: 60_000_000,
          dailyInputTokens: null,
          dailyImages: 100,
        },
        dailyInputTokens: null,
        weeklyInputTokens: {
          used: 31_157_321,
          remaining: 28_842_679,
          percentUsed: 0.5192886833333333,
          resetAt,
        },
        dailyImages: {
          used: 0,
          remaining: 100,
          percentUsed: 0,
          resetAt: Date.now() + 24 * 60 * 60 * 1000,
        },
        state: "active",
      }),
      { status: 200 }
    );
  };

  const proUsage: any = await usageService.getUsageForProvider({
    provider: "nanogpt",
    apiKey: "nanogpt-pro-key",
  });

  assert.equal(proUsage.plan, "PRO");
  assert.ok(proUsage.quotas["Weekly Tokens"]);
  assert.equal(proUsage.quotas["Weekly Tokens"].used, 31_157_321);
  assert.equal(proUsage.quotas["Weekly Tokens"].total, 60_000_000);
  assert.equal(proUsage.quotas["Weekly Tokens"].remaining, 28_842_679);
  assert.ok(proUsage.quotas["Weekly Tokens"].remainingPercentage < 100);
  assert.equal(proUsage.quotas["Weekly Tokens"].resetAt, new Date(resetAt).toISOString());
  assert.equal(proUsage.quotas["Daily Images"].used, 0);
  assert.equal(proUsage.quotas["Daily Images"].remaining, 100);
  assert.equal(proUsage.quotas["Daily Images"].remainingPercentage, 100);

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://nano-gpt.com/api/subscription/v1/usage");
    assert.equal((init as any).headers.Authorization, "Bearer nanogpt-free-key");
    return new Response(
      JSON.stringify({
        active: false,
        limits: {},
        state: "cancelled",
      }),
      { status: 200 }
    );
  };

  const freeUsage: any = await usageService.getUsageForProvider({
    provider: "nanogpt",
    apiKey: "nanogpt-free-key",
  });

  assert.equal(freeUsage.plan, "FREE");
  assert.deepEqual(freeUsage.quotas, {});

  const noKey: any = await usageService.getUsageForProvider({
    provider: "nanogpt",
    apiKey: "",
  });
  assert.match(noKey.message, /NanoGPT API key not available/i);

  globalThis.fetch = async () => new Response("unauthorized", { status: 401 });
  const invalidKey: any = await usageService.getUsageForProvider({
    provider: "nanogpt",
    apiKey: "nanogpt-bad-key",
  });
  assert.match(invalidKey.message, /Invalid NanoGPT API key/i);

  globalThis.fetch = async () => {
    throw new Error("nano-gpt.com unreachable");
  };
  const fetchError: any = await usageService.getUsageForProvider({
    provider: "nanogpt",
    apiKey: "nanogpt-fail-key",
  });
  assert.match(fetchError.message, /Unable to fetch usage: nano-gpt.com unreachable/i);
});
