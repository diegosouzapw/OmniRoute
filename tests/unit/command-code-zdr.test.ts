import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-command-code-zdr-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { CommandCodeExecutor } = await import("../../open-sse/executors/commandCode.ts");
const { applyCommandCodeZdrHeader, isCommandCodeZdrEnabled } =
  await import("../../open-sse/executors/commandCode/zdr.ts");
const { validateCommandCodeProvider } = await import("../../src/lib/providers/validation.ts");
const { validateProviderApiKeySchema } = await import("../../src/shared/validation/schemas.ts");
const { createProviderSchema } = await import("../../src/shared/validation/schemas.ts");
const { buildAddProviderSpecificData, assignEditApiKeyProviderSpecificData } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/connectionProviderSpecificData.ts");
const { buildProviderValidateRequestBody } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/providerValidateRequestBody.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;

type Captured = { url: string; headers: Record<string, string> };

function toPlainHeaders(headers: HeadersInit | undefined): Record<string, string> {
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers || {}).map(([key, value]) => [key, String(value)])
  );
}

function zdrValue(headers: Record<string, string>) {
  const key = Object.keys(headers).find((name) => name.toLowerCase() === "x-cmd-zdr");
  return key ? headers[key] : undefined;
}

/** Main path answers `status`; /alpha/generate answers a minimal CLI SSE stream. */
function captureFetch(mainStatus: number) {
  const calls: Captured[] = [];
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    calls.push({ url: target, headers: toPlainHeaders(init.headers) });
    if (target.includes("/alpha/generate")) {
      const sse =
        'data: {"type":"text-delta","text":"ok"}\n\n' +
        'data: {"type":"finish","finishReason":"stop","usage":{"inputTokens":1,"outputTokens":1,"totalTokens":2}}\n\n';
      return new Response(sse, { status: 200, headers: { "Content-Type": "text/event-stream" } });
    }
    if (mainStatus !== 200) {
      return new Response(JSON.stringify({ error: { message: "nope" } }), { status: mainStatus });
    }
    return new Response(
      JSON.stringify({
        id: "x",
        object: "chat.completion",
        choices: [{ index: 0, message: { role: "assistant", content: "ok" } }],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };
  return calls;
}

async function runExecutor(providerSpecificData: unknown, mainStatus = 200) {
  const calls = captureFetch(mainStatus);
  await new CommandCodeExecutor().execute({
    model: "deepseek/deepseek-v4-flash",
    stream: false,
    credentials: { apiKey: "cc-key", providerSpecificData } as never,
    body: { model: "deepseek/deepseek-v4-flash", messages: [{ role: "user", content: "hi" }] },
  } as never);
  return calls;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("isCommandCodeZdrEnabled only accepts a strict boolean true", () => {
  assert.equal(isCommandCodeZdrEnabled({ zdrEnabled: true }), true);
  assert.equal(isCommandCodeZdrEnabled({ zdrEnabled: false }), false);
  assert.equal(isCommandCodeZdrEnabled({ zdrEnabled: "true" }), false);
  assert.equal(isCommandCodeZdrEnabled({ zdrEnabled: 1 }), false);
  assert.equal(isCommandCodeZdrEnabled({}), false);
  assert.equal(isCommandCodeZdrEnabled(undefined), false);
  assert.equal(isCommandCodeZdrEnabled(null), false);
});

test("applyCommandCodeZdrHeader sets x-cmd-zdr only when enabled and reuses an existing casing", () => {
  const on: Record<string, string> = {};
  applyCommandCodeZdrHeader(on, { zdrEnabled: true });
  assert.equal(on["x-cmd-zdr"], "1");

  const off: Record<string, string> = { "X-Cmd-Zdr": "1" };
  applyCommandCodeZdrHeader(off, { zdrEnabled: false });
  assert.deepEqual(off, { "X-Cmd-Zdr": "1" }, "a model-level header is never removed");

  const mixed: Record<string, string> = { "X-Cmd-Zdr": "0" };
  applyCommandCodeZdrHeader(mixed, { zdrEnabled: true });
  assert.deepEqual(mixed, { "X-Cmd-Zdr": "1" }, "no duplicate header under another casing");
});

test("executor sends x-cmd-zdr: 1 on the main chat path when the connection enables ZDR", async () => {
  const calls = await runExecutor({ zdrEnabled: true });
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/provider\/v1\/chat\/completions$/);
  assert.equal(zdrValue(calls[0].headers), "1");
});

test("executor omits x-cmd-zdr when ZDR is off, missing, or a non-boolean string", async () => {
  for (const psd of [{ zdrEnabled: false }, {}, undefined, { zdrEnabled: "true" }]) {
    const calls = await runExecutor(psd);
    assert.equal(zdrValue(calls[0].headers), undefined, `psd=${JSON.stringify(psd)}`);
  }
});

test("executor keeps x-cmd-zdr on the /alpha/generate CLI fallback", async () => {
  const calls = await runExecutor({ zdrEnabled: true }, 403);
  const cli = calls.find((call) => call.url.includes("/alpha/generate"));
  assert.ok(cli, "expected the CLI fallback to fire");
  assert.equal(zdrValue(calls[0].headers), "1");
  assert.equal(zdrValue(cli.headers), "1");

  const offCalls = await runExecutor({ zdrEnabled: false }, 403);
  const offCli = offCalls.find((call) => call.url.includes("/alpha/generate"));
  assert.ok(offCli);
  assert.equal(zdrValue(offCli.headers), undefined);
});

test("validateCommandCodeProvider probes with x-cmd-zdr only when ZDR is enabled", async () => {
  const seen: Captured[] = [];
  globalThis.fetch = async (url, init = {}) => {
    seen.push({ url: String(url), headers: toPlainHeaders(init.headers) });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };

  await validateCommandCodeProvider({
    apiKey: "cc-key",
    providerSpecificData: { zdrEnabled: true },
  });
  assert.equal(zdrValue(seen[0].headers), "1");

  seen.length = 0;
  await validateCommandCodeProvider({ apiKey: "cc-key", providerSpecificData: {} });
  assert.equal(zdrValue(seen[0].headers), undefined);
});

test("validateCommandCodeProvider keeps x-cmd-zdr on the /alpha/generate probe fallback", async () => {
  const seen: Captured[] = [];
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    seen.push({ url: target, headers: toPlainHeaders(init.headers) });
    if (target.includes("/alpha/generate")) {
      return new Response("data: {}\n\n", { status: 200 });
    }
    return new Response(JSON.stringify({ error: "forbidden" }), { status: 401 });
  };

  await validateCommandCodeProvider({
    apiKey: "cc-key",
    providerSpecificData: { zdrEnabled: true },
  });
  const alpha = seen.find((call) => call.url.includes("/alpha/generate"));
  assert.ok(alpha, "expected the /alpha/generate probe");
  assert.equal(zdrValue(alpha.headers), "1");
});

test("validate request schema accepts a boolean zdrEnabled and rejects a string", () => {
  const ok = validateProviderApiKeySchema.safeParse({
    provider: "command-code",
    apiKey: "k",
    zdrEnabled: true,
  });
  assert.equal(ok.success, true);
  assert.equal(ok.success && ok.data.zdrEnabled, true);
  const bad = validateProviderApiKeySchema.safeParse({
    provider: "command-code",
    apiKey: "k",
    zdrEnabled: "true",
  });
  assert.equal(bad.success, false);
});

test("connection schema rejects a non-boolean providerSpecificData.zdrEnabled", () => {
  const base = { provider: "command-code", apiKey: "k", name: "cc" };
  assert.equal(
    createProviderSchema.safeParse({ ...base, providerSpecificData: { zdrEnabled: true } }).success,
    true
  );
  assert.equal(
    createProviderSchema.safeParse({ ...base, providerSpecificData: { zdrEnabled: "true" } })
      .success,
    false
  );
});

const BASE_FORM = {
  accountId: "",
  apiRegion: "international",
  awsAccessKeyId: "",
  awsSessionToken: "",
  ccCompatibleContext1m: false,
  ccCompatibleRedactThinking: false,
  ccCompatibleSummarizeThinking: false,
  consoleApiKey: "",
  customUserAgent: "",
  huggingfaceBillTo: "",
  cx: "",
  excludedModels: "",
  importFreeModelsOnly: false,
  newApiAggregatorBalance: false,
  newApiUserId: "",
  passthroughModels: false,
  quotaPerUnit: "",
  region: "",
  routingTags: "",
  tag: "",
  tunnelId: "",
  connectorName: "",
  glmOrganizationId: "",
  glmProjectId: "",
};

function addData(provider: string, commandCodeZdrEnabled: boolean) {
  return buildAddProviderSpecificData({
    provider,
    formData: { ...BASE_FORM, commandCodeZdrEnabled } as never,
    openRouterPreset: { applyTo: () => {} },
    showFreeModelsToggle: false,
    isGooglePse: false,
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: false,
    defaultRegion: "",
    isGlm: false,
    isCloudflare: false,
  });
}

test("add modal persists zdrEnabled only for Command Code and only when on", () => {
  assert.deepEqual(addData("command-code", true), { zdrEnabled: true });
  assert.equal(addData("command-code", false), undefined);
  assert.equal(addData("openai", true), undefined);
});

function editTarget(provider: string, commandCodeZdrEnabled: boolean) {
  const target: Record<string, unknown> = { customUserAgent: "keep-me", region: "us" };
  assignEditApiKeyProviderSpecificData({
    provider,
    formData: { ...BASE_FORM, customUserAgent: "keep-me", commandCodeZdrEnabled } as never,
    target,
    extraApiKeys: [],
    openRouterPreset: { getPatch: () => ({}) },
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: false,
    defaultRegion: "",
    isGlm: false,
    isCloudflare: false,
    isAntigravityFamily: false,
    trimmedCloudCodeProjectId: "",
    isGooglePse: false,
    isCcCompatible: false,
  });
  return target;
}

test("edit modal writes an explicit zdrEnabled boolean for Command Code without clobbering other keys", () => {
  const on = editTarget("command-code", true);
  assert.equal(on.zdrEnabled, true);
  assert.equal(on.customUserAgent, "keep-me");
  assert.equal(on.region, "us");
  // Explicit false (not undefined) so the PUT merge { ...existing, ...incoming } turns it off.
  assert.equal(editTarget("command-code", false).zdrEnabled, false);
  assert.equal("zdrEnabled" in editTarget("openai", true), false);
});

test("validate request body carries zdrEnabled only for Command Code with the toggle on", () => {
  const form = {
    validationModelId: "",
    customUserAgent: "",
    baseUrl: "",
    region: "",
    awsAccessKeyId: "",
    awsSessionToken: "",
    cx: "",
    runtimeKey: "",
    tunnelId: "",
    connectorName: "",
  };
  const common = { isAwsPolly: false, showsRegion: false, defaultRegion: "" };
  const on = buildProviderValidateRequestBody({
    ...common,
    provider: "command-code",
    apiKey: "k",
    isChatGptWebCodex: false,
    formData: { ...form, commandCodeZdrEnabled: true },
  });
  assert.equal(on.zdrEnabled, true);
  assert.equal(on.provider, "command-code");
  assert.equal(on.apiKey, "k");
  const off = buildProviderValidateRequestBody({
    ...common,
    provider: "command-code",
    apiKey: "k",
    isChatGptWebCodex: false,
    formData: { ...form, commandCodeZdrEnabled: false },
  });
  assert.equal(off.zdrEnabled, undefined);
  const other = buildProviderValidateRequestBody({
    ...common,
    provider: "openai",
    apiKey: "k",
    isChatGptWebCodex: false,
    formData: { ...form, commandCodeZdrEnabled: true },
  });
  assert.equal(other.zdrEnabled, undefined);
});
