// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ConnectionRow, { type ConnectionRowProps } from "../components/ConnectionRow";

const noop = () => {};

function buildProps(overrides: Partial<ConnectionRowProps>): ConnectionRowProps {
  return {
    connection: {
      id: "conn-1",
      isActive: true,
      providerSpecificData: { autoSync: false },
    },
    isOAuth: false,
    isFirst: false,
    isLast: false,
    onMoveUp: noop,
    onMoveDown: noop,
    onToggleActive: noop,
    onToggleRateLimit: noop,
    onRetest: noop,
    onEdit: noop,
    onDelete: noop,
    ...overrides,
  } as ConnectionRowProps;
}

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function render(props: ConnectionRowProps) {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => root.render(<ConnectionRow {...props} />));
  roots.push({ root, el });
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.clearAllMocks();
});

describe("ConnectionRow autoSync toggle", () => {
  it("does not render an autoSync toggle when onToggleAutoSync is absent", () => {
    render(buildProps({}));
    expect(document.body.textContent).not.toContain("Sync");
  });

  it("renders the toggle when onToggleAutoSync is present", () => {
    render(buildProps({ onToggleAutoSync: vi.fn() }));
    expect(document.body.textContent).toContain("Sync");
    const button = [...document.querySelectorAll("button")].find((b) =>
      (b.textContent || "").includes("Sync")
    );
    expect((button as HTMLButtonElement).className).not.toContain("bg-emerald-500/15");
  });

  it("renders the toggle in the on state when autoSync is true", () => {
    render(
      buildProps({
        connection: { id: "conn-1", isActive: true, providerSpecificData: { autoSync: true } },
        onToggleAutoSync: vi.fn(),
      })
    );
    expect(document.body.textContent).toContain("Sync");
    const button = [...document.querySelectorAll("button")].find((b) =>
      (b.textContent || "").includes("Sync")
    );
    expect((button as HTMLButtonElement).className).toContain("bg-emerald-500/15");
  });

  it("invokes onToggleAutoSync with the inverse value on click", () => {
    const onToggleAutoSync = vi.fn();
    render(
      buildProps({
        connection: { id: "conn-1", isActive: true, providerSpecificData: { autoSync: false } },
        onToggleAutoSync,
      })
    );
    const button = [...document.querySelectorAll("button")].find((b) =>
      (b.textContent || "").includes("Sync")
    );
    act(() => button?.click());
    expect(onToggleAutoSync).toHaveBeenCalledWith(true);
  });

  it("disables the toggle when the connection is inactive", () => {
    render(
      buildProps({
        connection: { id: "conn-1", isActive: false, providerSpecificData: { autoSync: false } },
        onToggleAutoSync: vi.fn(),
      })
    );
    const button = [...document.querySelectorAll("button")].find((b) =>
      (b.textContent || "").includes("Sync")
    );
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });
});
