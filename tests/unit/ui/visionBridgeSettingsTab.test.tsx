// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/shared/components", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <section>{children}</section>,
  Toggle: ({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) => (
    <button type="button" aria-pressed={checked} onClick={() => onChange(!checked)} />
  ),
}));

function jsonResponse(data: unknown) {
  return { ok: true, json: async () => data } as Response;
}

describe("VisionBridgeSettingsTab", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;
  const fetchMock = vi.fn();

  beforeEach(async () => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock.mockResolvedValue(jsonResponse({}));
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    const { default: VisionBridgeSettingsTab } =
      await import("../../../src/app/(dashboard)/dashboard/settings/components/VisionBridgeSettingsTab");
    await act(async () => {
      root.render(<VisionBridgeSettingsTab />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it("exposes the text-only reroute setting and persists a toggle", async () => {
    expect(container.textContent).toContain("visionBridgeRerouteTextOnlyLabel");
    const toggles = container.querySelectorAll("button");
    const rerouteToggle = toggles.item(1);
    await act(async () => {
      rerouteToggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(fetchMock).toHaveBeenLastCalledWith(
      "/api/settings",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ visionBridgeRerouteTextOnly: true }),
      })
    );
  });
});
