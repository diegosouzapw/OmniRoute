import test from "node:test";
import assert from "node:assert/strict";

import {
  AI_PROVIDERS,
  USAGE_SUPPORTED_PROVIDERS,
  supportsDualAuthProvider,
} from "../../src/shared/constants/providers.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { CodeBuddyIntlExecutor } from "../../open-sse/executors/codebuddy-intl.ts";
import {
  PROVIDERS as OAUTH_PROVIDER_IDS,
  CODEBUDDY_INTL_CONFIG,
} from "../../src/lib/oauth/constants/oauth.ts";
import PROVIDERS_MAP from "../../src/lib/oauth/providers/index.ts";
import { supportsTokenRefresh } from "../../open-sse/services/tokenRefresh.ts";
import { getCodeBuddyIntlUsage } from "../../open-sse/services/usage/codebuddy-intl.ts";
import { CODEBUDDY_INTL_USER_AGENT } from "../../open-sse/config/providerHeaderProfiles.ts";

test("codebuddy-intl is registered as an OAuth provider in the UI catalog", () => {
  const p = AI_PROVIDERS["codebuddy-intl"];
  assert.ok(p, "codebuddy-intl missing from AI_PROVIDERS");
  assert.equal(p.id, "codebuddy-intl");
  assert.equal(p.alias, "cbai");
  assert.equal(p.name, "CodeBuddy Intl");
  assert.equal(p.website, "https://www.codebuddy.ai");
  assert.equal(p.subscriptionRisk, true);
  assert.equal(p.riskNoticeVariant, "oauth");
  assert.deepEqual(p.serviceKinds, ["llm"]);
});

test("codebuddy-intl registry entry has expected shape", () => {
  const r = REGISTRY["codebuddy-intl"];
  assert.ok(r, "codebuddy-intl missing from REGISTRY");
  assert.equal(r.id, "codebuddy-intl");
  assert.equal(r.alias, "cbai");
  assert.equal(r.format, "openai");
  assert.equal(r.baseUrl, "https://www.codebuddy.ai/v2/chat/completions");
  assert.equal(r.authType, "oauth");
  assert.equal(r.authHeader, "bearer");
  assert.equal(r.headers?.["User-Agent"], CODEBUDDY_INTL_USER_AGENT);
  assert.equal(r.headers?.["X-Product"], "SaaS");
  assert.equal(r.headers?.["X-IDE-Type"], "IDE");
  assert.equal(r.headers?.["X-IDE-Name"], "IDE");
  assert.equal(r.headers?.["x-codebuddy-request"], "1");
  assert.ok(Array.isArray(r.models), "models array expected");
  assert.equal(r.models.length, 22, "probed intl lineup: 22 models");
});

test("codebuddy-intl carries GLM, Kimi, MiniMax, Hy, GPT, Gemini and DeepSeek models", () => {
  const r = REGISTRY["codebuddy-intl"];
  const modelIds = (r.models || []).map((m) => m.id);
  assert.ok(modelIds.includes("glm-5.2"));
  assert.ok(modelIds.includes("glm-5.3"));
  assert.ok(modelIds.includes("glm-5.3-flash"));
  assert.ok(modelIds.includes("kimi-k3"));
  assert.ok(modelIds.includes("kimi-k2.7"));
  assert.ok(modelIds.includes("minimax-m3"));
  assert.ok(modelIds.includes("hy3"));
  assert.ok(modelIds.includes("hy4-preview"));
  assert.ok(modelIds.includes("gpt-6-astra"));
  assert.ok(modelIds.includes("gemini-3.5-flash"));
  assert.ok(modelIds.includes("deepseek-v4.1-flash"));
});

test("getExecutor returns the CodeBuddyIntlExecutor for 'codebuddy-intl' and the 'cbai' alias", async () => {
  const exec = await getExecutor("codebuddy-intl");
  assert.ok(
    exec instanceof CodeBuddyIntlExecutor,
    "codebuddy-intl must resolve to CodeBuddyIntlExecutor"
  );
  assert.equal(exec.provider, "codebuddy-intl");

  const aliasExec = await getExecutor("cbai");
  assert.ok(
    aliasExec instanceof CodeBuddyIntlExecutor,
    "alias 'cbai' must resolve to CodeBuddyIntlExecutor"
  );
  assert.equal(aliasExec.provider, "codebuddy-intl");
});

test("CodeBuddyIntlExecutor forces stream:true and handles reasoning", () => {
  const exec = new CodeBuddyIntlExecutor("codebuddy-intl");
  const transformed = exec.transformRequest(
    "glm-5.2",
    { messages: [{ role: "user", content: "hi" }] },
    false,
    { apiKey: "test" }
  ) as Record<string, unknown>;

  assert.equal(transformed.stream, true, "stream must be forced true");
  assert.equal(transformed.reasoning_summary, undefined);
  const msgs = transformed.messages as Array<Record<string, unknown>>;
  assert.equal(msgs[0]?.role, "system", "must prepend system message when first is user");
  assert.equal(msgs[1]?.role, "user");
});

test("CodeBuddyIntlExecutor preserves existing system message and does not duplicate it", () => {
  const exec = new CodeBuddyIntlExecutor("codebuddy-intl");
  const transformed = exec.transformRequest(
    "glm-5.2",
    {
      messages: [
        { role: "system", content: "You are an assistant." },
        { role: "user", content: "hi" },
      ],
    },
    false,
    { apiKey: "test" }
  ) as Record<string, unknown>;

  const msgs = transformed.messages as Array<Record<string, unknown>>;
  assert.equal(msgs.length, 2);
  assert.equal(msgs[0]?.role, "system");
  assert.equal(msgs[0]?.content, "You are an assistant.");
  assert.equal(msgs[1]?.role, "user");
});

test("getCodeBuddyIntlUsage returns credential not available when no token provided", async () => {
  const res = await getCodeBuddyIntlUsage();
  assert.ok(res.message?.includes("CodeBuddy Intl credential not available"));
});

test("codebuddy-intl OAuth config points to .ai endpoints", () => {
  assert.equal(CODEBUDDY_INTL_CONFIG.baseUrl, "https://www.codebuddy.ai");
  assert.equal(CODEBUDDY_INTL_CONFIG.stateUrl, "https://www.codebuddy.ai/v2/plugin/auth/state");
  assert.equal(CODEBUDDY_INTL_CONFIG.tokenUrl, "https://www.codebuddy.ai/v2/plugin/auth/token");
  assert.equal(
    CODEBUDDY_INTL_CONFIG.refreshUrl,
    "https://www.codebuddy.ai/v2/plugin/auth/token/refresh"
  );
  assert.equal(CODEBUDDY_INTL_CONFIG.domain, "www.codebuddy.ai");
  assert.equal(CODEBUDDY_INTL_CONFIG.platform, "ide");
  assert.equal(CODEBUDDY_INTL_CONFIG.userAgent, CODEBUDDY_INTL_USER_AGENT);
  assert.equal(OAUTH_PROVIDER_IDS.CODEBUDDY_INTL, "codebuddy-intl");
});

test("codebuddy-intl OAuth provider is wired in PROVIDERS_MAP", () => {
  const prov = PROVIDERS_MAP["codebuddy-intl"];
  assert.ok(prov, "codebuddy-intl missing from OAuth PROVIDERS_MAP");
  assert.equal(prov.flowType, "device_code");
  assert.equal(typeof prov.requestDeviceCode, "function");
  assert.equal(typeof prov.pollToken, "function");
  assert.equal(typeof prov.mapTokens, "function");
});

test("codebuddy-intl token refresh is supported", () => {
  assert.ok(
    supportsTokenRefresh("codebuddy-intl"),
    "codebuddy-intl must be supported in tokenRefresh"
  );
});

test("codebuddy-intl is in USAGE_SUPPORTED_PROVIDERS", () => {
  assert.ok(
    USAGE_SUPPORTED_PROVIDERS.includes("codebuddy-intl"),
    "codebuddy-intl missing from USAGE_SUPPORTED_PROVIDERS"
  );
});

test("codebuddy-intl is treated as a managed dual-auth provider", () => {
  assert.ok(
    supportsDualAuthProvider("codebuddy-intl"),
    "codebuddy-intl must be in DUAL_AUTH_PROVIDER_IDS"
  );
});

test("#12702: codebuddy-intl presents the same IDE/CodeBuddy version across OAuth and chat", () => {
  assert.equal(
    CODEBUDDY_INTL_CONFIG.userAgent,
    CODEBUDDY_INTL_USER_AGENT,
    "OAuth userAgent must match single source of truth"
  );
  assert.equal(
    REGISTRY["codebuddy-intl"].headers?.["User-Agent"],
    CODEBUDDY_INTL_USER_AGENT,
    "Chat completions User-Agent must match single source of truth"
  );
});
