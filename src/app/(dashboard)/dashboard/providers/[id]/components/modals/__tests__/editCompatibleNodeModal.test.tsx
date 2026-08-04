// @vitest-environment jsdom
//
// Phase 1b regression test for Issue #3501. EditCompatibleNodeModal was extracted
// out of the god-component into a standalone file (its node/props types co-moved,
// the shared CC_COMPATIBLE_DEFAULT_CHAT_PATH constant pulled into a leaf module to
// keep the import graph acyclic). Proves it mounts in isolation (Hard Rule #8).
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EditCompatibleNodeModal from "../EditCompatibleNodeModal";

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

describe("EditCompatibleNodeModal (Phase 1b extraction)", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
  });

  it("mounts standalone when open", () => {
    const c = renderModal(
      <EditCompatibleNodeModal
        isOpen
        node={{ id: "n1", name: "Node", baseUrl: "https://x" }}
        onSave={async () => {}}
        onClose={() => {}}
        isCcCompatible
      />
    );
    expect(c.querySelector("*")).not.toBeNull();
  });

  it("renders nothing harmful when closed", () => {
    expect(() =>
      renderModal(
        <EditCompatibleNodeModal isOpen={false} node={null} onSave={async () => {}} onClose={() => {}} />
      )
    ).not.toThrow();
  });
});
