// @vitest-environment jsdom
//
// Regression guard for #13894: a size-limited call-log artifact does not
// simply drop a payload — callLogArtifacts.ts writes an explicit marker in
// its place (`{ error: { _omniroute_truncated: true, reason: ... } }` for the
// pipeline, or the `[omitted: call log artifact size limit exceeded]` string
// for requestBody/responseBody). Before this fix, RequestLoggerDetail fed
// that marker straight into the generic JSON/`<pre>` renderer under a
// generically-titled "Pipeline Error" section, so a size-limit omission was
// silently indistinguishable from a real upstream error. PayloadSection must
// now render an explicit, labeled notice instead whenever `notice` is set,
// and buildPipelinePayloadSections()/isBodySizeLimitOmission() must detect
// the marker shapes and set it.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/hooks/useTheme", () => ({
  useTheme: () => ({ isDark: false }),
}));

const { PayloadSection, buildPipelinePayloadSections, isBodySizeLimitOmission } =
  await import("../../../src/shared/components/RequestLoggerDetail.sections.tsx");

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.clearAllMocks();
});

describe("PayloadSection size-limit omission notice (#13894)", () => {
  it("renders an explicit notice instead of a JSON dump when notice=true, even if json is set", () => {
    act(() => {
      root.render(
        <PayloadSection
          title="Pipeline Error"
          json={JSON.stringify({ error: { _omniroute_truncated: true } }, null, 2)}
          notice
          onCopy={vi.fn().mockResolvedValue(true)}
        />
      );
    });

    expect(container.querySelector("pre")).toBeNull();
    expect(container.textContent).toContain("payloadSizeLimitOmitted");
    expect(container.textContent).not.toContain("_omniroute_truncated");
  });

  it("renders the normal JSON tree when notice is not set", () => {
    act(() => {
      root.render(
        <PayloadSection
          title="Provider Response"
          json={JSON.stringify({ status: 200 }, null, 2)}
          onCopy={vi.fn().mockResolvedValue(true)}
        />
      );
    });

    expect(container.textContent).not.toContain("payloadSizeLimitOmitted");
    expect(container.textContent).toContain("status");
  });

  describe("buildPipelinePayloadSections()", () => {
    const entries: Array<[string, string]> = [
      ["providerResponse", "Provider Response"],
      ["error", "Pipeline Error"],
    ];

    it("flags the pipeline.error size-limit marker with notice=true instead of dumping it as JSON", () => {
      const pipelinePayloads = {
        providerResponse: { status: 200 },
        error: { _omniroute_truncated: true, reason: "call_log_artifact_size_limit_exceeded" },
      };

      const sections = buildPipelinePayloadSections(entries, pipelinePayloads);
      const errorSection = sections.find((s) => s.key === "error");

      expect(errorSection).toBeDefined();
      expect(errorSection.notice).toBe(true);
      expect(errorSection.json).toBeNull();
    });

    it("does NOT flag a real upstream error object shaped like {error: {...}} as a size-limit marker", () => {
      const pipelinePayloads = {
        providerResponse: { status: 500 },
        error: { message: "upstream 500", code: "internal_error" },
      };

      const sections = buildPipelinePayloadSections(entries, pipelinePayloads);
      const errorSection = sections.find((s) => s.key === "error");

      expect(errorSection).toBeDefined();
      expect(errorSection.notice).toBe(false);
      expect(errorSection.json).toContain("upstream 500");
    });

    it("does not include a section for a key with no payload at all", () => {
      const pipelinePayloads = { providerResponse: { status: 200 } };
      const sections = buildPipelinePayloadSections(entries, pipelinePayloads);
      expect(sections.map((s) => s.key)).toEqual(["providerResponse"]);
    });
  });

  describe("isBodySizeLimitOmission()", () => {
    it("is true for the requestBody/responseBody omission placeholder string", () => {
      expect(isBodySizeLimitOmission("[omitted: call log artifact size limit exceeded]")).toBe(
        true
      );
    });

    it("is false for a real body value, including one that merely contains similar text", () => {
      expect(isBodySizeLimitOmission({ messages: [{ role: "user", content: "hi" }] })).toBe(false);
      expect(isBodySizeLimitOmission("call log artifact size limit exceeded (mentioned)")).toBe(
        false
      );
      expect(isBodySizeLimitOmission(null)).toBe(false);
      expect(isBodySizeLimitOmission(undefined)).toBe(false);
    });
  });
});
