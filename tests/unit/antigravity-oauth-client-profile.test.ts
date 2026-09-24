import assert from "node:assert/strict";
import test from "node:test";

import { ANTIGRAVITY_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import { antigravity } from "../../src/lib/oauth/providers/antigravity.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearAntigravityVersionCaches();
});

test("token exchange sends the CLI User-Agent", async () => {
  seedAntigravityCliVersionCache("1.2.0");
  const userAgents: string[] = [];

  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    userAgents.push(new Headers(init?.headers).get("User-Agent") ?? "");
    return Response.json({ access_token: "token", refresh_token: "refresh", expires_in: 3600 });
  }) as typeof fetch;

  await antigravity.exchangeToken(ANTIGRAVITY_CONFIG, "cli-code", "http://localhost/callback");

  assert.match(
    userAgents[0],
    /^antigravity\/cli\/1\.2\.0 \(aidev_client; os_type=.+; arch=.+; auth_method=consumer\)$/
  );
});

test("post-exchange and onboarding use the CLI identity", async () => {
  seedAntigravityCliVersionCache("1.2.0");
  const cloudCodeHeaders: Headers[] = [];

  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const urlString = String(url);
    if (urlString.includes("userinfo")) {
      return Response.json({ email: "antigravity@example.com" });
    }
    if (urlString.includes("loadCodeAssist")) {
      cloudCodeHeaders.push(new Headers(init?.headers));
      return Response.json({
        cloudaicompanionProject: "antigravity-project",
        allowedTiers: [{ id: "legacy-tier", isDefault: true }],
      });
    }
    if (urlString.includes("onboardUser")) {
      cloudCodeHeaders.push(new Headers(init?.headers));
      return Response.json({ done: true });
    }
    return Response.json({});
  }) as typeof fetch;

  const extra = await antigravity.postExchange({ access_token: "cli-token" } as never);
  const mapped = antigravity.mapTokens({ access_token: "cli-token" } as never, extra);
  await new Promise((resolve) => setTimeout(resolve, 25));

  assert.ok(cloudCodeHeaders.length >= 2);
  for (const headers of cloudCodeHeaders) {
    assert.match(headers.get("User-Agent") ?? "", /^antigravity\/cli\/1\.2\.0 /);
    assert.equal(headers.get("X-Goog-Api-Client"), null);
    assert.equal(headers.get("Client-Metadata"), null);
  }
  assert.equal(mapped.providerSpecificData.projectId, "antigravity-project");
});
