import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers/oauth.ts";

test("Devin CLI and Desktop share the same BYOK-free catalog", () => {
  const cli = REGISTRY["devin-cli"];
  const desktop = REGISTRY["devin-desktop"];

  assert.ok(cli, "devin-cli provider must exist");
  assert.ok(desktop, "devin-desktop provider must exist");
  assert.equal(desktop.models, cli.models);
  assert.ok(desktop.models.length > 0);
  assert.ok(desktop.models.every((model) => !model.id.toLowerCase().includes("byok")));
});

test("public registries do not expose windsurf or ws aliases", () => {
  assert.equal(REGISTRY.windsurf, undefined);
  assert.ok(Object.values(REGISTRY).every((entry) => entry.alias !== "ws"));
});

test("executor factory exposes only the dedicated Devin Desktop executor", () => {
  assert.equal(hasSpecializedExecutor("devin-desktop"), true);
  assert.equal(hasSpecializedExecutor("windsurf"), false);
  assert.equal(hasSpecializedExecutor("ws"), false);
  assert.equal(getExecutor("devin-desktop").constructor.name, "DevinDesktopExecutor");
});

test("Devin Desktop executor uses the live endpoint and verified default identity", () => {
  const executor = getExecutor("devin-desktop");
  delete process.env.DEVIN_DESKTOP_VERSION;

  assert.equal(
    executor.buildUrl(),
    "https://server.codeium.com/exa.language_server_pb.LanguageServerService/GetChatMessage"
  );
  assert.equal(executor.buildHeaders({ accessToken: "token" })["User-Agent"], "windsurf/3.4.27");
});

test("Devin Desktop executor applies only valid version overrides to its user agent", () => {
  const executor = getExecutor("devin-desktop");
  process.env.DEVIN_DESKTOP_VERSION = "3.5.1";
  try {
    assert.equal(executor.buildHeaders({ accessToken: "token" })["User-Agent"], "windsurf/3.5.1");
    process.env.DEVIN_DESKTOP_VERSION = "not-a-version";
    assert.equal(executor.buildHeaders({ accessToken: "token" })["User-Agent"], "windsurf/3.4.27");
  } finally {
    delete process.env.DEVIN_DESKTOP_VERSION;
  }
});

test("Devin Desktop executor returns 401 before the upstream call without a token", async () => {
  const executor = getExecutor("devin-desktop");
  const originalFetch = globalThis.fetch;
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    return new Response("unexpected upstream call", { status: 500 });
  };

  try {
    const result = await executor.execute({
      model: "swe-1-7",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {},
    });

    assert.equal(fetchCalled, false);
    assert.equal(result.response.status, 401);
    assert.match(await result.response.text(), /Devin Desktop API key is required/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Devin Desktop stream errors do not expose local paths or stack traces", async () => {
  const executor = getExecutor("devin-desktop");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      new ReadableStream({
        start(controller) {
          controller.error(new Error("stream failed\n    at /Users/example/private.ts:10:2"));
        },
      }),
      { status: 200 }
    );

  try {
    const result = await executor.execute({
      model: "swe-1-7",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "test-token" },
    });
    const text = await result.response.text();

    assert.match(text, /stream failed/);
    assert.doesNotMatch(text, /private\.ts|\/Users\/example|\bat\s+\//);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider card exposes the Devin Desktop name and real token copy command", () => {
  const desktop = OAUTH_PROVIDERS["devin-desktop"];
  const cli = OAUTH_PROVIDERS["devin-cli"];

  assert.ok(desktop);
  assert.equal(desktop.name, "Devin Desktop");
  assert.match(desktop.authHint, /Devin: Copy API Key to Clipboard/);
  assert.equal(cli.name, "Devin CLI");
  assert.equal(OAUTH_PROVIDERS.windsurf, undefined);
});

test("OAuth modal Desktop branch does not reference the public windsurf provider", async () => {
  const source = await readFile(
    new URL("../../src/shared/components/OAuthModal.tsx", import.meta.url),
    "utf8"
  );

  assert.match(source, /Devin: Copy API Key to Clipboard/);
  assert.doesNotMatch(source, /provider === ["']windsurf["']/);
});

test("Devin public errors and token refresh logs do not expose the retired provider", async () => {
  const [executorSource, tokenRefreshSource] = await Promise.all([
    readFile(new URL("../../open-sse/executors/devin-desktop.ts", import.meta.url), "utf8"),
    readFile(new URL("../../open-sse/services/tokenRefresh.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(
    executorSource,
    /windsurf_error|unknown windsurf error|Windsurf stream error/
  );
  assert.doesNotMatch(
    tokenRefreshSource,
    /No refresh token stored for Windsurf|refresh(?:ed|ing)? Windsurf Firebase token|Windsurf Firebase token is permanently invalid|refreshing Windsurf token/
  );
});
