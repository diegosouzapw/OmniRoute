// @vitest-environment jsdom
//
// Regression guard: PayloadSection rendered every payload (request/response
// bodies, pipeline stages) as a flat <pre> text dump, forcing operators to
// scroll through the entire raw JSON to find anything in a nested request.
// It now renders parseable JSON payloads as a collapsible tree
// (react-json-view-lite) instead, while still falling back to the plain
// <pre> dump for anything that isn't valid JSON (e.g. a captured error
// string), since the `json` prop is display text that isn't guaranteed
// parseable.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/hooks/useTheme", () => ({
  useTheme: () => ({ isDark: false }),
}));

const { PayloadSection } =
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

function renderPayload(json: string) {
  act(() => {
    root.render(
      <PayloadSection title="Test Payload" json={json} onCopy={vi.fn().mockResolvedValue(true)} />
    );
  });
}

describe("PayloadSection collapsible JSON rendering", () => {
  it("renders a valid JSON object payload as a collapsible tree, not a flat <pre> dump", () => {
    renderPayload(JSON.stringify({ model: "gpt-5.6-luna", input: [{ role: "user" }] }, null, 2));

    expect(container.querySelector("pre")).toBeNull();
    // react-json-view-lite renders expand/collapse controls for object nodes.
    expect(container.querySelectorAll("[aria-label]").length).toBeGreaterThan(0);
    expect(container.textContent).toContain("model");
    expect(container.textContent).toContain("gpt-5.6-luna");
  });

  it("renders a valid JSON array payload as a collapsible tree", () => {
    renderPayload(JSON.stringify([{ type: "output_text", text: "answer" }], null, 2));

    expect(container.querySelector("pre")).toBeNull();
    expect(container.textContent).toContain("output_text");
  });

  it("falls back to the plain <pre> dump for non-JSON payload text", () => {
    renderPayload("Upstream request failed: Model is unavailable.");

    const pre = container.querySelector("pre");
    expect(pre).not.toBeNull();
    expect(pre?.textContent).toBe("Upstream request failed: Model is unavailable.");
  });

  it("falls back to the plain <pre> dump for a JSON primitive (not an object/array)", () => {
    renderPayload(JSON.stringify("just a string"));

    const pre = container.querySelector("pre");
    expect(pre).not.toBeNull();
  });
});
