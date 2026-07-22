import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME,
  prepareWebFetchFallbackBody,
  supportsNativeWebFetchFallbackBypass,
} from "../../open-sse/services/webFetchInterception.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

// #7339 — webFetchInterception.ts, a structural twin of webSearchFallback.ts
// (Phase 3-4 of #3384). Pure body/tool-array transformation only.
describe("services/webFetchInterception — prepareWebFetchFallbackBody (#7339)", () => {
  const baseOptions = {
    provider: "openai",
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    nativeCodexPassthrough: false,
  };

  it("is a no-op (byte-identical body, enabled:false) when no tools array is present", () => {
    const body = { model: "gpt-5" };
    const { body: nextBody, fallback } = prepareWebFetchFallbackBody(body, baseOptions);
    assert.deepEqual(nextBody, body);
    assert.equal(fallback.enabled, false);
    assert.equal(fallback.toolName, null);
    assert.equal(fallback.convertedToolCount, 0);
  });

  it("is a no-op when no web_fetch-shaped tool is present in the tools array", () => {
    const body = { tools: [{ type: "function", function: { name: "get_weather" } }] };
    const { body: nextBody, fallback } = prepareWebFetchFallbackBody(body, baseOptions);
    assert.deepEqual(nextBody, body);
    assert.equal(fallback.enabled, false);
    assert.equal(fallback.convertedToolCount, 0);
  });

  it("converts a native web_fetch tool into the synthetic omniroute_web_fetch tool when interceptFetchOverride is true", () => {
    const body = { tools: [{ type: "web_fetch" }] };
    const { body: nextBody, fallback } = prepareWebFetchFallbackBody(body, {
      ...baseOptions,
      interceptFetchOverride: true,
    });
    assert.equal(fallback.enabled, true);
    assert.equal(fallback.toolName, OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME);
    assert.equal(fallback.convertedToolCount, 1);
    assert.equal(nextBody.tools.length, 1);
    assert.equal(
      (nextBody.tools[0] as { function: { name: string } }).function.name,
      OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME
    );
  });

  it("uses a flat function-tool shape for the Responses API target", () => {
    const body = { tools: [{ type: "web_fetch" }] };
    const { body: nextBody } = prepareWebFetchFallbackBody(body, {
      ...baseOptions,
      targetFormat: FORMATS.OPENAI_RESPONSES,
      interceptFetchOverride: true,
    });
    const tool = nextBody.tools[0] as { type: string; name: string; function?: unknown };
    assert.equal(tool.type, "function");
    assert.equal(tool.name, OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME);
    assert.equal(tool.function, undefined);
  });

  it("leaves the native web_fetch tool untouched when interceptFetchOverride is false", () => {
    const body = { tools: [{ type: "web_fetch" }] };
    const { body: nextBody, fallback } = prepareWebFetchFallbackBody(body, {
      ...baseOptions,
      interceptFetchOverride: false,
    });
    assert.deepEqual(nextBody, body);
    assert.equal(fallback.enabled, false);
  });

  it("preserves other tools alongside the converted synthetic tool", () => {
    const body = {
      tools: [{ type: "web_fetch" }, { type: "function", function: { name: "get_weather" } }],
    };
    const { body: nextBody, fallback } = prepareWebFetchFallbackBody(body, {
      ...baseOptions,
      interceptFetchOverride: true,
    });
    assert.equal(fallback.convertedToolCount, 1);
    assert.equal(nextBody.tools.length, 2);
    const names = (nextBody.tools as Array<{ function?: { name: string } }>).map(
      (tool) => tool.function?.name
    );
    assert.ok(names.includes(OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME));
    assert.ok(names.includes("get_weather"));
  });
});

describe("services/webFetchInterception — supportsNativeWebFetchFallbackBypass (#7339)", () => {
  it("interceptFetchOverride true always forces interception (no bypass)", () => {
    assert.equal(
      supportsNativeWebFetchFallbackBypass({
        targetFormat: FORMATS.CLAUDE,
        sourceFormat: FORMATS.CLAUDE,
        nativeCodexPassthrough: false,
        interceptFetchOverride: true,
      }),
      false
    );
  });

  it("interceptFetchOverride false always forces native bypass", () => {
    assert.equal(
      supportsNativeWebFetchFallbackBypass({
        targetFormat: FORMATS.OPENAI,
        sourceFormat: FORMATS.OPENAI,
        nativeCodexPassthrough: false,
        interceptFetchOverride: false,
      }),
      true
    );
  });

  it("bypasses natively for Codex passthrough with no override set", () => {
    assert.equal(
      supportsNativeWebFetchFallbackBypass({
        targetFormat: FORMATS.OPENAI_RESPONSES,
        nativeCodexPassthrough: true,
      }),
      true
    );
  });

  it("bypasses by default (strictly opt-in, no heuristic default) when no override is set at all", () => {
    assert.equal(
      supportsNativeWebFetchFallbackBypass({
        targetFormat: FORMATS.OPENAI,
        sourceFormat: FORMATS.OPENAI,
        nativeCodexPassthrough: false,
      }),
      true
    );
  });
});
