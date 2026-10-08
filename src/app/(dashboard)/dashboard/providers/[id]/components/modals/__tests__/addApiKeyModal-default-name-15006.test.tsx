// @vitest-environment jsdom
//
// #15006 — adding a connection after a delete must default to a FREE name.
// The modal used to derive the default from `connections.length`, so with
// main/main-3 live (main-2 deleted) it proposed "main-3" and the backend
// name-upsert silently overwrote the live main-3. It now receives the live
// names and picks the first free slot ("main-2").
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddApiKeyModal from "../AddApiKeyModal";

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

function nameInputValue(container: HTMLElement): string | null {
  const input = container.querySelector('input[placeholder="providers.productionKey"]');
  return input ? (input as HTMLInputElement).value : null;
}

function renderOpenModal(existingConnectionNames: string[]) {
  return renderModal(
    <AddApiKeyModal
      isOpen={true}
      provider="openai"
      providerName="OpenAI"
      isCompatible={false}
      existingConnectionNames={existingConnectionNames}
      onSave={vi.fn().mockResolvedValue(undefined)}
      onClose={vi.fn()}
    />
  );
}

describe("AddApiKeyModal default connection name (#15006)", () => {
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

  it("proposes the freed slot after a delete instead of colliding with a live connection", () => {
    // main-2 was deleted; main and main-3 are live. Count-based naming would
    // propose "main-3" (count 2 + 1) and overwrite it.
    const c = renderOpenModal(["main", "main-3"]);
    expect(nameInputValue(c)).toBe("main-2");
  });

  it("proposes 'main' when no connections exist", () => {
    const c = renderOpenModal([]);
    expect(nameInputValue(c)).toBe("main");
  });

  it("proposes the next suffix when the sequence is gapless", () => {
    const c = renderOpenModal(["main", "main-2", "main-3"]);
    expect(nameInputValue(c)).toBe("main-4");
  });
});
