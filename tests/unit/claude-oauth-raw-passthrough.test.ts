/**
 * Claude OAuth raw passthrough (#13893).
 *
 * Per-connection opt-in (`providerSpecificData.rawPassthrough`) that lets a
 * native Claude client request skip CLI emulation (billing sentinel, tool
 * cloak, fingerprint rewrite) and body re-signing, forwarding the payload
 * byte-faithfully. Default off; behavior is unchanged unless explicitly
 * enabled on a Claude OAuth connection.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  applyClaudeRawPassthroughSave,
  isConnectionRawPassthrough,
} from "../../open-sse/utils/cacheControlPolicy.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

describe("isConnectionRawPassthrough", () => {
  it("TC-07: returns false for non-object input", () => {
    assert.equal(isConnectionRawPassthrough(undefined), false);
    assert.equal(isConnectionRawPassthrough(null), false);
    assert.equal(isConnectionRawPassthrough("true"), false);
    assert.equal(isConnectionRawPassthrough(1), false);
    assert.equal(isConnectionRawPassthrough([true]), false);
    assert.equal(isConnectionRawPassthrough({}), false);
  });

  it("TC-04: nested passthrough aliases never arm the hatch", () => {
    assert.equal(isConnectionRawPassthrough({ passthrough: { raw: true } }), false);
    assert.equal(isConnectionRawPassthrough({ passthrough: { rawPassthrough: true } }), false);
    assert.equal(isConnectionRawPassthrough({ passthrough: { raw: false } }), false);
  });

  it("TC-04b: ignores malformed nested aliases", () => {
    assert.equal(isConnectionRawPassthrough({ passthrough: null }), false);
    assert.equal(isConnectionRawPassthrough({ passthrough: [true] }), false);
    assert.equal(isConnectionRawPassthrough({ passthrough: { raw: "yes" } }), false);
  });

  it("TC-04c: nested raw and nested rawPassthrough both stay off", () => {
    assert.equal(
      isConnectionRawPassthrough({ passthrough: { raw: true, rawPassthrough: false } }),
      false
    );
    assert.equal(
      isConnectionRawPassthrough({ passthrough: { raw: false, rawPassthrough: true } }),
      false
    );
  });

  it("TC-04d: non-boolean top-level value stays off", () => {
    assert.equal(
      isConnectionRawPassthrough({ rawPassthrough: "yes", passthrough: { raw: true } }),
      false
    );
    assert.equal(isConnectionRawPassthrough({ rawPassthrough: null }), false);
    assert.equal(isConnectionRawPassthrough({ rawPassthrough: 1 }), false);
  });

  it("TC-11b: prototype-inherited flags never arm the escape hatch", () => {
    const inherited = Object.create({ rawPassthrough: true }) as Record<string, unknown>;
    assert.equal(isConnectionRawPassthrough(inherited), false);
    const inheritedNested = Object.create({
      passthrough: { raw: true },
    }) as Record<string, unknown>;
    assert.equal(isConnectionRawPassthrough(inheritedNested), false);
    const ptInherited = Object.create({ raw: true }) as Record<string, unknown>;
    assert.equal(isConnectionRawPassthrough({ passthrough: ptInherited }), false);
  });

  it("TC-11: explicit top-level false overrides nested true", () => {
    assert.equal(
      isConnectionRawPassthrough({ rawPassthrough: false, passthrough: { raw: true } }),
      false
    );
    assert.equal(
      isConnectionRawPassthrough({
        rawPassthrough: false,
        passthrough: { rawPassthrough: true },
      }),
      false
    );
    assert.equal(isConnectionRawPassthrough({ rawPassthrough: true }), true);
  });
});

// ── 执行器级（Task 4）：base.ts 守卫接线 ─────────────────────────────────────
type CapturedCall = { url: string; headers: Record<string, string>; bodyText: string };

/** 驱动真实 execute()，stub 上游 fetch 捕获最终发包。 */
function claudeOkResponse(stream: boolean): Response {
  if (stream) {
    const sse =
      'event: message_start\ndata: {"type":"message_start","message":{"id":"msg_test","role":"assistant"}}\n\n' +
      'event: message_stop\ndata: {"type":"message_stop"}\n\n';
    return new Response(sse, { status: 200, headers: { "content-type": "text/event-stream" } });
  }
  return new Response(
    JSON.stringify({
      id: "msg_test",
      type: "message",
      role: "assistant",
      content: [{ type: "text", text: "ok" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 1, output_tokens: 1 },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

async function runClaudeOAuthExecute(input: {
  rawPassthrough?: boolean;
  isClaudePassthrough?: boolean;
  extraBodyText?: string;
  stream?: boolean;
  toolsMode?: "default" | "empty" | "absent";
}): Promise<CapturedCall> {
  const executor = new DefaultExecutor("claude");
  const calls: CapturedCall[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({
      url: String(url),
      headers: (init?.headers ?? {}) as Record<string, string>,
      bodyText: String(init?.body ?? ""),
    });
    return claudeOkResponse(Boolean(input.stream));
  }) as typeof fetch;
  try {
    const psd: Record<string, unknown> = {};
    if (input.rawPassthrough !== undefined) psd.rawPassthrough = input.rawPassthrough;
    const body: Record<string, unknown> = {
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 16,
      system: "client-orig-system",
    };
    if (input.toolsMode !== "absent") {
      body.tools =
        input.toolsMode === "empty"
          ? []
          : [
              {
                name: "read_file",
                input_schema: { type: "object" },
                cache_control: { type: "ephemeral" },
              },
            ];
    }
    if (input.extraBodyText) {
      (body.system as unknown) = [{ type: "text", text: input.extraBodyText }];
    }
    await executor.execute({
      model: "claude-sonnet-4-6",
      body,
      stream: input.stream === true,
      credentials: {
        // hasClaudeOAuthToken 门槛要求 sk-ant-oat 前缀（base.ts 执行器内联计算）；占位值仅保留前缀形状。
        accessToken: "sk-ant-oat-placeholder",
        providerSpecificData: psd,
      },
      isClaudePassthrough: input.isClaudePassthrough,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  // OAuth 路径会先打 /api/claude_cli/bootstrap 元数据请求，取真正的 messages 发包。
  const dispatch = calls.find((c) => c.url.includes("/v1/messages"));
  assert.ok(dispatch, "messages dispatch expected");
  return dispatch;
}

describe("executor wiring (Task 4)", () => {
  it("TC-01: flag off keeps the existing cloak byte behavior", async () => {
    const call = await runClaudeOAuthExecute({ rawPassthrough: false, isClaudePassthrough: true });
    const parsed = JSON.parse(call.bodyText) as Record<string, unknown>;
    const sys = parsed.system as Array<Record<string, unknown>>;
    assert.ok(
      sys.some((b) => String(b.text).startsWith("x-anthropic-billing-header:")),
      "billing line must be prepended when the flag is off"
    );
    assert.ok(
      sys.some((b) => String(b.text).startsWith("You are Claude Code")),
      "sentinel must be prepended when the flag is off"
    );
    assert.ok(!call.bodyText.includes("cch=00000;"), "cch placeholder must be signed");
    const tools = parsed.tools as Array<Record<string, unknown>>;
    assert.equal("cache_control" in tools[0], false, "cloak strips tool cache_control");
    assert.ok(
      Object.keys(call.headers).some((k) => k.toLowerCase().startsWith("x-stainless-")),
      "CLI fingerprint headers must be present when the flag is off"
    );
  });

  it("TC-02: flag on skips cloak, billing, sentinel, fingerprint and signing", async () => {
    const call = await runClaudeOAuthExecute({ rawPassthrough: true, isClaudePassthrough: true });
    const parsed = JSON.parse(call.bodyText) as Record<string, unknown>;
    assert.equal(parsed.system, "client-orig-system", "system blocks must stay untouched");
    const tools = parsed.tools as Array<Record<string, unknown>>;
    assert.deepEqual(tools[0].cache_control, { type: "ephemeral" });
    assert.equal(tools[0].name, "read_file", "tool name must not be cloaked");
    const lower = Object.keys(call.headers).map((k) => k.toLowerCase());
    assert.ok(!lower.some((k) => k.startsWith("x-stainless-")), "no x-stainless-* headers");
    assert.ok(!lower.includes("x-app"), "no x-app header");
  });

  it("TC-03: format mismatch silently falls back to the standard cloak", async () => {
    const call = await runClaudeOAuthExecute({ rawPassthrough: true, isClaudePassthrough: false });
    const parsed = JSON.parse(call.bodyText) as Record<string, unknown>;
    const sys = parsed.system as Array<Record<string, unknown>>;
    assert.ok(
      Array.isArray(sys) &&
        sys.some((b) => String(b.text).startsWith("x-anthropic-billing-header:")),
      "billing line must appear when isClaudePassthrough is false"
    );
  });

  it("TC-10: first dispatch leaves a literal cch=00000; pattern untouched", async () => {
    const call = await runClaudeOAuthExecute({
      rawPassthrough: true,
      isClaudePassthrough: true,
      extraBodyText: "client literal x-anthropic-billing-header: cch=00000;",
    });
    assert.ok(
      call.bodyText.includes("cch=00000;"),
      "signRequestBody must not recompute the client literal in raw passthrough mode"
    );
    // 计数钉：cloak 跳过时不存在计费行自带的第二个 cch=（CCH_PATTERN 无 /g，
    // 只签第一处——若伪装块仍运行，计费行被签名后此处会看到两个 cch=）。
    const cchCount = (call.bodyText.match(/cch=/g) ?? []).length;
    assert.equal(cchCount, 1, "only the client literal cch= may appear; no billing line");
  });
});

describe("retry signing guard, marker plumbing and proxy fallback (Task 5)", () => {
  it("TC-05: concurrent connections do not cross-contaminate", async () => {
    const calls: CapturedCall[] = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({
        url: String(url),
        headers: (init?.headers ?? {}) as Record<string, string>,
        bodyText: String(init?.body ?? ""),
      });
      return claudeOkResponse(false);
    }) as typeof fetch;
    const mk = (raw: boolean, marker: string) => ({
      model: "claude-sonnet-4-6",
      body: {
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 16,
        system: marker,
      },
      stream: false,
      credentials: {
        accessToken: "sk-ant-oat-placeholder",
        providerSpecificData: { rawPassthrough: raw },
      },
      isClaudePassthrough: true,
    });
    try {
      await Promise.all([
        new DefaultExecutor("claude").execute(mk(true, "conn-A-marker")),
        new DefaultExecutor("claude").execute(mk(false, "conn-B-marker")),
      ]);
    } finally {
      globalThis.fetch = originalFetch;
    }
    const dispatches = calls.filter((c) => c.url.includes("/v1/messages"));
    assert.equal(dispatches.length, 2, "both connections must dispatch");
    const callA = dispatches.find((c) => c.bodyText.includes("conn-A-marker"));
    const callB = dispatches.find((c) => c.bodyText.includes("conn-B-marker"));
    assert.ok(callA && callB, "per-connection dispatch capture failed");
    assert.ok(
      !callA.bodyText.includes("x-anthropic-billing-header"),
      "conn-A (raw) must stay uncloaked"
    );
    assert.ok(
      callB.bodyText.includes("x-anthropic-billing-header"),
      "conn-B (default) must keep the cloak"
    );
  });

  it("TC-08: empty or absent tools list passes through untouched in raw mode", async () => {
    const callEmpty = await runClaudeOAuthExecute({
      rawPassthrough: true,
      isClaudePassthrough: true,
      toolsMode: "empty",
    });
    const parsed = JSON.parse(callEmpty.bodyText);
    assert.deepEqual(parsed.tools, [], "empty tools array must survive byte-exact");

    const callAbsent = await runClaudeOAuthExecute({
      rawPassthrough: true,
      isClaudePassthrough: true,
      extraBodyText: "no-tools-marker",
      toolsMode: "absent",
    });
    const parsed2 = JSON.parse(callAbsent.bodyText);
    assert.equal("tools" in parsed2, false, "no tools key may be injected");
  });

  it("TC-09: streaming and non-streaming apply identical passthrough behavior", async () => {
    const nonStream = await runClaudeOAuthExecute({
      rawPassthrough: true,
      isClaudePassthrough: true,
    });
    const stream = await runClaudeOAuthExecute({
      rawPassthrough: true,
      isClaudePassthrough: true,
      stream: true,
    });
    for (const call of [nonStream, stream]) {
      assert.equal(
        Object.keys(call.headers).some((k) => k.toLowerCase().startsWith("x-stainless-")),
        false
      );
      const body = JSON.parse(call.bodyText);
      const sys = Array.isArray(body.system)
        ? (body.system as Array<{ text: string }>).map((b) => b.text).join("\n")
        : String(body.system ?? "");
      assert.ok(!sys.includes("x-anthropic-billing-header"));
    }
  });

  it("TC-13: 400-degrade retry does not re-sign the client cch literal", async () => {
    const executor = new DefaultExecutor("claude");
    const calls: CapturedCall[] = [];
    const originalFetch = globalThis.fetch;
    let messagesAttempts = 0;
    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      const u = String(url);
      if (u.includes("/v1/messages")) {
        messagesAttempts += 1;
        calls.push({
          url: u,
          headers: (init?.headers ?? {}) as Record<string, string>,
          bodyText: String(init?.body ?? ""),
        });
        if (messagesAttempts === 1) {
          return new Response(
            JSON.stringify({ error: { message: "context_management rejected" } }),
            {
              status: 400,
              headers: { "content-type": "application/json" },
            }
          );
        }
      }
      return claudeOkResponse(false);
    }) as typeof fetch;
    try {
      await executor.execute({
        model: "claude-sonnet-4-6",
        body: {
          messages: [{ role: "user", content: "hi" }],
          max_tokens: 16,
          system: "client literal x-anthropic-billing-header: cch=00000;",
          context_management: { edits: [{ type: "clear_tool_uses_20250919" }] },
        },
        stream: false,
        credentials: {
          accessToken: "sk-ant-oat-placeholder",
          providerSpecificData: { rawPassthrough: true },
        },
        isClaudePassthrough: true,
        contextEditing: { enabled: true },
      });
    } finally {
      globalThis.fetch = originalFetch;
    }
    assert.equal(calls.length, 2, "degrade retry must re-dispatch exactly once");
    assert.equal("context_management" in JSON.parse(calls[1].bodyText), false);
    assert.ok(
      calls[1].bodyText.includes("cch=00000;"),
      "retry branch must not re-sign the client literal (shouldSignBody guard)"
    );
  });

  it("TC-15a: API-key connection with flag on still cloaks (gate bound to OAuth)", async () => {
    const executor = new DefaultExecutor("claude");
    const calls: CapturedCall[] = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({
        url: String(url),
        headers: (init?.headers ?? {}) as Record<string, string>,
        bodyText: String(init?.body ?? ""),
      });
      return claudeOkResponse(false);
    }) as typeof fetch;
    try {
      await executor.execute({
        model: "claude-sonnet-4-6",
        body: { messages: [{ role: "user", content: "hi" }], max_tokens: 16, system: "orig" },
        stream: false,
        credentials: {
          apiKey: "api-key-placeholder",
          providerSpecificData: { rawPassthrough: true },
        },
        isClaudePassthrough: true,
        clientHeaders: { "x-app": "cli" },
      });
    } finally {
      globalThis.fetch = originalFetch;
    }
    const dispatch = calls.find((c) => c.url.includes("/v1/messages"));
    assert.ok(dispatch);
    const parsed = JSON.parse(dispatch.bodyText);
    const sys = Array.isArray(parsed.system)
      ? (parsed.system as Array<{ text: string }>).map((b) => b.text).join("\n")
      : String(parsed.system ?? "");
    assert.ok(
      sys.includes("x-anthropic-billing-header"),
      "API-key connection must keep the standard cloak even with the flag on"
    );
  });
});

describe("applyClaudeRawPassthroughSave (Task 6 / TC-11 save round-trip)", () => {
  it("TC-11 save: nested passthrough.raw is stripped and top-level false is written", () => {
    const psd: Record<string, unknown> = {
      passthrough: { raw: true, keepMe: "yes" },
      tag: "prod",
    };
    applyClaudeRawPassthroughSave(psd, false);
    assert.equal(psd.rawPassthrough, false);
    assert.deepEqual(psd.passthrough, { keepMe: "yes" });
    assert.equal(psd.tag, "prod");
    assert.equal(isConnectionRawPassthrough(psd), false);
  });

  it("TC-11 save: empty nested passthrough object is deleted wholesale", () => {
    const psd: Record<string, unknown> = {
      passthrough: { raw: true, rawPassthrough: true },
    };
    applyClaudeRawPassthroughSave(psd, false);
    assert.equal(psd.rawPassthrough, false);
    assert.equal(Object.hasOwn(psd, "passthrough"), false);
    assert.equal(isConnectionRawPassthrough(psd), false);
  });

  it("TC-11 save: enabling writes true and still strips nested aliases", () => {
    const psd: Record<string, unknown> = { passthrough: { raw: false } };
    applyClaudeRawPassthroughSave(psd, true);
    assert.equal(psd.rawPassthrough, true);
    assert.equal(Object.hasOwn(psd, "passthrough"), false);
    assert.equal(isConnectionRawPassthrough(psd), true);
  });

  it("TC-11 init: form flag reuses the same parser as the executor", () => {
    assert.equal(isConnectionRawPassthrough({ passthrough: { raw: true } }), false);
    assert.equal(
      isConnectionRawPassthrough({ rawPassthrough: false, passthrough: { raw: true } }),
      false
    );
    assert.equal(isConnectionRawPassthrough({ rawPassthrough: true }), true);
  });
});
