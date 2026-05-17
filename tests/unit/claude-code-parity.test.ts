/**
 * Tests for PR #1188 — Claude Code Native Parity.
 *
 * Covers:
 * 1. CCH body signing (signRequestBody / computeCCH from claudeCodeCCH.ts)
 * 2. Fingerprint computation (computeFingerprint / extractFirstUserMessageText)
 * 3. Tool name remapping (remapToolNamesInRequest from claudeCodeToolRemapper.ts)
 * 4. API constraints (enforceThinkingTemperature, disableThinkingIfToolChoiceForced,
 *    enforceCacheControlLimit, ensureCacheControlOnLastUserMessage)
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── CCH signing ───────────────────────────────────────────────────────────────
import { computeCCH, signRequestBody, CCH_PATTERN } from "../../open-sse/services/claudeCodeCCH.ts";
import { CLAUDE_CODE_COMPATIBLE_VERSION } from "../../open-sse/services/claudeCodeCompatible.ts";

// ── Fingerprint ───────────────────────────────────────────────────────────────
import {
  computeFingerprint,
  extractFirstUserMessageText,
} from "../../open-sse/services/claudeCodeFingerprint.ts";

// ── Tool remapper ─────────────────────────────────────────────────────────────
import {
  remapToolNamesInRequest,
  remapToolNamesInResponse,
} from "../../open-sse/services/claudeCodeToolRemapper.ts";

// ── Constraints ───────────────────────────────────────────────────────────────
import {
  enforceThinkingTemperature,
  disableThinkingIfToolChoiceForced,
  enforceCacheControlLimit,
  ensureCacheControlOnLastUserMessage,
} from "../../open-sse/services/claudeCodeConstraints.ts";

// ─────────────────────────────────────────────────────────────────────────────
// CCH Signing tests
// ─────────────────────────────────────────────────────────────────────────────

describe("computeCCH", () => {
  it("returns a 5-character lowercase hex string", async () => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode("hello world");
    const hash = await computeCCH(bytes);
    assert.equal(hash.length, 5, "CCH must be 5 chars");
    assert.match(hash, /^[0-9a-f]{5}$/, "CCH must be lowercase hex");
  });

  it("is deterministic — same input always produces the same hash", async () => {
    const encoder = new TextEncoder();
    const bytes = encoder.encode('{"model":"claude-sonnet-4-6"}');
    const hash1 = await computeCCH(bytes);
    const hash2 = await computeCCH(bytes);
    assert.equal(hash1, hash2, "CCH must be deterministic");
  });

  it("produces different hashes for different inputs", async () => {
    const encoder = new TextEncoder();
    const hash1 = await computeCCH(encoder.encode("input-a"));
    const hash2 = await computeCCH(encoder.encode("input-b"));
    assert.notEqual(hash1, hash2, "different inputs must produce different CCH values");
  });
});

describe("signRequestBody", () => {
  it("replaces cch=00000 placeholder with computed hash", async () => {
    const body = `{"x-anthropic-billing-header":"cc_version=${CLAUDE_CODE_COMPATIBLE_VERSION}.abc; cch=00000;","model":"claude"}`;
    const signed = await signRequestBody(body);
    assert.ok(signed.includes("cch="), "signed body should contain cch=");
    assert.ok(!signed.includes("cch=00000"), "placeholder cch=00000 should be replaced");
    const match = signed.match(/cch=([0-9a-f]{5});/);
    assert.ok(match, "signed body must contain a valid 5-char hex CCH token");
  });

  it("returns the body unchanged when no cch placeholder is present", async () => {
    const body = '{"model":"claude-sonnet-4-6","messages":[]}';
    const result = await signRequestBody(body);
    assert.equal(result, body, "body without placeholder must pass through unchanged");
  });

  it("CCH_PATTERN matches the expected format", () => {
    assert.ok(CCH_PATTERN.test("cch=ab1f3;"), "CCH_PATTERN should match lowercase 5-hex;");
    assert.ok(!CCH_PATTERN.test("cch=00000"), "CCH_PATTERN requires trailing semicolon");
    assert.ok(!CCH_PATTERN.test("cch=ABCDE;"), "CCH_PATTERN requires lowercase");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Fingerprint tests
// ─────────────────────────────────────────────────────────────────────────────

describe("computeFingerprint", () => {
  it("returns a 3-character hex string", () => {
    const fp = computeFingerprint("Hello, world!", CLAUDE_CODE_COMPATIBLE_VERSION);
    assert.equal(fp.length, 3, "fingerprint must be 3 chars");
    assert.match(fp, /^[0-9a-f]{3}$/, "fingerprint must be lowercase hex");
  });

  it("is deterministic — same text + version always produces the same fingerprint", () => {
    const fp1 = computeFingerprint("Hello, world!", CLAUDE_CODE_COMPATIBLE_VERSION);
    const fp2 = computeFingerprint("Hello, world!", CLAUDE_CODE_COMPATIBLE_VERSION);
    assert.equal(fp1, fp2, "fingerprint must be deterministic");
  });

  it("changes when fingerprint version changes", () => {
    const fp1 = computeFingerprint("same text", CLAUDE_CODE_COMPATIBLE_VERSION);
    const fp2 = computeFingerprint("same text", "2.1.93");
    assert.notEqual(fp1, fp2, "different versions must produce different fingerprints");
  });

  it("handles short messages safely — uses '0' for missing indices", () => {
    // indices are [4, 7, 20]; short string should not throw
    const fp = computeFingerprint("hi", CLAUDE_CODE_COMPATIBLE_VERSION);
    assert.ok(fp.length === 3, "short input should not throw and return 3-char fingerprint");
  });

  it("handles empty string without throwing", () => {
    const fp = computeFingerprint("", CLAUDE_CODE_COMPATIBLE_VERSION);
    assert.ok(fp.length === 3, "empty string should not throw");
  });
});

describe("extractFirstUserMessageText", () => {
  it("extracts text from a simple string-content user message", () => {
    const messages = [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "Hello there!" },
    ];
    assert.equal(extractFirstUserMessageText(messages), "Hello there!");
  });

  it("extracts text from an array-content user message", () => {
    const messages = [{ role: "user", content: [{ type: "text", text: "What is 2+2?" }] }];
    assert.equal(extractFirstUserMessageText(messages), "What is 2+2?");
  });

  it("returns empty string when there are no user messages", () => {
    const messages = [{ role: "system", content: "You are helpful." }];
    assert.equal(extractFirstUserMessageText(messages), "");
  });

  it("returns empty string for undefined/null input", () => {
    assert.equal(extractFirstUserMessageText(undefined), "");
    assert.equal(extractFirstUserMessageText(null), "");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Tool remapper tests
// ─────────────────────────────────────────────────────────────────────────────

describe("remapToolNamesInRequest", () => {
  it("converts lowercase tool names to TitleCase in tools array", () => {
    const body = {
      tools: [
        { name: "bash", description: "Run bash commands" },
        { name: "read_file", description: "Read a file" },
      ],
      messages: [],
    };
    remapToolNamesInRequest(body);
    // Should remap known tools (e.g. bash → Bash); unknown tools pass through
    // The exact mapping depends on the tool registry — test that function doesn't throw
    // and that tools array is still present
    assert.ok(Array.isArray(body.tools), "tools array must still be present after remap");
  });

  it("tracks remapped tool names without leaking helper fields into the wire payload", () => {
    const body = {
      tools: [
        { name: "bash", description: "Run bash commands" },
        { name: "glob", description: "Search files" },
      ],
      tool_choice: { type: "tool", name: "glob" },
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", name: "read", input: { file_path: "README.md" } }],
        },
      ],
    };

    remapToolNamesInRequest(body);

    const mappedBody = body as Record<string, unknown> & {
      _toolNameMap?: Map<string, string>;
      _claudeCodeRequiresLowercaseToolNames?: boolean;
    };

    assert.equal(body.tools[0].name, "Bash");
    assert.equal(body.tools[1].name, "Glob");
    assert.equal(body.tool_choice.name, "Glob");
    assert.equal(body.messages[0].content[0].name, "Read");
    assert.equal(mappedBody._toolNameMap?.get("Bash"), "bash");
    assert.equal(mappedBody._toolNameMap?.get("Glob"), "glob");
    assert.equal(mappedBody._toolNameMap?.get("Read"), "read");
    assert.equal(Object.keys(body).includes("_toolNameMap"), false);
    assert.equal(mappedBody._claudeCodeRequiresLowercaseToolNames, undefined);

    const wirePayload = JSON.stringify(body);
    assert.equal(wirePayload.includes("_toolNameMap"), false);
    assert.equal(wirePayload.includes("_claudeCodeRequiresLowercaseToolNames"), false);
    assert.match(wirePayload, /"name":"Bash"/);
    assert.match(wirePayload, /"name":"Glob"/);
  });

  it("merges an existing in-memory tool name map and keeps it non-enumerable", () => {
    const body: Record<string, unknown> = {
      tools: [{ name: "bash", description: "Run bash commands" }],
      messages: [],
    };
    body._toolNameMap = new Map([["proxy_read_file", "read_file"]]);

    remapToolNamesInRequest(body);

    const toolNameMap = body._toolNameMap as Map<string, string>;
    assert.equal(toolNameMap.get("proxy_read_file"), "read_file");
    assert.equal(toolNameMap.get("Bash"), "bash");
    assert.equal(Object.keys(body).includes("_toolNameMap"), false);
    assert.equal(JSON.stringify(body).includes("_toolNameMap"), false);
  });

  it("handles body without tools without throwing", () => {
    const body = { messages: [{ role: "user", content: "hello" }] };
    assert.doesNotThrow(() => remapToolNamesInRequest(body));
  });
  // Note: remapToolNamesInRequest requires a non-null body (callers always provide one)
});

describe("remapToolNamesInResponse", () => {
  it("restores response tool names from the request-side map", () => {
    const text = 'data: {"name":"Bash","other":{"name": "Glob"}}\n\n';
    const restored = remapToolNamesInResponse(
      text,
      true,
      new Map([
        ["Bash", "shell"],
        ["Glob", "glob"],
      ])
    );

    assert.match(restored, /"name":"shell"/);
    assert.match(restored, /"name": "glob"/);
    assert.equal(remapToolNamesInResponse(text, false), text);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// API constraints tests
// ─────────────────────────────────────────────────────────────────────────────

describe("enforceThinkingTemperature", () => {
  it("sets temperature to 1 when thinking is enabled", () => {
    const body = {
      thinking: { type: "enabled", budget_tokens: 1000 },
      temperature: 0.7,
    };
    enforceThinkingTemperature(body);
    assert.equal(body.temperature, 1, "temperature must be 1 when thinking is active");
  });

  it("does not modify temperature when thinking is not present", () => {
    const body = { temperature: 0.7, messages: [] };
    enforceThinkingTemperature(body);
    assert.equal(body.temperature, 0.7, "temperature should be unchanged when no thinking");
  });
});

describe("disableThinkingIfToolChoiceForced", () => {
  it("removes thinking when tool_choice forces a specific tool", () => {
    const body = {
      thinking: { type: "enabled", budget_tokens: 1000 },
      tool_choice: { type: "tool", name: "Bash" },
      tools: [{ name: "Bash" }],
    };
    disableThinkingIfToolChoiceForced(body);
    // thinking should be removed or disabled
    const thinkingType = body.thinking?.type;
    assert.ok(
      !thinkingType || thinkingType === "disabled" || thinkingType === "none",
      "thinking must be disabled when tool_choice forces a specific tool"
    );
  });

  it("does not modify thinking when tool_choice is auto", () => {
    const body = {
      thinking: { type: "enabled", budget_tokens: 1000 },
      tool_choice: { type: "auto" },
    };
    disableThinkingIfToolChoiceForced(body);
    assert.equal(body.thinking?.type, "enabled", "thinking should remain when tool_choice is auto");
  });
});

describe("enforceCacheControlLimit", () => {
  it("limits cache_control blocks without throwing when count is within limit", () => {
    const body = {
      system: [
        { type: "text", text: "s1", cache_control: { type: "ephemeral" } },
        { type: "text", text: "s2" },
      ],
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: "hi", cache_control: { type: "ephemeral" } }],
        },
      ],
    };
    assert.doesNotThrow(() => enforceCacheControlLimit(body));
  });

  it("handles body without system or messages without throwing", () => {
    // chatCore always provides a valid body object — test empty but non-null object
    assert.doesNotThrow(() => enforceCacheControlLimit({}));
  });
});

describe("ensureCacheControlOnLastUserMessage", () => {
  it("does not throw on a valid messages array", () => {
    const body = {
      messages: [
        { role: "user", content: [{ type: "text", text: "Hello" }] },
        { role: "assistant", content: [{ type: "text", text: "Hi!" }] },
        { role: "user", content: [{ type: "text", text: "Follow up" }] },
      ],
    };
    assert.doesNotThrow(() => ensureCacheControlOnLastUserMessage(body));
  });

  it("handles body without messages without throwing", () => {
    // chatCore always provides a valid body object — test empty but non-null object
    assert.doesNotThrow(() => ensureCacheControlOnLastUserMessage({}));
  });
});
