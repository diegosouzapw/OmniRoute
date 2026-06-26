/**
 * Kiro (AWS CodeWhisperer) tool-result compression — ported from upstream
 * decolua/9router#1194 (zanuartri).
 *
 * The upstream PR added Kiro-format support directly inside RTK. OmniRoute
 * lifts that capability to `bodyAdapter`, so the Kiro envelope
 * (`conversationState.history[].userInputMessage.userInputMessageContext.toolResults`)
 * flattens to OpenAI-shape `role:"tool"` messages — every compression engine
 * (RTK, lite, aggressive, etc.) automatically benefits, not just RTK.
 *
 * Error tool results (status === "error") are skipped to preserve diagnostics
 * (matches upstream behavior).
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyRtkCompression } from "../../open-sse/services/compression/engines/rtk/index.ts";
import { adaptBodyForCompression } from "../../open-sse/services/compression/bodyAdapter.ts";

function buildKiroBodyWithBuildOutput(): Record<string, unknown> {
  const noisyNpmOutput = [
    "npm warn deprecated har-validator@5.1.5: this library is no longer supported",
    "npm warn deprecated uuid@3.4.0: uuid@10 and below is no longer supported",
    "npm warn deprecated request@2.88.2: request has been deprecated",
    "npm warn deprecated inflight@1.0.6: This module is not supported",
    "npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported",
    "npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported",
    "",
    "added 47 packages, and audited 48 packages in 13s",
    "",
    "3 packages are looking for funding",
    "  run `npm fund` for details",
    "",
    "4 vulnerabilities (2 moderate, 2 critical)",
    "",
    "Some issues need review, and may require choosing",
    "a different dependency.",
    "",
    "Run `npm audit` for details.",
  ].join("\n");

  return {
    conversationState: {
      chatTriggerType: "MANUAL",
      conversationId: "test-port-1194",
      currentMessage: {
        userInputMessage: {
          content: "Install express",
          modelId: "claude-sonnet-4.5",
          userInputMessageContext: {
            toolResults: [
              {
                toolUseId: "tool_1",
                status: "success",
                content: [{ text: noisyNpmOutput }],
              },
            ],
          },
        },
      },
      history: [],
    },
  };
}

describe("Kiro tool-result compression (port of decolua/9router#1194)", () => {
  it("adapts a Kiro conversationState body to messages with the tool-result text exposed", () => {
    const body = buildKiroBodyWithBuildOutput();
    const adapter = adaptBodyForCompression(body);
    const messages = (adapter.body.messages ?? []) as Array<{
      role?: string;
      content?: unknown;
    }>;
    assert.ok(adapter.adapted, "Kiro body must be flagged as adapted");
    assert.ok(
      messages.some((m) => m.role === "tool" && typeof m.content === "string"),
      "adapter must surface tool-result text as a role:tool message"
    );
  });

  it("compresses tool-result text inside Kiro currentMessage and writes the rewritten text back", () => {
    const body = buildKiroBodyWithBuildOutput();
    const before = (
      (body.conversationState as Record<string, unknown>).currentMessage as Record<string, unknown>
    ).userInputMessage as {
      userInputMessageContext: { toolResults: Array<{ content: Array<{ text: string }> }> };
    };
    const originalLen = before.userInputMessageContext.toolResults[0].content[0].text.length;

    const result = applyRtkCompression(body);

    assert.equal(result.compressed, true, "RTK must compress noisy build output");
    assert.ok(result.stats, "stats must be returned");
    assert.ok(
      result.stats!.compressedTokens < result.stats!.originalTokens,
      "compressedTokens must drop"
    );

    const restored = (
      (result.body as Record<string, unknown>).conversationState as Record<string, unknown>
    ).currentMessage as {
      userInputMessage: {
        userInputMessageContext: { toolResults: Array<{ content: Array<{ text: string }> }> };
      };
    };
    const afterLen = restored.userInputMessage.userInputMessageContext.toolResults[0].content[0]
      .text.length;
    assert.ok(
      afterLen < originalLen,
      `Kiro tool-result text must shrink (before=${originalLen}, after=${afterLen})`
    );
  });

  it("compresses tool-result text inside Kiro history[] entries", () => {
    // Reuse the noisy npm-install fixture (already proven to trigger a build-output
    // filter in the currentMessage test) so this test exercises the history[] path
    // without depending on a separate filter (cargo, etc.) being registered.
    const compilingLines: string[] = [
      "npm warn deprecated har-validator@5.1.5: this library is no longer supported",
      "npm warn deprecated uuid@3.4.0: uuid@10 and below is no longer supported",
      "npm warn deprecated request@2.88.2: request has been deprecated",
      "npm warn deprecated inflight@1.0.6: This module is not supported",
      "npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported",
      "npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported",
      "",
      "added 47 packages, and audited 48 packages in 13s",
      "",
      "3 packages are looking for funding",
      "  run `npm fund` for details",
      "",
      "4 vulnerabilities (2 moderate, 2 critical)",
      "",
      "Run `npm audit` for details.",
    ];

    const body: Record<string, unknown> = {
      conversationState: {
        chatTriggerType: "MANUAL",
        conversationId: "test-history",
        currentMessage: {
          userInputMessage: {
            content: "What happened?",
            modelId: "claude-sonnet-4.5",
          },
        },
        history: [
          {
            userInputMessage: {
              content: "Run npm install",
              modelId: "claude-sonnet-4.5",
              userInputMessageContext: {
                toolResults: [
                  {
                    toolUseId: "tool_2",
                    status: "success",
                    content: [{ text: compilingLines.join("\n") }],
                  },
                ],
              },
            },
          },
        ],
      },
    };

    const originalLen = compilingLines.join("\n").length;
    const result = applyRtkCompression(body);

    assert.equal(result.compressed, true, "history tool result must compress");
    const state = (result.body as Record<string, unknown>).conversationState as {
      history: Array<{
        userInputMessage: {
          userInputMessageContext: { toolResults: Array<{ content: Array<{ text: string }> }> };
        };
      }>;
    };
    const afterLen = state.history[0].userInputMessage.userInputMessageContext.toolResults[0]
      .content[0].text.length;
    assert.ok(
      afterLen < originalLen,
      `history tool-result text must shrink (before=${originalLen}, after=${afterLen})`
    );
  });

  it("preserves error tool results (status === 'error') without rewriting their text", () => {
    const errorText =
      "npm error code E404\nnpm error 404 Not Found - GET https://registry.npmjs.org/invalid-package";
    const body: Record<string, unknown> = {
      conversationState: {
        chatTriggerType: "MANUAL",
        conversationId: "test-error",
        currentMessage: {
          userInputMessage: {
            content: "Install invalid-package",
            modelId: "claude-sonnet-4.5",
            userInputMessageContext: {
              toolResults: [
                {
                  toolUseId: "tool_err",
                  status: "error",
                  content: [{ text: errorText }],
                },
              ],
            },
          },
        },
        history: [],
      },
    };

    const result = applyRtkCompression(body);
    const after = (
      (result.body as Record<string, unknown>).conversationState as {
        currentMessage: {
          userInputMessage: {
            userInputMessageContext: { toolResults: Array<{ content: Array<{ text: string }> }> };
          };
        };
      }
    ).currentMessage.userInputMessage.userInputMessageContext.toolResults[0].content[0].text;
    assert.equal(after, errorText, "error tool-result text must be preserved byte-for-byte");
  });

  it("handles a malformed Kiro body without crashing", () => {
    const malformed: Array<Record<string, unknown>> = [
      { conversationState: null },
      { conversationState: {} },
      { conversationState: { history: null, currentMessage: null } },
      { conversationState: { history: "not-an-array" } },
    ];
    for (const body of malformed) {
      const result = applyRtkCompression(body);
      assert.ok(result, "must not throw on malformed Kiro body");
      // No tool-result text → engine reports no compression
      assert.equal(result.compressed, false);
    }
  });
});
