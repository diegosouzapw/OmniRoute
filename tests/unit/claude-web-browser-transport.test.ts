import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import {
  __resetClaudeWebBrowserTemplatesForTesting,
  __setClaudeWebBrowserNowForTesting,
  applyClaudeWebBrowserTemplate,
  buildClaudeWebBrowserPoolKey,
  mergeClaudeWebBrowserPayload,
  sendClaudeWebBrowser,
  type ClaudeWebBrowserDeps,
  type ClaudeWebTransportRequest,
} from "../../open-sse/executors/claude-web/browserTransport.ts";
import {
  transformToClaude,
  type ClaudeWebRequestPayload,
} from "../../open-sse/executors/claude-web/payload.ts";

const ORGANIZATION_ID = "organization-secret-a";
const CONVERSATION_ID = "00000000-0000-4000-8000-000000000010";
const PARENT_UUID = "00000000-0000-4000-8000-000000000011";
const HUMAN_UUID = "00000000-0000-4000-8000-000000000012";
const ASSISTANT_UUID = "00000000-0000-4000-8000-000000000013";

function preparedPayload(
  operation: "completion" | "retry_completion" = "completion"
): ClaudeWebRequestPayload {
  return transformToClaude(
    {
      messages: [{ role: "user", content: "prepared prompt" }],
      reasoning_effort: "high",
    },
    "claude-opus-4-8",
    {
      operation,
      prompt: operation === "retry_completion" ? "" : "prepared prompt",
      timezone: "Asia/Seoul",
      locale: "ko-KR",
      parentMessageUuid: operation === "retry_completion" ? PARENT_UUID : undefined,
      humanMessageUuid: operation === "completion" ? HUMAN_UUID : undefined,
      assistantMessageUuid: ASSISTANT_UUID,
      isNewConversation: operation === "completion",
    }
  );
}

function uiPayload(): Record<string, unknown> {
  return {
    prompt: "ui prompt",
    model: "ui-model",
    timezone: "America/New_York",
    locale: "en-US",
    effort: "low",
    thinking_mode: "off",
    tools: [{ name: "account_tool", input_schema: { type: "object" } }],
    tool_states: [{ name: "account_tool", enabled: true }],
    personalized_styles: [{ type: "default", key: "AccountStyle" }],
    turn_message_uuids: {
      human_message_uuid: "ui-human",
      assistant_message_uuid: "ui-assistant",
    },
    parent_message_uuid: "ui-parent",
    create_conversation_params: { model: "ui-model" },
    attachments: [],
    files: [],
    sync_sources: [],
    rendering_mode: "messages",
  };
}

function request(
  endpointSuffix: "completion" | "retry_completion" = "completion",
  overrides: Partial<ClaudeWebTransportRequest> = {}
): ClaudeWebTransportRequest {
  const url = `https://claude.ai/api/organizations/${ORGANIZATION_ID}/chat_conversations/${CONVERSATION_ID}/${endpointSuffix}`;
  const payload = preparedPayload(endpointSuffix);
  return {
    scopeKey: "account-scope-digest-a",
    organizationId: ORGANIZATION_ID,
    conversationId: CONVERSATION_ID,
    endpointSuffix,
    pageUrl:
      endpointSuffix === "completion"
        ? "https://claude.ai/new"
        : `https://claude.ai/chat/${CONVERSATION_ID}`,
    url,
    cookieString: "sessionKey=secret-cookie; cf_clearance=browser-cookie",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
      Cookie: "must-not-be-forwarded-by-page-fetch",
    },
    payload,
    locale: payload.locale,
    timezone: payload.timezone,
    signal: null,
    ...overrides,
  };
}

type RouteMatcher = string | RegExp | ((url: URL) => boolean);

function matcherAccepts(matcher: RouteMatcher, url: string): boolean {
  if (typeof matcher === "string") return matcher === url;
  if (matcher instanceof RegExp) return matcher.test(url);
  return matcher(new URL(url));
}

function createBrowserHarness(
  initialUiPayload = uiPayload(),
  contextIdentity: object = {},
  responseBody = new TextEncoder().encode('data: {"type":"message_stop"}\n\n')
): {
  deps: ClaudeWebBrowserDeps;
  acquired: Array<{ key: string; options: Record<string, unknown> }>;
  continued: Array<{ url?: string; postData?: string }>;
  evaluated: Array<Record<string, unknown>>;
  navigated: string[];
  filled: string[];
  routeMatchers: RouteMatcher[];
  aborted: () => number;
  closed: () => number;
  responseWaits: () => number;
} {
  const acquired: Array<{ key: string; options: Record<string, unknown> }> = [];
  const continued: Array<{ url?: string; postData?: string }> = [];
  const evaluated: Array<Record<string, unknown>> = [];
  const navigated: string[] = [];
  const filled: string[] = [];
  const routeMatchers: RouteMatcher[] = [];
  let closeCount = 0;
  let abortCount = 0;
  let responseWaitCount = 0;
  let routeHandler:
    | ((route: {
        request(): {
          url(): string;
          method(): string;
          postData(): string;
          allHeaders(): Promise<Record<string, string>>;
        };
        continue(options: { url?: string; postData?: string }): Promise<void>;
        abort(): Promise<void>;
      }) => Promise<void>)
    | undefined;
  const page = {
    async goto(url: string): Promise<void> {
      navigated.push(url);
    },
    async route(matcher: RouteMatcher, handler: typeof routeHandler): Promise<void> {
      routeMatchers.push(matcher);
      routeHandler = handler;
    },
    async unroute(): Promise<void> {},
    waitForResponse(): Promise<unknown> {
      responseWaitCount += 1;
      return new Promise(() => {});
    },
    locator() {
      return {
        first() {
          return {
            async waitFor(): Promise<void> {},
            async fill(value: string): Promise<void> {
              filled.push(value);
            },
          };
        },
      };
    },
    keyboard: {
      async press(): Promise<void> {
        assert.ok(routeHandler, "completion must install an interception route");
        await routeHandler({
          request: () => ({
            url: () => request().url,
            method: () => "POST",
            postData: () => JSON.stringify(initialUiPayload),
            async allHeaders() {
              return { "x-ui-session": "scoped" };
            },
          }),
          async continue(options) {
            continued.push(options);
          },
          async abort() {
            abortCount += 1;
          },
        });
      },
    },
    async evaluate(_fn: unknown, argument: Record<string, unknown>): Promise<void> {
      evaluated.push(argument);
    },
    async close(): Promise<void> {
      closeCount += 1;
    },
  };

  const deps: ClaudeWebBrowserDeps = {
    async acquireContext(key, options) {
      acquired.push({ key, options: options as unknown as Record<string, unknown> });
      return {
        id: key,
        context: contextIdentity,
        warmupPage: null,
        lastUsed: 0,
        isStealth: false,
      } as never;
    },
    async openPage() {
      return page as never;
    },
    async fetchResponse(_page, input) {
      evaluated.push(input as unknown as Record<string, unknown>);
      return {
        status: 200,
        headers: { "content-type": "text/event-stream", "x-browser": "scoped" },
        body: responseBody,
      };
    },
  };

  return {
    deps,
    acquired,
    continued,
    evaluated,
    navigated,
    filled,
    routeMatchers,
    aborted: () => abortCount,
    closed: () => closeCount,
    responseWaits: () => responseWaitCount,
  };
}

beforeEach(() => {
  __resetClaudeWebBrowserTemplatesForTesting();
  __setClaudeWebBrowserNowForTesting(1_000_000);
});

describe("Claude Web account-scoped browser transport", () => {
  it("hashes account and organization scope without exposing either identifier", () => {
    const base = request();
    const first = buildClaudeWebBrowserPoolKey(base);
    const otherAccount = buildClaudeWebBrowserPoolKey({ ...base, scopeKey: "other-account" });
    const otherOrganization = buildClaudeWebBrowserPoolKey({
      ...base,
      organizationId: "organization-secret-b",
    });
    const otherCookie = buildClaudeWebBrowserPoolKey({
      ...base,
      cookieString: "sessionKey=rotated-cookie",
    });
    const otherProfile = buildClaudeWebBrowserPoolKey({
      ...base,
      locale: "en-US",
      timezone: "America/New_York",
    });

    assert.notEqual(first, otherAccount);
    assert.notEqual(first, otherOrganization);
    assert.notEqual(first, otherCookie);
    assert.notEqual(first, otherProfile);
    assert.match(first, /^claude-web:[a-f0-9]{64}$/);
    assert.doesNotMatch(first, /connection|cookie|organization|secret/);
  });

  it("preserves account tools, states, and styles while replacing prepared turn state", () => {
    const merged = mergeClaudeWebBrowserPayload(uiPayload(), preparedPayload("retry_completion"));

    assert.deepEqual(merged.tools, uiPayload().tools);
    assert.deepEqual(merged.tool_states, uiPayload().tool_states);
    assert.deepEqual(merged.personalized_styles, uiPayload().personalized_styles);
    assert.equal(merged.model, "claude-opus-4-8");
    assert.equal(merged.effort, "high");
    assert.equal(merged.thinking_mode, "extended");
    assert.equal(merged.prompt, "");
    assert.equal(merged.parent_message_uuid, PARENT_UUID);
    assert.deepEqual(merged.turn_message_uuids, { assistant_message_uuid: ASSISTANT_UUID });
    assert.equal("create_conversation_params" in merged, false);
  });

  it("intercepts only a verified-organization new completion and rewrites its endpoint", async () => {
    const harness = createBrowserHarness();
    const transportRequest = request();
    const result = await sendClaudeWebBrowser(transportRequest, harness.deps);

    const expectedPoolKey = buildClaudeWebBrowserPoolKey(transportRequest);
    assert.equal(harness.acquired[0].key, expectedPoolKey);
    assert.equal(harness.acquired[0].options.proxyProviderKey, "claude-web");
    assert.equal(harness.acquired[0].options.cookieString, transportRequest.cookieString);
    assert.equal(harness.acquired[0].options.locale, "ko-KR");
    assert.equal(harness.acquired[0].options.timezone, "Asia/Seoul");
    assert.equal(matcherAccepts(harness.routeMatchers[0], transportRequest.url), true);
    assert.equal(
      matcherAccepts(
        harness.routeMatchers[0],
        transportRequest.url.replace(ORGANIZATION_ID, "other-organization")
      ),
      false
    );
    assert.equal(
      matcherAccepts(
        harness.routeMatchers[0],
        transportRequest.url.replace(CONVERSATION_ID, "00000000-0000-4000-8000-000000000099")
      ),
      true
    );
    assert.equal(
      matcherAccepts(
        harness.routeMatchers[0],
        transportRequest.url.replace("/completion", "/retry_completion")
      ),
      false
    );
    assert.equal(harness.continued.length, 0);
    assert.equal(harness.aborted(), 1);
    const continuedPayload = JSON.parse(String(harness.evaluated[0].body ?? "{}")) as Record<
      string,
      unknown
    >;
    assert.deepEqual(continuedPayload.tools, uiPayload().tools);
    assert.equal(continuedPayload.prompt, "prepared prompt");
    assert.deepEqual(harness.navigated, [transportRequest.pageUrl]);
    assert.deepEqual(harness.filled, ["prepared prompt"]);
    assert.equal(harness.evaluated[0].url, transportRequest.url);
    assert.equal(harness.evaluated[0].maxBytes, 16 * 1024 * 1024);
    const fetchedHeaders = harness.evaluated[0].headers as Record<string, string>;
    assert.equal(fetchedHeaders["x-ui-session"], "scoped");
    assert.equal("Cookie" in fetchedHeaders, false);
    assert.equal(harness.closed(), 1);
    assert.equal(result.status, 200);
    assert.equal(result.headers.get("x-browser"), "scoped");
    assert.equal(await new Response(result.body).text(), 'data: {"type":"message_stop"}\n\n');
    assert.equal("cookieString" in result, false);
  });

  it("reuses only a non-expired same-scope UI template for retry", async () => {
    const sharedContext = {};
    const completionHarness = createBrowserHarness(uiPayload(), sharedContext);
    await sendClaudeWebBrowser(request(), completionHarness.deps);

    const retryHarness = createBrowserHarness(uiPayload(), sharedContext);
    const retryRequest = request("retry_completion");
    await sendClaudeWebBrowser(retryRequest, retryHarness.deps);

    assert.equal(retryHarness.acquired[0].key, completionHarness.acquired[0].key);
    assert.equal(retryHarness.continued.length, 0);
    assert.equal(retryHarness.evaluated.length, 1);
    const evaluatedPayload = JSON.parse(String(retryHarness.evaluated[0].body)) as Record<
      string,
      unknown
    >;
    assert.deepEqual(evaluatedPayload.tools, uiPayload().tools);
    assert.equal(evaluatedPayload.prompt, "");
    const evaluatedHeaders = retryHarness.evaluated[0].headers as Record<string, string>;
    assert.equal("Cookie" in evaluatedHeaders, false);

    await assert.rejects(
      () => sendClaudeWebBrowser(retryRequest, createBrowserHarness(uiPayload(), {}).deps),
      /browser context|scoped UI template/i
    );

    await assert.rejects(
      () =>
        sendClaudeWebBrowser(
          request("retry_completion", { scopeKey: "different-account-scope" }),
          createBrowserHarness().deps
        ),
      /scoped UI template/i
    );

    __setClaudeWebBrowserNowForTesting(1_000_000 + 30 * 60 * 1000 + 1);
    await assert.rejects(
      () => sendClaudeWebBrowser(retryRequest, createBrowserHarness().deps),
      /scoped UI template/i
    );
  });

  it("reuses a scoped browser template for direct requests only when caller tools are absent", async () => {
    const sharedContext = {};
    await sendClaudeWebBrowser(request(), createBrowserHarness(uiPayload(), sharedContext).deps);

    const withoutCallerTools = applyClaudeWebBrowserTemplate(request());
    assert.deepEqual(withoutCallerTools.payload.tools, uiPayload().tools);

    const callerTool = { name: "caller_tool", input_schema: { type: "object" } };
    const withCallerTools = request();
    withCallerTools.payload = { ...withCallerTools.payload, tools: [callerTool] };
    assert.strictEqual(applyClaudeWebBrowserTemplate(withCallerTools), withCallerTools);
  });

  it("fails closed when a buffered browser response exceeds the hard size limit", async () => {
    const oversized = new Uint8Array(16 * 1024 * 1024 + 1);
    await assert.rejects(
      () => sendClaudeWebBrowser(request(), createBrowserHarness(uiPayload(), {}, oversized).deps),
      /response.*large|size limit/i
    );
  });

  it("uses a bounded page fetch instead of attaching a Playwright response waiter", async () => {
    const harness = createBrowserHarness();
    let fetchInput: Record<string, unknown> | undefined;
    const deps = {
      ...harness.deps,
      async fetchResponse(_page: unknown, input: Record<string, unknown>) {
        fetchInput = input;
        return {
          status: 200,
          headers: { "content-type": "text/event-stream" },
          body: new TextEncoder().encode('data: {"type":"message_stop"}\n\n'),
        };
      },
    } as ClaudeWebBrowserDeps;

    await sendClaudeWebBrowser(request(), deps);

    assert.equal(harness.responseWaits(), 0);
    assert.equal(fetchInput?.maxBytes, 16 * 1024 * 1024);
  });

  it("cancels a page fetch as soon as the incremental byte limit is exceeded", async () => {
    const browserTransport =
      (await import("../../open-sse/executors/claude-web/browserTransport.ts")) as Record<
        string,
        unknown
      >;
    const boundedFetch = browserTransport.fetchClaudeWebPageResponse;
    assert.equal(typeof boundedFetch, "function");
    if (typeof boundedFetch !== "function") return;

    let reads = 0;
    let cancelled = false;
    const page = {
      async evaluate(
        callback: (input: Record<string, unknown>) => Promise<unknown>,
        input: Record<string, unknown>
      ) {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = async () =>
          new Response(
            new ReadableStream<Uint8Array>({
              pull(controller) {
                reads += 1;
                controller.enqueue(new Uint8Array(4));
              },
              cancel() {
                cancelled = true;
              },
            }),
            { status: 200 }
          );
        try {
          return await callback(input);
        } finally {
          globalThis.fetch = originalFetch;
        }
      },
    };

    await assert.rejects(
      () =>
        (boundedFetch as (page: unknown, input: Record<string, unknown>) => Promise<unknown>)(
          page,
          {
            url: request().url,
            headers: {},
            body: "{}",
            maxBytes: 8,
          }
        ),
      /size limit/i
    );
    assert.ok(reads >= 3 && reads <= 4, `unexpected prefetch count: ${reads}`);
    assert.equal(cancelled, true);
  });

  it("aborts a pending browser response read and closes the page", async () => {
    const harness = createBrowserHarness();
    let releaseRead:
      | ((value: { status: number; headers: Record<string, string>; body: Uint8Array }) => void)
      | undefined;
    harness.deps.fetchResponse = () =>
      new Promise((resolve) => {
        releaseRead = resolve;
      });
    const controller = new AbortController();
    const pending = sendClaudeWebBrowser(
      request("completion", { signal: controller.signal }),
      harness.deps
    );
    setTimeout(() => controller.abort(), 0);

    const outcome = await Promise.race([
      pending.then(
        () => "resolved",
        () => "rejected"
      ),
      new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 100)),
    ]);
    if (outcome === "timeout") {
      releaseRead?.({ status: 200, headers: {}, body: new Uint8Array() });
      await pending.catch(() => {});
    }
    assert.equal(outcome, "rejected");
    assert.equal(harness.closed(), 1);
  });
});
