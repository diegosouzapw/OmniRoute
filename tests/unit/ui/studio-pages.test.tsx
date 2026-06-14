// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import CompressionStudioPage from "@/app/(dashboard)/dashboard/compression/studio/page";
import ComboLiveStudioPage from "@/app/(dashboard)/dashboard/combos/live/page";

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  // The live hooks may construct a WebSocket; a no-op keeps the smoke test offline.
  globalThis.WebSocket = class {
    readyState = 0;
    close() {}
    send() {}
    addEventListener() {}
    removeEventListener() {}
  } as unknown as typeof WebSocket;
});

const containers: HTMLElement[] = [];

function mount(ui: React.ReactElement): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  while (containers.length > 0) containers.pop()?.remove();
  document.body.innerHTML = "";
});

describe("Studio route pages (Tela A / Tela B wiring)", () => {
  it("Compression Studio page mounts and shows the empty state without live data", () => {
    const container = mount(<CompressionStudioPage />);
    expect(container.querySelector('[data-testid="compression-cockpit-empty"]')).toBeTruthy();
  });

  it("Combo Live Studio page mounts the studio shell without live data", () => {
    const container = mount(<ComboLiveStudioPage />);
    expect(container.querySelector('[data-testid="combo-live-studio"]')).toBeTruthy();
  });
});
