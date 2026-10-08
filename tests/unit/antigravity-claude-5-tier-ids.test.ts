// Antigravity serves Claude 5.x with one upstream model id PER TIER
// (`claude-opus-5-5-low|medium|high`, same for Sonnet 5.5) — there is no bare
// `claude-opus-5-5` on the Cloud Code backend. applyClaudeEffortVariant used to strip
// the tier (`claude-opus-5-5-high` → `claude-opus-5-5` + reasoning_effort=high) because
// the base prefix-matches the `claude-opus-5` spec, so every Claude 5.5 request reached
// Antigravity with a non-existent id and failed (429 "Resource has been exhausted" on
// every account). Locks:
//   1. isAntigravityLiteralTierModelId recognizes only Antigravity surfaces + tiered
//      Claude 5.x ids;
//   2. applyClaudeEffortVariant keeps those ids literal (no body mutation);
//   3. end-to-end through handleChatCore the upstream request carries the tiered id.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-claude5-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { isAntigravityLiteralTierModelId } =
  await import("../../open-sse/utils/antigravityLiteralModelIds.ts");
const { isAntigravityClaudeTierFamilyBase } =
  await import("../../open-sse/utils/antigravityLiteralModelIds.ts");
const { shouldExposeClaudeEffortVariants } =
  await import("../../open-sse/utils/claudeEffortVariants.ts");
const { applyClaudeEffortVariant } =
  await import("../../open-sse/handlers/chatCore/claudeEffortVariant.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const TIERED_IDS = [
  "claude-opus-5-5-low",
  "claude-opus-5-5-medium",
  "claude-opus-5-5-high",
  "claude-sonnet-5-5-low",
  "claude-sonnet-5-5-medium",
  "claude-sonnet-5-5-high",
];

test("isAntigravityLiteralTierModelId: Antigravity surfaces + tiered Claude 5.x only", () => {
  for (const provider of ["antigravity", "ag", "agy", "antigravity/claude-opus-5-5-high"]) {
    for (const model of TIERED_IDS) {
      assert.equal(isAntigravityLiteralTierModelId(provider, model), true, `${provider} ${model}`);
      assert.equal(
        isAntigravityLiteralTierModelId(provider, `antigravity/${model}`),
        true,
        `${provider} antigravity/${model}`
      );
    }
  }
  // Not tiered upstream, or not a tier suffix Antigravity serves.
  for (const model of [
    "claude-opus-5-5",
    "claude-opus-4-6-thinking",
    "claude-sonnet-4-6",
    "claude-sonnet-4-6-high",
    "claude-opus-5-5-xhigh",
    "gemini-3.8-flash-high",
    "",
  ]) {
    assert.equal(isAntigravityLiteralTierModelId("antigravity", model), false, model);
  }
  // Same ids on other providers are client-side effort variants.
  for (const provider of ["claude", "cc", "vertex", "cursor", "", null, undefined]) {
    assert.equal(
      isAntigravityLiteralTierModelId(
        provider as string | null | undefined,
        "claude-opus-5-5-high"
      ),
      false,
      String(provider)
    );
  }
});

for (const provider of ["antigravity", "agy"]) {
  for (const sourceFormat of [FORMATS.OPENAI, FORMATS.CLAUDE]) {
    test(`${provider}/${sourceFormat}: applyClaudeEffortVariant keeps tiered Claude 5.x ids literal`, () => {
      for (const model of TIERED_IDS) {
        const body = { model, messages: [] };
        const result = applyClaudeEffortVariant({
          provider,
          effectiveModel: model,
          body,
          sourceFormat,
        });
        assert.deepEqual(result, { effectiveModel: model, log: null });
        assert.deepEqual(body, { model, messages: [] }, "body must not gain reasoning_effort");
      }
    });
  }
}

test("other providers still strip the Claude 5.5 effort suffix", () => {
  const body: Record<string, unknown> = { model: "claude-opus-5-5-high", messages: [] };
  const result = applyClaudeEffortVariant({
    provider: "claude",
    effectiveModel: "claude-opus-5-5-high",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(result.effectiveModel, "claude-opus-5-5");
  assert.equal(body.model, "claude-opus-5-5");
  assert.equal(body.reasoning_effort, "high");
});

test("catalog never synthesizes effort variants on an Antigravity Claude 5.x base id", () => {
  for (const prefix of ["antigravity", "ag", "agy"]) {
    for (const base of ["claude-opus-5-5", "claude-sonnet-5-5"]) {
      const id = `${prefix}/${base}`;
      assert.equal(isAntigravityClaudeTierFamilyBase(id), true, id);
      assert.equal(shouldExposeClaudeEffortVariants({ id, owned_by: prefix }), false, id);
    }
  }
  // Tier ids, bare ids, older generations and other providers are not matched.
  for (const id of [
    "antigravity/claude-opus-5-5-high",
    "antigravity/claude-sonnet-4-6",
    "antigravity/gemini-3.8-flash",
    "claude-opus-5-5",
    "claude/claude-opus-5-5",
  ]) {
    assert.equal(isAntigravityClaudeTierFamilyBase(id), false, id);
  }
  // Direct Claude keeps its synthesized variants.
  assert.equal(
    shouldExposeClaudeEffortVariants({ id: "claude/claude-opus-5-5", owned_by: "claude" }),
    true
  );
});

// ── End to end: handleChatCore → antigravity executor → upstream fetch ──────────

const originalFetch = globalThis.fetch;
const upstreamModels: string[] = [];

function sseResponse(): Response {
  const chunk = {
    response: {
      candidates: [{ content: { role: "model", parts: [{ text: "pong" }] }, finishReason: "STOP" }],
      usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 1, totalTokenCount: 4 },
      modelVersion: "claude",
    },
  };
  return new Response(`data: ${JSON.stringify(chunk)}\n\n`, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

test.before(() => {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(typeof input === "object" && "url" in input ? input.url : input);
    if (url.includes(":streamGenerateContent") || url.includes(":generateContent")) {
      const raw = typeof init?.body === "string" ? init.body : "";
      try {
        upstreamModels.push(String(JSON.parse(raw).model));
      } catch {
        upstreamModels.push("<unparsed>");
      }
      return sseResponse();
    }
    // Version feeds, discovery, telemetry: answer harmlessly.
    return new Response("{}", { status: 404, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const model of ["claude-opus-5-5-high", "claude-sonnet-5-5-medium"]) {
  test(`handleChatCore dispatches antigravity/${model} upstream verbatim`, async () => {
    upstreamModels.length = 0;
    const body = {
      model: `antigravity/${model}`,
      messages: [{ role: "user", content: "Reply with exactly: pong" }],
      stream: false,
    };
    const result = await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider: "antigravity", model, extendedContext: false },
      credentials: {
        accessToken: "ya29.test-token",
        projectId: "test-project",
        providerSpecificData: { projectId: "test-project" },
      },
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      userAgent: "unit-test",
      log: { debug() {}, info() {}, warn() {}, error() {} },
    } as never);
    assert.ok(
      upstreamModels.length > 0,
      `no upstream call captured (result: ${JSON.stringify(result).slice(0, 300)})`
    );
    assert.deepEqual([...new Set(upstreamModels)], [model]);
  });
}
