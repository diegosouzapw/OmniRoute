// @vitest-environment jsdom
//
// Phase 1a regression test for Issue #3501. The three auth-import modal clusters
// (Codex/Claude/Gemini) were extracted out of the 12.8K-LOC god-component into
// standalone files. This proves each now mounts in isolation with its clean
// { onClose, onSuccess } interface — the payoff of the extraction (Hard Rule #8).
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ImportCodexAuthModal } from "../ImportCodexAuthModal";
import { ImportClaudeAuthModal } from "../ImportClaudeAuthModal";
import { ImportGeminiAuthModal } from "../ImportGeminiAuthModal";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "openai" }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock("next-intl", () => ({
  useTranslations: (ns?: string) => (k: string) => (ns ? `${ns}.${k}` : k),
}));

const cleanups: Array<() => void> = [];

function renderModal(node: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(node));
  cleanups.push(() => {
    act(() => root.unmount());
    container.remove();
  });
  return container;
}

describe("auth-import modals (Phase 1a extraction)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: async () => ({}), text: async () => "" } as Response)
      )
    );
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("ImportCodexAuthModal mounts standalone", () => {
    const onClose = vi.fn();
    const onSuccess = vi.fn();
    const c = renderModal(<ImportCodexAuthModal onClose={onClose} onSuccess={onSuccess} />);
    expect(c.querySelector("*")).not.toBeNull();
  });

  it("ImportClaudeAuthModal mounts standalone", () => {
    const c = renderModal(<ImportClaudeAuthModal onClose={vi.fn()} onSuccess={vi.fn()} />);
    expect(c.querySelector("*")).not.toBeNull();
  });

  it("ImportGeminiAuthModal mounts standalone", () => {
    const c = renderModal(<ImportGeminiAuthModal onClose={vi.fn()} onSuccess={vi.fn()} />);
    expect(c.querySelector("*")).not.toBeNull();
  });
});
