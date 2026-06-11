// @vitest-environment jsdom
//
// Phase 1c regression tests for Issue #3501. AddApiKeyModal and EditConnectionModal
// were extracted from the god-component. This proves each mounts in isolation with
// its clean Props interface (Hard Rule #8, Rule #18 TDD gate).
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddApiKeyModal from "../AddApiKeyModal";
import EditConnectionModal from "../EditConnectionModal";

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

describe("conn-modals (Phase 1c extraction)", () => {
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
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => undefined,
    });
  });

  afterEach(() => {
    while (cleanups.length) cleanups.pop()?.();
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("AddApiKeyModal mounts standalone when isOpen=false", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const c = renderModal(
      <AddApiKeyModal
        isOpen={false}
        provider="openai"
        providerName="OpenAI"
        isCompatible={false}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    // When isOpen=false the modal renders nothing (null body) — no throw is the assertion.
    expect(c).toBeDefined();
  });

  it("AddApiKeyModal mounts standalone when isOpen=true", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const c = renderModal(
      <AddApiKeyModal
        isOpen={true}
        provider="openai"
        providerName="OpenAI"
        isCompatible={false}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    expect(c.querySelector("*")).not.toBeNull();
  });

  it("AddApiKeyModal returns null when provider is falsy", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const c = renderModal(
      <AddApiKeyModal isOpen={true} onSave={onSave} onClose={vi.fn()} />
    );
    // No provider → renders null
    expect(c.textContent).toBe("");
  });

  it("EditConnectionModal mounts standalone when connection=null", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const c = renderModal(
      <EditConnectionModal
        isOpen={false}
        connection={null}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    // connection=null → renders null — no throw is the assertion
    expect(c).toBeDefined();
  });

  it("EditConnectionModal mounts standalone with a connection", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const connection = {
      id: "conn-1",
      name: "Test Connection",
      provider: "openai",
      authType: "apikey",
      priority: 1,
    };
    const c = renderModal(
      <EditConnectionModal
        isOpen={true}
        connection={connection}
        onSave={onSave}
        onClose={vi.fn()}
      />
    );
    expect(c.querySelector("*")).not.toBeNull();
  });

  it("EditConnectionModal renders without ReferenceError for oauth connection", () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    const connection = {
      id: "conn-oauth",
      name: "OAuth Account",
      email: "user@example.com",
      provider: "claude",
      authType: "oauth",
      priority: 1,
    };
    // Must not throw; tests that ERROR_TYPE_LABELS and formatTimeAgo are properly imported
    expect(() =>
      renderModal(
        <EditConnectionModal
          isOpen={true}
          connection={connection}
          onSave={onSave}
          onClose={vi.fn()}
        />
      )
    ).not.toThrow();
  });
});
