// @vitest-environment jsdom
//
// Regression guard: JSON tree values that are actually Unix timestamps
// (e.g. `created: 1787562749` in an event-stream payload) rendered as a
// bare number with no way to read the actual date/time without doing the
// epoch math by hand. react-json-view-lite exposes no per-value render
// hook, so useTimestampTitles walks the rendered tree and adds a
// human-readable title/tooltip to number values whose field name looks
// like a timestamp and whose value is a plausible Unix epoch -- without
// changing the value actually displayed.
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

function renderPayload(payload: unknown) {
  act(() => {
    root.render(
      <PayloadSection
        title="Test Payload"
        sectionId="test-payload"
        json={JSON.stringify(payload, null, 2)}
        onCopy={vi.fn().mockResolvedValue(true)}
      />
    );
  });
}

function findValueSpan(text: string): HTMLElement | undefined {
  return Array.from(container.querySelectorAll<HTMLElement>("span")).find(
    (el) => el.children.length === 0 && el.textContent === text
  );
}

describe("timestamp title tooltips in JSON trees", () => {
  it("adds a human-readable title to a field named created with a plausible epoch-seconds value", () => {
    renderPayload({ id: "gen-1", created: 1787562749, model: "nemotron-3-ultra-free" });

    const valueSpan = findValueSpan("1787562749");
    expect(valueSpan).toBeDefined();
    expect(valueSpan?.title).not.toBe("");
    // 1787562749 seconds since epoch -> 2026-08-24-ish; just confirm it parsed
    // as a real, non-garbage date rather than asserting an exact locale string.
    expect(valueSpan?.title).toMatch(/202\d/);
  });

  it("does not add a title to a plain number field that only happens to share the epoch-seconds range", () => {
    renderPayload({ id: "gen-1", max_tokens: 1787562749 });

    const valueSpan = findValueSpan("1787562749");
    expect(valueSpan).toBeDefined();
    expect(valueSpan?.title).toBe("");
  });

  it("does not add a title to a timestamp-named field whose value is not a plausible epoch", () => {
    renderPayload({ created: 42 });

    const valueSpan = findValueSpan("42");
    expect(valueSpan).toBeDefined();
    expect(valueSpan?.title).toBe("");
  });

  it("leaves the displayed value unchanged -- only the title attribute is added", () => {
    renderPayload({ created: 1787562749 });

    const valueSpan = findValueSpan("1787562749");
    expect(valueSpan?.textContent).toBe("1787562749");
  });
});
