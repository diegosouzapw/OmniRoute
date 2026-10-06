import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  clampComboDepth,
  getConnectionStatusQuotaCutoffReason,
  isContextOverflow400,
  isModelScoped400,
  isParamValidation400,
  isRequestScopedUpstreamFailure,
  shouldRecordProviderBreakerFailure,
  shouldSkipConnDisable,
  shouldSkipForPredictedTtft,
} from "../../open-sse/services/combo.ts";
import {
  buildStreamingResponseHeaders,
  extractSystemRoleMessages,
  isClaudeCodeSemanticPassthroughRequest,
  isTokenExpiringSoon,
  redactPassthroughThinkingSignatures,
  shouldUseNativeCodexPassthrough,
  stripStaleForwardingHeaders,
} from "../../open-sse/handlers/chatCore.ts";
import { goldenSnapshot } from "../helpers/goldenSnapshot.ts";

const GOLDEN_NAME = "g13/combo-chatcore-public-seams";
const GOLDEN_FILE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  `../snapshots/${GOLDEN_NAME}.json`
);
const SEED = 0x50_13_c0_de;

type ContextOverflowPredicate = typeof isContextOverflow400;

type GoldenOverrides = {
  isContextOverflow400?: ContextOverflowPredicate;
};

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x1_0000_0000;
  };
}

function sampleSeeded<T>(values: readonly T[], count: number, salt: number): T[] {
  const random = seededRandom(SEED ^ salt);
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function cartesian<T extends Record<string, readonly unknown[]>>(
  dimensions: T
): Array<{ [K in keyof T]: T[K][number] }> {
  let rows: Array<Record<string, unknown>> = [{}];
  for (const [key, values] of Object.entries(dimensions)) {
    rows = rows.flatMap((row) => values.map((value) => ({ ...row, [key]: value })));
  }
  return rows as Array<{ [K in keyof T]: T[K][number] }>;
}

function snapshotCombo(overrides: GoldenOverrides): Record<string, unknown> {
  const contextOverflow = overrides.isContextOverflow400 ?? isContextOverflow400;
  const clampInputs = [
    undefined,
    null,
    "",
    "nope",
    Number.NaN,
    Number.NEGATIVE_INFINITY,
    -4,
    0,
    0.9,
    1,
    1.9,
    3,
    9.9,
    10,
    11,
    999,
  ];
  const ttftMatrix = cartesian({
    requests: [0, 4, 5, 6, 20],
    avgLatencyMs: [0, 999, 1000, 1001, 5000],
    predictiveTtftMs: [-1, 0, 1000, 3000],
  });
  const breakerMatrix = [
    {
      status: 500,
      isStreamReadinessFailure: false,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: false,
      isProxyUnreachable: false,
      error: "upstream failed",
    },
    ...cartesian({
      status: [400, 408, 429, 500, 502, 503, 504],
      isStreamReadinessFailure: [false, true],
      sameProviderNext: [false, true],
      skipProviderBreaker: [false, true],
      requestScopedFailure: [false, true],
      isProxyUnreachable: [false, true],
      error: ["upstream failed", "Client disconnected: aborted"],
    }),
  ];
  const requestScopeMatrix = cartesian({
    code: [null, "context_length_exceeded", "upstream_empty_response", "other"],
    type: [null, "context_length_exceeded", "server_error"],
  });
  const connDisableMatrix = cartesian({
    status: [401, 408, 499, 502],
    errorCode: [null, "client_disconnected", "plugin_block", "context_length_exceeded"],
    is401: [false, true],
    hasExtraKeys: [false, true],
    provider: ["openai", "codex"],
  });
  const messages = [
    "",
    "invalid message format",
    "maximum context length exceeded",
    "your input exceeds the context window",
    "max_tokens must be between 1 and 4096",
    "parameter is illegal",
    "model is not supported",
    "unsupported_api_for_model",
    "this model does not support the Responses API",
    "plain upstream failure",
  ];
  const connectionStates: Array<Record<string, unknown> | undefined> = [
    undefined,
    {},
    { testStatus: "banned" },
    { testStatus: " CREDITS_EXHAUSTED " },
    { testStatus: "unavailable", rateLimitedUntil: "2999-01-01T00:00:00.000Z" },
    { testStatus: "unavailable", rateLimitedUntil: "2000-01-01T00:00:00.000Z" },
    { testStatus: "healthy", rateLimitedUntil: "2999-01-01T00:00:00.000Z" },
  ];

  return {
    clampDepth: sampleSeeded(clampInputs, 12, 0x01).map((input) => ({
      input: String(input),
      output: clampComboDepth(input),
    })),
    predictiveTtft: sampleSeeded(ttftMatrix, 24, 0x02).map((input) => ({
      input,
      output: shouldSkipForPredictedTtft(
        { requests: input.requests, avgLatencyMs: input.avgLatencyMs },
        input.predictiveTtftMs
      ),
    })),
    providerBreaker: sampleSeeded(breakerMatrix, 40, 0x03).map((input) => ({
      input,
      output: shouldRecordProviderBreakerFailure(input),
    })),
    requestScoped: sampleSeeded(requestScopeMatrix, 10, 0x04).map((input) => ({
      input,
      output: isRequestScopedUpstreamFailure(input),
    })),
    connectionDisable: sampleSeeded(connDisableMatrix, 24, 0x05).map((input) => ({
      input,
      output: shouldSkipConnDisable(
        {
          status: input.status,
          errorCode: input.errorCode,
        },
        input.is401,
        input.hasExtraKeys,
        input.provider
      ),
    })),
    badRequestClassifiers: sampleSeeded(messages, messages.length, 0x06).map((input) => ({
      input,
      output: {
        contextOverflow: contextOverflow(input),
        parameterValidation: isParamValidation400(input),
        modelScoped: isModelScoped400(input),
      },
    })),
    connectionStatusCutoff: sampleSeeded(connectionStates, connectionStates.length, 0x07).map(
      (input) => ({ input, output: getConnectionStatusQuotaCutoffReason(input) ?? null })
    ),
  };
}

function normalizeStreamingHeaders(headers: Record<string, string>): Record<string, string> {
  return {
    ...headers,
    "X-OmniRoute-Version": "<APP_VERSION>",
  };
}

function snapshotChatCore(): Record<string, unknown> {
  const systemPayloads: Array<Record<string, unknown>> = [
    { messages: [{ role: "user", content: "hello" }] },
    {
      messages: [
        { role: "system", content: "policy" },
        { role: "user", content: "go" },
      ],
    },
    {
      system: "existing",
      messages: [
        { role: "developer", content: "new" },
        { role: "assistant", content: "ok" },
      ],
    },
    {
      system: [{ type: "text", text: "existing-block" }],
      messages: [
        {
          role: "SYSTEM",
          content: [
            { type: "text", text: "lifted" },
            { type: "image", source: "ignored" },
          ],
        },
      ],
    },
    {
      messages: [
        { role: "developer", content: "" },
        { role: "user", content: "kept" },
      ],
    },
    { model: "claude", messages: null },
  ];
  const nativeCodexMatrix = cartesian({
    provider: ["codex", "openai", null],
    sourceFormat: ["openai-responses", "openai-chat", null],
    endpointPath: ["/v1/responses", "/v1/responses/", "/v1/chat/completions", "responses"],
  });
  const semanticMatrix = cartesian({
    provider: ["claude", "openai", "anthropic-compatible-acme"],
    sourceFormat: ["claude", "openai-chat"],
    targetFormat: ["claude", "openai-chat"],
    signal: ["userAgent", "appHeader", "sessionHeader", "none"],
  });
  const signatureInputs = [
    null,
    "plain",
    [{ role: "assistant", content: [{ type: "thinking", signature: "sig", text: "x" }] }],
    { messages: [{ role: "assistant", content: [{ type: "redacted_thinking", data: "x" }] }] },
  ];
  const streamingHeaderCases = [
    new Headers({
      "content-type": "application/json",
      "x-request-id": "req-1",
      "retry-after": "15",
      "x-ratelimit-remaining": "7",
      "x-upstream-debug": "safe",
      "x-omniroute-internal": "drop",
      "x-middleware-rewrite": "/internal",
    }),
    new Headers({
      connection: "x-hop",
      "x-hop": "drop",
      "request-id": "req-2",
      "set-cookie": "secret=yes",
      "x-provider": "kept",
    }),
  ];

  return {
    systemRoleExtraction: sampleSeeded(systemPayloads, systemPayloads.length, 0x11).map((input) => {
      const payload = structuredClone(input);
      extractSystemRoleMessages(payload);
      return { input, output: payload };
    }),
    nativeCodexPassthrough: sampleSeeded(nativeCodexMatrix, 18, 0x12).map((input) => ({
      input,
      output: shouldUseNativeCodexPassthrough(input),
    })),
    semanticClaudePassthrough: sampleSeeded(semanticMatrix, 24, 0x13).map((input) => {
      const headers = new Headers();
      let userAgent: string | null = null;
      if (input.signal === "userAgent") userAgent = "claude-code/2.0";
      if (input.signal === "appHeader") headers.set("x-app", "cli");
      if (input.signal === "sessionHeader") headers.set("x-claude-code-session-id", "session-1");
      return {
        input,
        output: isClaudeCodeSemanticPassthroughRequest({
          provider: input.provider,
          sourceFormat: input.sourceFormat,
          targetFormat: input.targetFormat,
          headers,
          userAgent,
        }),
      };
    }),
    thinkingSignaturePassthrough: sampleSeeded(signatureInputs, signatureInputs.length, 0x14).map(
      (input) => ({
        input,
        output: redactPassthroughThinkingSignatures(
          structuredClone(input),
          "replacement-signature"
        ),
      })
    ),
    streamingHeaders: streamingHeaderCases.map((headers, index) => ({
      input: index,
      output: normalizeStreamingHeaders(
        buildStreamingResponseHeaders(
          headers,
          {
            provider: "test-provider",
            model: "test-model",
            requestId: `request-${index}`,
          },
          null
        )
      ),
    })),
    staleForwardingHeaders: [
      {
        "content-encoding": "gzip",
        "content-length": "10",
        "transfer-encoding": "chunked",
        "x-request-id": "req-3",
      },
      {
        "Content-Length": "20",
        "x-provider": "kept",
      },
    ].map((entries) => {
      const headers = new Headers(entries);
      stripStaleForwardingHeaders(headers);
      return { input: entries, output: Object.fromEntries(headers.entries()) };
    }),
    tokenExpiry: sampleSeeded(
      cartesian({
        expiresAt: [null, "2000-01-01T00:00:00.000Z", "2999-01-01T00:00:00.000Z", "invalid"],
        bufferMs: [0, 300_000, 86_400_000],
      }),
      10,
      0x15
    ).map((input) => ({ input, output: isTokenExpiringSoon(input.expiresAt, input.bufferMs) })),
  };
}

export function buildG13GoldenSnapshot(overrides: GoldenOverrides = {}): Record<string, unknown> {
  return {
    seed: `0x${SEED.toString(16)}`,
    combo: snapshotCombo(overrides),
    chatCore: snapshotChatCore(),
  };
}

test("G13 golden locks sampled combo.ts and chatCore.ts public behavior", () => {
  assert.ok(
    process.env.UPDATE_GOLDEN === "1" || fs.existsSync(GOLDEN_FILE),
    `committed golden is missing: ${GOLDEN_FILE}`
  );
  goldenSnapshot(GOLDEN_NAME, buildG13GoldenSnapshot());
});

test("G13 seeded public-seam sampling is deterministic", () => {
  assert.deepEqual(buildG13GoldenSnapshot(), buildG13GoldenSnapshot());
});

test("G13 golden detects a public behavior mutation", () => {
  const baseline = buildG13GoldenSnapshot();
  const mutated = buildG13GoldenSnapshot({
    isContextOverflow400: (input) => !isContextOverflow400(input),
  });
  assert.notDeepEqual(mutated, baseline, "mutation must alter the sampled behavior set");

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "g13-golden-"));
  const previousUpdateGolden = process.env.UPDATE_GOLDEN;
  try {
    process.env.UPDATE_GOLDEN = "1";
    goldenSnapshot(GOLDEN_NAME, baseline, tmpDir);
    delete process.env.UPDATE_GOLDEN;

    assert.doesNotThrow(() => goldenSnapshot(GOLDEN_NAME, baseline, tmpDir));
    assert.throws(
      () => goldenSnapshot(GOLDEN_NAME, mutated, tmpDir),
      /golden mismatch for "g13\/combo-chatcore-public-seams"/
    );
  } finally {
    if (previousUpdateGolden === undefined) delete process.env.UPDATE_GOLDEN;
    else process.env.UPDATE_GOLDEN = previousUpdateGolden;
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
