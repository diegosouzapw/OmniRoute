// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    if (values && Object.keys(values).length > 0) {
      let s = key;
      for (const [k, v] of Object.entries(values)) {
        s = s.replace(`{${k}}`, String(v));
      }
      return s;
    }
    return key;
  },
}));

import { API_KEY_PLACEHOLDER } from "../../../src/lib/playground/codeExport";

const { default: ExportCodeModal } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/ExportCodeModal"
);

const BASE_STATE = {
  endpoint: "chat.completions" as const,
  baseUrl: "http://localhost:20128",
  model: "openai/gpt-4o",
  systemPrompt: "You are helpful.",
  messages: [{ role: "user" as const, content: "Hello" }],
  stream: true,
};

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderModal(state = BASE_STATE, onClose = vi.fn()): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<ExportCodeModal state={state} onClose={onClose} />);
  });
  containers.push({ root, el });
  return el;
}

afterEach(() => {
  for (const { root, el } of containers) {
    act(() => root.unmount());
    el.remove();
  }
  containers.length = 0;
  vi.restoreAllMocks();
});

describe("ExportCodeModal", () => {
  it("renders 3 language tabs: curl, Python, TypeScript", () => {
    const el = renderModal();
    const tabs = el.querySelectorAll("[role='tab']");
    const labels = Array.from(tabs).map((t) => t.textContent?.trim());
    expect(labels).toContain("curl");
    expect(labels).toContain("Python");
    expect(labels).toContain("TypeScript");
  });

  it("shows Export code title", () => {
    const el = renderModal();
    // useTranslations mock returns key as text — the h2 uses exportCodeTitle
    expect(el.textContent).toContain("exportCodeTitle");
  });

  it("shows curl code with $OMNIROUTE_API_KEY placeholder", () => {
    const el = renderModal();
    const pre = el.querySelector("pre");
    expect(pre?.textContent).toContain(API_KEY_PLACEHOLDER);
    expect(pre?.textContent).toContain("$OMNIROUTE_API_KEY");
  });

  it("never contains a real API key pattern (sk-...) in any tab", async () => {
    const el = renderModal();
    const tabs = el.querySelectorAll("[role='tab']") as NodeListOf<HTMLButtonElement>;

    for (const tab of Array.from(tabs)) {
      await act(async () => { tab.click(); });
      const pre = el.querySelector("pre");
      const code = pre?.textContent ?? "";
      // Real key regex — must not match
      expect(code).not.toMatch(/sk-[A-Za-z0-9_-]{16,}/);
    }
  });

  it("Copy button calls navigator.clipboard.writeText with code containing API_KEY_PLACEHOLDER", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });

    const el = renderModal();
    const copyBtn = el.querySelector("[aria-label='copyLangCode']") as HTMLButtonElement;
    expect(copyBtn).not.toBeNull();

    await act(async () => { copyBtn.click(); });

    expect(writeTextMock).toHaveBeenCalledTimes(1);
    const copiedText = writeTextMock.mock.calls[0][0] as string;
    expect(copiedText).toContain(API_KEY_PLACEHOLDER);
    // Must NOT contain a real key pattern
    expect(copiedText).not.toMatch(/sk-[A-Za-z0-9_-]{16,}/);
  });

  it("switching tab to Python shows different code snippet", async () => {
    const el = renderModal();

    // Get initial curl code
    const initialPre = el.querySelector("pre");
    const curlCode = initialPre?.textContent ?? "";

    // Click Python tab
    const tabs = el.querySelectorAll("[role='tab']") as NodeListOf<HTMLButtonElement>;
    const pythonTab = Array.from(tabs).find((t) => t.textContent?.trim() === "Python");
    expect(pythonTab).not.toBeNull();

    await act(async () => { pythonTab!.click(); });

    const newPre = el.querySelector("pre");
    const pythonCode = newPre?.textContent ?? "";

    // Python code should differ from curl
    expect(pythonCode).not.toBe(curlCode);
    // Python code should also have the placeholder
    expect(pythonCode).toContain(API_KEY_PLACEHOLDER);
  });

  it("switching tab to TypeScript shows TS-specific code", async () => {
    const el = renderModal();

    const tabs = el.querySelectorAll("[role='tab']") as NodeListOf<HTMLButtonElement>;
    const tsTab = Array.from(tabs).find((t) => t.textContent?.trim() === "TypeScript");
    await act(async () => { tsTab!.click(); });

    const pre = el.querySelector("pre");
    const code = pre?.textContent ?? "";
    // TypeScript code should contain OMNIROUTE_API_KEY
    expect(code).toContain(API_KEY_PLACEHOLDER);
    expect(code).not.toMatch(/sk-[A-Za-z0-9_-]{16,}/);
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    const el = renderModal(BASE_STATE, onClose);
    const backdrop = el.querySelector("[role='dialog']") as HTMLDivElement;
    act(() => backdrop.click());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Close button is clicked", () => {
    const onClose = vi.fn();
    const el = renderModal(BASE_STATE, onClose);
    const closeBtn = el.querySelector("[aria-label='closeExportModal']") as HTMLButtonElement;
    act(() => closeBtn.click());
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
